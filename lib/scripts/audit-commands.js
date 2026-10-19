#!/usr/bin/env node
/**
 * 审计 package.json 中每个键位的命令是否在本仓库（src/ 与 extensions/，不含本插件）中有实现。
 *
 * 用法: node lib/scripts/audit-commands.js
 *
 * 说明: 动态注册的命令（如 workbench.action.openEditorAtIndex1）不以字面量出现，会列入未找到，
 *       需人工确认后忽略；其余未找到的命令说明没有实现，不应注册键位。
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..', '..', '..');
const extDir = path.resolve(__dirname, '..', '..');
const pkg = JSON.parse(fs.readFileSync(path.join(extDir, 'package.json'), 'utf8'));
const commands = [...new Set((pkg.contributes.keybindings || []).map(k => k.command))].sort();

const SKIP_DIRS = new Set(['node_modules', '.git', 'out', 'dist', 'build', '.build', '.profile-oss', '.hbuilderv']);
const files = [];
const walk = dir => {
	let entries;
	try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (SKIP_DIRS.has(entry.name)) { continue; }
			walk(full);
		} else if (/\.(ts|js|json|jsonc|mts)$/.test(entry.name)) {
			files.push(full);
		}
	}
};
walk(path.join(repoRoot, 'src'));
walk(path.join(repoRoot, 'extensions'));

const contents = files
	.filter(file => !file.startsWith(extDir))
	.map(file => fs.readFileSync(file, 'utf8'));

const missing = [];
for (const command of commands) {
	const found = contents.some(text => text.includes(`"${command}"`) || text.includes(`'${command}'`) || text.includes('`' + command + '`'));
	if (!found) { missing.push(command); }
}

console.log(`扫描文件: ${files.length}，待审计命令: ${commands.length}`);
console.log('');
if (missing.length === 0) {
	console.log('所有命令均能在仓库中找到实现。');
} else {
	console.log(`未找到实现（${missing.length}，动态注册的命令需人工确认后忽略）:`);
	for (const command of missing) { console.log(`  ${command}`); }
}
