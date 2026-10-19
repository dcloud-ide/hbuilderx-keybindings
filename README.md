# HBuilderX Keymap

English | [中文](README.zh-cn.md)

Provides the HBuilderX default keymap for VS Code / HBuilderV. Keybindings are ported from the official HBuilderX key.json and implemented following the VS Code standard keymap extension conventions.

## Usage

- Enable the extension: HBuilderX keybindings take effect; shortcuts sharing keys with VS Code defaults are overridden by this extension (extension keybindings take precedence over built-in defaults)
- Disable the extension: all keybindings immediately revert to VS Code defaults, no configuration needs to be restored
- When another keymap extension is already enabled, VS Code prompts you to disable the other keymap to avoid conflicts
- Keybindings identical to VS Code defaults (e.g. `ctrl+s`, `ctrl+c`, arrow keys, `Shift` selection, etc.) are not registered again and are provided by VS Code defaults

## HBuilderX Keybinding Philosophy

- UI shortcuts are tied to `alt`: picture the keyboard as the screen — `alt+q` toggles the project manager, `alt+w` the outline, `alt+x` the console, `alt+c` the terminal
- `ctrl` performs an action, `ctrl+shift` the inverse or more actions, `ctrl+alt` even more actions
- Symbolic rather than word-initial: `ctrl+]` wraps a selection, `ctrl+shift+\` places a cursor at the start of each line
- Stay close to the OS and browser conventions: `ctrl+t` new tab, `ctrl+w` close tab, `ctrl+shift+t` reopen the last closed tab

## Featured Keybindings (Different from VS Code Defaults)

"VS Code Default" below is based on Windows/Linux (macOS defaults use `⌘`-based shortcuts).

| Category | Key | Action | VS Code Default |
| --- | --- | --- | --- |
| Tabs | `ctrl+t` | New tab | `ctrl+n` |
| Tabs | `ctrl+q` | Close other tabs | none |
| Tabs | `ctrl+PageUp` / `ctrl+PageDown` | Previous/next tab in group | `ctrl+PageUp/PageDown` switch recent editors |
| Editing | `ctrl+d` | Delete current line | `ctrl+shift+k` |
| Editing | `ctrl+up` / `ctrl+down` | Move line up/down | `alt+up` / `alt+down` |
| Editing | `ctrl+shift+r` | Duplicate selection or current line | `shift+alt+down` |
| Editing | `shift+backspace` / `shift+delete` | Delete to line start / line end | none |
| Editing | `ctrl+k` | Format document | `shift+alt+f` |
| Editing | `ctrl+shift+k` / `ctrl+alt+j` | Join lines | none |
| Editing | `ctrl+shift+/` | Toggle block comment | `shift+alt+a` |
| Editing | `ctrl+]` | Wrap with abbreviation (Emmet; tags / `if` blocks, etc.) | none |
| Editing | `ctrl+[` | Select to bracket | none |
| Editing | `ctrl+shift+v` | Paste as HTML | none |
| Selection | `ctrl+e` | Select current word / add next match | `ctrl+d` |
| Selection | `alt+f3` / `ctrl+alt+e` | Select all matches | `ctrl+shift+l` |
| Selection | `alt+shift+e` | Skip and add next match | `ctrl+k ctrl+d` |
| Selection | `ctrl+shift+e` | Change all occurrences | `ctrl+f2` |
| Selection | `ctrl+=` | Expand selection | `shift+alt+right` |
| Find | `ctrl+alt+f` | Find in folder | `ctrl+shift+f` |
| Navigation | `alt+d` | Go to definition | `f12` |
| Navigation | `alt+shift+d` / `shift+f12` | Go to definition to the side | `ctrl+k f12` |
| Navigation | `f4` / `shift+f4` | Next/previous problem | `f8` / `shift+f8` |
| Navigation | `alt+-` / `alt+=` | Fold/unfold one line | `ctrl+shift+[` / `ctrl+shift+]` |
| Navigation | `alt+shift+o` | Fold all except | none |
| Navigation | `ctrl+alt+left` / `ctrl+alt+right` | Move cursor by camel-case word | none (macOS default) |
| Suggestions | `alt+/` | Trigger suggestions | `ctrl+space` / `ctrl+i` |
| Suggestions | `alt+shift+/` | Trigger parameter hints | `ctrl+shift+space` |
| View | `alt+q` | Toggle project manager | `ctrl+b` |
| View | `alt+shift+q` | Focus project manager | `ctrl+shift+e` |
| View | `alt+x` | Toggle console | `ctrl+shift+y` |
| View | `alt+c` | Toggle terminal | `` ctrl+` `` |
| View | `alt+p` | Toggle built-in browser | none |
| View | `f11` | Zen mode | `ctrl+k z` (`f11` is full screen) |
| View | `alt+shift+1` / `alt+shift+2` / `alt+shift+3` | Single / two-column / three-column layout | none |
| Debug | `f8` | Start / pause debugging | `f5` / `f6` |
| Debug | `ctrl+f5` / `ctrl+shift+f5` | Restart / stop debugging | `ctrl+shift+f5` / `shift+f5` |
| Tools | `ctrl+shift+c` | Copy file path | `ctrl+k p` |
| Tools | `shift+alt+g` | Find all references | `shift+f12` |
| Tools | `ctrl+alt+r` | Rename symbol | `f2` |
| Tools | `alt+shift+z` | Undo cursor / selection | `ctrl+u` |

The complete keybinding list (including keybindings identical to VS Code defaults that are not registered) lives in the development resource `lib/mapped-commands.md` (not shipped with the extension).

## Compatibility

- VS Code `^1.129.0` (including HBuilderV, shipped as a built-in extension)
- Windows / Linux / macOS: keybindings follow the HBuilderX default keymap per platform (macOS uses the `⌘`-based HBuilderX mac keymap)
