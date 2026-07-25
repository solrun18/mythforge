import React from 'react';

/**
 * Small recurring fauna/flora motifs — subtle animated accents rather
 * than illustration set-pieces, per the blueprint's art direction
 * (vines as dividers, owls/foxes/stags as background flavor). All
 * purely decorative: aria-hidden, no text.
 */

export function OwlAccent({ className = '' }) {
  return (
    <svg
      className={`fauna-accent owl-accent ${className}`.trim()}
      viewBox="0 0 60 60"
      width="46"
      height="46"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18,18 L22,6 L26,18 Z" className="fauna-accent__fill" />
      <path d="M34,18 L38,6 L42,18 Z" className="fauna-accent__fill" />
      <ellipse cx="30" cy="36" rx="16" ry="20" className="fauna-accent__fill" />
      <circle cx="23" cy="32" r="5" className="owl-accent__eye" />
      <circle cx="37" cy="32" r="5" className="owl-accent__eye" />
      <circle cx="23" cy="32" r="2" className="owl-accent__pupil" />
      <circle cx="37" cy="32" r="2" className="owl-accent__pupil" />
      <path d="M28,40 L32,40 L30,46 Z" className="owl-accent__beak" />
    </svg>
  );
}

export function StagAccent({ className = '' }) {
  return (
    <svg
      className={`fauna-accent stag-accent ${className}`.trim()}
      viewBox="0 0 120 90"
      width="90"
      height="68"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="55" cy="58" rx="28" ry="13" className="fauna-accent__fill" />
      <path d="M78,53 L95,22 L102,24 L86,57 Z" className="fauna-accent__fill" />
      <circle cx="98" cy="20" r="7" className="fauna-accent__fill" />
      <path d="M95,14 C91,6 82,3 75,5" className="fauna-accent__line" />
      <path d="M101,14 C105,6 114,3 118,6" className="fauna-accent__line" />
      <path d="M27,52 L18,49 L27,58 Z" className="fauna-accent__fill" />
      <line x1="35" y1="68" x2="35" y2="86" className="fauna-accent__leg" />
      <line x1="45" y1="70" x2="45" y2="88" className="fauna-accent__leg" />
      <line x1="68" y1="70" x2="68" y2="88" className="fauna-accent__leg" />
      <line x1="78" y1="68" x2="78" y2="86" className="fauna-accent__leg" />
    </svg>
  );
}

export function FoxAccent({ className = '' }) {
  return (
    <svg
      className={`fauna-accent fox-accent ${className}`.trim()}
      viewBox="0 0 80 60"
      width="64"
      height="48"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20,40 C8,35 4,20 14,12 C10,22 14,34 24,38 Z" className="fox-accent__fill" />
      <ellipse cx="38" cy="38" rx="20" ry="11" className="fox-accent__fill" />
      <circle cx="60" cy="28" r="9" className="fox-accent__fill" />
      <path d="M54,20 L52,10 L58,19 Z" className="fox-accent__fill" />
      <path d="M64,19 L68,9 L66,20 Z" className="fox-accent__fill" />
      <path d="M67,30 L76,32 L67,34 Z" className="fox-accent__fill" />
      <line x1="26" y1="46" x2="26" y2="56" className="fox-accent__leg" />
      <line x1="34" y1="47" x2="34" y2="57" className="fox-accent__leg" />
      <line x1="44" y1="47" x2="44" y2="57" className="fox-accent__leg" />
      <line x1="52" y1="46" x2="52" y2="56" className="fox-accent__leg" />
    </svg>
  );
}

export function VineDivider({ className = '' }) {
  return (
    <svg
      className={`vine-divider ${className}`.trim()}
      viewBox="0 0 600 30"
      width="100%"
      height="24"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="vine-divider__stem"
        d="M0,15 C50,0 100,30 150,15 C200,0 250,30 300,15 C350,0 400,30 450,15 C500,0 550,30 600,15"
      />
      <g className="vine-divider__leaves">
        <ellipse cx="75" cy="6" rx="6" ry="3" transform="rotate(-30 75 6)" />
        <ellipse cx="225" cy="24" rx="6" ry="3" transform="rotate(30 225 24)" />
        <ellipse cx="375" cy="6" rx="6" ry="3" transform="rotate(-30 375 6)" />
        <ellipse cx="525" cy="24" rx="6" ry="3" transform="rotate(30 525 24)" />
      </g>
    </svg>
  );
}
