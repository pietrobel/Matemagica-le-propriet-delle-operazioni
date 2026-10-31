import React, { useState, useEffect } from 'react';
import { GameScoreResult } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  Trophy,
  ArrowRight
} from 'lucide-react';

interface PropertyMatchGameProps {
  onFinishGame: (res: GameScoreResult) => void;
  onExit: () => void;
}

interface MatchCard {
  id: string;
  category: 'nome' | 'regola' | 'esempio' | 'applicazione';
  propertyKey: string;
  text: string;
  mathPrompt?: string;
}

import { randInt, randChoice } from '../../utils/mathEngine';

function generateMatchSets() {
  const commA = randInt(25, 48);
  const commB = randInt(15, 39);
  const commF1 = randInt(6, 9);
  const commF2 = randInt(7, 9);

  const assocA = randChoice([25, 35, 45, 65]);
  const assocB = 100 - assocA;
  const assocC = randInt(14, 48);
  const assocD = randInt(11, 29);

  const distF = randChoice([6, 7, 8]);
  const distTens = 10;
  const distUnits = randChoice([4, 6, 8]);

  const invA = randInt(65, 95);
  const invB = randChoice([29, 39, 49]);
  const invDivQ = randInt(4, 9);
  const invDivB = randChoice([20, 30, 40, 50, 60]);
  const invDivA = invDivQ * invDivB;

  const neutN = randInt(25, 89);

  return [
    {
      key: 'commutativa',
      name: 'Proprietà Commutativa',
      regola: 'Cambiando l\'ordine dei termini, il risultato non cambia: a + b = b + a  e  a × b = b × a.',
      esempio: `${commA} + ${commB} = ${commB} + ${commA} = ${commA + commB}   |   ${commF1} × ${commF2} = ${commF2} × ${commF1} = ${commF1 * commF2}`,
      applicazione: 'Mettere per primo il numero più grande o invertire i fattori per ricordare subito la tabellina.'
    },
    {
      key: 'associativa',
      name: 'Proprietà Associativa',
      regola: 'Sostituendo a due o più termini il loro risultato parziale, il totale finale non cambia: (a + b) + c = a + (b + c).',
      esempio: `(${assocA} + ${assocB}) + ${assocC} = 100 + ${assocC} = ${100 + assocC}   |   (4 × 25) × ${assocD} = 100 × ${assocD} = ${100 * assocD}`,
      applicazione: 'Raggruppare le coppie complementari che creano decine o centinaia tonde (10, 100, 1000).'
    },
    {
      key: 'distributiva',
      name: 'Proprietà Distributiva',
      regola: 'Per moltiplicare un numero per una somma o differenza, si moltiplica per ciascun termine: a × (b + c) = (a × b) + (a × c).',
      esempio: `${distF} × (${distTens} + ${distUnits}) = (${distF * distTens}) + (${distF * distUnits}) = ${distF * (distTens + distUnits)}`,
      applicazione: 'Scomporre numeri grandi a due cifre in decine e unità per calcolarli a mente senza colonna.'
    },
    {
      key: 'invariantiva',
      name: 'Proprietà Invariantiva',
      regola: 'Aggiungendo/togliendo lo stesso numero in sottrazione, o moltiplicando/dividendo per lo stesso numero in divisione, il risultato non cambia.',
      esempio: `${invA} - ${invB} = ${invA + 1} - ${invB + 1} = ${invA - invB}   |   ${invDivA} ÷ ${invDivB} = ${invDivA / 10} ÷ ${invDivB / 10} = ${invDivQ}`,
      applicazione: 'Arrotondare il sottraendo a cifra tonda o cancellare gli zeri finali nella divisione.'
    },
    {
      key: 'neutri_assorbenti',
      name: 'Elementi Neutri ed Assorbenti',
      regola: 'Lo 0 è neutro in + e assorbente in ×. L\'1 è neutro in × e al divisore. La divisione per zero è impossibile.',
      esempio: `${neutN} + 0 = ${neutN}   |   ${neutN} × 0 = 0   |   ${neutN} × 1 = ${neutN}   |   ${neutN} ÷ 0 = IMPOSSIBILE`,
      applicazione: 'Annullare istantaneamente calcoli moltiplicati per zero ed eliminare zeri superflui nelle somme.'
    }
  ];
}

export const PropertyMatchGame: React.FC<PropertyMatchGameProps> = ({ onFinishGame, onExit }) => {
  const [matchSets, setMatchSets] = useState(() => generateMatchSets());
  const [activePropertyKey, setActivePropertyKey] = useState<string>('commutativa');
  const [matchedCategories, setMatchedCategories] = useState<{ [propKey: string]: { [cat: string]: boolean } }>({
    commutativa: { nome: true },
    associativa: { nome: true },
    distributiva: { nome: true },
    invariantiva: { nome: true },
    neutri_assorbenti: { nome: true }
  });
  const [score, setScore] = useState(0);

  const handleRestartNewNumbers = () => {
    soundManager.playPop();
    setMatchSets(generateMatchSets());
    setMatchedCategories({
      commutativa: { nome: true },
      associativa: { nome: true },
      distributiva: { nome: true },
      invariantiva: { nome: true },
      neutri_assorbenti: { nome: true }
    });
    setScore(0);
    setActivePropertyKey('commutativa');
  };

  // Pool of available cards to match for current view
  const currentSet = matchSets.find(s => s.key === activePropertyKey) || matchSets[0];

  const categories: ('regola' | 'esempio' | 'applicazione')[] = ['regola', 'esempio', 'applicazione'];

  const isCurrentSetFullyMatched = 
    matchedCategories[activePropertyKey]?.regola &&
    matchedCategories[activePropertyKey]?.esempio &&
    matchedCategories[activePropertyKey]?.applicazione;

  const totalCompletedSets = matchSets.filter(s => 
    matchedCategories[s.key]?.regola &&
    matchedCategories[s.key]?.esempio &&
    matchedCategories[s.key]?.applicazione
  ).length;

  const handleMatchCard = (cat: 'regola' | 'esempio' | 'applicazione', candidateKey: string) => {
    if (matchedCategories[activePropertyKey]?.[cat]) return;

    if (candidateKey === activePropertyKey) {
      soundManager.playCorrect();
      setScore(prev => prev + 100);
      setMatchedCategories(prev => ({
        ...prev,
        [activePropertyKey]: {
          ...prev[activePropertyKey],
          [cat]: true
        }
      }));
    } else {
      soundManager.playGentleError();
    }
  };

  const handleFinishAll = () => {
    onFinishGame({
      gameId: 'property_match',
      score: score,
      starsEarned: 3,
      xpEarned: score,
      correctAnswers: totalCompletedSets,
      totalQuestions: matchSets.length
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
                Gioco 3 · Abbina le Proprietà
              </span>
              <span className="text-xs font-bold text-slate-500">
                {totalCompletedSets} di {matchSets.length} Proprietà Complete
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">Associazione Carte delle 4 Proprietà</h3>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Punti Combinazione</p>
            <p className="text-xl font-black text-sky-600">{score} XP</p>
          </div>
          <button
            onClick={handleRestartNewNumbers}
            title="Genera nuovi esempi con numeri diversi"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nuova Partita</span>
          </button>
          <button
            onClick={onExit}
            className="px-3.5 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
          >
            Esci
          </button>
        </div>
      </div>

      {/* Property Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {matchSets.map(prop => {
          const isSelected = prop.key === activePropertyKey;
          const isDone = 
            matchedCategories[prop.key]?.regola &&
            matchedCategories[prop.key]?.esempio &&
            matchedCategories[prop.key]?.applicazione;

          return (
            <button
              key={prop.key}
              onClick={() => {
                soundManager.playPop();
                setActivePropertyKey(prop.key);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 border ${
                isSelected
                  ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-sky-50'
              }`}
            >
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
              <span>{prop.name}</span>
            </button>
          );
        })}
      </div>

      {/* Current Property Matching Board */}
      <div className="space-y-6">
        <div className="bg-sky-50/70 border-2 border-sky-200 rounded-3xl p-6 text-center space-y-1">
          <span className="text-[10px] font-black uppercase text-sky-700 tracking-wider">Proprietà Bersaglio da Completare</span>
          <h4 className="text-2xl font-black text-slate-900">{currentSet.name}</h4>
          <p className="text-xs text-slate-600">
            Abbina la Regola Teorica, l'Esempio Numerico e l'Applicazione Pratica corrispondenti!
          </p>
        </div>

        {/* 3 Slot Matchers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Slot 1: Regola */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                1. Regola Matematica
              </span>
              {matchedCategories[activePropertyKey]?.regola ? (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-900 space-y-1 animate-fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Abbinata con Successo!</span>
                  </div>
                  <p className="text-slate-700 mt-1">{currentSet.regola}</p>
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-slate-500 mb-2">Qual è la definizione corretta?</p>
                  {matchSets.slice(0, 3).map(s => (
                    <button
                      key={s.key}
                      onClick={() => handleMatchCard('regola', s.key)}
                      className="w-full p-2.5 bg-slate-50 hover:bg-sky-50 border border-slate-200 rounded-xl text-left text-xs text-slate-700 hover:text-sky-900 transition-colors"
                    >
                      {s.regola.substring(0, 80)}...
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Slot 2: Esempio */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                2. Esempio Numerico
              </span>
              {matchedCategories[activePropertyKey]?.esempio ? (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-900 space-y-1 animate-fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Abbinata con Successo!</span>
                  </div>
                  <p className="font-mono text-slate-800 mt-1">{currentSet.esempio}</p>
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-slate-500 mb-2">Quale operazione numerica la dimostra?</p>
                  {matchSets.slice(0, 3).map(s => (
                    <button
                      key={s.key}
                      onClick={() => handleMatchCard('esempio', s.key)}
                      className="w-full p-2.5 bg-slate-50 hover:bg-sky-50 border border-slate-200 rounded-xl text-left text-xs font-mono text-slate-800 transition-colors"
                    >
                      {s.esempio.substring(0, 50)}...
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Slot 3: Applicazione */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                3. A cosa serve nella pratica?
              </span>
              {matchedCategories[activePropertyKey]?.applicazione ? (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-900 space-y-1 animate-fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Abbinata con Successo!</span>
                  </div>
                  <p className="text-slate-700 mt-1">{currentSet.applicazione}</p>
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-slate-500 mb-2">Qual è la sua utilità nel calcolo?</p>
                  {matchSets.slice(0, 3).map(s => (
                    <button
                      key={s.key}
                      onClick={() => handleMatchCard('applicazione', s.key)}
                      className="w-full p-2.5 bg-slate-50 hover:bg-sky-50 border border-slate-200 rounded-xl text-left text-xs text-slate-700 hover:text-sky-900 transition-colors"
                    >
                      {s.applicazione.substring(0, 80)}...
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Victory Card for Current Property */}
        {isCurrentSetFullyMatched && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Quartetto "{currentSet.name}" completato! +300 XP guadagnati!</span>
            </span>
            {totalCompletedSets === matchSets.length ? (
              <button
                onClick={handleFinishAll}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>Completa il Gioco!</span>
                <Trophy className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  soundManager.playPop();
                  const nextUnfinished = matchSets.find(s => 
                    !matchedCategories[s.key]?.regola ||
                    !matchedCategories[s.key]?.esempio ||
                    !matchedCategories[s.key]?.applicazione
                  );
                  if (nextUnfinished) setActivePropertyKey(nextUnfinished.key);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <span>Prossima Proprietà</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
