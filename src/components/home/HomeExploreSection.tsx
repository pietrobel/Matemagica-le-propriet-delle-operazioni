import React from 'react';
import { AvatarConfig, DailyMission, MainTab } from '../../types/math';
import { AvatarRenderer } from '../avatar/AvatarRenderer';
import { DailyMissionsWidget } from './DailyMissionsWidget';
import { QuickQuizWidget } from './QuickQuizWidget';
import { soundManager } from '../../utils/audio';
import { 
  Sparkles, 
  BookOpen, 
  Video, 
  Dumbbell, 
  Gamepad2, 
  FileCheck2, 
  FileText, 
  Zap, 
  Clock, 
  ArrowRight, 
  FlaskConical, 
  ExternalLink,
  Trophy,
  CheckCircle2,
  Play
} from 'lucide-react';

interface HomeExploreSectionProps {
  avatarConfig: AvatarConfig;
  userLevel: number;
  xp: number;
  stars: number;
  onNavigate: (tab: MainTab, filter?: string) => void;
  onOpenCustomizer: () => void;
  missions: DailyMission[];
  onClaimMissionReward: (missionId: string) => void;
  onResetMissions: () => void;
  onQuizCorrectAnswer?: () => void;
  onAwardXp: (amount: number) => void;
}

export const HomeExploreSection: React.FC<HomeExploreSectionProps> = ({
  avatarConfig,
  userLevel,
  xp,
  stars,
  onNavigate,
  onOpenCustomizer,
  missions,
  onClaimMissionReward,
  onResetMissions,
  onQuizCorrectAnswer,
  onAwardXp
}) => {
  // The 6 main curriculum pillars + Neutri section
  const curriculumSections: {
    id: MainTab;
    stepNumber: number;
    title: string;
    subtitle: string;
    description: string;
    estimatedTime: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    tagColor: string;
    ctaLabel: string;
  }[] = [
    {
      id: 'imparo',
      stepNumber: 1,
      title: '1. IMPARO',
      subtitle: 'Libro di Testo Interattivo',
      description: '5 capitoli approfonditi su Addizione, Moltiplicazione, Sottrazione, Divisione ed Elementi Neutri. Esempi svolti e mini-esercizi di comprensione.',
      estimatedTime: '15-20 min',
      icon: BookOpen,
      color: 'from-amber-500 to-orange-500',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
      ctaLabel: 'Apri il Libro di Testo'
    },
    {
      id: 'guardo',
      stepNumber: 2,
      title: '2. GUARDO',
      subtitle: 'Videolezioni Animate',
      description: 'Animazioni visive che mostrano gli scambi fisici, le bilance dell\'invariantiva e lo spacca-numeri della distributiva con audio e spiegazioni.',
      estimatedTime: '10 min',
      icon: Video,
      color: 'from-sky-500 to-blue-600',
      tagColor: 'bg-sky-100 text-sky-800 border-sky-300',
      ctaLabel: 'Guarda i Video'
    },
    {
      id: 'esercito',
      stepNumber: 3,
      title: '3. MI ESERCITO',
      subtitle: 'Palestra >100 Esercizi',
      description: 'Esercizi guidati su 3 livelli di difficoltà e 9 tipologie: calcolo mentale, trova l\'errore, completa la formula, problemi di realtà e spiegazioni ricche.',
      estimatedTime: '25-30 min',
      icon: Dumbbell,
      color: 'from-orange-500 to-amber-600',
      tagColor: 'bg-orange-100 text-orange-800 border-orange-300',
      ctaLabel: 'Inizia ad Esercitarti'
    },
    {
      id: 'gioco',
      stepNumber: 4,
      title: '4. GIOCO',
      subtitle: '6 Giochi Didattici Interattivi',
      description: 'Laboratorio dei Numeri, Caccia all\'Errore, Abbina le Proprietà, Calcolo Mentale a Tempo, Escape Room a 5 stanze e Torneo delle Proprietà!',
      estimatedTime: '20-25 min',
      icon: Gamepad2,
      color: 'from-purple-600 to-pink-600',
      tagColor: 'bg-purple-100 text-purple-800 border-purple-300',
      ctaLabel: 'Entra nell\'Arena Giochi'
    },
    {
      id: 'prova',
      stepNumber: 5,
      title: '5. MI METTO ALLA PROVA',
      subtitle: 'Verifica Ufficiale 30 Domande',
      description: 'Verifica completa con voto in decimi, argomenti forti e da ripassare, spiegazioni dettagliate e possibilità di ripetere il quiz con 30 nuove domande!',
      estimatedTime: '10-15 min',
      icon: FileCheck2,
      color: 'from-emerald-600 to-teal-700',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      ctaLabel: 'Avvia la Verifica'
    },
    {
      id: 'ripasso',
      stepNumber: 6,
      title: '6. RIPASSO',
      subtitle: 'Schemi e Registro Errori',
      description: 'Mappe concettuali ad albero, formulario d\'oro delle regole algebriche e archivio degli errori personali per colmare qualsiasi dubbio prima del compito.',
      estimatedTime: '10 min',
      icon: FileText,
      color: 'from-teal-600 to-cyan-700',
      tagColor: 'bg-teal-100 text-teal-800 border-teal-300',
      ctaLabel: 'Consulta gli Schemi'
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Hero Welcome Section */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFFFFF 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-amber-100 border border-white/25">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Avventura per Giovani Matematici · Scuola Secondaria di 1° Grado</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-display text-balance">
              Benvenuto a Matemagica: Il Regno delle Proprietà!
            </h1>

            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed max-w-xl">
              Un vero ambiente di apprendimento completo: dalla teoria spiegata come in un libro di testo scolastico alle videolezioni, da oltre 100 esercizi guidati a 6 giochi interattivi, fino alla verifica finale con valutazione in decimi.
            </p>

            {/* Estimated Total Duration Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/25 backdrop-blur-md rounded-2xl border border-white/25 text-xs font-bold text-amber-200">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Percorso Completo Consigliato: 60 - 90 Minuti Complessivi</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  soundManager.playPop();
                  onNavigate('imparo');
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-amber-50 text-slate-900 font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>1. Inizia dalla Teoria (Libro)</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playPop();
                  onNavigate('esercito');
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-black/30 hover:bg-black/40 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/30 backdrop-blur-md transition-all active:scale-95"
              >
                <Dumbbell className="w-4 h-4 text-amber-300" />
                <span>3. Vai agli Esercizi</span>
              </button>
            </div>
          </div>

          {/* Right Companion Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 group bg-amber-600/30">
              <img
                src="/src/assets/images/hero_math_adventure_1792238943381.jpg"
                alt="Matemagica paesaggio avventuroso per giovani matematici"
                referrerPolicy="no-referrer"
                className="w-full aspect-16/10 object-cover transform group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-amber-200 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <AvatarRenderer config={avatarConfig} size={42} showShadow={false} />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {avatarConfig.nickname} (Livello {userLevel})
                    </p>
                    <p className="text-[11px] text-amber-700 font-medium truncate">
                      "Oggi quale proprietà scopriremo insieme?"
                    </p>
                  </div>
                </div>
                <button
                  onClick={onOpenCustomizer}
                  className="px-2.5 py-1 text-[10px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors shrink-0"
                >
                  Modifica
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* External ScienzaLab Portal Callout Card */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 border-2 border-teal-300 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shrink-0">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-teal-800 bg-teal-200/80 px-2.5 py-0.5 rounded-full">
                Laboratorio Scientifico Online
              </span>
              <span className="text-xs font-bold text-slate-500">scienzalab.vercel.app</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              Esplora ScienzaLab: Esperimenti e Simulatori Didattici
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Scopri altri esperimenti interattivi, laboratori di scienze, chimica, fisica e modelli 3D realizzati per la scuola secondaria di primo grado!
            </p>
          </div>
        </div>

        <a
          href="https://scienzalab.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0"
        >
          <span>Apri ScienzaLab ↗</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* The 6 Sections Grid (Official Structure) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-3">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Struttura del Percorso Didattico</span>
            <h2 className="text-2xl font-black text-slate-900 mt-0.5">
              Le 6 Sezioni di Apprendimento (60-90 Minuti)
            </h2>
          </div>
          <p className="text-xs text-slate-500">Puoi svolgere le sezioni nell'ordine consigliato o accedere direttamente a piacere.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculumSections.map(sec => {
            const Icon = sec.icon;

            return (
              <div
                key={sec.id}
                className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${sec.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${sec.tagColor}`}>
                          Fase {sec.stepNumber}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-1">
                          {sec.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-xl">
                      {sec.estimatedTime}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-amber-800">
                    {sec.subtitle}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sec.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Consigliato {sec.stepNumber}°
                  </span>
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      onNavigate(sec.id);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{sec.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Autonomous Section: Elementi Neutri ed Assorbenti (Special Callout) */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-teal-100 border border-white/25">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span>Sezione Autonoma e Dedicata</span>
          </div>
          <h3 className="text-2xl font-black">Elementi Neutri ed Elementi Assorbenti</h3>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Approfondisci in modo separato il comportamento dello zero e dell'uno nell'addizione, moltiplicazione e divisione. Include 22 esercizi mirati e la dimostrazione dell'impossibilità di dividere per zero.
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playPop();
            onNavigate('neutri');
          }}
          className="px-6 py-3.5 bg-white hover:bg-teal-50 text-slate-900 font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0"
        >
          <span>Apri la Sezione Neutri & Assorbenti</span>
          <ArrowRight className="w-4 h-4 text-teal-600" />
        </button>
      </div>

      {/* Daily Missions Widget */}
      <DailyMissionsWidget
        missions={missions}
        onClaimReward={onClaimMissionReward}
        onNavigateTab={(tab: any, filter?: string) => onNavigate(tab as MainTab, filter)}
        onOpenCustomizer={onOpenCustomizer}
        onResetMissions={onResetMissions}
      />

      {/* Quick Quiz Warmup Widget */}
      <QuickQuizWidget
        avatarConfig={avatarConfig}
        onAwardXp={onAwardXp}
        onGoToGames={() => onNavigate('gioco')}
        onQuizAnsweredCorrectly={onQuizCorrectAnswer}
      />

    </div>
  );
};
