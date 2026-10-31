import { EscapeRoom } from '../types/math';

export const ESCAPE_ROOMS: EscapeRoom[] = [
  // =========================================================================
  // STANZA 1: LA BIBLIOTECA DEI NUMERI (Proprietà Commutativa)
  // =========================================================================
  {
    id: 1,
    name: "La Biblioteca dei Numeri",
    theme: "Antica biblioteca con scaffali rotanti",
    description: "I tomi antichi sono disposti alla rinfusa. Per aprire il primo cancello runico devi padroneggiare lo scambio dei fattori e degli addendi!",
    color: "from-amber-600 to-orange-700",
    requiredProperty: "Proprietà Commutativa",
    unlockedVaultDigit: 3,
    puzzles: [
      {
        id: "er_1_1",
        puzzleTitle: "Il leggio speculare",
        riddleText: "Sul leggio a sinistra c'è inciso '14 + 87'. Quale codice simmetrico aziona l'ingranaggio a destra?",
        equation: "14 + 87 = ___ + 14",
        hint: "Pensa allo scambio magico dell'addizione: a + b = b + a.",
        options: ["87", "101", "14", "73"],
        correctAnswer: "87",
        codeDigit: 3,
        explanation: "La proprietà commutativa garantisce che 14 + 87 = 87 + 14 = 101."
      },
      {
        id: "er_1_2",
        puzzleTitle: "Le mensole moltiplicative",
        riddleText: "Una mensola contiene 6 file da 13 pergamene. L'altra mensola ne contiene 13 file: quante pergamene devono esserci per fila per avere lo stesso totale?",
        equation: "6 × 13 = 13 × ___",
        hint: "I fattori possono scambiarsi senza che il prodotto cambi.",
        options: ["6", "78", "13", "19"],
        correctAnswer: "6",
        codeDigit: 7,
        explanation: "Per la commutativa della moltiplicazione: 6 × 13 = 13 × 6 = 78."
      },
      {
        id: "er_1_3",
        puzzleTitle: "Il lucchetto a trappola",
        riddleText: "Una runa luminosa chiede: 'Quale operazione NON rispetta lo scambio dei termini?'",
        equation: "a ? b ≠ b ? a",
        hint: "Se togli 9 da 4 nei numeri naturali non puoi farlo!",
        options: ["Sottrazione", "Addizione", "Moltiplicazione", "Nessuna"],
        correctAnswer: "Sottrazione",
        codeDigit: 2,
        explanation: "La sottrazione non è commutativa: 10 - 4 fa 6, ma 4 - 10 fa -6."
      },
      {
        id: "er_1_4",
        puzzleTitle: "La scorciatoia dell'archivista",
        riddleText: "Per calcolare a mente 8 + 395, quale scambio rende la lettura istantanea?",
        equation: "8 + 395 ⟹ ?",
        hint: "Metti sempre prima il numero più grande!",
        options: ["395 + 8 = 403", "395 - 8 = 387", "8 × 395", "400 + 5"],
        correctAnswer: "395 + 8 = 403",
        codeDigit: 8,
        explanation: "Partire da 395 e aggiungere 8 permette di calcolare 403 immediatamente."
      },
      {
        id: "er_1_5",
        puzzleTitle: "La chiave della prima porta",
        riddleText: "Trova la combinazione che applica la commutativa a (4 × 9):",
        equation: "4 × 9 = 36 ⟹ ?",
        hint: "Qual è il prodotto gemello?",
        options: ["9 × 4 = 36", "4 + 9 = 13", "36 ÷ 4 = 9", "40 - 4 = 36"],
        correctAnswer: "9 × 4 = 36",
        codeDigit: 5,
        explanation: "9 × 4 = 36 è la forma commutata perfetta. Il primo sigillo è infranto!"
      }
    ]
  },

  // =========================================================================
  // STANZA 2: IL LABORATORIO ALCHEMICO (Proprietà Associativa)
  // =========================================================================
  {
    id: 2,
    name: "Il Laboratorio Alchemico",
    theme: "Alambicchi e ampolle con formule chimico-matematiche",
    description: "Gli alchimisti univano gli elementi in coppie speciali per creare legami perfetti. Raggruppa i numeri senza cambiare il loro ordine per far scattare le chiuse idrauliche!",
    color: "from-purple-600 to-indigo-800",
    requiredProperty: "Proprietà Associativa",
    unlockedVaultDigit: 8,
    puzzles: [
      {
        id: "er_2_1",
        puzzleTitle: "L'ampolla degli amici del 10",
        riddleText: "Nell'ampolla ci sono tre reagenti: 27 ml, 13 ml e 54 ml. Quale associazione crea subito una decina tonda?",
        equation: "(27 + 13) + 54 = ___ + 54",
        hint: "27 + 13 termina per 0!",
        options: ["40", "50", "30", "94"],
        correctAnswer: "40",
        codeDigit: 4,
        explanation: "27 + 13 = 40. Sommare 40 + 54 dà 94 al volo."
      },
      {
        id: "er_2_2",
        puzzleTitle: "Il miscelatore di precisione",
        riddleText: "Completa la formula dell'associativa senza mutare l'ordine: (15 + 35) + 42 = 15 + (___ + 42)",
        equation: "(15 + 35) + 42 = 15 + (___ + 42)",
        hint: "I termini sono 15, 35 e 42. Chi è il termine centrale?",
        options: ["35", "50", "15", "42"],
        correctAnswer: "35",
        codeDigit: 3,
        explanation: "L'ordine dei numeri 15, 35, 42 rimane immutato; cambiano solo le parentesi associative."
      },
      {
        id: "er_2_3",
        puzzleTitle: "La moltiplicazione catalitica",
        riddleText: "Per calcolare 25 × 7 × 4, quali due ampolle conviene versare insieme per prime?",
        equation: "25 × 7 × 4",
        hint: "25 moltiplicato per 4 crea 100!",
        options: ["25 e 4 per formare 100", "25 e 7 per formare 175", "7 e 4 per formare 28", "Tutte insieme"],
        correctAnswer: "25 e 4 per formare 100",
        codeDigit: 1,
        explanation: "(25 × 4) × 7 = 100 × 7 = 700. In un secondo la pozione è pronta!"
      },
      {
        id: "er_2_4",
        puzzleTitle: "La dissociazione energetica",
        riddleText: "Quale scomposizione dissociativa sblocca la combinazione 48 + 36 raggiungendo la decina 50?",
        equation: "48 + 36 = 48 + (2 + 34) = ?",
        hint: "48 + 2 fa 50, a cui aggiungi 34.",
        options: ["50 + 34 = 84", "40 + 44 = 84", "48 + 40 = 88", "80"],
        correctAnswer: "50 + 34 = 84",
        codeDigit: 8,
        explanation: "L'associativa in forma dissociativa scompone 36 in 2 + 34 per creare 50 + 34 = 84."
      },
      {
        id: "er_2_5",
        puzzleTitle: "La valvola a tre vie",
        riddleText: "Calcola il prodotto finale di (8 × 125) × 9:",
        equation: "(8 × 125) × 9 = 1000 × 9 = ?",
        hint: "1000 per 9 aggiunge 3 zeri al 9.",
        options: ["9000", "900", "1009", "18000"],
        correctAnswer: "9000",
        codeDigit: 9,
        explanation: "8 × 125 fa 1000! 1000 × 9 = 9000. Seconda porta sbloccata!"
      }
    ]
  },

  // =========================================================================
  // STANZA 3: LA FONDERIA DELLE MOLTIPLICAZIONI (Proprietà Distributiva)
  // =========================================================================
  {
    id: 3,
    name: "La Fonderia dei Metalli",
    theme: "Fucine ardenti e ingranaggi a ruote dentate",
    description: "I lingotti d'oro e ferro devono essere spezzati in parti uguali con il martello distributivo. Distribuisci o raccogli a fattore comune per aprire la grata d'acciaio!",
    color: "from-rose-600 to-red-800",
    requiredProperty: "Proprietà Distributiva",
    unlockedVaultDigit: 6,
    puzzles: [
      {
        id: "er_3_1",
        puzzleTitle: "Lo spacca-lingotti",
        riddleText: "Scomponi 7 × 16 in decine e unità: 7 × (10 + 6) = (7 × 10) + (7 × 6) = 70 + ___",
        equation: "70 + ___ = 112",
        hint: "Quanto fa 7 × 6?",
        options: ["42", "16", "36", "49"],
        correctAnswer: "42",
        codeDigit: 4,
        explanation: "7 × 6 = 42. E 70 + 42 fa 112 lingotti fusi!"
      },
      {
        id: "er_3_2",
        puzzleTitle: "Il raccoglitore comune",
        riddleText: "Due fornaci producono (14 × 65) e (14 × 35) sbarre. Raccogli a fattore comune 14 × (65 + 35): quante sbarre in totale?",
        equation: "14 × 100 = ?",
        hint: "65 + 35 = 100. Moltiplica 14 per 100.",
        options: ["1400", "140", "1000", "700"],
        correctAnswer: "1400",
        codeDigit: 1,
        explanation: "14 × (65 + 35) = 14 × 100 = 1400."
      },
      {
        id: "er_3_3",
        puzzleTitle: "La sottrazione d'eccedenza",
        riddleText: "Per forgiare 5 ingranaggi da 29 denti, usa 5 × (30 - 1). Qual è il risultato?",
        equation: "(5 × 30) - (5 × 1) = 150 - 5 = ?",
        hint: "150 meno 5.",
        options: ["145", "155", "140", "135"],
        correctAnswer: "145",
        codeDigit: 5,
        explanation: "La proprietà distributiva rispetto alla sottrazione dà 150 - 5 = 145."
      },
      {
        id: "er_3_4",
        puzzleTitle: "La bilancia dei pesi fusi",
        riddleText: "Quale espressione calcola l'area di due piastre affiancate di altezza 8 e basi 12 e 8?",
        equation: "8 × (12 + 8) = ?",
        hint: "12 + 8 fa 20. Moltiplica 8 per 20.",
        options: ["160", "96", "64", "180"],
        correctAnswer: "160",
        codeDigit: 6,
        explanation: "8 × 20 = 160 cm² di superficie."
      },
      {
        id: "er_3_5",
        puzzleTitle: "Il codice della terza grata",
        riddleText: "Raccogli il fattore comune: (23 × 8) + (23 × 2) = 23 × ___",
        equation: "23 × ___ = 230",
        hint: "8 + 2 fa...",
        options: ["10", "16", "23", "100"],
        correctAnswer: "10",
        codeDigit: 2,
        explanation: "8 + 2 = 10. Quindi 23 × 10 = 230. La terza porta d'acciaio è aperta!"
      }
    ]
  },

  // =========================================================================
  // STANZA 4: LA SALA DELLE BILANCE E DEGLI SPECCHI (Proprietà Invariantiva)
  // =========================================================================
  {
    id: 4,
    name: "La Sala delle Bilance e degli Specchi",
    theme: "Specchi riflettenti e grandi bilance dorate a bracci uguali",
    description: "Ogni movimento deve essere perfettamente equilibrato. Ciò che aggiungi o togli a sinistra, devi aggiungerlo o toglierlo a destra!",
    color: "from-sky-600 to-cyan-800",
    requiredProperty: "Proprietà Invariantiva",
    unlockedVaultDigit: 4,
    puzzles: [
      {
        id: "er_4_1",
        puzzleTitle: "Il contrappeso di precisione",
        riddleText: "Per calcolare 84 - 39, aggiungiamo +1 a entrambi i piatti. Cosa otteniamo?",
        equation: "(84 + 1) - (39 + 1) = ___ - 40",
        hint: "84 + 1 fa...",
        options: ["85", "84", "83", "45"],
        correctAnswer: "85",
        codeDigit: 8,
        explanation: "85 - 40 = 45. Bilanciamento perfetto!"
      },
      {
        id: "er_4_2",
        puzzleTitle: "Il cannocchiale degli zeri",
        riddleText: "Un mirino ottico deve calcolare 5600 ÷ 700. Quanti zeri puoi cancellare a entrambi i termini?",
        equation: "5600 ÷ 700 = 56 ÷ 7 = ?",
        hint: "Tabellina del 7 per arrivare a 56.",
        options: ["8", "7", "80", "56"],
        correctAnswer: "8",
        codeDigit: 8,
        explanation: "Dividendo entrambi per 100: 56 ÷ 7 = 8."
      },
      {
        id: "er_4_3",
        puzzleTitle: "Lo specchio del raddoppio",
        riddleText: "Per dividere 190 per 5 a mente, raddoppiamo entrambi i valori: (190 × 2) ÷ (5 × 2) = 380 ÷ 10 = ?",
        equation: "380 ÷ 10",
        hint: "Togli l'ultimo zero al 380.",
        options: ["38", "19", "76", "380"],
        correctAnswer: "38",
        codeDigit: 3,
        explanation: "190 ÷ 5 = 380 ÷ 10 = 38. Risolto in mezzo secondo!"
      },
      {
        id: "er_4_4",
        puzzleTitle: "Il trucco millenario",
        riddleText: "Calcola 1000 - 542 togliendo 1 a entrambi i piatti per evitare i prestiti: 999 - 541 = ?",
        equation: "999 - 541 = ?",
        hint: "9-5=4, 9-4=5, 9-1=8.",
        options: ["458", "457", "468", "542"],
        correctAnswer: "458",
        codeDigit: 4,
        explanation: "999 - 541 = 458 senza alcun prestito."
      },
      {
        id: "er_4_5",
        puzzleTitle: "La quarta chiave",
        riddleText: "Completa la proporzione: 96 ÷ 16 = (96 ÷ 8) ÷ (16 ÷ ___) = 12 ÷ 2 = 6",
        equation: "16 ÷ ___ = 2",
        hint: "Dividi 16 per lo stesso numero 8.",
        options: ["8", "2", "4", "16"],
        correctAnswer: "8",
        codeDigit: 8,
        explanation: "Dividendo entrambi per 8: 12 ÷ 2 = 6. Quarta porta superata!"
      }
    ]
  },

  // =========================================================================
  // STANZA 5: IL SANCTUM DELLO ZERO E DELL'UNO (Elementi Neutri ed Assorbenti)
  // =========================================================================
  {
    id: 5,
    name: "Il Sanctum dello Zero e dell'Uno",
    theme: "Camera di cristallo con il portale finale sigillato da codici binari",
    description: "Sei giunto nel cuore del tempio. Qui governano lo Zero (il buco nero assorbente) e l'Uno (lo specchio dell'identità). Solo risolvendo gli enigmi del divieto assoluto aprirai la camera del tesoro!",
    color: "from-emerald-600 to-teal-800",
    requiredProperty: "Elementi Neutri ed Assorbenti",
    unlockedVaultDigit: 1,
    puzzles: [
      {
        id: "er_5_1",
        puzzleTitle: "Il buco nero moltiplicativo",
        riddleText: "Una trappola algebrica recita: (987 + 654 × 3 - 21) × 0. Qual è il valore sprigionato?",
        equation: "(...) × 0 = ?",
        hint: "Qualsiasi quantità per zero viene assorbita completamente.",
        options: ["0", "987", "1", "Impossibile"],
        correctAnswer: "0",
        codeDigit: 0,
        explanation: "Lo zero è l'elemento assorbente della moltiplicazione: il risultato è 0!"
      },
      {
        id: "er_5_2",
        puzzleTitle: "Lo specchio dell'identità",
        riddleText: "Quale numero moltiplicato per 739 lo lascia esattamente 739?",
        equation: "739 × ___ = 739",
        hint: "L'elemento neutro della moltiplicazione.",
        options: ["1", "0", "739", "10"],
        correctAnswer: "1",
        codeDigit: 1,
        explanation: "L'uno (1) è l'elemento neutro moltiplicativo."
      },
      {
        id: "er_5_3",
        puzzleTitle: "La coppa vuota",
        riddleText: "Hai 0 diamanti da dividere in 15 scrigni. Quanti diamanti finiscono in ogni scrigno?",
        equation: "0 ÷ 15 = ?",
        hint: "Se non c'è nulla da dividere, cosa riceve ciascuno?",
        options: ["0", "15", "1", "Impossibile"],
        correctAnswer: "0",
        codeDigit: 0,
        explanation: "0 ÷ 15 = 0. Zero diviso un numero non nullo dà sempre zero."
      },
      {
        id: "er_5_4",
        puzzleTitle: "Il tabù proibito",
        riddleText: "Il custode del portale ti ordina di calcolare 25 ÷ 0. Qual è la tua risposta sapiente?",
        equation: "25 ÷ 0 = ?",
        hint: "Nessun numero moltiplicato per zero può fare 25!",
        options: ["È IMPOSSIBILE", "Fa 0", "Fa 25", "Fa 1"],
        correctAnswer: "È IMPOSSIBILE",
        codeDigit: 9,
        explanation: "Dividere per zero è una contraddizione logica: è IMPOSSIBILE!"
      },
      {
        id: "er_5_5",
        puzzleTitle: "La chiave cosmica",
        riddleText: "Quale numero è contemporaneamente neutro nell'addizione e assorbente nella moltiplicazione?",
        equation: "Neutro in +  e  Assorbente in ×",
        hint: "a + X = a   e   a × X = X.",
        options: ["Lo ZERO (0)", "L'UNO (1)", "Il DUE (2)", "Nessuno"],
        correctAnswer: "Lo ZERO (0)",
        codeDigit: 7,
        explanation: "Lo ZERO! 5 + 0 = 5 e 5 × 0 = 0. Il portale finale si spalanca!"
      }
    ]
  }
];

export function generateEscapeRooms(): EscapeRoom[] {
  // Deep copy base structure
  const rooms: EscapeRoom[] = JSON.parse(JSON.stringify(ESCAPE_ROOMS));

  // Stanza 1: Commutativa
  const a1_1 = Math.floor(Math.random() * 20) + 12;
  const b1_1 = Math.floor(Math.random() * 40) + 50;
  rooms[0].puzzles[0].riddleText = `Sul leggio a sinistra c'è inciso '${a1_1} + ${b1_1}'. Quale codice simmetrico aziona l'ingranaggio a destra?`;
  rooms[0].puzzles[0].equation = `${a1_1} + ${b1_1} = ___ + ${a1_1}`;
  rooms[0].puzzles[0].correctAnswer = `${b1_1}`;
  rooms[0].puzzles[0].options = [
    `${b1_1}`,
    `${a1_1 + b1_1}`,
    `${a1_1}`,
    `${Math.abs(b1_1 - a1_1)}`
  ];
  rooms[0].puzzles[0].explanation = `La proprietà commutativa garantisce che ${a1_1} + ${b1_1} = ${b1_1} + ${a1_1} = ${a1_1 + b1_1}.`;

  const a1_2 = Math.floor(Math.random() * 4) + 5; // 5..8
  const b1_2 = Math.floor(Math.random() * 6) + 11; // 11..16
  rooms[0].puzzles[1].riddleText = `Una mensola contiene ${a1_2} file da ${b1_2} pergamene. L'altra mensola ne contiene ${b1_2} file: quante pergamene devono esserci per fila per avere lo stesso totale?`;
  rooms[0].puzzles[1].equation = `${a1_2} × ${b1_2} = ${b1_2} × ___`;
  rooms[0].puzzles[1].correctAnswer = `${a1_2}`;
  rooms[0].puzzles[1].options = [`${a1_2}`, `${a1_2 * b1_2}`, `${b1_2}`, `${a1_2 + b1_2}`];
  rooms[0].puzzles[1].explanation = `Per la commutativa della moltiplicazione: ${a1_2} × ${b1_2} = ${b1_2} × ${a1_2} = ${a1_2 * b1_2}.`;

  // Stanza 2: Associativa
  const tensTarget = 40;
  const a2_1 = Math.floor(Math.random() * 8) + 21; // 21..28
  const b2_1 = tensTarget - a2_1;
  const c2_1 = Math.floor(Math.random() * 30) + 35;
  rooms[1].puzzles[0].riddleText = `Nell'ampolla ci sono tre reagenti: ${a2_1} ml, ${b2_1} ml e ${c2_1} ml. Quale associazione crea subito una decina tonda?`;
  rooms[1].puzzles[0].equation = `(${a2_1} + ${b2_1}) + ${c2_1} = ___ + ${c2_1}`;
  rooms[1].puzzles[0].correctAnswer = `${tensTarget}`;
  rooms[1].puzzles[0].options = [`${tensTarget}`, `${tensTarget + 10}`, `${tensTarget - 10}`, `${tensTarget + c2_1}`];
  rooms[1].puzzles[0].explanation = `${a2_1} + ${b2_1} = ${tensTarget}. Sommare ${tensTarget} + ${c2_1} dà ${tensTarget + c2_1} al volo.`;

  // Stanza 3: Invariantiva
  const delta3 = Math.floor(Math.random() * 2) + 1; // 1 o 2
  const b3 = 30 - delta3;
  const a3 = b3 + Math.floor(Math.random() * 25) + 30;
  rooms[2].puzzles[0].riddleText = `La lastra mostra ${a3} - ${b3}. Se aggiungiamo +${delta3} al secondo termine per farlo diventare 30, cosa dobbiamo fare al primo?`;
  rooms[2].puzzles[0].equation = `${a3} - ${b3} = (${a3} + ${delta3}) - (${b3} + ${delta3}) = ___ - 30`;
  rooms[2].puzzles[0].correctAnswer = `${a3 + delta3}`;
  rooms[2].puzzles[0].options = [`${a3 + delta3}`, `${a3 - delta3}`, `${a3}`, `${a3 + delta3 + 5}`];
  rooms[2].puzzles[0].explanation = `Invariantiva: aggiungendo +${delta3} a entrambi otteniamo ${a3 + delta3} - 30 = ${a3 - b3}.`;

  // Stanza 4: Distributiva
  const factor4 = Math.floor(Math.random() * 4) + 6; // 6..9
  const partUnits = Math.floor(Math.random() * 4) + 3; // 3..6
  rooms[3].puzzles[0].riddleText = `L'ingranaggio centrale deve calcolare ${factor4} × (10 + ${partUnits}). Come si scompone sui due pistoni idraulici?`;
  rooms[3].puzzles[0].equation = `${factor4} × (10 + ${partUnits}) = (${factor4} × 10) + (___)`;
  rooms[3].puzzles[0].correctAnswer = `${factor4} × ${partUnits}`;
  rooms[3].puzzles[0].options = [`${factor4} × ${partUnits}`, `${partUnits} × 10`, `${factor4} + ${partUnits}`, `10 + ${partUnits}`];
  rooms[3].puzzles[0].explanation = `Distribuiamo il ${factor4}: (${factor4} × 10) + (${factor4} × ${partUnits}) = ${factor4 * 10} + ${factor4 * partUnits} = ${factor4 * (10 + partUnits)}.`;

  // Stanza 5: Neutri & Assorbenti
  const zeroTerm = Math.floor(Math.random() * 60) + 35;
  rooms[4].puzzles[3].riddleText = `Il custode del portale ti ordina di calcolare ${zeroTerm} ÷ 0. Qual è la tua risposta sapiente?`;
  rooms[4].puzzles[3].equation = `${zeroTerm} ÷ 0 = ?`;
  rooms[4].puzzles[3].hint = `Nessun numero moltiplicato per zero può fare ${zeroTerm}!`;

  return rooms;
}
