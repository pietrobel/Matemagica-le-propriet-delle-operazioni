import React, { useState, useEffect } from 'react';
import { GameScoreResult } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { 
  Zap, 
  Timer, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy,
  Flame,
  ArrowRight
} from 'lucide-react';

interface MentalMathSpeedGameProps {
  onFinishGame: (res: GameScoreResult) => void;
  onExit: () => void;
}

import { generateSpeedChallenge, SpeedChallengeInstance } from '../../utils/proceduralGenerators';

export const MentalMathSpeedGame: React.FC<MentalMathSpeedGameProps> = ({ onFinishGame, onExit }) => {
  const [challenges, setChallenges] = useState<SpeedChallengeInstance[]>(() =>
    Array.from({ length: 20 }, (_, i) => generateSpeedChallenge(i))
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; trick: string } | null>(null);

  const currentQ = challenges[currentIdx % challenges.length] || challenges[0];

  // Timer countdown
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isGameOver]);

  const handleStart = () => {
    soundManager.playPop();
    setChallenges(Array.from({ length: 20 }, (_, i) => generateSpeedChallenge(i)));
    setIsPlaying(true);
    setIsGameOver(false);
    setTimeLeft(60);
    setScore(0);
    setStreak(0);
    setCurrentIdx(0);
    setFeedback(null);
  };

  const handleTimeUp = () => {
    soundManager.playLevelUp();
    setIsGameOver(true);
    setIsPlaying(false);
  };

  const handleAnswer = (ans: string) => {
    if (!isPlaying || isGameOver) return;

    const isCorrect = ans === currentQ.correctAnswer;
    if (isCorrect) {
      soundManager.playCorrect();
      const multiplier = Math.min(3, 1 + Math.floor(streak / 3));
      const points = 50 * multiplier;
      setScore(prev => prev + points);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(prev => Math.max(prev, newStreak));
      setFeedback({ isCorrect: true, trick: currentQ.shortcutTrick });
    } else {
      soundManager.playGentleError();
      setStreak(0);
      setFeedback({ isCorrect: false, trick: `Sbagliato! ${currentQ.shortcutTrick}` });
    }

    // Move to next challenge after brief flash
    setTimeout(() => {
      setFeedback(null);
      setCurrentIdx(prev => prev + 1);
    }, 700);
  };

  const handleComplete = () => {
    onFinishGame({
      gameId: 'mental_math_speed',
      score: score,
      starsEarned: score > 300 ? 3 : score > 150 ? 2 : 1,
      xpEarned: score,
      correctAnswers: Math.floor(score / 50),
      totalQuestions: currentIdx
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-white flex items-center justify-center shadow-md">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Gioco 4 · La Sfida del Calcolo Mentale
              </span>
              {streak >= 3 && (
                <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-current" />
                  <span>Combo x{Math.min(3, 1 + Math.floor(streak / 3))}</span>
                </span>
              )}
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">Scorciatoie delle Proprietà a Tempo</h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isPlaying && (
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm ${
              timeLeft <= 10 
                ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse' 
                : 'bg-amber-50 text-amber-900 border-amber-200'
            }`}>
              <Timer className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          )}
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Punteggio</p>
            <p className="text-xl font-black text-amber-600">{score} XP</p>
          </div>
          <button
            onClick={onExit}
            className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
          >
            Esci
          </button>
        </div>
      </div>

      {!isPlaying && !isGameOver ? (
        /* Welcome / Start Screen */
        <div className="text-center py-10 space-y-6">
          <div className="max-w-md mx-auto space-y-3">
            <h4 className="text-2xl font-black text-slate-900">Sei pronto per il Calcolo ad Alta Velocità?</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Hai 60 secondi per risolvere quante più operazioni possibili! Usa i trucchi delle proprietà matematiche per trovare subito il risultato senza fare calcoli in colonna.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-xs text-slate-700">
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <span className="font-bold block text-amber-800">Cerca il 100</span>
              <span>4 × 25 o coppie di amici</span>
            </div>
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <span className="font-bold block text-amber-800">Bilancia Invariante</span>
              <span>Arrotonda le sottrazioni</span>
            </div>
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <span className="font-bold block text-amber-800">Spacca in decine</span>
              <span>Usa la distributiva</span>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-xl transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <span>Avvia la Sfida (60 Secondi)</span>
            <Zap className="w-5 h-5 fill-current" />
          </button>
        </div>
      ) : isGameOver ? (
        /* Game Over Screen */
        <div className="text-center py-8 space-y-6 animate-fade-in">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl inline-block">
            <Trophy className="w-12 h-12 text-amber-600 mx-auto" />
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl font-black text-slate-900">Tempo Scaduto! Grande Sfida!</h4>
            <p className="text-sm text-slate-600">Hai dimostrato un calcolo mentale eccellente!</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">Punteggio Totale</p>
              <p className="text-2xl font-black text-amber-600">{score} XP</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">Miglior Combo</p>
              <p className="text-2xl font-black text-orange-600">{bestStreak} 🔥</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Rigioca la Sfida</span>
            </button>
            <button
              onClick={handleComplete}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
            >
              Salva e Riscatta Premi
            </button>
          </div>
        </div>
      ) : (
        /* Playing Screen */
        <div className="space-y-8 animate-fade-in">
          {/* Operation Display */}
          <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl text-center shadow-inner relative overflow-hidden">
            <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">Calcola alla Velocità della Luce:</span>
            <p className="font-mono text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-wide">
              {currentQ.equation}
            </p>
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div className={`p-3 rounded-xl border text-xs text-center font-bold animate-fade-in ${
              feedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-rose-100 text-rose-900 border-rose-300'
            }`}>
              {feedback.trick}
            </div>
          )}

          {/* 4 Choices */}
          <div className="grid grid-cols-2 gap-4">
            {currentQ.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="py-6 px-4 bg-white hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-400 font-mono text-2xl font-bold text-slate-800 rounded-2xl shadow-xs transition-all active:scale-95 text-center"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
