#!/usr/bin/env bash
# 导出本仓库（HBuilderV / VS Code）的官方默认键位，供与插件 package.json 比对。
#
# 用法（在仓库根目录先执行 npm run build-fast）:
#   ./extensions/hbuilderx-keybindings/lib/scripts/export-default-keybindings.sh
#
# 输出: lib/default-keybindings/doc.keybindings.{win,osx,linux}.json
# 说明: 导出期间会临时把本插件 package.json 改名，避免插件自身键位污染导出结果。

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LIB_DIR="$(dirname "$SCRIPT_DIR")"
EXT_DIR="$(dirname "$LIB_DIR")"
REPO_ROOT="$(dirname "$(dirname "$EXT_DIR")")"
OUT_DIR="$LIB_DIR/default-keybindings"
USER_DATA_DIR="$REPO_ROOT/.build/keymap-export-user-data"

if [ ! -f "$REPO_ROOT/out/vs/workbench/workbench.desktop.main.js" ]; then
	echo "未找到编译产物 out/vs/...，请先在仓库根目录执行 npm run build-fast" >&2
	exit 1
fi

mkdir -p "$OUT_DIR" "$USER_DATA_DIR"
rm -f "$OUT_DIR"/doc.keybindings.win.json "$OUT_DIR"/doc.keybindings.osx.json "$OUT_DIR"/doc.keybindings.linux.json

restore_package_json() {
	if [ -f "$EXT_DIR/package.json.keymap-off" ]; then
		mv -f "$EXT_DIR/package.json.keymap-off" "$EXT_DIR/package.json"
	fi
}
trap restore_package_json EXIT

mv "$EXT_DIR/package.json" "$EXT_DIR/package.json.keymap-off"

unset ELECTRON_RUN_AS_NODE || true
export VSCODE_SKIP_PRELAUNCH=1

"$REPO_ROOT/scripts/code.sh" --export-default-keybindings "$OUT_DIR" --user-data-dir "$USER_DATA_DIR" &
APP_PID=$!

for _ in $(seq 1 150); do
	sleep 2
	if [ -f "$OUT_DIR/doc.keybindings.win.json" ] && [ -f "$OUT_DIR/doc.keybindings.osx.json" ] && [ -f "$OUT_DIR/doc.keybindings.linux.json" ]; then
		break
	fi
	kill -0 "$APP_PID" 2>/dev/null || break
done

if [ ! -f "$OUT_DIR/doc.keybindings.win.json" ] || [ ! -f "$OUT_DIR/doc.keybindings.osx.json" ] || [ ! -f "$OUT_DIR/doc.keybindings.linux.json" ]; then
	pkill -f "keymap-export-user-data" 2>/dev/null || true
	echo "导出超时或失败，未生成全部 3 个默认键位文件" >&2
	exit 1
fi

sleep 3
pkill -f "keymap-export-user-data" 2>/dev/null || true

echo "已导出: $OUT_DIR/doc.keybindings.win.json, $OUT_DIR/doc.keybindings.osx.json, $OUT_DIR/doc.keybindings.linux.json"
