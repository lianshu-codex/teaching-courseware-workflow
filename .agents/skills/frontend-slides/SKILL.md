---
name: frontend-slides
description: 主入口，用户说“用 HTML PPT skill”“用html ppt skill”或“用 HTML PPT 技能”制作演示时使用。规划完成后调用 beautiful-html-templates 选模并生成页面。 Create stunning, animation-rich HTML presentations from scratch or by converting PowerPoint files. Use when the user wants to build a presentation, convert a PPT/PPTX to web, or create slides for a talk/pitch. Helps non-designers discover their aesthetic through visual exploration rather than abstract choices.
---

# Frontend Slides

## Paired HTML PPT workflow

Treat “用 HTML PPT skill” as an explicit invocation of frontend-slides. This skill owns the outline, sequence, content constraints, animation and final checks. For programming teaching decks, first deliver the page structure and teaching logic and wait for confirmation before designing pages.

At the start of visual design for HTML decks, when installed, load and follow the sibling skill [beautiful-html-templates](../beautiful-html-templates/SKILL.md). Use its local catalog and actual template assets for the visual discovery and generation phases below. Its previews replace the built-in style preview round. If the user already picked a template, proceed directly with it. Integrate the chosen layouts into this skill's fixed 16:9 presentation workflow, preserving required interactions and resolving all asset paths. Open the resulting deck and verify navigation, layout and animation. If the library is absent, use the built-in presets in Phase 2 with the same preview and cleanup rules.

**Preview before style confirmation:** Once the topic and audience are known and any required teaching-outline confirmation is complete, create three distinct, working HTML style previews (A/B/C), one file per style. Each file must have exactly three navigable slides: one cover and the same two key content slides across all styles, using the user's real material. For lessons, choose two representative teaching pages, such as a worked example and an interaction or a written solution. Demonstrate the planned interaction where it applies. In the browser, verify that all three pages of each preview open and can be navigated, then share the three clickable paths and wait for the user's style choice before building the full deck. Infer unspecified mood, colors and visual direction for the previews; do not block on an abstract style questionnaire or replace previews with descriptions. Ask only for missing content facts that materially prevent a useful preview. An explicitly selected template or a targeted edit to an existing deck does not require a new style-selection round.

For slide screenshots, wait until the incoming slide is fully visible and the outgoing slide has finished fading. Inspect a montage or each image before sharing.

## Output requirements

- Every HTML preview and final deck must have a visible fullscreen toggle and an F shortcut. Refit the proportional stage on fullscreen changes. Test entering and exiting fullscreen in a supported browser. If the viewer blocks it, show how to use browser fullscreen.
- Programming lessons use 16:9, an aligned grid, non-image backgrounds, 20pt body text and large projection-friendly code. Use a 1.2-second smooth page transition with a reduced-motion override. Reveal answers on demand. Limit content animation to variables, arrays, loops, counting, sorting, searching and step-by-step execution.
- Organize programming practice as code correction followed by independent programming. For each correction, students first identify the specific line, then its error. Aim for about six or more tasks, typically three corrections and basic, intermediate and challenge programming tasks.

## 配套练习

- 使用本 Skill 制作教学课件时，若用户未说明是否需要配套练习，默认问一次「这节课需要配套的 Word 练习题吗？」编程教学可与页面结构确认一并询问。已明确要或不要时按原请求执行。普通演示、只浏览模板或只看风格预览不触发此问题。
- 等待练习答复期间照常推进已获确认的课件步骤。用户明确需要后，调用[练习题模板](../artifact-template-maths-worksheet-2/SKILL.md)（`$artifact-template-maths-worksheet-2`），沿用本课已确认的知识点与难度；根据用户给出的题量与页数制作可编辑 Word。模板未安装时，提示缺少模板并按用户要求继续适用的 Word 工作流。
- 交付前依据最终课件的例题和课堂练习查重，避免仅换数字、名字或措辞的同题，附独立答案页。主入口已询问过时，模板库无需重复询问。

## Teaching interactions

**Required in every full teaching deck:** Include at least one interactive multiple-choice question in the practice section. Learners must be able to click or tap an option and get feedback after choosing or submitting. Keep the answer hidden until the learner acts.

Choose other interactions and animations based on what students need to predict, manipulate, or observe. Use these examples as options and add other suitable interactions when the lesson calls for them:

- **Interactive multiple choice:** Ask learners to predict an output, choose an answer, or identify an error, then give feedback.
- **Drag and drop:** Let learners sort, match, or sequence items. To model a rule, let a moved object affect the outcome, such as moving a weight on a balance beam.
- **Parameter sliders or editable inputs:** Let learners change values and see the model update, such as changing the number of columns in a multiplication array.
- **Step-by-step execution:** Let learners advance through a loop, sort, or search and see the current step and the resulting values.
- **Branch visualization:** Let learners change an input and see which `if` or `else` path runs.
- **Prediction and automatic checking with changeable inputs:** Let learners edit the given values, predict the answer, then check against a result calculated from the current inputs. Examples include toggling the bits of A and B or changing a number in an equation.

For programming lessons, apply the user's existing animation and exercise rules. An interactive choice can be used in the error-spotting discussion while the independent programming exercises retain their own format.

## Running locally

Resolve paths relative to this skill directory. HTML authoring runs in a browser. For PPTX extraction use a Python 3 environment with `python-pptx`. Windows users can open local HTML with PowerShell's `Invoke-Item -LiteralPath`. See [runtime notes](WINDOWS_RUNTIME.md) for platform-specific steps.


---

## Core Principles

1. **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools.
2. **Show, Don't Tell** — Generate visual previews, not abstract choices. People discover what they want by seeing it.
3. **Distinctive Design** — No generic "AI slop." Every presentation must feel custom-crafted.
4. **Progressive Disclosure** — Read lightweight style indexes first. For bold templates, use small preview cards for style previews and load the full `design.md` only after the user picks that template.
5. **Fixed 16:9 Stage (NON-NEGOTIABLE)** — Every deck uses a 1920×1080 slide canvas scaled as a whole to the viewport. Slides must stay 16:9 on every screen, including phones. Do not reflow slide content to fit the device.

## Design Aesthetics

You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight.

Focus on:

- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:

- Overused font families (Inter, Roboto, Arial, system fonts)
- Cliched color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!

## Fixed Stage Rules

These invariants apply to EVERY slide in EVERY presentation:

- Every deck has a viewport wrapper that fills the browser window.
- Every slide is authored inside a fixed 1920×1080 stage.
- The stage scales uniformly to fit the viewport. It may letterbox/pillarbox; it must not re-layout content.
- Do not use responsive breakpoints to rearrange slide content for phones.
- Use fixed internal slide measurements at the 1920×1080 design size.
- Slide visibility must be controlled by `.active` / `.visible` using `visibility`, `opacity`, and `pointer-events` from `viewport-base.css`. Do not use `display: none` / `display: block` for slide switching; later layout classes such as `.slide-content { display: flex; }` can override them and make every slide visible at once.
- Use `clamp()` only for non-slide UI outside the stage, or for small fallback previews where a full stage is impractical.
- Include `prefers-reduced-motion` support
- Never negate CSS functions directly (`-clamp()`, `-min()`, `-max()` are silently ignored) — use `calc(-1 * clamp(...))` instead

**When generating, read `viewport-base.css` and include its full contents in every presentation.**

### Content Density Modes

Reuse the user's stated purpose to determine whether this is primarily a reading deck or a speaking deck. Default classroom teaching to speaker-led. Ask only when the distinction cannot reasonably be inferred and materially changes the content:

| Density mode | Best for | Design behavior |
| ------------- | -------- | --------------- |
| **Low density / speaker-led** | Public talks, keynote-style sharing, live explanation | One idea per slide, large type, strong visual hierarchy, generous negative space, 1-3 bullets max, more slides if needed |
| **High density / reading-first** | Reports, handouts, async review, detailed internal docs | More self-contained slides, structured grids/tables/annotations, 4-8 bullets or 4-6 cards when readable, tighter but still intentional spacing |

Baseline limits still apply: no scrolling, no overflow, no overlapping panels, and no text below comfortable reading size. If content exceeds the selected density mode, split it into more slides instead of shrinking until it becomes cramped.

---

## Phase 0: Detect Mode

Determine what the user wants:

- **Mode A: New Presentation** — Create from scratch. Go to Phase 1.
- **Mode B: PPT Conversion** — Convert a .pptx file. Go to Phase 4.
- **Mode C: Enhancement** — Improve an existing HTML presentation. Read it, understand it, enhance. **Follow Mode C modification rules below.**

### Mode C: Modification Rules

When enhancing existing presentations, fixed-stage fitting is the biggest risk:

1. **Before adding content:** Count existing elements, check against density limits
2. **Adding images:** Fit them inside the 1920×1080 slide canvas. If slide already has max content, split into two slides
3. **Adding text:** Max 4-6 bullets per slide. Exceeds limits? Split into continuation slides
4. **After ANY modification, verify:** the slide stage remains 16:9, no text overflows its card, no panels overlap, and screenshots look correct at 1280×720 plus one phone viewport
5. **Proactively reorganize:** If modifications will cause overflow, automatically split content and inform the user. Don't wait to be asked

**When adding images to existing slides:** Move image to a new slide or reduce other content first. Never add images without checking if existing content already fills the 1920×1080 slide stage.

---

## Phase 1: Content Discovery (New Presentations)

Reuse information already supplied in the request, files and conversation. Ask only for missing content facts that materially prevent useful previews, and group any necessary questions in one concise message. The questions below are a checklist, not a mandatory questionnaire. Do not wait for mood, color or style choices before generating previews:

**Question 1 — Purpose** (header: "Purpose"):
What is this presentation for? Options: Pitch deck / Teaching-Tutorial / Conference talk / Internal presentation

**Question 2 — Length** (header: "Length"):
Approximately how many slides? Options: Short 5-10 / Medium 10-20 / Long 20+

**Question 3 — Content** (header: "Content"):
Do you have content ready? Options: All content ready / Rough notes / Topic only

**Question 4 — Density** (header: "Density"):
How dense should the deck feel? Options:

- "Low density / speaker-led" — Big ideas, fewer words, more visual breathing room
- "High density / reading-first" — More self-contained detail for async reading

**Do not ask about inline editing during Phase 1.** Users should not have to choose editing behavior before seeing a draft. Inline editing is a post-draft affordance: include it by default unless the user explicitly asks for a locked/export-only file.

Remember the user's density choice. It affects slide count, typography scale, amount of text per slide, layout density, and whether to favor cinematic presenter slides or self-contained reading slides.

If user has content, ask them to share it.

### Step 1.2: Image Evaluation (if images provided)

If user selected "No images" → skip to Phase 2.

If user provides an image folder:

1. **Scan** — List all image files (.png, .jpg, .svg, .webp, etc.)
2. **Inspect each image** — Use the agent's available image-understanding capability. If image reading is unavailable, use filenames/metadata and ask the user to clarify only when needed
3. **Evaluate** — For each: what it shows, USABLE or NOT USABLE (with reason), what concept it represents, dominant colors
4. **Co-design the outline** — Curated images inform slide structure alongside text. This is NOT "plan slides then add images" — design around both from the start (e.g., 3 screenshots → 3 feature slides, 1 logo → title/closing slide)
5. **Confirm the outline** using the same structured-question mechanism when available: "Does this slide outline and image selection look right?" Options: Looks good / Adjust images / Adjust outline

**Logo in previews:** If a usable logo was identified, embed it (base64) into each style preview in Phase 2 — the user sees their brand styled three different ways.

---

## Phase 2: Style Discovery

**This is the "show, don't tell" phase.** Most people can't articulate design preferences in words.

### Step 2.0: Generate 3 Style Previews Directly

Use the companion template skill for this phase when available. The built-in template selection below is a fallback. Each of the three HTML previews follows the same three-page format: cover plus two key content slides with the same material across styles.

Do not ask the user whether they want options or a preset picker. The default discovery experience is always visual comparison.

If the user already gave a vibe, use it. If they did not, infer the likely mood from the occasion, audience, content, and stakes. Keep the options diverse enough that the user can react visually instead of needing to articulate taste up front.

If the user proposes a preset or bold template as a candidate, include it as one option. If the user has already selected the final template, proceed with it directly.

Read [STYLE_PRESETS.md](STYLE_PRESETS.md) for safe preset candidates. If [bold-template-pack/selection-index.json](bold-template-pack/selection-index.json) exists, read that compact index too, but do not read any `design.md` files yet.

| Mood                | Suggested Presets                                  |
| ------------------- | -------------------------------------------------- |
| Impressed/Confident | Bold Signal, Electric Studio, Dark Botanical       |
| Excited/Energized   | Creative Voltage, Neon Cyber, Split Pastel         |
| Calm/Focused        | Notebook Tabs, Paper & Ink, Swiss Modern           |
| Inspired/Moved      | Dark Botanical, Vintage Editorial, Pastel Geometry |

**Preview mix rules:**

- Generate 3 previews by default: 1 safe preset from `STYLE_PRESETS.md`, at least 1 bold template from `bold-template-pack/selection-index.json`, and 1 wildcard.
- The wildcard may be either a second bold template or a self-generated custom design. Choose whichever creates the strongest, most useful contrast for the user's occasion, audience, mood, and content.
- Do not force every expressive option to come from the template library. If the brief has a sharper, more specific design opportunity than the available templates, use the wildcard slot to design freely.
- For conservative or high-stakes decks, make the safe preset especially restrained; choose a calm, higher-formality bold template; make the wildcard either another restrained template or a custom design that feels authoritative rather than decorative.
- For expressive decks, keep the safe preset as a readable fallback; choose one strong bold template; make the wildcard adventurous, context-specific, and clearly different from both other previews.
- If bold template matches feel weak, use the wildcard as a custom design or fall back to another safe preset instead of forcing a template.

**Custom wildcard design rules:**

- Follow the Design Aesthetics section above: no generic "AI slop", no default font/color/layout choices, no purple-gradient-on-white clichés, no cookie-cutter dashboard/card look.
- Match the user's stated occasion, audience, mood/vibe, and content density. The custom design should feel authored for this deck, not merely "stylish."
- Make a deliberate visual thesis: distinctive typography, a committed palette, a recognizable layout system, and one strong atmospheric or graphic device.
- Keep it feasible for a full deck. The preview must imply a design system that can expand into section, content, quote, comparison, and closing slides.
- Use fixed 1920×1080 stage rules and pass the same preview authenticity checks as every other option.
- Never render "custom", "wildcard", "AI-generated", or design-process labels on the slide itself.

**Bold template selection rules:**

- Match user purpose and mood against `mood`, `tone`, `best_for`, `avoid_for`, `formality`, `density`, and `scheme`.
- Treat `best_for` examples as soft signals, not strict industry filters.
- Keep the three previews genuinely different from each other.
- After choosing bold template candidate(s), read only those candidate(s)' `preview.md` files from the `preview_md` paths in the selection index.
- Use `preview.md` as the cover reference. For the two key content pages, use the candidate's existing layouts as needed and read only the relevant template sections. Read the full `design.md` after the user picks the final template.

**Preview authenticity rules (NON-NEGOTIABLE):**

- All three pages of every style preview must use real material and look like pages from the user's deck.
- Never render internal workflow text on a slide: no `preview`, `generated from`, `preview.md`, `template`, `preset`, `style option`, `Option A/B/C`, file names, paths, or source-doc labels.
- Never render template names or slug names on the slide itself. Template/style names belong only in the message to the user.
- Never render user requirement notes as slide content, such as "sharp and provocative", "safe option", "bold option", "for internal sharing", or "audience: ...", unless the user explicitly wants that exact phrase to appear in the deck.
- If the slide needs chrome, use real deck chrome only: the deck title, section title, date, author, company, page number, or a genuine content phrase from the user's material.
- Before opening previews, inspect the visible text and revise if any internal metadata appears.

Save previews to `.frontend-slides/slide-previews/` (style-a.html, style-b.html, style-c.html). Use a fresh task-specific subfolder for each preview round. Record each exact output path and any exclusively generated assets. Each file must be self-contained and allow navigation between all three pages.

Open each preview automatically for the user.

### Step 2.1: User Picks

Ask (header: "Style"):
Which style preview do you prefer? Options: Style A: [Name] / Style B: [Name] / Style C: [Name] / Mix elements

Ask this only after all three actual previews have been opened and linked. Wait for the user's selection before generating the full deck.

If "Mix elements", ask which elements to combine and which preview supplies each element.

### Step 2.2: Clean up unselected previews

As soon as the user confirms their final choice, delete the unselected preview files from the current task and any generated assets used exclusively by those previews. Keep the selected preview and the assets it needs. For a confirmed mix, keep the previews that supply the selected elements and delete the rest. If the choice is still open, keep all previews. Use only the recorded paths for this round. Verify that the rejected files are gone and retained previews still open. Preserve the preview directory, source templates, shared assets, earlier rounds and unrelated files. If the library already cleaned this round, skip the duplicate cleanup.

---

## Phase 3: Generate Presentation

Generate the full presentation using content from Phase 1 (text, or text + curated images) and style from Phase 2.

If images were provided, the slide outline already incorporates them from Step 1.2. If not, CSS-generated visuals (gradients, shapes, patterns) provide visual interest — this is a fully supported first-class path.

Apply the user's density choice throughout the deck:

- **Low density / speaker-led:** Use more slides with fewer ideas per slide. Favor large headings, short phrases, visual metaphors, section beats, quote/statement slides, and presenter-friendly pacing.
- **High density / reading-first:** Make slides more self-contained. Use structured grids, comparison tables, annotated diagrams, captions, and concise explanatory copy. Keep hierarchy strong so it feels designed, not like a document pasted onto slides.

If the user's stated needs are mixed, choose the closer of the two modes instead of inventing a middle option: live audience persuasion defaults low-density; async circulation or detailed review defaults high-density.

Never let high density become visual clutter. If a high-density slide starts to overflow, split it or redesign it into a clearer structure.

If the user selected a bold template from `bold-template-pack`, read that one template's full `design.md` before generating. Do not read the other bold templates. Treat `design.md` as the design recipe:

- Preserve its fonts, palette, decorative vocabulary, spacing rhythm, and component grammar.
- Generate the final deck as a fixed 1920×1080 stage scaled uniformly to the viewport, regardless of whether the source template originally used `deck-stage.js` or viewport-fluid CSS.
- Treat viewport-fluid values in `design.md` as design proportions to translate into 1920×1080 stage coordinates. Do not keep them as live viewport reflow rules in the final deck.
- Keep the output as a single self-contained Frontend Slides HTML file.
- Do not copy demo slide content or mimic the source template too literally.
- Use `template.html` only as a last-resort implementation reference for the selected template.
- After generating, verify both content overflow and panel overlap in rendered browser screenshots. `scrollHeight` checks alone are not enough because grid panels can visually cover each other.

If the user selected a self-generated custom wildcard, treat that preview's CSS and layout as the design recipe:

- Preserve its fonts, palette, decorative vocabulary, spacing rhythm, grid logic, and component grammar.
- Expand the same visual system across the full deck. Do not switch to a preset or bold template after the user has chosen the custom direction.
- Design any missing slide layouts from that system rather than importing patterns from another style.
- Keep the output fixed-stage, single-file, and visually verified like every other deck.

**Before generating, read these supporting files:**

- [html-template.md](html-template.md) — HTML architecture and JS features
- [viewport-base.css](viewport-base.css) — Mandatory CSS (include in full)
- [animation-patterns.md](animation-patterns.md) — Animation reference for the chosen feeling

**Key requirements:**

- Single self-contained HTML file, all CSS/JS inline
- Include the FULL contents of viewport-base.css in the `<style>` block
- Use the chosen typography. Embed redistributable fonts where available and provide a suitable local fallback so the deck works offline.
- Add detailed comments explaining each section
- Every section needs a clear `/* === SECTION NAME === */` comment block

---

## Phase 4: PPT Conversion

When converting PowerPoint files:

1. **Extract content** — Run `python scripts/extract-pptx.py <input.pptx> <output_dir>` (install python-pptx if needed: `pip install python-pptx`)
2. **Confirm with user** — Present extracted slide titles, content summaries, and image counts
3. **Style selection** — Proceed to Phase 2 for style discovery
4. **Generate HTML** — Convert to chosen style, preserving all text, images (from assets/), slide order, and speaker notes (as HTML comments)

---

## Phase 5: Delivery

For a full teaching deck, open the practice section in a browser and confirm at least one multiple-choice question accepts a selection and gives feedback with the answer initially hidden.

1. **Open and check** — Use the available platform browser or opener. Verify offline loading, desktop and phone layout, keyboard navigation, fullscreen entry and exit, and all interactive controls, including revealed states.
2. **Summarize** — Tell the user:
   - File location, style name, slide count
   - Navigation: Arrow keys, Space, fullscreen button/F, and swipe/tap if enabled
   - How to customize: `:root` CSS variables for colors, font definitions for typography, `.reveal` class for animations
   - Inline text editing is available: Hover top-left corner or press E to enter edit mode, click any text to edit, Ctrl+S to save
   - Offer the natural post-draft actions: ask for revisions, edit text directly in the browser, or export/share

---

## Phase 6: Share & Export (Optional)

Use these steps when the user requests publication or export. Verify any generated export before delivery.

### 6A: Deploy to a Live URL (Vercel)

This deploys the presentation to Vercel — a free hosting platform. The link works on any device (phones, tablets, laptops) and stays live until the user takes it down.

**If the user has never deployed before, guide them step by step:**

1. **Check if Vercel CLI is installed** — Run `npx vercel --version`. If not found, install Node.js first (`brew install node` on macOS, or download from https://nodejs.org).

2. **Check if user is logged in** — Run `npx vercel whoami`.
   - If NOT logged in, explain: _"Vercel is a free hosting service. You need an account to deploy. Let me walk you through it:"_
     - Step 1: Ask user to go to https://vercel.com/signup in their browser
     - Step 2: They can sign up with GitHub, Google, email — whatever is easiest
     - Step 3: Once signed up, run `vercel login` and follow the prompts (it opens a browser window to authorize)
     - Step 4: Confirm login with `vercel whoami`
   - Wait for the user to confirm they're logged in before proceeding.

3. **Deploy** — Run the deploy script:

   ```bash
   bash scripts/deploy.sh <path-to-presentation>
   ```

   The script accepts either a folder (with index.html) or a single HTML file.

4. **Share the URL** — Tell the user:
   - The live URL (from the script output)
   - That it works on any device — they can text it, Slack it, email it
   - To take it down later: visit https://vercel.com/dashboard and delete the project
   - The Vercel free tier is generous — they won't be charged

**⚠ Deployment gotchas:**

- **Local images/videos must travel with the HTML.** The deploy script auto-detects files referenced via `src="..."` in the HTML and bundles them. But if the presentation references files via CSS `background-image` or unusual paths, those may be missed. **Before deploying, verify:** open the deployed URL and check that all images load. If any are broken, the safest fix is to put the HTML and all its assets into a single folder and deploy the folder instead of a standalone HTML file.
- **Prefer folder deployments when the presentation has many assets.** If the presentation lives in a folder with images alongside it (e.g., `my-deck/index.html` + `my-deck/logo.png`), deploy the folder directly: `bash scripts/deploy.sh ./my-deck/`. This is more reliable than deploying a single HTML file because the entire folder contents are uploaded as-is.
- **Filenames with spaces work but can cause issues.** The script handles spaces in filenames, but Vercel URLs encode spaces as `%20`. If possible, avoid spaces in image filenames. If the user's images have spaces, the script handles it — but if images still break, renaming files to use hyphens instead of spaces is the fix.
- **Redeploying updates the same URL.** Running the deploy script again on the same presentation overwrites the previous deployment. The URL stays the same — no need to share a new link.

### 6B: Export to PDF

This captures each slide as a screenshot and combines them into a PDF. Perfect for email attachments, embedding in documents, or printing.

**Note:** Animations and interactivity are not preserved — the PDF is a static snapshot. This is normal and expected; mention it to the user so they're not surprised.

1. **Run the export script:**

   ```bash
   bash scripts/export-pdf.sh <path-to-html> [output.pdf]
   ```

   If no output path is given, the PDF is saved next to the HTML file.

2. **What happens behind the scenes** (explain briefly to the user):
   - A headless browser opens the presentation at 1920×1080 (standard widescreen)
   - It screenshots each slide one by one
   - All screenshots are combined into a single PDF
   - The script needs Playwright (a browser automation tool) — it will install automatically if missing

3. **If Playwright installation fails:**
   - The most common issue is Chromium not downloading. Run: `npx playwright install chromium`
   - If that fails too, it may be a network/firewall issue. Ask the user to try on a different network.

4. **Deliver the PDF** — The script auto-opens it. Tell the user:
   - The file location and size
   - That it works everywhere — email, Slack, Notion, Google Docs, print
   - Animations are replaced by their final visual state (still looks great, just static)

**⚠ PDF export gotchas:**

- **First run is slow.** The script installs Playwright and downloads a Chromium browser (~150MB) into a temp directory. This happens once per run. Warn the user it may take 30-60 seconds the first time — subsequent exports within the same session are faster.
- **Slides must use `class="slide"`.** The export script finds slides by querying `.slide` elements. If the presentation uses a different class name, the script will report "0 slides found" and fail. All presentations generated by this skill use `.slide`, so this only matters for externally-created HTML.
- **Local images must be loadable via HTTP.** The script starts a local server and loads the HTML through it (so Google Fonts and relative image paths work). If images use absolute filesystem paths (e.g., `src="/Users/name/photo.png"`) instead of relative paths (e.g., `src="photo.png"`), they won't load. Generated presentations always use relative paths, but converted or user-provided decks might not — check and fix if needed.
- **Local images appear in the PDF** as long as they are in the same directory as (or relative to) the HTML file. The export script serves the HTML's parent directory over HTTP, so relative paths like `src="photo.png"` resolve correctly — including filenames with spaces. If images still don't appear, check: (1) the image files actually exist at the referenced path, (2) the paths are relative, not absolute filesystem paths like `/Users/name/photo.png`.
- **Large presentations produce large PDFs.** Each slide is captured as a full 1920×1080 PNG screenshot. An 18-slide deck can produce a ~20MB PDF. If the PDF exceeds 10MB, ask the user: _"The PDF is [size]. Would you like me to compress it? It'll look slightly less sharp but the file will be much smaller."_ If yes, re-run the export with the `--compact` flag:
  ```bash
  bash scripts/export-pdf.sh <path-to-html> [output.pdf] --compact
  ```
  This renders at 1280×720 instead of 1920×1080, typically cutting file size by 50-70% with minimal visual difference.

---

## Supporting Files

| File                                               | Purpose                                                              | When to Read              |
| -------------------------------------------------- | -------------------------------------------------------------------- | ------------------------- |
| [STYLE_PRESETS.md](STYLE_PRESETS.md)               | 12 curated visual presets with colors, fonts, and signature elements | Phase 2 (style selection) |
| [bold-template-pack/selection-index.json](bold-template-pack/selection-index.json) | Compact bold template metadata for candidate selection | Phase 2 (style selection) |
| [bold-template-pack/templates/*/preview.md](bold-template-pack/templates/) | Lightweight cover references for shortlisted bold styles | Phase 2 after shortlisting |
| [bold-template-pack/templates/*/design.md](bold-template-pack/templates/) | Detailed design-system docs for the selected bold template only | Phase 3 after user selection |
| [viewport-base.css](viewport-base.css)             | Mandatory fixed-stage CSS — copy into every presentation             | Phase 3 (generation)      |
| [html-template.md](html-template.md)               | HTML structure, JS features, code quality standards                  | Phase 3 (generation)      |
| [animation-patterns.md](animation-patterns.md)     | CSS/JS animation snippets and effect-to-feeling guide                | Phase 3 (generation)      |
| [scripts/extract-pptx.py](scripts/extract-pptx.py) | Python script for PPT content extraction                             | Phase 4 (conversion)      |
| [scripts/deploy.sh](scripts/deploy.sh)             | Deploy slides to Vercel for instant sharing                          | Phase 6 (sharing)         |
| [scripts/export-pdf.sh](scripts/export-pdf.sh)     | Export slides to PDF                                                 | Phase 6 (sharing)         |
