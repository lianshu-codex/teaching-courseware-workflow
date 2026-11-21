# Agent Instructions

You are an agent working with the **beautiful-html-templates** library. Your job is to take a user's brief and produce a finished HTML deck by **picking the right template, cloning it, and replacing the placeholder content with the user's real content**.

This document is your operating manual. Read it once at the start of any deck-building task.

---

## 1. The full workflow

For new decks requiring style discovery, follow this sequence: reuse the brief, build and show three actual previews, then ask the user to choose. Preserve an explicit teaching-outline confirmation requirement before visual design. An already selected template or a targeted edit to an existing deck does not need a new preview round.

### Step 1 — Reuse the brief and infer visual directions

Read the supplied brief, referenced files and existing conversation. Reuse the topic, audience, occasion and any preferences already provided.

If mood, colors or style are unspecified, infer three distinct, suitable visual directions and demonstrate them in the previews. Do not require the user to choose a mood or style in words before seeing them.

Ask only for missing topic, audience or content facts that materially prevent useful previews. Once those facts are sufficient and any required teaching outline is confirmed, proceed to previews without another approval gate. Style confirmation comes after the previews are opened and linked.

### Step 2 — Read `index.json` and pick 3 candidates

Read `index.json` at the repo root. Match the user's stated or reasonably inferred occasion + mood against each template's `mood`, `tone`, `best_for`, and `formality`. **Pick three templates** whose tones genuinely fit. The three should be *different enough from each other* that the user has a real choice — e.g. don't pick three editorial templates if the brief is editorial; pick one editorial, one warmer alternative, and one wildcard that re-interprets the brief.

### Step 3 — Build a three-page preview of each candidate

For each of the 3 candidates:

1. Read the template's `template.html` to learn its visual system.
2. Use the template's cover and two suitable content layouts. Choose the same two key content pages for all three style options. For lessons, show representative classroom material, such as a worked example and an interactive exercise or a solution demonstration.
3. Populate all three pages with the user's real content. Include planned interaction on the key pages where it applies.
4. Save one self-contained, navigable HTML file per style, e.g. `previews/01-<slug>.html`, with exactly three pages: the cover and the two key content pages. Use a fresh task-specific preview directory. Record the exact files generated this round and any assets used exclusively by each variant.
5. Use a fixed, proportional 1920×1080 stage. The file must work offline and provide a visible fullscreen toggle and F shortcut. Embed the [offline pen component](../frontend-slides/deck-ink.md) in each generated preview.

### Step 4 — Open all 3 previews in the browser, send paths to user

Open each of the 3 preview files in the browser. Verify that all three pages render, navigation and fullscreen work, and the representative interaction works before sending the three paths. If an embedded viewer prevents fullscreen, provide a browser fullscreen hint. Then send the user a message like:

> "Three options to compare:
>
> 1. **<Template A>** — <one-line tone description>
>    `/path/to/previews/01-template-a.html`
> 2. **<Template B>** — <one-line tone description>
>    `/path/to/previews/02-template-b.html`
> 3. **<Template C>** — <one-line tone description>
>    `/path/to/previews/03-template-c.html`
>
> Which one feels right?"

For slide screenshots, wait until the incoming slide is fully visible and the outgoing slide has finished fading. Inspect a montage or each image before sharing.

Wait for the user to pick.

### Step 5 — Clean up the current preview round

For both direct and companion use, wait for the user to confirm the final style. If the user wants a mix, ask which preview supplies each element before cleanup. Retain all selected previews and the assets they use.

Remove only this round's recorded unselected HTML previews and the generated assets used exclusively by them. Retain source templates, shared assets, earlier preview rounds, unrelated files and the preview directory. Verify that the removed files are gone and retained previews still open. If frontend-slides has already performed cleanup, skip the duplicate pass.

### Step 6 — Build the full deck in the chosen template

Build the full deck after style confirmation, or directly when the user already specified a template. For browse-only or preview-only requests, deliver the requested result.

1. Clone the chosen template's full folder into the user's project workspace.
2. Adapt every slide per the rules in §3 (preserve / replace / extend).
3. If the user's deck needs more slides than the template's demo holds, duplicate existing layouts to fit; if it needs fewer, drop slides from the bottom. Update page-number labels.
4. **If a slide needs a layout the template doesn't have, design it from scratch using the template's design system** — same fonts, same color palette, same decorative vocabulary, same spacing rhythm, same component grammar. Do not bail back to the user; do not pick a different template; do not import a new visual language. The new slide should look like a natural extension of the template, not a graft. (See §5 — designing missing layouts.)

5. In a full teaching deck, make slide 2 the learning objectives page (「知识目标」 in Chinese). Group actual concepts, methods and syntax by lesson task and check them against the later explanations, demonstrations and exercises.

Before testing, embed the same [offline pen component](../frontend-slides/deck-ink.md) in the final deck.

### Step 7 — Open the final deck in the browser, send the file path

Open the finished deck with the available platform browser or opener. Test offline loading, proportional desktop and phone layouts, navigation, fullscreen entry and exit, and each interactive control. Check initial and revealed states. Test drawing in fullscreen, returning to a marked slide, and clicking lesson controls after turning the pen off. Send the user a message like:

> "Done. Your deck is at `/path/to/deck/template.html` — opened it in your browser.
>
> [One line about what you did and any caveats.]"

This applies to **every artifact you produce** — preview files, intermediate iterations, final deck. Always open it, always send the path.

---

## 2. What's in `index.json`

```jsonc
{
  "schema_version": 1,
  "template_count": 28,
  "templates": [
    {
      "slug": "neo-grid-bold",
      "name": "Neo-Grid Bold",
      "tagline": "Editorial neo-brutalism with a single neon yellow accent on off-white paper.",
      "mood": ["confident", "punchy", "editorial", "modern"],
      "occasion": ["product launch", "design review", "founder pitch", ...],
      "tone": ["bold", "minimal", "design-led", "graphic"],
      "formality": "medium",
      "density": "high",
      "scheme": "light",
      "best_for": "Anything that should feel confident and editorial-graphic ...",
      "avoid_for": "Contexts that need to feel quiet, traditional, or warm ...",
      "slide_count": 12
    },
    ...
  ]
}
```

Field definitions:

| field | how to use it |
|---|---|
| `mood` | emotional adjectives. Match against the user's *feeling* keywords. |
| `occasion` | example use cases. Useful as soft signal, not a hard filter. |
| `tone` | voice / personality. Match against descriptors like "playful", "serious", "literary". |
| `formality` | `low` / `medium-low` / `medium` / `medium-high` / `high`. Sanity-check against the user's audience. |
| `density` | how much content per slide the template can hold. Match against the user's content volume. |
| `scheme` | `light` / `dark` / `mixed`. Hard signal if the user explicitly wants light or dark. |
| `best_for` | the **feeling** + example contexts. Lead with this when narrating your pick. |
| `avoid_for` | tone *clashes* — soft warning, not a veto. |
| `slide_count` | size of the demo deck. Hint for how many layouts the template demonstrates. |

You only need a deeper read of a template's actual HTML/CSS once you've shortlisted it.

---

## 3. How to adapt a chosen template

Once you've cloned the template's folder into the user's workspace, follow these rules.

### Always preserve (these ARE the design system)

- **Fonts.** Preserve the intended typography. Embed the font when redistribution permits and provide a suitable local fallback for offline use.
- **Color palette.** All `:root` CSS variables and color values. Never recolor.
- **Layout grid.** The grid columns, the absolute positioning, the flex hierarchies. Don't restructure.
- **Slide-level CSS classes** (e.g. `.s-toc`, `.slide--quote`, `.layout-cover`). These carry the visual identity.
- **Decorative elements** — corner brackets, paper grain, geometric shapes, illustrated SVGs, hand-drawn doodles. They are part of the system, not optional ornament.
- **The navigation runtime** — whether it's `deck-stage.js`, an inline keyboard handler, scroll-snap, or nothing. Reuse or adapt the runtime so it satisfies fixed-stage, offline, fullscreen and interaction requirements.

### Always replace (this is the user's content)

- **Headlines** — `<h1>`, `<h2>`, `<h3>`, etc.
- **Body copy** — `<p>`, list items, captions.
- **Numbers and stats** — placeholder values like `47%`, `2.4M`, `+142%`.
- **Names, dates, attributions** — author names, citation lines, "May 2026" placeholders.
- **Section labels and chrome text** — the `[Topic]`, `[Year]`, `[Studio]`, etc. tokens that templates use as authored placeholders.
- **Image placeholders** — replace `<div class="img-placeholder">Image Placeholder</div>` or `<img src="placeholder.jpg">` with the user's real image, **at the same dimensions**.

### Adding more slides (existing layout)

If the user has more content than the template's demo deck holds, duplicate an existing slide of the most appropriate layout and replace its content. Update page-number labels (`NN / TT`).

### Removing slides

Drop slides from the bottom if the user doesn't need them. Update page-number labels.

---

## 4. Tone-first matching

Templates have **tones**, not industries. The `best_for` and `avoid_for` fields describe how a template *feels*, not what industry it belongs to.

This means: **a confident editorial deck can carry a tech talk** if the user wants to feel design-led. **A playful pastel deck can carry a finance review** if the user is intentionally rejecting the formal-finance look. The user's taste wins.

When matching:

- **Lead with `mood` + `tone` + `best_for`.** Match the *feeling* the user wants.
- **Treat `avoid_for` as a soft warning, not a hard rule.** If the user has explicitly asked for the look that a template's `avoid_for` flags against, the user wins.
- **Use `formality` and `density` to sanity-check** — a low-formality template for a senior board presentation is probably the wrong call regardless of tone overlap, and you should flag that to the user.
- **Don't over-fit on `occasion`.** That field is example contexts, not the canon list.
- **Demonstrate tone in previews.** Infer suitable directions from the brief, then let the user choose after seeing them. Do not use an abstract tone questionnaire as a prerequisite.

---

## 5. Designing missing layouts (extending a template)

Some user briefs require a slide layout the chosen template doesn't include — e.g., a comparison table when the template only has process-flow and stat-grid layouts. In that case **design the missing slide using the template's existing design system**. Do not bail. Do not pick a different template. Do not import a new visual language.

The rules:

- **Same fonts.** Use the same `font-family` declarations the template uses for h1 / h2 / body / mono. Same weights, same letter-spacing, same line-heights.
- **Same color palette.** Use the existing `:root` CSS variables. If the new layout needs a "warning" or "highlight" color and one isn't in the palette, pick the closest existing accent rather than introducing a new hex.
- **Same decorative vocabulary.** If the template uses corner brackets, paper grain overlays, hand-drawn doodles, geometric shapes, etc. — your new slide should use the same vocabulary. A bare slide with no decoration in a template full of ornament will look broken.
- **Same spacing rhythm.** If the template uses `padding: 64px` on its slides, your new slide does too. If it uses an 8-column grid with 24px gutter, so do you.
- **Same component grammar.** If the template's stat cards use a specific structure (large number → label → description → mono caption), reuse that structure for new stat-like elements rather than inventing a different one.
- **Same chrome.** Top label / bottom page-number / corner mark — match whatever the rest of the deck shows.
- **Same navigation behavior.** A new slide must integrate with the template's existing nav (deck-stage / inline keyboard / scroll-snap). Add it as a sibling section / div in the same way existing slides are structured.

A good test: open your new slide between two existing slides in the deck. If it visibly *belongs* — same fonts, same colors, same decorations, same rhythm — you've succeeded. If it looks like a different template grafted on, you've failed; redo it.

---

## 6. Common pitfalls

- **Reuse the brief before asking.** Do not repeat known questions or require an explicit mood choice before previews. Ask only about missing content facts that materially prevent a useful preview.
- **Show the cover and both key content pages.** The user needs to compare how each template presents the actual material before choosing.
- **Keep the typography legible offline.** Preserve the original font family where possible, using an embedded licensed copy or a suitable local fallback.
- **Don't recolor.** Even small accent shifts break the palette's harmony.
- **Don't combine layouts from different templates.** Each template is a closed visual system. Mixing slide A from raw-grid with slide B from neo-grid-bold will look amateur. (This is *different* from §5: extending one template is fine; mashing two templates is not.)
- **Don't strip "extra" decoration thinking it's noise.** Corner brackets, paper grain, SVG ornaments — they are part of the identity.
- **Don't try to "modernize" old templates** — they're working as designed. If a template feels dated, pick a different template, don't edit the existing one.
- **Don't forget to open the file in the browser.** Every preview, every iteration, every final deck. Use `open <path>`.

---

## 7. Output contract

After **every artifact** you produce — three-page style previews, intermediate iterations, the final deck — do both of these:

1. **Open the file in the browser.** Use `open /absolute/path/to/file.html`. Don't just announce it; actually open it.
2. **Send the user the absolute file path** in your message, on its own line, formatted as a path so it's clickable.

For the final deck, also include:
- A one-line note about which template you picked and why (the *tone match*).
- Any caveats (e.g., "I designed slides 4 and 7 from scratch using the template's design system since you needed a comparison table and a 4-column timeline that the demo deck didn't include").

Do not narrate every step you took. The user wants the artifact + the path + a one-line rationale, not a transcript.
