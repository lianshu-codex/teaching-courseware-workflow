---
name: beautiful-html-templates
description: Preview and apply the Beautiful HTML Templates library to HTML presentations. Invoke directly as $beautiful-html-templates or use as the visual companion to frontend-slides.
---

# Beautiful HTML Templates

Read AGENTS.md and index.json in this skill directory. Resolve all library paths from this directory. Use the actual template folders and their assets for design previews and the selected deck. Write previews and deliverables in the task workspace. On Windows use an available browser or native opener.

- **Direct invocation:** Follow the workflow in AGENTS.md to select, preview, clean up and build. The frontend-slides skill is optional. If the request is only to browse or preview, stop at that requested outcome.
- **Invoked by frontend-slides:** Reuse its approved outline and content requirements. Use one preview round and one cleanup pass.
- In both modes, use a proportional 1920×1080 stage and offline HTML. Embed the main workflow's [floating toolbar](../frontend-slides/html-template.md#floating-presentation-toolbar) in every generated preview and completed deck, including direct template invocations. Use `F` for fullscreen and omit the fullscreen button from the UI. Follow the user's teaching rules. For programming teaching decks, present the structure and teaching logic and wait for confirmation before visual design. Use 20pt body text, large code, non-image backgrounds and a 1.2-second smooth transition with reduced-motion support. Reveal answers on demand. Use teaching motion only for variables, arrays, loops, counting, sorting, searching or step-by-step execution. Organize practice as finding the error line and then the error point, followed by independent programming at basic, intermediate and challenge levels.
- 每份生成的预览和成品都必须嵌入离线画笔。使用与主入口共用的[画笔组件与嵌入步骤](../frontend-slides/deck-ink.md)，单独调用模板时也照常嵌入并测试。如果只安装了模板库，从备课工作流仓库取得同版本的 `frontend-slides` 工具栏和画笔资源。直接查看原模板文件时沿用原模板。

Show three working HTML style previews with real user content before asking for style confirmation. Each preview is one HTML file with exactly three navigable pages: a cover and two key content pages. Use the same two key pages across all three styles so the user can compare them. Infer unspecified visual preferences and make the previews distinct; do not require a mood or style questionnaire first. Ask only for missing topic, audience or content facts that materially prevent useful previews. Preserve any explicit teaching-outline confirmation requirement before visual design. If the user already selected a template, or requests a targeted edit to an existing deck, follow that scope without restarting style discovery.

## 配套练习

单独调用本模板库制作教学课件时，沿用以下规则。由 `frontend-slides` 调用时，由主入口负责询问和交接。

- 用户未说明是否需要配套练习时，问一次。已明确要或不要时按原请求执行；普通演示、只浏览模板或只看风格预览不触发此问题。
- 备课和预览照常进行。用户明确需要后，读取[练习题模板](../artifact-template-maths-worksheet-2/SKILL.md)，按已确认的教学内容另编题。交付前对照最终课件例题及课堂练习查重，并附独立答案页。模板未安装时，提示缺少模板并按用户要求继续适用的 Word 工作流。

After the user confirms a style, follow the cleanup step in AGENTS.md for both direct and companion use.
