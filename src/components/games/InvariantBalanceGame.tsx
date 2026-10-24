import React, { useState } from 'react';
import { GameScoreResult } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { Scale, Check, Sparkles, Zap } from 'lucide-react';

interface InvariantBalanceGameProps {
  onFinishGame: (result: GameScoreResult) => void;
  onExit: () => void;
}

interface InvariantProblem {
  kind: 'sub' | 'div';
  originalA: number;
  originalB: number;
  bestDelta: number; // e.g. +1
  bestExplanation: string;
  transformedA: number;
  transformedB: number;
  finalAnswer: number;
  strategyChoices: {
    label: string;
    isCorrect: boolean;
    transformedText: string;
  }[];
  resultChoices: number[];
}

export const InvariantBalanceGame: React.FC<InvariantBalanceGameProps> = ({
  onFinishGame,
  onExit
}) => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [stage, setStage] = useState<'pick_trick' | 'solve_easy'>('pick_trick');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const problems: InvariantProblem[] = [
    {
      kind: 'sub',
      originalA: 73,
      originalB: 29,
      bestDelta: 1,
      bestExplanation: '+1 a entrambi (29 diventa un comodissimo 30!)',
      transformedA: 74,
      transformedB: 30,
      finalAnswer: 44,
      strategyChoices: [
        { label: '+1 a entrambi (29 diventa 30)', isCorrect: true, transformedText: '74 - 30' },
        { label: '+2 a entrambi (29 diventa 31)', isCorrect: false, transformedText: '75 - 31' },
        { label: '-9 a entrambi (29 diventa 20)', isCorrect: false, transformedText: '64 - 20' },
        { label: '-1 a entrambi (29 diventa 28)', isCorrect: false, transformedText: '72 - 28' },
        { label: '+11 a entrambi (29 diventa 40)', isCorrect: false, transformedText: '84 - 40' }
      ],
      resultChoices: [44, 45, 54, 34, 46, 53]
    },
    {
      kind: 'sub',
      originalA: 55,
      originalB: 18,
      bestDelta: 2,
      bestExplanation: '+2 a entrambi (18 diventa 20!)',
      transformedA: 57,
      transformedB: 20,
      finalAnswer: 37,
      strategyChoices: [
        { label: '+2 a entrambi (18 diventa 20)', isCorrect: true, transformedText: '57 - 20' },
        { label: '+1 a entrambi (18 diventa 19)', isCorrect: false, transformedText: '56 - 19' },
        { label: '-8 a entrambi (18 diventa 10)', isCorrect: false, transformedText: '47 - 10' },
        { label: '+5 a entrambi (55 diventa 60)', isCorrect: false, transformedText: '60 - 23' },
        { label: '-2 a entrambi (18 diventa 16)', isCorrect: false, transformedText: '53 - 16' }
      ],
      resultChoices: [37, 35, 47, 27, 38, 42]
    },
    {
      kind: 'div',
      originalA: 240,
      originalB: 40,
      bestDelta: 10,
      bestExplanation: 'Dividiamo entrambi per 10 (togliamo lo zero finale!)',
      transformedA: 24,
      transformedB: 4,
      finalAnswer: 6,
      strategyChoices: [
        { label: 'Dividi per 10 entrambi (40 diventa 4)', isCorrect: true, transformedText: '24 ÷ 4' },
        { label: 'Dividi per 2 entrambi (40 diventa 20)', isCorrect: false, transformedText: '120 ÷ 20' },
        { label: 'Dividi per 4 entrambi (40 diventa 10)', isCorrect: false, transformedText: '60 ÷ 10' },
        { label: 'Moltiplica per 2 entrambi (40 diventa 80)', isCorrect: false, transformedText: '480 ÷ 80' },
        { label: 'Togli 40 a entrambi (40 diventa 0)', isCorrect: false, transformedText: '200 ÷ 0' }
      ],
      resultChoices: [6, 8, 60, 4, 12, 600]
    },
    {
      kind: 'sub',
      originalA: 92,
      originalB: 39,
      bestDelta: 1,
      bestExplanation: '+1 a entrambi (39 diventa 40!)',
      transformedA: 93,
      transformedB: 40,
      finalAnswer: 53,
      strategyChoices: [
        { label: '+1 a entrambi (39 diventa 40)', isCorrect: true, transformedText: '93 - 40' },
        { label: '+2 a entrambi (39 diventa 41)', isCorrect: false, transformedText: '94 - 41' },
        { label: '-9 a entrambi (39 diventa 30)', isCorrect: false, transformedText: '83 - 30' },
        { label: '+8 a entrambi (92 diventa 100)', isCorrect: false, transformedText: '100 - 47' },
        { label: '-1 a entrambi (39 diventa 38)', isCorrect: false, transformedText: '91 - 38' }
      ],
      resultChoices: [53, 54, 63, 43, 52, 62]
    },
    {
      kind: 'div',
      originalA: 350,
      originalB: 50,
      bestDelta: 10,
      bestExplanation: 'Togli uno zero a entrambi dividendo per 10: 35 ÷ 5!',
      transformedA: 35,
      transformedB: 5,
      finalAnswer: 7,
      strategyChoices: [
        { label: 'Dividi per 10 entrambi (50 diventa 5)', isCorrect: true, transformedText: '35 ÷ 5' },
        { label: 'Dividi per 5 entrambi (50 diventa 10)', isCorrect: false, transformedText: '70 ÷ 10' },
        { label: 'Dividi per 2 entrambi (50 diventa 25)', isCorrect: false, transformedText: '175 ÷ 25' },
        { label: 'Togli 50 a entrambi (50 diventa 0)', isCorrect: false, transformedText: '300 ÷ 0' },
        { label: 'Moltiplica per 10 entrambi (50 diventa 500)', isCorrect: false, transformedText: '3500 ÷ 500' }
      ],
      resultChoices: [7, 70, 5, 8, 35, 14]
    }
  ];

  const current = problems[round] || problems[0];
  const totalRounds = problems.length;

  const handlePickStrategy = (isCorrect: boolean) => {
    if (feedback !== null) return;
    if (isCorrect) {
      soundManager.playCorrect();
      setFeedback('correct');
      setScore(prev => prev + 80);
      setTimeout(() => {
        setFeedback(null);
        setStage('solve_easy');
      }, 900);
    } else {
      soundManager.playGentleError();
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const handleSolveEasy = (ans: number) => {
    if (feedback !== null) return;
    if (ans === current.finalAnswer) {
      soundManager.playCorrect();
      setFeedback('correct');
      setScore(prev => prev + 100 + streak * 25);
      setStreak(prev => prev + 1);

      setTimeout(() => {
        if (round < totalRounds - 1) {
          setRound(prev => prev + 1);
          setStage('pick_trick');
          setFeedback(null);
        } else {
          // Finished
          const finalScore = score + 100;
          onFinishGame({
            gameId: 'invariant_balance',
            score: finalScore,
            starsEarned: finalScore >= 600 ? 3 : finalScore >= 400 ? 2 : 1,
            xpEarned: Math.round(finalScore * 0.45) + 140,
            correctAnswers: Math.min(totalRounds, Math.floor(finalScore / 150) + 1),
            totalQuestions: totalRounds
          });
        }
      }, 1000);
    } else {
      soundManager.playGentleError();
      setFeedback('wrong');
      setStreak(0);
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-sky-200 shadow-xl max-w-2xl mx-auto flex flex-col justify-between min-h-[460px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-sky-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-100 text-sky-700 rounded-xl">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Il Trucco Invariante</h3>
            <p className="text-[11px] text-slate-500 font-medium">Semplifica i calcoli senza alterare il risultato finale</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Punti</span>
            <p className="text-base font-black text-sky-600 font-mono-numbers">{score}</p>
          </div>
          <button
            onClick={() => { soundManager.playPop(); onExit(); }}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-3 py-1 bg-slate-100 rounded-lg"
          >
            Esci
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center my-3 text-xs font-semibold text-slate-600">
        <span>Sfida {round + 1} di {totalRounds}</span>
        {streak > 1 && (
          <span className="text-sky-600 bg-sky-100 px-2.5 py-0.5 rounded-full font-bold">
            ⚡ Combo x{streak}!
          </span>
        )}
      </div>

      {/* Main Game Stage */}
      <div className="bg-gradient-to-b from-sky-50 to-indigo-50/40 rounded-3xl p-6 md:p-8 border border-sky-200/80 flex flex-col items-center justify-center my-auto">
        
        {/* Original Problem */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">
            Operazione Iniziale
          </span>
          <div className="text-3xl md:text-5xl font-black text-slate-900 font-mono-numbers mt-1">
            {current.originalA} {current.kind === 'sub' ? '-' : '÷'} {current.originalB}
          </div>
        </div>

        {/* Step 1: Pick Strategy */}
        {stage === 'pick_trick' && (
          <div className="w-full space-y-4">
            <p className="text-xs text-center text-slate-700 font-bold">
              Passo 1: Qual è la mossa migliore per renderla facilissima?
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {current.strategyChoices.map((choice, idx) => (
                <button
                  key={idx}
                  disabled={feedback !== null}
                  onClick={() => handlePickStrategy(choice.isCorrect)}
                  className="p-3.5 bg-white hover:bg-sky-50 rounded-2xl border-2 border-slate-200 hover:border-sky-400 text-left transition-all font-semibold text-xs md:text-sm text-slate-800 flex items-center justify-between shadow-xs active:scale-98"
                >
                  <span>{choice.label}</span>
                  <span className="text-sky-600 font-mono-numbers font-bold text-xs bg-sky-100 px-2 py-0.5 rounded-lg">
                    {choice.transformedText}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Solve Easy */}
        {stage === 'solve_easy' && (
          <div className="w-full space-y-4">
            <div className="p-3 bg-white rounded-2xl border border-sky-300 text-center shadow-xs">
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Operazione Semplificata</span>
              <div className="text-2xl md:text-3xl font-black text-sky-950 font-mono-numbers mt-0.5">
                {current.transformedA} {current.kind === 'sub' ? '-' : '÷'} {current.transformedB} = ?
              </div>
            </div>

            <p className="text-xs text-center text-slate-700 font-bold">
              Passo 2: Quanto fa il calcolo semplificato?
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {current.resultChoices.map((ans, idx) => (
                <button
                  key={idx}
                  disabled={feedback !== null}
                  onClick={() => handleSolveEasy(ans)}
                  className="py-3 px-4 bg-white hover:bg-sky-50 rounded-2xl border-2 border-slate-200 hover:border-sky-400 text-xl font-black font-mono-numbers text-slate-900 transition-all shadow-xs active:scale-95"
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback notice */}
        {feedback && (
          <div className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${
            feedback === 'correct' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {feedback === 'correct' ? (
              <>
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Ottimo colpo d'occhio! Proprietà Invariantiva applicata!</span>
              </>
            ) : (
              <span>Riprova! Cerca di trasformare il sottraendo in una decina tonda!</span>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
