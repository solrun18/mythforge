import React, { useState } from 'react';
import { WorldBibleProvider } from './context/WorldBibleContext.jsx';
import { GenerationModeProvider } from './context/GenerationModeContext.jsx';
import ProgressSteps from './components/ProgressSteps.jsx';
import StepWorldBuilding from './steps/StepWorldBuilding.jsx';
import StepMap from './steps/StepMap.jsx';
import StepMagicSystem from './steps/StepMagicSystem.jsx';
import StepCharacters from './steps/StepCharacters.jsx';
import StepPortraits from './steps/StepPortraits.jsx';
import StepPlot from './steps/StepPlot.jsx';
import StepOpeningScene from './steps/StepOpeningScene.jsx';
import StepSummary from './steps/StepSummary.jsx';

const STEP_WORLD = 0;
const STEP_MAP = 1;
const STEP_MAGIC = 2;
const STEP_CHARACTERS = 3;
const STEP_PORTRAITS = 4;
const STEP_PLOT = 5;
const STEP_SCENE = 6;
const STEP_SUMMARY = 7;

function AppShell() {
  const [step, setStep] = useState(STEP_WORLD);

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-header__eyebrow">✦ Mythforge ✦</p>
        <h1>Build a world worth writing.</h1>
        <p className="app-header__sub">
          A guided high-fantasy generator. Pick your way through worldbuilding, a map, magic,
          characters and their portraits, and plot — every choice is suggested, but you decide
          what stays, what gets skipped, what gets left to chance, and whether each step rolls
          locally or with AI.
        </p>
      </header>

      <ProgressSteps current={step} />

      <main className="app-main">
        {step === STEP_WORLD && <StepWorldBuilding onContinue={() => setStep(STEP_MAP)} />}
        {step === STEP_MAP && (
          <StepMap onContinue={() => setStep(STEP_MAGIC)} onBack={() => setStep(STEP_WORLD)} />
        )}
        {step === STEP_MAGIC && (
          <StepMagicSystem onContinue={() => setStep(STEP_CHARACTERS)} onBack={() => setStep(STEP_MAP)} />
        )}
        {step === STEP_CHARACTERS && (
          <StepCharacters onContinue={() => setStep(STEP_PORTRAITS)} onBack={() => setStep(STEP_MAGIC)} />
        )}
        {step === STEP_PORTRAITS && (
          <StepPortraits onContinue={() => setStep(STEP_PLOT)} onBack={() => setStep(STEP_CHARACTERS)} />
        )}
        {step === STEP_PLOT && (
          <StepPlot onContinue={() => setStep(STEP_SCENE)} onBack={() => setStep(STEP_PORTRAITS)} />
        )}
        {step === STEP_SCENE && (
          <StepOpeningScene onContinue={() => setStep(STEP_SUMMARY)} onBack={() => setStep(STEP_PLOT)} />
        )}
        {step === STEP_SUMMARY && (
          <StepSummary onBack={() => setStep(STEP_SCENE)} onStartFresh={() => setStep(STEP_WORLD)} />
        )}
      </main>

      <footer className="app-footer">
        <p>Mythforge — a personal creative-inspiration tool. Nothing here is saved once you leave.</p>
        <div className="app-footer__about">
          <span className="app-footer__credit">Made by Sólrún</span>
          <a href="mailto:solrunasta@hotmail.com">✉ solrunasta@hotmail.com</a>
          <a href="https://is.linkedin.com/in/solrunasta" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <GenerationModeProvider>
      <WorldBibleProvider>
        <AppShell />
      </WorldBibleProvider>
    </GenerationModeProvider>
  );
}
