import React, { useState } from 'react';
import { Badge, AvatarConfig } from '../../types/math';
import { LEVEL_TITLES } from '../../data/mathRules';
import { AvatarRenderer } from '../avatar/AvatarRenderer';
import { soundManager } from '../../utils/audio';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Star, 
  Flame, 
  Zap, 
  Crown, 
  Palette, 
  PlayCircle, 
  Shuffle, 
  Scale, 
  Maximize2, 
  Group 
} from 'lucide-react';

interface TrophiesSectionProps {
  badges: Badge[];
  xp: number;
  level: number;
  stars: number;
  avatarConfig: AvatarConfig;
  onOpenCustomizer: () => void;
}

export const TrophiesSection: React.FC<TrophiesSectionProps> = ({
  badges,
  xp,
  level,
  stars,
  avatarConfig,
  onOpenCustomizer
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'learning' | 'games' | 'mastery'>('all');

  // Compute XP needed for current level vs next level
  // Level threshold: Lv 1 (0 XP), Lv 2 (400 XP), Lv 3 (900 XP), Lv 4 (1500 XP), etc.
  const currentLevelXpBase = (level - 1) * 500;
  const nextLevelXpTarget = level * 500;
  const xpInCurrentLevel = Math.max(0, xp - currentLevelXpBase);
  const xpNeededForLevel = 500;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / xpNeededForLevel) * 100));

  const levelTitle = LEVEL_TITLES[Math.min(LEVEL_TITLES.length - 1, level - 1)] || 'Maestro dei Numeri';

  const filteredBadges = filterCategory === 'all' 
    ? badges 
    : badges.filter(b => b.category === filterCategory || (filterCategory === 'mastery' && b.category === 'customization'));

  const unlockedCount = badges.filter(b => b.progress >= 100).length;

  const renderBadgeIcon = (name: string, isUnlocked: boolean) => {
    const props = { className: `w-6 h-6 ${isUnlocked ? 'text-amber-500' : 'text-slate-400'}` };
    switch (name) {
      case 'Shuffle': return <Shuffle {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'Maximize2': return <Maximize2 {...props} />;
      case 'Group': return <Group {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'PlayCircle': return <PlayCircle {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Crown': return <Crown {...props} />;
      case 'Trophy': return <Trophy {...props} />;
      default: return <Award {...props} />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner & Level Progression Card */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Avatar & Title Left Column */}
          <div className="md:col-span-4 flex items-center gap-4">
            <div className="relative">
              <AvatarRenderer
                config={avatarConfig}
                size={88}
                isCelebrating={true}
                showShadow={false}
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 font-black text-xs px-2 py-0.5 rounded-full border-2 border-white shadow-xs">
                Lv {level}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-100">
                Grado Matematico
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white mt-0.5">
                {levelTitle}
              </h2>
              <p className="text-xs text-amber-100/90 font-medium">
                Compagno: {avatarConfig.nickname}
              </p>
            </div>
          </div>

          {/* XP & Stars Right Column */}
          <div className="md:col-span-8 bg-black/15 backdrop-blur-xs rounded-2xl p-5 border border-white/20 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-bold text-white">Progresso al Livello {level + 1}</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono-numbers">
                <span>XP Totali: <strong className="text-amber-200">{xp} XP</strong></span>
                <span className="flex items-center gap-1 font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{stars} Stelle</span>
                </span>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="w-full bg-black/30 h-3.5 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-amber-300 to-yellow-200 h-full rounded-full transition-all duration-700 shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[11px] text-amber-100 mt-2 font-medium">
              <span>{xpInCurrentLevel} / {xpNeededForLevel} XP nel livello attuale</span>
              <span>Ancora {xpNeededForLevel - xpInCurrentLevel} XP per salire!</span>
            </div>
          </div>

        </div>
      </div>

      {/* Trophy Room Filter & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Sala dei Trofei</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
            Badge Digitali Sbloccabili ({unlockedCount} su {badges.length})
          </h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-amber-50 rounded-xl border border-amber-200 overflow-x-auto">
          {[
            { id: 'all', label: 'Tutti' },
            { id: 'games', label: 'Minigiochi' },
            { id: 'learning', label: 'Apprendimento' },
            { id: 'mastery', label: 'Maestria' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playPop();
                setFilterCategory(tab.id as typeof filterCategory);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                filterCategory === tab.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-amber-900/80 hover:bg-amber-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBadges.map(badge => {
          const isUnlocked = badge.progress >= 100;

          return (
            <button
              key={badge.id}
              onClick={() => {
                soundManager.playPop();
                setSelectedBadge(badge);
              }}
              className={`p-5 rounded-3xl border-2 text-left transition-all flex flex-col justify-between min-h-[170px] ${
                isUnlocked
                  ? 'bg-white border-amber-400 shadow-md hover:border-amber-500 hover:shadow-lg'
                  : 'bg-slate-50/70 border-slate-200 opacity-75 hover:opacity-100 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isUnlocked ? 'bg-amber-100 shadow-xs' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {renderBadgeIcon(badge.iconName, isUnlocked)}
                  </div>

                  {isUnlocked ? (
                    <span className="p-1 bg-emerald-100 text-emerald-700 rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="p-1 bg-slate-200 text-slate-500 rounded-full">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  {badge.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {badge.description}
                </p>
              </div>

              {/* Progress Bar / Unlocked Tag */}
              <div className="mt-4 pt-2 border-t border-slate-100">
                {isUnlocked ? (
                  <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Sbloccato!</span>
                  </span>
                ) : (
                  <div>
                    <div className="flex justify-between text-[10px] font-semibold text-slate-500 mb-1">
                      <span>Progresso</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full rounded-full"
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-amber-200 text-center relative">
            <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center ${
              selectedBadge.progress >= 100 ? 'bg-amber-100 shadow-md' : 'bg-slate-100'
            }`}>
              {renderBadgeIcon(selectedBadge.iconName, selectedBadge.progress >= 100)}
            </div>

            <h3 className="text-lg font-bold text-slate-900">{selectedBadge.title}</h3>
            <p className="text-xs text-slate-600 mt-1">{selectedBadge.description}</p>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-semibold text-amber-900 my-4">
              <strong>Come ottenerlo: </strong>
              <span>{selectedBadge.requirement}</span>
            </div>

            {selectedBadge.progress >= 100 ? (
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Trofeo in tuo possesso! Ottimo lavoro!</span>
              </div>
            ) : (
              <div className="text-xs text-slate-500 mb-4 font-medium">
                Attualmente al {selectedBadge.progress}% del completamento.
              </div>
            )}

            <button
              onClick={() => { soundManager.playPop(); setSelectedBadge(null); }}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
