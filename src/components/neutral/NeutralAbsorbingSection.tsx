import React, { useState } from 'react';
import { NEUTRAL_ABSORBING_EXERCISES } from '../../data/neutralAbsorbingData';
import { GuidedExercise, AvatarConfig, LoggedError } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { ActivityCompletionModal } from '../common/ActivityCompletionModal';
import { 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Lightbulb, 
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ShieldAlert
} from 'lucide-react';

interface NeutralAbsorbingSectionProps {
  avatarConfig: AvatarConfig;
  onAwardXp: (amount: number) => void;
  onGoHome: () => void;
  onGoToGames: () => void;
  onGoToTheory: () => void;
  onLogError: (err: LoggedError) => void;
}

export const NeutralAbsorbingSection: React.FC<NeutralAbsorbingSectionProps> = ({
  avatarConfig,
  onAwardXp,
  onGoHome,
  onGoToGames,
  onGoToTheory,
  onLogError
}) => {
  const [activeTab, setActiveTab] = useState<'teoria' | 'esercizi'>('esercizi');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const currentExercise: GuidedExercise = NEUTRAL_ABSORBING_EXERCISES[currentIndex % NEUTRAL_ABSORBING_EXERCISES.length];

  const handleSelectOption = (opt: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(opt);
  };

  const handleVerify = () => {
    if (!selectedAnswer || isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = selectedAnswer === currentExercise.correctAnswer;
    if (isCorrect) {
      soundManager.playCorrect();
      onAwardXp(currentExercise.xpReward);
      setCorrectCount(prev => prev + 1);
    } else {
      soundManager.playGentleError();
      onLogError({
        id: `err_neutro_${Date.now()}`,
        timestamp: Date.now(),
        exerciseTitle: currentExercise.question,
        question: currentExercise.equationDisplay ? `${currentExercise.question} [${currentExercise.equationDisplay}]` : currentExercise.question,
        givenAnswer: selectedAnswer,
        correctAnswer: currentExercise.correctAnswer,
        explanation: currentExercise.explanation,
        property: 'Neutri e Assorbenti',
        sectionSource: 'neutri'
      });
    }

    const nextCompleted = completedCount + 1;
    setCompletedCount(nextCompleted);

    if (nextCompleted >= 10 && nextCompleted % 10 === 0) {
      setTimeout(() => setIsCompletionModalOpen(true), 1200);
    }
  };

  const handleNextExercise = () => {
    soundManager.playPop();
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setCurrentIndex(prev => (prev + 1) % NEUTRAL_ABSORBING_EXERCISES.length);
  };

  const isCurrentCorrect = isSubmitted && selectedAnswer === currentExercise.correctAnswer;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-teal-100 border border-white/25">
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              <span>Sezione Autonoma e Indipendente</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-display">
              Elementi Neutri ed Elementi Assorbenti
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 max-w-2xl leading-relaxed">
              Lo zero e l'uno nell'addizione, moltiplicazione e divisione: ruoli speciali, la Legge di Annullamento del Prodotto e il divieto assoluto di divisione per zero.
            </p>
          </div>

          {/* Toggle Teoria / Esercizi */}
          <div className="flex items-center gap-1.5 p-1.5 bg-black/25 backdrop-blur-md rounded-2xl border border-white/25 shrink-0">
            <button
              onClick={() => { soundManager.playPop(); setActiveTab('esercizi'); }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'esercizi'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-teal-100 hover:bg-white/10'
              }`}
            >
              22 Esercizi Specifici
            </button>
            <button
              onClick={() => { soundManager.playPop(); setActiveTab('teoria'); }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'teoria'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-teal-100 hover:bg-white/10'
              }`}
            >
              Guida Teorica Rapida
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'teoria' ? (
        /* Autonomous Theory Guide */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-teal-200 shadow-sm space-y-8">
          <div className="border-b border-teal-100 pb-4">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Quadro Teorico Completo</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              La Differenza tra Elemento Neutro ed Elemento Assorbente
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Neutro card */}
            <div className="bg-emerald-50/60 border-2 border-emerald-300 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Elemento Neutro (Lo Specchio)</h4>
                  <p className="text-xs text-emerald-800 font-semibold">Lascia inalterato il numero</p>
                </div>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li className="bg-white p-3 rounded-xl border border-emerald-100">
                  <span className="font-bold text-emerald-900">Nell'addizione:</span> lo <strong className="text-emerald-700">ZERO</strong> è elemento neutro (es. <code className="font-mono font-bold">14 + 0 = 14</code> e <code className="font-mono font-bold">0 + 14 = 14</code>).
                </li>
                <li className="bg-white p-3 rounded-xl border border-emerald-100">
                  <span className="font-bold text-emerald-900">Nella moltiplicazione:</span> l'<strong className="text-emerald-700">UNO</strong> è elemento neutro (es. <code className="font-mono font-bold">29 × 1 = 29</code> e <code className="font-mono font-bold">1 × 29 = 29</code>).
                </li>
                <li className="bg-white p-3 rounded-xl border border-emerald-100">
                  <span className="font-bold text-emerald-900">Nella divisione:</span> l'<strong className="text-emerald-700">UNO</strong> è elemento neutro a destra (es. <code className="font-mono font-bold">45 ÷ 1 = 45</code>).
                </li>
              </ul>
            </div>

            {/* Assorbente card */}
            <div className="bg-purple-50/60 border-2 border-purple-300 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                  0
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Elemento Assorbente (Il Buco Nero)</h4>
                  <p className="text-xs text-purple-800 font-semibold">Annulla e trasforma tutto in zero</p>
                </div>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
                <li className="bg-white p-3 rounded-xl border border-purple-100">
                  <span className="font-bold text-purple-900">Nella moltiplicazione:</span> lo <strong className="text-purple-700">ZERO</strong> è elemento assorbente (es. <code className="font-mono font-bold">580 × 0 = 0</code>).
                </li>
                <li className="bg-white p-3 rounded-xl border border-purple-100">
                  <span className="font-bold text-purple-900">Legge di annullamento del prodotto:</span> se <code className="font-mono font-bold">a × b = 0</code>, allora almeno uno tra <code className="font-mono">a</code> e <code className="font-mono">b</code> vale zero.
                </li>
                <li className="bg-white p-3 rounded-xl border border-purple-100">
                  <span className="font-bold text-purple-900">Nelle espressioni:</span> qualsiasi blocco racchiuso tra parentesi moltiplicato per zero si azzera all'istante: <code className="font-mono font-bold">(...) × 0 = 0</code>.
                </li>
              </ul>
            </div>
          </div>

          {/* Division with zero absolute warning banner */}
          <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Attenzione: Le Regole Ferree della Divisione con lo Zero</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-rose-200">
                <p className="font-bold text-slate-900">0 ÷ a = 0 (con a ≠ 0)</p>
                <p className="text-slate-600 mt-1">Zero diviso qualsiasi numero dà sempre ZERO. (Es. 0 diviso 7 amici = 0 caramelle a testa).</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-rose-200">
                <p className="font-bold text-rose-700">a ÷ 0 = IMPOSSIBILE</p>
                <p className="text-slate-600 mt-1">Non esiste nessun numero che moltiplicato per 0 possa fare 'a'. Dividere per zero è tassativamente impossibile!</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-rose-200">
                <p className="font-bold text-amber-700">0 ÷ 0 = INDETERMINATO</p>
                <p className="text-slate-600 mt-1">Qualsiasi numero moltiplicato per 0 fa 0: ci sono infinite soluzioni, non se ne può determinare una sola!</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => { soundManager.playPop(); setActiveTab('esercizi'); }}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
            >
              Passa agli Esercizi Specifici su Zero e Uno →
            </button>
          </div>
        </div>
      ) : (
        /* Exercises Section */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-teal-200 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-teal-100 pb-4">
            <div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                Esercizio {(currentIndex % NEUTRAL_ABSORBING_EXERCISES.length) + 1} di {NEUTRAL_ABSORBING_EXERCISES.length}
              </span>
              <span className="text-xs font-semibold text-slate-500 ml-3">
                {currentExercise.type.replace('_', ' ')}
              </span>
            </div>
            <div className="text-xs font-bold text-teal-800">
              Punteggio: <span className="font-black text-teal-600">{correctCount}</span> / {completedCount}
            </div>
          </div>

          {/* Question */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentExercise.question}
            </h3>

            {currentExercise.equationDisplay && (
              <div className="p-4 bg-teal-50/70 rounded-2xl border-2 border-teal-200 font-mono text-base sm:text-lg font-bold text-slate-900 text-center whitespace-pre-line shadow-xs">
                {currentExercise.equationDisplay}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {currentExercise.options.map((opt, idx) => {
              const isOptionSelected = selectedAnswer === opt;
              let style = 'bg-white hover:bg-teal-50/60 border-slate-200 text-slate-800';

              if (isSubmitted) {
                if (opt === currentExercise.correctAnswer) {
                  style = 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-md';
                } else if (isOptionSelected) {
                  style = 'bg-rose-500 text-white border-rose-600 font-bold shadow-md';
                } else {
                  style = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                }
              } else if (isOptionSelected) {
                style = 'bg-teal-600 text-white border-teal-700 font-bold shadow-md';
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => {
                    soundManager.playPop();
                    handleSelectOption(opt);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${style}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Verification & Feedback */}
          <div className="pt-4 border-t border-teal-100">
            {!isSubmitted ? (
              <button
                disabled={!selectedAnswer}
                onClick={handleVerify}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-md ${
                  selectedAnswer
                    ? 'bg-teal-600 hover:bg-teal-700 text-white active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Verifica Risposta
              </button>
            ) : (
              <div className="space-y-4">
                <div className={`p-5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3.5 ${
                  isCurrentCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  {isCurrentCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="font-bold text-sm">
                      {isCurrentCorrect ? 'Esatto! Regola padroneggiata!' : 'Risposta Errata. Ecco la spiegazione scientifica:'}
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      {currentExercise.explanation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      setActiveTab('teoria');
                    }}
                    className="text-xs font-bold text-teal-800 hover:underline"
                  >
                    📖 Leggi la teoria sullo zero e l'uno
                  </button>

                  <button
                    onClick={handleNextExercise}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
                  >
                    <span>Prossimo Esercizio</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Completion Modal */}
      <ActivityCompletionModal
        isOpen={isCompletionModalOpen}
        title="Traguardo Elementi Neutri & Assorbenti!"
        subtitle={`Hai completato 10 esercizi specifici con ${correctCount} risposte esatte!`}
        score={correctCount}
        maxScore={completedCount}
        xpEarned={correctCount * 30}
        starsEarned={2}
        avatarConfig={avatarConfig}
        onGoHome={onGoHome}
        onRetry={() => {
          setIsCompletionModalOpen(false);
          setCurrentIndex(0);
        }}
        onNextActivity={onGoToGames}
        onGoToTheory={onGoToTheory}
        nextActivityLabel="Mettiti alla prova nei Giochi Didattici 🎮"
      />

    </div>
  );
};
