import { GuidedExercise } from '../types/math';

export const NEUTRAL_ABSORBING_EXERCISES: GuidedExercise[] = [
  // 1. Addizione con zero
  {
    id: 'na_01',
    level: 1,
    type: 'completa_operazione',
    property: 'neutri_assorbenti',
    operation: 'addizione',
    question: 'Completa l\'operazione con l\'elemento neutro dell\'addizione:',
    equationDisplay: '834 + ___ = 834',
    options: ['0', '1', '834', '10'],
    correctAnswer: '0',
    explanation: 'Lo ZERO è l\'elemento neutro dell\'addizione: sommare 0 lascia il numero intatto.',
    hint: 'Quale numero non aggiunge alcuna quantità?',
    xpReward: 25
  },
  {
    id: 'na_02',
    level: 1,
    type: 'vero_falso',
    property: 'neutri_assorbenti',
    operation: 'addizione',
    question: 'Nell\'addizione, lo zero si comporta sia a destra che a sinistra nello stesso modo: a + 0 = 0 + a = a.',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Vero',
    explanation: 'Vero! Poiché l\'addizione è commutativa, lo zero è neutro sia a destra che a sinistra.',
    hint: 'Prova con 5 + 0 e 0 + 5.',
    xpReward: 25
  },

  // 2. Moltiplicazione con uno (neutro)
  {
    id: 'na_03',
    level: 1,
    type: 'completa_operazione',
    property: 'neutri_assorbenti',
    operation: 'moltiplicazione',
    question: 'Qual è l\'elemento neutro della moltiplicazione?',
    equationDisplay: '57 × ___ = 57',
    options: ['1', '0', '57', '10'],
    correctAnswer: '1',
    explanation: 'L\'UNO (1) è l\'elemento neutro della moltiplicazione: moltiplicare per 1 restituisce il fattore stesso.',
    hint: 'Attento a non confonderlo con lo zero!',
    xpReward: 25
  },
  {
    id: 'na_04',
    level: 1,
    type: 'calcolo_mentale',
    property: 'neutri_assorbenti',
    operation: 'moltiplicazione',
    question: 'Calcola il risultato di 1 × 1 × 1 × 49:',
    options: ['49', '1', '0', '4'],
    correctAnswer: '49',
    explanation: 'Poiché 1 è neutro nella moltiplicazione, qualsiasi serie di moltiplicazioni per 1 non varia il 49.',
    hint: 'L\'1 è come uno specchio!',
    xpReward: 25
  },

  // 3. Moltiplicazione con zero (assorbente)
  {
    id: 'na_05',
    level: 1,
    type: 'completa_operazione',
    property: 'neutri_assorbenti',
    operation: 'moltiplicazione',
    question: 'Completa l\'uguaglianza con l\'elemento assorbente della moltiplicazione:',
    equationDisplay: '2.450 × 0 = ___',
    options: ['0', '2.450', '1', '245'],
    correctAnswer: '0',
    explanation: 'Lo ZERO è l\'elemento assorbente della moltiplicazione: qualsiasi numero moltiplicato per 0 diventa 0.',
    hint: 'Lo zero annulla il prodotto.',
    xpReward: 25
  },
  {
    id: 'na_06',
    level: 2,
    type: 'calcolo_mentale',
    property: 'neutri_assorbenti',
    operation: 'moltiplicazione',
    question: 'Qual è il risultato di (45 + 13 × 2 - 8) × 0?',
    options: ['0', '63', '1', 'Impossibile'],
    correctAnswer: '0',
    explanation: 'Per la proprietà assorbente dello zero, l\'intera parentesi viene moltiplicata per 0 dando come risultato 0 senza dover calcolare l\'interno!',
    hint: 'Tutto ciò che viene moltiplicato per zero fa zero.',
    xpReward: 30
  },
  {
    id: 'na_07',
    level: 2,
    type: 'vero_falso',
    property: 'neutri_assorbenti',
    operation: 'moltiplicazione',
    question: 'Se il prodotto di due numeri è zero (a × b = 0), allora almeno uno dei due fattori deve essere necessariamente zero.',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Vero',
    explanation: 'Vero! Questa è la fondamentale Legge di Annullamento del Prodotto.',
    hint: 'Due numeri diversi da zero possono dare zero come prodotto?',
    xpReward: 30
  },

  // 4. Divisione con uno
  {
    id: 'na_08',
    level: 1,
    type: 'completa_operazione',
    property: 'neutri_assorbenti',
    operation: 'divisione',
    question: 'Calcola: 92 ÷ 1 = ___',
    equationDisplay: '92 ÷ 1',
    options: ['92', '1', '0', 'Impossibile'],
    correctAnswer: '92',
    explanation: 'Dividere per 1 lascia il numero invariato. L\'uno è elemento neutro a destra della divisione.',
    hint: '92 diviso in un solo gruppo dà 92.',
    xpReward: 25
  },
  {
    id: 'na_09',
    level: 1,
    type: 'trova_errore',
    property: 'neutri_assorbenti',
    operation: 'divisione',
    question: 'Quale affermazione è ERRATA riguardo all\'uno nella divisione?',
    options: [
      '1 ÷ 15 = 15',
      '15 ÷ 1 = 15',
      '1 ÷ 1 = 1',
      'a ÷ 1 = a'
    ],
    correctAnswer: '1 ÷ 15 = 15',
    explanation: '1 ÷ 15 fa la frazione 1/15, NON 15! L\'uno è elemento neutro solo se posto al divisore (a destra), non al dividendo.',
    hint: 'La divisione non è commutativa: l\'ordine conta!',
    xpReward: 35
  },

  // 5. Divisione con zero al dividendo
  {
    id: 'na_10',
    level: 1,
    type: 'calcolo_mentale',
    property: 'neutri_assorbenti',
    operation: 'divisione',
    question: 'Calcola il risultato di 0 ÷ 8:',
    equationDisplay: '0 ÷ 8 = ?',
    options: ['0', '8', '1', 'Impossibile'],
    correctAnswer: '0',
    explanation: '0 ÷ 8 = 0 perché 0 × 8 = 0. Se hai 0 oggetti da spartire tra 8 persone, a ciascuno spettano 0 oggetti.',
    hint: 'Zero diviso qualsiasi numero non nullo fa zero.',
    xpReward: 25
  },

  // 6. Divisione PER zero (IMPOSSIBILE)
  {
    id: 'na_11',
    level: 2,
    type: 'scegli_trasformazione',
    property: 'neutri_assorbenti',
    operation: 'divisione',
    question: 'Qual è il risultato dell\'operazione 14 ÷ 0?',
    equationDisplay: '14 ÷ 0',
    options: [
      'È un\'operazione IMPOSSIBILE: non esiste nessun numero che moltiplicato per 0 dia 14',
      'Fa 0',
      'Fa 14',
      'Fa 1'
    ],
    correctAnswer: 'È un\'operazione IMPOSSIBILE: non esiste nessun numero che moltiplicato per 0 dia 14',
    explanation: 'Se 14 ÷ 0 = c, allora dovrebbe essere c × 0 = 14. Ma qualsiasi c moltiplicato per 0 fa 0, mai 14! Quindi è IMPOSSIBILE.',
    hint: 'Ricorda il divieto assoluto della matematica: mai dividere per zero!',
    xpReward: 40
  },
  {
    id: 'na_12',
    level: 2,
    type: 'vero_falso',
    property: 'neutri_assorbenti',
    operation: 'divisione',
    question: 'Dire che 5 ÷ 0 = 0 è matematicamente corretto.',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso! 5 ÷ 0 NON fa 0, è IMPOSSIBILE. Se facesse 0, allora per la prova inversa 0 × 0 dovrebbe fare 5, il che è assurdo.',
    hint: 'Fai la prova della moltiplicazione inversa.',
    xpReward: 35
  },

  // 7. Il caso 0 ÷ 0 (INDETERMINATO)
  {
    id: 'na_13',
    level: 3,
    type: 'scegli_trasformazione',
    property: 'neutri_assorbenti',
    operation: 'divisione',
    question: 'Qual è il significato matematico rigoroso dell\'operazione 0 ÷ 0?',
    equationDisplay: '0 ÷ 0',
    options: [
      'È INDETERMINATA, perché qualsiasi numero moltiplicato per 0 dà 0 (ci sono infinite soluzioni)',
      'Fa 0',
      'Fa 1',
      'È impossibile'
    ],
    correctAnswer: 'È INDETERMINATA, perché qualsiasi numero moltiplicato per 0 dà 0 (ci sono infinite soluzioni)',
    explanation: '0 ÷ 0 è INDETERMINATO: cerchiamo un numero che moltiplicato per 0 dia 0. Qualunque numero va bene (3×0=0, 7×0=0), quindi non ha un risultato unico.',
    hint: 'Diverso da impossibile: qui le soluzioni sono troppe (infinite)!',
    xpReward: 45
  },

  // 8. Distinzione Neutro vs Assorbente
  {
    id: 'na_14',
    level: 2,
    type: 'abbina',
    property: 'neutri_assorbenti',
    operation: 'moltiplicazione',
    question: 'Individua il ruolo corretto dello zero e dell\'uno:',
    options: [
      'Zero = neutro addizione e assorbente moltiplicazione; Uno = neutro moltiplicazione',
      'Zero = sempre neutro in tutte le operazioni',
      'Uno = neutro addizione e assorbente moltiplicazione',
      'Zero e uno sono entrambi assorbenti'
    ],
    correctAnswer: 'Zero = neutro addizione e assorbente moltiplicazione; Uno = neutro moltiplicazione',
    explanation: 'Esatto: 0 non cambia la somma (neutro) ma azzera il prodotto (assorbente). 1 non cambia il prodotto (neutro).',
    hint: 'Neutro = lascia uguale; Assorbente = trasforma in zero.',
    xpReward: 35
  },
  {
    id: 'na_15',
    level: 1,
    type: 'vero_falso',
    property: 'neutri_assorbenti',
    operation: 'addizione',
    question: 'L\'uno (1) è l\'elemento neutro dell\'addizione.',
    equationDisplay: '5 + 1 = 5 ?',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso! 5 + 1 fa 6 (il numero è cambiato!). L\'elemento neutro dell\'addizione è lo ZERO.',
    hint: 'Se aggiungi 1 mela a 5 mele, ne hai ancora 5?',
    xpReward: 25
  },

  // 9. Errori comuni e completamenti
  {
    id: 'na_16',
    level: 2,
    type: 'trova_errore',
    property: 'neutri_assorbenti',
    operation: 'moltiplicazione',
    question: 'In quale delle seguenti espressioni c\'è un ERRORE?',
    options: [
      '12 × 0 = 12',
      '12 + 0 = 12',
      '12 × 1 = 12',
      '12 ÷ 1 = 12'
    ],
    correctAnswer: '12 × 0 = 12',
    explanation: '12 × 0 fa ZERO, non 12! Lo zero nella moltiplicazione annulla il prodotto.',
    hint: 'Trova l\'operazione che tratta lo zero come se fosse 1.',
    xpReward: 35
  },
  {
    id: 'na_17',
    level: 2,
    type: 'completa_operazione',
    property: 'neutri_assorbenti',
    operation: 'moltiplicazione',
    question: 'Completa: (35 × 1) + (18 × 0) = ___',
    options: ['35', '0', '53', '1'],
    correctAnswer: '35',
    explanation: '35 × 1 = 35 (1 neutro). 18 × 0 = 0 (0 assorbente). 35 + 0 = 35 (0 neutro nell\'addizione).',
    hint: 'Calcola i due prodotti separatamente e poi sommali.',
    xpReward: 35
  },
  {
    id: 'na_18',
    level: 3,
    type: 'calcolo_mentale',
    property: 'neutri_assorbenti',
    operation: 'divisione',
    question: 'Qual è il valore di (0 ÷ 45) + (45 ÷ 1)?',
    options: ['45', '0', '1', 'Impossibile'],
    correctAnswer: '45',
    explanation: '0 ÷ 45 = 0, e 45 ÷ 1 = 45. La somma è 0 + 45 = 45.',
    hint: 'Zero diviso 45 fa zero; 45 diviso 1 fa 45.',
    xpReward: 40
  },
  {
    id: 'na_19',
    level: 2,
    type: 'problema',
    property: 'neutri_assorbenti',
    operation: 'moltiplicazione',
    question: 'Un pasticciere prepara 8 vassoi. Su ogni vasetto mette 0 fragole. Quante fragole ha usato in totale?',
    options: ['0 fragole (8 × 0 = 0)', '8 fragole', '1 fragola', 'Non si può sapere'],
    correctAnswer: '0 fragole (8 × 0 = 0)',
    explanation: '8 vassoi con 0 fragole ciascuno contengono in tutto 8 × 0 = 0 fragole.',
    hint: 'La moltiplicazione per zero esprime l\'assenza di elementi in ogni gruppo.',
    xpReward: 30
  },
  {
    id: 'na_20',
    level: 3,
    type: 'problema',
    property: 'neutri_assorbenti',
    operation: 'divisione',
    question: 'Un professore dice alla classe: "Dividete 20 caramelle a zero alunni". Qual è la risposta corretta degli studenti?',
    options: [
      '"Professore, questa divisione è impossibile: non ha senso dividere per zero!"',
      '"A ciascuno toccano zero caramelle"',
      '"A ciascuno toccano venti caramelle"',
      '"La risposta è indeterminata"'
    ],
    correctAnswer: '"Professore, questa divisione è impossibile: non ha senso dividere per zero!"',
    explanation: 'Dividere una quantità positiva per zero è una richiesta priva di senso matematico: è impossibile.',
    hint: 'Dividere un numero non nullo per zero non è mai possibile.',
    xpReward: 45
  },
  {
    id: 'na_21',
    level: 3,
    type: 'vero_falso',
    property: 'neutri_assorbenti',
    operation: 'sottrazione',
    question: 'Nella sottrazione lo zero è elemento neutro sia a destra che a sinistra: a - 0 = a e 0 - a = a.',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso! a - 0 fa a, ma 0 - a nei numeri naturali è impossibile (nei relativi fa -a). Lo zero NON è neutro a sinistra!',
    hint: '0 - 5 non fa 5!',
    xpReward: 40
  },
  {
    id: 'na_22',
    level: 3,
    type: 'scegli_trasformazione',
    property: 'neutri_assorbenti',
    operation: 'divisione',
    question: 'Quale delle seguenti scritture rappresenta l\'unica situazione in cui la divisione ha INFINITE soluzioni?',
    options: ['0 ÷ 0 (forma indeterminata)', '15 ÷ 0 (forma impossibile)', '0 ÷ 15', '15 ÷ 1'],
    correctAnswer: '0 ÷ 0 (forma indeterminata)',
    explanation: '0 ÷ 0 ha infinite soluzioni perché qualunque numero moltiplicato per zero dà zero.',
    hint: 'Cerca la forma indeterminata.',
    xpReward: 45
  }
];
