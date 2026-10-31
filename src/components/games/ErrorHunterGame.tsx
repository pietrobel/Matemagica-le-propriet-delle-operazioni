import React, { useState } from 'react';
import { GameScoreResult } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { 
  Crosshair, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ErrorHunterGameProps {
  onFinishGame: (res: GameScoreResult) => void;
  onExit: () => void;
}

import { generateHunterCases, HunterCaseInstance } from '../../utils/proceduralGenerators';

export const ErrorHunterGame: React.FC<ErrorHunterGameProps> = ({ onFinishGame, onExit }) => {
  const [cases, setCases] = useState<HunterCaseInstance[]>(() => generateHunterCases());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWrongStep, setSelectedWrongStep] = useState<number | null>(null);
  const [selectedCorrection, setSelectedCorrection] = useState<number | null>(null);
  const [stage, setStage] = useState<'hunt_step' | 'pick_correction' | 'result'>('hunt_step');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isSuccess: boolean; title: string; desc: string } | null>(null);

  const curCase = cases[currentIdx] || cases[0];

  const handleRestartNewNumbers = () => {
    soundManager.playPop();
    setCases(generateHunterCases());
    setCurrentIdx(0);
    setSelectedWrongStep(null);
    setSelectedCorrection(null);
    setStage('hunt_step');
    setScore(0);
    setFeedback(null);
  };

  const handleStepClick = (stepIndex: number) => {
    setSelectedWrongStep(stepIndex);
    const stepObj = curCase.steps.find(s => s.stepIndex === stepIndex);

    if (stepObj?.isWrong) {
      soundManager.playCorrect();
      setScore(prev => prev + 100);
      setStage('pick_correction');
    } else {
      soundManager.playGentleError();
      setFeedback({
        isSuccess: false,
        title: 'Passaggio Corretto!',
        desc: `Il passaggio ${stepIndex} è matematicamente valido. Cerca bene negli altri passaggi: uno di essi viola una proprietà!`
      });
      setStage('result');
    }
  };

  const handleSelectCorrection = (cIdx: number) => {
    setSelectedCorrection(cIdx);
    const opt = curCase.correctionOptions[cIdx];

    if (opt.isCorrect) {
      soundManager.playCorrect();
      setScore(prev => prev + 150);
      setFeedback({
        isSuccess: true,
        title: 'Errore Scovato e Corretto con Successo!',
        desc: curCase.explanation
      });
    } else {
      soundManager.playGentleError();
      setFeedback({
        isSuccess: false,
        title: 'Correzione non valida.',
        desc: curCase.explanation
      });
    }

    setStage('result');
  };

  const handleNextCase = () => {
    soundManager.playPop();
    setSelectedWrongStep(null);
    setSelectedCorrection(null);
    setFeedback(null);

    if (currentIdx < cases.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setStage('hunt_step');
    } else {
      onFinishGame({
        gameId: 'error_hunter',
        score: score,
        starsEarned: 3,
        xpEarned: score,
        correctAnswers: currentIdx + 1,
        totalQuestions: cases.length
      });
    }
  };

  const handleRetryCurrent = () => {
    soundManager.playPop();
    setSelectedWrongStep(null);
    setSelectedCorrection(null);
    setFeedback(null);
    setStage('hunt_step');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center shadow-md">
            <Crosshair className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                Gioco 2 · Caccia all'Errore
              </span>
              <span className="text-xs font-bold text-slate-500">
                Caso {curCase.id} di {cases.length}
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">{curCase.caseTitle}</h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Punti Detective</p>
            <p className="text-xl font-black text-rose-600">{score} XP</p>
          </div>
          <button
            onClick={handleRestartNewNumbers}
            title="Genera nuovi casi procedurali"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nuova Partita</span>
          </button>
          <button
            onClick={onExit}
            className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
          >
            Esci
          </button>
        </div>
      </div>

      {/* Case Prompt */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-md">
            Argomento: {curCase.mathTopic}
          </span>
          <p className="text-sm font-bold text-slate-900 mt-1">{curCase.problemPrompt}</p>
        </div>
        <p className="text-xs text-slate-500">
          Trova quale dei 4 passaggi contiene l'errore logico o algebrico!
        </p>
      </div>

      {/* Stage 1: Steps Hunt */}
      {stage === 'hunt_step' && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-rose-500" />
            <span>Clicca sul passaggio in cui si nasconde l'errore:</span>
          </h4>

          <div className="space-y-3">
            {curCase.steps.map(st => (
              <button
                key={st.stepIndex}
                onClick={() => handleStepClick(st.stepIndex)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-rose-400 hover:bg-rose-50/50 text-left transition-all flex items-center justify-between group active:scale-98 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-rose-500 group-hover:text-white text-slate-700 flex items-center justify-center text-xs font-black transition-colors">
                    {st.stepIndex}
                  </span>
                  <div>
                    <p className="text-xs text-slate-600">{st.text}</p>
                    <p className="font-mono font-bold text-sm text-slate-900 group-hover:text-rose-700 mt-0.5">{st.math}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Seleziona questo passaggio 🎯
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stage 2: Pick Correction */}
      {stage === 'pick_correction' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Bersaglio centrato! Hai individuato il passaggio {selectedWrongStep} errato. Ora scegli la correzione rigorosa:</span>
          </div>

          <div className="space-y-3">
            {curCase.correctionOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectCorrection(idx)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-left text-xs sm:text-sm font-semibold text-slate-800 transition-all flex items-start gap-3 active:scale-98 shadow-xs"
              >
                <span className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stage 3: Result Feedback */}
      {stage === 'result' && feedback && (
        <div className="space-y-6 animate-fade-in">
          <div className={`p-6 rounded-2xl border-2 text-sm space-y-2 ${
            feedback.isSuccess
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-center gap-2 font-black text-base">
              {feedback.isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600" />
              )}
              <span>{feedback.title}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{feedback.desc}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            {!feedback.isSuccess ? (
              <button
                onClick={handleRetryCurrent}
                className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Riprova il caso</span>
              </button>
            ) : (
              <button
                onClick={handleNextCase}
                className="w-full sm:w-auto px-7 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{currentIdx < cases.length - 1 ? 'Prossimo Caso da Indagare' : 'Tutti i Casi Risolti!'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
