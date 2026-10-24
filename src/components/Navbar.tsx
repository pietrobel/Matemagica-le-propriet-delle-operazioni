import React from 'react';
import { AvatarConfig } from '../types/math';
import { AvatarRenderer } from './avatar/AvatarRenderer';
import { soundManager } from '../utils/audio';
import { Sparkles, Volume2, VolumeX, Palette } from 'lucide-react';

interface NavbarProps {
  currentTab: 'esplora' | 'imparo' | 'minigiochi' | 'trofei' | 'classifica';
  onSelectTab: (tab: 'esplora' | 'imparo' | 'minigiochi' | 'trofei' | 'classifica') => void;
  avatarConfig: AvatarConfig;
  userLevel: number;
  xp: number;
  onOpenCustomizer: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  avatarConfig,
  userLevel,
  xp,
  onOpenCustomizer,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Text Element Wordmark */}
        <button
          onClick={() => {
            soundManager.playPop();
            onSelectTab('esplora');
          }}
          className="text-xl md:text-2xl font-black tracking-tight text-amber-600 hover:text-amber-700 transition-colors whitespace-nowrap shrink-0 text-left font-display"
        >
          Matemagica
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links with subtle hover state */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
          <button
            onClick={() => { soundManager.playPop(); onSelectTab('esplora'); }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentTab === 'esplora'
                ? 'text-amber-700 border-amber-500 font-bold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Esplora
          </button>
          
          <button
            onClick={() => { soundManager.playPop(); onSelectTab('imparo'); }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentTab === 'imparo'
                ? 'text-amber-700 border-amber-500 font-bold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Imparo & Video
          </button>

          <button
            onClick={() => { soundManager.playPop(); onSelectTab('minigiochi'); }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentTab === 'minigiochi'
                ? 'text-amber-700 border-amber-500 font-bold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Minigiochi
          </button>

          <button
            onClick={() => { soundManager.playPop(); onSelectTab('trofei'); }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentTab === 'trofei'
                ? 'text-amber-700 border-amber-500 font-bold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Trofei & Livelli
          </button>

          <button
            onClick={() => { soundManager.playPop(); onSelectTab('classifica'); }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
              currentTab === 'classifica'
                ? 'text-amber-700 border-amber-500 font-bold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Classifica
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Companion Profile & Customizer Trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              soundManager.playPop();
              onToggleSound();
            }}
            className="p-2 text-slate-400 hover:text-amber-600 rounded-xl hover:bg-amber-50 transition-colors"
            title={soundEnabled ? 'Disattiva suoni' : 'Attiva suoni'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-amber-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Primary Action Button: Companion Avatar Studio */}
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenCustomizer();
            }}
            className="flex items-center gap-2.5 px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-2xl transition-all shadow-xs active:scale-95"
            title="Personalizza il tuo Avatar Compagno"
          >
            <AvatarRenderer config={avatarConfig} size={36} showShadow={false} />
            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900 truncate max-w-[90px]">
                  {avatarConfig.nickname}
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-md font-bold">
                  Lv {userLevel}
                </span>
              </div>
              <span className="text-[10px] text-amber-700 font-semibold block">
                Modifica Avatar
              </span>
            </div>
            <Palette className="w-4 h-4 text-amber-600 shrink-0 ml-0.5" />
          </button>
        </div>

      </div>

      {/* Mobile Secondary Navigation Row (clean single line) */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-amber-100 bg-amber-50/70 overflow-x-auto text-xs font-bold text-slate-700">
        <button
          onClick={() => { soundManager.playPop(); onSelectTab('esplora'); }}
          className={`px-2.5 py-1 rounded-lg ${currentTab === 'esplora' ? 'bg-amber-500 text-white' : ''}`}
        >
          Esplora
        </button>
        <button
          onClick={() => { soundManager.playPop(); onSelectTab('imparo'); }}
          className={`px-2.5 py-1 rounded-lg ${currentTab === 'imparo' ? 'bg-amber-500 text-white' : ''}`}
        >
          Imparo & Video
        </button>
        <button
          onClick={() => { soundManager.playPop(); onSelectTab('minigiochi'); }}
          className={`px-2.5 py-1 rounded-lg ${currentTab === 'minigiochi' ? 'bg-amber-500 text-white' : ''}`}
        >
          Minigiochi
        </button>
        <button
          onClick={() => { soundManager.playPop(); onSelectTab('trofei'); }}
          className={`px-2.5 py-1 rounded-lg ${currentTab === 'trofei' ? 'bg-amber-500 text-white' : ''}`}
        >
          Trofei
        </button>
        <button
          onClick={() => { soundManager.playPop(); onSelectTab('classifica'); }}
          className={`px-2.5 py-1 rounded-lg ${currentTab === 'classifica' ? 'bg-amber-500 text-white' : ''}`}
        >
          Classifica
        </button>
      </div>
    </header>
  );
};
