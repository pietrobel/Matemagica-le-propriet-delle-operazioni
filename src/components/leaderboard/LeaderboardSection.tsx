import React, { useState } from 'react';
import { LeaderboardEntry, AvatarConfig } from '../../types/math';
import { AvatarRenderer } from '../avatar/AvatarRenderer';
import { soundManager } from '../../utils/audio';
import { Trophy, Star, Sparkles, Medal, Heart, Play, ArrowRight } from 'lucide-react';

interface LeaderboardSectionProps {
  currentUserEntry: LeaderboardEntry;
  classmates: LeaderboardEntry[];
  onChallengeFriend?: (gameId: string) => void;
  onOpenCustomizer: () => void;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({
  currentUserEntry,
  classmates,
  onChallengeFriend,
  onOpenCustomizer
}) => {
  const [filterPeriod, setFilterPeriod] = useState<'week' | 'all'>('week');

  // Combine current user with classmates and sort by XP descending
  const allEntries: LeaderboardEntry[] = [...classmates, currentUserEntry].sort((a, b) => b.xp - a.xp);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center shadow-md">
            1°
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-black text-sm flex items-center justify-center shadow-sm">
            2°
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 font-black text-sm flex items-center justify-center shadow-sm">
            3°
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center">
            {rank}°
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Trophy className="w-4 h-4" />
            <span>Spirito di Squadra</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
            Classifica Amichevole di Classe
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Imparare insieme è più divertente! Guarda i progressi dei tuoi compagni, incoraggiali e scala le posizioni risolvendo i minigiochi.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-amber-50 rounded-xl border border-amber-200 self-start sm:self-auto">
          <button
            onClick={() => { soundManager.playPop(); setFilterPeriod('week'); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterPeriod === 'week' ? 'bg-amber-500 text-white shadow-xs' : 'text-amber-900/80 hover:bg-amber-100'
            }`}
          >
            Questa Settimana
          </button>
          <button
            onClick={() => { soundManager.playPop(); setFilterPeriod('all'); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterPeriod === 'all' ? 'bg-amber-500 text-white shadow-xs' : 'text-amber-900/80 hover:bg-amber-100'
            }`}
          >
            Punti Totali
          </button>
        </div>
      </div>

      {/* Friendly Encouragement Banner */}
      <div className="bg-gradient-to-r from-sky-50 via-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-sm">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">La Matematica è un Gioco di Squadra</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Ogni volta che impari una proprietà o batti un record, aiuti tutta la classe a crescere!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playPop();
            if (onChallengeFriend) onChallengeFriend('swap_master');
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95 shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Fai una Sfida Amichevole</span>
        </button>
      </div>

      {/* Leaderboard Entries List */}
      <div className="bg-white rounded-3xl p-4 md:p-6 border border-amber-200 shadow-sm space-y-3">
        {allEntries.map((entry, index) => {
          const rank = index + 1;
          const isMe = entry.id === currentUserEntry.id;

          return (
            <div
              key={entry.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isMe
                  ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-200/60 shadow-xs'
                  : 'bg-white border-slate-100 hover:border-amber-200 hover:bg-amber-50/30'
              }`}
            >
              {/* Left Zone: Rank, Avatar & Info */}
              <div className="flex items-center gap-4">
                {getRankBadge(rank)}

                <div className="relative shrink-0">
                  <AvatarRenderer
                    config={entry.avatar}
                    size={48}
                    showShadow={false}
                  />
                  {isMe && (
                    <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white">
                      TU
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{entry.name}</h4>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                      Lv {entry.level}
                    </span>
                    {isMe && (
                      <button
                        onClick={onOpenCustomizer}
                        className="text-[10px] text-amber-700 hover:underline font-semibold"
                      >
                        (modifica avatar)
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 italic mt-0.5">
                    "{entry.cheerMessage}"
                  </p>
                </div>
              </div>

              {/* Right Zone: Score & Stars */}
              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Proprietà Preferita</span>
                  <p className="text-xs font-bold text-amber-700">{entry.favoriteProperty}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 font-mono-numbers">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{entry.stars}</span>
                </div>

                <div className="text-right min-w-[70px]">
                  <span className="text-base font-black text-slate-900 font-mono-numbers">
                    {entry.xp}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold ml-1">XP</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
