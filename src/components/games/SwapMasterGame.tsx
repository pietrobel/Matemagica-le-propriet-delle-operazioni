import React, { useState } from 'react';
import { GameScoreResult } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { ArrowLeftRight, Check, Sparkles, Star } from 'lucide-react';

interface SwapMasterGameProps {
  onFinishGame: (result: GameScoreResult) => void;
  onExit: () => void;
}

interface Question {
  type: '+' | '×';
  a: number;
  b: number;
  missingSlot: 'first' | 'second';
  expectedValue: number;
  result: number;
  choices: number[];
}

export const SwapMasterGame: React.FC<SwapMasterGameProps> = ({
  onFinishGame,
  onExit
}) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const totalRounds = 6;

  // 6 rounds with crystal-clear commutative equations
  const questions: Question[] = [
    { 
      type: '+', 
      a: 8, 
      b: 15, 
      missingSlot: 'first', 
      expectedValue: 15, 
      result: 23, 
      choices: [15, 8, 23, 7, 16, 14] 
    },
    { 
      type: '×', 
      a: 6, 
      b: 7, 
      missingSlot: 'second', 
      expectedValue: 6, 
      result: 42, 
      choices: [6, 7, 42, 13, 14, 1] 
    },
    { 
      type: '+', 
      a: 34, 
      b: 19, 
      missingSlot: 'first', 
      expectedValue: 19, 
      result: 53, 
      choices: [19, 34, 53, 15, 20, 18] 
    },
    { 
      type: '×', 
      a: 9, 
      b: 4, 
      missingSlot: 'first', 
      expectedValue: 4, 
      result: 36, 
      choices: [4, 9, 36, 13, 5, 8] 
    },
    { 
      type: '+', 
      a: 47, 
      b: 23, 
      missingSlot: 'second', 
      expectedValue: 47, 
      result: 70, 
      choices: [47, 23, 70, 24, 22, 60] 
    },
    { 
      type: '×', 
      a: 12, 
      b: 5, 
      missingSlot: 'second', 
      expectedValue: 12, 
      result: 60, 
      choices: [12, 5, 60, 17, 10, 6] 
    }
  ];

  const q = questions[currentRound] || questions[0];

  const handleChoice = (val: number) => {
    if (feedback !== null) return;
    setSelectedAnswer(val);

    if (val === q.expectedValue) {
      soundManager.playCorrect();
      setFeedback('correct');
      const roundPoints = 100 + streak * 25;
      setScore(prev => prev + roundPoints);
      setStreak(prev => prev + 1);
    } else {
      soundManager.playGentleError();
      setFeedback('wrong');
      setStreak(0);
    }

    setTimeout(() => {
      if (currentRound < totalRounds - 1) {
        setCurrentRound(prev => prev + 1);
        setFeedback(null);
        setSelectedAnswer(null);
      } else {
        // Finished
        const finalScore = score + (val === q.expectedValue ? 100 : 0);
        const stars = finalScore >= 550 ? 3 : finalScore >= 350 ? 2 : 1;
        onFinishGame({
          gameId: 'swap_master',
          score: finalScore,
          starsEarned: stars,
          xpEarned: Math.round(finalScore * 0.45) + 120,
          correctAnswers: score > 0 ? Math.floor(finalScore / 110) : 1,
          totalQuestions: totalRounds
        });
      }
    }, 1300);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-amber-200 shadow-xl max-w-2xl mx-auto flex flex-col justify-between min-h-[480px]">
      
      {/* Game Header */}
      <div className="flex items-center justify-between pb-4 border-b border-amber-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Lo Scambio Magico</h3>
            <p className="text-[11px] text-slate-500 font-medium">Trova il numero gemello con la Proprietà Commutativa</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Punti</span>
            <p className="text-base font-black text-amber-600 font-mono-numbers">{score}</p>
          </div>
          <button
            onClick={() => { soundManager.playPop(); onExit(); }}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 px-3 py-1 bg-slate-100 rounded-lg"
          >
            Esci
          </button>
        </div>
      </div>

      {/* Round & Streak Banner */}
      <div className="flex justify-between items-center my-3 text-xs font-semibold text-slate-600">
        <span>Round {currentRound + 1} di {totalRounds}</span>
        {streak > 1 && (
          <span className="text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full font-bold">
            🔥 Serie x{streak}!
          </span>
        )}
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50/40 rounded-3xl p-6 md:p-8 border border-amber-200/80 flex flex-col items-center justify-center my-auto">
        <p className="text-xs md:text-sm text-amber-900 font-bold mb-5 text-center">
          Quale numero completa lo scambio della proprietà commutativa?
        </p>

        {/* Visual Formula with PROMINENT, UNMISTAKABLE DASHED BOX */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-2xl md:text-4xl font-black font-mono-numbers text-slate-900">
          
          {/* Left Side: Original Numbers */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-2xl shadow-xs border-2 border-amber-200">
            <span className="text-slate-900">{q.a}</span>
            <span className="text-amber-500">{q.type}</span>
            <span className="text-slate-900">{q.b}</span>
          </div>

          <span className="text-slate-400 font-bold">=</span>

          {/* Right Side: Swapped Expression with Guaranteed Dashed Target Box */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-2xl shadow-xs border-2 border-amber-300">
            
            {/* Slot 1 on Right */}
            {q.missingSlot === 'first' ? (
              <div 
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border-3 border-dashed flex items-center justify-center transition-all ${
                  feedback === 'correct'
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-800 scale-105'
                    : feedback === 'wrong'
                    ? 'border-rose-500 bg-rose-100 text-rose-800'
                    : 'border-amber-500 bg-amber-100/90 text-amber-700 animate-pulse ring-4 ring-amber-300/40'
                }`}
                title="Riquadro da completare"
              >
                <span className="text-2xl md:text-3xl font-black">
                  {selectedAnswer !== null ? selectedAnswer : '?'}
                </span>
              </div>
            ) : (
              <span className="text-slate-900">{q.b}</span>
            )}

            <span className="text-amber-500">{q.type}</span>

            {/* Slot 2 on Right */}
            {q.missingSlot === 'second' ? (
              <div 
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border-3 border-dashed flex items-center justify-center transition-all ${
                  feedback === 'correct'
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-800 scale-105'
                    : feedback === 'wrong'
                    ? 'border-rose-500 bg-rose-100 text-rose-800'
                    : 'border-amber-500 bg-amber-100/90 text-amber-700 animate-pulse ring-4 ring-amber-300/40'
                }`}
                title="Riquadro da completare"
              >
                <span className="text-2xl md:text-3xl font-black">
                  {selectedAnswer !== null ? selectedAnswer : '?'}
                </span>
              </div>
            ) : (
              <span className="text-slate-900">{q.a}</span>
            )}

          </div>

          <span className="text-slate-400 font-bold">=</span>

          {/* Equal Total Result */}
          <div className="px-4 py-3 bg-emerald-500 text-white rounded-2xl shadow-xs text-xl md:text-3xl font-black">
            {q.result}
          </div>

        </div>

        {/* Feedback message */}
        {feedback && (
          <div className={`mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs md:text-sm font-bold ${
            feedback === 'correct' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {feedback === 'correct' ? (
              <>
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Esatto! {q.a} {q.type} {q.b} = {q.b} {q.type} {q.a} = {q.result}! L'ordine cambia, ma il risultato resta {q.result}!
                </span>
              </>
            ) : (
              <span>Riprova! Nella proprietà commutativa i due numeri si scambiano di posto!</span>
            )}
          </div>
        )}
      </div>

      {/* Choice Buttons */}
      <div className="pt-4">
        <p className="text-xs font-bold text-slate-600 text-center mb-3">
          Scegli il numero mancante contrassegnato con <strong className="text-amber-600">[ ? ]</strong>:
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {q.choices.map((num, i) => {
            const isChosen = selectedAnswer === num;
            return (
              <button
                key={i}
                disabled={feedback !== null}
                onClick={() => handleChoice(num)}
                className={`py-3.5 px-2 rounded-2xl border-2 text-xl font-black font-mono-numbers transition-all ${
                  isChosen
                    ? feedback === 'correct'
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                      : 'bg-rose-500 text-white border-rose-600'
                    : 'bg-white hover:bg-amber-50 border-slate-200 text-slate-800 hover:border-amber-400 active:scale-95'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
