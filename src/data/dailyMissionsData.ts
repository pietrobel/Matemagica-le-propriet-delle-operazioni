import { DailyMission } from '../types/math';

export interface MissionTemplate {
  templateId: string;
  title: string;
  description: string;
  category: 'learn' | 'game' | 'quiz' | 'avatar';
  targetCount: number;
  xpReward: number;
  starReward: number;
  iconName: string;
  targetTab: 'imparo' | 'minigiochi' | 'esplora' | 'trofei';
  actionLabel: string;
  unitLabel: string;
  specificFilter?: string;
}

export const DAILY_MISSION_TEMPLATES: MissionTemplate[] = [
  // Learn & Video category
  {
    templateId: 'mission_watch_video',
    title: 'Guarda un Video Animato',
    description: 'Guarda una videolezione animata per scoprire la magia delle proprietà',
    category: 'learn',
    targetCount: 1,
    xpReward: 90,
    starReward: 2,
    iconName: 'Video',
    targetTab: 'imparo',
    actionLabel: 'Guarda Video',
    unitLabel: 'video'
  },
  {
    templateId: 'mission_learn_multiplication',
    title: 'Completa una Lezione di Moltiplicazione',
    description: 'Esplora una regola o video sulla Moltiplicazione (es: Distributiva)',
    category: 'learn',
    targetCount: 1,
    xpReward: 100,
    starReward: 2,
    iconName: 'BookOpen',
    targetTab: 'imparo',
    actionLabel: 'Vai a Moltiplicazione',
    unitLabel: 'lezione',
    specificFilter: 'moltiplicazione'
  },
  {
    templateId: 'mission_learn_subtraction',
    title: 'Esplora la Proprietà Invariantiva',
    description: 'Scopri il trucco della bilancia nella sezione Imparo',
    category: 'learn',
    targetCount: 1,
    xpReward: 95,
    starReward: 2,
    iconName: 'Scale',
    targetTab: 'imparo',
    actionLabel: 'Scopri la Regola',
    unitLabel: 'lezione',
    specificFilter: 'sottrazione'
  },
  {
    templateId: 'mission_learn_addition',
    title: 'Campione dell\'Addizione',
    description: 'Studia la proprietà commutativa o associativa dell\'addizione',
    category: 'learn',
    targetCount: 1,
    xpReward: 90,
    starReward: 2,
    iconName: 'Sparkles',
    targetTab: 'imparo',
    actionLabel: 'Studia Addizione',
    unitLabel: 'lezione',
    specificFilter: 'addizione'
  },

  // Game category
  {
    templateId: 'mission_score_50',
    title: 'Ottieni 50 Punti in un Gioco',
    description: 'Gioca a uno dei 4 minigiochi e totalizza almeno 50 punti',
    category: 'game',
    targetCount: 50,
    xpReward: 120,
    starReward: 3,
    iconName: 'Gamepad2',
    targetTab: 'minigiochi',
    actionLabel: 'Gioca Subito',
    unitLabel: 'punti'
  },
  {
    templateId: 'mission_play_swap_master',
    title: 'Trionfa allo Scambio Magico',
    description: 'Completa una sfida a tempo nel gioco della Proprietà Commutativa',
    category: 'game',
    targetCount: 1,
    xpReward: 100,
    starReward: 2,
    iconName: 'ArrowLeftRight',
    targetTab: 'minigiochi',
    actionLabel: 'Gioca allo Scambio',
    unitLabel: 'partita',
    specificFilter: 'swap_master'
  },
  {
    templateId: 'mission_play_distributive',
    title: 'Spacca i Numeri Grandi',
    description: 'Completa una partita al minigioco "Spacca & Risolvi"',
    category: 'game',
    targetCount: 1,
    xpReward: 110,
    starReward: 2,
    iconName: 'Scissors',
    targetTab: 'minigiochi',
    actionLabel: 'Spacca i Blocchi',
    unitLabel: 'partita',
    specificFilter: 'distributive_split'
  },
  {
    templateId: 'mission_play_invariant',
    title: 'Risolvi la Sottrazione Bilanciata',
    description: 'Gioca a "Il Trucco Invariante" e applica il trucco ai due piatti',
    category: 'game',
    targetCount: 1,
    xpReward: 100,
    starReward: 2,
    iconName: 'Scale',
    targetTab: 'minigiochi',
    actionLabel: 'Vai alla Bilancia',
    unitLabel: 'partita',
    specificFilter: 'invariant_balance'
  },
  {
    templateId: 'mission_play_detective',
    title: 'Detective delle 4 Proprietà',
    description: 'Indovina le proprietà matematiche nel Castello delle Regole',
    category: 'game',
    targetCount: 1,
    xpReward: 110,
    starReward: 2,
    iconName: 'ShieldCheck',
    targetTab: 'minigiochi',
    actionLabel: 'Diventa Detective',
    unitLabel: 'partita',
    specificFilter: 'property_detective'
  },

  // Quiz category
  {
    templateId: 'mission_quick_quiz_2',
    title: '2 Risposte nel Quiz Rapido',
    description: 'Rispondi correttamente a 2 domande veloci nel Quiz Rapido della Home',
    category: 'quiz',
    targetCount: 2,
    xpReward: 85,
    starReward: 2,
    iconName: 'Zap',
    targetTab: 'esplora',
    actionLabel: 'Fai il Quiz',
    unitLabel: 'risposte giuste'
  },

  // Avatar category
  {
    templateId: 'mission_customize_avatar',
    title: 'Aggiorna il Tuo Avatar',
    description: 'Personalizza il compagno matematico con un nuovo accessorio o colore',
    category: 'avatar',
    targetCount: 1,
    xpReward: 75,
    starReward: 1,
    iconName: 'Palette',
    targetTab: 'esplora',
    actionLabel: 'Apri Studio',
    unitLabel: 'stile provato'
  }
];

/**
 * Generates 3 diverse daily missions based on today's date string (YYYY-MM-DD)
 * to ensure that users get fresh challenges every single day!
 */
export function generateDailyMissions(dateKey: string = new Date().toISOString().slice(0, 10)): DailyMission[] {
  // Simple deterministic hash based on date string
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) & 0xffffffff;
  }
  const seed = Math.abs(hash);

  // Pick 1 from Learn category, 1 from Game category, and 1 from Quiz/Avatar category
  const learnPool = DAILY_MISSION_TEMPLATES.filter(t => t.category === 'learn');
  const gamePool = DAILY_MISSION_TEMPLATES.filter(t => t.category === 'game');
  const otherPool = DAILY_MISSION_TEMPLATES.filter(t => t.category === 'quiz' || t.category === 'avatar');

  const chosenLearn = learnPool[seed % learnPool.length];
  const chosenGame = gamePool[(seed + 2) % gamePool.length];
  const chosenOther = otherPool[(seed + 4) % otherPool.length];

  const selectedTemplates = [chosenLearn, chosenGame, chosenOther];

  return selectedTemplates.map((template, idx) => ({
    id: `mission_${dateKey}_${template.templateId}_${idx}`,
    templateId: template.templateId,
    title: template.title,
    description: template.description,
    category: template.category,
    targetCount: template.targetCount,
    currentCount: 0,
    isCompleted: false,
    isClaimed: false,
    xpReward: template.xpReward,
    starReward: template.starReward,
    iconName: template.iconName,
    targetTab: template.targetTab,
    actionLabel: template.actionLabel,
    unitLabel: template.unitLabel,
    specificFilter: template.specificFilter
  }));
}
