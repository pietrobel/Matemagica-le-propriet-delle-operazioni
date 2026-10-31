import React from 'react';
import { AvatarConfig, MainTab } from '../../types/math';
import { AvatarRenderer } from '../avatar/AvatarRenderer';
import { soundManager } from '../../utils/audio';
import { Trophy, RotateCcw, ArrowRight, Home, BookOpen, Sparkles } from 'lucide-react';

interface ActivityCompletionModalProps {
  isOpen: boolean;
  title: string;
  subtitle: string;
  score?: number;
  maxScore?: number;
  xpEarned: number;
  starsEarned?: number;
  avatarConfig: AvatarConfig;
  onGoHome: () => void;
  onRetry: () => void;
  onNextActivity: () => void;
  onGoToTheory: () => void;
  nextActivityLabel?: string;
}

export const ActivityCompletionModal: React.FC<ActivityCompletionModalProps> = ({
  isOpen,
  title,
  subtitle,
  score,
  maxScore,
  xpEarned,
  starsEarned = 1,
  avatarConfig,
  onGoHome,
  onRetry,
  onNextActivity,
  onGoToTheory,
  nextActivityLabel = 'Prossima Attività'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 text-center relative overflow-hidden">
        
        {/* Confetti decoration banner */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400" />

        {/* Companion celebratory avatar */}
        <div className="flex justify-center -mt-2 mb-3">
          <AvatarRenderer config={avatarConfig} size={90} isCelebrating={true} showShadow={false} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Attività Completata!</span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
          {subtitle}
        </p>

        {/* Score & Rewards Box */}
        <div className="my-5 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-around">
          {typeof score === 'number' && typeof maxScore === 'number' && (
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase">Punteggio</p>
              <p className="text-xl font-black text-amber-700">{score} / {maxScore}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Esperienza</p>
            <p className="text-xl font-black text-orange-600">+{xpEarned} XP</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Stelle</p>
            <p className="text-xl font-black text-amber-500">+{starsEarned} ★</p>
          </div>
        </div>

        {/* The 4 user-requested navigation buttons */}
        <div className="space-y-2.5 pt-2">
          {/* 1. Prossima Attività (Primary CTA) */}
          <button
            onClick={() => {
              soundManager.playPop();
              onNextActivity();
            }}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{nextActivityLabel}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* 2. Ripeti l'attività */}
            <button
              onClick={() => {
                soundManager.playPop();
                onRetry();
              }}
              className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
              <span>Ripeti l'attività</span>
            </button>

            {/* 3. Vai alla teoria */}
            <button
              onClick={() => {
                soundManager.playPop();
                onGoToTheory();
              }}
              className="py-2.5 px-3 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 font-bold text-xs rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-700" />
              <span>Vai alla teoria</span>
            </button>
          </div>

          {/* 4. Torna al menu principale */}
          <button
            onClick={() => {
              soundManager.playPop();
              onGoHome();
            }}
            className="w-full py-2.5 px-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5 text-slate-500" />
            <span>Torna al menu principale</span>
          </button>
        </div>

      </div>
    </div>
  );
};
