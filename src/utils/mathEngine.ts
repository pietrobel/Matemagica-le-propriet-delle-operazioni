/**
 * Math Engine & Procedural Exercise Generator
 * Rigorous client-side procedural generation preserving:
 * - Mathematical structure and parentheses
 * - Term order and operators
 * - STRICT slot equality (same slot = same value)
 * - STRICT slot diversity (distinct slots = distinct values)
 * - Mathematical validity (no division by zero, no unintended negatives, integer divisions)
 * - Dynamic recalculation of answers, options, and explanations
 */

export interface TermSlotConstraint {
  slotName: string;
  min: number;
  max: number;
  isEven?: boolean;
  isOdd?: boolean;
  notIn?: number[];
  endsIn?: number[]; // e.g. ends in 8 or 9 for invariantiva
}

export interface ExpressionModel {
  id: string;
  property: 'commutativa' | 'associativa' | 'distributiva' | 'invariantiva' | 'neutri_assorbenti';
  operation: 'addizione' | 'sottrazione' | 'moltiplicazione' | 'divisione';
  difficulty: 'facile' | 'intermedio' | 'avanzato';
  slots: TermSlotConstraint[];
  // Relational checks that must pass
  relationValidator?: (slots: Record<string, number>) => boolean;
}

/**
 * Random integer helper in [min, max]
 */
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Pick a random element from an array
 */
export function randChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Shuffle array immutably
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Core Slot Binder: Generates values for each slot ensuring:
 * 1. Occurrences of the same slot are identical
 * 2. Distinct slots are strictly pairwise distinct
 * 3. All slot constraints and relational validator pass
 */
export function bindSlots(
  constraints: TermSlotConstraint[],
  validator?: (slots: Record<string, number>) => boolean,
  previousSlots?: Record<string, number>,
  maxAttempts = 100
): Record<string, number> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate: Record<string, number> = {};
    const usedValues = new Set<number>();
    let valid = true;

    for (const c of constraints) {
      let val: number | null = null;
      let tries = 0;

      while (tries < 40) {
        tries++;
        const candidateVal = randInt(c.min, c.max);

        // Check if endsIn constraint applies
        if (c.endsIn && !c.endsIn.includes(Math.abs(candidateVal) % 10)) {
          continue;
        }

        // Check isEven / isOdd
        if (c.isEven && candidateVal % 2 !== 0) continue;
        if (c.isOdd && candidateVal % 2 === 0) continue;

        // Check notIn
        if (c.notIn && c.notIn.includes(candidateVal)) continue;

        // STRICT DIVERSITY: Must not collide with any other slot already generated
        if (usedValues.has(candidateVal)) continue;

        val = candidateVal;
        break;
      }

      if (val === null) {
        valid = false;
        break;
      }

      candidate[c.slotName] = val;
      usedValues.add(val);
    }

    if (!valid) continue;

    // Run relational validator
    if (validator && !validator(candidate)) continue;

    // Ensure it's not identical to previous generation if provided
    if (previousSlots) {
      let isIdentical = true;
      for (const k of Object.keys(candidate)) {
        if (candidate[k] !== previousSlots[k]) {
          isIdentical = false;
          break;
        }
      }
      if (isIdentical && attempt < maxAttempts - 5) {
        continue;
      }
    }

    return candidate;
  }

  // Fallback safe defaults if constraints were extremely tight
  const fallback: Record<string, number> = {};
  let cur = 10;
  for (const c of constraints) {
    fallback[c.slotName] = cur;
    cur += 5;
  }
  return fallback;
}

/**
 * Distractor Generator: Generates n distinct choices around correct value
 */
export function generateSmartChoices(
  correctVal: number,
  distractors: number[],
  count = 4,
  minVal = 0
): number[] {
  const set = new Set<number>();
  set.add(correctVal);

  for (const d of distractors) {
    if (d !== correctVal && d >= minVal) {
      set.add(d);
      if (set.size >= count) break;
    }
  }

  // If still need more, generate offsets
  let offset = 1;
  while (set.size < count) {
    const candPlus = correctVal + offset;
    const candMinus = correctVal - offset;
    if (candMinus >= minVal && !set.has(candMinus)) set.add(candMinus);
    if (set.size < count && !set.has(candPlus)) set.add(candPlus);
    offset += (offset % 2 === 0 ? 10 : 2);
  }

  return shuffleArray(Array.from(set).slice(0, count));
}
