import React from 'react';

/**
 * Decorative hero illustration for the app header — a small, more
 * human-proportioned silhouette (defined shoulders and waist, a static
 * torso) with a flowing dress built from three independently-swaying
 * layers below the waist, so the "cloth sim" motion reads on the skirt
 * without making the whole figure wobble.
 *
 * Purely decorative: aria-hidden, no text content.
 */
export default function HeroFigure() {
  return (
    <svg
      className="hero-figure"
      viewBox="0 0 140 230"
      width="120"
      height="197"
      aria-hidden="true"
      focusable="false"
    >
      <g className="hero-figure__tilt">
        <path
          className="hero-figure__skirt hero-figure__skirt--1"
          d="M60,90 C42,105 20,145 12,205 C45,225 95,225 128,205 C120,145 98,105 80,90 Z"
        />
        <path
          className="hero-figure__skirt hero-figure__skirt--2"
          d="M65,92 C50,110 32,148 26,200 C50,218 90,218 114,200 C108,148 90,110 75,92 Z"
        />
        <path
          className="hero-figure__skirt hero-figure__skirt--3"
          d="M68,94 C58,112 46,150 42,195 C58,210 82,210 98,195 C94,150 82,112 72,94 Z"
        />
        <path
          className="hero-figure__torso"
          d="M70,40 C58,41 50,50 48,64 C47,74 52,84 60,90 L80,90 C88,84 93,74 92,64 C90,50 82,41 70,40 Z"
        />
        <path className="hero-figure__hair hero-figure__hair--l" d="M60,18 C50,30 46,45 52,58" />
        <path className="hero-figure__hair hero-figure__hair--r" d="M80,18 C90,30 94,45 88,58" />
        <circle className="hero-figure__head" cx="70" cy="26" r="14" />
      </g>
    </svg>
  );
}
