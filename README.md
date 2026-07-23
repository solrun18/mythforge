# Mythforge — Phase 2 complete

Full guided flow now implemented per the [blueprint](./BLUEPRINT.md): World Building → Map → Magic System → Characters → Portraits → Plot Points → Opening Scene (bonus) → Story Kit summary/export.

## What's in this build

**Text generation** (World Building, Magic System, Characters, Plot beats, Opening Scene) uses Claude via `/api/generate`, with every field, plus explicit **Reroll / Surprise me / Skip** actions — no card is ever pre-selected.

**Image generation** (World Map, Character Portraits) uses OpenAI's Images API via a new `/api/generate-image` endpoint. Both are manual-trigger (you click Generate, nothing happens automatically) since image generation costs money per call. There's no local fallback for images — without an API key, you'll see a tasteful placeholder graphic instead of a real image, styled to match the app.

- **Map**: detailed/realistic style, seeded from your World Premise + Geography. Includes a simple named-location list (add/remove) alongside the image — not click-to-place pins on the image itself, just a straightforward list.
- **Portraits**: painterly, book-cover style — a deliberate visual contrast to the map's realism. One portrait generator per locked character (Protagonist/Mentor/Rival/Antagonist); characters you skipped simply don't get a portrait slot.

**Story Kit summary + Markdown export** now includes the map image, named locations, and character portraits (embedded as base64 images in the exported `.md` — expect a few MB if you generated several images).

**Local / AI toggle, per individual generator.** Every single field, portrait, the map, and the opening scene each has its own compact switch, defaulting to **Local**. The switch sits bottom-right of its block, right above the "✦ AI generated" / "✦ Local roll…" text announcing which mode produced what's on screen. There's no global switch and no step-level switch — granularity is per category:

- World Building: 6 separate switches (Premise, Geography, Peoples, Origin Myth, Historical Event, Government).
- Magic System: 4 switches (Source, Access, Costs, Attitude) — the Hard/Soft picker itself has no switch since it's a fixed choice, not generated.
- Characters: 4 switches (Protagonist, Mentor, Rival/Love Interest, Antagonist).
- Portraits: one switch per character card (so you can AI-roll the protagonist's portrait while leaving the others on Local).
- Plot: 6 switches for the main beats, plus one more for each subplot arc you've selected.
- Map: 1 switch. Opening Scene: 1 switch.
- **Local** (default): text comes from the hand-written content library, images show the placeholder graphic — zero cost, zero setup, works offline.
- **AI**: that specific field/portrait/etc. goes through Claude or OpenAI (using whichever keys you've configured — see below). If a key is missing or a call fails, it quietly falls back to local/placeholder rather than erroring.

Every switch is fully independent — you could, for instance, AI-roll just the Protagonist field and its portrait while everything else in the app stays on Local. Switching a field's mode only affects that field's next generation — it doesn't retroactively change something already locked in, and it doesn't auto-regenerate cards already on screen. Image "Regenerate" buttons are disabled while their own switch is on Local, so a stray click can't wipe out a real AI-generated image with a placeholder.

## Setup

```
npm install
npm run dev
```

Copy `.env.example` to `.env` and add your own keys to unlock real generation:

```
ANTHROPIC_API_KEY=sk-ant-...      # text generation (world, magic, characters, plot, opening scene)
OPENAI_API_KEY=sk-...             # image generation (map, portraits)
```

Get an Anthropic key at [console.anthropic.com](https://console.anthropic.com) and an OpenAI key at [platform.openai.com](https://platform.openai.com). Add them yourself, locally or in Vercel's dashboard — don't paste them into chat with me.

Everything works with zero keys (local text fallback + placeholder images); each key you add unlocks the real version of that half of the app independently.

## Project structure additions since Phase 2 (text)

```
api/generate-image.js            OpenAI Images API call, server-side only
src/lib/imageClient.js           Client wrapper — no local fallback possible for images
src/assets/mapPlaceholder.js     Inline SVG shown when no OPENAI_API_KEY is set
src/assets/portraitPlaceholder.js
src/components/MapGenerator.jsx      Map image + named-location list
src/components/PortraitGenerator.jsx Per-character portrait generator
src/steps/StepMap.jsx            Inserted after World Building
src/steps/StepPortraits.jsx      Inserted after Characters
```

## Deploy

Same as before — push to GitHub, Vercel auto-detects Vite + the `/api` functions. Add both `ANTHROPIC_API_KEY` and `OPENAI_API_KEY` under Settings → Environment Variables once deployed.

## Verification note

Built and edited directly in your actual `Claude Projects/mythforge` folder, using the `node_modules` already installed there — so each round has been a real `npm run build`, not just syntax checks. Latest build: 43 modules, no errors. Still worth a `npm run dev` pass on your end to click through a few switches and confirm the granularity feels right.

## Known limitations

- Map locations are a simple list, not literal pins placed on the image (that would need click-to-position UI — a reasonable future add if you want it).
- Image generation cost: every "Generate"/"Regenerate" click is a real paid API call once you add an OpenAI key — nothing auto-generates on page load.
- No persistence, still by design — one session, export, start fresh.
