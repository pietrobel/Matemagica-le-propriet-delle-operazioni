import { bindSlots, randChoice, generateSmartChoices, randInt, shuffleArray } from './mathEngine';

// =========================================================================
// 1. GENERATORE PER SWAP MASTER (Proprietà Commutativa)
// =========================================================================
export interface SwapMasterQuestion {
  type: '+' | '×';
  a: number;
  b: number;
  missingSlot: 'first' | 'second';
  expectedValue: number;
  result: number;
  choices: number[];
}

export function generateSwapMasterRound(
  roundIndex: number,
  previous?: { a: number; b: number }
): SwapMasterQuestion {
  const isAddition = roundIndex % 2 === 0;
  const missingSlot = roundIndex % 3 === 0 ? 'first' : 'second';

  if (isAddition) {
    // Addizione commutativa: a + b = b + a (oppure a + b = a + b)
    // Difficoltà crescente: round 0, 2, 4
    const minVal = roundIndex === 0 ? 5 : roundIndex === 2 ? 15 : 25;
    const maxVal = roundIndex === 0 ? 20 : roundIndex === 2 ? 55 : 85;

    const slots = bindSlots(
      [
        { slotName: 'a', min: minVal, max: maxVal },
        { slotName: 'b', min: minVal, max: maxVal }
      ],
      (s) => s.a !== s.b,
      previous
    );

    const a = slots.a;
    const b = slots.b;
    const result = a + b;
    const expectedValue = missingSlot === 'first' ? b : a;

    // Distractors: other operand, result, sum offsets
    const distractors = [
      missingSlot === 'first' ? a : b,
      result,
      expectedValue + 1,
      expectedValue - 1,
      Math.abs(a - b),
      expectedValue + 10
    ];

    const choices = generateSmartChoices(expectedValue, distractors, 6, 1);

    return {
      type: '+',
      a,
      b,
      missingSlot,
      expectedValue,
      result,
      choices
    };
  } else {
    // Moltiplicazione commutativa: a × b = b × a
    // Difficoltà: round 1, 3, 5
    const aMin = roundIndex === 1 ? 3 : roundIndex === 3 ? 5 : 7;
    const aMax = roundIndex === 1 ? 9 : roundIndex === 3 ? 12 : 15;
    const bMin = 3;
    const bMax = roundIndex === 5 ? 8 : 9;

    const slots = bindSlots(
      [
        { slotName: 'a', min: aMin, max: aMax },
        { slotName: 'b', min: bMin, max: bMax }
      ],
      (s) => s.a !== s.b,
      previous
    );

    const a = slots.a;
    const b = slots.b;
    const result = a * b;
    const expectedValue = missingSlot === 'first' ? b : a;

    const distractors = [
      missingSlot === 'first' ? a : b,
      result,
      a + b,
      expectedValue + 2,
      expectedValue - 1,
      result - 10
    ];

    const choices = generateSmartChoices(expectedValue, distractors, 6, 1);

    return {
      type: '×',
      a,
      b,
      missingSlot,
      expectedValue,
      result,
      choices
    };
  }
}

// =========================================================================
// 2. GENERATORE PER INVARIANT BALANCE (Proprietà Invariantiva)
// =========================================================================
export interface InvariantProblemInstance {
  kind: 'sub' | 'div';
  originalA: number;
  originalB: number;
  bestDelta: number;
  bestExplanation: string;
  transformedA: number;
  transformedB: number;
  finalAnswer: number;
  strategyChoices: {
    label: string;
    isCorrect: boolean;
    transformedText: string;
  }[];
  resultChoices: number[];
}

export function generateInvariantProblem(
  roundIndex: number,
  previous?: { a: number; b: number }
): InvariantProblemInstance {
  // Pattern: round 0, 1, 3, 4 are 'sub'; round 2, 5 are 'div'
  const isDivision = roundIndex === 2 || roundIndex === 5;

  if (!isDivision) {
    // Sottrazione: originalB termina per 8 o 9 (o 7) per rendere ottimale +1, +2 o +3
    const delta = roundIndex % 2 === 0 ? 1 : 2; // +1 o +2
    const targetRoundTen = randChoice([30, 40, 50, 60, 70, 80]);
    const originalB = targetRoundTen - delta; // ends in 9 if delta=1, 8 if delta=2
    
    // originalA must be > originalB, e.g. at least 15-35 more
    const diff = randInt(15, 45);
    const originalA = originalB + diff;

    const transformedA = originalA + delta;
    const transformedB = originalB + delta; // targetRoundTen
    const finalAnswer = transformedA - transformedB; // equal to originalA - originalB

    const bestExplanation = `+${delta} a entrambi (${originalB} diventa un comodissimo ${transformedB}!)`;

    const strategyChoices = [
      {
        label: `+${delta} a entrambi (${originalB} diventa ${transformedB})`,
        isCorrect: true,
        transformedText: `${transformedA} - ${transformedB}`
      },
      {
        label: `+${delta + 1} a entrambi (${originalB} diventa ${transformedB + 1})`,
        isCorrect: false,
        transformedText: `${transformedA + 1} - ${transformedB + 1}`
      },
      {
        label: `-${delta} a entrambi (${originalB} diventa ${originalB - delta})`,
        isCorrect: false,
        transformedText: `${originalA - delta} - ${originalB - delta}`
      },
      {
        label: `+5 solo a ${originalA}`,
        isCorrect: false,
        transformedText: `${originalA + 5} - ${originalB}`
      },
      {
        label: `-1 a ${originalA} e +1 a ${originalB}`,
        isCorrect: false,
        transformedText: `${originalA - 1} - ${originalB + 1}`
      }
    ];

    const distractors = [
      finalAnswer + 1,
      finalAnswer - 1,
      finalAnswer + 10,
      finalAnswer - 10,
      transformedA,
      originalA
    ];

    const resultChoices = generateSmartChoices(finalAnswer, distractors, 6, 1);

    return {
      kind: 'sub',
      originalA,
      originalB,
      bestDelta: delta,
      bestExplanation,
      transformedA,
      transformedB,
      finalAnswer,
      strategyChoices: shuffleArray(strategyChoices),
      resultChoices
    };
  } else {
    // Divisione: multipli con zeri finali (es. 240 ÷ 40 o 350 ÷ 50 o 180 ÷ 30)
    const factorB = randChoice([2, 3, 4, 5, 6]);
    const quotient = randInt(4, 9);
    const originalB = factorB * 10;
    const originalA = quotient * originalB; // guaranteed exact division, no zero divisor

    const transformedA = originalA / 10;
    const transformedB = originalB / 10;
    const finalAnswer = quotient;

    const bestExplanation = `Dividiamo entrambi per 10 (togliamo lo zero finale per semplificare!)`;

    const strategyChoices = [
      {
        label: `Dividi per 10 entrambi (${originalB} diventa ${transformedB})`,
        isCorrect: true,
        transformedText: `${transformedA} ÷ ${transformedB}`
      },
      {
        label: `Dividi per 2 entrambi (${originalB} diventa ${originalB / 2})`,
        isCorrect: false,
        transformedText: `${originalA / 2} ÷ ${originalB / 2}`
      },
      {
        label: `Moltiplica per 2 entrambi`,
        isCorrect: false,
        transformedText: `${originalA * 2} ÷ ${originalB * 2}`
      },
      {
        label: `Togli ${originalB} a entrambi`,
        isCorrect: false,
        transformedText: `${originalA - originalB} ÷ 0`
      },
      {
        label: `Inverti ${originalB} ÷ ${originalA}`,
        isCorrect: false,
        transformedText: `${originalB} ÷ ${originalA}`
      }
    ];

    const distractors = [
      finalAnswer * 10,
      finalAnswer + 2,
      finalAnswer - 1,
      finalAnswer + 4,
      transformedA,
      transformedB
    ];

    const resultChoices = generateSmartChoices(finalAnswer, distractors, 6, 1);

    return {
      kind: 'div',
      originalA,
      originalB,
      bestDelta: 10,
      bestExplanation,
      transformedA,
      transformedB,
      finalAnswer,
      strategyChoices: shuffleArray(strategyChoices),
      resultChoices
    };
  }
}

// =========================================================================
// 3. GENERATORE PER DISTRIBUTIVE SPLIT (Proprietà Distributiva)
// =========================================================================
export interface DistributiveSplitProblem {
  base: number;
  large: number;
  partA: number; // 10 o 20
  partB: number; // 1 .. 9
  areaA: number;
  areaB: number;
  total: number;
  splitChoices: { label: string; partA: number; partB: number; isCorrect: boolean }[];
  sumChoices: number[];
}

export function generateDistributiveSplitProblem(
  roundIndex: number,
  previous?: { base: number; large: number }
): DistributiveSplitProblem {
  // Base factor: 4..9
  const base = randChoice([4, 5, 6, 7, 8, 9]);
  // Part A is 10 (or 20 for later rounds)
  const partA = roundIndex >= 4 ? 20 : 10;
  // Part B is 2..8
  const partB = randChoice([2, 3, 4, 5, 6, 7]);
  const large = partA + partB;

  const areaA = base * partA;
  const areaB = base * partB;
  const total = areaA + areaB;

  const splitChoices = [
    { label: `Spacca in ${partA} + ${partB}`, partA, partB, isCorrect: true },
    { label: `Spacca in ${partA - 2} + ${partB + 2}`, partA: partA - 2, partB: partB + 2, isCorrect: false },
    { label: `Spacca in ${partA + 2} + ${partB - 2}`, partA: partA + 2, partB: partB - 2, isCorrect: false },
    { label: `Spacca in ${large - 1} + 1`, partA: large - 1, partB: 1, isCorrect: false },
    { label: `Spacca in ${Math.floor(large / 2)} + ${Math.ceil(large / 2)}`, partA: Math.floor(large / 2), partB: Math.ceil(large / 2), isCorrect: false }
  ];

  const distractors = [
    total + 10,
    total - 10,
    total + 2,
    total - 2,
    areaA + 10,
    base * large + 5
  ];

  const sumChoices = generateSmartChoices(total, distractors, 6, 10);

  return {
    base,
    large,
    partA,
    partB,
    areaA,
    areaB,
    total,
    splitChoices: shuffleArray(splitChoices),
    sumChoices
  };
}

// =========================================================================
// 4. GENERATORE PER PROPERTY DETECTIVE (Sfida Mista Riconoscimento)
// =========================================================================
export interface DetectiveQuestionInstance {
  prompt: string;
  equation: string;
  correctAnswer: string;
  choices: string[];
  explanation: string;
}

export function generateDetectiveQuestion(
  roundIndex: number,
  previous?: string
): DetectiveQuestionInstance {
  const propertyTemplates = [
    // Commutativa
    () => {
      const a = randInt(12, 45);
      const b = randInt(15, 60);
      const isMul = Math.random() > 0.5;
      if (isMul) {
        return {
          prompt: 'Quale proprietà è stata usata per scambiare questi fattori?',
          equation: `${a} × ${b} = ${b} × ${a} = ${a * b}`,
          correctAnswer: 'Proprietà Commutativa',
          choices: ['Proprietà Commutativa', 'Proprietà Associativa', 'Proprietà Distributiva', 'Elemento Neutro'],
          explanation: `I fattori ${a} e ${b} si sono scambiati di posto: cambiando l'ordine dei fattori il prodotto non cambia.`
        };
      } else {
        return {
          prompt: 'Quale proprietà è stata usata per fare questo scambio di addendi?',
          equation: `${a} + ${b} = ${b} + ${a} = ${a + b}`,
          correctAnswer: 'Proprietà Commutativa',
          choices: ['Proprietà Commutativa', 'Proprietà Associativa', 'Proprietà Invariantiva', 'Proprietà Distributiva'],
          explanation: `Gli addendi ${a} e ${b} si sono scambiati di posto: cambiando l'ordine degli addendi la somma non cambia.`
        };
      }
    },
    // Associativa
    () => {
      const a = randChoice([25, 35, 45, 65]);
      const b = 100 - a; // Friends of 100!
      const c = randInt(12, 38);
      return {
        prompt: 'Quale proprietà ha permesso di raggruppare i primi due termini creando una centena tonda?',
        equation: `(${a} + ${b}) + ${c} = 100 + ${c} = ${100 + c}`,
        correctAnswer: 'Proprietà Associativa',
        choices: ['Proprietà Associativa', 'Proprietà Commutativa', 'Proprietà Distributiva', 'Elemento Neutro'],
        explanation: `Abbiamo associato ${a} e ${b} per fare 100 senza alterare la sequenza ${a}, ${b}, ${c}.`
      };
    },
    // Invariantiva
    () => {
      const delta = randChoice([1, 2]);
      const roundTen = randChoice([30, 40, 50, 60]);
      const b = roundTen - delta;
      const a = b + randInt(22, 54);
      return {
        prompt: `Quale magica proprietà ha aggiunto +${delta} a entrambi i termini della sottrazione?`,
        equation: `${a} - ${b} = (${a} + ${delta}) - (${b} + ${delta}) = ${a + delta} - ${roundTen} = ${(a + delta) - roundTen}`,
        correctAnswer: 'Proprietà Invariantiva',
        choices: ['Proprietà Invariantiva', 'Proprietà Commutativa', 'Proprietà Distributiva', 'Proprietà Associativa'],
        explanation: `Aggiungendo lo stesso numero (+${delta}) a minuendo e sottraendo la differenza resta inalterata!`
      };
    },
    // Distributiva
    () => {
      const factor = randChoice([4, 5, 6, 7, 8]);
      const tens = randChoice([10, 20]);
      const units = randChoice([2, 3, 4, 6]);
      return {
        prompt: `Quale proprietà ha distribuito il ${factor} su entrambi i pezzi della parentesi?`,
        equation: `${factor} × (${tens} + ${units}) = (${factor} × ${tens}) + (${factor} × ${units})`,
        correctAnswer: 'Proprietà Distributiva',
        choices: ['Proprietà Distributiva', 'Proprietà Invariantiva', 'Proprietà Associativa', 'Proprietà Commutativa'],
        explanation: `Il fattore ${factor} è stato distribuito sul ${tens} e sul ${units}.`
      };
    },
    // 5. Trabocchetto commutativa sottrazione
    () => {
      const a = randInt(14, 38);
      const b = randInt(5, 12);
      return {
        prompt: 'Attenzione al trabocchetto! Quale affermazione è FALSA?',
        equation: `${a} - ${b} = ${b} - ${a}`,
        correctAnswer: 'È falsa: la sottrazione NON è commutativa!',
        choices: [
          'È falsa: la sottrazione NON è commutativa!',
          'È vera: vale la proprietà commutativa',
          'È vera per la proprietà invariantiva',
          'È vera con lo zero'
        ],
        explanation: `Nella sottrazione l'ordine è fondamentale! ${a} - ${b} fa ${a - b}, mentre invertendoli il risultato sarebbe negativo.`
      };
    },
    // 6. Elemento neutro dell'1
    () => {
      const a = randInt(23, 89);
      return {
        prompt: `Perché ${a} × 1 fa sempre ${a}?`,
        equation: `${a} × 1 = ${a}`,
        correctAnswer: '1 è l\'Elemento Neutro della moltiplicazione',
        choices: [
          '1 è l\'Elemento Neutro della moltiplicazione',
          'Per la proprietà Invariantiva',
          'Perché 1 è un numero dispari',
          'Per la proprietà Distributiva'
        ],
        explanation: `L'1 è l'elemento neutro della moltiplicazione: lascia qualsiasi numero ${a} invariato.`
      };
    },
    // 7. Invariantiva divisione con zeri
    () => {
      const b = randChoice([2, 3, 4, 5, 6]);
      const q = randInt(4, 9);
      const originalB = b * 10;
      const originalA = q * originalB;
      return {
        prompt: 'Quale proprietà ha tolto lo zero a entrambi i numeri della divisione?',
        equation: `${originalA} ÷ ${originalB} = ${originalA / 10} ÷ ${originalB / 10} = ${q}`,
        correctAnswer: 'Proprietà Invariantiva della divisione',
        choices: [
          'Proprietà Invariantiva della divisione',
          'Proprietà Distributiva a destra',
          'Proprietà Commutativa',
          'Proprietà Associativa'
        ],
        explanation: `Dividendo sia ${originalA} che ${originalB} per 10 (stesso numero diverso da zero), il quoziente ${q} non cambia!`
      };
    },
    // 8. Divisione per zero impossibile
    () => {
      const a = randInt(7, 49);
      return {
        prompt: `Attenzione alle regole matematiche: quanto fa ${a} ÷ 0?`,
        equation: `${a} ÷ 0 = ?`,
        correctAnswer: 'È IMPOSSIBILE: non si può mai dividere per zero!',
        choices: [
          'È IMPOSSIBILE: non si può mai dividere per zero!',
          'Fa 0 per la regola dello zero',
          `Fa ${a} per l'elemento neutro`,
          'Fa 1 perché il divisore si annulla'
        ],
        explanation: `La divisione per zero è impossibile: non esiste nessun numero che moltiplicato per 0 possa ridare ${a}!`
      };
    }
  ];

  const generator = propertyTemplates[roundIndex % propertyTemplates.length];
  return generator();
}

// =========================================================================
// 5. GENERATORE PER SPEED CHALLENGES (Sfida Calcolo Mentale)
// =========================================================================
export interface SpeedChallengeInstance {
  equation: string;
  options: string[];
  correctAnswer: string;
  shortcutTrick: string;
}

export function generateSpeedChallenge(index: number): SpeedChallengeInstance {
  const templates = [
    // 1. 25 x A x 4 = 100 x A
    () => {
      const a = randInt(11, 29);
      const res = a * 100;
      return {
        equation: `25 × ${a} × 4 = ?`,
        options: shuffleArray([`${res}`, `${res / 10}`, `${res * 10}`, `${res + 100}`]),
        correctAnswer: `${res}`,
        shortcutTrick: `Associa 25 × 4 = 100! 100 × ${a} = ${res} istantaneamente.`
      };
    },
    // 2. Invariantiva: a - 49 = (a+1) - 50
    () => {
      const a = randInt(72, 98);
      const res = (a + 1) - 50;
      return {
        equation: `${a} - 49 = ?`,
        options: shuffleArray([`${res}`, `${res + 10}`, `${res - 1}`, `${res + 1}`]),
        correctAnswer: `${res}`,
        shortcutTrick: `Invariantiva (+1): ${a + 1} - 50 = ${res} senza prestiti!`
      };
    },
    // 3. Amici del 100
    () => {
      const a = randChoice([15, 25, 35, 45, 65, 75]);
      const b = 100 - a;
      const c = randInt(14, 48);
      const res = 100 + c;
      return {
        equation: `${a} + ${c} + ${b} = ?`,
        options: shuffleArray([`${res}`, `${res + 10}`, `${res - 10}`, `${res + 2}`]),
        correctAnswer: `${res}`,
        shortcutTrick: `Amici del 100: (${a} + ${b}) = 100. 100 + ${c} = ${res}.`
      };
    },
    // 4. Distributiva: 6 x (40 - 1)
    () => {
      const factor = randChoice([5, 6, 7]);
      const res = factor * 39;
      return {
        equation: `${factor} × 39 = ?`,
        options: shuffleArray([`${res}`, `${res + 10}`, `${res - 10}`, `${factor * 40}`]),
        correctAnswer: `${res}`,
        shortcutTrick: `Distributiva (-1): ${factor} × (40 - 1) = ${factor * 40} - ${factor} = ${res}.`
      };
    },
    // 5. 125 x 8 x A = 1000 x A
    () => {
      const a = randChoice([3, 5, 6, 7, 9]);
      const res = a * 1000;
      return {
        equation: `125 × 8 × ${a} = ?`,
        options: shuffleArray([`${res}`, `${res / 10}`, `${res + 1000}`, `${(a + 1) * 1000}`]),
        correctAnswer: `${res}`,
        shortcutTrick: `Coppia d'oro del 1000: 125 × 8 = 1000. 1000 × ${a} = ${res}.`
      };
    },
    // 6. Raccoglimento: (factor x A) + (factor x B) con A+B = 20 o 100
    () => {
      const factor = randChoice([12, 14, 16, 18]);
      const a = randChoice([13, 14, 15]);
      const b = 20 - a;
      const res = factor * 20;
      return {
        equation: `(${factor} × ${a}) + (${factor} × ${b}) = ?`,
        options: shuffleArray([`${res}`, `${res / 2}`, `${res + 40}`, `${factor * 10}`]),
        correctAnswer: `${res}`,
        shortcutTrick: `Raccogli il ${factor}: ${factor} × (${a} + ${b}) = ${factor} × 20 = ${res}.`
      };
    },
    // 7. Divisione x2 per dividere per 5
    () => {
      const base = randChoice([120, 140, 160, 180, 220, 240]);
      const res = base / 5;
      return {
        equation: `${base} ÷ 5 = ?`,
        options: shuffleArray([`${res}`, `${res + 4}`, `${res - 4}`, `${base / 10}`]),
        correctAnswer: `${res}`,
        shortcutTrick: `Raddoppia e togli lo zero: (${base} × 2) ÷ 10 = ${base * 2} ÷ 10 = ${res}.`
      };
    },
    // 8. Invariantiva 1000 - ABC con -1
    () => {
      const abc = randInt(250, 750);
      const res = 1000 - abc;
      return {
        equation: `1000 - ${abc} = ?`,
        options: shuffleArray([`${res}`, `${res - 1}`, `${res + 1}`, `${res + 10}`]),
        correctAnswer: `${res}`,
        shortcutTrick: `Invariantiva (-1): 999 - ${abc - 1} = ${res} senza prestiti.`
      };
    }
  ];

  const generator = templates[index % templates.length];
  return generator();
}

// =========================================================================
// 6. GENERATORE PER NUMBER LAB (Laboratorio Numerico)
// =========================================================================
export interface LabLevelInstance {
  id: number;
  title: string;
  targetOperation: string;
  initialValue: string;
  availableTransformations: {
    id: string;
    label: string;
    actionDescription: string;
    propertyUsed: string;
    resultingExpression: string;
    isOptimal: boolean;
  }[];
  finalCalculation: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
}

export function generateLabLevels(): LabLevelInstance[] {
  // Livello 1: Amici del 100
  const a1 = randChoice([25, 35, 45, 65, 38, 48]);
  const b1 = 100 - a1;
  const c1 = randInt(17, 79);
  const total1 = 100 + c1;

  // Livello 2: Distillazione per sottrazione
  const base2 = randChoice([6, 7, 8, 9]);
  const tens2 = randChoice([20, 30]);
  const large2 = tens2 - 1;
  const areaTens2 = base2 * tens2;
  const total2 = base2 * large2;

  // Livello 3: Raccoglimento a fattor comune
  const factor3 = randInt(13, 19);
  const a3 = randChoice([35, 45, 55, 65]);
  const b3 = 100 - a3;
  const total3 = factor3 * 100;

  // Livello 4: Bilancia invariantiva
  const targetTen4 = randChoice([40, 50, 60, 70]);
  const b4 = targetTen4 - 1;
  const diff4 = randInt(22, 54);
  const a4 = b4 + diff4;
  const transformedA4 = a4 + 1;
  const total4 = a4 - b4;

  // Livello 5: Invariantiva Divisione (x2)
  const q5 = randInt(14, 34);
  const originalB5 = 15;
  const originalA5 = q5 * originalB5;
  const doubledA5 = originalA5 * 2;
  const doubledB5 = originalB5 * 2; // 30
  const total5 = q5;

  return [
    {
      id: 1,
      title: 'Livello 1: La Soluzione Amica del 100',
      targetOperation: `Calcolo di: ${a1} + ${c1} + ${b1}`,
      initialValue: `${a1} + ${c1} + ${b1}`,
      availableTransformations: [
        {
          id: 't1_opt',
          label: `Scambia e Associa (${a1} + ${b1}) + ${c1}`,
          actionDescription: `Avvicina il ${a1} e il ${b1} per creare la centena tonda 100`,
          propertyUsed: 'Commutativa + Associativa',
          resultingExpression: `100 + ${c1}`,
          isOptimal: true
        },
        {
          id: 't1_sub',
          label: `Calcola in ordine: (${a1} + ${c1}) + ${b1}`,
          actionDescription: `Esegui ${a1} + ${c1} = ${a1 + c1}, poi ${a1 + c1} + ${b1}`,
          propertyUsed: 'Associativa ordinaria (non ottimale)',
          resultingExpression: `${a1 + c1} + ${b1}`,
          isOptimal: false
        }
      ],
      finalCalculation: {
        question: `Qual è il risultato finale di 100 + ${c1}?`,
        options: shuffleArray([`${total1}`, `${total1 + 10}`, `${total1 - 10}`, `${total1 + 2}`]),
        correctAnswer: `${total1}`,
        explanation: `Grazie all'unione di ${a1} e ${b1} (= 100), il calcolo è diventato elementare: 100 + ${c1} = ${total1}.`
      }
    },
    {
      id: 2,
      title: 'Livello 2: La Distillazione Decine/Unità',
      targetOperation: `Calcolo di: ${base2} × ${large2}`,
      initialValue: `${base2} × ${large2}`,
      availableTransformations: [
        {
          id: 't2_opt',
          label: `Distribuisci rispetto alla sottrazione: ${base2} × (${tens2} - 1)`,
          actionDescription: `Arrotonda ${large2} a ${tens2} e sottrai 1: (${base2} × ${tens2}) - (${base2} × 1)`,
          propertyUsed: 'Proprietà Distributiva (-)',
          resultingExpression: `${areaTens2} - ${base2}`,
          isOptimal: true
        },
        {
          id: 't2_add',
          label: `Distribuisci rispetto all'addizione: ${base2} × (${tens2 - 10} + 9)`,
          actionDescription: `Scomponi in (${base2} × ${tens2 - 10}) + (${base2} × 9)`,
          propertyUsed: 'Proprietà Distributiva (+)',
          resultingExpression: `${base2 * (tens2 - 10)} + ${base2 * 9}`,
          isOptimal: false
        }
      ],
      finalCalculation: {
        question: `Qual è il risultato finale di ${areaTens2} - ${base2}?`,
        options: shuffleArray([`${total2}`, `${total2 + 10}`, `${total2 - 10}`, `${total2 + 6}`]),
        correctAnswer: `${total2}`,
        explanation: `${areaTens2} - ${base2} = ${total2}. Pensare a ${large2} come ${tens2} - 1 ha reso la moltiplicazione rapidissima!`
      }
    },
    {
      id: 3,
      title: 'Livello 3: Il Raccoglitore di Reagenti',
      targetOperation: `Calcolo di: (${factor3} × ${a3}) + (${factor3} × ${b3})`,
      initialValue: `(${factor3} × ${a3}) + (${factor3} × ${b3})`,
      availableTransformations: [
        {
          id: 't3_opt',
          label: `Raccogli il fattore comune ${factor3}: ${factor3} × (${a3} + ${b3})`,
          actionDescription: `Raccogli il ${factor3} notando che ${a3} + ${b3} fa esattamente 100!`,
          propertyUsed: 'Distributiva al contrario (Raccoglimento)',
          resultingExpression: `${factor3} × 100`,
          isOptimal: true
        },
        {
          id: 't3_col',
          label: `Moltiplica in colonna: ${factor3 * a3} + ${factor3 * b3}`,
          actionDescription: `Fai le due moltiplicazioni e poi sommale`,
          propertyUsed: 'Nessuna proprietà',
          resultingExpression: `${factor3 * a3} + ${factor3 * b3}`,
          isOptimal: false
        }
      ],
      finalCalculation: {
        question: `Qual è il risultato finale di ${factor3} × 100?`,
        options: shuffleArray([`${total3}`, `${total3 / 10}`, `${total3 * 10}`, `${total3 + 100}`]),
        correctAnswer: `${total3}`,
        explanation: `${factor3} × 100 = ${total3}. Un calcolo apparentemente difficile risolto istantaneamente!`
      }
    },
    {
      id: 4,
      title: 'Livello 4: La Bilancia Invariante',
      targetOperation: `Calcolo di: ${a4} - ${b4}`,
      initialValue: `${a4} - ${b4}`,
      availableTransformations: [
        {
          id: 't4_opt',
          label: `Aggiungi +1 a entrambi i piatti: (${a4} + 1) - (${b4} + 1)`,
          actionDescription: `Fai diventare ${b4} una decina tonda perfetta: ${targetTen4}`,
          propertyUsed: 'Proprietà Invariantiva della sottrazione',
          resultingExpression: `${transformedA4} - ${targetTen4}`,
          isOptimal: true
        },
        {
          id: 't4_bad',
          label: `Inverti i termini: ${b4} - ${a4}`,
          actionDescription: `Prova ad applicare la commutativa`,
          propertyUsed: 'Errore: la sottrazione non è commutativa!',
          resultingExpression: 'Impossibile in ℕ',
          isOptimal: false
        }
      ],
      finalCalculation: {
        question: `Qual è il risultato finale di ${transformedA4} - ${targetTen4}?`,
        options: shuffleArray([`${total4}`, `${total4 + 10}`, `${total4 - 1}`, `${total4 + 2}`]),
        correctAnswer: `${total4}`,
        explanation: `${transformedA4} - ${targetTen4} = ${total4}. Con la proprietà invariantiva niente prestiti né rischi di errore!`
      }
    },
    {
      id: 5,
      title: 'Livello 5: La Purificazione del Quoziente',
      targetOperation: `Calcolo di: ${originalA5} ÷ ${originalB5}`,
      initialValue: `${originalA5} ÷ ${originalB5}`,
      availableTransformations: [
        {
          id: 't5_opt',
          label: `Raddoppia entrambi i termini: (${originalA5} × 2) ÷ (${originalB5} × 2)`,
          actionDescription: `Fai diventare il divisore ${originalB5} un comodo ${doubledB5}: ${doubledA5} ÷ ${doubledB5}`,
          propertyUsed: 'Proprietà Invariantiva della divisione (× 2)',
          resultingExpression: `${doubledA5} ÷ ${doubledB5}`,
          isOptimal: true
        },
        {
          id: 't5_sub',
          label: `Togli 5 a entrambi: (${originalA5} - 5) ÷ (${originalB5} - 5)`,
          actionDescription: `Sottrai 5 a dividendo e divisore`,
          propertyUsed: 'Errore: nell\'invariantiva della divisione si moltiplica o divide, non si sottrae!',
          resultingExpression: 'Errore algebrico',
          isOptimal: false
        }
      ],
      finalCalculation: {
        question: `Semplifica ${doubledA5} ÷ ${doubledB5} togliendo lo zero (÷ 10) e calcola ${doubledA5 / 10} ÷ 3:`,
        options: shuffleArray([`${total5}`, `${total5 + 4}`, `${total5 - 4}`, `${total5 + 10}`]),
        correctAnswer: `${total5}`,
        explanation: `${doubledA5 / 10} ÷ 3 = ${total5}. Abbiamo risolto ${originalA5} ÷ ${originalB5} in due semplici passaggi con l'invariantiva!`
      }
    }
  ];
}

// =========================================================================
// 7. GENERATORE PER ERROR HUNTER (Caccia all'Errore)
// =========================================================================
export interface HunterCaseInstance {
  id: number;
  caseTitle: string;
  mathTopic: string;
  problemPrompt: string;
  steps: {
    stepIndex: number;
    text: string;
    math: string;
    isWrong: boolean;
    errorReason?: string;
  }[];
  correctionOptions: {
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export function generateHunterCases(): HunterCaseInstance[] {
  // Caso 1: Sottrazione asimmetrica
  const b1_round = randChoice([30, 40, 50, 60]);
  const delta1 = randChoice([1, 2]);
  const b1 = b1_round - delta1; // 29 o 28 o 38 etc
  const diff1 = randInt(25, 55);
  const a1 = b1 + diff1;
  const realRes1 = a1 - b1;

  // Caso 2: Divisione distributiva errata al divisore
  const baseDiv = randChoice([6, 8, 12]);
  const p1 = randChoice([8, 10, 12]);
  const p2 = randChoice([2, 4]);
  const sumDiv = p1 + p2;
  const dividend2 = baseDiv * sumDiv;
  const realRes2 = dividend2 / sumDiv;

  // Caso 3: Commutativa vs associativa
  const a3 = randChoice([14, 16, 24, 34]);
  const c3 = 10 - (a3 % 10) + randChoice([10, 20]); // makes a3 + c3 a round tens
  const b3 = randInt(15, 39);

  // Caso 4: Fattore distributivo dimenticato
  const factor4 = randChoice([4, 5, 6, 7]);
  const tens4 = randChoice([20, 30, 40]);
  const units4 = randChoice([2, 3, 4]);
  const realRes4 = factor4 * (tens4 - units4);

  return [
    {
      id: 1,
      caseTitle: 'Caso 1: Il Mistero della Sottrazione Asimmetrica',
      mathTopic: 'Proprietà Invariantiva della Sottrazione',
      problemPrompt: `Calcolo di: ${a1} - ${b1}`,
      steps: [
        { stepIndex: 1, text: `Vogliamo arrotondare il ${b1} a ${b1_round}.`, math: `${b1} + ${delta1} = ${b1_round}`, isWrong: false },
        { stepIndex: 2, text: 'Applichiamo la proprietà invariantiva operando sui due termini:', math: `(${a1} - ${delta1}) - (${b1} + ${delta1})`, isWrong: true, errorReason: `Ha sottratto ${delta1} al minuendo invece di AGGIUNGERE ${delta1} come ha fatto al sottraendo!` },
        { stepIndex: 3, text: 'Eseguiamo la differenza dei nuovi termini:', math: `${a1 - delta1} - ${b1_round}`, isWrong: false },
        { stepIndex: 4, text: 'Calcoliamo il risultato finale:', math: `${(a1 - delta1) - b1_round}`, isWrong: false }
      ],
      correctionOptions: shuffleArray([
        { text: `Bisogna aggiungere ${delta1} a ENTRAMBI i termini: (${a1} + ${delta1}) - (${b1} + ${delta1}) = ${a1 + delta1} - ${b1_round} = ${realRes1}`, isCorrect: true },
        { text: `Bisognava togliere ${b1} da ${a1} in colonna`, isCorrect: false },
        { text: `Bisognava invertire ${b1} - ${a1}`, isCorrect: false }
      ]),
      explanation: 'Nella proprietà invariantiva della sottrazione si deve applicare la STESSA operazione (+k o -k) a entrambi i membri. Sottraendo a sinistra e aggiungendo a destra si altera la differenza!'
    },
    {
      id: 2,
      caseTitle: 'Caso 2: Il Trabocchetto della Distributiva Invertita',
      mathTopic: 'Proprietà Distributiva della Divisione',
      problemPrompt: `Calcolo di: ${dividend2} ÷ (${p1} + ${p2})`,
      steps: [
        { stepIndex: 1, text: `Osserviamo la somma all'interno della parentesi: (${p1} + ${p2}).`, math: `${dividend2} ÷ (${p1} + ${p2})`, isWrong: false },
        { stepIndex: 2, text: `Distribuiamo il ${dividend2} a entrambi i termini della parentesi:`, math: `(${dividend2} ÷ ${p1}) + (${dividend2} ÷ ${p2})`, isWrong: true, errorReason: 'La divisione NON è distributiva rispetto a una somma al DIVISORE!' },
        { stepIndex: 3, text: 'Calcoliamo i due quozienti parziali:', math: `${(dividend2 / p1).toFixed(1)} + ${(dividend2 / p2).toFixed(1)}`, isWrong: false },
        { stepIndex: 4, text: 'Sommiamo i risultati:', math: `${((dividend2 / p1) + (dividend2 / p2)).toFixed(1)}`, isWrong: false }
      ],
      correctionOptions: shuffleArray([
        { text: `Non si può distribuire la divisione rispetto a una somma al divisore! Bisogna calcolare prima la parentesi: ${dividend2} ÷ ${sumDiv} = ${realRes2}`, isCorrect: true },
        { text: `Bisognava moltiplicare ${dividend2} × ${sumDiv}`, isCorrect: false },
        { text: 'La somma parziale è errata', isCorrect: false }
      ]),
      explanation: 'La divisione si distribuisce solo se la somma si trova al dividendo. Se la somma è al divisore, bisogna eseguire prima la parentesi!'
    },
    {
      id: 3,
      caseTitle: 'Caso 3: La Confusione tra Ordine e Raggruppamento',
      mathTopic: 'Commutativa vs Associativa',
      problemPrompt: `Calcolo di: ${a3} + ${b3} + ${c3}`,
      steps: [
        { stepIndex: 1, text: `Scambiamo la posizione del ${b3} e del ${c3} per avvicinare ${a3} e ${c3}:`, math: `${a3} + ${c3} + ${b3}`, isWrong: false },
        { stepIndex: 2, text: 'Lo studente afferma: "In questo passaggio ho applicato solo la proprietà associativa pura":', math: '"Solo proprietà associativa"', isWrong: true, errorReason: 'Ha cambiato l\'ordine fisico dei numeri, quindi ha applicato la proprietà COMMUTATIVA!' },
        { stepIndex: 3, text: 'Raggruppiamo i primi due addendi:', math: `(${a3} + ${c3}) + ${b3} = ${a3 + c3} + ${b3}`, isWrong: false },
        { stepIndex: 4, text: 'Calcoliamo il totale:', math: `${a3 + c3 + b3}`, isWrong: false }
      ],
      correctionOptions: shuffleArray([
        { text: 'Nel passaggio 1 è stata applicata la proprietà COMMUTATIVA (scambio di ordine), non l\'associativa pura!', isCorrect: true },
        { text: `${a3} + ${c3} non è calcolabile a mente`, isCorrect: false },
        { text: `Il risultato finale doveva essere ${a3 + c3 + b3 + 10}`, isCorrect: false }
      ]),
      explanation: 'Se i numeri cambiano posizione da sinistra verso destra si tratta della proprietà COMMUTATIVA. L\'associativa pura non tocca mai l\'ordine dei numeri!'
    },
    {
      id: 4,
      caseTitle: 'Caso 4: Il Fattore Dimenticato',
      mathTopic: 'Proprietà Distributiva della Moltiplicazione',
      problemPrompt: `Calcolo di: ${factor4} × (${tens4} - ${units4})`,
      steps: [
        { stepIndex: 1, text: 'Vogliamo sviluppare la moltiplicazione per la differenza:', math: `${factor4} × (${tens4} - ${units4})`, isWrong: false },
        { stepIndex: 2, text: `Distribuiamo il moltiplicatore ${factor4}:`, math: `(${factor4} × ${tens4}) - ${units4}`, isWrong: true, errorReason: `Ha dimenticato di moltiplicare il ${factor4} anche per il ${units4}!` },
        { stepIndex: 3, text: 'Eseguiamo i calcoli:', math: `${factor4 * tens4} - ${units4}`, isWrong: false },
        { stepIndex: 4, text: 'Risultato trovato:', math: `${factor4 * tens4 - units4}`, isWrong: false }
      ],
      correctionOptions: shuffleArray([
        { text: `Il ${factor4} deve moltiplicare entrambi i termini: (${factor4} × ${tens4}) - (${factor4} × ${units4}) = ${factor4 * tens4} - ${factor4 * units4} = ${realRes4}`, isCorrect: true },
        { text: 'Il segno meno doveva diventare più', isCorrect: false },
        { text: `${factor4} × ${tens4} è calcolato male`, isCorrect: false }
      ]),
      explanation: `La proprietà distributiva impone che il fattore esterno moltiplichi CIASCUN termine all'interno della parentesi: ${factor4} × ${tens4} = ${factor4 * tens4} e ${factor4} × ${units4} = ${factor4 * units4}. Il risultato reale è ${realRes4}.`
    }
  ];
}

// =========================================================================
// 8. GENERATORE PER PROPERTY TOURNAMENT (Torneo dei Campioni)
// =========================================================================
export interface TournamentRoundInstance {
  roundNumber: number;
  stageName: string;
  opponentName: string;
  opponentAvatar: string;
  opponentTitle: string;
  targetProperty: string;
  questions: {
    question: string;
    equationPrompt?: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export function generateTournamentRounds(): TournamentRoundInstance[] {
  // Round 1
  const a1 = randInt(45, 89);
  const b1 = randInt(35, 95);
  const f1 = randInt(6, 12);
  const f2 = randInt(13, 24);

  // Round 2
  const a2 = randChoice([15, 25, 35, 45, 65]);
  const b2 = 100 - a2;
  const c2 = randInt(14, 48);

  // Round 3
  const factor3 = randChoice([6, 7, 8, 9]);
  const tens3 = randChoice([20, 30, 40]);
  const a3_inv = randInt(72, 98);

  // Round 4
  const magicTerm = randInt(25, 95);

  return [
    {
      roundNumber: 1,
      stageName: 'Sedicesimi di Finale',
      opponentName: 'Robo-Bit 3000',
      opponentAvatar: '🤖',
      opponentTitle: 'Automa del Calcolo Aritmetico',
      targetProperty: 'Proprietà Commutativa',
      questions: [
        {
          question: 'Quale uguaglianza applica correttamente la proprietà commutativa?',
          equationPrompt: `${a1} + ${b1}`,
          options: shuffleArray([`${b1} + ${a1} = ${a1 + b1}`, `(${a1} + 10) + ${b1}`, `${a1} × ${b1}`, `${b1} - ${a1}`]),
          correctAnswer: `${b1} + ${a1} = ${a1 + b1}`,
          explanation: 'Proprietà commutativa: cambiando l\'ordine degli addendi la somma non cambia.'
        },
        {
          question: `Nella moltiplicazione ${f1} × ${f2} = ${f2} × ${f1}, quale proprietà ha usato Robo-Bit?`,
          options: shuffleArray(['Proprietà Commutativa', 'Proprietà Distributiva', 'Proprietà Associativa', 'Elemento Neutro']),
          correctAnswer: 'Proprietà Commutativa',
          explanation: `I due fattori ${f1} e ${f2} si sono scambiati reciprocamente di posto.`
        }
      ]
    },
    {
      roundNumber: 2,
      stageName: 'Quarti di Finale',
      opponentName: 'Volpina Algebrica',
      opponentAvatar: '🦊',
      opponentTitle: 'Esperta di Raggruppamenti Furbi',
      targetProperty: 'Proprietà Associativa',
      questions: [
        {
          question: `Completa senza modificare l'ordine dei numeri: (${a2} + ${b2}) + ${c2} = ${a2} + (___ + ${c2})`,
          equationPrompt: `(${a2} + ${b2}) + ${c2} = ${a2} + (___ + ${c2})`,
          options: shuffleArray([`${b2}`, '100', `${a2}`, `${c2}`]),
          correctAnswer: `${b2}`,
          explanation: `La sequenza ${a2}, ${b2}, ${c2} rimane identica: sono cambiate solo le parentesi associative.`
        },
        {
          question: 'Quale coppia conviene associare per prima in 25 × 17 × 4?',
          options: shuffleArray(['25 × 4 perché fa 100', '25 × 17', '17 × 4', 'Nessuna']),
          correctAnswer: '25 × 4 perché fa 100',
          explanation: '25 × 4 = 100, moltiplicare per 17 dà 1700 immediatamente!'
        }
      ]
    },
    {
      roundNumber: 3,
      stageName: 'Semifinale d\'Argento',
      opponentName: 'Gufo Sapiente',
      opponentAvatar: '🦉',
      opponentTitle: 'Custode delle Scomposizioni e delle Bilance',
      targetProperty: 'Distributiva & Invariantiva',
      questions: [
        {
          question: `Calcola a mente ${factor3} × ${tens3 - 1} con la distributiva rispetto alla sottrazione:`,
          equationPrompt: `${factor3} × (${tens3} - 1)`,
          options: shuffleArray([
            `${factor3 * tens3} - ${factor3} = ${factor3 * (tens3 - 1)}`,
            `${factor3 * tens3} - 1 = ${factor3 * tens3 - 1}`,
            `${factor3 * 10} + 9 = ${factor3 * 10 + 9}`,
            `${factor3 * tens3}`
          ]),
          correctAnswer: `${factor3 * tens3} - ${factor3} = ${factor3 * (tens3 - 1)}`,
          explanation: `(${factor3} × ${tens3}) - (${factor3} × 1) = ${factor3 * tens3} - ${factor3} = ${factor3 * (tens3 - 1)}.`
        },
        {
          question: `Per calcolare ${a3_inv} - 39 con l'invariantiva, aggiungiamo +1 a entrambi. Che operazione otteniamo?`,
          options: shuffleArray([
            `${a3_inv + 1} - 40 = ${a3_inv - 39}`,
            `${a3_inv + 1} - 39 = ${a3_inv - 38}`,
            `${a3_inv} - 40 = ${a3_inv - 40}`,
            `${a3_inv - 1} - 40 = ${a3_inv - 41}`
          ]),
          correctAnswer: `${a3_inv + 1} - 40 = ${a3_inv - 39}`,
          explanation: `(${a3_inv} + 1) - (39 + 1) = ${a3_inv + 1} - 40 = ${a3_inv - 39}.`
        }
      ]
    },
    {
      roundNumber: 4,
      stageName: 'Gran Finale dei Campioni',
      opponentName: 'Gran Maestro Archimede',
      opponentAvatar: '🧙‍♂️',
      opponentTitle: 'Signore Assoluto di Tutte le Proprietà',
      targetProperty: 'Sfida Mista e Casi Limite dello Zero',
      questions: [
        {
          question: `Archimede lancia un sortilegio: calcola (45 + 18 × 3 - 12) × 0 + ${magicTerm}. Qual è il risultato?`,
          options: shuffleArray([`${magicTerm}`, '0', `${magicTerm + 20}`, 'Impossibile']),
          correctAnswer: `${magicTerm}`,
          explanation: `La parentesi moltiplicata per zero si annulla a 0 (elemento assorbente). Poi 0 + ${magicTerm} = ${magicTerm} (zero neutro).`
        },
        {
          question: `Perché la divisione ${randInt(22, 88)} ÷ 0 non può avere come risultato zero?`,
          options: shuffleArray([
            'Perché nessun numero moltiplicato per 0 può dare un valore diverso da zero: è tassativamente IMPOSSIBILE!',
            'Fa zero solo se i numeri sono pari',
            'Fa il numero stesso',
            'Fa 1'
          ]),
          correctAnswer: 'Perché nessun numero moltiplicato per 0 può dare un valore diverso da zero: è tassativamente IMPOSSIBILE!',
          explanation: 'Dividere un numero diverso da zero per 0 è una contraddizione non risolvibile: è impossibile.'
        }
      ]
    }
  ];
}
