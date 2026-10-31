import React, { useState } from 'react';
import { GameScoreResult, AvatarConfig } from '../../types/math';
import { SwapMasterGame } from './SwapMasterGame';
import { InvariantBalanceGame } from './InvariantBalanceGame';
import { DistributiveSplitGame } from './DistributiveSplitGame';
import { PropertyDetectiveGame } from './PropertyDetectiveGame';
import { NumberLabGame } from './NumberLabGame';
import { ErrorHunterGame } from './ErrorHunterGame';
import { PropertyMatchGame } from './PropertyMatchGame';
import { MentalMathSpeedGame } from './MentalMathSpeedGame';
import { EscapeRoomGame } from './EscapeRoomGame';
import { PropertyTournamentGame } from './PropertyTournamentGame';
import { AvatarRenderer } from '../avatar/AvatarRenderer';
import { soundManager } from '../../utils/audio';
import { ActivityCompletionModal } from '../common/ActivityCompletionModal';
import { runMathEngineTestSuite, TestResult } from '../../utils/engineValidator';
import { 
  Gamepad2, 
  FlaskConical, 
  Crosshair, 
  Layers, 
  Zap, 
  Compass, 
  Trophy, 
  ArrowLeftRight, 
  Scale, 
  Scissors, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  X
} from 'lucide-react';

interface MinigamesHubProps {
  avatarConfig: AvatarConfig;
  userLevel: number;
  gameStats: { [gameId: string]: { highscore: number; plays: number; stars: number } };
  onRecordGameResult: (result: GameScoreResult) => void;
  onNavigateToTrophies: () => void;
  onGoHome?: () => void;
  onGoToTheory?: () => void;
  onGoToVerification?: () => void;
}

export const MinigamesHub: React.FC<MinigamesHubProps> = ({
  avatarConfig,
  userLevel,
  gameStats,
  onRecordGameResult,
  onNavigateToTrophies,
  onGoHome = () => {},
  onGoToTheory = () => {},
  onGoToVerification = () => {}
}) => {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [gameFilterTab, setGameFilterTab] = useState<'main6' | 'classici'>('main6');
  const [lastResult, setLastResult] = useState<GameScoreResult | null>(null);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [validatorResults, setValidatorResults] = useState<{ allPassed: boolean; results: TestResult[] } | null>(null);
  const [isValidatorModalOpen, setIsValidatorModalOpen] = useState(false);

  const handleRunValidator = () => {
    soundManager.playPop();
    const res = runMathEngineTestSuite();
    setValidatorResults(res);
    setIsValidatorModalOpen(true);
    if (res.allPassed) {
      soundManager.playCorrect();
    }
  };

  // The 6 official new games requested by user
  const main6Games = [
    {
      id: 'number_lab',
      title: '1. Il Laboratorio dei Numeri',
      subtitle: 'Trasforma & Risolvi',
      description: 'Trasforma le operazioni complesse applicando le proprietà per renderle semplici scorciatoie. 5 livelli progressivi con provette e reagenti!',
      icon: FlaskConical,
      color: 'from-amber-500 to-orange-500',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
      difficulty: 'Tutti i livelli',
      recommendedFor: 'Tutte le 4 Proprietà'
    },
    {
      id: 'error_hunter',
      title: '2. Caccia all\'Errore',
      subtitle: 'Investigazione Matematica',
      description: 'Esamina procedimenti con 4 passaggi: individua il passaggio che contiene un errore matematico o una proprietà violata e seleziona la correzione esatta.',
      icon: Crosshair,
      color: 'from-rose-500 to-red-600',
      tagColor: 'bg-rose-100 text-rose-800 border-rose-300',
      difficulty: 'Livello 2+',
      recommendedFor: 'Riconoscimento Errori'
    },
    {
      id: 'property_match',
      title: '3. Abbina le Proprietà',
      subtitle: 'Associazione di Carte',
      description: 'Collega a ciascuna proprietà il suo quartetto perfetto: Nome della proprietà, Regola teorica, Esempio numerico e Applicazione pratica nel calcolo a mente.',
      icon: Layers,
      color: 'from-sky-500 to-indigo-600',
      tagColor: 'bg-sky-100 text-sky-800 border-sky-300',
      difficulty: 'Livello 1+',
      recommendedFor: 'Quadro d\'Insieme'
    },
    {
      id: 'mental_math_speed',
      title: '4. La Sfida del Calcolo Mentale',
      subtitle: 'Velocità & Combo Streak',
      description: '60 secondi per risolvere a raffica operazioni a mente usando i trucchi delle proprietà. Combo moltiplicatore per risposte consecutive senza errori!',
      icon: Zap,
      color: 'from-yellow-500 to-amber-600',
      tagColor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      difficulty: 'Sfida Rapida',
      recommendedFor: 'Calcolo Veloce'
    },
    {
      id: 'escape_room',
      title: '5. Escape Room Matematica',
      subtitle: 'Avventura nel Santuario',
      description: '5 ambienti tematici (Biblioteca, Alchimia, Fucina, Bilance, Sanctum di Zero e Uno), 25 enigmi progressivi con indizi e decifrazione del codice finale!',
      icon: Compass,
      color: 'from-emerald-600 to-teal-700',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      difficulty: 'Grande Avventura',
      recommendedFor: 'Esperienza Completa'
    },
    {
      id: 'property_tournament',
      title: '6. Il Torneo delle Proprietà',
      subtitle: 'Campionato a Eliminazione',
      description: 'Affronta 4 round a duello (Sedicesimi, Quarti, Semifinale e Gran Finale contro Archimede) con domande a scelta multipla, calcolo e completamento.',
      icon: Trophy,
      color: 'from-purple-600 to-pink-600',
      tagColor: 'bg-purple-100 text-purple-800 border-purple-300',
      difficulty: 'Torneo Competitivo',
      recommendedFor: 'Sfida 1 vs 1'
    }
  ];

  // Classic quick minigames
  const classicGames = [
    {
      id: 'swap_master',
      title: 'Lo Scambio Magico',
      subtitle: 'Proprietà Commutativa',
      description: 'Trova il numero gemello scambiato nell\'addizione e nella moltiplicazione. Veloce e intuitivo!',
      icon: ArrowLeftRight,
      color: 'from-amber-500 to-orange-500',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      id: 'invariant_balance',
      title: 'Il Trucco Invariante',
      subtitle: 'Proprietà Invariantiva',
      description: 'Bilancia sottrazioni e divisioni con la mossa strategica perfetta per risolverle a mente!',
      icon: Scale,
      color: 'from-sky-500 to-blue-600',
      tagColor: 'bg-sky-100 text-sky-800 border-sky-300'
    },
    {
      id: 'distributive_split',
      title: 'Spacca & Risolvi',
      subtitle: 'Proprietà Distributiva',
      description: 'Scomponi moltiplicazioni a due cifre in decine e unità e colpisci i blocchi per sommare i risultati!',
      icon: Scissors,
      color: 'from-purple-500 to-pink-500',
      tagColor: 'bg-purple-100 text-purple-800 border-purple-300'
    },
    {
      id: 'property_detective',
      title: 'Detective delle Proprietà',
      subtitle: 'Sfida Mista delle 4 Proprietà',
      description: 'Una corsa contro il tempo! Riconosci al volo quale proprietà magica è stata applicata o scova il trabocchetto.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    }
  ];

  const handleFinishGame = (res: GameScoreResult) => {
    soundManager.playLevelUp();
    setLastResult(res);
    onRecordGameResult(res);
    setIsCompletionModalOpen(true);
  };

  const handleCloseCompletionModal = () => {
    setIsCompletionModalOpen(false);
    setActiveGameId(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Active Game View */}
      {activeGameId ? (
        <div className="space-y-4">
          {/* Main 6 Games */}
          {activeGameId === 'number_lab' && (
            <NumberLabGame
              onFinishGame={handleFinishGame}
              onExit={() => setActiveGameId(null)}
            />
          )}
          {activeGameId === 'error_hunter' && (
            <ErrorHunterGame
              onFinishGame={handleFinishGame}
              onExit={() => setActiveGameId(null)}
            />
          )}
          {activeGameId === 'property_match' && (
            <PropertyMatchGame
              onFinishGame={handleFinishGame}
              onExit={() => setActiveGameId(null)}
            />
          )}
          {activeGameId === 'mental_math_speed' && (
            <MentalMathSpeedGame
              onFinishGame={handleFinishGame}
              onExit={() => setActiveGameId(null)}
            />
          )}
          {activeGameId === 'escape_room' && (
            <EscapeRoomGame
              onFinishGame={handleFinishGame}
              onExit={() => setActiveGameId(null)}
            />
          )}
          {activeGameId === 'property_tournament' && (
            <PropertyTournamentGame
              avatarConfig={avatarConfig}
              onFinishGame={handleFinishGame}
              onExit={() => setActiveGameId(null)}
            />
          )}

          {/* Classic 4 Games */}
          {activeGameId === 'swap_master' && (
            <SwapMasterGame
              onFinishGame={handleFinishGame}
              onExit={() => setActiveGameId(null)}
            />
          )}
          {activeGameId === 'invariant_balance' && (
            <InvariantBalanceGame
              onFinishGame={handleFinishGame}
              onExit={() => setActiveGameId(null)}
            />
          )}
          {activeGameId === 'distributive_split' && (
            <DistributiveSplitGame
              onFinishGame={handleFinishGame}
              onExit={() => setActiveGameId(null)}
            />
          )}
          {activeGameId === 'property_detective' && (
            <PropertyDetectiveGame
              onFinishGame={handleFinishGame}
              onExit={() => setActiveGameId(null)}
            />
          )}
        </div>
      ) : (
        /* Games Lobby */
        <div className="space-y-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-amber-100 border border-white/25">
                  <Gamepad2 className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Sezione 4 · Arena dei Giochi Didattici</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-display">
                  6 Grandi Giochi Matematici Interattivi
                </h2>
                <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl leading-relaxed">
                  Dal Laboratorio dei Numeri all'Escape Room a 5 ambienti, dalla Caccia all'Errore al Torneo a eliminazione: metti alla prova la tua mente e guadagna XP!
                </p>
              </div>

              {/* Companion banner */}
              <div className="flex items-center gap-3 bg-black/25 backdrop-blur-md p-3 rounded-2xl border border-white/20 shrink-0">
                <AvatarRenderer config={avatarConfig} size={48} showShadow={false} />
                <div>
                  <p className="text-xs font-bold text-white">{avatarConfig.nickname}</p>
                  <p className="text-[11px] text-amber-200">"Quale gioco iniziamo?"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lobby Mode Toggle */}
          <div className="flex items-center justify-between border-b border-amber-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { soundManager.playPop(); setGameFilterTab('main6'); }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  gameFilterTab === 'main6'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50'
                }`}
              >
                I 6 Nuovi Giochi Principali (Consigliati)
              </button>
              <button
                onClick={() => { soundManager.playPop(); setGameFilterTab('classici'); }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  gameFilterTab === 'classici'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50'
                }`}
              >
                Minigiochi Classici Rapidi
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRunValidator}
                title="Esegui i 10 controlli automatici del motore matematico procedurale"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Test Motore Procedurale (10/10)</span>
              </button>
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                Durata consigliata: 20-25 min
              </span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(gameFilterTab === 'main6' ? main6Games : classicGames).map(game => {
              const Icon = game.icon;
              const stats = gameStats[game.id] || { highscore: 0, plays: 0, stars: 0 };

              return (
                <div
                  key={game.id}
                  className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${game.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                          <Icon className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${game.tagColor}`}>
                            {game.subtitle}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 mt-1">
                            {game.title}
                          </h3>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-xl border border-amber-200">
                        {[1, 2, 3].map(st => (
                          <Star
                            key={st}
                            className={`w-3 h-3 ${
                              st <= stats.stars
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500">
                      {stats.plays > 0 ? (
                        <span>Miglior: <strong className="text-amber-700">{stats.highscore} pt</strong></span>
                      ) : (
                        <span className="text-amber-800 font-semibold">Non ancora giocato</span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        soundManager.playPop();
                        setActiveGameId(game.id);
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
                    >
                      <span>Gioca Ora</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Completion Modal at end of any game */}
      {lastResult && (
        <ActivityCompletionModal
          isOpen={isCompletionModalOpen}
          title="Partita Conclusa!"
          subtitle={`Hai totalizzato ${lastResult.score} punti e guadagnato +${lastResult.xpEarned} XP!`}
          score={lastResult.correctAnswers}
          maxScore={lastResult.totalQuestions}
          xpEarned={lastResult.xpEarned}
          starsEarned={lastResult.starsEarned}
          avatarConfig={avatarConfig}
          onGoHome={() => {
            handleCloseCompletionModal();
            onGoHome();
          }}
          onRetry={() => {
            setIsCompletionModalOpen(false);
          }}
          onNextActivity={() => {
            handleCloseCompletionModal();
            onGoToVerification();
          }}
          onGoToTheory={() => {
            handleCloseCompletionModal();
            onGoToTheory();
          }}
          nextActivityLabel="Vai a Mi Metto alla Prova (Verifica 30 Domande) 📝"
        />
      )}

      {/* 10/10 Procedural Engine Test Modal */}
      {isValidatorModalOpen && validatorResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-emerald-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Sistema di Verifica Automatica Motore (10/10)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Controllo procedurale rigoroso delle relazioni matematiche e stabilità
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsValidatorModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-emerald-800">Esito Globale Test Suite</p>
                <p className="text-xl font-black text-emerald-700">
                  {validatorResults.allPassed ? '10 su 10 Controlli SUPERATI con Successo' : 'Errori Riscontrati'}
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold">
                100% Client-Side JS
              </span>
            </div>

            <div className="space-y-3">
              {validatorResults.results.map((res, i) => (
                <div
                  key={res.testId}
                  className="p-3.5 rounded-2xl border bg-slate-50 border-slate-200 flex items-start gap-3"
                >
                  <div className="mt-0.5">
                    {res.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{res.name}</p>
                    <p className="text-[11px] text-slate-600">{res.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handleRunValidator}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Riesegui Test Suite</span>
              </button>
              <button
                onClick={() => setIsValidatorModalOpen(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
