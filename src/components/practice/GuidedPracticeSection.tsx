import React, { useState } from 'react';
import { GUIDED_EXERCISES } from '../../data/guidedExercisesData';
import { GuidedExercise, ExerciseLevel, ExerciseType, AvatarConfig, LoggedError } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { ActivityCompletionModal } from '../common/ActivityCompletionModal';
import { 
  Dumbbell, 
  Filter, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Lightbulb, 
  BookOpen,
  Award,
  Layers
} from 'lucide-react';

interface GuidedPracticeSectionProps {
  avatarConfig: AvatarConfig;
  onAwardXp: (amount: number) => void;
  onGoHome: () => void;
  onGoToGames: () => void;
  onGoToTheory: () => void;
  onLogError: (err: LoggedError) => void;
}

export const GuidedPracticeSection: React.FC<GuidedPracticeSectionProps> = ({
  avatarConfig,
  onAwardXp,
  onGoHome,
  onGoToGames,
  onGoToTheory,
  onLogError
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sessionCompletedCount, setSessionCompletedCount] = useState(0);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  // Filter exercises
  const filteredExercises = GUIDED_EXERCISES.filter(ex => {
    if (selectedLevel !== 'all' && ex.level !== selectedLevel) return false;
    if (selectedProperty !== 'all' && ex.property !== selectedProperty) return false;
    if (selectedType !== 'all' && ex.type !== selectedType) return false;
    return true;
  });

  const currentExercise: GuidedExercise = filteredExercises[currentIndex % (filteredExercises.length || 1)] || GUIDED_EXERCISES[0];

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
      setSessionCorrectCount(prev => prev + 1);
    } else {
      soundManager.playGentleError();
      onLogError({
        id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        timestamp: Date.now(),
        exerciseTitle: currentExercise.question,
        question: currentExercise.equationDisplay ? `${currentExercise.question} [${currentExercise.equationDisplay}]` : currentExercise.question,
        givenAnswer: selectedAnswer,
        correctAnswer: currentExercise.correctAnswer,
        explanation: currentExercise.explanation,
        property: currentExercise.property,
        sectionSource: 'esercito'
      });
    }

    const newCompleted = sessionCompletedCount + 1;
    setSessionCompletedCount(newCompleted);

    // After 10 exercises, offer celebratory modal
    if (newCompleted > 0 && newCompleted % 10 === 0) {
      setTimeout(() => {
        setIsCompletionModalOpen(true);
      }, 1200);
    }
  };

  const handleNextExercise = () => {
    soundManager.playPop();
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setShowHint(false);
    setCurrentIndex(prev => (prev + 1) % filteredExercises.length);
  };

  const handleResetFilters = () => {
    soundManager.playPop();
    setSelectedLevel('all');
    setSelectedProperty('all');
    setSelectedType('all');
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
  };

  const isCurrentCorrect = isSubmitted && selectedAnswer === currentExercise.correctAnswer;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-amber-100 border border-white/25">
              <Dumbbell className="w-3.5 h-3.5 text-yellow-300" />
              <span>Sezione 3 · Palestra di Esercizi Progressivi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-display">
              Mi Esercito: Oltre 100 Esercizi Guidati
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl leading-relaxed">
              3 livelli di difficoltà crescente e 9 tipologie per padroneggiare ogni trucco, distinguere commutativa e associativa e correggere gli errori più insidiosi.
            </p>
          </div>

          {/* Session Progress Counter */}
          <div className="bg-black/25 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/20 text-center shrink-0">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-200">Sessione Corrente</p>
            <p className="text-2xl font-black text-white mt-0.5">
              {sessionCorrectCount} <span className="text-sm font-semibold text-amber-200">/ {sessionCompletedCount} corrette</span>
            </p>
            <p className="text-[10px] text-amber-100/80 mt-1">Archivio: {GUIDED_EXERCISES.length}+ esercizi</p>
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Filter className="w-4 h-4 text-amber-600" />
            <span>Filtri Didattici:</span>
          </div>
          {(selectedLevel !== 'all' || selectedProperty !== 'all' || selectedType !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 underline"
            >
              Azzera filtri
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Level Filter */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Livello di Difficoltà</label>
            <div className="flex items-center gap-1 bg-amber-50/60 p-1 rounded-xl border border-amber-200">
              {[
                { val: 'all', label: 'Tutti' },
                { val: 1, label: 'L1: Facile' },
                { val: 2, label: 'L2: Medio' },
                { val: 3, label: 'L3: Avanzato' }
              ].map(lvl => (
                <button
                  key={String(lvl.val)}
                  onClick={() => {
                    soundManager.playPop();
                    setSelectedLevel(lvl.val as any);
                    setCurrentIndex(0);
                    setSelectedAnswer(null);
                    setIsSubmitted(false);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
                    selectedLevel === lvl.val
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-amber-800'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Property Filter */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Proprietà</label>
            <select
              value={selectedProperty}
              onChange={(e) => {
                soundManager.playPop();
                setSelectedProperty(e.target.value);
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setIsSubmitted(false);
              }}
              className="w-full bg-amber-50/60 border border-amber-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">Tutte le Proprietà</option>
              <option value="commutativa">Proprietà Commutativa (ordine)</option>
              <option value="associativa">Proprietà Associativa (raggruppamento)</option>
              <option value="distributiva">Proprietà Distributiva (scomposizione)</option>
              <option value="invariantiva">Proprietà Invariantiva (bilancia)</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Tipologia di Esercizio</label>
            <select
              value={selectedType}
              onChange={(e) => {
                soundManager.playPop();
                setSelectedType(e.target.value);
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setIsSubmitted(false);
              }}
              className="w-full bg-amber-50/60 border border-amber-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">Tutte le Tipologie (9 tipi)</option>
              <option value="completa_operazione">A. Completa l'operazione</option>
              <option value="trova_risultato">B. Trova il risultato</option>
              <option value="scegli_trasformazione">C. Scegli la trasformazione corretta</option>
              <option value="calcolo_mentale">D. Calcolo mentale</option>
              <option value="trova_errore">E. Trova l'errore</option>
              <option value="abbina">F. Trascina e abbina</option>
              <option value="vero_falso">G. Vero o Falso</option>
              <option value="completa_procedimento">H. Completa il procedimento</option>
              <option value="problema">I. Problemi reali</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Exercise Card */}
      {filteredExercises.length > 0 ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-md space-y-6">
          
          {/* Card Top Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                currentExercise.level === 1
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : currentExercise.level === 2
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                Livello {currentExercise.level}: {currentExercise.level === 1 ? 'Facile' : currentExercise.level === 2 ? 'Intermedio' : 'Avanzato'}
              </span>

              <span className="px-3 py-1 bg-amber-100/70 text-amber-900 border border-amber-200 rounded-full text-xs font-bold capitalize">
                Proprietà {currentExercise.property}
              </span>

              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                {currentExercise.type.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500">
                Esercizio {(currentIndex % filteredExercises.length) + 1} di {filteredExercises.length}
              </span>
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                +{currentExercise.xpReward} XP
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentExercise.question}
            </h3>

            {currentExercise.equationDisplay && (
              <div className="p-4 bg-amber-50/80 rounded-2xl border-2 border-amber-200 font-mono text-base sm:text-lg font-bold text-slate-900 text-center whitespace-pre-line shadow-xs">
                {currentExercise.equationDisplay}
              </div>
            )}
          </div>

          {/* Hint Trigger */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHint(prev => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>{showHint ? 'Nascondi suggerimento' : 'Mostra suggerimento del docente'}</span>
            </button>
          </div>

          {showHint && (
            <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl text-xs sm:text-sm text-sky-900 flex items-start gap-2.5 animate-fade-in">
              <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Suggerimento strategico:</p>
                <p className="mt-0.5 text-slate-700">{currentExercise.hint}</p>
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="space-y-2.5 pt-2">
            {currentExercise.options.map((opt, optIdx) => {
              const isOptionSelected = selectedAnswer === opt;
              let style = 'bg-white hover:bg-amber-50/80 border-slate-200 text-slate-800';

              if (isSubmitted) {
                if (opt === currentExercise.correctAnswer) {
                  style = 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-md';
                } else if (isOptionSelected) {
                  style = 'bg-rose-500 text-white border-rose-600 font-bold shadow-md';
                } else {
                  style = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                }
              } else if (isOptionSelected) {
                style = 'bg-amber-500 text-white border-amber-600 font-bold shadow-md';
              }

              return (
                <button
                  key={optIdx}
                  disabled={isSubmitted}
                  onClick={() => {
                    soundManager.playPop();
                    handleSelectOption(opt);
                  }}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${style}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Verification & Detailed Educational Feedback */}
          <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            {!isSubmitted ? (
              <button
                disabled={!selectedAnswer}
                onClick={handleVerify}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold transition-all shadow-md ${
                  selectedAnswer
                    ? 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Verifica Risposta
              </button>
            ) : (
              <div className="w-full space-y-4">
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
                      {isCurrentCorrect ? 'Risposta Esatta! +'+currentExercise.xpReward+' XP guadagnati!' : 'Risposta Errata. Ecco la spiegazione didattica:'}
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      {currentExercise.explanation}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      onGoToTheory();
                    }}
                    className="px-4 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-bold rounded-xl transition-all"
                  >
                    📖 Rivedi la regola teorica
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
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 space-y-4">
          <Layers className="w-12 h-12 text-amber-500 mx-auto" />
          <h4 className="text-xl font-bold text-slate-900">Nessun esercizio trovato con i filtri selezionati</h4>
          <p className="text-xs text-slate-500">Prova a modificare i filtri per visualizzare gli altri esercizi dell'archivio.</p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all"
          >
            Azzera tutti i filtri
          </button>
        </div>
      )}

      {/* Completion Modal after 10 exercises */}
      <ActivityCompletionModal
        isOpen={isCompletionModalOpen}
        title="Traguardo Esercitazione Raggiunto!"
        subtitle={`Hai completato un blocco di 10 esercizi guidati con ${sessionCorrectCount} risposte esatte!`}
        score={sessionCorrectCount}
        maxScore={sessionCompletedCount}
        xpEarned={sessionCorrectCount * 35}
        starsEarned={2}
        avatarConfig={avatarConfig}
        onGoHome={onGoHome}
        onRetry={() => {
          setIsCompletionModalOpen(false);
          setCurrentIndex(0);
        }}
        onNextActivity={onGoToGames}
        onGoToTheory={onGoToTheory}
        nextActivityLabel="Vai ai Giochi Didattici (Fase 4) 🎮"
      />

    </div>
  );
};
