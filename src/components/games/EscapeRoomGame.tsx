import React, { useState } from 'react';
import { ESCAPE_ROOMS, generateEscapeRooms } from '../../data/escapeRoomData';
import { EscapeRoom, EscapePuzzle, GameScoreResult } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { 
  Key, 
  DoorClosed, 
  DoorOpen, 
  Lock, 
  Unlock, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface EscapeRoomGameProps {
  onFinishGame: (res: GameScoreResult) => void;
  onExit: () => void;
}

export const EscapeRoomGame: React.FC<EscapeRoomGameProps> = ({ onFinishGame, onExit }) => {
  const [rooms, setRooms] = useState<EscapeRoom[]>(() => generateEscapeRooms());
  const [currentRoomIdx, setCurrentRoomIdx] = useState(0);
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const [unlockedRooms, setUnlockedRooms] = useState<number[]>([1]); // Room 1 starts unlocked
  const [collectedCodes, setCollectedCodes] = useState<{ [roomId: number]: number[] }>({
    1: [], 2: [], 3: [], 4: [], 5: []
  });
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const [vaultCodeAttempt, setVaultCodeAttempt] = useState('');
  const [isVaultOpened, setIsVaultOpened] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const room: EscapeRoom = rooms[currentRoomIdx] || rooms[0];
  const puzzle: EscapePuzzle = room.puzzles[currentPuzzleIdx];

  const handleRestartNewNumbers = () => {
    soundManager.playPop();
    setRooms(generateEscapeRooms());
    setCurrentRoomIdx(0);
    setCurrentPuzzleIdx(0);
    setUnlockedRooms([1]);
    setCollectedCodes({ 1: [], 2: [], 3: [], 4: [], 5: [] });
    setShowHint(false);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsVictoryModalOpen(false);
    setVaultCodeAttempt('');
    setIsVaultOpened(false);
    setTotalScore(0);
  };

  const handleSelectAnswer = (ans: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(ans);
  };

  const handleVerifyPuzzle = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedAnswer === puzzle.correctAnswer;
    if (isCorrect) {
      soundManager.playCorrect();
      setTotalScore(prev => prev + 50);

      // Save code digit
      setCollectedCodes(prev => ({
        ...prev,
        [room.id]: [...(prev[room.id] || []), puzzle.codeDigit]
      }));
    } else {
      soundManager.playGentleError();
    }
  };

  const handleNextPuzzle = () => {
    soundManager.playPop();
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);

    if (currentPuzzleIdx < room.puzzles.length - 1) {
      setCurrentPuzzleIdx(prev => prev + 1);
    } else {
      // Completed all 5 puzzles in current room! Unlock next room or open final vault
      soundManager.playLevelUp();
      const nextRoomId = room.id + 1;
      if (nextRoomId <= ESCAPE_ROOMS.length) {
        setUnlockedRooms(prev => [...new Set([...prev, nextRoomId])]);
        setCurrentRoomIdx(prev => prev + 1);
        setCurrentPuzzleIdx(0);
      } else {
        // All 5 rooms completed! Open vault challenge
        setIsVaultOpened(true);
      }
    }
  };

  const handleRetryCurrentPuzzle = () => {
    soundManager.playPop();
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
  };

  const isCurrentCorrect = isAnswerSubmitted && selectedAnswer === puzzle.correctAnswer;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-600 text-white flex items-center justify-center shadow-md">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Gioco 5 · Escape Room Matematica
              </span>
              <span className="text-xs font-bold text-slate-500">
                Stanza {room.id} di {rooms.length} · Enigma {currentPuzzleIdx + 1}/5
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">{room.name}</h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Punti Fuga</p>
            <p className="text-xl font-black text-amber-600">{totalScore} XP</p>
          </div>
          <button
            onClick={handleRestartNewNumbers}
            title="Genera nuova partita con enigmi diversi"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all"
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

      {/* 5 Rooms Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {rooms.map((r, idx) => {
          const isUnlocked = unlockedRooms.includes(r.id);
          const isCurrent = idx === currentRoomIdx;
          const isFinished = (collectedCodes[r.id] || []).length >= 5;

          return (
            <button
              key={r.id}
              disabled={!isUnlocked}
              onClick={() => {
                if (!isUnlocked) return;
                soundManager.playPop();
                setCurrentRoomIdx(idx);
                setCurrentPuzzleIdx(0);
                setSelectedAnswer(null);
                setIsAnswerSubmitted(false);
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isCurrent
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                  : isFinished
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : isUnlocked
                  ? 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
                  : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span>Stanza {r.id}</span>
                {isFinished ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : isUnlocked ? (
                  <DoorOpen className="w-3.5 h-3.5" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                )}
              </div>
              <p className="text-xs font-bold truncate mt-1">{r.name.replace('La ', '').replace('Il ', '')}</p>
            </button>
          );
        })}
      </div>

      {/* Vault / Final Chamber Screen if all rooms cleared */}
      {isVaultOpened ? (
        <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 border-4 border-amber-400 rounded-3xl p-8 text-center space-y-6 animate-fade-in shadow-xl">
          <div className="p-4 bg-amber-500 text-white rounded-3xl inline-block shadow-lg">
            <Trophy className="w-16 h-16 mx-auto animate-bounce-subtle" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-200 px-3 py-1 rounded-full">
              Portale Finale Raggiunto!
            </span>
            <h4 className="text-3xl font-black text-slate-900">Il Calice d'Oro della Matematica è Tuo!</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Hai attraversato tutti i 5 ambienti del Santuario, risolto 25 enigmi sulle proprietà delle 4 operazioni e decifrato i codici segreti! Sei un vero Maestro Matematico!
            </p>
          </div>

          <div className="p-4 bg-white/80 rounded-2xl max-w-sm mx-auto border border-amber-300">
            <p className="text-xs font-bold text-slate-500 uppercase">Punteggio Totale Escape Room</p>
            <p className="text-3xl font-black text-amber-700 mt-1">{totalScore + 300} XP</p>
            <p className="text-xs text-emerald-700 font-bold mt-1">★ 3 Stelle d'Oro Conquistate</p>
          </div>

          <button
            onClick={() => {
              onFinishGame({
                gameId: 'escape_room',
                score: totalScore + 300,
                starsEarned: 3,
                xpEarned: totalScore + 300,
                correctAnswers: 25,
                totalQuestions: 25
              });
            }}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-sm rounded-2xl shadow-xl transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <span>Salva la Vittoria e Riscuoti la Ricompensa</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </button>
        </div>
      ) : (
        /* Room and Puzzle Active View */
        <div className="space-y-6">
          
          {/* Room narrative banner */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Proprietà Richiesta: {room.requiredProperty}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">{room.description}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Cifre Sbloccate</span>
              <span className="font-mono text-sm font-bold text-amber-300">
                {(collectedCodes[room.id] || []).join(' · ') || 'Nessuna'}
              </span>
            </div>
          </div>

          {/* Puzzle Box */}
          <div className="bg-amber-50/50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-black">
                  {currentPuzzleIdx + 1}
                </span>
                <h4 className="font-bold text-slate-900 text-base">{puzzle.puzzleTitle}</h4>
              </div>
              <button
                onClick={() => setShowHint(prev => !prev)}
                className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 bg-amber-100/80 px-2.5 py-1 rounded-lg"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>{showHint ? 'Nascondi Indizio' : 'Chiedi un Indizio'}</span>
              </button>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {puzzle.riddleText}
            </p>

            {puzzle.equation && (
              <div className="p-4 bg-white rounded-2xl border border-amber-200 font-mono text-xl font-bold text-slate-900 text-center shadow-xs">
                {puzzle.equation}
              </div>
            )}

            {showHint && (
              <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 flex items-start gap-2 animate-fade-in">
                <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <p><strong>Indizio della Guida:</strong> {puzzle.hint}</p>
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {puzzle.options.map((opt, oIdx) => {
                const isSelected = selectedAnswer === opt;
                let btnStyle = 'bg-white hover:bg-amber-50 border-slate-200 text-slate-800';

                if (isAnswerSubmitted) {
                  if (opt === puzzle.correctAnswer) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-sm';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                  } else {
                    btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-amber-500 text-white border-amber-600 font-bold shadow-xs';
                }

                return (
                  <button
                    key={oIdx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectAnswer(opt)}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-md bg-black/10 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Submit / Feedback */}
            <div className="pt-4 border-t border-amber-200">
              {!isAnswerSubmitted ? (
                <button
                  disabled={!selectedAnswer}
                  onClick={handleVerifyPuzzle}
                  className={`w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    selectedAnswer
                      ? 'bg-amber-600 hover:bg-amber-700 text-white active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Sblocca Ingranaggio con questo Codice
                </button>
              ) : (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
                    isCurrentCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}>
                    {isCurrentCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold text-sm">
                        {isCurrentCorrect ? `Enigma Risolto! Hai ottenuto la runa '${puzzle.codeDigit}'!` : 'La porta non scatta. Il codice è errato!'}
                      </p>
                      <p className="mt-1 text-slate-700">{puzzle.explanation}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {!isCurrentCorrect ? (
                      <button
                        onClick={handleRetryCurrentPuzzle}
                        className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Riprova questo enigma</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleNextPuzzle}
                        className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <span>{currentPuzzleIdx < room.puzzles.length - 1 ? 'Prossimo Enigma della Stanza' : 'Stanza Completata! Apri la Porta'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
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
