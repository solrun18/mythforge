# Mythforge — Phase 2 complete

Full guided flow now implemented per the [blueprint](./BLUEPRINT.md): World Building → Map → Magic System → Characters → Portraits → Plot Points → Opening Scene (bonus) → Story Kit summary/export.

## What's in this build

**Text generation** (World Building, Magic System, Characters, Plot beats, Opening Scene) uses Claude via `/api/generate`, with every field, plus explicit **Reroll / Surprise me / Skip** actions — no card is ever pre-selected.

**Image generation** (World Map, Character Portraits) uses OpenAI's Images API via a new `/api/generate-image` endpoint. Both are manual-trigger (you click Generate, nothing happens automatically) since image generation costs money per call. There's no local fallback for images — without an API key, you'll see a tasteful placeholder graphic instead of a real image, styled to match the app.

- **Map**: detailed/realistic style, seeded from your World Premise + Geography. Includes a simple named-location list (add/remove) alongside the image — not click-to-place pins on the image itself, just a straightforward list.
- **Portraits**: painterly, book-cover style — a deliberate visual contrast to the map's realism. One portrait generator per locked character (Protagonist/Mentor/Rival/Antagonist); characters you skipped simply don't get a portrait slot.

**Story Kit summary + Markdown export** now includes the map image, named locations, and character portraits (embedded as base64 images in the exported `.md` — expect a few MB if you generated several images).

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

This was built and synced into your actual `Claude Projects/mythforge` folder, where `node_modules` was already present from your earlier `npm install` — so this time I could run a real `npm run build` (not just syntax checks) directly against it. It completed cleanly: 57 modules, no errors. Still worth a `npm run dev` pass on your end to click through the new Map and Portraits steps and confirm the UX feels right.

## Known limitations

- Map locations are a simple list, not literal pins placed on the image (that would need click-to-position UI — a reasonable future add if you want it).
- Image generation cost: every "Generate"/"Regenerate" click is a real paid API call once you add an OpenAI key — nothing auto-generates on page load.
- No persistence, still by design — one session, export, start fresh.
