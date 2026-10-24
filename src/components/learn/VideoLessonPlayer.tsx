import React, { useState, useEffect, useRef } from 'react';
import { VideoLesson } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ChevronRight, ChevronLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface VideoLessonPlayerProps {
  lesson: VideoLesson;
  onComplete?: () => void;
  onOpenSandbox?: () => void;
}

export const VideoLessonPlayer: React.FC<VideoLessonPlayerProps> = ({
  lesson,
  onComplete,
  onOpenSandbox
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const step = lesson.steps[currentStepIndex] || lesson.steps[0];
  const totalSteps = lesson.steps.length;
  const isFinished = currentStepIndex === totalSteps - 1;

  // Speak speech on step change if playing and not muted
  useEffect(() => {
    if (isPlaying && !isMuted) {
      soundManager.speakItalian(step.speech);
    }
  }, [currentStepIndex, isPlaying, isMuted, step.speech]);

  // Handle auto-advance when playing
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = 6500; // ~6.5 seconds per step
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < totalSteps - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          soundManager.playCorrect();
          if (onComplete) onComplete();
        }
      }, stepDuration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, totalSteps, onComplete]);

  const togglePlay = () => {
    soundManager.playPop();
    if (!isPlaying) {
      setIsPlaying(true);
      if (!isMuted) soundManager.speakItalian(step.speech);
    } else {
      setIsPlaying(false);
      soundManager.stopSpeech();
    }
  };

  const handleRestart = () => {
    soundManager.playPop();
    soundManager.stopSpeech();
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  const handleNext = () => {
    soundManager.playPop();
    soundManager.stopSpeech();
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    soundManager.playPop();
    soundManager.stopSpeech();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 text-white flex flex-col">
      {/* Top Video Header */}
      <div className="px-6 py-4 bg-slate-950/80 flex items-center justify-between border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">Videolezione Animata</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">{lesson.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsMuted(prev => !prev);
              if (!isMuted) soundManager.stopSpeech();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title={isMuted ? 'Attiva voce' : 'Disattiva voce'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Main Animated Canvas Stage */}
      <div className="relative w-full aspect-video min-h-[300px] md:min-h-[380px] bg-gradient-to-b from-slate-900 via-indigo-950/60 to-slate-900 flex flex-col items-center justify-center p-6 select-none overflow-hidden">
        
        {/* Animated Background Grid / Constellation effect */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#F59E0B 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>

        {/* Dynamic Concept Visualizer */}
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
          
          {/* Step Pill */}
          <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Passo {currentStepIndex + 1} di {totalSteps}: {step.title}</span>
          </div>

          {/* Visual Transformation Box */}
          <div className="w-full bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 shadow-2xl flex flex-col items-center justify-center min-h-[170px]">
            
            {/* Visual Action Renderings */}
            {step.visualAction === 'swap' && (
              <div className="flex items-center gap-4 text-3xl md:text-4xl font-black">
                <div className="p-3 bg-amber-500/20 text-amber-300 border-2 border-amber-400 rounded-2xl transition-all duration-700 transform translate-x-1 animate-bounce-subtle">
                  {step.leftValue}
                </div>
                <span className="text-2xl text-slate-400">{step.middleOp}</span>
                <div className="p-3 bg-sky-500/20 text-sky-300 border-2 border-sky-400 rounded-2xl transition-all duration-700 transform -translate-x-1 animate-bounce-subtle">
                  {step.rightValue}
                </div>
                <span className="text-2xl text-slate-400">=</span>
                <div className="p-3 bg-emerald-500/20 text-emerald-300 border-2 border-emerald-400 rounded-2xl">
                  {step.result}
                </div>
              </div>
            )}

            {step.visualAction === 'balance' && (
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-black">
                  <div className="px-4 py-2 bg-indigo-600/30 text-indigo-200 border border-indigo-400 rounded-xl">
                    {step.leftValue}
                  </div>
                  <span className="text-slate-400 font-bold">{step.middleOp}</span>
                  <div className="px-4 py-2 bg-indigo-600/30 text-indigo-200 border border-indigo-400 rounded-xl">
                    {step.rightValue}
                  </div>
                  {step.result !== '?' && (
                    <>
                      <span className="text-slate-400 font-bold">=</span>
                      <div className="px-4 py-2 bg-emerald-600/30 text-emerald-300 border border-emerald-400 rounded-xl">
                        {step.result}
                      </div>
                    </>
                  )}
                </div>
                {/* Scales SVG icon */}
                <div className="text-amber-400 text-xs font-semibold flex items-center gap-1.5 mt-1">
                  ⚖️ Entrambi i piatti restano perfettamente bilanciati!
                </div>
              </div>
            )}

            {step.visualAction === 'slice' && (
              <div className="flex items-center gap-4 text-2xl md:text-3xl font-black">
                <div className="px-4 py-2 bg-purple-600/30 text-purple-300 border border-purple-400 rounded-xl">
                  {step.leftValue}
                </div>
                <span className="text-slate-400">{step.middleOp}</span>
                <div className="px-4 py-2 bg-pink-600/30 text-pink-300 border border-pink-400 rounded-xl">
                  {step.rightValue}
                </div>
              </div>
            )}

            {step.visualAction === 'bracket' && (
              <div className="flex items-center gap-3 text-2xl md:text-3xl font-black">
                <span className="text-amber-400 text-3xl font-serif">(</span>
                <div className="px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-400 rounded-lg">
                  {step.leftValue}
                </div>
                <span className="text-amber-400 text-3xl font-serif">)</span>
                <span className="text-slate-400">{step.middleOp}</span>
                <div className="px-3 py-1.5 bg-sky-500/20 text-sky-300 border border-sky-400 rounded-lg">
                  {step.rightValue}
                </div>
              </div>
            )}

            {(step.visualAction === 'intro' || step.visualAction === 'summary') && (
              <div className="flex flex-col items-center text-center gap-2">
                <div className="text-2xl md:text-4xl font-extrabold text-amber-300 tracking-wide font-mono-numbers">
                  {step.leftValue} {step.middleOp} {step.rightValue} = {step.result}
                </div>
                <p className="text-xs text-slate-300 max-w-sm mt-1">{step.explanation}</p>
              </div>
            )}

            {/* Glowing bottom highlight banner */}
            <div className="mt-4 text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-4 py-1.5 rounded-full flex items-center gap-1.5">
              <span>💡</span>
              <span>{step.highlight}</span>
            </div>
          </div>
        </div>

        {/* Voiceover Speech Transcript Subtitle Box */}
        <div className="absolute bottom-4 left-6 right-6 bg-slate-950/90 backdrop-blur-md rounded-2xl p-4 border border-slate-800 text-center">
          <p className="text-sm font-medium text-slate-200">
            "{step.speech}"
          </p>
        </div>
      </div>

      {/* Video Progress Scrubber */}
      <div className="w-full bg-slate-800 h-2 cursor-pointer flex">
        {lesson.steps.map((_, idx) => (
          <div
            key={idx}
            onClick={() => {
              soundManager.playPop();
              setCurrentStepIndex(idx);
            }}
            className={`flex-1 h-full border-r border-slate-900 transition-colors ${
              idx < currentStepIndex
                ? 'bg-amber-500'
                : idx === currentStepIndex
                ? 'bg-amber-400 animate-pulse'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          />
        ))}
      </div>

      {/* Video Player Controls Deck */}
      <div className="px-6 py-4 bg-slate-950 flex flex-wrap items-center justify-between gap-4">
        {/* Playback Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pausa</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{isFinished ? 'Rivedi' : 'Guarda Video'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleRestart}
            className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            title="Ricomincia da capo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 border-l border-slate-800 pl-3">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none rounded-lg hover:bg-slate-800"
              title="Passo precedente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === totalSteps - 1}
              className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none rounded-lg hover:bg-slate-800"
              title="Passo successivo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step indicator and Sandbox button */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono-numbers">
            {currentStepIndex + 1} / {totalSteps}
          </span>
          {onOpenSandbox && (
            <button
              onClick={() => {
                soundManager.playPop();
                onOpenSandbox();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Prova nel Laboratorio</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
