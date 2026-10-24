export type OperationType = 'addizione' | 'sottrazione' | 'moltiplicazione' | 'divisione';

export type PropertyId = 
  | 'add_commutativa'
  | 'add_associativa'
  | 'add_dissociativa'
  | 'add_neutro'
  | 'sub_invariantiva'
  | 'sub_non_commutativa'
  | 'sub_zero'
  | 'mul_commutativa'
  | 'mul_associativa'
  | 'mul_distributiva'
  | 'mul_dissociativa'
  | 'mul_speciali'
  | 'div_invariantiva'
  | 'div_distributiva'
  | 'div_regole_zero';

export interface PropertyRule {
  id: PropertyId;
  operation: OperationType;
  name: string;
  ruleTitle: string;
  description: string;
  formula: string;
  example: string;
  mentalTrick: string;
  icon: string;
  videoLessonId?: string;
}

export interface VideoLesson {
  id: string;
  propertyId: PropertyId;
  title: string;
  subtitle: string;
  durationSeconds: number;
  thumbnail: string;
  steps: {
    time: number;
    title: string;
    speech: string;
    visualAction: 'swap' | 'bracket' | 'balance' | 'slice' | 'intro' | 'summary';
    leftValue: string;
    middleOp: string;
    rightValue: string;
    result: string;
    explanation: string;
    highlight: string;
  }[];
}

export type AvatarArchetype = 'fox' | 'owl' | 'robot' | 'kid_boy' | 'kid_girl';
export type HairStyle = 
  | 'spiky' 
  | 'curls' 
  | 'bob' 
  | 'braids' 
  | 'ponytail' 
  | 'top_bun' 
  | 'long_waves' 
  | 'twin_pigtails' 
  | 'cap' 
  | 'crest' 
  | 'none';

export type OutfitType = 
  | 'astronaut' 
  | 'scientist' 
  | 'hoodie' 
  | 'magician' 
  | 'athlete' 
  | 'math_tee'
  | 'salopette'
  | 'starry_dress'
  | 'superhero';

export type AccessoryType = 
  | 'glasses' 
  | 'magic_wand' 
  | 'headphones' 
  | 'explorer_scarf' 
  | 'crown' 
  | 'medal' 
  | 'hair_bow'
  | 'headband_stars'
  | 'wizard_hat'
  | 'heart_glasses'
  | 'none';

export type ExpressionType = 
  | 'happy' 
  | 'wink' 
  | 'starry' 
  | 'focused' 
  | 'sweet_smile' 
  | 'determined';

export interface AvatarConfig {
  archetype: AvatarArchetype;
  nickname: string;
  primaryColor: string;
  hairStyle: HairStyle;
  hairColor: string;
  outfit: OutfitType;
  outfitColor: string;
  accessory: AccessoryType;
  expression: ExpressionType;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  requirement: string;
  unlockedAt?: string;
  progress: number; // 0 - 100
  category: 'learning' | 'games' | 'mastery' | 'customization';
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: AvatarConfig;
  level: number;
  xp: number;
  stars: number;
  favoriteProperty: string;
  cheerMessage: string;
  isCurrentUser?: boolean;
}

export interface GameScoreResult {
  gameId: string;
  score: number;
  starsEarned: number;
  xpEarned: number;
  correctAnswers: number;
  totalQuestions: number;
  fastestAnswerSec?: number;
}

export interface DailyMission {
  id: string;
  templateId: string;
  title: string;
  description: string;
  category: 'learn' | 'game' | 'quiz' | 'avatar';
  targetCount: number;
  currentCount: number;
  isCompleted: boolean;
  isClaimed: boolean;
  xpReward: number;
  starReward: number;
  iconName: string;
  targetTab: 'imparo' | 'minigiochi' | 'esplora' | 'trofei';
  actionLabel?: string;
  unitLabel?: string;
  specificFilter?: string; // e.g. 'moltiplicazione', 'swap_master', etc.
}
