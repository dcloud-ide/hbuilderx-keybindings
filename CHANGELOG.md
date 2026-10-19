# 更新日志

## 1.0.0 — 2026-10-16

- 初始版本：提供 HBuilderX 默认快捷键方案（keymap），键位数据移植自 HBuilderX 官方 key.json
- 仅注册与 VS Code 默认键位不同的条目；与 VS Code 默认完全相同的键位（如 `ctrl+s`、`ctrl+c`、方向键、`Shift` 选区等）由 VS Code 默认提供，不重复注册
- 符合 VS Code 标准 keymap 插件规范：启用即覆盖 VS Code 默认键位，禁用即恢复；启用时 VS Code 会提示禁用其他 keymap 插件以避免冲突
- 国际化：显示名 / 描述使用 package.nls（默认英文 + 简体中文）；README 拆分为英文主文档（README.md）与中文文档（README.zh-cn.md），互相链接
- 图标：新增插件图标 icons/icon.png（256x256，源文件 icons/icon.svg）
- 打包：新增 npm run package 脚本（vsce），打包产物输出到 dist/
