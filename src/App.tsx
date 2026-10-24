import React, { useState, useEffect } from 'react';
import { 
  AvatarConfig, 
  Badge, 
  GameScoreResult, 
  LeaderboardEntry,
  DailyMission,
  OperationType 
} from './types/math';
import { INITIAL_BADGES, INITIAL_LEADERBOARD, LEVEL_TITLES } from './data/mathRules';
import { generateDailyMissions } from './data/dailyMissionsData';
import { Navbar } from './components/Navbar';
import { HomeExploreSection } from './components/home/HomeExploreSection';
import { LearnSection } from './components/learn/LearnSection';
import { MinigamesHub } from './components/games/MinigamesHub';
import { TrophiesSection } from './components/trophies/TrophiesSection';
import { LeaderboardSection } from './components/leaderboard/LeaderboardSection';
import { AvatarCustomizerModal } from './components/avatar/AvatarCustomizerModal';
import { soundManager } from './utils/audio';
import { Sparkles } from 'lucide-react';

const STORAGE_KEY_AVATAR = 'matemagica_avatar_v1';
const STORAGE_KEY_STATS = 'matemagica_stats_v1';
const STORAGE_KEY_BADGES = 'matemagica_badges_v1';
const STORAGE_KEY_MISSIONS = 'matemagica_daily_missions_v2';
const STORAGE_KEY_MISSIONS_DATE = 'matemagica_daily_date_v2';

const DEFAULT_AVATAR: AvatarConfig = {
  archetype: 'fox',
  nickname: 'Volpina Astuta',
  primaryColor: '#F97316',
  hairStyle: 'spiky',
  hairColor: '#EA580C',
  outfit: 'hoodie',
  outfitColor: '#3B82F6',
  accessory: 'glasses',
  expression: 'happy'
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<'esplora' | 'imparo' | 'minigiochi' | 'trofei' | 'classifica'>('esplora');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [learnOpFilter, setLearnOpFilter] = useState<OperationType>('addizione');

  // Today's date string (YYYY-MM-DD)
  const todayDateStr = new Date().toISOString().slice(0, 10);

  // Avatar config with localStorage
  const [avatar, setAvatar] = useState<AvatarConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AVATAR);
      return saved ? JSON.parse(saved) : DEFAULT_AVATAR;
    } catch {
      return DEFAULT_AVATAR;
    }
  });

  // Progression stats
  const [xp, setXp] = useState(650);
  const [stars, setStars] = useState(14);
  const [level, setLevel] = useState(2);
  const [gameStats, setGameStats] = useState<{ [gameId: string]: { highscore: number; plays: number; stars: number } }>({
    swap_master: { highscore: 380, plays: 2, stars: 2 },
    invariant_balance: { highscore: 250, plays: 1, stars: 1 },
    distributive_split: { highscore: 0, plays: 0, stars: 0 },
    property_detective: { highscore: 0, plays: 0, stars: 0 }
  });

  // Badges
  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BADGES);
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  // Daily Missions with daily persistence
  const [dailyMissions, setDailyMissions] = useState<DailyMission[]>(() => {
    try {
      const savedDate = localStorage.getItem(STORAGE_KEY_MISSIONS_DATE);
      const savedMissions = localStorage.getItem(STORAGE_KEY_MISSIONS);
      if (savedDate === todayDateStr && savedMissions) {
        return JSON.parse(savedMissions);
      }
      const fresh = generateDailyMissions(todayDateStr);
      localStorage.setItem(STORAGE_KEY_MISSIONS_DATE, todayDateStr);
      localStorage.setItem(STORAGE_KEY_MISSIONS, JSON.stringify(fresh));
      return fresh;
    } catch {
      return generateDailyMissions(todayDateStr);
    }
  });

  // Toast notification for unlock / level up
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  // Sync sound settings
  useEffect(() => {
    soundManager.enabled = soundEnabled;
  }, [soundEnabled]);

  // Recalculate level based on XP
  useEffect(() => {
    const newLevel = Math.min(10, Math.floor(xp / 500) + 1);
    if (newLevel > level) {
      setLevel(newLevel);
      soundManager.playLevelUp();
      setToastMessage({
        title: `Nuovo Livello Raggiunto: Livello ${newLevel}!`,
        desc: `Complimenti! Ora sei "${LEVEL_TITLES[newLevel - 1]}"!`
      });
      setTimeout(() => setToastMessage(null), 5000);
    }
  }, [xp, level]);

  // Daily missions progress tracker
  const progressDailyMission = (category: 'learn' | 'game' | 'quiz' | 'avatar', amount = 1, filter?: string) => {
    setDailyMissions(prev => {
      let hasNewlyCompleted = false;
      let completedTitle = '';

      const updated = prev.map(mission => {
        if (mission.isCompleted) return mission;
        if (mission.category !== category) return mission;

        // If mission has specificFilter, check if matches
        if (mission.specificFilter && filter && mission.specificFilter !== filter) {
          return mission;
        }

        // Special check for score_50 mission: amount is the score achieved
        if (mission.templateId === 'mission_score_50') {
          if (amount < 50) return mission;
          const newCount = 50;
          hasNewlyCompleted = true;
          completedTitle = mission.title;
          return { ...mission, currentCount: newCount, isCompleted: true };
        }

        const newCount = Math.min(mission.targetCount, mission.currentCount + amount);
        const isNowCompleted = newCount >= mission.targetCount;
        if (isNowCompleted && !mission.isCompleted) {
          hasNewlyCompleted = true;
          completedTitle = mission.title;
        }
        return {
          ...mission,
          currentCount: newCount,
          isCompleted: isNowCompleted
        };
      });

      if (hasNewlyCompleted) {
        soundManager.playCorrect();
        setToastMessage({
          title: '🎯 Missione Giornaliera Completata!',
          desc: `Hai completato "${completedTitle}"! Vai nella Home a riscattare il premio!`
        });
        setTimeout(() => setToastMessage(null), 5000);
      }

      try {
        localStorage.setItem(STORAGE_KEY_MISSIONS, JSON.stringify(updated));
      } catch {}

      return updated;
    });
  };

  // Claim mission reward
  const handleClaimMissionReward = (missionId: string) => {
    setDailyMissions(prev => {
      const target = prev.find(m => m.id === missionId);
      if (!target || !target.isCompleted || target.isClaimed) return prev;

      const newXp = target.xpReward;
      const newStars = target.starReward;

      setXp(x => x + newXp);
      setStars(s => s + newStars);

      soundManager.playBadgeUnlock();

      const updated = prev.map(m => m.id === missionId ? { ...m, isClaimed: true } : m);
      
      // Check if all 3 are claimed
      const allClaimedNow = updated.every(m => m.isClaimed);
      if (allClaimedNow) {
        setTimeout(() => {
          setXp(x => x + 100);
          setStars(s => s + 3);
          soundManager.playLevelUp();
          setToastMessage({
            title: '🏆 SUPER TRAGUARDO GIORNALIERO!',
            desc: 'Tutte e 3 le missioni completate! Hai vinto +100 XP Extra e +3 Stelle!'
          });
          setTimeout(() => setToastMessage(null), 5000);
        }, 800);
      } else {
        setToastMessage({
          title: 'Premio Missione Riscattato! 🎁',
          desc: `+${newXp} XP e +${newStars} Stelle aggiunte al tuo compagno!`
        });
        setTimeout(() => setToastMessage(null), 4000);
      }

      try {
        localStorage.setItem(STORAGE_KEY_MISSIONS, JSON.stringify(updated));
      } catch {}

      return updated;
    });
  };

  // Reset daily missions (for testing or extra practice)
  const handleResetDailyMissions = () => {
    const fresh = generateDailyMissions(`${todayDateStr}_${Date.now()}`);
    setDailyMissions(fresh);
    try {
      localStorage.setItem(STORAGE_KEY_MISSIONS, JSON.stringify(fresh));
    } catch {}
    setToastMessage({
      title: 'Nuove Missioni Generate! 🎯',
      desc: 'Ecco 3 nuovi obiettivi freschi per allenare la mente!'
    });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Save avatar
  const handleSaveAvatar = (newConfig: AvatarConfig) => {
    setAvatar(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY_AVATAR, JSON.stringify(newConfig));
    } catch {}

    // Unlock stylist badge if not unlocked
    unlockBadge('badge_stylist');
    progressDailyMission('avatar', 1);

    setToastMessage({
      title: 'Compagno Aggiornato!',
      desc: `${newConfig.nickname} è pronto per nuove avventure matematiche!`
    });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const unlockBadge = (badgeId: string) => {
    setBadges(prev =>
      prev.map(b => {
        if (b.id === badgeId && b.progress < 100) {
          soundManager.playBadgeUnlock();
          setToastMessage({
            title: `Trofeo Sbloccato: ${b.title}!`,
            desc: b.description
          });
          setTimeout(() => setToastMessage(null), 5000);
          return { ...b, progress: 100, unlockedAt: 'Oggi' };
        }
        return b;
      })
    );
  };

  const handleRecordGameResult = (result: GameScoreResult) => {
    setXp(prev => prev + result.xpEarned);
    setStars(prev => prev + result.starsEarned);

    setGameStats(prev => {
      const current = prev[result.gameId] || { highscore: 0, plays: 0, stars: 0 };
      return {
        ...prev,
        [result.gameId]: {
          highscore: Math.max(current.highscore, result.score),
          plays: current.plays + 1,
          stars: Math.max(current.stars, result.starsEarned)
        }
      };
    });

    // Check unlocks based on game played
    if (result.gameId === 'swap_master') {
      unlockBadge('badge_first_swap');
    } else if (result.gameId === 'invariant_balance') {
      unlockBadge('badge_invariance_pro');
    } else if (result.gameId === 'distributive_split') {
      unlockBadge('badge_splitter_hero');
    }

    if (result.score >= 500) {
      unlockBadge('badge_streak_master');
    }

    // Progress daily missions
    progressDailyMission('game', result.score, 'score_50');
    progressDailyMission('game', 1, result.gameId);
    progressDailyMission('game', 1);
  };

  const handleCompleteLesson = (lessonId: string) => {
    setXp(prev => prev + 100);
    unlockBadge('badge_video_scholar');
    if (lessonId === 'video_associativa') {
      unlockBadge('badge_associative_star');
    }

    // Progress daily missions
    progressDailyMission('learn', 1, 'video');
    if (lessonId.includes('distributiva') || lessonId.includes('moltiplicazione')) {
      progressDailyMission('learn', 1, 'moltiplicazione');
    } else if (lessonId.includes('commutativa') || lessonId.includes('associativa')) {
      progressDailyMission('learn', 1, 'addizione');
    } else if (lessonId.includes('invariante') || lessonId.includes('invariantiva')) {
      progressDailyMission('learn', 1, 'sottrazione');
    }
  };

  // Handle navigation from widgets
  const handleNavigate = (tab: 'esplora' | 'imparo' | 'minigiochi' | 'trofei' | 'classifica', filter?: string) => {
    setCurrentTab(tab);
    if (tab === 'imparo' && filter && (filter === 'addizione' || filter === 'sottrazione' || filter === 'moltiplicazione' || filter === 'divisione')) {
      setLearnOpFilter(filter as OperationType);
    }
  };

  // Current user entry for leaderboard
  const currentUserEntry: LeaderboardEntry = {
    id: 'user_me',
    name: 'Tu',
    avatar: avatar,
    level: level,
    xp: xp,
    stars: stars,
    favoriteProperty: 'Commutativa & Invariantiva',
    cheerMessage: 'Imparare le proprietà rende il calcolo una magia! ✨',
    isCurrentUser: true
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-900 selection:bg-amber-200">
      
      {/* 3-Zone Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        avatarConfig={avatar}
        userLevel={level}
        xp={xp}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'esplora' && (
          <HomeExploreSection
            avatarConfig={avatar}
            userLevel={level}
            xp={xp}
            stars={stars}
            onNavigate={handleNavigate}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
            missions={dailyMissions}
            onClaimMissionReward={handleClaimMissionReward}
            onResetMissions={handleResetDailyMissions}
            onQuizCorrectAnswer={() => progressDailyMission('quiz', 1)}
            onAwardXp={(bonusXp) => {
              setXp(prev => prev + bonusXp);
              setToastMessage({
                title: 'Bonus Quiz Rapido Riscattato!',
                desc: `Hai guadagnato +${bonusXp} XP per aver riconosciuto la proprietà!`
              });
              setTimeout(() => setToastMessage(null), 4000);
            }}
          />
        )}

        {currentTab === 'imparo' && (
          <LearnSection
            onCompleteLesson={handleCompleteLesson}
            onOpenGame={() => setCurrentTab('minigiochi')}
            initialOperation={learnOpFilter}
            onExploreOperation={(op) => progressDailyMission('learn', 1, op)}
          />
        )}

        {currentTab === 'minigiochi' && (
          <MinigamesHub
            avatarConfig={avatar}
            userLevel={level}
            gameStats={gameStats}
            onRecordGameResult={handleRecordGameResult}
            onNavigateToTrophies={() => setCurrentTab('trofei')}
          />
        )}

        {currentTab === 'trofei' && (
          <TrophiesSection
            badges={badges}
            xp={xp}
            level={level}
            stars={stars}
            avatarConfig={avatar}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />
        )}

        {currentTab === 'classifica' && (
          <LeaderboardSection
            currentUserEntry={currentUserEntry}
            classmates={INITIAL_LEADERBOARD}
            onChallengeFriend={() => setCurrentTab('minigiochi')}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-amber-400 flex items-center gap-3 animate-bounce-subtle max-w-sm">
          <div className="p-2 bg-amber-500 text-slate-950 rounded-xl shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-amber-300">{toastMessage.title}</h5>
            <p className="text-xs text-slate-200 mt-0.5">{toastMessage.desc}</p>
          </div>
        </div>
      )}

      {/* Character Customizer Studio Modal */}
      <AvatarCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        currentConfig={avatar}
        onSave={handleSaveAvatar}
        userLevel={level}
      />

      {/* Clean Footer */}
      <footer className="mt-16 bg-white border-t border-amber-200/80 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-slate-800">Matemagica: Il Regno delle Proprietà</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Progettato per la scuola primaria per scoprire le proprietà delle 4 operazioni aritmetiche.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span>Addizione · Sottrazione · Moltiplicazione · Divisione</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
