# Mythforge — High Fantasy Story Generator
### Project Blueprint v0.1

*A personal creative-inspiration tool: pick your way through world, magic, characters, and plot, then walk away with a spark for your next high fantasy story.*

---

## 1. Concept

A guided, step-by-step generator that takes you from a blank page to a small high-fantasy story kit: a world, a magic system, one or more characters, a set of plot points, and portrait art of your cast. At every step the tool proposes a handful of AI-generated options; you pick the one you like (or reroll), and it carries forward into the next stage. The output is a personal creative artifact, not a publishable manuscript — the goal is inspiration, not automation of the actual writing.

**Working name:** Mythforge (placeholder — swap for whatever you land on).

---

## 2. Research summary

A bit of grounding before designing the flow, so the generator's suggestions actually sound like high fantasy rather than generic "fantasy-adjacent" text.

**Genre.** High fantasy is defined less by tone than by setting: it takes place in a fully secondary world (Middle-earth, not modern Earth with magic bolted on), unfolds on an epic scale, treats magic as a normal and often central force, and regularly includes non-human peoples (elves, dwarves, fae) with their own cultures. That's distinct from low fantasy, where magic intrudes on a recognizably real world and stays comparatively rare. This matters for the generator: the worldbuilding step should default to *secondary-world* prompts (invented geography, invented pantheon, invented history) rather than "modern city with a hidden magic layer."

**Worldbuilding.** The standard approach authors use moves through a consistent set of layers: physical geography and climate (which shapes how cultures form — desert climates produce nomadic cultures, isolated valleys produce insular ones), history (origin myths, wars, revolutions, founding events), culture (customs, religion, language, values — built from *multiple* real-world influences rather than a reskin of one), and government/politics. Keeping a running "world bible" document as you go is the universal piece of advice — the generator should effectively build that document for you as you move through steps. [Source: thelittlebookish.com, quillandsteel.com]

**Magic systems.** The most useful frame here is Brandon Sanderson's split between *hard* and *soft* magic. Hard magic systems have explicit rules, costs, and limits — the reader (or in this case, you-the-writer) can predict what magic can and can't solve, and it can be used to resolve plot conflicts fairly. Soft magic is deliberately underexplained and mysterious, used for wonder and atmosphere rather than problem-solving. Sanderson's First Law: *your ability to use magic to resolve conflict is directly proportional to how well the system is explained.* The generator should let the user pick a point on that spectrum rather than forcing one style, since it changes what questions matter (hard = define exact costs/limits/rules; soft = define feeling, symbolism, and what stays unknown). [Source: brandonsanderson.com, rhyananeev.substack.com]

**Plot and subplots.** Most high fantasy still runs on a Hero's Journey backbone (ordinary world → call to adventure → mentor → crossing the threshold → tests/allies/enemies → ordeal → reward → road back → return), which works well as the generator's main-plot skeleton. Subplots are where genre flavor comes from, and they should be offered as an explicit, mixable menu rather than baked into one story type:

- **Political intrigue** — factions, succession, betrayal, war brewing at the edges; works best when it's personal (a choice between duty and someone you love) rather than abstract policy.
- **Romance (general)** — a secondary character who draws out the protagonist's hidden motivations and vulnerabilities; needs its own mini-arc, not just a subplot that trails off.
- **Dark romance / romantasy** — enemies-to-lovers, fated mates, forbidden love, morally-grey love interests; higher stakes, more obsessive tone, often paired with a "the universe is against us" mechanic (a curse, a bond, a prophecy).
- **Found family** — a found "party" or found household that becomes the emotional core alongside the main quest.
- **Redemption arc** — a character (sometimes the protagonist, sometimes an ally or even the antagonist) working against their own past harm.
- **Coming of age** — identity and power maturing together, common when the protagonist is young or newly magical.
- **Mystery/investigation** — a hidden truth about the world, a death, or the magic system itself, uncovered in parallel with the main plot.

[Sources: quillandsteel.com, bookriot.com, seacrowbooks.com, penguin.co.uk, thewildekingdom.com, prowritingaid.com, storyflint.com]

**AI tooling landscape (2026).** There's already a small ecosystem of narrow AI tools doing pieces of this — fantasy map generators built on diffusion models (Inkarnate, ZSky, Imagine Art, Perchance) and character/RPG-art generators (CharGen). None of them chain worldbuilding → magic → characters → plot → art into one guided flow with a consistent "suggest, then pick" pattern — that combination is the actual product idea here, not any single generation step. [Source: cgdream.ai, zsky.ai, char-gen.com]

---

## 3. Core interaction pattern

Every stage in the flow follows the same loop, so the app should feel predictable even though the content is always different:

1. **Generate** — the app calls an LLM (and, for two stages, an image model) with the accumulated world context so far, and returns 3–4 distinct options.
2. **Present** — options shown as cards, each with a short title + 2–3 sentence description (or an image, for map/portrait stages).
3. **Select or reroll** — user picks one, rerolls the whole batch, or rerolls a single card. A lightweight "edit before confirming" text field lets them tweak the winning option instead of accepting it verbatim.
4. **Lock in** — the chosen option is saved to the World Bible (see data model) and included in the context sent to every later stage, so choices compound instead of resetting each time.

This same four-step loop is reused for worldbuilding, magic system, characters, and plot points — only the prompt template and the number of cards changes per stage.

---

## 4. Step-by-step flow

### Step 1 — World building
Establish the secondary world before anything else, since geography/culture/history feed every later stage.
- Sub-prompts offered as pickable cards: **world premise** (e.g. "a fractured empire held together by dying magic," "island nations connected by sky-roads"), **geography/climate**, **dominant peoples/species**, **origin myth**, **a defining historical event or war**, **governing power structure**.
- User can do all sub-prompts or skip straight to defaults for speed — not every session needs full depth.
- Output: a structured **World Bible** entry (see data model).

### Step 2 — Map generation
- Using the world's geography/climate answers as the prompt seed, generate 3–4 fantasy map images (text-to-image).
- **Art style: detailed and realistic** — not stylized/cartoon cartography. Prompt template should lean toward richly rendered terrain, lighting, and texture (mountain shading, forest density, coastline detail) rather than flat illustrated-map icons.
- User picks one, optionally regenerates specific regions or adds/renames key locations (capital city, magic-related landmark, etc.) as simple labeled pins.
- Output: a map image + a short list of named locations tied to the World Bible.

### Step 3 — Magic system
- First choice: **hard vs. soft** (with a one-line explainer of the tradeoff, drawn from the research above).
- Then generated options for: **source of magic** (divine gift, natural force, bloodline, learned craft, cost-based bargain), **who can use it and how they access it**, **costs/limits**, **cultural attitude toward magic** (revered, feared, regulated, hidden).
- Output: a Magic System entry linked to the World Bible.

### Step 4 — Characters + plot points
- Generate a small cast (protagonist + 1–3 others: mentor, rival/love interest, antagonist) as option cards, each with name, role, a one-line hook, and a personality/motivation summary — shaped by the world and magic system already chosen.
- Separately, generate **plot point suggestions**: a main-plot skeleton (Hero's Journey beats, pre-filled but editable) plus a subplot picker where the user selects one or two flavors from the subplot menu in the research section (political intrigue, dark romance, found family, redemption arc, coming of age, mystery).
- Output: Character entries + a Plot Outline entry, both linked to the World Bible.

### Step 5 — Character portrait art
- For each locked-in character, generate 2–3 portrait image options seeded by their description, role, and the world's visual tone (see art direction below).
- User selects a favorite per character; option to regenerate with a tweaked text description (hair color, expression, outfit detail) before finalizing.
- Output: a portrait image attached to each Character entry.

### Result screen
A single shareable "story kit" summary page: world summary, map, magic system, character portraits + bios, and plot outline — exportable as an image/PDF or just kept in-app for reference while writing.

---

## 5. Visual & art direction

Dramatic, romantic high-fantasy — think painterly book-cover illustration rather than flat UI illustration.

- **Palette:** deep jewel tones as the base (midnight blue, forest green, wine red) with metallic gold/bronze accents for borders and dividers — evokes illuminated manuscripts and book covers rather than a generic "purple gradient SaaS" look.
- **Typography:** an elegant serif or display serif for headings (something with a slight calligraphic flourish), clean readable serif or humanist sans for body text so long generated descriptions stay legible.
- **Characters & motion:** animated figures in flowing dresses/cloaks reacting subtly to cursor movement or scroll (fabric sway, hair drift) — CSS/SVG-based cloth-sim-style animation is enough; doesn't need to be a full game engine. Use these as section dividers or a hero illustration rather than everywhere, so they stay special.
- **Fauna & fine detail:** recurring motifs — foxes, owls, stags, moths, dragons, vines — as small animated accents (a moth that drifts across the screen, vines that grow in on page load) rather than clutter; ties visually to the "generate a new option" action (e.g. a card reroll could trigger a small leaf/spark particle burst).
- **Transitions:** page-turn or parchment-unroll style transitions between the five steps reinforce the "storybook" feel and double as a natural progress indicator.
- **Card UI:** the generated-option cards themselves should look like tarot cards or illuminated scrollwork panels — framed, slightly ornamented borders — rather than plain rectangles, so the "pick one" moment feels ceremonial rather than transactional.
- **Two image styles, used deliberately:** maps are **detailed and realistic** (rendered terrain/lighting, not stylized icons), while character portraits stay painterly/book-cover style to match the rest of the UI — the contrast is intentional, maps read as "real terrain," portraits read as "illustrated cast."

---

## 6. Content libraries to build

These are the structured prompt/reference libraries the app needs behind the scenes — effectively the "game data" that makes generations feel genre-authentic instead of generic:

- **World premise seeds** — a bank of high-fantasy premise archetypes (dying magic empire, sky-realms, underworld bargains, elemental courts, etc.)
- **Subplot menu** — political intrigue, dark romance/romantasy, found family, redemption arc, coming of age, mystery — each with a short definition and 2–3 example beats, used both as user-facing picker copy and as LLM prompt context.
- **Hero's Journey beat template** — the 12-stage structure as an editable skeleton for the plot outline step.
- **Magic system archetype list** — source/cost/access patterns to seed generation (bloodline magic, bargained magic, elemental attunement, divine channeling, forbidden/outlawed magic, etc.)
- **Species/peoples bank** — optional non-human peoples with a line on their cultural flavor, for worlds that want them.

---

## 7. Suggested tech stack

Kept intentionally simple since this is a personal/portfolio project, not a production SaaS.

| Layer | Recommendation | Why |
|---|---|---|
| Frontend | React (Vite) | Needed for the multi-step wizard state, card animations, and reuse of the generate/select/lock-in pattern across five steps. |
| Styling/animation | Tailwind + Framer Motion (or CSS animations) for the flowy-dress/fauna motion | Framer Motion makes the drift/sway/particle effects manageable without a game engine. |
| Text generation | Claude API (Anthropic) | Handles world/magic/character/plot text generation with strong prompt-following for structured, genre-consistent output. |
| Image generation | A hosted diffusion model API (e.g. via Replicate, Stability, or similar) | Needed for both the map step and the character portrait step; keep these behind a serverless function so the API key never sits in frontend code. |
| Backend/API layer | Lightweight serverless functions (Vercel Functions, since the portfolio site already deploys there) | Just enough to proxy the LLM/image calls and keep keys server-side — no need for a full backend framework. |
| Persistence | None for v1 — one session, export at the end, start fresh next time. No login, no database. | Confirmed scope: v1 is a single guided session that ends in an export, not a saved library of worlds. A DB only gets added later (Phase 4) if you actually miss it. |

---

## 8. Data model (sketch)

```
World
 ├─ premise, geography, climate, dominant peoples
 ├─ originMyth, historicalEvents[]
 ├─ governmentStructure
 └─ locations[] (from map step: name, type, notes)

MagicSystem (belongs to World)
 ├─ hardOrSoft
 ├─ source, accessRule, costsAndLimits
 └─ culturalAttitude

Character (belongs to World)
 ├─ name, role (protagonist/mentor/rival/antagonist/etc.)
 ├─ hook, motivation, personalitySummary
 ├─ magicAffinity (optional link to MagicSystem)
 └─ portraitImageUrl

PlotOutline (belongs to World)
 ├─ mainPlotBeats[] (Hero's Journey skeleton, editable)
 ├─ subplotType[] (from subplot menu)
 └─ subplotBeats[]

StoryKit
 └─ references one World + its Map + MagicSystem + Character[] + PlotOutline — the final exportable summary
```

---

## 9. Phased roadmap

**Phase 1 — MVP (proof of concept)**
World building step + magic system step, text-only (no map/portraits yet), single session, no save/login, deployed as a standalone page linked from the portfolio.

**Phase 2 — Full flow**
Add map generation (detailed/realistic style), character + plot point generation, character portraits, a **bonus "generate a short opening scene" step** (a few paragraphs of prose seeded by the locked-in world/magic/characters/plot, offered as an optional extra after the plot outline rather than a required stage), and the final story-kit summary/export screen.

Also refine the World Building and Magic System steps (built in Phase 1) with explicit **Skip** and **Randomize** actions per field, alongside the existing generate/select/reroll/lock-in loop:
- **Skip** — leave the field unset entirely; skipped fields are simply absent from the World Bible and excluded from later context, rather than silently defaulted.
- **Randomize** — explicitly lock in one random option from the current batch (or a fresh local pull) without reading through and comparing cards first.
- If a user reaches the end of a step having done neither for a given field, treat it as skipped — no field is ever auto-filled with a default behind the scenes (this replaces the current MVP's silent "skip remaining with defaults" behavior, which auto-picks the first option).
- Important UX constraint: **no option is ever pre-selected or visually highlighted** as a suggested pick. Skip and Randomize must be presented as neutral, equally-weighted actions — not a shortcut that makes skipping feel like the path of least resistance.

**Phase 3 — Polish**
Full art direction pass (flowy-dress hero animation, fauna motifs, tarot-card styling, page-turn transitions) and a clean export (image or PDF) — export remains the only way to keep a story kit; no save/resume by design.

**Phase 4 — Nice-to-haves (optional, only if still fun to work on)**
Account + database persistence to revisit past worlds, regenerate individual fields without restarting a stage, "remix this world" (fork an existing story kit into a new branch). Only worth doing if v1–v3's "one session, export, start fresh" model starts to feel limiting in practice.

---

## 10. Decisions locked in

- **Scope:** one session, export, start fresh — no accounts, no saved library of worlds in v1. Persistence only revisited in Phase 4 if it turns out to be missed.
- **Prose:** the flow stops at plot points/outline by default; a **"generate a short opening scene"** bonus step is included in Phase 2 as an optional extra, not a required stage.
- **Map art style:** detailed and realistic (not stylized/cartoon) — see Step 2 and the art direction section for how this contrasts with the painterly character portrait style.

---

## 11. Linking to the portfolio

Once Phase 1 is live, add it to `projects.js` in the portfolio repo:

```js
{
  title: "Mythforge",
  description: "A guided high-fantasy story generator — build a world, magic system, cast, and plot outline through AI-suggested choices.",
  tags: ["React", "Claude API", "Image Gen"],
  link: "https://mythforge.vercel.app",
  repo: "https://github.com/<you>/mythforge",
  emoji: "🗡️"
}
```
