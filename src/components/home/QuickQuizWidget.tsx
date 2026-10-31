import React, { useState } from 'react';
import { AvatarConfig } from '../../types/math';
import { AvatarRenderer } from '../avatar/AvatarRenderer';
import { soundManager } from '../../utils/audio';
import { ALL_PROPERTY_QUIZ_QUESTIONS, PropertyQuizQuestion, generatePropertyQuizQuestions } from '../../data/propertyQuizData';
import { 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Gamepad2, 
  HelpCircle, 
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';

interface QuickQuizWidgetProps {
  avatarConfig: AvatarConfig;
  onAwardXp: (amount: number) => void;
  onGoToGames: () => void;
  onQuizAnsweredCorrectly?: () => void;
}

export const QuickQuizWidget: React.FC<QuickQuizWidgetProps> = ({
  avatarConfig,
  onAwardXp,
  onGoToGames,
  onQuizAnsweredCorrectly
}) => {
  const [quizQuestions, setQuizQuestions] = useState<PropertyQuizQuestion[]>(() => generatePropertyQuizQuestions());
  const [selectedOperation, setSelectedOperation] = useState<'Tutte' | 'Addizione' | 'Sottrazione' | 'Moltiplicazione' | 'Divisione'>('Tutte');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [hasWonXp, setHasWonXp] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);

  // Filter questions based on selected operation
  const filteredQuestions = selectedOperation === 'Tutte'
    ? quizQuestions
    : quizQuestions.filter(q => q.operation === selectedOperation);

  const currentQ: PropertyQuizQuestion = filteredQuestions[questionIndex % filteredQuestions.length] || filteredQuestions[0];

  const handleSelectChoice = (choice: string) => {
    if (isAnswered) return;
    setSelectedChoice(choice);
    setIsAnswered(true);

    if (choice === currentQ.correctProperty) {
      soundManager.playCorrect();
      setHasWonXp(true);
      setSessionScore(prev => prev + 1);
      onAwardXp(75);
      onQuizAnsweredCorrectly?.();
    } else {
      soundManager.playGentleError();
      setHasWonXp(false);
    }
  };

  const handleNextQuestion = () => {
    soundManager.playPop();
    setSelectedChoice(null);
    setIsAnswered(false);
    setHasWonXp(false);
    setQuestionIndex(prev => (prev + 1) % filteredQuestions.length);
  };

  const handleFilterChange = (op: typeof selectedOperation) => {
    soundManager.playPop();
    setSelectedOperation(op);
    setQuestionIndex(0);
    setSelectedChoice(null);
    setIsAnswered(false);
    setHasWonXp(false);
  };

  const isCorrect = selectedChoice === currentQ.correctProperty;

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 rounded-3xl p-6 md:p-8 border-2 border-amber-300 shadow-md">
      
      {/* Top Banner & Operation Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm shrink-0">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
                Quiz Rapido delle Proprietà
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Domanda {(questionIndex % filteredQuestions.length) + 1} di {filteredQuestions.length}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-900 mt-0.5">
              Quale Proprietà è Stata Applicata?
            </h3>
          </div>
        </div>

        {/* Operation Filter Tabs */}
        <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-amber-200 overflow-x-auto self-start lg:self-auto">
          {(['Tutte', 'Addizione', 'Sottrazione', 'Moltiplicazione', 'Divisione'] as const).map(op => (
            <button
              key={op}
              onClick={() => handleFilterChange(op)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedOperation === op
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-amber-800 hover:bg-amber-50'
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        {/* Bonus XP Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white rounded-xl text-xs font-extrabold shadow-xs self-start lg:self-auto shrink-0">
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span>+75 XP PER RISPOSTA ESATTA</span>
        </div>
      </div>

      {/* Main Quiz Body */}
      <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Equation & Multiple Choice Options */}
        <div className="md:col-span-8 space-y-4">
          
          {/* Prominent Equation Box */}
          <div className="bg-white rounded-2xl p-4 md:p-5 border-2 border-amber-200 shadow-xs flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
              {currentQ.operation} · Operazione e Trasformazione
            </span>
            <div className="text-xl md:text-3xl font-black font-mono-numbers text-slate-900 mt-1">
              {currentQ.equation}
            </div>
            <p className="text-xs md:text-sm font-bold text-amber-900 mt-2">
              👉 {currentQ.question}
            </p>
          </div>

          {/* Multiple-Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.choices.map((choice, idx) => {
              const isSelected = selectedChoice === choice;
              let btnClass = 'bg-white hover:bg-amber-50 border-slate-200 text-slate-800 hover:border-amber-400';

              if (isAnswered) {
                if (choice === currentQ.correctProperty) {
                  btnClass = 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold';
                } else if (isSelected) {
                  btnClass = 'bg-rose-500 text-white border-rose-600 font-bold';
                } else {
                  btnClass = 'bg-white/60 text-slate-400 border-slate-200 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectChoice(choice)}
                  className={`p-3.5 rounded-2xl border-2 text-xs md:text-sm text-left transition-all font-semibold shadow-xs active:scale-98 flex items-center justify-between ${btnClass}`}
                >
                  <span>{choice}</span>
                  {isAnswered && choice === currentQ.correctProperty && (
                    <Check className="w-4 h-4 text-white shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
              isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}>
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <HelpCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs md:text-sm">
                <p className="font-black">
                  {isCorrect ? 'Risposta Esatta! +75 XP bonus guadagnati! 🎉' : 'Non proprio! Ecco la regola da ricordare:'}
                </p>
                <p className="mt-1 font-medium text-slate-700">
                  {currentQ.explanation}
                </p>
                <p className="mt-1 text-xs text-amber-800 font-semibold">
                  💡 <strong>Trucco:</strong> {currentQ.ruleHint}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Companion Avatar & Instant CTAs */}
        <div className="md:col-span-4 bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-amber-200 flex flex-col items-center text-center justify-between space-y-4">
          <AvatarRenderer
            config={avatarConfig}
            size={76}
            isCelebrating={hasWonXp}
            showShadow={false}
            speechBubble={
              isAnswered
                ? (isCorrect ? 'Proprietà individuata! 🏆' : 'Guarda il trucco e riprova!')
                : 'Indovina la proprietà!'
            }
          />

          <div>
            <p className="text-xs font-bold text-slate-900">
              {avatarConfig.nickname}
            </p>
            <p className="text-[11px] text-amber-800 font-medium">
              {isAnswered
                ? (isCorrect ? 'Ottimo riscaldamento! Ora puoi dominare i minigiochi!' : 'Allenati ancora con un\'altra proprietà!')
                : 'Riconosci quale proprietà magica è stata usata in questa operazione!'}
            </p>
            {sessionScore > 0 && (
              <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                ⚡ {sessionScore} risposte corrette!
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-2 pt-1">
            {isAnswered ? (
              <>
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 inline-flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Prossima Domanda Rapida</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playPop();
                    onGoToGames();
                  }}
                  className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all active:scale-95 inline-flex items-center justify-center gap-1.5"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Inizia un Minigioco col Bonus!</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="text-xs font-semibold text-amber-700 hover:text-amber-900 py-1"
              >
                Salta a un'altra domanda
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
