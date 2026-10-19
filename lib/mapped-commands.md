# 已映射的键位

`package.json` 中实际注册的键位清单：只包含与 VS Code 默认键位不同的条目；与 VS Code 默认完全相同的键位不再注册（见下文"三、与 VS Code 默认键位相同，未注册"）。本插件是标准 keymap 插件：启用即覆盖 VS Code 默认快捷键，禁用即恢复；启用时 VS Code 会提示禁用其他 keymap 插件以避免冲突。

- "命令名称有变化"：HBuilderX 命令与 VS Code 命令不同，进行了映射（部分为语义近似的映射）。
- "命令名称相同"：key.json 中的命令 ID 在 VS Code 中已存在，直接沿用。
- 条目的 `when` 条件与 VS Code 默认对齐：命令在 VS Code 默认键位中存在的，直接采用官方默认条目的 `when`（如 `ctrl+k` 格式化、`alt+/` 触发建议等）；仅 HBuilderX 独有映射的命令才按 VS Code 标准上下文键改写（如 `debugState=='paused'` → `debugState == 'stopped'`、`isRunning` → `inDebugMode`、`activeEditor.readonly` → `editorReadonly` 等），不引用 HBuilderX 私有上下文键。
- 个别条目通过命令参数或 `insertSnippet` 模拟实现映射：`ctrl+shift+f` → `editor.actions.findWithArgs`（`args: { "findInSelection": true }`，打开查找并限定在选区内）；`ctrl+b` 加粗 → `editor.action.insertSnippet`（markdown 中包裹 `**`，html/vue 中包裹 `<b>`）。
- VS Code 无对应实现、未纳入本插件的 24 条见 [reserved-commands.md](./reserved-commands.md)。

## 一、命令名称有变化（49 条）

### 标签卡

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+PageUp` | `workbench.action.leftTab` | `workbench.action.previousEditorInGroup` | 显示左边的标签卡 |
| `ctrl+PageDown` | `workbench.action.rightTab` | `workbench.action.nextEditorInGroup` | 显示右边的标签卡 |

### 文件

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+n` | `workbench.action.menu.new` | `workbench.action.files.newFile` | 新建 |

### 删除

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `shift+backspace` | `deleteLineLeft` | `deleteAllLeft` | 删到行首 |
| `shift+delete` | `deleteLineRight` | `deleteAllRight` | 删到行尾 |

### 剪贴板

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+shift+c` | `editor.action.clipboardCopyPathAction` | `workbench.action.files.copyPathOfActiveFile` | 复制文件路径 |
| `ctrl+shift+r` | `editor.action.duplicate` | `editor.action.copyLinesDownAction` | 重复插入选区或当前行 |
| `ctrl+shift+v` | `editor.action.clipboardPasteAsHTML` | `editor.action.pasteAs` | 粘贴为HTML |

### 撤销

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `alt+shift+z` | `editor.action.undoSelection` | `cursorUndo` | 撤销一个新光标或选区 |

### 语言

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+k` | `editor.action.format` | `editor.action.formatDocument` | 格式化 |
| `ctrl+shift+/` | `editor.action.blockCommentLine` | `editor.action.blockComment` | 块注释 |

### 包围

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+]` | `editor.action.SurroundBylanguage` | `editor.emmet.action.wrapWithAbbreviation` | 包围 |
| `ctrl+b` | `editor.action.bold` | `editor.action.insertSnippet` | 加粗（html、md生效） |
| `alt+shift+/` | `Trigger Parameter Hints` | `editor.action.triggerParameterHints` | 激活方法参数提示 |

### 选择

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+alt+e` | `editor.action.selectAllSameWord` | `editor.action.selectHighlights` | 选择所有相同词 |
| `alt+f3` | `editor.action.selectAllSameWord` | `editor.action.selectHighlights` | 选择所有相同词 |
| `alt+shift+e` | `editor.action.skipSelectionAndSelectNext` | `editor.action.moveSelectionToNextFindMatch` | 跳过当前选择，选中下一个相同词 |
| `ctrl+shift+e` | `editor.action.SelectSameWordByLan` | `editor.action.changeAll` | 选择相同语法词（注意解除搜狗输入法全局占用） |
| `ctrl+[` | `editor.action.selectMatchBracket` | `editor.action.selectToBracket` | 选择括号内字符。可用双击括号替代 |
| `ctrl+=` | `editor.action.expandSelection` | `editor.action.smartSelect.expand` | 放大选区 |

### 查找

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+shift+f` | `actions.findinRegion` | `editor.actions.findWithArgs` | 本文档的区域内查找字符串 |

### 跳转

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `alt+d` | `workbench.action.gotoDefinition` | `editor.action.revealDefinition` | 转到定义 |
| `alt+shift+d` | `workbench.action.gotoDefinitionWithPane` | `editor.action.revealDefinitionAside` | 分栏转到定义 |
| `shift+f12` | `workbench.action.gotoDefinitionWithPane` | `editor.action.revealDefinitionAside` | 分栏转到定义 |
| `f4` | `workbench.action.nextError` | `editor.action.marker.nextInFiles` | 下一个验证错误 |
| `shift+f4` | `workbench.action.prevError` | `editor.action.marker.prevInFiles` | 上一个验证错误 |
| `alt+-` | `workbench.action.foldLineContract` | `editor.fold` | 折叠单行 |
| `alt+=` | `workbench.action.foldLineExpand` | `editor.unfold` | 展开单行 |
| `alt+shift+-` | `workbench.action.foldChildrenContract` | `editor.foldRecursively` | 折叠子行 |
| `alt+shift+=` | `workbench.action.foldChildrenExpand` | `editor.unfoldRecursively` | 展开子行 |
| `alt+ctrl+shift+-` | `workbench.action.foldAllContract` | `editor.foldAll` | 折叠所有行 |
| `alt+ctrl+shift+=` | `workbench.action.foldAllExpand` | `editor.unfoldAll` | 展开所有行 |
| `alt+shift+o` | `workbench.action.foldContractOther` | `editor.foldAllExcept` | 折叠其他区域 |

### 视图

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `alt+n` | `workbench.action.focusEditor` | `workbench.action.focusActiveEditorGroup` | 置焦到编辑器区域 |
| `alt+c` | `workbench.action.tiggleTerminal` | `workbench.action.terminal.toggleTerminal` | 显示/隐藏终端 |
| `alt+p` | `workbench.action.togglePreviewBrowserVisibility` | `simpleBrowser.show` | 显示/隐藏内置浏览器 |
| `alt+w` | `editor.action.triggerOutline` | `outline.focus` | 显示/隐藏大纲 |
| `f11` | `workbench.action.distanceFreeMode` | `workbench.action.toggleZenMode` | 免打扰模式 |
| `alt+shift+1` | `workbench.action.split1e` | `workbench.action.editorLayoutSingle` | 单栏 |
| `alt+shift+2` | `workbench.action.split2e` | `workbench.action.editorLayoutTwoColumns` | 左右2栏 |
| `alt+shift+3` | `workbench.action.split3e` | `workbench.action.editorLayoutThreeColumns` | 左右3栏 |
| `alt+.` | `workbench.action.nextpane` | `workbench.action.focusNextGroup` | 置焦到下一个分栏 |
| `alt+,` | `workbench.action.prevpane` | `workbench.action.focusPreviousGroup` | 置焦到上一个分栏 |

### 工具

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+shift+h` | `workbench.action.files.localHistory` | `workbench.action.localHistory.restoreViaPicker` | 本地历史记录 |

### 调试相关快捷键

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `f8` | `debug.action.continue` | `workbench.action.debug.continue` | 继续 |
| `f8` | `debug.action.pause` | `workbench.action.debug.pause` | 暂停 |

### 设置快捷键，用于查找所有引用

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `shift+alt+g` | `workbench.action.gotoreference` | `editor.action.goToReferences` |  |

### 设置快捷键，用于重命名符号

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+alt+r` | `workbench.action.rename` | `editor.action.rename` |  |
| `alt+shift+,` | `workbench.action.findInConfigurations` | `workbench.action.openSettings` | 设置项搜索 |

## 二、命令名称相同（34 条）

### 标签卡

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+t` | `workbench.action.files.newUntitledFile` | `workbench.action.files.newUntitledFile` | 新建标签卡（默认md） |
| `ctrl+shift+w` | `workbench.action.closeAllEditors` | `workbench.action.closeAllEditors` | 关闭所有标签卡 |
| `ctrl+q` | `workbench.action.closeOtherEditors` | `workbench.action.closeOtherEditors` | 关闭其他文件 |

### 文件

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+alt+s` | `workbench.action.files.saveAll` | `workbench.action.files.saveAll` | 全部保存 |

### 行操作

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+up` | `editor.action.moveLinesUpAction` | `editor.action.moveLinesUpAction` | 上移一行 |
| `ctrl+down` | `editor.action.moveLinesDownAction` | `editor.action.moveLinesDownAction` | 下移一行 |

### 删除

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+d` | `editor.action.deleteLines` | `editor.action.deleteLines` | 删除行 |

### 语言

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+shift+k` | `editor.action.joinLines` | `editor.action.joinLines` | 合并行（反格式化） |
| `ctrl+alt+j` | `editor.action.joinLines` | `editor.action.joinLines` | 合并行（兼容老版HBuilder快捷键） |

### 包围

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `alt+shift+u` | `editor.action.transformToUppercase` | `editor.action.transformToUppercase` | 全部字母大写 |
| `alt+shift+l` | `editor.action.transformToLowercase` | `editor.action.transformToLowercase` | 全部字母小写 |
| `alt+shift+t` | `editor.action.transformToTitlecase` | `editor.action.transformToTitlecase` | 首字母大写 |
| `alt+/` | `editor.action.triggerSuggest` | `editor.action.triggerSuggest` | 激活代码助手 |

### 选择

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+e` | `editor.action.addSelectionToNextFindMatch` | `editor.action.addSelectionToNextFindMatch` | 选择当前词或下一个相同词 |

### 查找

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+alt+f` | `workbench.action.findInFiles` | `workbench.action.findInFiles` | 目录内查找字符串 |
| `f3` | `editor.action.nextSelectionMatchFindAction` | `editor.action.nextSelectionMatchFindAction` | 查找下一个字符串 |
| `shift+f3` | `editor.action.previousSelectionMatchFindAction` | `editor.action.previousSelectionMatchFindAction` | 查找上一个字符串 |

### 跳转

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `alt+h` | `cursorLeft` | `cursorLeft` | 光标向左 |
| `alt+j` | `cursorDown` | `cursorDown` | 光标向下 |
| `alt+k` | `cursorUp` | `cursorUp` | 光标向上 |
| `alt+l` | `cursorRight` | `cursorRight` | 光标向右 |
| `ctrl+alt+left` | `cursorWordPartLeft` | `cursorWordPartLeft` | 光标向左一个驼峰单词 |
| `ctrl+alt+right` | `cursorWordPartRight` | `cursorWordPartRight` | 光标向右一个驼峰单词 |
| `alt+[` | `editor.action.jumpToBracket` | `editor.action.jumpToBracket` | 跳转到配对的括号 |

### 视图

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `alt+shift+q` | `workbench.view.explorer` | `workbench.view.explorer` | 置焦到项目管理器 |
| `alt+q` | `workbench.action.toggleSidebarVisibility` | `workbench.action.toggleSidebarVisibility` | 显示/隐藏项目管理器 |
| `alt+x` | `workbench.debug.action.toggleRepl` | `workbench.debug.action.toggleRepl` | 显示/隐藏控制台 |
| `alt+o` | `editor.action.toggleMinimap` | `editor.action.toggleMinimap` | 显示/隐藏迷你地图 |
| `ctrl+f6` | `workbench.action.switchWindow` | `workbench.action.switchWindow` | 多窗口切换快捷键 |
| `` alt+` `` | `workbench.action.switchWindow` | `workbench.action.switchWindow` | 多窗口切换快捷键 |

### 运行

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+f5` | `workbench.action.debug.restart` | `workbench.action.debug.restart` | 重新运行 |
| `ctrl+shift+f5` | `workbench.action.debug.stop` | `workbench.action.debug.stop` | 停止运行 |

### 帮助

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+alt+,` | `workbench.action.openGlobalSettings` | `workbench.action.openGlobalSettings` | 打开设置 |

### 设置快捷键，用于重命名符号

| 键位 | HBuilderX 命令 | VS Code 命令 | 说明 |
| --- | --- | --- | --- |
| `ctrl+alt+\` | `editor.action.inlineSuggest.trigger` | `editor.action.inlineSuggest.trigger` | 激活虚拟行 |

## 三、与 VS Code 默认键位相同，未注册（84 条）

以下键位的「键位 + 命令」与 VS Code 默认键位一致（VS Code 默认的作用范围不窄于本插件原约束），启用插件后由 VS Code 默认提供；为避免重复注册，本插件不再写入这些条目。官方默认键位数据在 [default-keybindings/](./default-keybindings/)，维护脚本与更新流程见 [README.md](./README.md)。

| 键位 | 命令 | 说明 |
| --- | --- | --- |
| `alt+0` | `workbench.action.lastEditorInGroup` | 切换到最末尾的标签卡 |
| `alt+shift+right` | `editor.action.smartSelect.expand` | 向2侧扩大选择 |
| `alt+shift+left` | `editor.action.smartSelect.shrink` | 由2侧向内减少选择 |
| `ctrl+shift+o` | `workbench.action.gotoSymbol` | 查找索引符号 |
| `f12` | `editor.action.revealDefinition` | 转到定义 |
| `ctrl+alt+i` | `workbench.action.uniAgent.open` | 显示/隐藏AI Code Chat |
| `ctrl+r` | `workbench.action.hbuilderx.showLaunchShortcuts` | 运行 |
| `f10` | `workbench.action.debug.stepOver` | 单步执行 |
| `f11` | `workbench.action.debug.stepInto` | 单步进入 |
| `shift+f11` | `workbench.action.debug.stepOut` | 单步退出 |
| `f2` | `renameFile` | 重命名文件（焦点在项目管理器中） |
| `ctrl+x` | `filesExplorer.cut` | 剪切文件（焦点在项目管理器中） |
| `ctrl+c` | `filesExplorer.copy` | 复制文件（焦点在项目管理器中） |
| `ctrl+v` | `filesExplorer.paste` | 粘贴文件（焦点在项目管理器中） |
| `ctrl+w` | `workbench.action.closeActiveEditor` | 关闭当前标签卡 |
| `ctrl+f4` | `workbench.action.closeActiveEditor` | 关闭当前标签卡 |
| `ctrl+shift+t` | `workbench.action.reopenClosedEditor` | 重开已关闭标签卡 |
| `alt+1` | `workbench.action.openEditorAtIndex1` | 切换到第1个标签卡 |
| `alt+2` | `workbench.action.openEditorAtIndex2` | 切换到第2个标签卡 |
| `alt+3` | `workbench.action.openEditorAtIndex3` | 切换到第3个标签卡 |
| `alt+4` | `workbench.action.openEditorAtIndex4` | 切换到第4个标签卡 |
| `alt+5` | `workbench.action.openEditorAtIndex5` | 切换到第5个标签卡 |
| `alt+6` | `workbench.action.openEditorAtIndex6` | 切换到第6个标签卡 |
| `alt+7` | `workbench.action.openEditorAtIndex7` | 切换到第7个标签卡 |
| `alt+8` | `workbench.action.openEditorAtIndex8` | 切换到第8个标签卡 |
| `alt+9` | `workbench.action.openEditorAtIndex9` | 切换到第9个标签卡 |
| `ctrl+shift+PageUp` | `workbench.action.moveEditorLeftInGroup` | 往左移动一个标签卡 |
| `ctrl+shift+PageDown` | `workbench.action.moveEditorRightInGroup` | 往右移动一个标签卡 |
| `ctrl+o` | `workbench.action.files.openFile` | 打开外部文件 |
| `ctrl+s` | `workbench.action.files.save` | 保存 |
| `ctrl+shift+s` | `workbench.action.files.saveAs` | 另存为 |
| `ctrl+enter` | `editor.action.insertLineAfter` | 向下插入行 |
| `ctrl+shift+enter` | `editor.action.insertLineBefore` | 向上插入行 |
| `backspace` | `deleteLeft` | 向左删除 |
| `delete` | `deleteRight` | 向右删除 |
| `ctrl+backspace` | `deleteWordLeft` | 向左删除词 |
| `ctrl+delete` | `deleteWordRight` | 向右删除词 |
| `ctrl+c` | `editor.action.clipboardCopyAction` | 复制 |
| `ctrl+x` | `editor.action.clipboardCutAction` | 剪切 |
| `ctrl+v` | `editor.action.clipboardPasteAction` | 粘贴 |
| `ctrl+z` | `undo` | 撤销 |
| `ctrl+y` | `redo` | 重做 |
| `ctrl+shift+z` | `redo` | 重做 |
| `ctrl+/` | `editor.action.commentLine` | 注释/反注释 |
| `tab` | `tab` | 缩进 |
| `shift+tab` | `outdent` | 反缩进 |
| `ctrl+a` | `editor.action.selectAll` | 全选 |
| `shift+left` | `cursorLeftSelect` | 向左选字 |
| `shift+right` | `cursorRightSelect` | 向右选字 |
| `shift+up` | `cursorUpSelect` | 向上选行 |
| `shift+down` | `cursorDownSelect` | 向下选行 |
| `ctrl+shift+left` | `cursorWordStartLeftSelect` | 向左选词（VS Code 默认以 `cursorWordLeftSelect` 提供同功能键位） |
| `ctrl+shift+right` | `cursorWordEndRightSelect` | 向右选词 |
| `shift+home` | `cursorHomeSelect` | 选至软行首（连续按依次切换自动换行的行首、缩进后的行首、真行首） |
| `shift+end` | `cursorEndSelect` | 选至软行尾（连续按依次切换自动换行的行尾、真行尾） |
| `shift+PageUp` | `cursorPageUpSelect` | 选至上一页 |
| `shift+PageDown` | `cursorPageDownSelect` | 选至下一页 |
| `ctrl+shift+home` | `cursorTopSelect` | 选至文档首 |
| `ctrl+shift+end` | `cursorBottomSelect` | 选至文档尾 |
| `ctrl+l` | `expandLineSelection` | 选择行。也可单击行号或三击行 |
| `ctrl+alt+up` | `editor.action.insertCursorAbove` | 向上列选择 |
| `ctrl+alt+down` | `editor.action.insertCursorBelow` | 向下列选择 |
| `ctrl+p` | `workbench.action.quickOpen` | 查找文件 |
| `ctrl+f` | `actions.find` | 本文档内查找字符串 |
| `ctrl+h` | `editor.action.startFindReplaceAction` | 替换 |
| `left` | `cursorLeft` | 光标向左 |
| `down` | `cursorDown` | 光标向下 |
| `up` | `cursorUp` | 光标向上 |
| `right` | `cursorRight` | 光标向右 |
| `ctrl+left` | `cursorWordStartLeft` | 光标向左一词（VS Code 默认以 `cursorWordLeft` 提供同功能键位） |
| `ctrl+right` | `cursorWordEndRight` | 光标向右一词 |
| `home` | `cursorHome` | 光标到软行首（连续按依次切换自动换行的行首、缩进后的行首、真行首） |
| `end` | `cursorEnd` | 光标到软行尾（连续按依次切换自动换行的行尾、真行尾） |
| `PageUp` | `cursorPageUp` | 光标到上一页 |
| `PageDown` | `cursorPageDown` | 光标到下一页 |
| `ctrl+home` | `cursorTop` | 光标到页首 |
| `ctrl+end` | `cursorBottom` | 光标到页尾 |
| `ctrl+g` | `workbench.action.gotoLine` | 跳转到行 |
| `alt+left` | `workbench.action.navigateBack` | 光标后退 |
| `alt+right` | `workbench.action.navigateForward` | 光标前进 |
| `ctrl+shift+=` | `workbench.action.zoomIn` | 增大字体【ctrl+鼠标滚动向上】 |
| `ctrl+shift+-` | `workbench.action.zoomOut` | 减小字体【ctrl+鼠标滚动向下】 |
| `ctrl+shift+n` | `workbench.action.newWindow` | 新建HBuilder窗体 |
| `f9` | `editor.debug.action.toggleBreakpoint` | 设置快捷键, 用于设置/取消断点 |
