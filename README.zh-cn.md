# HBuilderX Keymap（HBuilderX 快捷键方案）

[English](README.md) | 中文

为 VS Code / HBuilderV 提供 HBuilderX 默认快捷键方案（keymap）。键位数据移植自 HBuilderX 官方 key.json，按 VS Code 标准 keymap 插件规范实现。

## 使用方式

- 启用插件：HBuilderX 键位生效；与 VS Code 默认同键位的快捷键由本插件覆盖（扩展键位优先级高于内置默认键位）
- 禁用插件：所有键位立即恢复 VS Code 默认，无需还原任何配置
- 启用时如果已启用其他 keymap 插件，VS Code 会提示禁用其他 keymap，避免冲突
- 与 VS Code 默认完全相同的键位（如 `ctrl+s`、`ctrl+c`、方向键、`Shift` 选区等）不再重复注册，由 VS Code 默认提供

## HBuilderX 快捷键理念

- 界面相关快捷键与 `alt` 相关：把键盘当作屏幕方位，`alt+q` 显示/隐藏项目管理器、`alt+w` 大纲、`alt+x` 控制台、`alt+c` 终端
- `ctrl` 是操作、`ctrl+shift` 是反操作或更多操作、`ctrl+alt` 是更多操作
- 符号化而不是单词字母化：`ctrl+]` 是包围、`ctrl+shift+\` 是给每行行首加光标
- 保持与操作系统、浏览器接近：`ctrl+t` 新建标签卡、`ctrl+w` 关闭标签卡、`ctrl+shift+t` 恢复刚关闭的标签卡

## 精选快捷键（与 VS Code 默认不同）

下表的「VS Code 默认」以 Windows/Linux 为准（macOS 上默认为 `⌘` 系键位）。

| 分类 | 键位 | 功能 | VS Code 默认 |
| --- | --- | --- | --- |
| 标签卡 | `ctrl+t` | 新建标签卡 | `ctrl+n` |
| 标签卡 | `ctrl+q` | 关闭其他标签卡 | 无 |
| 标签卡 | `ctrl+PageUp` / `ctrl+PageDown` | 组内切换左/右标签卡 | `ctrl+PageUp/PageDown` 切换最近编辑器 |
| 编辑 | `ctrl+d` | 删除当前行 | `ctrl+shift+k` |
| 编辑 | `ctrl+up` / `ctrl+down` | 上移/下移行 | `alt+up` / `alt+down` |
| 编辑 | `ctrl+shift+r` | 重复插入选区或当前行 | `shift+alt+down` |
| 编辑 | `shift+backspace` / `shift+delete` | 删到行首 / 行尾 | 无 |
| 编辑 | `ctrl+k` | 格式化 | `shift+alt+f` |
| 编辑 | `ctrl+shift+k` / `ctrl+alt+j` | 合并行 | 无 |
| 编辑 | `ctrl+shift+/` | 块注释 | `shift+alt+a` |
| 编辑 | `ctrl+]` | 包围（Emmet，tag/if 等函数块） | 无 |
| 编辑 | `ctrl+[` | 选择括号内内容 | 无 |
| 编辑 | `ctrl+shift+v` | 粘贴为 HTML | 无 |
| 选择 | `ctrl+e` | 选择当前词或下一个相同词 | `ctrl+d` |
| 选择 | `alt+f3` / `ctrl+alt+e` | 选择所有相同词 | `ctrl+shift+l` |
| 选择 | `alt+shift+e` | 跳过并选择下一个相同词 | `ctrl+k ctrl+d` |
| 选择 | `ctrl+shift+e` | 选择相同语法词 | `ctrl+f2` |
| 选择 | `ctrl+=` | 放大选区 | `shift+alt+right` |
| 查找 | `ctrl+alt+f` | 目录内查找 | `ctrl+shift+f` |
| 跳转 | `alt+d` | 转到定义 | `f12` |
| 跳转 | `alt+shift+d` / `shift+f12` | 分栏转到定义 | `ctrl+k f12` |
| 跳转 | `f4` / `shift+f4` | 下一个/上一个验证错误 | `f8` / `shift+f8` |
| 跳转 | `alt+-` / `alt+=` | 折叠/展开单行 | `ctrl+shift+[` / `ctrl+shift+]` |
| 跳转 | `alt+shift+o` | 折叠其他区域 | 无 |
| 跳转 | `ctrl+alt+left` / `ctrl+alt+right` | 按驼峰词移动光标 | 无（macOS 默认有） |
| 补全 | `alt+/` | 触发代码补全 | `ctrl+space` / `ctrl+i` |
| 补全 | `alt+shift+/` | 方法参数提示 | `ctrl+shift+space` |
| 视图 | `alt+q` | 显示/隐藏项目管理器 | `ctrl+b` |
| 视图 | `alt+shift+q` | 置焦项目管理器 | `ctrl+shift+e` |
| 视图 | `alt+x` | 显示/隐藏控制台 | `ctrl+shift+y` |
| 视图 | `alt+c` | 显示/隐藏终端 | `` ctrl+` `` |
| 视图 | `alt+p` | 显示/隐藏内置浏览器 | 无 |
| 视图 | `f11` | 免打扰模式 | `ctrl+k z`（`f11` 是全屏） |
| 视图 | `alt+shift+1` / `alt+shift+2` / `alt+shift+3` | 单栏 / 左右2栏 / 左右3栏 | 无 |
| 调试 | `f8` | 开始/暂停调试 | `f5` / `f6` |
| 调试 | `ctrl+f5` / `ctrl+shift+f5` | 重新运行 / 停止运行 | `ctrl+shift+f5` / `shift+f5` |
| 工具 | `ctrl+shift+c` | 复制文件路径 | `ctrl+k p` |
| 工具 | `shift+alt+g` | 查找所有引用 | `shift+f12` |
| 工具 | `ctrl+alt+r` | 重命名符号 | `f2` |
| 工具 | `alt+shift+z` | 撤销光标/选区 | `ctrl+u` |

完整的键位清单（含与 VS Code 默认相同、未注册的键位）见仓库开发资料 `lib/mapped-commands.md`（不随插件发布）。

## 兼容性

- VS Code `^1.129.0`（含 HBuilderV，作为内置插件提供）
