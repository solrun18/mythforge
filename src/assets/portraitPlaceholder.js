// Inline SVG placeholder shown when no OPENAI_API_KEY is configured.
export const PORTRAIT_PLACEHOLDER_SVG = `
<svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="portraitbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7a2140"/>
      <stop offset="100%" stop-color="#1d1533"/>
    </linearGradient>
  </defs>
  <rect width="240" height="240" fill="url(#portraitbg)"/>
  <circle cx="120" cy="95" r="42" fill="#f3ead9" opacity="0.18"/>
  <path d="M50 210c0-48 32-80 70-80s70 32 70 80" fill="#f3ead9" opacity="0.18"/>
  <rect x="4" y="4" width="232" height="232" fill="none" stroke="#c9a24b" stroke-opacity="0.4"/>
  <text x="120" y="200" text-anchor="middle" fill="#e8c873" font-family="Georgia, serif" font-size="12">No portrait yet</text>
</svg>
`.trim();
