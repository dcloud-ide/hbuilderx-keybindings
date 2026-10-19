# lib 说明

本目录是 `hbuilderx-keymap` 插件的开发资料，不随插件发布（见 `.vscodeignore`）。

| 路径 | 说明 |
| --- | --- |
| `hbuilderx-keymap.json` | HBuilderX 官方 key.json 原始数据，本插件的移植来源 |
| `mapped-commands.md` | 当前实际注册的键位清单 + 与 VS Code 默认相同未注册的键位清单 |
| `reserved-commands.md` | VS Code/HBuilderV 均无实现、未纳入插件的 HBuilderX 专属命令 |
| `default-keybindings/` | 官方默认键位导出（win / osx / linux 三份），由脚本生成 |
| `scripts/` | 维护脚本：导出默认键位、比对、命令实现审计 |

## 维护流程

在仓库根目录执行：

1. 增量编译，确保 `out/` 是最新的：
   ```
   npm run build-fast
   ```
2. 重新导出官方默认键位（Windows；macOS/Linux 用同名 `.sh`）：
   ```
   powershell -ExecutionPolicy Bypass -File extensions\hbuilderx-keymap\lib\scripts\export-default-keybindings.ps1
   ```
   脚本会临时把本插件的 `package.json` 改名，避免插件自身键位污染导出结果；同时使用独立的 `--user-data-dir`（`.build/keymap-export-user-data`）。
3. 比对 `package.json` 与默认键位，找出「键位 + 命令」完全一致的条目：
   ```
   node extensions\hbuilderx-keymap\lib\scripts\compare-defaults.js
   ```
4. 若出现新的重复条目：仅当三个平台默认均相同（输出中 `[match/match/match]`）时才从 `package.json` 删除，并在 `mapped-commands.md`「三、与 VS Code 默认键位相同，未注册」中补一行；仅部分平台相同（如 `[-/match/-]`，win/linux 无默认键位）时应保留注册，否则对应平台会失去该快捷键。反之若默认键位撤销了某按键，可把条目加回 `package.json`。
   「同功能不同命令 ID」的别名（如 `cursorWordLeft` ↔ `cursorWordStartLeft`）会单独标记，需人工确认。
5. 审计剩余命令是否都有实现（动态注册的命令会列为未找到，需人工确认）：
   ```
   node extensions\hbuilderx-keymap\lib\scripts\audit-commands.js
   ```
