import React from 'react';
import { MothDrift, OwlAccent, StagAccent, FoxAccent } from './FaunaAccents.jsx';

// Fixed, hand-placed positions (not randomized on every render) so the
// scene looks deliberately art-directed rather than noisy. Percentages
// are relative to the fixed full-viewport background layer.
// Kept short on purpose — each dot is a cheap opacity/transform
// animation, but rendering fewer simultaneous animated elements (and
// dropping the blurred glow they used to have) is most of what makes
// this scene light to render instead of janky.
const GLITTER = [
  { top: '8%', left: '4%', size: 3, delay: '0s', duration: '3.2s' },
  { top: '20%', left: '92%', size: 3, delay: '0.3s', duration: '2.9s' },
  { top: '32%', left: '8%', size: 2, delay: '1.8s', duration: '3.1s' },
  { top: '48%', left: '95%', size: 2, delay: '0.2s', duration: '2.8s' },
  { top: '62%', left: '93%', size: 3, delay: '0.7s', duration: '2.5s' },
  { top: '70%', left: '15%', size: 2, delay: '1.6s', duration: '3.0s' },
  { top: '82%', left: '4%', size: 3, delay: '1.3s', duration: '3.5s' },
  { top: '90%', left: '55%', size: 3, delay: '1.5s', duration: '3.1s' },
];

/**
 * Fixed, full-viewport decorative layer: glitter particles, the moth
 * (now roaming a wide loop rather than pinned to the header), and a
 * few background fauna (owl, stag, fox). Sits behind the app content —
 * cards and panels have their own opaque backgrounds, so this shows
 * through in the page margins and gaps around them.
 *
 * pointer-events: none throughout so it never intercepts clicks; see
 * .background-scene in App.css for the fixed positioning/z-index.
 */
export default function BackgroundScene() {
  return (
    <div className="background-scene" aria-hidden="true">
      <div className="glitter-field">
        {GLITTER.map((g, i) => (
          <span
            key={i}
            className="glitter-dot"
            style={{
              top: g.top,
              left: g.left,
              width: g.size,
              height: g.size,
              animationDelay: g.delay,
              animationDuration: g.duration,
            }}
          />
        ))}
      </div>

      <OwlAccent className="background-scene__owl" />
      <StagAccent className="background-scene__stag" />
      <FoxAccent className="background-scene__fox" />
      <MothDrift className="background-scene__moth" />
    </div>
  );
}
