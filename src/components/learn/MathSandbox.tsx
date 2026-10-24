import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { ArrowLeftRight, Scale, Scissors, Layers, RefreshCw, CheckCircle2 } from 'lucide-react';

interface MathSandboxProps {
  initialMode?: 'commutativa' | 'invariantiva' | 'distributiva' | 'associativa';
  onCelebrate?: () => void;
}

export const MathSandbox: React.FC<MathSandboxProps> = ({
  initialMode = 'commutativa',
  onCelebrate
}) => {
  const [mode, setMode] = useState<'commutativa' | 'invariantiva' | 'distributiva' | 'associativa'>(initialMode);

  // Commutativa State
  const [commA, setCommA] = useState(6);
  const [commB, setCommB] = useState(9);
  const [commIsSwapped, setCommIsSwapped] = useState(false);
  const [commOp, setCommOp] = useState<'+' | '×'>('+');

  // Invariantiva State
  const [invType, setInvType] = useState<'sub' | 'div'>('sub');
  const [invA, setInvA] = useState(53);
  const [invB, setInvB] = useState(19);
  const [invK, setInvK] = useState(0);

  // Distributiva State
  const [distrRows, setDistrRows] = useState(7);
  const [distrCols, setDistrCols] = useState(12);
  const [distrCut, setDistrCut] = useState(10); // split into 10 and 2

  // Associativa State
  const [assocA, setAssocA] = useState(7);
  const [assocB, setAssocB] = useState(8);
  const [assocC, setAssocC] = useState(3);
  const [assocGrouping, setAssocGrouping] = useState<'AB' | 'BC' | 'AC'>('AC'); // AC is (7+3)+8 = 10+8 = 18

  // Handlers
  const handleSwap = () => {
    soundManager.playSwoosh();
    setCommIsSwapped(prev => !prev);
    if (onCelebrate) onCelebrate();
  };

  const applyInvariantModifier = (delta: number) => {
    soundManager.playSwoosh();
    setInvK(prev => prev + delta);
    if (onCelebrate) onCelebrate();
  };

  const resetInvariant = () => {
    soundManager.playPop();
    setInvK(0);
  };

  // Computations
  const commFirst = commIsSwapped ? commB : commA;
  const commSecond = commIsSwapped ? commA : commB;
  const commResult = commOp === '+' ? commA + commB : commA * commB;

  const currentInvA = invType === 'sub' ? invA + invK : invA * (invK !== 0 ? invK : 1);
  const currentInvB = invType === 'sub' ? invB + invK : invB * (invK !== 0 ? invK : 1);
  const invResult = invType === 'sub' ? invA - invB : Math.floor(invA / invB);

  const distrPart1 = distrCut;
  const distrPart2 = distrCols - distrCut;
  const distrArea1 = distrRows * distrPart1;
  const distrArea2 = distrRows * distrPart2;
  const distrTotal = distrArea1 + distrArea2;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-amber-200">
      
      {/* Sandbox Header & Mode Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-100">
        <div>
          <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Laboratorio Pratico</div>
          <h3 className="text-xl font-bold text-slate-900">Sperimenta le Proprietà coi tuoi Occhi</h3>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-amber-50 rounded-xl border border-amber-200/80 overflow-x-auto">
          {[
            { id: 'commutativa', label: 'Commutativa', icon: ArrowLeftRight },
            { id: 'invariantiva', label: 'Invariantiva', icon: Scale },
            { id: 'distributiva', label: 'Distributiva', icon: Scissors },
            { id: 'associativa', label: 'Associativa', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playPop();
                  setMode(tab.id as typeof mode);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-amber-900/80 hover:bg-amber-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SANDBOX 1: COMMUTATIVA */}
      {mode === 'commutativa' && (
        <div className="py-6 space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <p className="text-sm text-slate-600">
              Scegli due numeri, poi premi il pulsante <strong>Scambia!</strong> per vedere come il totale rimane identico sia con l'addizione che con la moltiplicazione.
            </p>
          </div>

          {/* Operation selector */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => { soundManager.playPop(); setCommOp('+'); }}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                commOp === '+' ? 'bg-amber-500 text-white border-amber-600 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              Addizione (+)
            </button>
            <button
              onClick={() => { soundManager.playPop(); setCommOp('×'); }}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                commOp === '×' ? 'bg-amber-500 text-white border-amber-600 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              Moltiplicazione (×)
            </button>
          </div>

          {/* Big Interactive Equation Display */}
          <div className="bg-amber-50/60 rounded-3xl p-8 border border-amber-200 flex flex-col items-center justify-center">
            <div className="flex items-center gap-4 text-3xl md:text-5xl font-black font-mono-numbers">
              {/* First Block */}
              <div 
                className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white shadow-md flex flex-col items-center justify-center transition-all duration-500 transform hover:scale-105"
              >
                <span className="text-2xl md:text-4xl">{commFirst}</span>
                <span className="text-[10px] font-sans opacity-80 uppercase tracking-widest mt-1">Blocco 1</span>
              </div>

              {/* Operator */}
              <span className="text-amber-600 text-3xl md:text-4xl font-extrabold">{commOp}</span>

              {/* Second Block */}
              <div 
                className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 text-white shadow-md flex flex-col items-center justify-center transition-all duration-500 transform hover:scale-105"
              >
                <span className="text-2xl md:text-4xl">{commSecond}</span>
                <span className="text-[10px] font-sans opacity-80 uppercase tracking-widest mt-1">Blocco 2</span>
              </div>

              {/* Equals */}
              <span className="text-slate-400 text-3xl md:text-4xl font-bold">=</span>

              {/* Result Block */}
              <div 
                className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-emerald-500 text-white shadow-md flex flex-col items-center justify-center"
              >
                <span className="text-2xl md:text-4xl">{commResult}</span>
                <span className="text-[10px] font-sans opacity-80 uppercase tracking-widest mt-1">Risultato</span>
              </div>
            </div>

            {/* Swap Button Action */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleSwap}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-2xl shadow-lg transition-transform active:scale-95"
              >
                <ArrowLeftRight className="w-5 h-5" />
                <span>Scambia i Blocchi! (Commuta)</span>
              </button>
            </div>

            <div className="mt-4 text-xs font-semibold text-amber-800 bg-white/80 px-4 py-2 rounded-xl border border-amber-200">
              💡 {commA} {commOp} {commB} = {commB} {commOp} {commA} = {commResult}. L'ordine è cambiato, ma la quantità è identica!
            </div>
          </div>

          {/* Number Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Numero A:</span>
                <span className="text-amber-600 font-mono-numbers">{commA}</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={commA}
                onChange={e => setCommA(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Numero B:</span>
                <span className="text-sky-600 font-mono-numbers">{commB}</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={commB}
                onChange={e => setCommB(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* SANDBOX 2: INVARIANTIVA */}
      {mode === 'invariantiva' && (
        <div className="py-6 space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <p className="text-sm text-slate-600">
              Scopri il trucco per fare <strong>53 - 19</strong> a mente! Se aggiungi lo stesso numero a entrambi i lati, la differenza resta identica, ma diventa facilissima.
            </p>
          </div>

          {/* Interactive Balance Display */}
          <div className="bg-indigo-50/60 rounded-3xl p-8 border border-indigo-200 flex flex-col items-center">
            
            <div className="flex items-center gap-3 text-2xl md:text-4xl font-black font-mono-numbers mb-4">
              {/* Left transformed */}
              <div className="px-5 py-3 bg-white rounded-2xl shadow-sm border border-indigo-300 text-indigo-900 flex flex-col items-center">
                <span>{currentInvA}</span>
                {invK !== 0 && (
                  <span className="text-[10px] font-sans text-indigo-600 font-semibold">
                    {invA} ({invK > 0 ? `+${invK}` : invK})
                  </span>
                )}
              </div>

              <span className="text-indigo-400 font-bold">-</span>

              {/* Right transformed */}
              <div className="px-5 py-3 bg-white rounded-2xl shadow-sm border border-indigo-300 text-indigo-900 flex flex-col items-center">
                <span>{currentInvB}</span>
                {invK !== 0 && (
                  <span className="text-[10px] font-sans text-indigo-600 font-semibold">
                    {invB} ({invK > 0 ? `+${invK}` : invK})
                  </span>
                )}
              </div>

              <span className="text-slate-400 font-bold">=</span>

              {/* Difference result */}
              <div className="px-5 py-3 bg-emerald-500 text-white rounded-2xl shadow-sm flex flex-col items-center">
                <span>{invResult}</span>
                <span className="text-[10px] font-sans text-emerald-100 font-semibold uppercase">Differenza</span>
              </div>
            </div>

            {/* Modifier Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <span className="text-xs font-bold text-slate-600 mr-2">Modifica entrambi:</span>
              <button
                onClick={() => applyInvariantModifier(1)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95"
              >
                +1 a entrambi (19 diventa 20!)
              </button>
              <button
                onClick={() => applyInvariantModifier(2)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95"
              >
                +2 a entrambi
              </button>
              <button
                onClick={() => applyInvariantModifier(-1)}
                className="px-3.5 py-1.5 bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95"
              >
                -1 a entrambi
              </button>
              <button
                onClick={resetInvariant}
                className="p-1.5 text-slate-500 hover:text-slate-700 rounded-lg"
                title="Ripristina valori originali"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Balance Bar */}
            <div className="w-full max-w-md mt-6 bg-white p-4 rounded-2xl border border-indigo-200">
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
                <span>Distanza numerica tra i due valori:</span>
                <span className="text-emerald-600 font-bold font-mono-numbers">{invResult}</span>
              </div>
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex">
                <div 
                  className="bg-indigo-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (currentInvB / currentInvA) * 100)}%` }}
                />
                <div 
                  className="bg-emerald-400 h-full transition-all duration-300 flex-1"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Sottraendo ({currentInvB})</span>
                <span>Differenza costante ({invResult})</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SANDBOX 3: DISTRIBUTIVA */}
      {mode === 'distributiva' && (
        <div className="py-6 space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <p className="text-sm text-slate-600">
              Guarda come una moltiplicazione grande come <strong>{distrRows} × {distrCols}</strong> si spezza in due pezzi semplici usando la proprietà distributiva!
            </p>
          </div>

          <div className="bg-purple-50/60 rounded-3xl p-6 md:p-8 border border-purple-200 flex flex-col items-center">
            
            {/* Slicing Formula */}
            <div className="text-lg md:text-2xl font-black text-purple-950 font-mono-numbers mb-6 text-center">
              <span>{distrRows} × {distrCols}</span>
              <span className="mx-2 text-slate-400">=</span>
              <span className="text-indigo-600">({distrRows} × {distrPart1})</span>
              <span className="mx-2 text-slate-400">+</span>
              <span className="text-pink-600">({distrRows} × {distrPart2})</span>
              <span className="mx-2 text-slate-400">=</span>
              <span className="text-emerald-600">{distrArea1} + {distrArea2} = {distrTotal}</span>
            </div>

            {/* Interactive Slicing Slider */}
            <div className="w-full max-w-md bg-white p-4 rounded-2xl border border-purple-200 mb-6">
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                <span>Punto di Taglio del {distrCols}:</span>
                <span className="text-purple-700">{distrPart1} + {distrPart2}</span>
              </div>
              <input
                type="range"
                min="1"
                max={distrCols - 1}
                value={distrCut}
                onChange={e => {
                  soundManager.playPop();
                  setDistrCut(Number(e.target.value));
                }}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            {/* Visual Block Representation */}
            <div className="flex items-center gap-3 justify-center overflow-x-auto max-w-full p-2">
              {/* Part 1 Grid */}
              <div 
                className="bg-indigo-500 text-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-md transition-all"
                style={{ minWidth: `${Math.max(80, distrPart1 * 14)}px`, height: '140px' }}
              >
                <span className="text-xs font-bold opacity-80 uppercase">Pezzo 1</span>
                <span className="text-lg font-black">{distrRows} × {distrPart1}</span>
                <span className="text-2xl font-black text-indigo-100 mt-1">{distrArea1}</span>
              </div>

              {/* Scissors separator */}
              <div className="flex flex-col items-center justify-center text-purple-400">
                <Scissors className="w-6 h-6 rotate-90" />
                <span className="text-xs font-bold text-slate-400 mt-1">+</span>
              </div>

              {/* Part 2 Grid */}
              <div 
                className="bg-pink-500 text-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-md transition-all"
                style={{ minWidth: `${Math.max(80, distrPart2 * 14)}px`, height: '140px' }}
              >
                <span className="text-xs font-bold opacity-80 uppercase">Pezzo 2</span>
                <span className="text-lg font-black">{distrRows} × {distrPart2}</span>
                <span className="text-2xl font-black text-pink-100 mt-1">{distrArea2}</span>
              </div>
            </div>

            <p className="mt-4 text-xs font-semibold text-purple-900 bg-white px-4 py-2 rounded-xl border border-purple-200">
              💡 Spaccando il {distrCols} in 10 e 2, calcoli 70 e 14. Poi basta sommarli: 84!
            </p>
          </div>
        </div>
      )}

      {/* SANDBOX 4: ASSOCIATIVA */}
      {mode === 'associativa' && (
        <div className="py-6 space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <p className="text-sm text-slate-600">
              Hai 3 numeri da sommare: <strong>{assocA} + {assocB} + {assocC}</strong>. Scegli quali associare prima per fare subito decine tonde!
            </p>
          </div>

          <div className="bg-emerald-50/60 rounded-3xl p-6 md:p-8 border border-emerald-200 flex flex-col items-center">
            
            {/* Grouping Selector Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <button
                onClick={() => { soundManager.playPop(); setAssocGrouping('AC'); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  assocGrouping === 'AC' 
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
                }`}
              >
                ⭐ Associa (7 + 3) prima (Amici del 10!)
              </button>
              <button
                onClick={() => { soundManager.playPop(); setAssocGrouping('AB'); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  assocGrouping === 'AB' 
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
                }`}
              >
                Associa (7 + 8) prima
              </button>
              <button
                onClick={() => { soundManager.playPop(); setAssocGrouping('BC'); }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  assocGrouping === 'BC' 
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300'
                }`}
              >
                Associa (8 + 3) prima
              </button>
            </div>

            {/* Visual Formula */}
            <div className="text-2xl md:text-4xl font-black font-mono-numbers text-slate-900 flex items-center gap-2">
              {assocGrouping === 'AC' && (
                <>
                  <span className="text-emerald-600">({assocA} + {assocC})</span>
                  <span className="text-slate-400">+</span>
                  <span className="text-indigo-600">{assocB}</span>
                  <span className="text-slate-400">=</span>
                  <span className="text-emerald-700 font-extrabold">10 + 8 = 18</span>
                </>
              )}
              {assocGrouping === 'AB' && (
                <>
                  <span className="text-amber-600">({assocA} + {assocB})</span>
                  <span className="text-slate-400">+</span>
                  <span className="text-indigo-600">{assocC}</span>
                  <span className="text-slate-400">=</span>
                  <span className="text-slate-800">15 + 3 = 18</span>
                </>
              )}
              {assocGrouping === 'BC' && (
                <>
                  <span className="text-indigo-600">{assocA}</span>
                  <span className="text-slate-400">+</span>
                  <span className="text-pink-600">({assocB} + {assocC})</span>
                  <span className="text-slate-400">=</span>
                  <span className="text-slate-800">7 + 11 = 18</span>
                </>
              )}
            </div>

            <div className="mt-6 p-4 bg-white rounded-2xl border border-emerald-200 max-w-md text-center">
              <span className="text-xs font-semibold text-emerald-800">
                {assocGrouping === 'AC'
                  ? '✨ Perfetto! 7 e 3 fanno 10, quindi sommare 8 è immediato! Questa è l\'intelligenza della Proprietà Associativa.'
                  : 'Funziona comunque! Il risultato è sempre 18, ma unire gli amici del 10 è molto più riposante per la mente.'}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
