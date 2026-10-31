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

export type MainTab = 
  | 'home' 
  | 'imparo' 
  | 'guardo' 
  | 'esercito' 
  | 'gioco' 
  | 'prova' 
  | 'ripasso' 
  | 'neutri' 
  | 'trofei' 
  | 'classifica';

// Mini esercizi interattivi per capitolo del libro di testo
export interface MiniCheckExercise {
  id: string;
  question: string;
  promptEquation?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Esempio svolto per capitolo
export interface WorkedExample {
  title: string;
  initialEquation: string;
  steps: { stepNumber: number; text: string; mathExpression: string }[];
  resultExplanation: string;
  practicalTip: string;
}

// Capitolo del libro di testo interattivo
export interface TextbookChapter {
  id: number;
  title: string;
  subtitle: string;
  operationCategory: 'addizione' | 'moltiplicazione' | 'sottrazione' | 'divisione' | 'neutri_assorbenti';
  introduction: string;
  generalRuleBox: {
    ruleName: string;
    verbalRule: string;
    algebraicFormula: string;
    conditionNote?: string;
  };
  workedExamples: WorkedExample[];
  practicalApplication: {
    whyItMatters: string;
    mentalMathSecret: string;
    realLifeScenario: string;
  };
  miniChecks: MiniCheckExercise[];
}

// Tipi per i 100+ esercizi guidati
export type ExerciseLevel = 1 | 2 | 3; // 1: facile, 2: intermedio, 3: avanzato
export type ExerciseType = 
  | 'completa_operazione'
  | 'trova_risultato'
  | 'scegli_trasformazione'
  | 'calcolo_mentale'
  | 'trova_errore'
  | 'abbina'
  | 'vero_falso'
  | 'completa_procedimento'
  | 'problema';

export interface GuidedExercise {
  id: string;
  level: ExerciseLevel;
  type: ExerciseType;
  property: 'commutativa' | 'associativa' | 'distributiva' | 'invariantiva' | 'neutri_assorbenti';
  operation: OperationType;
  question: string;
  equationDisplay?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  xpReward: number;
}

// Registro errori per la sezione Ripasso
export interface LoggedError {
  id: string;
  timestamp: number;
  exerciseTitle: string;
  question: string;
  givenAnswer: string;
  correctAnswer: string;
  explanation: string;
  property: string;
  sectionSource: 'esercito' | 'gioco' | 'prova' | 'neutri';
}

// Escape room
export interface EscapePuzzle {
  id: string;
  puzzleTitle: string;
  riddleText: string;
  equation: string;
  hint: string;
  options: string[];
  correctAnswer: string;
  codeDigit: number; // una cifra del codice finale
  explanation: string;
}

export interface EscapeRoom {
  id: number;
  name: string;
  theme: string;
  description: string;
  color: string;
  requiredProperty: string;
  puzzles: EscapePuzzle[];
  unlockedVaultDigit?: number;
}

