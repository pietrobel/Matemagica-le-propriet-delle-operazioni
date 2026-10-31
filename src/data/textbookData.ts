import { TextbookChapter } from '../types/math';

export const TEXTBOOK_CHAPTERS: TextbookChapter[] = [
  // =========================================================================
  // CAPITOLO 1: LE PROPRIETÀ DELL'ADDIZIONE
  // =========================================================================
  {
    id: 1,
    title: "Capitolo 1 – Le Proprietà dell'Addizione",
    subtitle: "Commutativa e Associativa: come trasformare i calcoli in scorciatoie veloci",
    operationCategory: 'addizione',
    introduction: `L'addizione è la prima operazione che impariamo, ma nasconde due potenti "superpoteri" matematici che gli studenti della scuola secondaria devono conoscere a fondo: la proprietà commutativa e la proprietà associativa.
Queste due proprietà ci permettono di riordinare e raggruppare i numeri a nostro piacimento, senza mai alterare la somma finale. Nel calcolo a mente o con espressioni lunghe, saper riconoscere quale proprietà usare fa la differenza tra impiegare due minuti a fare calcoli a colonna e trovare la soluzione in cinque secondi!`,
    generalRuleBox: {
      ruleName: "Le Regole Fondamentali dell'Addizione",
      verbalRule: `1. Proprietà Commutativa: Cambiando l'ordine degli addendi, la somma NON cambia.
2. Proprietà Associativa: Se a due o più addendi si sostituisce la loro somma parziale, il risultato finale NON cambia. (La sua forma dissociativa permette di scomporre un addendo per agevolare il raggruppamento).`,
      algebraicFormula: "Commutativa: a + b = b + a   |   Associativa: (a + b) + c = a + (b + c)",
      conditionNote: "Valide per qualsiasi numero nell'insieme dei Numeri Naturali (ℕ) e Razionali (ℚ)."
    },
    workedExamples: [
      {
        title: "Esempio 1: Applicazione della Proprietà Commutativa",
        initialEquation: "7 + 68 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Riconoscimento: sommare un numero piccolo (7) a uno grande (68) partendo dal primo richiede di contare in avanti di 7 unità da 68.",
            mathExpression: "7 + 68"
          },
          {
            stepNumber: 2,
            text: "Scambio dell'ordine degli addendi applicando la proprietà commutativa:",
            mathExpression: "68 + 7"
          },
          {
            stepNumber: 3,
            text: "Calcolo rapido: 68 + 2 = 70, e 70 + 5 = 75.",
            mathExpression: "75"
          }
        ],
        resultExplanation: "La somma è 75. Cambiare l'ordine ha reso il calcolo immediato ed evita errori di conteggio.",
        practicalTip: "Nel calcolo a mente, posiziona sempre per primo l'addendo con il valore assoluto maggiore!"
      },
      {
        title: "Esempio 2: Applicazione della Proprietà Associativa con 'Amici del 100'",
        initialEquation: "37 + 84 + 63 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Osserviamo le unità: notiamo che 37 termina con 7 e 63 termina con 3. Poiché 7 + 3 = 10, questi due addendi formano un multiplo di dieci perfetto!",
            mathExpression: "(37 + 63) + 84"
          },
          {
            stepNumber: 2,
            text: "Associamo prima 37 e 63 racchiudendoli idealmente tra parentesi:",
            mathExpression: "37 + 63 = 100"
          },
          {
            stepNumber: 3,
            text: "Sostituiamo la loro somma parziale (100) all'interno dell'operazione:",
            mathExpression: "100 + 84 = 184"
          }
        ],
        resultExplanation: "Risultato: 184. Invece di sommare 37 + 84 (= 121) e poi 121 + 63 (= 184), abbiamo creato subito la cifra tonda 100.",
        practicalTip: "Cerca sempre le coppie che sommate danno 10, 20, 50 o 100 prima di iniziare qualsiasi addizione a catena."
      },
      {
        title: "Esempio 3: Raggruppamento senza cambiare l'ordine (Associativa pura)",
        initialEquation: "(14 + 26) + 19 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "L'ordine degli elementi è 14, 26, 19 e RIMANE 14, 26, 19. Cambia unicamente l'esecuzione delle operazioni:",
            mathExpression: "(14 + 26) + 19"
          },
          {
            stepNumber: 2,
            text: "Risolviamo la parentesi: 14 + 26 fa 40.",
            mathExpression: "40 + 19"
          },
          {
            stepNumber: 3,
            text: "Sommiamo 40 a 19 per ottenere il totale:",
            mathExpression: "59"
          }
        ],
        resultExplanation: "L'uguaglianza (14 + 26) + 19 = 14 + (26 + 19) dimostra che la posizione delle parentesi non muta il risultato finale di 59.",
        practicalTip: "Attenzione: se cambi l'ordine usi la commutativa; se cambi solo le parentesi e il raggruppamento usi l'associativa!"
      },
      {
        title: "Esempio 4: Proprietà Associativa in forma Dissociativa",
        initialEquation: "48 + 35 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Scomponiamo il 35 in due addendi comodi: notiamo che a 48 mancano 2 unità per diventare 50. Quindi scriviamo 35 come 2 + 33:",
            mathExpression: "48 + (2 + 33)"
          },
          {
            stepNumber: 2,
            text: "Associamo 48 con 2:",
            mathExpression: "(48 + 2) + 33"
          },
          {
            stepNumber: 3,
            text: "Eseguiamo la somma della decina tonda:",
            mathExpression: "50 + 33 = 83"
          }
        ],
        resultExplanation: "Risultato: 83. La dissociazione (scomposizione) è l'inversa dell'associazione ed è la regina del calcolo mentale.",
        practicalTip: "Chiediti sempre: 'Quanto manca al primo numero per raggiungere la decina successiva?' ed estrai quel valore dal secondo addendo."
      },
      {
        title: "Esempio 5: Come distinguere Commutativa e Associativa in una prova scritta",
        initialEquation: "Confronto tra due trasformazioni di 12 + 15 + 8",
        steps: [
          {
            stepNumber: 1,
            text: "Trasformazione A: 12 + 8 + 15. I numeri hanno cambiato posizione fisica (15 e 8 si sono scambiati di posto).",
            mathExpression: "Proprietà Commutativa"
          },
          {
            stepNumber: 2,
            text: "Trasformazione B: (12 + 15) + 8 = 12 + (15 + 8). I numeri mantengono l'ordine 12, 15, 8, ma cambia l'ordine di calcolo indicato dalle parentesi.",
            mathExpression: "Proprietà Associativa"
          },
          {
            stepNumber: 3,
            text: "Trasformazione C: (12 + 8) + 15. Sono state applicate entrambe: prima la commutativa per avvicinare l'8 al 12, poi l'associativa per raggrupparli.",
            mathExpression: "Commutativa + Associativa combinata"
          }
        ],
        resultExplanation: "Questa distinzione chiara è fondamentale nelle verifiche scolastiche per evitare confusioni comuni.",
        practicalTip: "Se la sequenza dei numeri da sinistra a destra cambia, c'è SEMPRE di mezzo la proprietà commutativa."
      }
    ],
    practicalApplication: {
      whyItMatters: "Nel mondo reale, quando fai la spesa o calcoli il punteggio di una partita a squadre, non sommi gli importi nell'ordine in cui capitano. Raggruppi i centesimi complementari (es. €1,30 + €0,70 = €2,00) per calcolare la spesa a mente prima di arrivare alla cassa.",
      mentalMathSecret: "Identifica le 'decine rotonde': 1+9, 2+8, 3+7, 4+6, 5+5. Trasforma sempre una catena complessa in una somma di multipli di 10.",
      realLifeScenario: "Durante un inventario scolastico hai 17 quaderni blu, 45 quaderni rossi e 23 quaderni verdi. Fai (17 + 23) + 45 = 40 + 45 = 85 quaderni istantaneamente!"
    },
    miniChecks: [
      {
        id: "mc_ch1_1",
        question: "Nella trasformazione (28 + 14) + 6 = 28 + (14 + 6), quale proprietà è stata applicata in modo puro?",
        promptEquation: "(28 + 14) + 6 = 28 + (14 + 6)",
        options: [
          "Proprietà Commutativa, perché i numeri si sono scambiati di posto",
          "Proprietà Associativa, perché l'ordine dei termini 28, 14, 6 è rimasto identico ma è cambiato il raggruppamento delle parentesi",
          "Proprietà Invariantiva dell'addizione",
          "Proprietà Distributiva"
        ],
        correctIndex: 1,
        explanation: "Corretto! L'ordine 28, 14, 6 non è stato invertito; sono solo state spostate le parentesi per calcolare prima 14 + 6 = 20, quindi si tratta della proprietà associativa pura."
      },
      {
        id: "mc_ch1_2",
        question: "Quale operazione conviene svolgere per prima per calcolare a mente (46 + 89) + 54?",
        promptEquation: "(46 + 89) + 54",
        options: [
          "46 + 89 perché è all'interno della parentesi",
          "89 + 54 per togliere di mezzo i numeri più grandi",
          "46 + 54 perché termina con 6 e 4 e forma la comoda centena tonda 100",
          "Nessuna, l'addizione a mente non si può semplificare"
        ],
        correctIndex: 2,
        explanation: "Esatto! 46 + 54 = 100. Applicando commutativa e associativa otteniamo subito (46 + 54) + 89 = 100 + 89 = 189!"
      },
      {
        id: "mc_ch1_3",
        question: "Completa la formula della proprietà associativa senza modificare l'ordine dei termini: (9 + 31) + 15 = 9 + (___ + 15)",
        promptEquation: "(9 + 31) + 15 = 9 + (___ + 15)",
        options: [
          "31",
          "40",
          "9",
          "15"
        ],
        correctIndex: 0,
        explanation: "Bravissimo! Il termine mancante è 31. L'espressione diventa 9 + (31 + 15), mantenendo intatta la sequenza 9, 31, 15."
      }
    ]
  },

  // =========================================================================
  // CAPITOLO 2: LE PROPRIETÀ DELLA MOLTIPLICAZIONE
  // =========================================================================
  {
    id: 2,
    title: "Capitolo 2 – Le Proprietà della Moltiplicazione",
    subtitle: "Commutativa, Associativa e la potente Proprietà Distributiva",
    operationCategory: 'moltiplicazione',
    introduction: `La moltiplicazione non è altro che un'addizione ripetuta di addendi tutti uguali. Proprio per questo motivo eredita le proprietà dell'addizione (commutativa e associativa), ma ne guadagna una del tutto nuova e straordinariamente potente per la scuola media e l'algebra superiore: la PROPRIETÀ DISTRIBUTIVA.
Comprendere a fondo come distribuire la moltiplicazione rispetto a somme e differenze è la chiave per padroneggiare il calcolo mentale veloce e il calcolo letterale futuro con monomi e polinomi!`,
    generalRuleBox: {
      ruleName: "Le Regole Fondamentali della Moltiplicazione",
      verbalRule: `1. Proprietà Commutativa: Cambiando l'ordine dei fattori, il prodotto NON cambia.
2. Proprietà Associativa: Se a due o più fattori si sostituisce il loro prodotto parziale, il risultato finale NON cambia.
3. Proprietà Distributiva: Per moltiplicare un numero per una somma (o differenza), si moltiplica quel numero per ciascun termine e si sommano (o sottraggono) i prodotti ottenuti.`,
      algebraicFormula: "Commutativa: a × b = b × a   |   Associativa: (a × b) × c = a × (b × c)   |   Distributiva: a × (b + c) = (a × b) + (a × c)",
      conditionNote: "La distributiva vale sia a destra che a sinistra: (b + c) × a = (b × a) + (c × a)."
    },
    workedExamples: [
      {
        title: "Esempio 1: Proprietà Commutativa nel recupero tabelline",
        initialEquation: "Non ricordi 4 × 9? Usa la commutativa!",
        steps: [
          {
            stepNumber: 1,
            text: "Se non hai ancora memorizzato la tabellina del 4 per 9, scambia i fattori:",
            mathExpression: "4 × 9 = 9 × 4"
          },
          {
            stepNumber: 2,
            text: "La tabellina del 9 o la tecnica delle mani per il 9 è spesso più facile da visualizzare:",
            mathExpression: "9 × 4 = 36"
          },
          {
            stepNumber: 3,
            text: "Conclusione per la proprietà commutativa:",
            mathExpression: "4 × 9 = 36"
          }
        ],
        resultExplanation: "I fattori cambiano posto, ma il rettangolo o la griglia di elementi ha la stessa identica area (4 righe da 9 = 9 righe da 4).",
        practicalTip: "Se una moltiplicazione ti mette in difficoltà, inverti subito i fattori: spesso l'altra tabellina ti risulterà familiare!"
      },
      {
        title: "Esempio 2: Proprietà Associativa e la 'Strategia del 10 e del 100'",
        initialEquation: "25 × 17 × 4 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Eseguire 25 × 17 a mente è laborioso (425) e poi fare 425 × 4 richiede calcoli lunghi.",
            mathExpression: "25 × 17 × 4"
          },
          {
            stepNumber: 2,
            text: "Applichiamo prima la proprietà commutativa per affiancare 25 e 4, poi l'associativa per raggrupparli:",
            mathExpression: "(25 × 4) × 17"
          },
          {
            stepNumber: 3,
            text: "Calcoliamo il prodotto della coppia amica: 25 × 4 = 100:",
            mathExpression: "100 × 17 = 1700"
          }
        ],
        resultExplanation: "Risultato: 1700. In tre secondi abbiamo risolto un calcolo a tre cifre creando il fattore 100.",
        practicalTip: "Memorizza le 'coppie d'oro della moltiplicazione': 2 × 5 = 10, 4 × 25 = 100, 8 × 125 = 1000, 20 × 5 = 100, 50 × 2 = 100."
      },
      {
        title: "Esempio 3: Proprietà Distributiva rispetto all'addizione (Scomposizione Decine/Unità)",
        initialEquation: "7 × 18 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Scomponiamo il numero a due cifre 18 nella somma di una decina e unità: 18 = 10 + 8:",
            mathExpression: "7 × (10 + 8)"
          },
          {
            stepNumber: 2,
            text: "Distribuiamo il moltiplicatore 7 sia al 10 che all'8:",
            mathExpression: "(7 × 10) + (7 × 8)"
          },
          {
            stepNumber: 3,
            text: "Eseguiamo le due moltiplicazioni elementari:",
            mathExpression: "70 + 56"
          },
          {
            stepNumber: 4,
            text: "Sommiamo i risultati parziali:",
            mathExpression: "126"
          }
        ],
        resultExplanation: "Risultato: 126. Scomporre in decine rende qualsiasi moltiplicazione a due cifre fattibile a mente senza carta né penna.",
        practicalTip: "La proprietà distributiva è la base dell'algoritmo della moltiplicazione in colonna che impariamo a scuola!"
      },
      {
        title: "Esempio 4: Proprietà Distributiva rispetto alla sottrazione (Arrotondamento per eccesso)",
        initialEquation: "6 × 29 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Poiché 29 è vicinissimo a 30, possiamo esprimerlo come una differenza: 29 = 30 - 1:",
            mathExpression: "6 × (30 - 1)"
          },
          {
            stepNumber: 2,
            text: "Distribuiamo il fattore 6 ai due termini:",
            mathExpression: "(6 × 30) - (6 × 1)"
          },
          {
            stepNumber: 3,
            text: "Calcoliamo i prodotti parziali:",
            mathExpression: "180 - 6"
          },
          {
            stepNumber: 4,
            text: "Eseguiamo la sottrazione:",
            mathExpression: "174"
          }
        ],
        resultExplanation: "Risultato: 174. Quando un fattore finisce per 8 o per 9, è quasi sempre più conveniente distribuire rispetto alla sottrazione!",
        practicalTip: "Pensare a 29 come 30 - 1 o a 19 come 20 - 1 velocizza i calcoli di vendita e percentuali."
      },
      {
        title: "Esempio 5: Raccoglimento a fattore comune (Distributiva al contrario)",
        initialEquation: "(13 × 18) + (13 × 2) = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Notiamo che il fattore 13 si ripete in entrambi i prodotti. È un fattore comune!",
            mathExpression: "Fattore comune = 13"
          },
          {
            stepNumber: 2,
            text: "Applichiamo la proprietà distributiva in senso inverso (raccoglimento):",
            mathExpression: "13 × (18 + 2)"
          },
          {
            stepNumber: 3,
            text: "Sommiamo prima la parentesi: 18 + 2 = 20:",
            mathExpression: "13 × 20"
          },
          {
            stepNumber: 4,
            text: "Moltiplichiamo per 20: 13 × 2 = 26, quindi con lo zero fa 260:",
            mathExpression: "260"
          }
        ],
        resultExplanation: "Risultato: 260. Invece di calcolare 13 × 18 = 234 e poi 234 + 26, abbiamo fatto un'unica moltiplicazione pulita.",
        practicalTip: "Raccogliere a fattore comune è una delle competenze algebriche più importanti che userai anche alle superiori!"
      }
    ],
    practicalApplication: {
      whyItMatters: "La proprietà distributiva è la regina del calcolo geometrico: calcolare l'area di una stanza a forma di 'L' o con due piastrellature diverse corrisponde esattamente a sommare le aree dei due rettangoli componenti a × b + a × c.",
      mentalMathSecret: "Per moltiplicare per 15, moltiplica per 10 e aggiungi la sua metà (perché 15 = 10 + 5). Es: 24 × 15 = 240 + 120 = 360!",
      realLifeScenario: "Comperi 6 quaderni da €3,00 e 6 penne da €2,00. Invece di fare (6 × 3) + (6 × 2) = 18 + 12 = 30, fai 6 × (3 + 2) = 6 × 5 = €30,00!"
    },
    miniChecks: [
      {
        id: "mc_ch2_1",
        question: "Quale delle seguenti uguaglianze illustra CORRETTAMENTE la proprietà distributiva della moltiplicazione rispetto all'addizione?",
        promptEquation: "8 × (20 + 5)",
        options: [
          "(8 × 20) + 5",
          "(8 × 20) + (8 × 5)",
          "(8 + 20) × (8 + 5)",
          "8 × 20 × 5"
        ],
        correctIndex: 1,
        explanation: "Esatto! Il fattore esterno 8 deve essere moltiplicato per ENTRAMBI i termini della somma: (8 × 20) + (8 × 5) = 160 + 40 = 200."
      },
      {
        id: "mc_ch2_2",
        question: "Per calcolare a mente 5 × 37 × 20, quale accoppiamento strategico sfrutta l'associativa per creare una centena tonda?",
        promptEquation: "5 × 37 × 20",
        options: [
          "(5 × 37) × 20",
          "37 × (5 × 20)",
          "(37 × 20) × 5",
          "5 × (37 + 20)"
        ],
        correctIndex: 1,
        explanation: "Correttissimo! Poiché 5 × 20 = 100, associando il 5 e il 20 otteniamo 37 × 100 = 3700 in un solo secondo!"
      },
      {
        id: "mc_ch2_3",
        question: "Nell'espressione (4 × 15) × 6 = 4 × (15 × 6), è corretto affermare che è stata applicata la proprietà commutativa?",
        promptEquation: "(4 × 15) × 6 = 4 × (15 × 6)",
        options: [
          "Sì, perché i fattori si sono scambiati di posto",
          "No, l'ordine dei fattori 4, 15, 6 è rimasto identico; è cambiata solo l'associazione tra parentesi, quindi è la Proprietà Associativa",
          "Sì, perché 15 × 6 fa 90",
          "No, è la proprietà distributiva"
        ],
        correctIndex: 1,
        explanation: "Perfetto! Non c'è alcuno scambio nell'ordine di lettura (4, 15, 6 rimane 4, 15, 6), perciò si tratta dell'associativa pura."
      }
    ]
  },

  // =========================================================================
  // CAPITOLO 3: LE PROPRIETÀ DELLA SOTTRAZIONE
  // =========================================================================
  {
    id: 3,
    title: "Capitolo 3 – Le Proprietà della Sottrazione",
    subtitle: "La Proprietà Invariantiva: equilibrare minuendo e sottraendo",
    operationCategory: 'sottrazione',
    introduction: `La sottrazione NON gode della proprietà commutativa né della proprietà associativa: se scambi 10 - 4 con 4 - 10 nei numeri naturali ottieni un'operazione impossibile (e nei numeri relativi otterresti -6 anziché +6).
Tuttavia, la sottrazione possiede una proprietà fondamentale, elegantissima e utilissima nel calcolo a mente: la PROPRIETÀ INVARIANTIVA.
Pensala come una bilancia o come la distanza tra due persone: se entrambi fanno due passi avanti, la distanza tra loro rimane identica!`,
    generalRuleBox: {
      ruleName: "La Regola Invariantiva della Sottrazione",
      verbalRule: "Aggiungendo o sottraendo uno stesso numero sia al minuendo che al sottraendo, la differenza NON cambia. (Attenzione: la sottrazione NON è commutativa: a - b ≠ b - a; NON è associativa: (a - b) - c ≠ a - (b - c)).",
      algebraicFormula: "a - b = (a + k) - (b + k)    oppure    a - b = (a - k) - (b - k)",
      conditionNote: "Nel caso della sottrazione con - k, k deve essere minore o uguale sia ad a che a b nell'insieme ℕ."
    },
    workedExamples: [
      {
        title: "Esempio 1: Proprietà Invariantiva con aggiunta (+k) per creare una decina tonda",
        initialEquation: "83 - 29 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Il sottraendo 29 è a un soffio da 30. Aggiungiamo 1 per farlo diventare un comodissimo 30:",
            mathExpression: "29 + 1 = 30"
          },
          {
            stepNumber: 2,
            text: "Per la proprietà invariantiva, dobbiamo aggiungere esattamente la stessa quantità (+1) anche al minuendo 83:",
            mathExpression: "83 + 1 = 84"
          },
          {
            stepNumber: 3,
            text: "Riscriviamo la sottrazione trasformata:",
            mathExpression: "(83 + 1) - (29 + 1) = 84 - 30"
          },
          {
            stepNumber: 4,
            text: "Calcolo mentale immediato:",
            mathExpression: "84 - 30 = 54"
          }
        ],
        resultExplanation: "Risultato: 54. Nessun prestito, nessun riporto: togliere 30 da 84 è un'operazione elementare.",
        practicalTip: "Quando il secondo termine termina per 8 o per 9, aggiungi sempre 2 o 1 a entrambi i termini per arrotondare alla decina superiore."
      },
      {
        title: "Esempio 2: Proprietà Invariantiva con sottrazione (-k) per togliere le unità",
        initialEquation: "75 - 35 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Notiamo che entrambi i numeri terminano per 5. Possiamo togliere 5 a entrambi (-5):",
            mathExpression: "k = 5"
          },
          {
            stepNumber: 2,
            text: "Applichiamo la sottrazione simultanea dello stesso valore:",
            mathExpression: "(75 - 5) - (35 - 5)"
          },
          {
            stepNumber: 3,
            text: "Otteniamo una differenza tra decine piene:",
            mathExpression: "70 - 30 = 40"
          }
        ],
        resultExplanation: "Risultato: 40. Sottraendo la stessa quantità a entrambi i termini, abbiamo eliminato le cifre delle unità.",
        practicalTip: "Se minuendo e sottraendo hanno la stessa cifra delle unità (es. 94 - 44), sottrai quella cifra a entrambi: diventa 90 - 40 = 50!"
      },
      {
        title: "Esempio 3: Applicazione con centinaia e migliaia",
        initialEquation: "1000 - 438 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Fare 1000 - 438 in colonna richiede una catena di prestiti fastidiosa attraverso tutti gli zeri.",
            mathExpression: "1000 - 438"
          },
          {
            stepNumber: 2,
            text: "Sottraiamo 1 a entrambi i termini per la proprietà invariantiva (-1):",
            mathExpression: "(1000 - 1) - (438 - 1)"
          },
          {
            stepNumber: 3,
            text: "Trasformiamo l'operazione in una senza alcun prestito:",
            mathExpression: "999 - 437"
          },
          {
            stepNumber: 4,
            text: "Calcoliamo cifra per cifra da sinistra a destra (9-4=5, 9-3=6, 9-7=2):",
            mathExpression: "562"
          }
        ],
        resultExplanation: "Risultato: 562. Il trucco di sottrarre 1 da 1000, 10.000 o 100.000 è il trucco più famoso e amato dei matematici!",
        practicalTip: "Ricordalo sempre nei compiti in classe: sottrarre da 999 è infinitamente più facile che sottrarre da 1000."
      },
      {
        title: "Esempio 4: Dimostrazione del perché la sottrazione NON è commutativa",
        initialEquation: "Confronto tra 15 - 8 e 8 - 15",
        steps: [
          {
            stepNumber: 1,
            text: "Calcoliamo 15 - 8:",
            mathExpression: "15 - 8 = 7"
          },
          {
            stepNumber: 2,
            text: "Ora proviamo a invertire l'ordine dei termini come faremmo con l'addizione:",
            mathExpression: "8 - 15 = ?"
          },
          {
            stepNumber: 3,
            text: "Nell'insieme dei numeri naturali ℕ, da 8 non si può togliere 15! Nei numeri relativi ℤ otterremmo -7, che è l'opposto di 7:",
            mathExpression: "7 ≠ -7"
          }
        ],
        resultExplanation: "Poiché 15 - 8 ≠ 8 - 15, la sottrazione NON ammette la proprietà commutativa.",
        practicalTip: "Se un esercizio ti chiede: 'Applica la commutativa a 24 - 10', la risposta corretta è: 'Impossibile: la sottrazione non è commutativa!'"
      },
      {
        title: "Esempio 5: Dimostrazione del perché la sottrazione NON è associativa",
        initialEquation: "Confronto tra (20 - 10) - 5 e 20 - (10 - 5)",
        steps: [
          {
            stepNumber: 1,
            text: "Calcoliamo il primo membro (partendo dalla prima coppia):",
            mathExpression: "(20 - 10) - 5 = 10 - 5 = 5"
          },
          {
            stepNumber: 2,
            text: "Calcoliamo il secondo membro (spostando le parentesi sulla seconda coppia):",
            mathExpression: "20 - (10 - 5) = 20 - 5 = 15"
          },
          {
            stepNumber: 3,
            text: "Confrontiamo i due risultati:",
            mathExpression: "5 ≠ 15"
          }
        ],
        resultExplanation: "Spostare le parentesi nella sottrazione cambia radicalmente il risultato! Dunque la sottrazione NON è associativa.",
        practicalTip: "Nelle espressioni con sole sottrazioni senza parentesi, si procede rigorosamente in ordine da sinistra verso destra."
      }
    ],
    practicalApplication: {
      whyItMatters: "Nel calcolo della data di nascita o degli intervalli di tempo, se vuoi sapere quanti anni sono passati tra il 1978 e il 2024, aggiungi 2 anni a entrambi: calcolare 2026 - 1980 è una passeggiata (46 anni) rispetto a fare prestiti tra secoli!",
      mentalMathSecret: "Per togliere un numero che finisce per 9 (come -39), aggiungi 1 a entrambi (+1): la sottrazione si trasforma in un comodissimo -40.",
      realLifeScenario: "Hai €62 nel salvadanaio e vuoi comprare un videogioco da €49. Aggiungi €1 a entrambi: (62 + 1) - (49 + 1) = 63 - 50 = €13 di resto!"
    },
    miniChecks: [
      {
        id: "mc_ch3_1",
        question: "Per calcolare a mente 64 - 38 applicando la proprietà invariantiva in modo ottimale, quale trasformazione conviene fare?",
        promptEquation: "64 - 38",
        options: [
          "Aggiungere 2 solo al 38 per farlo diventare 40",
          "Aggiungere 2 sia al 64 che al 38, ottenendo (64 + 2) - (38 + 2) = 66 - 40",
          "Invertire i termini facendo 38 - 64",
          "Sottrarre 4 a entrambi i termini"
        ],
        correctIndex: 1,
        explanation: "Corretto! La proprietà invariantiva impone di applicare la STESSA variazione (+2) a entrambi i membri, portando a 66 - 40 = 26 senza errori."
      },
      {
        id: "mc_ch3_2",
        question: "Perché l'uguaglianza 18 - 5 = 5 - 18 è FALSA nella matematica della scuola secondaria?",
        promptEquation: "18 - 5 ≠ 5 - 18",
        options: [
          "Perché la proprietà associativa non è stata rispettata",
          "Perché la sottrazione NON gode della proprietà commutativa: cambiando l'ordine dei termini il risultato cambia (13 ≠ -13)",
          "Perché lo zero è elemento assorbente",
          "È vera se si usano le frazioni"
        ],
        correctIndex: 1,
        explanation: "Esatto! La sottrazione non è commutativa. Minuendo e sottraendo hanno ruoli asimmetrici e non possono essere scambiati."
      },
      {
        id: "mc_ch3_3",
        question: "Quale numero va inserito nello spazio vuoto per rendere vera l'applicazione dell'invariantiva?  92 - 47 = (92 + 3) - (47 + ___)",
        promptEquation: "92 - 47 = (92 + 3) - (47 + ___)",
        options: [
          "3",
          "5",
          "47",
          "0"
        ],
        correctIndex: 0,
        explanation: "Perfetto! Poiché sono state aggiunte 3 unità al minuendo 92, bisogna obbligatoriamente aggiungere 3 unità anche al sottraendo 47 per mantenere il risultato invariato (95 - 50 = 45)."
      }
    ]
  },

  // =========================================================================
  // CAPITOLO 4: LE PROPRIETÀ DELLA DIVISIONE
  // =========================================================================
  {
    id: 4,
    title: "Capitolo 4 – Le Proprietà della Divisione",
    subtitle: "Proprietà Invariantiva e Semplificazione: dividere come veri matematici",
    operationCategory: 'divisione',
    introduction: `La divisione è l'operazione inversa della moltiplicazione. Come per la sottrazione, la divisione NON è commutativa (12 ÷ 4 = 3, ma 4 ÷ 12 = 1/3) e NON è associativa.
Tuttavia, la divisione è la regina della PROPRIETÀ INVARIANTIVA moltiplicativa: se moltiplichi o dividi sia il dividendo che il divisore per uno stesso numero (diverso da zero), il quoziente non cambia.
È questa la proprietà che ti permette di 'cancellare gli zeri', semplificare le frazioni e risolvere divisioni con numeri decimali!`,
    generalRuleBox: {
      ruleName: "La Regola Invariantiva della Divisione",
      verbalRule: "Moltiplicando o dividendo per uno stesso numero diverso da zero sia il dividendo che il divisore, il quoziente (il risultato) NON cambia. Il resto, se presente, risulta anch'esso moltiplicato o diviso per quello stesso numero.",
      algebraicFormula: "a ÷ b = (a × k) ÷ (b × k)    oppure    a ÷ b = (a ÷ k) ÷ (b ÷ k)    [con k ≠ 0 e b ≠ 0]",
      conditionNote: "Fondamentale: il numero k deve essere diverso da zero! Non si può mai moltiplicare o dividere per zero nell'invariantiva."
    },
    workedExamples: [
      {
        title: "Esempio 1: Cancellazione degli zeri finali (Divisione per 10, 100, 1000)",
        initialEquation: "3600 ÷ 400 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Dividendo (3600) e divisore (400) terminano entrambi con due zeri. Possiamo dividere entrambi per 100:",
            mathExpression: "k = 100"
          },
          {
            stepNumber: 2,
            text: "Applichiamo la proprietà invariantiva dividendo per 100:",
            mathExpression: "(3600 ÷ 100) ÷ (400 ÷ 100)"
          },
          {
            stepNumber: 3,
            text: "L'operazione diventa una divisione elementare tra numeri a una cifra:",
            mathExpression: "36 ÷ 4"
          },
          {
            stepNumber: 4,
            text: "Risultato immediato dalla tabellina del 4:",
            mathExpression: "9"
          }
        ],
        resultExplanation: "Risultato: 9. Togliere lo stesso numero di zeri da dividendo e divisore è l'applicazione più frequente dell'invariantiva.",
        practicalTip: "Attenzione: puoi togliere solo il numero di zeri presenti nel termine che ne ha di meno! In 5000 ÷ 200 puoi togliere al massimo due zeri (50 ÷ 2 = 25)."
      },
      {
        title: "Esempio 2: Raddoppiare entrambi i termini per eliminare il divisore 5",
        initialEquation: "230 ÷ 5 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Dividere per 5 a mente può richiedere tempo. Ma se moltiplichiamo 5 per 2, otteniamo 10!",
            mathExpression: "5 × 2 = 10"
          },
          {
            stepNumber: 2,
            text: "Per la proprietà invariantiva, moltiplichiamo per 2 anche il dividendo 230:",
            mathExpression: "230 × 2 = 460"
          },
          {
            stepNumber: 3,
            text: "Riscriviamo la divisione:",
            mathExpression: "(230 × 2) ÷ (5 × 2) = 460 ÷ 10"
          },
          {
            stepNumber: 4,
            text: "Dividere per 10 significa solo togliere uno zero:",
            mathExpression: "46"
          }
        ],
        resultExplanation: "Risultato: 46. 'Per dividere per 5: raddoppia e togli uno zero' è la regola d'oro fondata sull'invariantiva.",
        practicalTip: "Funziona anche con il 25: per dividere per 25, moltiplica entrambi per 4 e poi dividi per 100!"
      },
      {
        title: "Esempio 3: Dimezzare entrambi i termini (Divisione per 2)",
        initialEquation: "168 ÷ 14 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Entrambi i numeri sono pari. Possiamo dividere entrambi per 2:",
            mathExpression: "k = 2"
          },
          {
            stepNumber: 2,
            text: "Applichiamo l'invariantiva dimezzando entrambi:",
            mathExpression: "(168 ÷ 2) ÷ (14 ÷ 2)"
          },
          {
            stepNumber: 3,
            text: "Otteniamo una divisione notevolmente più amichevole:",
            mathExpression: "84 ÷ 7"
          },
          {
            stepNumber: 4,
            text: "Risolviamo: 70 ÷ 7 = 10, e 14 ÷ 7 = 2, quindi 10 + 2 = 12:",
            mathExpression: "12"
          }
        ],
        resultExplanation: "Risultato: 12. Dimezzare numeri pari trasforma divisioni complesse in tabelline elementari.",
        practicalTip: "Puoi dimezzare anche più volte successive: se i numeri finiscono per 4 o per 8, puoi dividere direttamente per 4 o per 8!"
      },
      {
        title: "Esempio 4: Eliminazione della virgola nei numeri decimali",
        initialEquation: "45 ÷ 1,5 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "La regola delle divisioni coi decimali vieta di avere la virgola al divisore. Moltiplichiamo per 10 per togliere una cifra decimale:",
            mathExpression: "1,5 × 10 = 15"
          },
          {
            stepNumber: 2,
            text: "Per l'invariantiva, moltiplichiamo per 10 anche il dividendo:",
            mathExpression: "45 × 10 = 450"
          },
          {
            stepNumber: 3,
            text: "Eseguiamo la divisione senza virgole:",
            mathExpression: "450 ÷ 15"
          },
          {
            stepNumber: 4,
            text: "Poiché 45 ÷ 15 = 3, abbiamo:",
            mathExpression: "30"
          }
        ],
        resultExplanation: "Risultato: 30. L'intera tecnica scolastica per dividere numeri con la virgola si basa sulla proprietà invariantiva.",
        practicalTip: "Se il divisore ha 2 cifre decimali (es. 0,25), moltiplica entrambi i termini per 100!"
      },
      {
        title: "Esempio 5: Proprietà Distributiva della divisione rispetto alla somma (a sinistra)",
        initialEquation: "(80 + 16) ÷ 4 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "La proprietà distributiva vale nella divisione SOLO se la somma/differenza si trova al DIVIDENDO (a sinistra):",
            mathExpression: "(a + b) ÷ c = (a ÷ c) + (b ÷ c)"
          },
          {
            stepNumber: 2,
            text: "Distribuiamo il divisore 4 a entrambi gli addendi:",
            mathExpression: "(80 ÷ 4) + (16 ÷ 4)"
          },
          {
            stepNumber: 3,
            text: "Eseguiamo le due divisioni parziali:",
            mathExpression: "20 + 4"
          },
          {
            stepNumber: 4,
            text: "Sommiamo i quozienti:",
            mathExpression: "24"
          }
        ],
        resultExplanation: "Risultato: 24. Attenzione: NON vale se la somma è al divisore! Ad esempio, 20 ÷ (2 + 2) = 20 ÷ 4 = 5, NON fa (20 ÷ 2) + (20 ÷ 2) = 10 + 10 = 20!",
        practicalTip: "Ricorda: si può distribuire solo 'sul dividendo', mai 'sul divisore'!"
      }
    ],
    practicalApplication: {
      whyItMatters: "La proprietà invariantiva della divisione è esattamente la proprietà invariantiva delle frazioni che userai per tutto il triennio delle medie e alle scuole superiori: semplificare 12/18 in 2/3 significa dividere numeratore e denominatore per 6!",
      mentalMathSecret: "Per dividere per 50, moltiplica per 2 entrambi e dividi per 100. Es: 650 ÷ 50 = 1300 ÷ 100 = 13!",
      realLifeScenario: "In laboratorio devi dividere 350 ml di soluzione in provette da 25 ml. Moltiplica entrambi per 4: 1400 ml in provette da 100 ml = 14 provette esatte!"
    },
    miniChecks: [
      {
        id: "mc_ch4_1",
        question: "Quale operazione applica correttamente la proprietà invariantiva a 480 ÷ 60?",
        promptEquation: "480 ÷ 60",
        options: [
          "(480 ÷ 10) ÷ (60 ÷ 10) = 48 ÷ 6",
          "(480 - 10) ÷ (60 - 10) = 470 ÷ 50",
          "(480 ÷ 10) × (60 ÷ 10)",
          "60 ÷ 480"
        ],
        correctIndex: 0,
        explanation: "Esatto! Dividere sia dividendo che divisore per 10 (eliminando uno zero a ciascuno) è la corretta applicazione invariantiva: 48 ÷ 6 = 8."
      },
      {
        id: "mc_ch4_2",
        question: "Per calcolare rapidamente a mente 140 ÷ 5, qual è il trucco corretto basato sulla proprietà invariantiva?",
        promptEquation: "140 ÷ 5",
        options: [
          "Togliere 5 da entrambi i termini",
          "Moltiplicare entrambi i termini per 2, trasformando il calcolo in 280 ÷ 10 = 28",
          "Dimezzare il 140 e lasciare il 5",
          "Invertire 5 ÷ 140"
        ],
        correctIndex: 1,
        explanation: "Bravissimo! (140 × 2) ÷ (5 × 2) = 280 ÷ 10 = 28. Moltiplicare per 2 permette di dividere per 10, che è immediato!"
      },
      {
        id: "mc_ch4_3",
        question: "L'uguaglianza 30 ÷ (3 + 2) = (30 ÷ 3) + (30 ÷ 2) è vera o falsa?",
        promptEquation: "30 ÷ (3 + 2) = (30 ÷ 3) + (30 ÷ 2)",
        options: [
          "Vera, per la proprietà distributiva della divisione",
          "Falsa, perché la divisione è distributiva solo rispetto alla somma al dividendo, MAI al divisore! Infatti 30 ÷ 5 = 6, mentre 10 + 15 = 25",
          "Vera solo per i numeri pari",
          "Vera se si applica prima l'associativa"
        ],
        correctIndex: 1,
        explanation: "Perfetto! Questo è uno degli errori più gravi e frequenti: non si può MAI distribuire una divisione se la somma o differenza si trova al divisore!"
      }
    ]
  },

  // =========================================================================
  // CAPITOLO 5: ELEMENTI NEUTRI ED ELEMENTI ASSORBENTI
  // =========================================================================
  {
    id: 5,
    title: "Capitolo 5 – Elementi Neutri ed Elementi Assorbenti",
    subtitle: "Lo Zero e l'Uno nell'Addizione, Moltiplicazione e Divisione: ruoli, differenze e divieti assoluti",
    operationCategory: 'neutri_assorbenti',
    introduction: `In matematica alcuni numeri hanno un comportamento straordinario e unico: sono gli ELEMENTI NEUTRI e gli ELEMENTI ASSORBENTI.
Capire la differenza è cruciale:
- Un ELEMENTO NEUTRO si comporta come uno 'specchio trasparente': operando con lui, il numero di partenza resta assolutamente identico e inalterato.
- Un ELEMENTO ASSORBENTE si comporta come un 'buco nero': annulla completamente il numero con cui opera, assorbendolo e trasformando il risultato in se stesso!
Inoltre, in questo capitolo chiariremo per sempre il mistero e la regola fondamentale: PERCHÉ È IMPOSSIBILE DIVIDERE PER ZERO?`,
    generalRuleBox: {
      ruleName: "Quadro Completo di Elementi Neutri e Assorbenti",
      verbalRule: `1. ADDIZIONE: Lo ZERO è l'elemento neutro (a + 0 = a).
2. MOLTIPLICAZIONE: L'UNO è l'elemento neutro (a × 1 = a). Lo ZERO è l'elemento assorbente (a × 0 = 0).
3. DIVISIONE: L'UNO è elemento neutro a destra (a ÷ 1 = a). Lo zero al dividendo dà sempre zero (0 ÷ a = 0 per a ≠ 0).
4. DIVIETO ASSOLUTO: La divisione per zero (a ÷ 0) è IMPOSSIBILE. L'operazione 0 ÷ 0 è INDETERMINATA.`,
      algebraicFormula: "Neutro Add: a + 0 = a   |   Neutro Molt: a × 1 = a   |   Assorbente Molt: a × 0 = 0   |   Div / 0 = IMPOSSIBILE",
      conditionNote: "La divisione per zero non ha soluzione in nessun insieme numerico (ℕ, ℤ, ℚ, ℝ)."
    },
    workedExamples: [
      {
        title: "Esempio 1: Lo Zero nell'Addizione (Elemento Neutro)",
        initialEquation: "487 + 0 = ?  e  0 + 487 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Lo zero rappresenta l'assenza di quantità aggiunta. Se possiedi 487 biglie e ne ricevi 0, la quantità resta inalterata:",
            mathExpression: "487 + 0 = 487"
          },
          {
            stepNumber: 2,
            text: "Poiché l'addizione è commutativa, l'ordine non conta:",
            mathExpression: "0 + 487 = 487"
          }
        ],
        resultExplanation: "Lo zero è l'elemento neutro dell'addizione perché non modifica il valore del numero.",
        practicalTip: "Nelle somme lunghe, qualsiasi termine uguale a 0 può essere eliminato all'istante senza influire sul risultato."
      },
      {
        title: "Esempio 2: L'Uno nella Moltiplicazione (Elemento Neutro)",
        initialEquation: "94 × 1 = ?  e  1 × 94 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Moltiplicare per 1 significa considerare una sola volta la quantità indicata:",
            mathExpression: "94 × 1 = 94"
          },
          {
            stepNumber: 2,
            text: "Anche qui, per la proprietà commutativa:",
            mathExpression: "1 × 94 = 94"
          }
        ],
        resultExplanation: "L'uno (1) è l'elemento neutro della moltiplicazione: ogni numero moltiplicato per 1 rimane se stesso.",
        practicalTip: "Attenzione a non confondere: lo zero NON è neutro nella moltiplicazione, e l'uno NON è neutro nell'addizione (7 + 1 = 8, cambia)!"
      },
      {
        title: "Esempio 3: Lo Zero nella Moltiplicazione (Elemento Assorbente)",
        initialEquation: "15.420 × 0 = ?",
        steps: [
          {
            stepNumber: 1,
            text: "Moltiplicare per zero significa sommare 15.420 per zero volte, ovvero non considerare alcuna quantità:",
            mathExpression: "15.420 × 0 = 0"
          },
          {
            stepNumber: 2,
            text: "Anche un'espressione lunghissima moltiplicata alla fine per zero si annulla interamente:",
            mathExpression: "(124 + 58 - 33 × 2) × 0 = 0"
          }
        ],
        resultExplanation: "Lo zero è l'elemento ASSORBENTE della moltiplicazione. Da qui deriva la celebre 'Legge di Annullamento del Prodotto' che userai in algebra: se a × b = 0, allora almeno uno tra a e b deve valere 0.",
        practicalTip: "Se in un'espressione con soli prodotti vedi comparire un '× 0', non perdere tempo a calcolare il resto: il prodotto totale è zero!"
      },
      {
        title: "Esempio 4: Lo Zero e l'Uno nella Divisione (Casi permessi)",
        initialEquation: "Casi con 1 al divisore e 0 al dividendo",
        steps: [
          {
            stepNumber: 1,
            text: "Caso A (Dividere per 1): 85 ÷ 1 = 85. Dividere in 1 sola parte significa mantenere l'intero gruppo intatto.",
            mathExpression: "a ÷ 1 = a"
          },
          {
            stepNumber: 2,
            text: "Caso B (Zero diviso un numero): 0 ÷ 12 = 0. Se hai 0 monete da dividere tra 12 persone, ciascuna riceve esattamente 0 monete.",
            mathExpression: "0 ÷ a = 0  (con a ≠ 0)"
          },
          {
            stepNumber: 3,
            text: "Verifica con l'operazione inversa: 0 × 12 = 0, quindi il risultato 0 è perfettamente valido e coerente!",
            mathExpression: "Quoziente = 0"
          }
        ],
        resultExplanation: "Dividere PER 1 lascia il numero uguale. Dividere ZERO per un numero diverso da zero dà SEMPRE zero.",
        practicalTip: "Ricorda: zero al numeratore (o dividendo) fa zero; zero al denominatore (o divisore) è VIETATO!"
      },
      {
        title: "Esempio 5: Perché la divisione per zero è IMPOSSIBILE? (Dimostrazione rigorosa)",
        initialEquation: "Perché 7 ÷ 0 è IMPOSSIBILE e 0 ÷ 0 è INDETERMINATO?",
        steps: [
          {
            stepNumber: 1,
            text: "Ricordiamo la definizione di divisione: a ÷ b = c significa trovare quel numero c che, moltiplicato per b, restituisce a (c × b = a).",
            mathExpression: "7 ÷ 0 = c  ⟹  c × 0 = 7"
          },
          {
            stepNumber: 2,
            text: "Ma qualsiasi numero c moltiplicato per 0 fa sempre 0 per via dell'elemento assorbente! Non esiste ALCUN numero che moltiplicato per 0 dia 7 (0 ≠ 7):",
            mathExpression: "Nessuna soluzione possibile ⟹ IMPOSSIBILE"
          },
          {
            stepNumber: 3,
            text: "Cosa succede invece con 0 ÷ 0? Impostiamo la verifica: cerchiamo un numero c tale che c × 0 = 0:",
            mathExpression: "c × 0 = 0"
          },
          {
            stepNumber: 4,
            text: "Qualsiasi numero va bene! 1 × 0 = 0, 5 × 0 = 0, 999 × 0 = 0. Ci sono infinite soluzioni possibili, non se ne può determinare una sola:",
            mathExpression: "Infinite soluzioni ⟹ INDETERMINATO"
          }
        ],
        resultExplanation: "7 ÷ 0 è IMPOSSIBILE (nessuna soluzione). 0 ÷ 0 è INDETERMINATO (infinite soluzioni). La divisione per zero è dunque una contraddizione logica.",
        practicalTip: "Se una domanda ti propone '12 ÷ 0 = 0', la risposta è SBAGLIATA: 12 ÷ 0 è IMPOSSIBILE!"
      }
    ],
    practicalApplication: {
      whyItMatters: "I programmatori informatici e gli scienziati proteggono i loro software dagli errori di 'Division by Zero' perché causano il blocco immediato (crash) dei sistemi operativi e dei razzi spaziali!",
      mentalMathSecret: "Ricorda la differenza chiave: Neutro = lascia inalterato (non fa nulla). Assorbente = trasforma tutto in zero (inghiotte tutto).",
      realLifeScenario: "Se hai una scatola con 0 biscotti e devi dividerla tra 4 amici, ognuno riceverà 0 biscotti (0 ÷ 4 = 0). Ma se hai 4 biscotti, non ha alcun senso dire 'dividili a zero persone' (4 ÷ 0 = impossibile)!"
    },
    miniChecks: [
      {
        id: "mc_ch5_1",
        question: "Qual è la differenza fondamentale tra elemento neutro ed elemento assorbente?",
        options: [
          "Non c'è differenza, sono due modi di chiamare lo zero",
          "L'elemento neutro lascia invariato il numero con cui opera (es. a + 0 = a, a × 1 = a); l'elemento assorbente annulla il numero trasformando il risultato in se stesso (a × 0 = 0)",
          "L'elemento neutro è sempre l'uno, mentre l'assorbente è sempre il due",
          "L'elemento assorbente si usa solo nella sottrazione"
        ],
        correctIndex: 1,
        explanation: "Esatto! Il neutro rispetta l'identità del numero, mentre l'assorbente 'assorbe' l'operazione imponendo se stesso come risultato finale."
      },
      {
        id: "mc_ch5_2",
        question: "Quale affermazione descrive CORRETTAMENTE il risultato dell'operazione 28 ÷ 0?",
        promptEquation: "28 ÷ 0",
        options: [
          "Fa 0, perché lo zero annulla tutto",
          "Fa 28, perché lo zero è neutro",
          "È IMPOSSIBILE, perché nessun numero moltiplicato per 0 può dare 28",
          "Fa 1"
        ],
        correctIndex: 2,
        explanation: "Bravissimo! Dividere un numero diverso da zero per 0 è tassativamente IMPOSSIBILE perché non esiste alcun numero che moltiplicato per zero restituisca 28."
      },
      {
        id: "mc_ch5_3",
        question: "Quale delle seguenti operazioni ha come risultato ZERO?",
        options: [
          "15 ÷ 1",
          "15 + 0",
          "0 ÷ 15",
          "15 ÷ 0"
        ],
        correctIndex: 2,
        explanation: "Correttissimo! 0 ÷ 15 fa 0 (infatti 0 × 15 = 0). Le altre danno: 15, 15 e impossibile."
      }
    ]
  }
];
