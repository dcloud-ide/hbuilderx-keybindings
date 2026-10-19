# 未纳入插件的 HBuilderX 专属命令

未能映射到 VS Code 等价命令、未写入 `package.json` 的 HBuilderX 专属键位清单（共 24 条）。

## 当前处理方式

- 这些命令在 VS Code 核心以及当前版本的 HBuilderV 中均未注册，写明键位只会空转消费按键，因此不纳入插件。
- 源数据仍保留在 [hbuilderx-keymap.json](./hbuilderx-keymap.json)。
- 后续 VS Code 或 HBuilderV 注册了同名命令后，可从源数据恢复对应键位。
- 如果之后在 VS Code 中找到了语义等价的命令，可直接在 `package.json` 中增加对应键位，并从此清单中移除。

## 命令清单

### 编辑增强

| 键位（HBuilderX 方案） | 命令 ID | 说明 |
| --- | --- | --- |
| `shift+enter` | `editor.action.shiftEnter` | 反回车：把光标前内容移到下一行 |
| `ctrl+alt+-` | `editor.action.unOrderListSymbolsByMinus` | 插入 `-` 无序列表符 |
| `ctrl+alt+8` | `editor.action.unOrderListSymbolsByMultiply` | 插入 `*` 无序列表符 |
| `ctrl+alt+=` | `editor.action.unOrderListSymbolsByPlus` | 插入 `+` 无序列表符 |
| `ctrl+alt+shift+.` | `editor.action.quoteListSymbols` | 插入 `>` 引用列表符 |
| `ctrl+alt+1` | `editor.action.orderListSymbols` | 插入有序列表符 |
| `ctrl+alt+[` | `editor.action.taskListSymbols` | 插入任务列表符 |
| `ctrl+alt+]` | `editor.action.taskFinishListSymbols` | 插入已完成任务列表符 |
| `ctrl+alt+v` | `editor.action.clipboardPasteFromHistory` | 从历史剪贴板粘贴 |
| `ctrl+shift+x` | `editor.action.swichSelectionOrLine` | 交换两个选区或两行；非两个选区时交换光标前后字母 |
| `ctrl+alt+/` | `editor.action.showCommentMenu` | 注释菜单（含条件编译注释） |
| `ctrl+shift+]` | `editor.action.UnSurroundBylanguage` | 反包围 |
| `ctrl+alt+t` | `editor.action.CodeBlockSurroundByLanguage` | 代码块包围 |

### 选择与多光标

| 键位（HBuilderX 方案） | 命令 ID | 说明 |
| --- | --- | --- |
| `ctrl+shift+l` | `editor.action.selectLineNoBlankStr` | 选择整行（不含首尾空白字符） |
| `ctrl+\` | `editor.action.setCursorSurroundSel` | 每个选区前后各设置一个光标 |
| `ctrl+shift+\` | `editor.action.setCursorEachLine` | 每行行首设置光标 |
| `ctrl+alt+PageUp` | `cursorParaUp` | 光标移到上一段落（空行分隔） |
| `ctrl+alt+PageDown` | `cursorParaDown` | 光标移到下一段落（空行分隔） |

### 书签

| 键位（HBuilderX 方案） | 命令 ID | 说明 |
| --- | --- | --- |
| `ctrl+f2` | `workbench.action.toggleBookmark` | 设置/取消书签 |
| `f2` | `workbench.action.nextBookmark` | 下一个书签（编辑器聚焦时） |
| `shift+f2` | `workbench.action.prevBookmark` | 上一个书签（编辑器聚焦时） |
| `ctrl+shift+f2` | `workbench.action.clearBookmarks` | 清除所有书签 |

### 项目与工具

| 键位（HBuilderX 方案） | 命令 ID | 说明 |
| --- | --- | --- |
| `alt+shift+f` | `workbench.action.fav.menu` | 打开收藏菜单 |
| `ctrl+u` | `workbench.action.showPubMenu` | 快捷发行菜单 |
