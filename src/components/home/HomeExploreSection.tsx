import React from 'react';
import { AvatarConfig, DailyMission } from '../../types/math';
import { AvatarRenderer } from '../avatar/AvatarRenderer';
import { QuickQuizWidget } from './QuickQuizWidget';
import { DailyMissionsWidget } from './DailyMissionsWidget';
import { soundManager } from '../../utils/audio';
import { 
  Play, 
  Gamepad2, 
  Sparkles, 
  ArrowRight, 
  Star, 
  Trophy, 
  Plus, 
  Minus, 
  X as MulIcon, 
  Divide, 
  Palette 
} from 'lucide-react';

interface HomeExploreSectionProps {
  avatarConfig: AvatarConfig;
  userLevel: number;
  xp: number;
  stars: number;
  onNavigate: (tab: 'esplora' | 'imparo' | 'minigiochi' | 'trofei' | 'classifica', filter?: string) => void;
  onOpenCustomizer: () => void;
  onAwardXp: (amount: number) => void;
  missions: DailyMission[];
  onClaimMissionReward: (missionId: string) => void;
  onQuizCorrectAnswer?: () => void;
  onResetMissions?: () => void;
}

export const HomeExploreSection: React.FC<HomeExploreSectionProps> = ({
  avatarConfig,
  userLevel,
  xp,
  stars,
  onNavigate,
  onOpenCustomizer,
  onAwardXp,
  missions,
  onClaimMissionReward,
  onQuizCorrectAnswer,
  onResetMissions
}) => {
  return (
    <div className="space-y-10">
      
      {/* Hero Split Section */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFFFFF 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-amber-100 border border-white/25">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Avventura per Giovani Matematici</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-display text-balance">
              Benvenuto a Matemagica: Il Regno delle Proprietà!
            </h1>

            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-xl">
              Scopri i segreti magici delle 4 operazioni: addizione, sottrazione, moltiplicazione e divisione. Impara con video illustrati e divertiti con minigiochi interattivi per vincere trofei e scalare la classifica!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  soundManager.playPop();
                  onNavigate('minigiochi');
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-white hover:bg-amber-50 text-slate-900 font-bold text-sm rounded-2xl shadow-lg transition-all active:scale-95"
              >
                <Gamepad2 className="w-5 h-5 text-amber-600" />
                <span>Gioca ai Minigiochi</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playPop();
                  onNavigate('imparo');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black/25 hover:bg-black/35 text-white font-bold text-sm rounded-2xl border border-white/30 backdrop-blur-md transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Guarda le Videolezioni</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image & Interactive Companion */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 group">
              <img
                src="/src/assets/images/hero_math_adventure_1792238943381.jpg"
                alt="Matemagica paesaggio avventuroso per giovani matematici"
                referrerPolicy="no-referrer"
                className="w-full aspect-16/10 object-cover transform group-hover:scale-102 transition-transform duration-500"
              />
              {/* Floating Companion Speech Overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-amber-200 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <AvatarRenderer config={avatarConfig} size={42} showShadow={false} />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {avatarConfig.nickname} dice:
                    </p>
                    <p className="text-[11px] text-amber-700 font-medium truncate">
                      "Oggi quale proprietà scopriremo insieme?"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundManager.playPop();
                    onOpenCustomizer();
                  }}
                  className="p-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg text-xs font-bold shrink-0 transition-colors"
                  title="Cambia vestiti o accessori al tuo compagno"
                >
                  <Palette className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Daily Missions System - 3 Random daily challenges */}
      <DailyMissionsWidget
        missions={missions}
        onClaimReward={onClaimMissionReward}
        onNavigateTab={(tab, filter) => onNavigate(tab, filter)}
        onOpenCustomizer={onOpenCustomizer}
        onResetMissions={onResetMissions}
      />

      {/* Quick Quiz Section - Warmup before Minigames */}
      <QuickQuizWidget
        avatarConfig={avatarConfig}
        onAwardXp={onAwardXp}
        onGoToGames={() => onNavigate('minigiochi')}
        onQuizAnsweredCorrectly={onQuizCorrectAnswer}
      />

      {/* 4 Operations Quick Explorer Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Le 4 Operazioni e i Loro Superpoteri</h3>
            <p className="text-xs text-slate-500">Tocca un'operazione per scoprire le sue regole segrete</p>
          </div>
          <button
            onClick={() => {
              soundManager.playPop();
              onNavigate('imparo');
            }}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
          >
            <span>Vedi tutte le regole</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Addizione (+)',
              desc: 'Commutativa e Associativa (inversa/dissociativa)',
              trick: 'Metti prima il numero più grande!',
              icon: Plus,
              bg: 'from-amber-500/10 to-orange-500/5',
              border: 'border-amber-200',
              iconBg: 'bg-amber-500 text-white',
              opId: 'addizione'
            },
            {
              title: 'Sottrazione (-)',
              desc: 'Proprietà Invariantiva e lo Zero',
              trick: 'Aggiungi lo stesso numero a entrambi!',
              icon: Minus,
              bg: 'from-sky-500/10 to-blue-500/5',
              border: 'border-sky-200',
              iconBg: 'bg-sky-500 text-white',
              opId: 'sottrazione'
            },
            {
              title: 'Moltiplicazione (×)',
              desc: 'Commutativa, Distributiva e Associativa',
              trick: 'Spacca il numero a metà: 7×12 = 70 + 14!',
              icon: MulIcon,
              bg: 'from-purple-500/10 to-pink-500/5',
              border: 'border-purple-200',
              iconBg: 'bg-purple-500 text-white',
              opId: 'moltiplicazione'
            },
            {
              title: 'Divisione (÷)',
              desc: 'Invariantiva e Distributiva a destra',
              trick: 'Togli gli zeri finali dividendo per 10!',
              icon: Divide,
              bg: 'from-emerald-500/10 to-teal-500/5',
              border: 'border-emerald-200',
              iconBg: 'bg-emerald-500 text-white',
              opId: 'divisione'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  soundManager.playPop();
                  onNavigate('imparo', item.opId);
                }}
                className={`bg-white rounded-3xl p-5 border ${item.border} shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-2xl ${item.iconBg} flex items-center justify-center font-black mb-3 shadow-sm`}>
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Trucco Rapido</span>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">"{item.trick}"</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress & Companion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Trophies & Level Teaser Card */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-1">
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Sala dei Trofei</span>
            <h4 className="text-base font-bold text-slate-900">
              Livello {userLevel} · {stars} Stelle Collezionate
            </h4>
            <p className="text-xs text-slate-600">
              Sblocca tutti i 12 badge digitali padroneggiando le proprietà delle operazioni e gioca con i compagni!
            </p>
            <button
              onClick={() => {
                soundManager.playPop();
                onNavigate('trofei');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 pt-1"
            >
              <span>Vedi i tuoi trofei</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Customizer Avatar Teaser Card */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <AvatarRenderer config={avatarConfig} size={64} showShadow={false} />
            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Il Tuo Compagno</span>
              <h4 className="text-base font-bold text-slate-900">{avatarConfig.nickname}</h4>
              <p className="text-xs text-slate-600 mt-0.5">Livello {userLevel} · {xp} XP totali</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onOpenCustomizer();
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            Personalizza
          </button>
        </div>

      </div>

    </div>
  );
};
