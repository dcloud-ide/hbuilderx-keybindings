#!/usr/bin/env node
/**
 * 比对 lib/default-keybindings 中的官方默认键位与 package.json 中注册的键位。
 *
 * 用法: node lib/scripts/compare-defaults.js
 *
 * 输出说明:
 * - MATCHED: 默认键位中存在相同「键位 + 命令」的条目（可考虑从 package.json 删除）
 * - ALIAS:   默认键位中存在相同键位、但命令 ID 为已知别名（同功能，需人工确认）
 * - MISSING: 默认键位中不存在相同键位+命令（应保留注册）
 */

const fs = require('fs');
const path = require('path');

const extDir = path.resolve(__dirname, '..', '..');
const defaultsDir = path.join(extDir, 'lib', 'default-keybindings');
const pkg = JSON.parse(fs.readFileSync(path.join(extDir, 'package.json'), 'utf8'));
const ours = pkg.contributes.keybindings || [];

const PLATFORMS = [
	{ id: 'win', file: 'doc.keybindings.win.json' },
	{ id: 'osx', file: 'doc.keybindings.osx.json' },
	{ id: 'linux', file: 'doc.keybindings.linux.json' }
];

/** 已知的「同功能不同命令 ID」对照：默认命令 -> 别名命令列表 */
const FUNCTION_ALIASES = new Map([
	['cursorWordLeft', ['cursorWordStartLeft']],
	['cursorWordLeftSelect', ['cursorWordStartLeftSelect']]
]);

function normalizeKey(key) {
	const normalizeChord = chord => {
		const tokens = chord.split('+');
		const last = tokens.pop();
		const normalize = token => token
			.replace(/\bpgup\b/, 'pageup')
			.replace(/\bpgdn\b/, 'pagedown')
			.replace(/\breturn\b/, 'enter')
			.replace(/^meta$/, 'win');
		const modifiers = tokens.map(normalize).sort();
		return [...modifiers, normalize(last)].filter(Boolean).join('+');
	};
	return key.toLowerCase().split(' ').map(normalizeChord).join(' ');
}

function loadDefaults(file) {
	const text = fs.readFileSync(path.join(defaultsDir, file), 'utf8');
	const commentIndex = text.indexOf('// Here are other available commands');
	const jsonText = commentIndex === -1 ? text : text.slice(0, commentIndex);
	const end = jsonText.lastIndexOf(']');
	return JSON.parse(jsonText.slice(0, end + 1));
}

const platformMaps = new Map();
for (const platform of PLATFORMS) {
	const map = new Map();
	for (const item of loadDefaults(platform.file)) {
		if (!item.key || !item.command) { continue; }
		const id = normalizeKey(item.key) + '||' + item.command;
		if (!map.has(id)) { map.set(id, []); }
		map.get(id).push(item.when || '');
	}
	platformMaps.set(platform.id, map);
}

function findMatch(map, key, command) {
	const exact = map.get(normalizeKey(key) + '||' + command);
	if (exact) { return { type: 'exact', whens: exact }; }
	for (const [defaultCommand, aliases] of FUNCTION_ALIASES) {
		if (!aliases.includes(command)) { continue; }
		const alias = map.get(normalizeKey(key) + '||' + defaultCommand);
		if (alias) { return { type: 'alias', defaultCommand, whens: alias }; }
	}
	return null;
}

const matchedAll = [];
const matchedPartial = [];
const missing = [];
for (const binding of ours) {
	const flags = [];
	let match = null;
	for (const platform of PLATFORMS) {
		const result = findMatch(platformMaps.get(platform.id), binding.key, binding.command);
		flags.push(result ? (result.type === 'alias' ? 'alias' : 'match') : '-');
		if (result && (!match || result.type === 'alias')) { match = result; }
	}
	if (match) {
		(match.type === 'exact' && flags.every(f => f === 'match') ? matchedAll : matchedPartial).push({ binding, flags, match });
	} else {
		missing.push(binding);
	}
}

console.log(`package.json 注册键位: ${ours.length}`);
console.log('');
console.log(`=== 三个平台默认均相同（${matchedAll.length}，可删除） ===`);
for (const { binding, flags, match } of matchedAll) {
	console.log(`[${flags.join('/')}] ${binding.key} -> ${binding.command}${binding.when ? `  when: ${binding.when}` : ''}`);
}
console.log('');
console.log(`=== 仅部分平台相同或为同功能别名（${matchedPartial.length}，需人工判断） ===`);
for (const { binding, flags, match } of matchedPartial) {
	const aliasNote = match.type === 'alias' ? `  [同功能别名: 默认使用 ${match.defaultCommand}]` : '';
	console.log(`[${flags.join('/')}] ${binding.key} -> ${binding.command}${binding.when ? `  when: ${binding.when}` : ''}${aliasNote}`);
}
console.log('');
console.log(`=== 默认中无相同键位+命令（${missing.length}，应保留） ===`);
for (const binding of missing) {
	console.log(`${binding.key} -> ${binding.command}${binding.when ? `  when: ${binding.when}` : ''}`);
}
