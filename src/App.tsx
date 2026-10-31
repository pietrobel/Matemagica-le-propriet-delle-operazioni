import React, { useState, useEffect } from 'react';
import { 
  AvatarConfig, 
  Badge, 
  GameScoreResult, 
  LeaderboardEntry,
  DailyMission,
  OperationType,
  MainTab,
  LoggedError
} from './types/math';
import { INITIAL_BADGES, INITIAL_LEADERBOARD, LEVEL_TITLES } from './data/mathRules';
import { generateDailyMissions } from './data/dailyMissionsData';
import { Navbar } from './components/Navbar';
import { HomeExploreSection } from './components/home/HomeExploreSection';
import { TextbookSection } from './components/learn/TextbookSection';
import { LearnSection } from './components/learn/LearnSection';
import { GuidedPracticeSection } from './components/practice/GuidedPracticeSection';
import { MinigamesHub } from './components/games/MinigamesHub';
import { FinalAssessmentSection } from './components/assessment/FinalAssessmentSection';
import { ReviewSection } from './components/review/ReviewSection';
import { NeutralAbsorbingSection } from './components/neutral/NeutralAbsorbingSection';
import { TrophiesSection } from './components/trophies/TrophiesSection';
import { LeaderboardSection } from './components/leaderboard/LeaderboardSection';
import { AvatarCustomizerModal } from './components/avatar/AvatarCustomizerModal';
import { soundManager } from './utils/audio';
import { Sparkles, FlaskConical, ExternalLink } from 'lucide-react';

const STORAGE_KEY_AVATAR = 'matemagica_avatar_v1';
const STORAGE_KEY_BADGES = 'matemagica_badges_v1';
const STORAGE_KEY_MISSIONS = 'matemagica_daily_missions_v2';
const STORAGE_KEY_MISSIONS_DATE = 'matemagica_daily_date_v2';
const STORAGE_KEY_ERRORS = 'matemagica_logged_errors_v1';

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
  const [currentTab, setCurrentTab] = useState<MainTab>('home');
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
  const [xp, setXp] = useState(750);
  const [stars, setStars] = useState(16);
  const [level, setLevel] = useState(2);
  const [gameStats, setGameStats] = useState<{ [gameId: string]: { highscore: number; plays: number; stars: number } }>({
    swap_master: { highscore: 380, plays: 2, stars: 2 },
    invariant_balance: { highscore: 250, plays: 1, stars: 1 },
    distributive_split: { highscore: 0, plays: 0, stars: 0 },
    property_detective: { highscore: 0, plays: 0, stars: 0 },
    number_lab: { highscore: 0, plays: 0, stars: 0 },
    error_hunter: { highscore: 0, plays: 0, stars: 0 },
    property_match: { highscore: 0, plays: 0, stars: 0 },
    mental_math_speed: { highscore: 0, plays: 0, stars: 0 },
    escape_room: { highscore: 0, plays: 0, stars: 0 },
    property_tournament: { highscore: 0, plays: 0, stars: 0 }
  });

  // Logged errors vault for the Review section
  const [loggedErrors, setLoggedErrors] = useState<LoggedError[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ERRORS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleLogError = (err: LoggedError) => {
    setLoggedErrors(prev => {
      // Avoid exact duplicates
      const exists = prev.some(e => e.question === err.question && e.givenAnswer === err.givenAnswer);
      if (exists) return prev;
      const updated = [err, ...prev].slice(0, 50);
      try {
        localStorage.setItem(STORAGE_KEY_ERRORS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearErrors = () => {
    setLoggedErrors([]);
    try {
      localStorage.removeItem(STORAGE_KEY_ERRORS);
    } catch {}
    setToastMessage({
      title: 'Registro Errori Svuotato',
      desc: 'Tutte le lacune sono state azzerate per un nuovo ciclo di studio!'
    });
    setTimeout(() => setToastMessage(null), 3500);
  };

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

  // Toast notification
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

        if (mission.specificFilter && filter && mission.specificFilter !== filter) {
          return mission;
        }

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

  // Reset daily missions
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

    progressDailyMission('learn', 1, 'video');
  };

  const handleNavigate = (tab: MainTab, filter?: string) => {
    soundManager.playPop();
    setCurrentTab(tab);
    if (tab === 'guardo' && filter && (filter === 'addizione' || filter === 'sottrazione' || filter === 'moltiplicazione' || filter === 'divisione')) {
      setLearnOpFilter(filter as OperationType);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      
      {/* Navbar with ScienzaLab button and 6 distinct sections */}
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

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Schermata Iniziale / Home */}
        {currentTab === 'home' && (
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
                desc: `Hai guadagnato +${bonusXp} XP!`
              });
              setTimeout(() => setToastMessage(null), 4000);
            }}
          />
        )}

        {/* 1. IMPARO – Libro di Testo Interattivo */}
        {currentTab === 'imparo' && (
          <TextbookSection
            onGoToVideo={() => setCurrentTab('guardo')}
            onGoToPractice={() => setCurrentTab('esercito')}
            onAwardXp={(bonus) => {
              setXp(prev => prev + bonus);
              setToastMessage({
                title: 'Mini-Verifica Capitolo Superata!',
                desc: `+${bonus} XP guadagnati!`
              });
              setTimeout(() => setToastMessage(null), 3500);
            }}
          />
        )}

        {/* 2. GUARDO – Videolezioni Animate */}
        {currentTab === 'guardo' && (
          <LearnSection
            onCompleteLesson={handleCompleteLesson}
            onOpenGame={() => setCurrentTab('gioco')}
            initialOperation={learnOpFilter}
            onExploreOperation={(op) => progressDailyMission('learn', 1, op)}
          />
        )}

        {/* 3. MI ESERCITO – Palestra >100 Esercizi */}
        {currentTab === 'esercito' && (
          <GuidedPracticeSection
            avatarConfig={avatar}
            onAwardXp={(amount) => setXp(prev => prev + amount)}
            onGoHome={() => setCurrentTab('home')}
            onGoToGames={() => setCurrentTab('gioco')}
            onGoToTheory={() => setCurrentTab('imparo')}
            onLogError={handleLogError}
          />
        )}

        {/* 4. GIOCO – 6 Giochi Didattici Interattivi */}
        {currentTab === 'gioco' && (
          <MinigamesHub
            avatarConfig={avatar}
            userLevel={level}
            gameStats={gameStats}
            onRecordGameResult={handleRecordGameResult}
            onNavigateToTrophies={() => setCurrentTab('trofei')}
            onGoHome={() => setCurrentTab('home')}
            onGoToTheory={() => setCurrentTab('imparo')}
            onGoToVerification={() => setCurrentTab('prova')}
          />
        )}

        {/* 5. MI METTO ALLA PROVA – Verifica Ufficiale 30 Domande */}
        {currentTab === 'prova' && (
          <FinalAssessmentSection
            avatarConfig={avatar}
            onAwardXp={(amount) => setXp(prev => prev + amount)}
            onGoHome={() => setCurrentTab('home')}
            onGoToReview={() => setCurrentTab('ripasso')}
            onGoToTheory={() => setCurrentTab('imparo')}
            onLogError={handleLogError}
          />
        )}

        {/* 6. RIPASSO – Schemi Riassuntivi e Registro Errori */}
        {currentTab === 'ripasso' && (
          <ReviewSection
            avatarConfig={avatar}
            loggedErrors={loggedErrors}
            onClearErrors={handleClearErrors}
            onGoToTheory={() => setCurrentTab('imparo')}
            onGoToPractice={() => setCurrentTab('esercito')}
            onGoHome={() => setCurrentTab('home')}
          />
        )}

        {/* Sezione Autonoma: Elementi Neutri ed Assorbenti (0 e 1) */}
        {currentTab === 'neutri' && (
          <NeutralAbsorbingSection
            avatarConfig={avatar}
            onAwardXp={(amount) => setXp(prev => prev + amount)}
            onGoHome={() => setCurrentTab('home')}
            onGoToGames={() => setCurrentTab('gioco')}
            onGoToTheory={() => setCurrentTab('imparo')}
            onLogError={handleLogError}
          />
        )}

        {/* Trofei & Livelli */}
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

        {/* Classifica */}
        {currentTab === 'classifica' && (
          <LeaderboardSection
            currentUserEntry={currentUserEntry}
            classmates={INITIAL_LEADERBOARD}
            onChallengeFriend={() => setCurrentTab('gioco')}
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

      {/* Avatar Studio Modal */}
      <AvatarCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        currentConfig={avatar}
        onSave={handleSaveAvatar}
        userLevel={level}
      />

      {/* Clean Footer with ScienzaLab Link */}
      <footer className="mt-16 bg-white border-t border-amber-200/80 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-slate-800">Matemagica: Il Regno delle Proprietà</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Ambiente di apprendimento per giovani matematici della scuola secondaria di primo grado (60-90 minuti).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
            <a
              href="https://scienzalab.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-900 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 transition-colors"
            >
              <FlaskConical className="w-3.5 h-3.5 text-teal-600" />
              <span>Visita ScienzaLab (scienzalab.vercel.app) ↗</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
