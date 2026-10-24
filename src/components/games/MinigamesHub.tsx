import React, { useState } from 'react';
import { GameScoreResult, AvatarConfig } from '../../types/math';
import { SwapMasterGame } from './SwapMasterGame';
import { InvariantBalanceGame } from './InvariantBalanceGame';
import { DistributiveSplitGame } from './DistributiveSplitGame';
import { PropertyDetectiveGame } from './PropertyDetectiveGame';
import { AvatarRenderer } from '../avatar/AvatarRenderer';
import { soundManager } from '../../utils/audio';
import { 
  Gamepad2, 
  ArrowLeftRight, 
  Scale, 
  Scissors, 
  ShieldCheck, 
  Star, 
  Trophy, 
  Sparkles, 
  RotateCcw, 
  ArrowRight 
} from 'lucide-react';

interface MinigamesHubProps {
  avatarConfig: AvatarConfig;
  userLevel: number;
  gameStats: { [gameId: string]: { highscore: number; plays: number; stars: number } };
  onRecordGameResult: (result: GameScoreResult) => void;
  onNavigateToTrophies: () => void;
}

export const MinigamesHub: React.FC<MinigamesHubProps> = ({
  avatarConfig,
  userLevel,
  gameStats,
  onRecordGameResult,
  onNavigateToTrophies
}) => {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<GameScoreResult | null>(null);

  const games = [
    {
      id: 'swap_master',
      title: 'Lo Scambio Magico',
      subtitle: 'Proprietà Commutativa',
      description: 'Trova il numero gemello scambiato nell\'addizione e nella moltiplicazione. Veloce e intuitivo!',
      icon: ArrowLeftRight,
      color: 'from-amber-500 to-orange-500',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
      difficulty: 'Facile / Tutti i livelli',
      recommendedFor: 'Addizione e Moltiplicazione'
    },
    {
      id: 'invariant_balance',
      title: 'Il Trucco Invariante',
      subtitle: 'Proprietà Invariantiva',
      description: 'Bilancia sottrazioni e divisioni complicate con la mossa strategica perfetta per risolverle a mente!',
      icon: Scale,
      color: 'from-sky-500 to-blue-600',
      tagColor: 'bg-sky-100 text-sky-800 border-sky-300',
      difficulty: 'Medio / Livello 2+',
      recommendedFor: 'Sottrazione e Divisione'
    },
    {
      id: 'distributive_split',
      title: 'Spacca & Risolvi',
      subtitle: 'Proprietà Distributiva',
      description: 'Scomponi moltiplicazioni a due cifre in decine e unità e colpisci i blocchi per sommare i risultati!',
      icon: Scissors,
      color: 'from-purple-500 to-pink-500',
      tagColor: 'bg-purple-100 text-purple-800 border-purple-300',
      difficulty: 'Tattico / Livello 3+',
      recommendedFor: 'Moltiplicazione Avanzata'
    },
    {
      id: 'property_detective',
      title: 'Detective delle Proprietà',
      subtitle: 'Sfida Mista delle 4 Proprietà',
      description: 'Una corsa contro il tempo! Riconosci al volo quale proprietà magica è stata applicata o scova il trabocchetto.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      difficulty: 'Super Sfida / Livello 4+',
      recommendedFor: 'Tutte le 4 Operazioni'
    }
  ];

  const handleFinishGame = (res: GameScoreResult) => {
    soundManager.playLevelUp();
    setLastResult(res);
    onRecordGameResult(res);
  };

  const handleCloseVictoryModal = () => {
    soundManager.playPop();
    setLastResult(null);
    setActiveGameId(null);
  };

  return (
    <div className="space-y-8">
      {/* Active Game Screen */}
      {activeGameId ? (
        <div className="space-y-4">
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
        /* Minigames Grid / Lobby */
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
                <Gamepad2 className="w-4 h-4" />
                <span>Arena dei Minigiochi</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                Gioca, Guadagna Punti e Sblocca i Livelli!
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Ogni partita ti regala punti esperienza (XP), stelle matematiche e sblocca ricompense e costumi per il tuo compagno avatar.
              </p>
            </div>

            {/* Quick Companion Cheer Banner */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-amber-200 shadow-xs self-start md:self-auto">
              <AvatarRenderer config={avatarConfig} size={48} showShadow={false} />
              <div>
                <p className="text-xs font-bold text-slate-900">{avatarConfig.nickname}</p>
                <p className="text-[11px] text-amber-700 font-medium">"Quale sfida proviamo ora?"</p>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map(game => {
              const Icon = game.icon;
              const stats = gameStats[game.id] || { highscore: 0, plays: 0, stars: 0 };

              return (
                <div
                  key={game.id}
                  className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Card Top Pill & Icon */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${game.color} text-white flex items-center justify-center shadow-md`}>
                          <Icon className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <div>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${game.tagColor}`}>
                            {game.subtitle}
                          </span>
                          <h3 className="text-lg font-bold text-slate-900 mt-1">
                            {game.title}
                          </h3>
                        </div>
                      </div>

                      {/* Stars indicator */}
                      <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                        {[1, 2, 3].map(st => (
                          <Star
                            key={st}
                            className={`w-3.5 h-3.5 ${
                              st <= stats.stars
                                ? 'fill-amber-400 text-amber-500'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      {game.description}
                    </p>

                    {/* Highscore & plays badge */}
                    <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                      <span>Miglior Punteggio: <strong className="text-slate-900 font-mono-numbers">{stats.highscore} pt</strong></span>
                      <span>Partite: <strong className="text-slate-900 font-mono-numbers">{stats.plays}</strong></span>
                    </div>
                  </div>

                  {/* Play Action Button */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{game.difficulty}</span>
                    <button
                      onClick={() => {
                        soundManager.playPop();
                        setActiveGameId(game.id);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      <span>Gioca Subito</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Victory / Round Summary Modal */}
      {lastResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-amber-200 text-center relative overflow-hidden animate-bounce-subtle">
            
            {/* Top Confetti / Star Glow */}
            <div className="w-20 h-20 mx-auto mb-2">
              <AvatarRenderer
                config={avatarConfig}
                size={80}
                isCelebrating={true}
                speechBubble="Vittoria! 🏆"
              />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mt-2">
              Fantastico Lavoro!
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Hai completato la sfida matematica con grande abilità
            </p>

            {/* Stars Won Animation */}
            <div className="flex items-center justify-center gap-2 my-5">
              {[1, 2, 3].map(st => (
                <div
                  key={st}
                  className={`p-2 rounded-2xl transition-transform ${
                    st <= lastResult.starsEarned
                      ? 'bg-amber-100 text-amber-500 scale-110 shadow-sm'
                      : 'bg-slate-100 text-slate-300'
                  }`}
                >
                  <Star className={`w-7 h-7 ${st <= lastResult.starsEarned ? 'fill-current' : ''}`} />
                </div>
              ))}
            </div>

            {/* Metrics Box */}
            <div className="grid grid-cols-2 gap-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Punteggio</span>
                <p className="text-xl font-black text-slate-900 font-mono-numbers">{lastResult.score}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700">Esperienza (XP)</span>
                <p className="text-xl font-black text-amber-600 font-mono-numbers">+{lastResult.xpEarned} XP</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  soundManager.playPop();
                  setLastResult(null); // Keep in current game to replay
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 inline-flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Gioca Ancora</span>
              </button>

              <button
                onClick={handleCloseVictoryModal}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                Torna ai Minigiochi
              </button>

              <button
                onClick={() => {
                  handleCloseVictoryModal();
                  onNavigateToTrophies();
                }}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 py-1 inline-flex items-center justify-center gap-1 mt-1"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Vedi i tuoi Trofei & Livello</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
