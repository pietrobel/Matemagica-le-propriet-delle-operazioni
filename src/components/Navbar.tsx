import React from 'react';
import { AvatarConfig, MainTab } from '../types/math';
import { AvatarRenderer } from './avatar/AvatarRenderer';
import { soundManager } from '../utils/audio';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Palette, 
  FlaskConical, 
  ExternalLink,
  BookOpen,
  Video,
  Dumbbell,
  Gamepad2,
  FileCheck2,
  FileText,
  Zap,
  Home,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { tab: MainTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { tab: 'home', label: 'Home', icon: Home },
    { tab: 'imparo', label: '1. Imparo', icon: BookOpen },
    { tab: 'guardo', label: '2. Guardo', icon: Video },
    { tab: 'esercito', label: '3. Mi Esercito', icon: Dumbbell },
    { tab: 'gioco', label: '4. Gioco', icon: Gamepad2 },
    { tab: 'prova', label: '5. Mi Metto alla Prova', icon: FileCheck2 },
    { tab: 'ripasso', label: '6. Ripasso', icon: FileText },
    { tab: 'neutri', label: 'Neutri & Assorbenti', icon: Zap }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Left: Brand Wordmark + External ScienzaLab Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              soundManager.playPop();
              onSelectTab('home');
            }}
            className="text-xl sm:text-2xl font-black tracking-tight text-amber-600 hover:text-amber-700 transition-colors whitespace-nowrap text-left font-display flex items-center gap-1.5"
          >
            <span>Matemagica</span>
          </button>

          {/* User Requested: Pulsante che invii a scienzalab.vercel.app */}
          <a
            href="https://scienzalab.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 rounded-xl text-[11px] font-bold transition-all shadow-2xs hover:scale-102"
            title="Apri ScienzaLab in una nuova scheda"
          >
            <FlaskConical className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">ScienzaLab</span>
            <ExternalLink className="w-3 h-3 text-teal-500" />
          </a>
        </div>

        {/* Center: Navigation Links Desktop */}
        <nav className="hidden xl:flex items-center gap-4 text-xs font-bold text-slate-600 overflow-x-auto">
          {navItems.map(item => {
            const isSelected = currentTab === item.tab;
            const Icon = item.icon;
            return (
              <button
                key={item.tab}
                onClick={() => {
                  soundManager.playPop();
                  onSelectTab(item.tab);
                }}
                className={`whitespace-nowrap shrink-0 transition-all px-2 py-1.5 rounded-xl flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-100 text-amber-900 font-extrabold shadow-2xs'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Sound, Avatar Profile, Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              soundManager.playPop();
              onToggleSound();
            }}
            className="p-2 text-slate-400 hover:text-amber-600 rounded-xl hover:bg-amber-50 transition-colors"
            title={soundEnabled ? 'Disattiva suoni' : 'Attiva suoni'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Avatar Profile Button */}
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenCustomizer();
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-2xl transition-all shadow-2xs active:scale-95"
            title="Personalizza il tuo Avatar Compagno"
          >
            <AvatarRenderer config={avatarConfig} size={32} showShadow={false} />
            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900 truncate max-w-[80px]">
                  {avatarConfig.nickname}
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1 py-0.2 rounded font-bold">
                  Lv {userLevel}
                </span>
              </div>
            </div>
            <Palette className="w-3.5 h-3.5 text-amber-600 shrink-0 ml-0.5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer / Secondary Row */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-amber-100 p-4 space-y-2 animate-fade-in shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map(item => {
              const isSelected = currentTab === item.tab;
              const Icon = item.icon;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    soundManager.playPop();
                    onSelectTab(item.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <a
              href="https://scienzalab.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-teal-700 flex items-center gap-1.5"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Visita scienzalab.vercel.app ↗</span>
            </a>
          </div>
        </div>
      )}

      {/* Desktop secondary quick bar for smaller screens */}
      <div className="hidden md:flex xl:hidden items-center gap-2 px-4 py-2 border-t border-amber-100 bg-amber-50/50 overflow-x-auto text-xs font-bold text-slate-700">
        {navItems.map(item => (
          <button
            key={item.tab}
            onClick={() => {
              soundManager.playPop();
              onSelectTab(item.tab);
            }}
            className={`px-3 py-1 rounded-lg shrink-0 whitespace-nowrap ${
              currentTab === item.tab ? 'bg-amber-500 text-white' : 'hover:bg-amber-100/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
