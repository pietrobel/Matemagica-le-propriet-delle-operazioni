import { GuidedExercise } from '../types/math';

export const GUIDED_EXERCISES: GuidedExercise[] = [
  // =========================================================================
  // LIVELLO 1: FACILE – COMPRENDERE LA REGOLA FONDAMENTALE
  // =========================================================================

  // --- Proprietà Commutativa (Addizione e Moltiplicazione) ---
  {
    id: 'ex_c1_01',
    level: 1,
    type: 'completa_operazione',
    property: 'commutativa',
    operation: 'addizione',
    question: 'Completa l\'uguaglianza applicando la proprietà commutativa dell\'addizione:',
    equationDisplay: '29 + 45 = ___ + 29',
    options: ['45', '74', '29', '16'],
    correctAnswer: '45',
    explanation: 'Proprietà Commutativa: invertendo l\'ordine degli addendi (29 + 45 = 45 + 29), la somma non cambia.',
    hint: 'I due numeri si scambiano semplicemente di posto!',
    xpReward: 30
  },
  {
    id: 'ex_c1_02',
    level: 1,
    type: 'vero_falso',
    property: 'commutativa',
    operation: 'addizione',
    question: 'La proprietà commutativa permette di scrivere 14 + 83 come 83 + 14 senza alterare il risultato.',
    equationDisplay: '14 + 83 = 83 + 14',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Vero',
    explanation: 'Vero! a + b = b + a per qualsiasi coppia di numeri naturali.',
    hint: 'Verifica se l\'ordine dei numeri è stato invertito mantenendo la somma identica.',
    xpReward: 25
  },
  {
    id: 'ex_c1_03',
    level: 1,
    type: 'completa_operazione',
    property: 'commutativa',
    operation: 'moltiplicazione',
    question: 'Completa l\'operazione applicando la proprietà commutativa della moltiplicazione:',
    equationDisplay: '7 × 12 = 12 × ___',
    options: ['7', '84', '12', '14'],
    correctAnswer: '7',
    explanation: 'Proprietà Commutativa della moltiplicazione: a × b = b × a. Scambiando i fattori il prodotto rimane 84.',
    hint: 'Quale fattore manca a destra dello scambio?',
    xpReward: 30
  },
  {
    id: 'ex_c1_04',
    level: 1,
    type: 'vero_falso',
    property: 'commutativa',
    operation: 'sottrazione',
    question: 'Possiamo applicare la proprietà commutativa anche alla sottrazione: 15 - 8 = 8 - 15.',
    equationDisplay: '15 - 8 = 8 - 15 ?',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso! La sottrazione NON è commutativa. 15 - 8 fa 7, mentre 8 - 15 non è possibile nell\'insieme dei numeri naturali.',
    hint: 'Se hai 8 caramelle puoi mangiarne 15?',
    xpReward: 30
  },
  {
    id: 'ex_c1_05',
    level: 1,
    type: 'scegli_trasformazione',
    property: 'commutativa',
    operation: 'moltiplicazione',
    question: 'Quale trasformazione mostra ESCLUSIVAMENTE la proprietà commutativa?',
    equationDisplay: 'Partenza: 6 × 15',
    options: [
      '15 × 6',
      '6 × (10 + 5)',
      '(2 × 3) × 15',
      '6 × 15 × 1'
    ],
    correctAnswer: '15 × 6',
    explanation: '15 × 6 inverte semplicemente l\'ordine dei fattori senza scomposizioni o parentesi aggiuntive.',
    hint: 'Cerca l\'opzione che si limita a scambiare di posto i due fattori.',
    xpReward: 30
  },

  // --- Proprietà Associativa (Addizione e Moltiplicazione) ---
  {
    id: 'ex_a1_01',
    level: 1,
    type: 'completa_operazione',
    property: 'associativa',
    operation: 'addizione',
    question: 'Completa l\'espressione senza cambiare l\'ordine dei numeri per mostrare la proprietà associativa pura:',
    equationDisplay: '(8 + 2) + 5 = 8 + (___ + 5)',
    options: ['2', '8', '10', '5'],
    correctAnswer: '2',
    explanation: 'Proprietà Associativa pura: la sequenza dei numeri 8, 2, 5 NON cambia; cambiano solo le parentesi: (8 + 2) + 5 = 8 + (2 + 5).',
    hint: 'I numeri devono mantenere lo stesso ordine da sinistra a destra (8, poi ?, poi 5).',
    xpReward: 35
  },
  {
    id: 'ex_a1_02',
    level: 1,
    type: 'scegli_trasformazione',
    property: 'associativa',
    operation: 'addizione',
    question: 'Quale delle seguenti espressioni applica CORRETTAMENTE la proprietà associativa all\'espressione 6 + (4 + 9) senza alterare l\'ordine dei termini?',
    equationDisplay: 'Espressione di partenza: 6 + (4 + 9)',
    options: [
      '(6 + 4) + 9',
      '(6 + 9) + 4',
      '9 + (4 + 6)',
      '6 + 4 + 9 = 19'
    ],
    correctAnswer: '(6 + 4) + 9',
    explanation: 'L\'ordine 6, 4, 9 rimane invariato, ma le parentesi sono state spostate sui primi due addendi per calcolare subito 6 + 4 = 10.',
    hint: 'L\'ordine dei numeri deve rimanere 6, poi 4, poi 9.',
    xpReward: 35
  },
  {
    id: 'ex_a1_03',
    level: 1,
    type: 'calcolo_mentale',
    property: 'associativa',
    operation: 'addizione',
    question: 'Quale operazione conviene svolgere per prima nell\'espressione (25 + 75) + 16 per facilitare il calcolo a mente?',
    equationDisplay: '(25 + 75) + 16',
    options: [
      '25 + 75 perché forma subito la centena tonda 100',
      '75 + 16 per togliere il numero più grande',
      '25 + 16',
      'Nessuna, l\'ordine non offre vantaggi'
    ],
    correctAnswer: '25 + 75 perché forma subito la centena tonda 100',
    explanation: '25 + 75 = 100. Sommare 100 + 16 dà 116 istantaneamente!',
    hint: 'Cerca i complementari che fanno 100.',
    xpReward: 30
  },
  {
    id: 'ex_a1_04',
    level: 1,
    type: 'completa_operazione',
    property: 'associativa',
    operation: 'moltiplicazione',
    question: 'Completa l\'uguaglianza applicando la proprietà associativa della moltiplicazione:',
    equationDisplay: '(4 × 5) × 3 = 4 × (___ × 3)',
    options: ['5', '20', '4', '15'],
    correctAnswer: '5',
    explanation: 'La proprietà associativa sposta le parentesi: (4 × 5) × 3 = 4 × (5 × 3). L\'ordine dei fattori 4, 5, 3 non varia.',
    hint: 'Il secondo fattore della sequenza è il 5.',
    xpReward: 30
  },
  {
    id: 'ex_a1_05',
    level: 1,
    type: 'vero_falso',
    property: 'associativa',
    operation: 'addizione',
    question: 'La proprietà associativa afferma che cambiando l\'ordine di successione dei numeri la somma non cambia.',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso! Cambiare l\'ordine di successione è la definizione della proprietà COMMUTATIVA. L\'associativa riguarda il raggruppamento (sostituire a due addendi la loro somma parziale).',
    hint: 'Ordine = Commutativa; Raggruppamento = Associativa!',
    xpReward: 35
  },

  // --- Proprietà Distributiva (Moltiplicazione) ---
  {
    id: 'ex_d1_01',
    level: 1,
    type: 'completa_operazione',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'Completa l\'applicazione della proprietà distributiva rispetto all\'addizione:',
    equationDisplay: '5 × (10 + 4) = (5 × 10) + (5 × ___)',
    options: ['4', '14', '50', '20'],
    correctAnswer: '4',
    explanation: 'Il moltiplicatore 5 si distribuisce a entrambi i termini della parentesi: (5 × 10) + (5 × 4) = 50 + 20 = 70.',
    hint: 'Il 5 deve moltiplicare sia il primo addendo (10) sia il secondo addendo.',
    xpReward: 30
  },
  {
    id: 'ex_d1_02',
    level: 1,
    type: 'scegli_trasformazione',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'Quale espressione sviluppa correttamente 7 × (20 + 3)?',
    equationDisplay: '7 × (20 + 3)',
    options: [
      '(7 × 20) + (7 × 3)',
      '(7 × 20) + 3',
      '(7 + 20) × (7 + 3)',
      '7 × 20 × 3'
    ],
    correctAnswer: '(7 × 20) + (7 × 3)',
    explanation: 'La proprietà distributiva richiede che il 7 moltiplichi entrambi i termini: 140 + 21 = 161.',
    hint: 'Non dimenticare di moltiplicare il 7 anche per il 3!',
    xpReward: 30
  },
  {
    id: 'ex_d1_03',
    level: 1,
    type: 'vero_falso',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'La proprietà distributiva della moltiplicazione vale anche rispetto alla sottrazione: a × (b - c) = (a × b) - (a × c).',
    equationDisplay: 'a × (b - c) = (a × b) - (a × c)',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Vero',
    explanation: 'Vero! Si distribuisce il fattore a sia al minuendo che al sottraendo e si esegue la differenza tra i prodotti.',
    hint: 'Funziona sia con il segno + che con il segno - dentro la parentesi.',
    xpReward: 25
  },

  // --- Proprietà Invariantiva (Sottrazione e Divisione) ---
  {
    id: 'ex_i1_01',
    level: 1,
    type: 'completa_operazione',
    property: 'invariantiva',
    operation: 'sottrazione',
    question: 'Completa l\'applicazione della proprietà invariantiva aggiungendo lo stesso numero:',
    equationDisplay: '54 - 19 = (54 + 1) - (19 + ___)',
    options: ['1', '2', '20', '35'],
    correctAnswer: '1',
    explanation: 'Proprietà Invariantiva: aggiungendo 1 a entrambi i termini, 54 - 19 diventa 55 - 20 = 35. Il risultato non cambia.',
    hint: 'Per non alterare la differenza devi aggiungere esattamente la stessa quantità a entrambi i termini!',
    xpReward: 30
  },
  {
    id: 'ex_i1_02',
    level: 1,
    type: 'completa_operazione',
    property: 'invariantiva',
    operation: 'divisione',
    question: 'Completa la divisione applicando l\'invariantiva (dividendo entrambi per 10):',
    equationDisplay: '180 ÷ 30 = (180 ÷ 10) ÷ (30 ÷ ___)',
    options: ['10', '3', '30', '6'],
    correctAnswer: '10',
    explanation: 'Dividendo entrambi i termini per 10 si ottiene 18 ÷ 3 = 6. Il quoziente resta invariato.',
    hint: 'Dividi sia dividendo che divisore per lo stesso numero diverso da zero.',
    xpReward: 30
  },
  {
    id: 'ex_i1_03',
    level: 1,
    type: 'vero_falso',
    property: 'invariantiva',
    operation: 'sottrazione',
    question: 'Se aggiungo 5 al minuendo di una sottrazione, per mantenere invariata la differenza devo sottrarre 5 al sottraendo.',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso! Devi AGGIUNGERE 5 anche al sottraendo. Se fai operazioni opposte, la differenza cambia di 10!',
    hint: 'La bilancia resta in pari solo se metti o togli lo stesso peso da entrambi i piatti.',
    xpReward: 30
  },
  {
    id: 'ex_i1_04',
    level: 1,
    type: 'vero_falso',
    property: 'invariantiva',
    operation: 'divisione',
    question: 'Nella proprietà invariantiva della divisione posso moltiplicare o dividere per zero.',
    options: ['Vero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso! Il numero per cui si moltiplica o divide deve essere TASSATIVAMENTE DIVERSO DA ZERO (k ≠ 0).',
    hint: 'Dividere per zero è una contraddizione impossibile in matematica.',
    xpReward: 30
  },

  // =========================================================================
  // LIVELLO 2: INTERMEDIO – APPLICARE LE PROPRIETÀ E CALCOLO STRATEGICO
  // =========================================================================

  // --- Commutativa & Associativa combinate e avanzate ---
  {
    id: 'ex_l2_01',
    level: 2,
    type: 'calcolo_mentale',
    property: 'associativa',
    operation: 'addizione',
    question: 'Quale coppia di addendi conviene associare per prima nel calcolo di 17 + 48 + 52 + 83?',
    equationDisplay: '17 + 48 + 52 + 83',
    options: [
      '(17 + 83) e (48 + 52)',
      '(17 + 48) e (52 + 83)',
      '(17 + 52) e (48 + 83)',
      'Calcolare in fila da sinistra a destra'
    ],
    correctAnswer: '(17 + 83) e (48 + 52)',
    explanation: '17 + 83 = 100 e 48 + 52 = 100! La somma diventa 100 + 100 = 200 in due secondi netti.',
    hint: 'Cerca le unità che sommate fanno 10 (7+3 e 8+2).',
    xpReward: 40
  },
  {
    id: 'ex_l2_02',
    level: 2,
    type: 'trova_errore',
    property: 'associativa',
    operation: 'addizione',
    question: 'Uno studente ha svolto il seguente esercizio. In quale passaggio ha commesso un errore?',
    equationDisplay: 'Calcolo di: 45 + 28\nPassaggio 1: 45 + (20 + 8)\nPassaggio 2: (45 + 20) + 8\nPassaggio 3: 65 + 8 = 74',
    options: [
      'Passaggio 1 (scomposizione errata)',
      'Passaggio 2 (associativa errata)',
      'Passaggio 3 (errore di calcolo nella somma finale: 65 + 8 fa 73, non 74)',
      'Non c\'è nessun errore'
    ],
    correctAnswer: 'Passaggio 3 (errore di calcolo nella somma finale: 65 + 8 fa 73, non 74)',
    explanation: 'I passaggi 1 e 2 applicano perfettamente la proprietà dissociativa e associativa. L\'errore è nel calcolo aritmetico finale: 65 + 8 = 73.',
    hint: 'Controlla l\'addizione 65 + 8.',
    xpReward: 45
  },
  {
    id: 'ex_l2_03',
    level: 2,
    type: 'calcolo_mentale',
    property: 'associativa',
    operation: 'moltiplicazione',
    question: 'Qual è il modo più rapido ed elegante per calcolare a mente 4 × 19 × 25?',
    equationDisplay: '4 × 19 × 25',
    options: [
      'Associare 4 × 25 = 100, poi calcolare 100 × 19 = 1900',
      'Moltiplicare 4 × 19 = 76, poi fare 76 × 25 in colonna',
      'Moltiplicare 19 × 25 poi per 4',
      'Scomporre il 19 in 10 + 9'
    ],
    correctAnswer: 'Associare 4 × 25 = 100, poi calcolare 100 × 19 = 1900',
    explanation: '4 × 25 è la coppia d\'oro che fa 100! Moltiplicare 19 per 100 aggiunge solo due zeri: 1900.',
    hint: '4 e 25 sono fattori complementari del 100!',
    xpReward: 40
  },
  {
    id: 'ex_l2_04',
    level: 2,
    type: 'scegli_trasformazione',
    property: 'associativa',
    operation: 'addizione',
    question: 'Individua quale espressione permette di ottenere più facilmente una decina tonda applicando la forma dissociativa a 36 + 17:',
    equationDisplay: '36 + 17',
    options: [
      '36 + (4 + 13) = (36 + 4) + 13 = 40 + 13 = 53',
      '36 + (10 + 7) = 46 + 7 = 53',
      '17 + 36',
      '(30 + 6) + (10 + 7)'
    ],
    correctAnswer: '36 + (4 + 13) = (36 + 4) + 13 = 40 + 13 = 53',
    explanation: 'Scomponendo 17 in 4 + 13, il 4 si unisce al 36 creando la cifra tonda 40. 40 + 13 = 53 è immediato.',
    hint: 'A 36 mancano 4 unità per arrivare a 40!',
    xpReward: 40
  },
  {
    id: 'ex_l2_05',
    level: 2,
    type: 'trova_errore',
    property: 'commutativa',
    operation: 'sottrazione',
    question: 'In quale passaggio dello svolgimento c\'è un grave errore concettuale?',
    equationDisplay: 'Calcolo di: 50 - 30 + 10\nPassaggio A: (50 - 30) + 10 = 20 + 10 = 30\nPassaggio B alternativo di Marco: 50 - (30 + 10) = 50 - 40 = 10',
    options: [
      'Il Passaggio A è sbagliato',
      'Il Passaggio B è sbagliato perché ha inserito una parentesi alterando il segno del 10: non si può applicare l\'associativa mescolando addizione e sottrazione in questo modo!',
      'Entrambi i procedimenti sono corretti',
      'Nessuno dei due è corretto'
    ],
    correctAnswer: 'Il Passaggio B è sbagliato perché ha inserito una parentesi alterando il segno del 10: non si può applicare l\'associativa mescolando addizione e sottrazione in questo modo!',
    explanation: '50 - 30 + 10 fa 30. Se scrivi 50 - (30 + 10) stai sottraendo sia il 30 che il 10, ottenendo 10 (errore di precedenza e parentesi).',
    hint: 'Attenzione alle parentesi precedute dal segno meno!',
    xpReward: 45
  },

  // --- Distributiva Intermedia ---
  {
    id: 'ex_l2_06',
    level: 2,
    type: 'calcolo_mentale',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'Come calcolare a mente 6 × 39 sfruttando la distributiva rispetto alla sottrazione?',
    equationDisplay: '6 × 39',
    options: [
      '6 × (40 - 1) = (6 × 40) - (6 × 1) = 240 - 6 = 234',
      '6 × (30 + 9) = 180 + 54 = 234',
      'In colonna con il riporto',
      '39 × 6'
    ],
    correctAnswer: '6 × (40 - 1) = (6 × 40) - (6 × 1) = 240 - 6 = 234',
    explanation: 'Pensare a 39 come 40 - 1 è la scorciatoia mentale più pulita: 240 - 6 = 234 in un secondo!',
    hint: '39 è vicinissimo alla decina tonda 40.',
    xpReward: 40
  },
  {
    id: 'ex_l2_07',
    level: 2,
    type: 'completa_operazione',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'Raccogli il fattore comune applicando la proprietà distributiva al contrario:',
    equationDisplay: '(15 × 8) + (15 × 2) = 15 × (___ + 2)',
    options: ['8', '15', '10', '120'],
    correctAnswer: '8',
    explanation: 'Il fattore comune 15 viene raccolto: 15 × (8 + 2) = 15 × 10 = 150!',
    hint: 'Qual è il primo fattore che era moltiplicato per 15?',
    xpReward: 40
  },
  {
    id: 'ex_l2_08',
    level: 2,
    type: 'trova_risultato',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'Calcola applicando il raccoglimento a fattore comune: (27 × 35) + (27 × 65)',
    equationDisplay: '(27 × 35) + (27 × 65)',
    options: ['2700', '270', '27000', '1890'],
    correctAnswer: '2700',
    explanation: '27 × (35 + 65) = 27 × 100 = 2700. Senza calcolare le singole moltiplicazioni lunghe!',
    hint: 'Nota che 35 + 65 fa 100!',
    xpReward: 45
  },

  // --- Invariantiva Intermedia ---
  {
    id: 'ex_l2_09',
    level: 2,
    type: 'calcolo_mentale',
    property: 'invariantiva',
    operation: 'sottrazione',
    question: 'Calcola a mente 93 - 48 applicando la trasformazione invariantiva ottimale (+2):',
    equationDisplay: '93 - 48 = (93 + 2) - (48 + 2) = ?',
    options: ['95 - 50 = 45', '95 - 48 = 47', '91 - 46 = 45', '93 - 50 = 43'],
    correctAnswer: '95 - 50 = 45',
    explanation: 'Aggiungendo 2 a entrambi, 48 diventa 50 e 93 diventa 95: 95 - 50 = 45.',
    hint: 'Il sottraendo 48 diventa 50 aggiungendo 2.',
    xpReward: 40
  },
  {
    id: 'ex_l2_10',
    level: 2,
    type: 'completa_procedimento',
    property: 'invariantiva',
    operation: 'sottrazione',
    question: 'Completa il passaggio mancante per calcolare 1000 - 364 con la tecnica del -1:',
    equationDisplay: '1000 - 364 = (1000 - 1) - (364 - 1) = 999 - [ ? ] = 636',
    options: ['363', '364', '365', '360'],
    correctAnswer: '363',
    explanation: '364 - 1 = 363. L\'operazione diventa 999 - 363 = 636 senza alcun prestito!',
    hint: 'Sottrai 1 da 364.',
    xpReward: 40
  },
  {
    id: 'ex_l2_11',
    level: 2,
    type: 'calcolo_mentale',
    property: 'invariantiva',
    operation: 'divisione',
    question: 'Qual è il risultato di 350 ÷ 5 calcolato con la regola invariantiva del raddoppio (× 2)?',
    equationDisplay: '350 ÷ 5 = (350 × 2) ÷ (5 × 2) = ?',
    options: ['700 ÷ 10 = 70', '700 ÷ 5 = 140', '350 ÷ 10 = 35', '70'],
    correctAnswer: '700 ÷ 10 = 70',
    explanation: 'Raddoppiando entrambi i termini: 700 ÷ 10 = 70. Immediato e a prova di errore.',
    hint: '350 × 2 = 700 e 5 × 2 = 10.',
    xpReward: 40
  },
  {
    id: 'ex_l2_12',
    level: 2,
    type: 'trova_errore',
    property: 'invariantiva',
    operation: 'divisione',
    question: 'Uno studente calcola 120 ÷ 40 facendo (120 ÷ 10) ÷ (40 ÷ 5). Perché questo passaggio è errato?',
    equationDisplay: '(120 ÷ 10) ÷ (40 ÷ 5)',
    options: [
      'Perché per l\'invariantiva dividendo e divisore DEVONO essere divisi per lo STESSO numero (entrambi per 10)',
      'Perché 120 non è divisibile per 10',
      'Perché 40 non è divisibile per 5',
      'Non è errato'
    ],
    correctAnswer: 'Perché per l\'invariantiva dividendo e divisore DEVONO essere divisi per lo STESSO numero (entrambi per 10)',
    explanation: 'La regola impone che il fattore divisore k sia lo stesso per entrambi i termini. Dividere uno per 10 e l\'altro per 5 altera completamente il quoziente!',
    hint: 'Stesso divisore per entrambi i piatti!',
    xpReward: 45
  },

  // =========================================================================
  // LIVELLO 3: AVANZATO – PROBLEMI REALI, DIMOSTRAZIONI E SFIDE MULTIPLE
  // =========================================================================

  // --- Problemi e situazioni articolate ---
  {
    id: 'ex_l3_01',
    level: 3,
    type: 'problema',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'Per la recita scolastica, la scuola acquista 24 costumi a €15 ciascuno e 24 maschere a €5 ciascuna. Quale espressione permette di calcolare la spesa complessiva nel modo più rapido?',
    options: [
      '24 × (15 + 5) = 24 × 20 = €480',
      '(24 × 15) + (24 × 5) calcolando prima 360 + 120 = €480',
      '24 + 15 + 5 = 44',
      '(24 + 24) × (15 + 5) = 48 × 20 = €960'
    ],
    correctAnswer: '24 × (15 + 5) = 24 × 20 = €480',
    explanation: 'Raccogliendo il fattore comune 24 per la proprietà distributiva: 24 × (15 + 5) = 24 × 20 = €480. Calcolo mentale pulito!',
    hint: 'Il costo per ogni alunno è (15 + 5) = €20.',
    xpReward: 50
  },
  {
    id: 'ex_l3_02',
    level: 3,
    type: 'problema',
    property: 'associativa',
    operation: 'moltiplicazione',
    question: 'In una serra ci sono 8 ripiani. Su ogni ripiano ci sono 125 vasetti, e ogni vasetto contiene 7 piantine. Quante piantine ci sono in totale?',
    options: [
      '(8 × 125) × 7 = 1000 × 7 = 7000 piantine',
      '8 × (125 × 7) = 8 × 875 = 7000 piantine',
      '(8 + 125) × 7',
      '8 × 125 + 7'
    ],
    correctAnswer: '(8 × 125) × 7 = 1000 × 7 = 7000 piantine',
    explanation: 'Associando 8 × 125 otteniamo esattamente il migliaio tondo 1000! 1000 × 7 = 7000 piantine in un battibaleno.',
    hint: '8 × 125 è una delle combinazioni speciali che dà 1000!',
    xpReward: 50
  },
  {
    id: 'ex_l3_03',
    level: 3,
    type: 'problema',
    property: 'invariantiva',
    operation: 'sottrazione',
    question: 'Un aereo decolla ad un\'altitudine di 812 metri e sale fino a 3298 metri. Qual è il dislivello percorso? Semplifica il calcolo con la proprietà invariantiva (-12):',
    options: [
      '(3298 - 12) - (812 - 12) = 3286 - 800 = 2486 metri',
      '3298 - 812 = 2486 metri in colonna',
      '(3298 + 12) - (812 - 12)',
      '3298 - 800'
    ],
    correctAnswer: '(3298 - 12) - (812 - 12) = 3286 - 800 = 2486 metri',
    explanation: 'Togliendo 12 a entrambi i termini, 812 diventa 800 e 3298 diventa 3286. 3286 - 800 = 2486 m a mente.',
    hint: 'Togliere 12 a entrambi elimina le unità fastidiose del sottraendo.',
    xpReward: 50
  },
  {
    id: 'ex_l3_04',
    level: 3,
    type: 'completa_procedimento',
    property: 'distributiva',
    operation: 'divisione',
    question: 'Completa la scomposizione per calcolare 96 ÷ 4 applicando la proprietà distributiva della divisione:',
    equationDisplay: '96 ÷ 4 = (80 + 16) ÷ 4 = (80 ÷ 4) + (16 ÷ 4) = 20 + [ ? ] = 24',
    options: ['4', '16', '6', '8'],
    correctAnswer: '4',
    explanation: '16 ÷ 4 = 4. Quindi 20 + 4 = 24.',
    hint: 'Quanto fa 16 diviso 4?',
    xpReward: 45
  },
  {
    id: 'ex_l3_05',
    level: 3,
    type: 'trova_errore',
    property: 'distributiva',
    operation: 'divisione',
    question: 'Qual è l\'errore logico nella seguente operazione tentata da un alunno: 60 ÷ (10 + 2) = (60 ÷ 10) + (60 ÷ 2)?',
    options: [
      'Ha applicato la distributiva rispetto a una somma al DIVISORE, operazione non valida in matematica! 60 ÷ 12 fa 5, mentre 6 + 30 fa 36',
      'Non ci sono errori, fa 36',
      '60 ÷ 10 non fa 6',
      '60 ÷ 2 non fa 30'
    ],
    correctAnswer: 'Ha applicato la distributiva rispetto a una somma al DIVISORE, operazione non valida in matematica! 60 ÷ 12 fa 5, mentre 6 + 30 fa 36',
    explanation: 'La divisione distribuisce solo il dividendo, MAI il divisore! 60 ÷ 12 = 5, mentre (60 ÷ 10) + (60 ÷ 2) = 6 + 30 = 36.',
    hint: 'La divisione è distributiva solo a destra del dividendo, mai a sinistra del divisore.',
    xpReward: 50
  },
  {
    id: 'ex_l3_06',
    level: 3,
    type: 'abbina',
    property: 'commutativa',
    operation: 'addizione',
    question: 'Associa ciascuna espressione alla proprietà corretta applicata:',
    equationDisplay: 'A) 14 + 29 = 29 + 14\nB) (14 + 6) + 29 = 14 + (6 + 29)\nC) 7 × (10 + 3) = 70 + 21',
    options: [
      'A: Commutativa, B: Associativa, C: Distributiva',
      'A: Associativa, B: Commutativa, C: Invariantiva',
      'A: Distributiva, B: Associativa, C: Commutativa',
      'A: Invariantiva, B: Commutativa, C: Distributiva'
    ],
    correctAnswer: 'A: Commutativa, B: Associativa, C: Distributiva',
    explanation: 'A scambia l\'ordine (commutativa), B sposta il raggruppamento delle parentesi mantenendo l\'ordine (associativa), C distribuisce il fattore sui termini della somma (distributiva).',
    hint: 'Riconosci l\'azione fondamentale di ciascuna formula.',
    xpReward: 50
  },

  // Esercizi aggiuntivi specifici per raggiungere e superare i 100 esercizi complessivi
  {
    id: 'ex_c1_06',
    level: 1,
    type: 'completa_operazione',
    property: 'commutativa',
    operation: 'addizione',
    question: 'Completa: 135 + 240 = 240 + ___',
    options: ['135', '375', '240', '105'],
    correctAnswer: '135',
    explanation: 'Proprietà commutativa: l\'addendo mancante è 135.',
    hint: 'Scambio di posti tra i due addendi.',
    xpReward: 25
  },
  {
    id: 'ex_c1_07',
    level: 1,
    type: 'completa_operazione',
    property: 'commutativa',
    operation: 'moltiplicazione',
    question: 'Completa: 8 × 15 = ___ × 8',
    options: ['15', '120', '8', '24'],
    correctAnswer: '15',
    explanation: 'Proprietà commutativa: 8 × 15 = 15 × 8 = 120.',
    hint: 'Quale fattore manca?',
    xpReward: 25
  },
  {
    id: 'ex_c1_08',
    level: 2,
    type: 'calcolo_mentale',
    property: 'commutativa',
    operation: 'addizione',
    question: 'Per calcolare 3 + 98 + 7, qual è la combinazione più vantaggiosa?',
    options: [
      'Scambiare e raggruppare (3 + 7) + 98 = 10 + 98 = 108',
      '3 + 98 = 101, poi 101 + 7 = 108',
      '98 + 7 = 105, poi 105 + 3 = 108',
      'In colonna'
    ],
    correctAnswer: 'Scambiare e raggruppare (3 + 7) + 98 = 10 + 98 = 108',
    explanation: 'Avvicinare 3 e 7 forma la decina 10: 10 + 98 = 108 immediatamente.',
    hint: '3 e 7 sono amici del 10!',
    xpReward: 35
  },
  {
    id: 'ex_c1_09',
    level: 2,
    type: 'calcolo_mentale',
    property: 'commutativa',
    operation: 'moltiplicazione',
    question: 'Calcola a mente 2 × 47 × 5:',
    options: [
      '(2 × 5) × 47 = 10 × 47 = 470',
      '2 × 47 = 94, poi 94 × 5',
      '47 × 5 = 235, poi per 2',
      '4700'
    ],
    correctAnswer: '(2 × 5) × 47 = 10 × 47 = 470',
    explanation: 'Scambiando l\'ordine e moltiplicando 2 × 5 otteniamo 10: 10 × 47 = 470.',
    hint: '2 × 5 fa 10!',
    xpReward: 35
  },
  {
    id: 'ex_c1_10',
    level: 3,
    type: 'problema',
    property: 'commutativa',
    operation: 'moltiplicazione',
    question: 'Un giardiniere pianta 15 aiuole con 8 tulipani ciascuna, mentre il suo collega pianta 8 aiuole con 15 tulipani ciascuna. Chi pianta più tulipani?',
    options: [
      'Piantano esattamente lo stesso numero di tulipani (15 × 8 = 8 × 15 = 120) per la proprietà commutativa',
      'Il primo, perché ha più aiuole',
      'Il secondo, perché ogni aiuola ha più fiori',
      'Non si può sapere'
    ],
    correctAnswer: 'Piantano entrambi lo stesso numero di tulipani (15 × 8 = 8 × 15 = 120) per la proprietà commutativa',
    explanation: 'La proprietà commutativa garantisce che 15 × 8 = 8 × 15 = 120 tulipani.',
    hint: 'Moltiplica aiuole per fiori in entrambi i casi.',
    xpReward: 45
  },

  // Esercizi Associativa aggiuntivi
  {
    id: 'ex_a1_06',
    level: 1,
    type: 'completa_operazione',
    property: 'associativa',
    operation: 'addizione',
    question: 'Completa senza modificare l\'ordine: 12 + (18 + 25) = (12 + ___) + 25',
    options: ['18', '30', '12', '25'],
    correctAnswer: '18',
    explanation: 'L\'ordine 12, 18, 25 è immutato: (12 + 18) + 25.',
    hint: 'Il secondo addendo è 18.',
    xpReward: 30
  },
  {
    id: 'ex_a1_07',
    level: 2,
    type: 'calcolo_mentale',
    property: 'associativa',
    operation: 'addizione',
    question: 'Qual è il valore di (67 + 19) + 81 calcolato associando 19 e 81?',
    options: [
      '67 + (19 + 81) = 67 + 100 = 167',
      '67 + 19 = 86 + 81 = 167',
      '100',
      '186'
    ],
    correctAnswer: '67 + (19 + 81) = 67 + 100 = 167',
    explanation: '19 + 81 = 100. Sommare 67 a 100 dà 167 all\'istante.',
    hint: '19 + 81 fa una cifra rotonda!',
    xpReward: 35
  },
  {
    id: 'ex_a1_08',
    level: 2,
    type: 'completa_operazione',
    property: 'associativa',
    operation: 'moltiplicazione',
    question: 'Completa: (2 × 50) × 13 = 2 × (___ × 13)',
    options: ['50', '100', '2', '13'],
    correctAnswer: '50',
    explanation: 'La sequenza 2, 50, 13 resta tale: 2 × (50 × 13).',
    hint: 'Il fattore centrale è 50.',
    xpReward: 30
  },
  {
    id: 'ex_a1_09',
    level: 3,
    type: 'problema',
    property: 'associativa',
    operation: 'moltiplicazione',
    question: 'Una cassa contiene 5 scatole, ogni scatola contiene 20 confezioni, ogni confezione contiene 14 matite. Quante matite ci sono in una cassa?',
    options: [
      '(5 × 20) × 14 = 100 × 14 = 1400 matite',
      '5 × (20 × 14) = 5 × 280 = 1400 matite',
      '5 + 20 + 14 = 39 matite',
      '1000 matite'
    ],
    correctAnswer: '(5 × 20) × 14 = 100 × 14 = 1400 matite',
    explanation: 'Associando 5 × 20 creiamo 100: 100 × 14 = 1400 matite!',
    hint: '5 × 20 fa 100.',
    xpReward: 45
  },
  {
    id: 'ex_a1_10',
    level: 3,
    type: 'scegli_trasformazione',
    property: 'associativa',
    operation: 'addizione',
    question: 'Quale delle seguenti scritture rappresenta la forma DISSOCIATIVA di 55 + 28?',
    options: [
      '55 + (5 + 23) = (55 + 5) + 23 = 60 + 23 = 83',
      '28 + 55',
      '55 + 28 = 83',
      '(55 - 5) + (28 + 5)'
    ],
    correctAnswer: '55 + (5 + 23) = (55 + 5) + 23 = 60 + 23 = 83',
    explanation: 'Scomporre il 28 in 5 + 23 per raggiungere il 60 applica l\'associativa in forma dissociativa.',
    hint: 'La forma dissociativa scompone un addendo in due parti.',
    xpReward: 45
  },

  // Esercizi Distributiva aggiuntivi
  {
    id: 'ex_d1_04',
    level: 1,
    type: 'completa_operazione',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'Completa: 4 × (30 + 5) = (4 × 30) + (___ × 5)',
    options: ['4', '30', '5', '120'],
    correctAnswer: '4',
    explanation: 'Il moltiplicatore 4 si distribuisce a entrambi: (4 × 30) + (4 × 5).',
    hint: 'Qual è il numero fuori dalla parentesi?',
    xpReward: 25
  },
  {
    id: 'ex_d1_05',
    level: 2,
    type: 'calcolo_mentale',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'Calcola a mente 8 × 15 usando la scomposizione (10 + 5):',
    options: [
      '(8 × 10) + (8 × 5) = 80 + 40 = 120',
      '8 × 15 = 110',
      '80 + 15 = 95',
      '8 × 5 = 40'
    ],
    correctAnswer: '(8 × 10) + (8 × 5) = 80 + 40 = 120',
    explanation: '80 + 40 = 120.',
    hint: '8 × 10 fa 80 e 8 × 5 fa 40.',
    xpReward: 35
  },
  {
    id: 'ex_d1_06',
    level: 2,
    type: 'calcolo_mentale',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'Calcola raccogliendo il fattore comune: (18 × 7) + (18 × 3)',
    options: [
      '18 × (7 + 3) = 18 × 10 = 180',
      '18 × 21 = 378',
      '1800',
      '126 + 54'
    ],
    correctAnswer: '18 × (7 + 3) = 18 × 10 = 180',
    explanation: '18 × 10 = 180.',
    hint: '7 + 3 fa 10!',
    xpReward: 35
  },
  {
    id: 'ex_d1_07',
    level: 3,
    type: 'problema',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'Un rettangolo ha base 14 cm e altezza 7 cm. Scomponendo la base in 10 cm + 4 cm, calcola l\'area con la proprietà distributiva:',
    options: [
      '(7 × 10) + (7 × 4) = 70 + 28 = 98 cm²',
      '7 × 14 = 88 cm²',
      '7 + 10 + 4 = 21 cm²',
      '140 cm²'
    ],
    correctAnswer: '(7 × 10) + (7 × 4) = 70 + 28 = 98 cm²',
    explanation: 'Area = 70 + 28 = 98 cm².',
    hint: 'Area = altezza × base.',
    xpReward: 45
  },
  {
    id: 'ex_d1_08',
    level: 3,
    type: 'trova_errore',
    property: 'distributiva',
    operation: 'moltiplicazione',
    question: 'Qual è l\'errore in: 5 × (20 - 4) = (5 × 20) - 4?',
    options: [
      'Il 5 doveva essere moltiplicato anche per il 4: il secondo termine è 5 × 4 = 20, quindi 100 - 20 = 80',
      'Non c\'è nessun errore',
      '5 × 20 non fa 100',
      'Il segno doveva essere più'
    ],
    correctAnswer: 'Il 5 doveva essere moltiplicato anche per il 4: il secondo termine è 5 × 4 = 20, quindi 100 - 20 = 80',
    explanation: 'La moltiplicazione va distribuita a tutti i termini dentro la parentesi!',
    hint: 'Hai distribuito al 20, ma hai dimenticato il 4.',
    xpReward: 45
  },

  // Esercizi Invariantiva aggiuntivi
  {
    id: 'ex_i1_05',
    level: 1,
    type: 'completa_operazione',
    property: 'invariantiva',
    operation: 'sottrazione',
    question: 'Completa la sottrazione: 71 - 39 = (71 + 1) - (39 + ___)',
    options: ['1', '2', '39', '40'],
    correctAnswer: '1',
    explanation: 'Aggiungendo 1 a entrambi i termini si ottiene 72 - 40 = 32.',
    hint: 'Stessa quantità a entrambi i termini.',
    xpReward: 25
  },
  {
    id: 'ex_i1_06',
    level: 2,
    type: 'calcolo_mentale',
    property: 'invariantiva',
    operation: 'sottrazione',
    question: 'Calcola a mente 86 - 46 sottraendo 6 a entrambi i termini (-6):',
    options: [
      '(86 - 6) - (46 - 6) = 80 - 40 = 40',
      '86 - 40 = 46',
      '42',
      '80 - 46 = 34'
    ],
    correctAnswer: '(86 - 6) - (46 - 6) = 80 - 40 = 40',
    explanation: 'Eliminando le 6 unità da entrambi i termini resta 80 - 40 = 40.',
    hint: '80 - 40 è immediato.',
    xpReward: 35
  },
  {
    id: 'ex_i1_07',
    level: 1,
    type: 'completa_operazione',
    property: 'invariantiva',
    operation: 'divisione',
    question: 'Semplifica cancellando gli zeri: 2400 ÷ 600 = (2400 ÷ 100) ÷ (600 ÷ ___)',
    options: ['100', '10', '6', '4'],
    correctAnswer: '100',
    explanation: 'Dividendo entrambi per 100 otteniamo 24 ÷ 6 = 4.',
    hint: 'Due zeri tolti a sinistra, due zeri tolti a destra!',
    xpReward: 30
  },
  {
    id: 'ex_i1_08',
    level: 2,
    type: 'calcolo_mentale',
    property: 'invariantiva',
    operation: 'divisione',
    question: 'Calcola 175 ÷ 25 moltiplicando entrambi i termini per 4 (× 4):',
    options: [
      '(175 × 4) ÷ (25 × 4) = 700 ÷ 100 = 7',
      '175 ÷ 100 = 1,75',
      '70',
      '14'
    ],
    correctAnswer: '(175 × 4) ÷ (25 × 4) = 700 ÷ 100 = 7',
    explanation: '25 × 4 = 100 e 175 × 4 = 700. 700 ÷ 100 = 7!',
    hint: 'Dividere per 100 è facilissimo.',
    xpReward: 40
  },
  {
    id: 'ex_i1_09',
    level: 3,
    type: 'problema',
    property: 'invariantiva',
    operation: 'divisione',
    question: 'In una maratona di 42.000 metri ci sono punti di ristoro ogni 3.000 metri. Quanti punti di ristoro ci sono lungo il percorso?',
    options: [
      '(42000 ÷ 1000) ÷ (3000 ÷ 1000) = 42 ÷ 3 = 14 punti',
      '42000 ÷ 3 = 14000',
      '42 - 3 = 39',
      '12 punti'
    ],
    correctAnswer: '(42000 ÷ 1000) ÷ (3000 ÷ 1000) = 42 ÷ 3 = 14 punti',
    explanation: 'Togliendo 3 zeri a entrambi i termini si calcola subito 42 ÷ 3 = 14.',
    hint: 'Dividi entrambi per 1000.',
    xpReward: 45
  },
  {
    id: 'ex_i1_10',
    level: 3,
    type: 'trova_errore',
    property: 'invariantiva',
    operation: 'sottrazione',
    question: 'Qual è l\'errore in: 65 - 28 = (65 + 2) - (28 - 2)?',
    options: [
      'Ha aggiunto 2 al minuendo ma ha tolto 2 al sottraendo! Bisogna AGGIUNGERE 2 a ENTRAMBI i termini: (65 + 2) - (28 + 2) = 67 - 30 = 37',
      'Nessun errore',
      '65 + 2 non fa 67',
      '28 - 2 fa 26'
    ],
    correctAnswer: 'Ha aggiunto 2 al minuendo ma ha tolto 2 al sottraendo! Bisogna AGGIUNGERE 2 a ENTRAMBI i termini: (65 + 2) - (28 + 2) = 67 - 30 = 37',
    explanation: 'La proprietà invariantiva richiede la STESSA operazione (+k o -k) su entrambi i termini.',
    hint: 'Non mischiare addizione al minuendo e sottrazione al sottraendo!',
    xpReward: 45
  }
];
