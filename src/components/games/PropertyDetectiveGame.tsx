import React, { useState, useEffect } from 'react';
import { GameScoreResult } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { ShieldCheck, Sparkles, Timer, Flame, CheckCircle2 } from 'lucide-react';

interface PropertyDetectiveGameProps {
  onFinishGame: (result: GameScoreResult) => void;
  onExit: () => void;
}

interface DetectiveQuestion {
  prompt: string;
  equation: string;
  correctAnswer: string;
  choices: string[];
  explanation: string;
}

export const PropertyDetectiveGame: React.FC<PropertyDetectiveGameProps> = ({
  onFinishGame,
  onExit
}) => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const questions: DetectiveQuestion[] = [
    {
      prompt: 'Quale proprietà è stata usata per fare questo scambio?',
      equation: '18 + 35 = 35 + 18',
      correctAnswer: 'Proprietà Commutativa',
      choices: ['Proprietà Commutativa', 'Proprietà Associativa', 'Proprietà Invariantiva', 'Proprietà Distributiva'],
      explanation: 'I numeri sono stati scambiati di posto: l\'ordine degli addendi non cambia la somma!'
    },
    {
      prompt: 'Quale proprietà ha permesso di raggruppare i primi due numeri?',
      equation: '(25 + 75) + 14 = 100 + 14 = 114',
      correctAnswer: 'Proprietà Associativa',
      choices: ['Proprietà Distributiva', 'Proprietà Associativa', 'Proprietà Commutativa', 'Elemento Neutro'],
      explanation: 'Abbiamo associato 25 e 75 per fare 100!'
    },
    {
      prompt: 'Quale magica proprietà ha aggiunto +2 a entrambi i lati?',
      equation: '68 - 28 = 70 - 30 = 40',
      correctAnswer: 'Proprietà Invariantiva',
      choices: ['Proprietà Commutativa', 'Proprietà Invariantiva', 'Proprietà Associativa (in forma dissociativa)', 'Proprietà Distributiva'],
      explanation: 'Aggiungendo lo stesso numero a minuendo e sottraendo la differenza non cambia!'
    },
    {
      prompt: 'Quale proprietà ha distribuito il 5 su entrambi i pezzi?',
      equation: '5 × (10 + 6) = (5 × 10) + (5 × 6)',
      correctAnswer: 'Proprietà Distributiva',
      choices: ['Proprietà Invariantiva', 'Proprietà Associativa', 'Proprietà Distributiva', 'Proprietà Commutativa'],
      explanation: 'Il 5 è stato distribuito sul 10 e sul 6!'
    },
    {
      prompt: 'Attenzione al trabocchetto! Quale affermazione è FALSA?',
      equation: '12 - 5 = 5 - 12',
      correctAnswer: 'È falsa: la sottrazione NON è commutativa!',
      choices: [
        'È vera: vale la commutativa',
        'È falsa: la sottrazione NON è commutativa!',
        'È vera per la proprietà invariantiva',
        'È vera con lo zero'
      ],
      explanation: 'Nella sottrazione l\'ordine è fondamentale! 12 - 5 fa 7, non 5 - 12!'
    },
    {
      prompt: 'Perché 42 × 1 fa sempre 42?',
      equation: '42 × 1 = 42',
      correctAnswer: '1 è l\'Elemento Neutro della moltiplicazione',
      choices: [
        '1 è l\'Elemento Neutro della moltiplicazione',
        'Per la proprietà Invariantiva',
        'Perché 1 è un fattore speciale',
        'Per la proprietà Distributiva'
      ],
      explanation: 'L\'1 è lo specchio della moltiplicazione: lascia qualsiasi numero invariato!'
    },
    {
      prompt: 'Quale proprietà ha tolto lo zero a entrambi i numeri?',
      equation: '180 ÷ 30 = 18 ÷ 3 = 6',
      correctAnswer: 'Proprietà Invariantiva della divisione',
      choices: [
        'Proprietà Invariantiva della divisione',
        'Proprietà Distributiva a destra',
        'Proprietà Commutativa',
        'Proprietà Associativa'
      ],
      explanation: 'Dividendo entrambi i termini per 10 il quoziente non cambia!'
    },
    {
      prompt: 'Attenzione alle regole segrete: quanto fa 8 ÷ 0?',
      equation: '8 ÷ 0 = ?',
      correctAnswer: 'È IMPOSSIBILE: non si può mai dividere per zero!',
      choices: [
        'È IMPOSSIBILE: non si può mai dividere per zero!',
        'Fa 0 per la proprietà dello zero',
        'Fa 8 perché lo zero non conta',
        'Fa 1 per l\'elemento neutro'
      ],
      explanation: 'La divisione per zero non ha senso logico ed è assolutamente impossibile!'
    }
  ];

  const totalRounds = questions.length;
  const current = questions[round] || questions[0];

  // Timer countdown
  useEffect(() => {
    if (feedback !== null) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [round, feedback]);

  const handleTimeOut = () => {
    soundManager.playGentleError();
    setFeedback('wrong');
    setStreak(0);
    setTimeout(() => {
      advanceRound(0);
    }, 1400);
  };

  const advanceRound = (addScore: number) => {
    const newScore = score + addScore;
    setScore(newScore);
    if (round < totalRounds - 1) {
      setRound(prev => prev + 1);
      setTimeLeft(15);
      setSelectedChoice(null);
      setFeedback(null);
    } else {
      // Completed game
      onFinishGame({
        gameId: 'property_detective',
        score: newScore,
        starsEarned: newScore >= 650 ? 3 : newScore >= 450 ? 2 : 1,
        xpEarned: Math.round(newScore * 0.5) + 160,
        correctAnswers: Math.min(totalRounds, Math.floor(newScore / 130)),
        totalQuestions: totalRounds
      });
    }
  };

  const handleSelectChoice = (choice: string) => {
    if (feedback !== null) return;
    setSelectedChoice(choice);

    if (choice === current.correctAnswer) {
      soundManager.playCorrect();
      setFeedback('correct');
      const timeBonus = timeLeft * 5;
      const streakBonus = streak * 25;
      const earned = 100 + timeBonus + streakBonus;
      setStreak(prev => prev + 1);
      setTimeout(() => advanceRound(earned), 1200);
    } else {
      soundManager.playGentleError();
      setFeedback('wrong');
      setStreak(0);
      setTimeout(() => advanceRound(0), 1500);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-amber-200 shadow-xl max-w-2xl mx-auto flex flex-col justify-between min-h-[480px]">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-amber-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Detective delle Proprietà</h3>
            <p className="text-[11px] text-slate-500 font-medium">Indovina la proprietà segreta dietro ogni magia</p>
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

      {/* Round & Timer Bar */}
      <div className="flex justify-between items-center my-3 text-xs font-semibold text-slate-600">
        <span>Indizio {round + 1} di {totalRounds}</span>
        <div className="flex items-center gap-2">
          {streak > 1 && (
            <span className="text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>x{streak}</span>
            </span>
          )}
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full font-mono-numbers font-bold text-xs ${
            timeLeft <= 5 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-700'
          }`}>
            <Timer className="w-3.5 h-3.5" />
            <span>{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-3xl p-6 md:p-8 border border-amber-200/80 flex flex-col items-center justify-center my-auto text-center">
        <p className="text-sm font-bold text-slate-800 mb-3">
          {current.prompt}
        </p>

        {/* Formula Box */}
        <div className="px-6 py-3.5 bg-white rounded-2xl shadow-sm border border-amber-300 text-2xl md:text-3xl font-black font-mono-numbers text-amber-950">
          {current.equation}
        </div>

        {feedback && (
          <div className={`mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-left max-w-md ${
            feedback === 'correct' ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
          }`}>
            <span>{feedback === 'correct' ? '🎉 Esatto!' : '❌ Ops!'} {current.explanation}</span>
          </div>
        )}
      </div>

      {/* Choice Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
        {current.choices.map((choice, idx) => {
          const isSelected = selectedChoice === choice;
          let btnStyle = 'bg-white hover:bg-amber-50 border-slate-200 text-slate-800';

          if (feedback !== null) {
            if (choice === current.correctAnswer) {
              btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md';
            } else if (isSelected && feedback === 'wrong') {
              btnStyle = 'bg-rose-500 text-white border-rose-600';
            } else {
              btnStyle = 'opacity-40 border-slate-200 bg-white text-slate-400';
            }
          }

          return (
            <button
              key={idx}
              disabled={feedback !== null}
              onClick={() => handleSelectChoice(choice)}
              className={`p-3.5 rounded-2xl border-2 text-xs md:text-sm font-bold text-left transition-all shadow-xs active:scale-98 ${btnStyle}`}
            >
              {choice}
            </button>
          );
        })}
      </div>

    </div>
  );
};
