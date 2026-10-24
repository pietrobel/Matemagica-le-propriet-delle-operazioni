import React, { useState } from 'react';
import { OperationType, PropertyRule, VideoLesson } from '../../types/math';
import { PROPERTY_RULES, VIDEO_LESSONS } from '../../data/mathRules';
import { VideoLessonPlayer } from './VideoLessonPlayer';
import { MathSandbox } from './MathSandbox';
import { soundManager } from '../../utils/audio';
import { 
  Plus, 
  Minus, 
  X as MulIcon, 
  Divide, 
  Play, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Lightbulb, 
  ArrowRight 
} from 'lucide-react';

interface LearnSectionProps {
  onCompleteLesson?: (lessonId: string) => void;
  onOpenGame?: (gameId: string) => void;
  initialOperation?: OperationType;
  initialTab?: 'rules' | 'sandbox';
  onExploreOperation?: (operation: OperationType) => void;
}

export const LearnSection: React.FC<LearnSectionProps> = ({
  onCompleteLesson,
  onOpenGame,
  initialOperation = 'addizione',
  initialTab = 'rules',
  onExploreOperation
}) => {
  const [selectedOperation, setSelectedOperation] = useState<OperationType>(initialOperation);
  const [activeVideoLesson, setActiveVideoLesson] = useState<VideoLesson | null>(null);
  const [activeTab, setActiveTab] = useState<'rules' | 'sandbox'>(initialTab);

  // Sync initialOperation if changed
  React.useEffect(() => {
    if (initialOperation) {
      setSelectedOperation(initialOperation);
    }
  }, [initialOperation]);

  const filteredRules = PROPERTY_RULES.filter(r => r.operation === selectedOperation);

  const getOpIcon = (op: OperationType) => {
    switch (op) {
      case 'addizione': return Plus;
      case 'sottrazione': return Minus;
      case 'moltiplicazione': return MulIcon;
      case 'divisione': return Divide;
    }
  };

  const getOpColor = (op: OperationType) => {
    switch (op) {
      case 'addizione': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'sottrazione': return 'text-sky-600 bg-sky-50 border-sky-200';
      case 'moltiplicazione': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'divisione': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Section Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Palestra della Conoscenza</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
            Impara le Proprietà delle 4 Operazioni
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Scopri i trucchi segreti che trasformano calcoli noiosi e difficili in scorciatoie velocissime e divertenti!
          </p>
        </div>

        {/* Rules vs Sandbox Sub-Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-amber-100/60 rounded-2xl border border-amber-200 self-start md:self-auto">
          <button
            onClick={() => { soundManager.playPop(); setActiveTab('rules'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'rules'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-amber-900/80 hover:bg-white/40'
            }`}
          >
            Regole & Video
          </button>
          <button
            onClick={() => { soundManager.playPop(); setActiveTab('sandbox'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'sandbox'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-amber-900/80 hover:bg-white/40'
            }`}
          >
            Laboratorio Interattivo
          </button>
        </div>
      </div>

      {/* Featured Video Lessons Carousel Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Videolezioni Animate</span>
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Guarda i numeri prendere vita con animazioni interattive!
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Scopri come scambiare i numeri, bilanciare le sottrazioni e spaccare le moltiplicazioni attraverso video narrati passo dopo passo.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {VIDEO_LESSONS.map(video => (
                <button
                  key={video.id}
                  onClick={() => {
                    soundManager.playPop();
                    setActiveVideoLesson(video);
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-800/90 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xl text-xs font-bold border border-slate-700 transition-all active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{video.title.split('(')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full lg:w-72 aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg shrink-0">
            <img 
              src="/src/assets/images/video_thumbnail_commutativa_1792238943745.jpg" 
              alt="Anteprima videolezione matematica"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
              <button
                onClick={() => {
                  soundManager.playPop();
                  setActiveVideoLesson(VIDEO_LESSONS[0]);
                }}
                className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95"
                aria-label="Avvia video principale"
              >
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Video Player Modal or Inline */}
      {activeVideoLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto">
            <div className="flex justify-end pb-2">
              <button
                onClick={() => {
                  soundManager.stopSpeech();
                  setActiveVideoLesson(null);
                }}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold backdrop-blur-xs"
              >
                Chiudi Video ✕
              </button>
            </div>
            <VideoLessonPlayer
              lesson={activeVideoLesson}
              onComplete={() => {
                if (onCompleteLesson) onCompleteLesson(activeVideoLesson.id);
              }}
              onOpenSandbox={() => {
                setActiveVideoLesson(null);
                setActiveTab('sandbox');
              }}
            />
          </div>
        </div>
      )}

      {/* Main Tab 1: Rules & Properties */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          {/* Operations 4-way Segmented Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'addizione', label: 'Addizione (+)', desc: 'Unire e sommare', icon: Plus },
              { id: 'sottrazione', label: 'Sottrazione (-)', desc: 'Togliere e confrontare', icon: Minus },
              { id: 'moltiplicazione', label: 'Moltiplicazione (×)', desc: 'Ripetere e ampliare', icon: MulIcon },
              { id: 'divisione', label: 'Divisione (÷)', desc: 'Distribuire e ripartire', icon: Divide }
            ].map(op => {
              const Icon = op.icon;
              const isSelected = selectedOperation === op.id;
              return (
                <button
                  key={op.id}
                  onClick={() => {
                    soundManager.playPop();
                    const newOp = op.id as OperationType;
                    setSelectedOperation(newOp);
                    onExploreOperation?.(newOp);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-white shadow-md ring-2 ring-amber-200'
                      : 'border-amber-100 bg-white/70 hover:bg-white hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${getOpColor(op.id as OperationType)}`}>
                      <Icon className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{op.label}</p>
                      <p className="text-[11px] text-slate-500">{op.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Properties Rule Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredRules.map(rule => {
              const video = VIDEO_LESSONS.find(v => v.id === rule.videoLessonId);

              return (
                <div
                  key={rule.id}
                  className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                          {rule.ruleTitle}
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                          {rule.name}
                        </h4>
                      </div>
                      
                      {/* Read aloud button */}
                      <button
                        onClick={() => {
                          soundManager.playPop();
                          soundManager.speakItalian(`${rule.name}: ${rule.description}. Esempio: ${rule.example}. Trucco mentale: ${rule.mentalTrick}`);
                        }}
                        className="p-2 text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors shrink-0"
                        title="Ascolta la regola"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Rule Description */}
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                      {rule.description}
                    </p>

                    {/* Formula Highlight */}
                    <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 font-mono-numbers text-center text-sm md:text-base font-extrabold text-amber-950">
                      {rule.formula}
                    </div>

                    {/* Example */}
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="font-bold text-slate-900 shrink-0">Esempio:</span>
                      <span className="font-mono-numbers">{rule.example}</span>
                    </div>

                    {/* Mental Trick Callout */}
                    <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-200 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-orange-950 font-medium">
                        <strong className="text-orange-900">Trucco del Compagno: </strong>
                        {rule.mentalTrick}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {video ? (
                      <button
                        onClick={() => {
                          soundManager.playPop();
                          setActiveVideoLesson(video);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Guarda Videolezione</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">Regola fondamentale</span>
                    )}

                    <button
                      onClick={() => {
                        soundManager.playPop();
                        setActiveTab('sandbox');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900"
                    >
                      <span>Sperimenta</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Tab 2: Interactive Sandbox */}
      {activeTab === 'sandbox' && (
        <MathSandbox 
          initialMode="commutativa"
          onCelebrate={() => soundManager.playPop()}
        />
      )}
    </div>
  );
};
