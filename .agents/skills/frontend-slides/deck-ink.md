# 离线画笔

`assets/deck-ink` 存放 HTML PPT 的默认画笔组件。生成每份预览、正式课件或转换稿后，把组件嵌入 HTML，再用浏览器验证。

1. 使用固定 1920×1080 的 `.deck-stage` 和占满舞台的定位 `.slide`。若舞台使用其他类名，可加 `data-deck-ink-stage`。未用 `.slide` 命名的页可以加 `data-deck-ink-slide`。
2. 运行时应在当前页元素上维护 `.active`、`.visible` 或 `data-deck-active`。使用其他翻页约定时，给当前 `.slide` 设置 `data-deck-ink-current="true"`，同时清除上一页的标记。画布随当前页移动，翻页逻辑仍由课件自己执行。
3. 使用[共享悬浮栏](html-template.md#floating-presentation-toolbar)时，在 `DOMContentLoaded` 前挂载带有 `data-deck-ink-toggle` 的「画笔」按钮。工具面板会显示在悬浮栏上方。独立给旧版课件加画笔时，可以给相邻的导航控件添加 `data-deck-ink-anchor`，或沿用舞台右下角的默认位置。
4. 在技能目录运行 `python scripts/add-deck-ink.py <preview.html> <deck.html>`。可以一次传入多份 HTML。脚本把样式、手绘画笔光标和交互代码写入文件，重复执行会更新同一份组件。Python 只用于生成阶段。
5. 浏览器以离线状态打开 HTML，测试按钮和 `D`、笔尖光标和落笔位置、荧光笔、颜色、擦除、撤销和清空本页。划线后翻页再返回，确认笔迹按页恢复。进出全屏和开启画笔时底栏翻页都应正常。关闭画笔后再点一次原有课件互动，确认画布已经让出点击。

教师可以用「画笔」按钮或 `D` 键开启或关闭板书。关闭工具后，已画的笔迹仍在当前页显示。重开或刷新后会清除本次板书。打印隐藏画笔和笔迹。
