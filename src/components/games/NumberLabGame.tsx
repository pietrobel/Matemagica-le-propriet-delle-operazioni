import React, { useState } from 'react';
import { GameScoreResult, AvatarConfig } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { 
  FlaskConical, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Trophy
} from 'lucide-react';

interface NumberLabGameProps {
  onFinishGame: (res: GameScoreResult) => void;
  onExit: () => void;
}



import { generateLabLevels, LabLevelInstance } from '../../utils/proceduralGenerators';

export const NumberLabGame: React.FC<NumberLabGameProps> = ({ onFinishGame, onExit }) => {
  const [levels, setLevels] = useState<LabLevelInstance[]>(() => generateLabLevels());
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [stage, setStage] = useState<'choose_transformation' | 'final_calculation' | 'feedback'>('choose_transformation');
  const [selectedTransformId, setSelectedTransformId] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [feedbackText, setFeedbackText] = useState<{ isSuccess: boolean; msg: string; explanation: string } | null>(null);

  const level = levels[currentLevelIdx] || levels[0];

  const handleRestartNewNumbers = () => {
    soundManager.playPop();
    setLevels(generateLabLevels());
    setCurrentLevelIdx(0);
    setStage('choose_transformation');
    setSelectedTransformId(null);
    setSelectedResult(null);
    setScore(0);
    setFeedbackText(null);
  };

  const handleSelectTransformation = (transformId: string) => {
    setSelectedTransformId(transformId);
    const chosen = level.availableTransformations.find(t => t.id === transformId);

    if (!chosen || !chosen.isOptimal) {
      soundManager.playGentleError();
      setFeedbackText({
        isSuccess: false,
        msg: 'Mossa non ottimale o errata nel laboratorio!',
        explanation: 'La trasformazione scelta non semplifica l\'operazione o viola le proprietà matematiche. Riprova con la strategia migliore!'
      });
      setStage('feedback');
    } else {
      soundManager.playCorrect();
      setScore(prev => prev + 100);
      setStage('final_calculation');
    }
  };

  const handleSelectFinalResult = (ans: string) => {
    setSelectedResult(ans);
    const isCorrect = ans === level.finalCalculation.correctAnswer;

    if (isCorrect) {
      soundManager.playCorrect();
      setScore(prev => prev + 150);
      setFeedbackText({
        isSuccess: true,
        msg: 'Reazione alchemica riuscita!',
        explanation: level.finalCalculation.explanation
      });
    } else {
      soundManager.playGentleError();
      setFeedbackText({
        isSuccess: false,
        msg: 'Calcolo aritmetico errato.',
        explanation: `La risposta corretta era ${level.finalCalculation.correctAnswer}. ${level.finalCalculation.explanation}`
      });
    }

    setStage('feedback');
  };

  const handleNextLevel = () => {
    soundManager.playPop();
    setFeedbackText(null);
    setSelectedTransformId(null);
    setSelectedResult(null);

    if (currentLevelIdx < levels.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
      setStage('choose_transformation');
    } else {
      // Completed all 5 levels
      onFinishGame({
        gameId: 'number_lab',
        score: score,
        starsEarned: 3,
        xpEarned: score,
        correctAnswers: currentLevelIdx + 1,
        totalQuestions: levels.length
      });
    }
  };

  const handleRetryCurrent = () => {
    soundManager.playPop();
    setFeedbackText(null);
    setSelectedTransformId(null);
    setSelectedResult(null);
    setStage('choose_transformation');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Gioco 1 · Il Laboratorio dei Numeri
              </span>
              <span className="text-xs font-bold text-slate-500">
                Livello {level.id} di {levels.length}
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">{level.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Punti Laboratorio</p>
            <p className="text-xl font-black text-amber-600">{score} XP</p>
          </div>
          <button
            onClick={handleRestartNewNumbers}
            title="Genera nuova partita con numeri diversi"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all"
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

      {/* Target Operation Flask Display */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 text-center space-y-2 shadow-inner">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Operazione da Trasformare:</p>
        <p className="font-mono text-2xl sm:text-3xl font-black text-slate-900">{level.initialValue}</p>
        <p className="text-xs text-slate-600">
          Usa le proprietà per trasformarla nella scorciatoia più rapida ed elegante.
        </p>
      </div>

      {/* Stage 1: Choose Transformation */}
      {stage === 'choose_transformation' && (
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Fase 1: Scegli quale trasformazione applicare alla provetta:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {level.availableTransformations.map(trans => (
              <button
                key={trans.id}
                onClick={() => handleSelectTransformation(trans.id)}
                className="p-5 rounded-2xl border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-left transition-all space-y-2 group active:scale-98"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                    {trans.propertyUsed}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-amber-700">
                    ⟶ {trans.resultingExpression}
                  </span>
                </div>
                <p className="font-bold text-sm text-slate-900">{trans.label}</p>
                <p className="text-xs text-slate-600">{trans.actionDescription}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stage 2: Final Calculation */}
      {stage === 'final_calculation' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Trasformazione riuscita! Ora l'operazione è diventata elementare.</span>
          </div>

          <h4 className="text-sm font-bold text-slate-800">{level.finalCalculation.question}</h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {level.finalCalculation.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleSelectFinalResult(opt)}
                className="py-4 px-3 rounded-2xl border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50 font-mono text-xl font-bold text-slate-800 transition-all active:scale-95 text-center shadow-xs"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Stage */}
      {stage === 'feedback' && feedbackText && (
        <div className="space-y-6 animate-fade-in">
          <div className={`p-6 rounded-2xl border-2 text-sm space-y-2 ${
            feedbackText.isSuccess
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-center gap-2 font-black text-base">
              {feedbackText.isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600" />
              )}
              <span>{feedbackText.msg}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {feedbackText.explanation}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            {!feedbackText.isSuccess ? (
              <button
                onClick={handleRetryCurrent}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Riprova questo livello</span>
              </button>
            ) : (
              <button
                onClick={handleNextLevel}
                className="w-full sm:w-auto px-7 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{currentLevelIdx < levels.length - 1 ? 'Passa al Prossimo Livello' : 'Completa il Laboratorio!'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
