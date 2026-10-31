import React, { useState } from 'react';
import { GameScoreResult, AvatarConfig } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { 
  Trophy, 
  Swords, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Shield,
  Zap,
  Crown
} from 'lucide-react';

interface PropertyTournamentGameProps {
  avatarConfig: AvatarConfig;
  onFinishGame: (res: GameScoreResult) => void;
  onExit: () => void;
}

import { generateTournamentRounds, TournamentRoundInstance } from '../../utils/proceduralGenerators';

export const PropertyTournamentGame: React.FC<PropertyTournamentGameProps> = ({
  avatarConfig,
  onFinishGame,
  onExit
}) => {
  const [tournamentRounds, setTournamentRounds] = useState<TournamentRoundInstance[]>(() => generateTournamentRounds());
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isTournamentWon, setIsTournamentWon] = useState(false);

  const round = tournamentRounds[currentRoundIdx] || tournamentRounds[0];
  const question = round.questions[currentQIdx];

  const handleRestartNewNumbers = () => {
    soundManager.playPop();
    setTournamentRounds(generateTournamentRounds());
    setCurrentRoundIdx(0);
    setCurrentQIdx(0);
    setPlayerScore(0);
    setOpponentScore(0);
    setSelectedAns(null);
    setIsSubmitted(false);
    setFeedback(null);
    setIsTournamentWon(false);
  };

  const handleSelectAnswer = (ans: string) => {
    if (isSubmitted) return;
    setSelectedAns(ans);
  };

  const handleVerify = () => {
    if (!selectedAns || isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = selectedAns === question.correctAnswer;
    if (isCorrect) {
      soundManager.playCorrect();
      setPlayerScore(prev => prev + 100);
      setFeedback({ isCorrect: true, text: `Punto per te! ${question.explanation}` });
    } else {
      soundManager.playGentleError();
      setOpponentScore(prev => prev + 100);
      setFeedback({ isCorrect: false, text: `L'avversario ne approfitta! ${question.explanation}` });
    }
  };

  const handleNext = () => {
    soundManager.playPop();
    setSelectedAns(null);
    setIsSubmitted(false);
    setFeedback(null);

    if (currentQIdx < round.questions.length - 1) {
      setCurrentQIdx(prev => prev + 1);
    } else {
      // Completed this round! Advance to next round or win tournament
      if (currentRoundIdx < tournamentRounds.length - 1) {
        soundManager.playLevelUp();
        setCurrentRoundIdx(prev => prev + 1);
        setCurrentQIdx(0);
      } else {
        soundManager.playBadgeUnlock();
        setIsTournamentWon(true);
      }
    }
  };

  const handleFinish = () => {
    onFinishGame({
      gameId: 'property_tournament',
      score: playerScore + 200,
      starsEarned: 3,
      xpEarned: playerScore + 200,
      correctAnswers: Math.floor(playerScore / 100),
      totalQuestions: 8
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 text-white flex items-center justify-center shadow-md">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Gioco 6 · Il Torneo delle Proprietà
              </span>
              <span className="text-xs font-bold text-slate-500">
                Fase {round.roundNumber} di {tournamentRounds.length}: {round.stageName}
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">Sfida 1 vs 1 con Tabellone Progressivo</h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleRestartNewNumbers}
            title="Genera nuovo torneo con numeri diversi"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-xl transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nuovo Torneo</span>
          </button>
          <button
            onClick={onExit}
            className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
          >
            Esci
          </button>
        </div>
      </div>

      {isTournamentWon ? (
        /* Champion Victory Screen */
        <div className="text-center py-10 space-y-6 animate-fade-in">
          <div className="p-4 bg-amber-400 text-slate-950 rounded-3xl inline-block shadow-xl">
            <Crown className="w-16 h-16 mx-auto animate-bounce-subtle" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Campione Indiscusso del Torneo!
            </span>
            <h4 className="text-3xl font-black text-slate-900">Hai battuto il Gran Maestro Archimede!</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Hai superato tutti e 4 i round ad eliminazione diretta, conquistando la Coppa d'Oro delle 4 Proprietà!
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl max-w-sm mx-auto border border-amber-200">
            <p className="text-xs font-bold text-slate-500 uppercase">Punti Torneo Conquistati</p>
            <p className="text-3xl font-black text-amber-700 mt-0.5">{playerScore + 200} XP</p>
          </div>

          <button
            onClick={handleFinish}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm rounded-2xl shadow-xl transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <span>Riscuoti il Trofeo del Campione</span>
            <Trophy className="w-5 h-5 text-amber-400" />
          </button>
        </div>
      ) : (
        /* Active Duel Screen */
        <div className="space-y-6">
          
          {/* Duel Scoreboard */}
          <div className="grid grid-cols-2 gap-4 p-5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-3xl border border-amber-200">
            {/* Player */}
            <div className="flex items-center gap-3">
              <span className="text-3xl">👤</span>
              <div>
                <p className="text-xs font-bold text-slate-900">{avatarConfig.nickname} (Tu)</p>
                <p className="text-xl font-black text-amber-700">{playerScore} pt</p>
              </div>
            </div>

            {/* Opponent */}
            <div className="flex items-center justify-end gap-3 text-right">
              <div>
                <p className="text-xs font-bold text-slate-900">{round.opponentName}</p>
                <p className="text-xl font-black text-slate-600">{opponentScore} pt</p>
              </div>
              <span className="text-3xl">{round.opponentAvatar}</span>
            </div>
          </div>

          {/* Duel Question Card */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                Duello: {round.targetProperty}
              </span>
              <span className="text-xs font-bold text-slate-500">
                Domanda {currentQIdx + 1} di 2
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {question.question}
            </h4>

            {question.equationPrompt && (
              <div className="p-4 bg-white rounded-2xl border border-amber-200 font-mono text-xl font-bold text-slate-900 text-center shadow-xs">
                {question.equationPrompt}
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {question.options.map((opt, oIdx) => {
                const isSelected = selectedAns === opt;
                let btnStyle = 'bg-white hover:bg-amber-50 border-slate-200 text-slate-800';

                if (isSubmitted) {
                  if (opt === question.correctAnswer) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                  } else {
                    btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-amber-500 text-white border-amber-600 font-bold';
                }

                return (
                  <button
                    key={oIdx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectAnswer(opt)}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-md bg-black/10 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Action / Feedback */}
            <div className="pt-4 border-t border-slate-200">
              {!isSubmitted ? (
                <button
                  disabled={!selectedAns}
                  onClick={handleVerify}
                  className={`w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    selectedAns
                      ? 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Lancia la Risposta nel Duello ⚔️
                </button>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
                    feedback?.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}>
                    {feedback?.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold text-sm">{feedback?.text}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                    >
                      <span>{currentQIdx < round.questions.length - 1 ? 'Prossima Sfida del Round' : 'Avanza nel Torneo'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
