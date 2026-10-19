#!/usr/bin/env node
/**
 * 打包扩展（vsce），产物输出到 dist/。
 *
 * 用法: npm run package
 */

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const vsce = path.join(root, 'node_modules', '@vscode', 'vsce', 'vsce');

if (!fs.existsSync(vsce)) {
	console.error('未找到 @vscode/vsce，请先执行 npm install');
	process.exit(1);
}

const args = [vsce, 'package', '--no-rewrite-relative-links', '--out', 'dist/', ...process.argv.slice(2)];
const result = spawnSync(process.execPath, args, { stdio: 'inherit', cwd: root });

if (result.error) {
	console.error(result.error.message);
	process.exit(1);
}
process.exit(result.status ?? 1);
