export interface PropertyQuizQuestion {
  id: string;
  operation: 'Addizione' | 'Sottrazione' | 'Moltiplicazione' | 'Divisione' | 'Mista';
  equation: string;
  question: string;
  correctProperty: string;
  choices: string[];
  explanation: string;
  ruleHint: string;
}

export const ALL_PROPERTY_QUIZ_QUESTIONS: PropertyQuizQuestion[] = [
  // 1. Commutativa Addizione
  {
    id: 'pq_add_comm',
    operation: 'Addizione',
    equation: '38 + 54 = 54 + 38 = 92',
    question: 'Quale proprietà è stata applicata per invertire l\'ordine dei numeri?',
    correctProperty: 'Proprietà Commutativa dell\'addizione',
    choices: [
      'Proprietà Commutativa dell\'addizione',
      'Proprietà Associativa dell\'addizione',
      'Proprietà Invariantiva',
      'Proprietà Distributiva'
    ],
    explanation: 'Proprietà Commutativa: cambiando l\'ordine degli addendi, la somma non cambia (a + b = b + a).',
    ruleHint: 'I due numeri si sono scambiati di posto come due amici al banco!'
  },

  // 2. Associativa Addizione
  {
    id: 'pq_add_assoc',
    operation: 'Addizione',
    equation: '(17 + 3) + 29 = 17 + (3 + 29) = 49',
    question: 'Quale proprietà ha permesso di spostare le parentesi e raggruppare i numeri?',
    correctProperty: 'Proprietà Associativa dell\'addizione',
    choices: [
      'Proprietà Associativa dell\'addizione',
      'Proprietà Commutativa dell\'addizione',
      'Proprietà Associativa (in forma dissociativa)',
      'Elemento Neutro'
    ],
    explanation: 'Proprietà Associativa: sostituendo a due o più addendi la loro somma parziale, il risultato non cambia.',
    ruleHint: 'Le parentesi racchiudono una coppia amica per facilitare il calcolo!'
  },

  // 3. Associativa in forma dissociativa Addizione
  {
    id: 'pq_add_dissoc',
    operation: 'Addizione',
    equation: '46 + 18 = 46 + (14 + 4) = 60 + 4 = 64',
    question: 'Quale proprietà è stata usata per scomporre il 18 in (14 + 4)?',
    correctProperty: 'Proprietà Associativa (in forma dissociativa) dell\'addizione',
    choices: [
      'Proprietà Associativa (in forma dissociativa) dell\'addizione',
      'Proprietà Commutativa',
      'Proprietà Invariantiva',
      'Proprietà Distributiva'
    ],
    explanation: 'Proprietà Associativa in forma dissociativa: si applica l\'associativa al contrario scomponendo un termine per agevolare il calcolo a mente.',
    ruleHint: 'Il 18 è stato "scomposto" in 14 e 4 per raggiungere la decina tonda 60!'
  },

  // 4. Elemento Neutro Addizione
  {
    id: 'pq_add_neutro',
    operation: 'Addizione',
    equation: '125 + 0 = 125',
    question: 'Quale proprietà matematica spiega questa uguaglianza?',
    correctProperty: 'Elemento Neutro dell\'addizione (lo Zero)',
    choices: [
      'Elemento Neutro dell\'addizione (lo Zero)',
      'Elemento Assorbente',
      'Proprietà Commutativa',
      'Proprietà Invariantiva'
    ],
    explanation: 'Lo zero è l\'elemento neutro dell\'addizione: sommarlo a qualsiasi numero non ne cambia il valore.',
    ruleHint: 'Sommare zero non aggiunge nessuna quantità!'
  },

  // 5. Invariantiva Sottrazione (+k)
  {
    id: 'pq_sub_inv_add',
    operation: 'Sottrazione',
    equation: '73 - 29 = (73 + 1) - (29 + 1) = 74 - 30 = 44',
    question: 'Quale proprietà permette di aggiungere +1 sia a minuendo che a sottraendo?',
    correctProperty: 'Proprietà Invariantiva della sottrazione',
    choices: [
      'Proprietà Invariantiva della sottrazione',
      'Proprietà Commutativa della sottrazione',
      'Proprietà Distributiva',
      'Proprietà Associativa'
    ],
    explanation: 'Proprietà Invariantiva: aggiungendo o togliendo uno stesso numero a entrambi i termini, la differenza resta identica.',
    ruleHint: 'La bilancia resta in equilibrio se aggiungi lo stesso peso a entrambi i piatti!'
  },

  // 6. Invariantiva Sottrazione (-k)
  {
    id: 'pq_sub_inv_sub',
    operation: 'Sottrazione',
    equation: '85 - 25 = (85 - 5) - (25 - 5) = 80 - 20 = 60',
    question: 'Quale proprietà permette di sottrarre -5 a entrambi i termini senza cambiare la differenza?',
    correctProperty: 'Proprietà Invariantiva della sottrazione',
    choices: [
      'Proprietà Invariantiva della sottrazione',
      'Proprietà Associativa (in forma dissociativa)',
      'Proprietà Distributiva',
      'Elemento Neutro'
    ],
    explanation: 'Proprietà Invariantiva: togliendo 5 da entrambi i termini la distanza numerica rimane 60.',
    ruleHint: 'Togliere la stessa quantità da entrambi conserva la differenza!'
  },

  // 7. Non-commutatività della Sottrazione
  {
    id: 'pq_sub_non_comm',
    operation: 'Sottrazione',
    equation: '15 - 8 ≠ 8 - 15',
    question: 'Perché questa operazione dimostra che l\'ordine NON si può scambiare?',
    correctProperty: 'La sottrazione NON gode della proprietà commutativa',
    choices: [
      'La sottrazione NON gode della proprietà commutativa',
      'Per la proprietà Invariantiva',
      'Per l\'elemento neutro',
      'Perché si applica l\'associativa in forma dissociativa'
    ],
    explanation: 'La sottrazione non è commutativa: 15 - 8 fa 7, mentre 8 - 15 non ha soluzione nei numeri naturali!',
    ruleHint: 'Nella sottrazione l\'ordine è un senso unico vietato!'
  },

  // 8. Commutativa Moltiplicazione
  {
    id: 'pq_mul_comm',
    operation: 'Moltiplicazione',
    equation: '7 × 9 = 9 × 7 = 63',
    question: 'Quale proprietà afferma che l\'ordine dei fattori non cambia il prodotto?',
    correctProperty: 'Proprietà Commutativa della moltiplicazione',
    choices: [
      'Proprietà Commutativa della moltiplicazione',
      'Proprietà Distributiva',
      'Proprietà Invariantiva',
      'Elemento Assorbente'
    ],
    explanation: 'Proprietà Commutativa della moltiplicazione: a × b = b × a.',
    ruleHint: '7 per 9 o 9 per 7 danno esattamente lo stesso rettangolo di 63 quadretti!'
  },

  // 9. Associativa Moltiplicazione
  {
    id: 'pq_mul_assoc',
    operation: 'Moltiplicazione',
    equation: '(4 × 25) × 7 = 4 × (25 × 7) = 100 × 7 = 700',
    question: 'Quale proprietà permette di calcolare prima (4 × 25) che fa 100?',
    correctProperty: 'Proprietà Associativa della moltiplicazione',
    choices: [
      'Proprietà Associativa della moltiplicazione',
      'Proprietà Commutativa',
      'Proprietà Distributiva',
      'Proprietà Invariantiva'
    ],
    explanation: 'Proprietà Associativa della moltiplicazione: puoi raggruppare i fattori come preferisci: (a × b) × c = a × (b × c).',
    ruleHint: '4 × 25 fa 100, moltiplicare per 7 dopo è immediato!'
  },

  // 10. Distributiva Moltiplicazione rispetto alla Somma
  {
    id: 'pq_mul_distr',
    operation: 'Moltiplicazione',
    equation: '8 × (10 + 4) = (8 × 10) + (8 × 4) = 80 + 32 = 112',
    question: 'Quale proprietà distribuisce la moltiplicazione per 8 sui due addendi 10 e 4?',
    correctProperty: 'Proprietà Distributiva della moltiplicazione',
    choices: [
      'Proprietà Distributiva della moltiplicazione',
      'Proprietà Commutativa',
      'Proprietà Invariantiva',
      'Proprietà Associativa'
    ],
    explanation: 'Proprietà Distributiva: moltiplicare un numero per una somma equivale a moltiplicarlo per ciascun addendo e sommare i prodotti.',
    ruleHint: 'L\'8 si distribuisce equamente sia sul 10 che sul 4!'
  },

  // 11. Associativa in forma dissociativa Moltiplicazione
  {
    id: 'pq_mul_dissoc',
    operation: 'Moltiplicazione',
    equation: '14 × 5 = (7 × 2) × 5 = 7 × (2 × 5) = 7 × 10 = 70',
    question: 'Quale proprietà è stata usata per scomporre il 14 in 7 × 2?',
    correctProperty: 'Proprietà Associativa (in forma dissociativa) della moltiplicazione',
    choices: [
      'Proprietà Associativa (in forma dissociativa) della moltiplicazione',
      'Proprietà Invariantiva',
      'Proprietà Distributiva',
      'Elemento Neutro'
    ],
    explanation: 'Proprietà Associativa in forma dissociativa: si usa l\'associativa al contrario per scomporre un fattore in fattori più immediati per il calcolo mentale.',
    ruleHint: 'Il 14 è stato "scomposto" nei fattori 7 e 2 per unire 2 × 5 = 10!'
  },

  // 12. Elemento Neutro Moltiplicazione (1)
  {
    id: 'pq_mul_neutro',
    operation: 'Moltiplicazione',
    equation: '48 × 1 = 48',
    question: 'Quale ruolo ha il numero 1 in questa moltiplicazione?',
    correctProperty: 'Elemento Neutro della moltiplicazione (l\'Uno)',
    choices: [
      'Elemento Neutro della moltiplicazione (l\'Uno)',
      'Elemento Assorbente',
      'Proprietà Invariantiva',
      'Proprietà Distributiva'
    ],
    explanation: 'L\'1 è l\'elemento neutro della moltiplicazione: moltiplicato per qualunque numero lo lascia immutato.',
    ruleHint: 'L\'uno agisce come uno specchio: riflette il numero originale!'
  },

  // 13. Elemento Assorbente Moltiplicazione (0)
  {
    id: 'pq_mul_zero',
    operation: 'Moltiplicazione',
    equation: '235 × 0 = 0',
    question: 'Quale proprietà dello zero rende il risultato sempre zero?',
    correctProperty: 'Elemento Assorbente della moltiplicazione (lo Zero)',
    choices: [
      'Elemento Assorbente della moltiplicazione (lo Zero)',
      'Elemento Neutro',
      'Proprietà Commutativa',
      'Proprietà Associativa'
    ],
    explanation: 'Lo zero nella moltiplicazione è detto elemento assorbente: azzera qualsiasi numero con cui viene moltiplicato.',
    ruleHint: 'Lo zero inghiotte tutto come un buco nero spaziale!'
  },

  // 14. Invariantiva Divisione (divisione per k)
  {
    id: 'pq_div_inv_div',
    operation: 'Divisione',
    equation: '180 ÷ 30 = (180 ÷ 10) ÷ (30 ÷ 10) = 18 ÷ 3 = 6',
    question: 'Quale proprietà permette di dividere per 10 sia dividendo che divisore?',
    correctProperty: 'Proprietà Invariantiva della divisione',
    choices: [
      'Proprietà Invariantiva della divisione',
      'Proprietà Distributiva della divisione',
      'Proprietà Commutativa',
      'Elemento Neutro'
    ],
    explanation: 'Proprietà Invariantiva: dividendo entrambi i termini per lo stesso numero (10), il quoziente rimane invariato (6).',
    ruleHint: 'Eliminare gli zeri finali da entrambi è il classico trucco dell\'invariantiva!'
  },

  // 15. Distributiva Divisione a destra
  {
    id: 'pq_div_distr',
    operation: 'Divisione',
    equation: '(80 + 16) ÷ 8 = (80 ÷ 8) + (16 ÷ 8) = 10 + 2 = 12',
    question: 'Quale proprietà permette di dividere ciascun addendo per 8 e poi sommare?',
    correctProperty: 'Proprietà Distributiva della divisione',
    choices: [
      'Proprietà Distributiva della divisione',
      'Proprietà Invariantiva della divisione',
      'Proprietà Commutativa',
      'Proprietà Associativa'
    ],
    explanation: 'Proprietà Distributiva a destra: per dividere una somma, puoi dividere ciascun addendo per il divisore e sommare i quozienti.',
    ruleHint: '96 ÷ 8 diventa comodissimo dividendolo in 80 ÷ 8 e 16 ÷ 8!'
  },

  // 16. Regola dello Zero nella Divisione
  {
    id: 'pq_div_zero',
    operation: 'Divisione',
    equation: '9 ÷ 0 = IMPOSSIBILE',
    question: 'Cosa stabilisce la regola fondamentale dello zero nella divisione?',
    correctProperty: 'Dividere per zero è una operazione IMPOSSIBILE',
    choices: [
      'Dividere per zero è una operazione IMPOSSIBILE',
      'Fa sempre 0 per l\'elemento assorbente',
      'Fa 9 per l\'elemento neutro',
      'Vale la proprietà commutativa'
    ],
    explanation: 'Non esiste nessun numero che moltiplicato per 0 dia 9! La divisione per zero è impossibile per definizione.',
    ruleHint: 'Non si può distribuire un oggetto a zero persone!'
  }
];

export function generatePropertyQuizQuestions(): PropertyQuizQuestion[] {
  const questions: PropertyQuizQuestion[] = JSON.parse(JSON.stringify(ALL_PROPERTY_QUIZ_QUESTIONS));

  // 1. Commutativa Addizione
  const a1 = Math.floor(Math.random() * 30) + 25;
  const b1 = Math.floor(Math.random() * 35) + 35;
  questions[0].equation = `${a1} + ${b1} = ${b1} + ${a1} = ${a1 + b1}`;

  // 2. Associativa Addizione
  const a2 = Math.floor(Math.random() * 8) + 12;
  const b2 = 20 - a2;
  const c2 = Math.floor(Math.random() * 25) + 20;
  questions[1].equation = `(${a2} + ${b2}) + ${c2} = ${a2} + (${b2} + ${c2}) = ${20 + c2}`;

  // 4. Elemento neutro addizione
  const a4 = Math.floor(Math.random() * 80) + 75;
  questions[3].equation = `${a4} + 0 = ${a4}`;

  // 5. Invariantiva add
  const delta5 = Math.floor(Math.random() * 2) + 1;
  const b5 = 30 - delta5;
  const a5 = b5 + Math.floor(Math.random() * 25) + 25;
  questions[4].equation = `${a5} - ${b5} = (${a5} + ${delta5}) - (${b5} + ${delta5}) = ${a5 + delta5} - 30 = ${a5 - b5}`;

  // 8. Commutativa moltiplicazione
  const a8 = Math.floor(Math.random() * 5) + 6;
  const b8 = Math.floor(Math.random() * 6) + 11;
  questions[7].equation = `${a8} × ${b8} = ${b8} × ${a8} = ${a8 * b8}`;

  // 11. Neutro moltiplicazione
  const a11 = Math.floor(Math.random() * 80) + 55;
  questions[10].equation = `${a11} × 1 = ${a11}`;

  // 12. Assorbente zero
  const a12 = Math.floor(Math.random() * 80) + 45;
  questions[11].equation = `${a12} × 0 = 0`;

  // 16. Div zero
  const a16 = Math.floor(Math.random() * 40) + 12;
  questions[15].equation = `${a16} ÷ 0 = IMPOSSIBILE`;

  return questions;
}
