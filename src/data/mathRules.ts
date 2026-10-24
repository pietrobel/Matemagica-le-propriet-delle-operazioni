import { PropertyRule, VideoLesson } from '../types/math';

export const PROPERTY_RULES: PropertyRule[] = [
  // ADDIZIONE
  {
    id: 'add_commutativa',
    operation: 'addizione',
    name: 'Proprietà Commutativa',
    ruleTitle: 'Lo Scambio Magico',
    description: 'Cambiando l\'ordine degli addendi, il risultato (la somma) NON cambia!',
    formula: 'a + b = b + a',
    example: '5 + 8 = 8 + 5 = 13',
    mentalTrick: 'Metti sempre prima il numero più grande: per fare 3 + 19, pensa a 19 + 3... è molto più facile e veloce!',
    icon: 'Shuffle',
    videoLessonId: 'video_commutativa'
  },
  {
    id: 'add_associativa',
    operation: 'addizione',
    name: 'Proprietà Associativa',
    ruleTitle: 'Il Super Raggruppamento',
    description: 'Se sostituisci a due o più addendi la loro somma, il risultato finale NON cambia!',
    formula: '(a + b) + c = a + (b + c)',
    example: '(7 + 3) + 6 = 10 + 6 = 16',
    mentalTrick: 'Cerca sempre gli "amici del 10" (come 7+3, 6+4, 8+2) per creare decine tonde prima di sommare gli altri!',
    icon: 'Group',
    videoLessonId: 'video_associativa'
  },
  {
    id: 'add_dissociativa',
    operation: 'addizione',
    name: 'Proprietà Associativa (in forma dissociativa)',
    ruleTitle: 'Lo Scomponi-Numeri',
    description: 'È l\'applicazione inversa della proprietà associativa! Se a un addendo sostituisci due numeri che sommati danno quel termine, il risultato NON cambia: serve a facilitare il calcolo rapido a mente.',
    formula: '24 + 16 = (20 + 4) + (10 + 6) = 30 + 10 = 40',
    example: '35 + 18 = 35 + (15 + 3) = (35 + 15) + 3 = 50 + 3 = 53',
    mentalTrick: 'Scomponi un numero in decine e unità sfruttando l\'associativa al contrario per fare calcoli veloci a mente!',
    icon: 'Split',
    videoLessonId: 'video_distributiva'
  },
  {
    id: 'add_neutro',
    operation: 'addizione',
    name: 'Elemento Neutro (Zero)',
    ruleTitle: 'Lo Zero Dormiglione',
    description: 'Se sommi 0 a qualsiasi numero, il numero resta identico!',
    formula: 'a + 0 = a',
    example: '42 + 0 = 42',
    mentalTrick: 'Lo zero nell\'addizione è come un fantasma invisibile: non aggiunge nulla!',
    icon: 'Sparkles'
  },

  // SOTTRAZIONE
  {
    id: 'sub_invariantiva',
    operation: 'sottrazione',
    name: 'Proprietà Invariantiva',
    ruleTitle: 'La Bilancia Perfetta',
    description: 'Se aggiungi o togli lo stesso numero sia al minuendo che al sottraendo, la differenza NON cambia!',
    formula: 'a - b = (a + k) - (b + k) = (a - k) - (b - k)',
    example: '53 - 19 = (53 + 1) - (19 + 1) = 54 - 20 = 34',
    mentalTrick: 'Aggiungi o togli per far diventare il secondo numero una decina tonda (20, 30, 50). Così la sottrazione diventa una passeggiata!',
    icon: 'Scale',
    videoLessonId: 'video_invariantiva'
  },
  {
    id: 'sub_non_commutativa',
    operation: 'sottrazione',
    name: 'Attenzione: NON è Commutativa!',
    ruleTitle: 'Il Senso Unico',
    description: 'Nella sottrazione NON puoi scambiare i numeri! 9 - 4 fa 5, ma 4 - 9 non si può fare nei numeri naturali.',
    formula: 'a - b ≠ b - a',
    example: '10 - 3 = 7, ma 3 - 10 non dà 7!',
    mentalTrick: 'Se hai 3 mele, non puoi regalarne 10! L\'ordine nella sottrazione è sacro.',
    icon: 'AlertCircle'
  },
  {
    id: 'sub_zero',
    operation: 'sottrazione',
    name: 'Lo Zero Sottraendo',
    ruleTitle: 'Togliere Niente',
    description: 'Se togli 0 da un numero, il numero non cambia. Ma togliere un numero da 0 non ha senso!',
    formula: 'a - 0 = a',
    example: '18 - 0 = 18',
    mentalTrick: 'Se hai 18 figurine e non ne perdi nessuna (0), ne hai ancora 18!',
    icon: 'Check'
  },

  // MOLTIPLICAZIONE
  {
    id: 'mul_commutativa',
    operation: 'moltiplicazione',
    name: 'Proprietà Commutativa',
    ruleTitle: 'I Fattori Gemelli',
    description: 'Cambiando l\'ordine dei fattori, il prodotto finale NON cambia!',
    formula: 'a × b = b × a',
    example: '4 × 7 = 7 × 4 = 28',
    mentalTrick: 'Non ricordi quanto fa 3 × 9? Pensa alla tabellina del 9: 9 × 3 fa 27!',
    icon: 'Shuffle',
    videoLessonId: 'video_commutativa'
  },
  {
    id: 'mul_associativa',
    operation: 'moltiplicazione',
    name: 'Proprietà Associativa',
    ruleTitle: 'La Moltiplicazione in Squadra',
    description: 'Se sostituisci a due o più fattori il loro prodotto, il risultato NON cambia!',
    formula: '(a × b) × c = a × (b × c)',
    example: '(2 × 5) × 7 = 10 × 7 = 70',
    mentalTrick: 'Cerca sempre di moltiplicare 2 × 5 prima: fa 10, e poi basta aggiungere uno zero alla fine!',
    icon: 'Group',
    videoLessonId: 'video_associativa'
  },
  {
    id: 'mul_distributiva',
    operation: 'moltiplicazione',
    name: 'Proprietà Distributiva',
    ruleTitle: 'Il Robot Spacca-Tutto',
    description: 'Per moltiplicare un numero per una somma, moltiplica quel numero per ciascun addendo e poi somma i risultati!',
    formula: 'a × (b + c) = (a × b) + (a × c)',
    example: '6 × 14 = 6 × (10 + 4) = (6 × 10) + (6 × 4) = 60 + 24 = 84',
    mentalTrick: 'Spacca i numeri a due cifre in "decine + unità" (14 = 10 + 4). Così moltiplichi due tabelline facili!',
    icon: 'Maximize2',
    videoLessonId: 'video_distributiva'
  },
  {
    id: 'mul_dissociativa',
    operation: 'moltiplicazione',
    name: 'Proprietà Associativa (in forma dissociativa)',
    ruleTitle: 'Fattori a Pezzetti',
    description: 'È la proprietà associativa della moltiplicazione usata al contrario! Puoi scomporre un fattore in due o più fattori che moltiplicati danno quel numero per facilitare il calcolo.',
    formula: '12 × 5 = (6 × 2) × 5 = 6 × (2 × 5) = 6 × 10 = 60',
    example: '15 × 6 = (3 × 5) × 6 = 3 × (5 × 6) = 3 × 30 = 90',
    mentalTrick: 'Se devi moltiplicare per 5, estrai un 2 dall\'altro numero con l\'associativa inversa: 2 × 5 fa 10!',
    icon: 'Minimize2'
  },
  {
    id: 'mul_speciali',
    operation: 'moltiplicazione',
    name: 'Elemento Neutro (1) e Assorbente (0)',
    ruleTitle: 'Lo Specchio e il Buco Nero',
    description: 'Moltiplicare per 1 lascia il numero uguale (specchio). Moltiplicare per 0 dà sempre 0 (buco nero)!',
    formula: 'a × 1 = a   e   a × 0 = 0',
    example: '99 × 1 = 99   |   99 × 0 = 0',
    mentalTrick: 'Qualsiasi numero per zero scompare all\'istante!',
    icon: 'Zap'
  },

  // DIVISIONE
  {
    id: 'div_invariantiva',
    operation: 'divisione',
    name: 'Proprietà Invariantiva',
    ruleTitle: 'La Bilancia dei Quozienti',
    description: 'Se moltiplichi o dividi dividendo e divisore per uno stesso numero (diverso da zero), il quoziente NON cambia!',
    formula: 'a ÷ b = (a × k) ÷ (b × k) = (a ÷ k) ÷ (b ÷ k)',
    example: '120 ÷ 30 = (120 ÷ 10) ÷ (30 ÷ 10) = 12 ÷ 3 = 4',
    mentalTrick: 'Quando entrambi i numeri finiscono con uno zero, togli lo zero a entrambi! 180 ÷ 20 diventa 18 ÷ 2 = 9!',
    icon: 'Scale',
    videoLessonId: 'video_invariantiva'
  },
  {
    id: 'div_distributiva',
    operation: 'divisione',
    name: 'Proprietà Distributiva',
    ruleTitle: 'La Divisione a Spicchi',
    description: 'Puoi scomporre il dividendo in una somma di numeri divisibili per il divisore e dividerli singolarmente!',
    formula: '(a + b) ÷ c = (a ÷ c) + (b ÷ c)',
    example: '72 ÷ 6 = (60 + 12) ÷ 6 = (60 ÷ 6) + (12 ÷ 6) = 10 + 2 = 12',
    mentalTrick: 'Trova il multiplo più vicino di 10 (es. 60 per il 6) e dividi il resto!',
    icon: 'Maximize2',
    videoLessonId: 'video_distributiva'
  },
  {
    id: 'div_regole_zero',
    operation: 'divisione',
    name: 'Regole Fondamentali dello Zero',
    ruleTitle: 'Il Divieto Assoluto',
    description: 'Dividere 0 per un numero dà 0 (0 ÷ 5 = 0). Ma DIVIDERE PER ZERO È IMPOSSIBILE!',
    formula: '0 ÷ a = 0   |   a ÷ 0 = IMPOSSIBILE',
    example: 'Se hai 0 caramelle da dividere a 4 bimbi, ognuno ha 0. Ma se hai 4 caramelle, non puoi dividerle a 0 persone!',
    mentalTrick: 'Mai dividere per zero, fa esplodere la calcolatrice!',
    icon: 'AlertTriangle'
  }
];

export const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: 'video_commutativa',
    propertyId: 'add_commutativa',
    title: 'La Magia dello Scambio (Proprietà Commutativa)',
    subtitle: 'Come invertire i numeri nell\'addizione e nella moltiplicazione per calcolare alla velocità della luce!',
    durationSeconds: 30,
    thumbnail: '/src/assets/images/video_thumbnail_commutativa_1792238943745.jpg',
    steps: [
      {
        time: 0,
        title: 'Benvenuti nel Regno dei Numeri!',
        speech: 'Ciao esploratore! Oggi scopriamo la Proprietà Commutativa. La parola viene da commutare, che significa proprio scambiare!',
        visualAction: 'intro',
        leftValue: '4',
        middleOp: '+',
        rightValue: '7',
        result: '?',
        explanation: 'Due amici hanno due cestini di mele: uno con 4 e uno con 7.',
        highlight: 'Preparati a scambiare!'
      },
      {
        time: 6,
        title: 'La prima somma',
        speech: 'Se abbiamo 4 mele e ne aggiungiamo 7, in totale abbiamo 11 mele squisite!',
        visualAction: 'balance',
        leftValue: '4',
        middleOp: '+',
        rightValue: '7',
        result: '11',
        explanation: '4 + 7 fa esattamente 11.',
        highlight: 'Somma = 11'
      },
      {
        time: 14,
        title: 'Il Grande Scambio Magico!',
        speech: 'Ora guardate cosa succede se i nostri amici si scambiano di posto: 7 + 4!',
        visualAction: 'swap',
        leftValue: '7',
        middleOp: '+',
        rightValue: '4',
        result: '11',
        explanation: 'Cambiando l\'ordine degli addendi: 7 + 4 = 11!',
        highlight: 'L\'ordine cambia, ma il risultato resta identico!'
      },
      {
        time: 22,
        title: 'Vale anche per la Moltiplicazione!',
        speech: 'Fantastico! La stessa magia funziona anche con la moltiplicazione: 3 per 5 fa 15, e 5 per 3 fa sempre 15!',
        visualAction: 'summary',
        leftValue: '3 × 5',
        middleOp: '=',
        rightValue: '5 × 3',
        result: '15',
        explanation: 'Regola d\'oro: a + b = b + a  e  a × b = b × a.',
        highlight: 'Scambio magico padroneggiato!'
      }
    ]
  },
  {
    id: 'video_invariantiva',
    propertyId: 'sub_invariantiva',
    title: 'La Bilancia Perfetta (Proprietà Invariantiva)',
    subtitle: 'Il super trucco per semplificare sottrazioni e divisioni complicate!',
    durationSeconds: 32,
    thumbnail: '/src/assets/images/video_thumbnail_commutativa_1792238943745.jpg',
    steps: [
      {
        time: 0,
        title: 'Il segreto della differenza',
        speech: 'Benvenuto alla lezione sull\'Invariantiva! Questa proprietà è il segreto dei veri campioni di calcolo mentale.',
        visualAction: 'intro',
        leftValue: '53',
        middleOp: '-',
        rightValue: '19',
        result: '?',
        explanation: '53 - 19 sembra difficile da fare a mente...',
        highlight: 'Come semplificarla?'
      },
      {
        time: 8,
        title: 'Aggiungiamo lo stesso valore!',
        speech: 'Se aggiungiamo 1 mela a entrambi i piatti della bilancia, la distanza tra i due numeri non cambia affatto!',
        visualAction: 'balance',
        leftValue: '53 (+1) = 54',
        middleOp: '-',
        rightValue: '19 (+1) = 20',
        result: '?',
        explanation: 'Aggiungiamo 1 sia al 53 che al 19!',
        highlight: '19 + 1 diventa un bellissimo 20!'
      },
      {
        time: 16,
        title: 'Il calcolo diventa facilissimo!',
        speech: 'Ora dobbiamo solo fare 54 meno 20. Facilissimo: fa 34! Lo stesso risultato di 53 meno 19!',
        visualAction: 'summary',
        leftValue: '54',
        middleOp: '-',
        rightValue: '20',
        result: '34',
        explanation: '53 - 19 = 54 - 20 = 34!',
        highlight: 'Risultato trovato in un lampo!'
      },
      {
        time: 24,
        title: 'Vale anche nella Divisione!',
        speech: 'Nella divisione possiamo dividere o moltiplicare entrambi i numeri. Ad esempio: 140 diviso 20 diventa 14 diviso 2, cioè 7!',
        visualAction: 'summary',
        leftValue: '140 ÷ 20',
        middleOp: '=',
        rightValue: '14 ÷ 2',
        result: '7',
        explanation: 'Dividiamo entrambi per 10 e il risultato resta identico!',
        highlight: 'Invariantiva superata con successo!'
      }
    ]
  },
  {
    id: 'video_distributiva',
    propertyId: 'mul_distributiva',
    title: 'Il Robot Spacca-Numeri (Proprietà Distributiva)',
    subtitle: 'Scomponi i numeri grandi in pezzi facili e domina qualsiasi moltiplicazione!',
    durationSeconds: 30,
    thumbnail: '/src/assets/images/video_thumbnail_distributiva_1792238944713.jpg',
    steps: [
      {
        time: 0,
        title: 'Affrontiamo un gigante!',
        speech: 'Ecco la Proprietà Distributiva! Immagina di dover calcolare 7 per 12. Sembra grande, vero?',
        visualAction: 'intro',
        leftValue: '7',
        middleOp: '×',
        rightValue: '12',
        result: '?',
        explanation: 'Una griglia di 7 righe e 12 colonne.',
        highlight: '7 × 12 = ?'
      },
      {
        time: 7,
        title: 'Il Robot spacca il 12!',
        speech: 'Il nostro robot ingegnere spacca il 12 in due parti comodissime: 10 più 2!',
        visualAction: 'slice',
        leftValue: '7 × 10',
        middleOp: '+',
        rightValue: '7 × 2',
        result: '?',
        explanation: 'Scomponiamo: 7 × (10 + 2)',
        highlight: '12 si è diviso in 10 e 2!'
      },
      {
        time: 15,
        title: 'Calcoliamo i due pezzi!',
        speech: '7 per 10 fa 70. E 7 per 2 fa 14! Due calcoli semplicissimi delle tabelline base.',
        visualAction: 'bracket',
        leftValue: '70',
        middleOp: '+',
        rightValue: '14',
        result: '?',
        explanation: '(7 × 10) = 70   e   (7 × 2) = 14',
        highlight: '70 + 14'
      },
      {
        time: 22,
        title: 'Sommiamo i pezzi!',
        speech: 'Ora sommiamo 70 più 14 e otteniamo 84! Abbiamo risolto 7 per 12 senza nemmeno toccare la carta!',
        visualAction: 'summary',
        leftValue: '70 + 14',
        middleOp: '=',
        rightValue: '7 × 12',
        result: '84',
        explanation: '7 × 12 = 84! Bravissimo robot!',
        highlight: 'Proprietà Distributiva vinta!'
      }
    ]
  },
  {
    id: 'video_associativa',
    propertyId: 'add_associativa',
    title: 'La Squadra Perfetta (Proprietà Associativa)',
    subtitle: 'Raggruppa i numeri più simpatici e trova le decine tonde in un battito di ciglia!',
    durationSeconds: 28,
    thumbnail: '/src/assets/images/hero_math_adventure_1792238943381.jpg',
    steps: [
      {
        time: 0,
        title: 'Tre numeri in gioco',
        speech: 'La Proprietà Associativa ci permette di raggruppare i numeri come preferiamo! Guarda questa somma: 8 più 5 più 2.',
        visualAction: 'intro',
        leftValue: '8',
        middleOp: '+',
        rightValue: '5 + 2',
        result: '?',
        explanation: 'Dobbiamo fare 8 + 5 + 2.',
        highlight: 'Quali numeri unire prima?'
      },
      {
        time: 7,
        title: 'Troviamo gli amici del 10!',
        speech: 'Noti qualcosa di speciale? L\'8 e il 2 sono grandi amici del 10! Associamoli insieme per primi!',
        visualAction: 'bracket',
        leftValue: '(8 + 2)',
        middleOp: '+',
        rightValue: '5',
        result: '?',
        explanation: 'Raggruppiamo: (8 + 2) + 5',
        highlight: '8 + 2 = 10!'
      },
      {
        time: 15,
        title: 'La somma diventa un gioco da ragazzi',
        speech: '8 più 2 fa 10. E 10 più 5 fa 15! Invece di fare 8 più 5 uguale 13, più 2 uguale 15, abbiamo fatto 10 più 5!',
        visualAction: 'summary',
        leftValue: '10',
        middleOp: '+',
        rightValue: '5',
        result: '15',
        explanation: '(8 + 2) + 5 = 10 + 5 = 15',
        highlight: '15 ottenuto senza sforzo!'
      },
      {
        time: 22,
        title: 'Incredibile anche nel Prodotto!',
        speech: 'Funziona identico con la moltiplicazione: 4 per 7 per 25? Fai prima 4 per 25 che fa 100, e poi 100 per 7 fa 700!',
        visualAction: 'summary',
        leftValue: '(4 × 25) × 7',
        middleOp: '=',
        rightValue: '100 × 7',
        result: '700',
        explanation: 'Raggruppare in modo intelligente è il segreto dei geni!',
        highlight: 'Super Raggruppatore pronto!'
      }
    ]
  }
];

export const INITIAL_BADGES = [
  {
    id: 'badge_first_swap',
    title: 'Maestro dello Scambio',
    description: 'Hai applicato la Proprietà Commutativa con successo in un minigioco!',
    iconName: 'Shuffle',
    requirement: 'Completa 1 round di "Lo Scambio Magico"',
    progress: 0,
    category: 'games' as const
  },
  {
    id: 'badge_invariance_pro',
    title: 'Equilibrista Invariante',
    description: 'Hai trovato la mossa migliore per bilanciare le operazioni!',
    iconName: 'Scale',
    requirement: 'Risolvi 3 sfide in "Il Trucco Invariante"',
    progress: 0,
    category: 'games' as const
  },
  {
    id: 'badge_splitter_hero',
    title: 'Spacca-Numeri Supremo',
    description: 'Hai smontato una moltiplicazione gigante con la Proprietà Distributiva!',
    iconName: 'Maximize2',
    requirement: 'Completa un livello di "Spacca & Risolvi"',
    progress: 0,
    category: 'games' as const
  },
  {
    id: 'badge_associative_star',
    title: 'Super Raggruppatore',
    description: 'Hai trovato gli amici del 10 con la Proprietà Associativa!',
    iconName: 'Group',
    requirement: 'Raggruppa 3 volte con successo',
    progress: 0,
    category: 'learning' as const
  },
  {
    id: 'badge_zero_hero',
    title: 'Cacciatore dello Zero',
    description: 'Hai scoperto le regole segrete dello zero (elemento neutro e divisore proibito)!',
    iconName: 'Sparkles',
    requirement: 'Impara le regole dello zero nella sezione Imparo',
    progress: 0,
    category: 'learning' as const
  },
  {
    id: 'badge_video_scholar',
    title: 'Videofilo Matematico',
    description: 'Hai guardato e completato le videolezioni illustrate!',
    iconName: 'PlayCircle',
    requirement: 'Guarda almeno 2 videolezioni animate',
    progress: 0,
    category: 'learning' as const
  },
  {
    id: 'badge_stylist',
    title: 'Stilista del Compagno',
    description: 'Hai personalizzato il tuo compagno avatar con vestiti e accessori unici!',
    iconName: 'Palette',
    requirement: 'Personalizza e salva il tuo avatar',
    progress: 100, // Starts completed on customize
    unlockedAt: 'Oggi',
    category: 'customization' as const
  },
  {
    id: 'badge_streak_master',
    title: 'Occhio di Falco',
    description: 'Hai infilato una serie perfetta di 5 risposte corrette senza errori!',
    iconName: 'Flame',
    requirement: 'Raggiungi una combo streak di 5',
    progress: 0,
    category: 'mastery' as const
  },
  {
    id: 'badge_speedy',
    title: 'Fulmine Mentale',
    description: 'Hai risposto a un quesito matematico in meno di 4 secondi!',
    iconName: 'Zap',
    requirement: 'Rispondi rapidamente e correttamente',
    progress: 0,
    category: 'mastery' as const
  },
  {
    id: 'badge_class_top3',
    title: 'Campione di Classe',
    description: 'Hai accumulato abbastanza XP per entrare nel podio amichevole!',
    iconName: 'Award',
    requirement: 'Raggiungi i primi 3 posti nella classifica di classe',
    progress: 30,
    category: 'mastery' as const
  },
  {
    id: 'badge_level_5',
    title: 'Mago dei Numeri (Lv 5)',
    description: 'Hai raggiunto il Livello 5 accumulando esperienza nei giochi!',
    iconName: 'Crown',
    requirement: 'Raggiungi il livello 5',
    progress: 20,
    category: 'mastery' as const
  },
  {
    id: 'badge_grand_master',
    title: 'Gran Saggio delle 4 Operazioni',
    description: 'Hai sbloccato tutti i segreti e padroneggiato le 4 operazioni matematiche!',
    iconName: 'Trophy',
    requirement: 'Raggiungi il livello 10 e completa tutti i minigiochi',
    progress: 10,
    category: 'mastery' as const
  }
];

export const INITIAL_LEADERBOARD = [
  {
    id: 'user_chiara',
    name: 'Chiara',
    avatar: {
      archetype: 'kid_girl' as const,
      nickname: 'Chiara Sprint',
      primaryColor: '#FFE4D6',
      hairStyle: 'ponytail' as const,
      hairColor: '#EA580C',
      outfit: 'salopette' as const,
      outfitColor: '#1E3A8A',
      accessory: 'hair_bow' as const,
      expression: 'determined' as const
    },
    level: 7,
    xp: 2850,
    stars: 54,
    favoriteProperty: 'Commutativa',
    cheerMessage: 'Invertire i numeri è il mio superpotere preferito! ✨'
  },
  {
    id: 'user_leo',
    name: 'Leonardo',
    avatar: {
      archetype: 'robot' as const,
      nickname: 'RoboCalc',
      primaryColor: '#38BDF8',
      hairStyle: 'crest' as const,
      hairColor: '#0284C7',
      outfit: 'scientist' as const,
      outfitColor: '#0284C7',
      accessory: 'headphones' as const,
      expression: 'happy' as const
    },
    level: 6,
    xp: 2420,
    stars: 48,
    favoriteProperty: 'Distributiva',
    cheerMessage: 'Spacco i numeri a metà come un vero robot ingegnere! 🤖'
  },
  {
    id: 'user_sofia',
    name: 'Sofia',
    avatar: {
      archetype: 'kid_girl' as const,
      nickname: 'Stella Brillante',
      primaryColor: '#9A6036',
      hairStyle: 'top_bun' as const,
      hairColor: '#1E293B',
      outfit: 'starry_dress' as const,
      outfitColor: '#7C3AED',
      accessory: 'headband_stars' as const,
      expression: 'sweet_smile' as const
    },
    level: 5,
    xp: 1980,
    stars: 42,
    favoriteProperty: 'Associativa',
    cheerMessage: 'Gli amici del 10 sono i miei migliori alleati! 🌟'
  },
  {
    id: 'user_matteo',
    name: 'Matteo',
    avatar: {
      archetype: 'kid_boy' as const,
      nickname: 'Matteo Mago',
      primaryColor: '#FED7AA',
      hairStyle: 'curls' as const,
      hairColor: '#B45309',
      outfit: 'magician' as const,
      outfitColor: '#581C87',
      accessory: 'wizard_hat' as const,
      expression: 'focused' as const
    },
    level: 4,
    xp: 1550,
    stars: 35,
    favoriteProperty: 'Invariantiva',
    cheerMessage: 'La bilancia della sottrazione non mente mai! ⚖️'
  },
  {
    id: 'user_giulia',
    name: 'Giulia',
    avatar: {
      archetype: 'kid_girl' as const,
      nickname: 'Super Giulia',
      primaryColor: '#FDBA74',
      hairStyle: 'long_waves' as const,
      hairColor: '#F59E0B',
      outfit: 'superhero' as const,
      outfitColor: '#DC2626',
      accessory: 'heart_glasses' as const,
      expression: 'wink' as const
    },
    level: 3,
    xp: 1100,
    stars: 26,
    favoriteProperty: 'Commutativa',
    cheerMessage: 'Record di velocità allo Scambio Magico! ⚡'
  }
];

export const LEVEL_TITLES = [
  'Esploratore dei Numeri', // Lv 1
  'Apprendista dell\'Addizione', // Lv 2
  'Mago dello Scambio', // Lv 3
  'Custode della Sottrazione', // Lv 4
  'Equilibrista Invariante', // Lv 5
  'Campione del Raggruppamento', // Lv 6
  'Stratega della Moltiplicazione', // Lv 7
  'Spacca-Numeri Supremo', // Lv 8
  'Maestro della Divisione', // Lv 9
  'Gran Saggio delle 4 Operazioni' // Lv 10
];
