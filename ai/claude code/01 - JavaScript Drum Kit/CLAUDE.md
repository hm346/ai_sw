# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指导。

## 项目概述

来自 JavaScript30 课程的浏览器端电子鼓。按下键盘 A–L 键即可触发鼓声并伴随视觉动画。纯 HTML/CSS/JS — 无框架、无构建步骤、无 package.json。

## 运行方式

直接在浏览器中打开 `index-START.html` 或 `index-FINISHED.html`。无需服务器或构建工具。

## 架构

- **`index-START.html`** — 起始模板：包含完整的 HTML 标记和 `<audio>` 元素，但 `<script>` 块为空（练习的起点）。
- **`index-FINISHED.html`** — 完整版本，`<script>` 块中包含可运行的 JavaScript 代码。

HTML 在 `.key` div 和 `<audio>` 元素上使用 `data-key` 属性（存储键盘 `keyCode` 值）来将视觉按键与对应声音关联起来。

完整版 JavaScript 包含三个部分：
1. `playSound(e)` — 监听 `keydown` 事件，通过 `data-key` 查找匹配的 `<audio>` 和 `.key` div。重置 `audio.currentTime = 0` 以支持快速连按重新触发，并添加 `.playing` 类名。
2. `removeTransition(e)` — 监听 `transitionend` 事件，移除按键上的 `.playing` 类名（仅过滤 `transform` 属性，避免每个过渡属性都触发回调）。
3. 事件监听器 — 在每个 `.key` 元素上绑定 `transitionend`，在 `window` 上绑定 `keydown`。

## 按键映射

| 按键 | KeyCode | 声音      |
|------|---------|-----------|
| A    | 65      | clap      |
| S    | 83      | hihat     |
| D    | 68      | kick      |
| F    | 70      | openhat   |
| G    | 71      | boom      |
| H    | 72      | ride      |
| J    | 74      | snare     |
| K    | 75      | tom       |
| L    | 76      | tink      |
