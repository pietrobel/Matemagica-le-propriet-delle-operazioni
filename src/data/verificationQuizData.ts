export interface VerificationQuestion {
  id: string;
  topic: 'Commutativa' | 'Associativa' | 'Distributiva' | 'Invariantiva' | 'Neutri e Assorbenti';
  type: 'multipla' | 'vero_falso' | 'completamento' | 'errore' | 'applicazione' | 'problema';
  question: string;
  equationPrompt?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 1 | 2 | 3;
}

export const VERIFICATION_QUESTION_BANK: VerificationQuestion[] = [
  // Commutativa
  {
    id: 'vq_01',
    topic: 'Commutativa',
    type: 'multipla',
    question: 'Quale delle seguenti operazioni applica la proprietà commutativa dell\'addizione?',
    options: ['34 + 58 = 58 + 34', '(12 + 8) + 5 = 12 + (8 + 5)', '6 × 10 = 60', '45 + 0 = 45'],
    correctAnswer: '34 + 58 = 58 + 34',
    explanation: 'Cambiando l\'ordine degli addendi la somma non cambia: 34 + 58 = 58 + 34.',
    difficulty: 1
  },
  {
    id: 'vq_02',
    topic: 'Commutativa',
    type: 'vero_falso',
    question: 'La proprietà commutativa vale sia per l\'addizione che per la moltiplicazione nei numeri naturali.',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Vero',
    explanation: 'Vero: a + b = b + a e a × b = b × a valgono sempre in ℕ.',
    difficulty: 1
  },
  {
    id: 'vq_03',
    topic: 'Commutativa',
    type: 'completamento',
    question: 'Completa: 14 × 25 = 25 × ___',
    options: ['14', '350', '25', '10'],
    correctAnswer: '14',
    explanation: 'Scambiando i fattori: 14 × 25 = 25 × 14.',
    difficulty: 1
  },
  {
    id: 'vq_04',
    topic: 'Commutativa',
    type: 'errore',
    question: 'Quale affermazione contiene un grave errore concettuale?',
    options: [
      '20 - 5 = 5 - 20 per la proprietà commutativa della sottrazione',
      '12 + 7 = 7 + 12 per la proprietà commutativa dell\'addizione',
      '9 × 4 = 4 × 9 per la proprietà commutativa della moltiplicazione',
      'a × b = b × a'
    ],
    correctAnswer: '20 - 5 = 5 - 20 per la proprietà commutativa della sottrazione',
    explanation: 'La sottrazione NON è commutativa! 20 - 5 = 15, mentre 5 - 20 = -15.',
    difficulty: 2
  },
  {
    id: 'vq_05',
    topic: 'Commutativa',
    type: 'applicazione',
    question: 'Per calcolare a mente 4 + 79, quale trasformazione commutativa rende il calcolo immediato?',
    options: ['79 + 4 = 83', '4 × 79', '79 - 4 = 75', '(70 + 9) + 4'],
    correctAnswer: '79 + 4 = 83',
    explanation: 'Partire dal numero più grande (79) e aggiungere 4 unità porta subito a 83.',
    difficulty: 1
  },
  {
    id: 'vq_06',
    topic: 'Commutativa',
    type: 'problema',
    question: 'Un pacco contiene 12 scatole da 6 matite. Un altro pacco contiene 6 scatole da 12 matite. Quale affermazione è corretta?',
    options: [
      'I due pacchi contengono esattamente lo stesso numero di matite (72) per la proprietà commutativa',
      'Il primo pacco ne contiene di più',
      'Il secondo pacco ne contiene di più',
      'Non si può stabilire senza aprirli'
    ],
    correctAnswer: 'I due pacchi contengono esattamente lo stesso numero di matite (72) per la proprietà commutativa',
    explanation: '12 × 6 = 6 × 12 = 72 matite.',
    difficulty: 2
  },

  // Associativa
  {
    id: 'vq_07',
    topic: 'Associativa',
    type: 'completamento',
    question: 'Completa senza modificare l\'ordine dei numeri: (7 + 3) + 18 = 7 + (___ + 18)',
    options: ['3', '10', '7', '18'],
    correctAnswer: '3',
    explanation: 'Proprietà Associativa: l\'ordine 7, 3, 18 resta invariato: 7 + (3 + 18).',
    difficulty: 1
  },
  {
    id: 'vq_08',
    topic: 'Associativa',
    type: 'multipla',
    question: 'Quale operazione conviene svolgere per prima nell\'espressione (45 + 55) + 38?',
    options: [
      '45 + 55 perché forma la centena tonda 100',
      '55 + 38',
      '45 + 38',
      'Non c\'è alcuna differenza'
    ],
    correctAnswer: '45 + 55 perché forma la centena tonda 100',
    explanation: '45 + 55 = 100. 100 + 38 = 138 a mente in un attimo.',
    difficulty: 1
  },
  {
    id: 'vq_09',
    topic: 'Associativa',
    type: 'multipla',
    question: 'Quale delle seguenti espressioni applica CORRETTAMENTE la proprietà associativa pura all\'espressione 15 + (5 + 28)?',
    options: [
      '(15 + 5) + 28',
      '(15 + 28) + 5',
      '28 + (5 + 15)',
      '15 + 5 + 28 = 48'
    ],
    correctAnswer: '(15 + 5) + 28',
    explanation: 'I numeri mantengono l\'ordine 15, 5, 28; le parentesi sono state spostate sui primi due termini.',
    difficulty: 2
  },
  {
    id: 'vq_10',
    topic: 'Associativa',
    type: 'errore',
    question: 'Perché l\'uguaglianza (20 - 10) - 4 = 20 - (10 - 4) è FALSA?',
    options: [
      'Perché la sottrazione NON gode della proprietà associativa: a sinistra fa 6, a destra fa 14',
      'Perché i numeri sono pari',
      'Perché 10 - 4 non si può fare',
      'È vera se si tolgono le parentesi'
    ],
    correctAnswer: 'Perché la sottrazione NON gode della proprietà associativa: a sinistra fa 6, a destra fa 14',
    explanation: '(20 - 10) - 4 = 10 - 4 = 6; mentre 20 - (10 - 4) = 20 - 6 = 14. 6 ≠ 14!',
    difficulty: 2
  },
  {
    id: 'vq_11',
    topic: 'Associativa',
    type: 'applicazione',
    question: 'Calcola a mente il prodotto 4 × 17 × 25 associando la coppia strategica:',
    options: [
      '(4 × 25) × 17 = 100 × 17 = 1700',
      '4 × 17 = 68, poi 68 × 25 in colonna',
      '170',
      '17000'
    ],
    correctAnswer: '(4 × 25) × 17 = 100 × 17 = 1700',
    explanation: '4 × 25 = 100. Moltiplicare 17 per 100 dà 1700.',
    difficulty: 2
  },
  {
    id: 'vq_12',
    topic: 'Associativa',
    type: 'vero_falso',
    question: 'La proprietà dissociativa è l\'applicazione inversa della proprietà associativa.',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Vero',
    explanation: 'Vero! Consiste nello scomporre un termine in due o più fattori/addendi per facilitare i raggruppamenti.',
    difficulty: 2
  },
  {
    id: 'vq_13',
    topic: 'Associativa',
    type: 'completamento',
    question: 'Completa: (2 × 50) × 19 = 2 × (___ × 19)',
    options: ['50', '100', '2', '19'],
    correctAnswer: '50',
    explanation: 'Proprietà associativa della moltiplicazione.',
    difficulty: 1
  },

  // Distributiva
  {
    id: 'vq_14',
    topic: 'Distributiva',
    type: 'multipla',
    question: 'Qual è lo sviluppo corretto di 8 × (20 + 4)?',
    options: [
      '(8 × 20) + (8 × 4)',
      '(8 × 20) + 4',
      '(8 + 20) × (8 + 4)',
      '8 × 20 × 4'
    ],
    correctAnswer: '(8 × 20) + (8 × 4)',
    explanation: '8 × (20 + 4) = (8 × 20) + (8 × 4) = 160 + 32 = 192.',
    difficulty: 1
  },
  {
    id: 'vq_15',
    topic: 'Distributiva',
    type: 'applicazione',
    question: 'Calcola 7 × 19 sfruttando la distributiva rispetto alla sottrazione: 7 × (20 - 1)',
    options: [
      '(7 × 20) - (7 × 1) = 140 - 7 = 133',
      '7 × 19 = 143',
      '140 - 1 = 139',
      '70 + 63 = 133'
    ],
    correctAnswer: '(7 × 20) - (7 × 1) = 140 - 7 = 133',
    explanation: '140 - 7 = 133.',
    difficulty: 2
  },
  {
    id: 'vq_16',
    topic: 'Distributiva',
    type: 'completamento',
    question: 'Raccogli il fattore comune: (16 × 7) + (16 × 3) = 16 × (___ + 3)',
    options: ['7', '16', '10', '112'],
    correctAnswer: '7',
    explanation: '16 × (7 + 3) = 16 × 10 = 160.',
    difficulty: 2
  },
  {
    id: 'vq_17',
    topic: 'Distributiva',
    type: 'errore',
    question: 'Qual è l\'errore in: 4 × (10 + 5) = 40 + 5 = 45?',
    options: [
      'Il fattore 4 doveva moltiplicare anche il 5 (4 × 5 = 20), dando 40 + 20 = 60',
      'Non c\'è nessun errore',
      '4 × 10 non fa 40',
      'La parentesi andava tolta subito'
    ],
    correctAnswer: 'Il fattore 4 doveva moltiplicare anche il 5 (4 × 5 = 20), dando 40 + 20 = 60',
    explanation: '4 × (10 + 5) = 4 × 15 = 60, oppure (4 × 10) + (4 × 5) = 40 + 20 = 60.',
    difficulty: 2
  },
  {
    id: 'vq_18',
    topic: 'Distributiva',
    type: 'problema',
    question: 'Un cinema vende 35 biglietti interi a €8 e 35 biglietti ridotti a €5. Calcola l\'incasso totale con la distributiva:',
    options: [
      '35 × (8 + 5) = 35 × 13 = €455',
      '(35 × 8) + 5 = 285',
      '35 + 8 + 5 = 48',
      '35 × 8 × 5 = 1400'
    ],
    correctAnswer: '35 × (8 + 5) = 35 × 13 = €455',
    explanation: '35 × 13 = 35 × (10 + 3) = 350 + 105 = €455.',
    difficulty: 3
  },
  {
    id: 'vq_19',
    topic: 'Distributiva',
    type: 'vero_falso',
    question: 'La divisione è distributiva rispetto alla somma sia a destra che a sinistra: (a + b) ÷ c = (a ÷ c) + (b ÷ c) e c ÷ (a + b) = (c ÷ a) + (c ÷ b).',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso! La divisione si distribuisce SOLO se la somma è al dividendo (a sinistra), MAI al divisore!',
    difficulty: 3
  },

  // Invariantiva
  {
    id: 'vq_20',
    topic: 'Invariantiva',
    type: 'multipla',
    question: 'La proprietà invariantiva della sottrazione afferma che:',
    options: [
      'Aggiungendo o togliendo lo stesso numero a minuendo e sottraendo, la differenza non cambia',
      'Scambiando minuendo e sottraendo la differenza non cambia',
      'Moltiplicando minuendo e sottraendo per zero si ottiene zero',
      'Sostituendo a due sottrazioni la loro somma'
    ],
    correctAnswer: 'Aggiungendo o togliendo lo stesso numero a minuendo e sottraendo, la differenza non cambia',
    explanation: 'a - b = (a + k) - (b + k) = (a - k) - (b - k).',
    difficulty: 1
  },
  {
    id: 'vq_21',
    topic: 'Invariantiva',
    type: 'completamento',
    question: 'Completa: 73 - 29 = (73 + 1) - (29 + ___)',
    options: ['1', '2', '30', '44'],
    correctAnswer: '1',
    explanation: 'Aggiungendo 1 a entrambi: 74 - 30 = 44.',
    difficulty: 1
  },
  {
    id: 'vq_22',
    topic: 'Invariantiva',
    type: 'applicazione',
    question: 'Calcola 1000 - 458 togliendo 1 a entrambi i termini per evitare prestiti:',
    options: ['999 - 457 = 542', '999 - 458 = 541', '1000 - 457 = 543', '542'],
    correctAnswer: '999 - 457 = 542',
    explanation: '999 - 457 = 542 senza prestiti.',
    difficulty: 2
  },
  {
    id: 'vq_23',
    topic: 'Invariantiva',
    type: 'multipla',
    question: 'Qual è il risultato di 360 ÷ 40 applicando la proprietà invariantiva?',
    options: [
      '(360 ÷ 10) ÷ (40 ÷ 10) = 36 ÷ 4 = 9',
      '360 ÷ 4 = 90',
      '360 - 40 = 320',
      '40 ÷ 360'
    ],
    correctAnswer: '(360 ÷ 10) ÷ (40 ÷ 10) = 36 ÷ 4 = 9',
    explanation: 'Cancellando uno zero da entrambi: 36 ÷ 4 = 9.',
    difficulty: 1
  },
  {
    id: 'vq_24',
    topic: 'Invariantiva',
    type: 'applicazione',
    question: 'Calcola a mente 270 ÷ 5 moltiplicando entrambi per 2:',
    options: [
      '(270 × 2) ÷ (5 × 2) = 540 ÷ 10 = 54',
      '270 ÷ 10 = 27',
      '135',
      '540'
    ],
    correctAnswer: '(270 × 2) ÷ (5 × 2) = 540 ÷ 10 = 54',
    explanation: '540 ÷ 10 = 54.',
    difficulty: 2
  },
  {
    id: 'vq_25',
    topic: 'Invariantiva',
    type: 'errore',
    question: 'Qual è l\'errore in: 85 - 28 = (85 + 2) - (28 - 2)?',
    options: [
      'Ha aggiunto 2 a sinistra ma ha tolto 2 a destra: bisognava aggiungere 2 a entrambi (87 - 30 = 57)',
      'Non c\'è nessun errore',
      '85 + 2 fa 88',
      '28 - 2 fa 30'
    ],
    correctAnswer: 'Ha aggiunto 2 a sinistra ma ha tolto 2 a destra: bisognava aggiungere 2 a entrambi (87 - 30 = 57)',
    explanation: 'Devi compiere la stessa identica operazione (+k o -k) su entrambi i termini!',
    difficulty: 2
  },

  // Neutri e Assorbenti
  {
    id: 'vq_26',
    topic: 'Neutri e Assorbenti',
    type: 'multipla',
    question: 'Qual è l\'elemento neutro dell\'addizione e quale quello della moltiplicazione?',
    options: [
      'Addizione: 0 ; Moltiplicazione: 1',
      'Addizione: 1 ; Moltiplicazione: 0',
      'Entrambi hanno come neutro lo 0',
      'Entrambi hanno come neutro l\'1'
    ],
    correctAnswer: 'Addizione: 0 ; Moltiplicazione: 1',
    explanation: 'a + 0 = a (zero neutro in addizione); a × 1 = a (uno neutro in moltiplicazione).',
    difficulty: 1
  },
  {
    id: 'vq_27',
    topic: 'Neutri e Assorbenti',
    type: 'multipla',
    question: 'Qual è l\'elemento assorbente della moltiplicazione?',
    options: ['Lo ZERO (a × 0 = 0)', 'L\'UNO', 'Il DUE', 'Nessuno'],
    correctAnswer: 'Lo ZERO (a × 0 = 0)',
    explanation: 'Qualsiasi numero moltiplicato per zero viene assorbito e diventa zero.',
    difficulty: 1
  },
  {
    id: 'vq_28',
    topic: 'Neutri e Assorbenti',
    type: 'multipla',
    question: 'Qual è il risultato dell\'operazione 18 ÷ 0?',
    options: ['IMPOSSIBILE', '0', '18', '1'],
    correctAnswer: 'IMPOSSIBILE',
    explanation: 'Non esiste nessun numero che moltiplicato per 0 possa fare 18: l\'operazione è impossibile.',
    difficulty: 2
  },
  {
    id: 'vq_29',
    topic: 'Neutri e Assorbenti',
    type: 'multipla',
    question: 'Qual è il risultato dell\'operazione 0 ÷ 18?',
    options: ['0', 'IMPOSSIBILE', '18', '1'],
    correctAnswer: '0',
    explanation: '0 ÷ 18 = 0 perché 0 × 18 = 0.',
    difficulty: 1
  },
  {
    id: 'vq_30',
    topic: 'Neutri e Assorbenti',
    type: 'multipla',
    question: 'Qual è il significato matematico di 0 ÷ 0?',
    options: [
      'INDETERMINATO, perché qualsiasi numero moltiplicato per 0 dà 0 (infinite soluzioni)',
      'Fa 0',
      'Fa 1',
      'È impossibile'
    ],
    correctAnswer: 'INDETERMINATO, perché qualsiasi numero moltiplicato per 0 dà 0 (infinite soluzioni)',
    explanation: '0 ÷ 0 è una forma indeterminata.',
    difficulty: 3
  },
  {
    id: 'vq_31',
    topic: 'Neutri e Assorbenti',
    type: 'applicazione',
    question: 'Calcola: (25 + 18 × 3 - 42) × 0 + 17',
    options: ['17', '0', '42', '1'],
    correctAnswer: '17',
    explanation: 'La parentesi moltiplicata per 0 si annulla interamente a 0. Poi 0 + 17 = 17.',
    difficulty: 2
  },
  {
    id: 'vq_32',
    topic: 'Neutri e Assorbenti',
    type: 'vero_falso',
    question: 'Dividere un numero per 1 ne raddoppia il valore.',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso! a ÷ 1 = a; lascia il numero identico.',
    difficulty: 1
  },
  {
    id: 'vq_33',
    topic: 'Neutri e Assorbenti',
    type: 'problema',
    question: 'In una partita a quiz ogni errore toglie 0 punti. Se un concorrente commette 7 errori, quanti punti perde?',
    options: ['0 punti (7 × 0 = 0)', '7 punti', '1 punto', 'Non si può calcolare'],
    correctAnswer: '0 punti (7 × 0 = 0)',
    explanation: '7 × 0 = 0.',
    difficulty: 1
  },

  // Ulteriori quesiti per garantire un archivio ricco e variegato
  {
    id: 'vq_34',
    topic: 'Commutativa',
    type: 'multipla',
    question: 'In quale delle seguenti espressioni NON è possibile scambiare i termini?',
    options: ['100 - 45', '100 + 45', '100 × 45', 'Nessuna'],
    correctAnswer: '100 - 45',
    explanation: 'La sottrazione non è commutativa: 100 - 45 = 55, ma 45 - 100 = -55.',
    difficulty: 1
  },
  {
    id: 'vq_35',
    topic: 'Associativa',
    type: 'completamento',
    question: 'Completa per ottenere 100: (62 + ___) + 15 = 100 + 15 = 115',
    options: ['38', '48', '28', '18'],
    correctAnswer: '38',
    explanation: '62 + 38 = 100.',
    difficulty: 2
  },
  {
    id: 'vq_36',
    topic: 'Distributiva',
    type: 'completamento',
    question: 'Completa la scomposizione distributiva: 6 × 23 = (6 × 20) + (6 × ___)',
    options: ['3', '23', '18', '20'],
    correctAnswer: '3',
    explanation: '23 = 20 + 3. Quindi (6 × 20) + (6 × 3) = 120 + 18 = 138.',
    difficulty: 1
  },
  {
    id: 'vq_37',
    topic: 'Invariantiva',
    type: 'completamento',
    question: 'Semplifica: 450 ÷ 90 = ___ ÷ 9 = 5',
    options: ['45', '450', '9', '50'],
    correctAnswer: '45',
    explanation: 'Dividendo entrambi per 10: 45 ÷ 9 = 5.',
    difficulty: 1
  },
  {
    id: 'vq_38',
    topic: 'Neutri e Assorbenti',
    type: 'errore',
    question: 'Qual è l\'errore in: 0 ÷ 5 = IMPOSSIBILE?',
    options: [
      '0 ÷ 5 è perfettamente possibile e fa 0! È 5 ÷ 0 a essere impossibile',
      'Fa 5',
      'Fa 1',
      'Nessun errore'
    ],
    correctAnswer: '0 ÷ 5 è perfettamente possibile e fa 0! È 5 ÷ 0 a essere impossibile',
    explanation: 'Zero al dividendo è consentito: 0 ÷ 5 = 0.',
    difficulty: 2
  },
  {
    id: 'vq_39',
    topic: 'Associativa',
    type: 'applicazione',
    question: 'Calcola a mente (5 × 13) × 2 associando i fattori estremi 5 e 2:',
    options: [
      '(5 × 2) × 13 = 10 × 13 = 130',
      '5 × 13 = 65, poi 65 × 2 = 130',
      '1300',
      '26'
    ],
    correctAnswer: '(5 × 2) × 13 = 10 × 13 = 130',
    explanation: '5 × 2 = 10; 10 × 13 = 130.',
    difficulty: 2
  },
  {
    id: 'vq_40',
    topic: 'Invariantiva',
    type: 'problema',
    question: 'Marco deve calcolare 94 - 49 per dare il resto. Applica l\'invariantiva aggiungendo 1 a entrambi i termini. Che operazione ottiene?',
    options: ['95 - 50 = 45', '95 - 49 = 46', '93 - 50 = 43', '94 - 50 = 44'],
    correctAnswer: '95 - 50 = 45',
    explanation: '95 - 50 = 45.',
    difficulty: 1
  }
];
