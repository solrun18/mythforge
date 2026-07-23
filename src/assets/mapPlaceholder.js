// Inline SVG placeholder shown when no OPENAI_API_KEY is configured.
// Kept as a JS-exported string (rather than a static .svg file) so it can
// reuse the app's CSS custom properties indirectly via hard-coded hex
// values that match the palette in App.css.
export const MAP_PLACEHOLDER_SVG = `
<svg width="480" height="320" viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mapbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1d1533"/>
      <stop offset="100%" stop-color="#251b3f"/>
    </linearGradient>
  </defs>
  <rect width="480" height="320" rx="12" fill="url(#mapbg)" stroke="#c9a24b" stroke-opacity="0.35"/>
  <g transform="translate(240,150)" stroke="#c9a24b" stroke-width="1.5" fill="none" opacity="0.8">
    <circle r="70"/>
    <circle r="46"/>
    <line x1="-90" y1="0" x2="90" y2="0"/>
    <line x1="0" y1="-90" x2="0" y2="90"/>
    <line x1="-64" y1="-64" x2="64" y2="64"/>
    <line x1="-64" y1="64" x2="64" y2="-64"/>
    <polygon points="0,-90 6,-70 -6,-70" fill="#c9a24b" stroke="none"/>
  </g>
  <text x="240" y="270" text-anchor="middle" fill="#e8c873" font-family="Georgia, serif" font-size="15">No map yet</text>
  <text x="240" y="292" text-anchor="middle" fill="#f3ead9" fill-opacity="0.55" font-family="Georgia, serif" font-size="12">Add an OPENAI_API_KEY to generate one</text>
</svg>
`.trim();
