import React from 'react';
import { DailyMission } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Gift, 
  ArrowRight, 
  Star, 
  Video, 
  BookOpen, 
  Scale, 
  Gamepad2, 
  ArrowLeftRight, 
  Scissors, 
  ShieldCheck, 
  Zap, 
  Palette,
  RotateCcw,
  Check
} from 'lucide-react';

interface DailyMissionsWidgetProps {
  missions: DailyMission[];
  onClaimReward: (missionId: string) => void;
  onNavigateTab: (tab: 'imparo' | 'minigiochi' | 'esplora' | 'trofei', filter?: string) => void;
  onOpenCustomizer: () => void;
  onResetMissions?: () => void;
}

export const DailyMissionsWidget: React.FC<DailyMissionsWidgetProps> = ({
  missions,
  onClaimReward,
  onNavigateTab,
  onOpenCustomizer,
  onResetMissions
}) => {
  const completedCount = missions.filter(m => m.isCompleted).length;
  const claimedCount = missions.filter(m => m.isClaimed).length;
  const allClaimed = missions.length > 0 && claimedCount === missions.length;

  // Format today's date in Italian
  const todayFormatted = new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long'
  }).format(new Date());

  // Helper to render icon by name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return <Video className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5" />;
      case 'ArrowLeftRight':
        return <ArrowLeftRight className="w-5 h-5" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'learn':
        return {
          badge: 'bg-blue-100 text-blue-700 border-blue-200',
          iconBg: 'bg-blue-500 text-white',
          border: 'border-blue-200 hover:border-blue-400'
        };
      case 'game':
        return {
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          iconBg: 'bg-amber-500 text-white',
          border: 'border-amber-200 hover:border-amber-400'
        };
      case 'quiz':
        return {
          badge: 'bg-purple-100 text-purple-700 border-purple-200',
          iconBg: 'bg-purple-500 text-white',
          border: 'border-purple-200 hover:border-purple-400'
        };
      case 'avatar':
        return {
          badge: 'bg-pink-100 text-pink-700 border-pink-200',
          iconBg: 'bg-pink-500 text-white',
          border: 'border-pink-200 hover:border-pink-400'
        };
      default:
        return {
          badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
          iconBg: 'bg-emerald-500 text-white',
          border: 'border-emerald-200 hover:border-emerald-400'
        };
    }
  };

  const handleActionClick = (mission: DailyMission) => {
    soundManager.playPop();
    if (mission.category === 'avatar') {
      onOpenCustomizer();
    } else {
      onNavigateTab(mission.targetTab, mission.specificFilter);
    }
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-md relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      
      {/* Header bar */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-amber-100">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  Missioni Giornaliere
                </h3>
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-full border border-amber-200">
                  {todayFormatted}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Completa i 3 obiettivi di oggi per vincere XP, Stelle e scalare la classifica!
              </p>
            </div>
          </div>
        </div>

        {/* Progress pill & reset option */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-3.5 py-2 flex items-center gap-3">
            <span className="text-xs font-bold text-amber-900">Progresso Oggi:</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((idx) => {
                const mission = missions[idx];
                const isClaimed = mission?.isClaimed;
                const isDone = mission?.isCompleted;
                return (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      isClaimed
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : isDone
                        ? 'bg-amber-400 text-slate-950 animate-pulse'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                    title={isClaimed ? 'Completata e riscattata' : isDone ? 'Completata! Riscatta il premio' : 'Da completare'}
                  >
                    {isClaimed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                  </div>
                );
              })}
            </div>
            <span className="text-xs font-extrabold text-amber-800">
              {completedCount}/3
            </span>
          </div>

          {onResetMissions && (
            <button
              onClick={() => {
                soundManager.playPop();
                onResetMissions();
              }}
              className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
              title="Nuove missioni di prova"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3 Mission Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 pt-6">
        {missions.map((mission, idx) => {
          const theme = getCategoryTheme(mission.category);
          const percent = Math.min(100, Math.round((mission.currentCount / mission.targetCount) * 100));

          return (
            <div
              key={mission.id || idx}
              className={`bg-white rounded-2xl p-5 border-2 ${theme.border} shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative ${
                mission.isCompleted && !mission.isClaimed ? 'ring-2 ring-emerald-400/50 bg-emerald-50/20' : ''
              }`}
            >
              {/* Top row: Icon + Category Badge */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${theme.iconBg} flex items-center justify-center shadow-xs`}>
                    {renderIcon(mission.iconName)}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${theme.badge}`}>
                    {mission.category === 'learn' ? 'Videolezione' : mission.category === 'game' ? 'Minigioco' : mission.category === 'quiz' ? 'Quiz Rapido' : 'Compagno'}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {mission.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {mission.description}
                </p>
              </div>

              {/* Progress and Action Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-500">
                      {mission.currentCount} / {mission.targetCount} {mission.unitLabel}
                    </span>
                    <span className={`font-bold ${mission.isCompleted ? 'text-emerald-600' : 'text-slate-700'}`}>
                      {percent}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${
                        mission.isCompleted 
                          ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                          : 'bg-gradient-to-r from-amber-400 to-orange-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Rewards Preview */}
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    +{mission.xpReward} XP
                  </span>
                  <span className="flex items-center gap-1 text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-md border border-yellow-200">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
                    +{mission.starReward} ⭐
                  </span>
                </div>

                {/* Dynamic Button depending on status */}
                {mission.isClaimed ? (
                  <div className="w-full py-2.5 px-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Riscattata con successo!</span>
                  </div>
                ) : mission.isCompleted ? (
                  <button
                    onClick={() => {
                      soundManager.playCorrect();
                      onClaimReward(mission.id);
                    }}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-extrabold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 animate-bounce transition-all active:scale-95"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Riscatta Ricompensa!</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleActionClick(mission)}
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs"
                  >
                    <span>{mission.actionLabel || 'Vai alla Missione'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner if all 3 are claimed */}
      {allClaimed && (
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-yellow-400/20 rounded-2xl border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg shadow-sm">
              🏆
            </div>
            <div>
              <p className="font-extrabold text-sm text-slate-900">
                Super Traguardo! Hai completato tutte le missioni del giorno!
              </p>
              <p className="text-xs text-slate-600">
                Torna domani per 3 nuove sfide matematiche e per mantenere la tua serie vincente!
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-xs">
            100% Completato ✨
          </span>
        </div>
      )}
    </section>
  );
};
