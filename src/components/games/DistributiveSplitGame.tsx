import React, { useState } from 'react';
import { GameScoreResult } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { Scissors, Sparkles, Check, Flame } from 'lucide-react';

interface DistributiveSplitGameProps {
  onFinishGame: (result: GameScoreResult) => void;
  onExit: () => void;
}

interface SplitProblem {
  base: number;
  large: number;
  partA: number; // 10
  partB: number; // 4
  areaA: number; // base * partA
  areaB: number; // base * partB
  total: number;
  splitChoices: { label: string; partA: number; partB: number; isCorrect: boolean }[];
  sumChoices: number[];
}

export const DistributiveSplitGame: React.FC<DistributiveSplitGameProps> = ({
  onFinishGame,
  onExit
}) => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [step, setStep] = useState<'split' | 'calculate'>('split');
  const [selectedSplit, setSelectedSplit] = useState<{ partA: number; partB: number } | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const problems: SplitProblem[] = [
    {
      base: 6,
      large: 14,
      partA: 10,
      partB: 4,
      areaA: 60,
      areaB: 24,
      total: 84,
      splitChoices: [
        { label: 'Spacca in 10 + 4', partA: 10, partB: 4, isCorrect: true },
        { label: 'Spacca in 8 + 6', partA: 8, partB: 6, isCorrect: false },
        { label: 'Spacca in 12 + 2', partA: 12, partB: 2, isCorrect: false },
        { label: 'Spacca in 7 + 7', partA: 7, partB: 7, isCorrect: false },
        { label: 'Spacca in 11 + 3', partA: 11, partB: 3, isCorrect: false }
      ],
      sumChoices: [84, 74, 94, 88, 82, 64]
    },
    {
      base: 7,
      large: 12,
      partA: 10,
      partB: 2,
      areaA: 70,
      areaB: 14,
      total: 84,
      splitChoices: [
        { label: 'Spacca in 10 + 2', partA: 10, partB: 2, isCorrect: true },
        { label: 'Spacca in 6 + 6', partA: 6, partB: 6, isCorrect: false },
        { label: 'Spacca in 8 + 4', partA: 8, partB: 4, isCorrect: false },
        { label: 'Spacca in 9 + 3', partA: 9, partB: 3, isCorrect: false },
        { label: 'Spacca in 11 + 1', partA: 11, partB: 1, isCorrect: false }
      ],
      sumChoices: [84, 82, 94, 78, 86, 74]
    },
    {
      base: 8,
      large: 15,
      partA: 10,
      partB: 5,
      areaA: 80,
      areaB: 40,
      total: 120,
      splitChoices: [
        { label: 'Spacca in 10 + 5', partA: 10, partB: 5, isCorrect: true },
        { label: 'Spacca in 9 + 6', partA: 9, partB: 6, isCorrect: false },
        { label: 'Spacca in 8 + 7', partA: 8, partB: 7, isCorrect: false },
        { label: 'Spacca in 12 + 3', partA: 12, partB: 3, isCorrect: false },
        { label: 'Spacca in 11 + 4', partA: 11, partB: 4, isCorrect: false }
      ],
      sumChoices: [120, 110, 130, 125, 115, 140]
    },
    {
      base: 9,
      large: 13,
      partA: 10,
      partB: 3,
      areaA: 90,
      areaB: 27,
      total: 117,
      splitChoices: [
        { label: 'Spacca in 10 + 3', partA: 10, partB: 3, isCorrect: true },
        { label: 'Spacca in 8 + 5', partA: 8, partB: 5, isCorrect: false },
        { label: 'Spacca in 7 + 6', partA: 7, partB: 6, isCorrect: false },
        { label: 'Spacca in 11 + 2', partA: 11, partB: 2, isCorrect: false },
        { label: 'Spacca in 9 + 4', partA: 9, partB: 4, isCorrect: false }
      ],
      sumChoices: [117, 107, 127, 113, 123, 103]
    }
  ];

  const current = problems[round] || problems[0];
  const totalRounds = problems.length;

  const handlePickSplit = (choice: { partA: number; partB: number; isCorrect: boolean }) => {
    if (feedback !== null) return;
    if (choice.isCorrect) {
      soundManager.playCorrect();
      setFeedback('correct');
      setSelectedSplit({ partA: choice.partA, partB: choice.partB });
      setScore(prev => prev + 90);
      setTimeout(() => {
        setFeedback(null);
        setStep('calculate');
      }, 900);
    } else {
      soundManager.playGentleError();
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const handleFinalSum = (sum: number) => {
    if (feedback !== null) return;
    if (sum === current.total) {
      soundManager.playCorrect();
      setFeedback('correct');
      const roundScore = score + 110;
      setScore(roundScore);

      setTimeout(() => {
        if (round < totalRounds - 1) {
          setRound(prev => prev + 1);
          setStep('split');
          setSelectedSplit(null);
          setFeedback(null);
        } else {
          onFinishGame({
            gameId: 'distributive_split',
            score: roundScore,
            starsEarned: roundScore >= 600 ? 3 : roundScore >= 400 ? 2 : 1,
            xpEarned: Math.round(roundScore * 0.45) + 150,
            correctAnswers: totalRounds,
            totalQuestions: totalRounds
          });
        }
      }, 1000);
    } else {
      soundManager.playGentleError();
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-purple-200 shadow-xl max-w-2xl mx-auto flex flex-col justify-between min-h-[460px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Spacca & Risolvi</h3>
            <p className="text-[11px] text-slate-500 font-medium">Scomponi i blocchi con la Proprietà Distributiva</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Punti</span>
            <p className="text-base font-black text-purple-600 font-mono-numbers">{score}</p>
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
        <span>Blocco {round + 1} di {totalRounds}</span>
        <span className="text-purple-600 font-bold">Livello Distributivo</span>
      </div>

      {/* Main Stage */}
      <div className="bg-gradient-to-b from-purple-50 to-pink-50/40 rounded-3xl p-6 md:p-8 border border-purple-200/80 flex flex-col items-center justify-center my-auto">
        
        {/* Target Giant Multiplication */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Moltiplicazione Gigante</span>
          <div className="text-4xl md:text-5xl font-black text-purple-950 font-mono-numbers mt-1">
            {current.base} × {current.large} = ?
          </div>
        </div>

        {/* Step 1: Spacca in due pezzi */}
        {step === 'split' && (
          <div className="w-full space-y-4">
            <p className="text-xs text-center text-slate-700 font-bold">
              Passo 1: Come possiamo spaccare il {current.large} per facilitare il calcolo?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {current.splitChoices.map((choice, idx) => (
                <button
                  key={idx}
                  disabled={feedback !== null}
                  onClick={() => handlePickSplit(choice)}
                  className="p-3.5 bg-white hover:bg-purple-50 rounded-2xl border-2 border-slate-200 hover:border-purple-400 text-center transition-all font-bold text-xs md:text-sm text-slate-800 shadow-xs active:scale-95"
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Calculate Pieces */}
        {step === 'calculate' && (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-center gap-3 text-sm md:text-base font-black font-mono-numbers text-purple-950 bg-white p-4 rounded-2xl border border-purple-300 shadow-xs">
              <span className="text-indigo-600">({current.base} × 10 = {current.areaA})</span>
              <span className="text-slate-400">+</span>
              <span className="text-pink-600">({current.base} × {current.partB} = {current.areaB})</span>
            </div>

            <p className="text-xs text-center text-slate-700 font-bold">
              Passo 2: Somma i due pezzi ({current.areaA} + {current.areaB}):
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {current.sumChoices.map((sumVal, idx) => (
                <button
                  key={idx}
                  disabled={feedback !== null}
                  onClick={() => handleFinalSum(sumVal)}
                  className="py-3 px-4 bg-white hover:bg-purple-50 rounded-2xl border-2 border-slate-200 hover:border-purple-400 text-xl font-black font-mono-numbers text-slate-900 transition-all shadow-xs active:scale-95"
                >
                  {sumVal}
                </button>
              ))}
            </div>
          </div>
        )}

        {feedback && (
          <div className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${
            feedback === 'correct' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {feedback === 'correct' ? (
              <>
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Pezzo spaccato e risolto alla perfezione!</span>
              </>
            ) : (
              <span>Riprova! Spacca sempre il numero in "decine + unità"!</span>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
