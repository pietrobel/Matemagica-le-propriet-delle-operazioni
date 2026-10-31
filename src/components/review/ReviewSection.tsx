import React, { useState } from 'react';
import { LoggedError, AvatarConfig } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { 
  FileText, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Lightbulb, 
  ShieldAlert, 
  Trash2,
  ArrowRight,
  Home
} from 'lucide-react';

interface ReviewSectionProps {
  avatarConfig: AvatarConfig;
  loggedErrors: LoggedError[];
  onClearErrors: () => void;
  onGoToTheory: () => void;
  onGoToPractice: () => void;
  onGoHome: () => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  avatarConfig,
  loggedErrors,
  onClearErrors,
  onGoToTheory,
  onGoToPractice,
  onGoHome
}) => {
  const [activeTab, setActiveTab] = useState<'schemi' | 'formulario' | 'errori'>('schemi');
  const [resolvedErrors, setResolvedErrors] = useState<string[]>([]);

  const handleMarkResolved = (errId: string) => {
    soundManager.playCorrect();
    setResolvedErrors(prev => [...prev, errId]);
  };

  const activeErrors = loggedErrors.filter(e => !resolvedErrors.includes(e.id));

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-teal-100 border border-white/25">
              <FileText className="w-3.5 h-3.5 text-yellow-300" />
              <span>Sezione 6 · Ripasso Generale</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-display">
              Schemi Riassuntivi e Registro degli Errori
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 max-w-2xl leading-relaxed">
              Mappe concettuali, formulario rapido per compiti e verifiche, e il tuo archivio personale degli errori per trasformare ogni sbaglio in un punto di forza.
            </p>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex items-center gap-1.5 p-1.5 bg-black/25 backdrop-blur-md rounded-2xl border border-white/25 shrink-0">
            <button
              onClick={() => { soundManager.playPop(); setActiveTab('schemi'); }}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'schemi'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-teal-100 hover:bg-white/10'
              }`}
            >
              Mappe Concettuali
            </button>
            <button
              onClick={() => { soundManager.playPop(); setActiveTab('formulario'); }}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'formulario'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-teal-100 hover:bg-white/10'
              }`}
            >
              Formulario d'Oro
            </button>
            <button
              onClick={() => { soundManager.playPop(); setActiveTab('errori'); }}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'errori'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-teal-100 hover:bg-white/10'
              }`}
            >
              <span>I Miei Errori</span>
              {activeErrors.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeErrors.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Mappe Concettuali */}
      {activeTab === 'schemi' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Addizione */}
            <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm">+</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Proprietà dell'Addizione</h4>
                  <p className="text-[11px] text-amber-800 font-semibold">Commutativa · Associativa · Elemento Neutro</p>
                </div>
              </div>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                  <strong className="text-amber-900 block">Proprietà Commutativa:</strong>
                  <span>Scambio dell'ordine: <code className="font-mono font-bold text-amber-800">a + b = b + a</code>. Utile per mettere per primo il numero più grande (es. 4 + 78 = 78 + 4 = 82).</span>
                </div>
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                  <strong className="text-amber-900 block">Proprietà Associativa:</strong>
                  <span>Raggruppamento senza cambiare l'ordine: <code className="font-mono font-bold text-amber-800">(a + b) + c = a + (b + c)</code>. Cerca gli amici del 10 o del 100!</span>
                </div>
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                  <strong className="text-amber-900 block">Elemento Neutro (Zero):</strong>
                  <span><code className="font-mono font-bold text-amber-800">a + 0 = a</code>. Aggiungere zero non varia la somma.</span>
                </div>
              </div>
            </div>

            {/* Moltiplicazione */}
            <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-purple-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-sm">×</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Proprietà della Moltiplicazione</h4>
                  <p className="text-[11px] text-purple-800 font-semibold">Commutativa · Associativa · Distributiva · Neutro/Assorbente</p>
                </div>
              </div>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                  <strong className="text-purple-900 block">Proprietà Commutativa:</strong>
                  <span><code className="font-mono font-bold text-purple-800">a × b = b × a</code>. Cambia l'ordine dei fattori senza alterare il prodotto.</span>
                </div>
                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                  <strong className="text-purple-900 block">Proprietà Associativa:</strong>
                  <span><code className="font-mono font-bold text-purple-800">(a × b) × c = a × (b × c)</code>. Coppie d'oro: 2×5=10, 4×25=100, 8×125=1000!</span>
                </div>
                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                  <strong className="text-purple-900 block">Proprietà Distributiva:</strong>
                  <span><code className="font-mono font-bold text-purple-800">a × (b + c) = (a × b) + (a × c)</code>. Scomponi in decine e unità per moltiplicare a mente.</span>
                </div>
              </div>
            </div>

            {/* Sottrazione */}
            <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-sky-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-black text-sm">−</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Proprietà della Sottrazione</h4>
                  <p className="text-[11px] text-sky-800 font-semibold">Proprietà Invariantiva (La Bilancia)</p>
                </div>
              </div>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100">
                  <strong className="text-sky-900 block">Proprietà Invariantiva:</strong>
                  <span><code className="font-mono font-bold text-sky-800">a - b = (a + k) - (b + k) = (a - k) - (b - k)</code>. Aggiungi o togli la stessa quantità per arrotondare il sottraendo (es. 83 - 29 = 84 - 30 = 54).</span>
                </div>
                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-rose-900">
                  <strong className="block">Divieti della Sottrazione:</strong>
                  <span>NON è commutativa (15 - 8 ≠ 8 - 15) e NON è associativa ((20 - 10) - 5 ≠ 20 - (10 - 5)).</span>
                </div>
              </div>
            </div>

            {/* Divisione */}
            <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-emerald-100 pb-3">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">÷</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Proprietà della Divisione</h4>
                  <p className="text-[11px] text-emerald-800 font-semibold">Invariantiva · Distributiva sul dividendo · Regole dello zero</p>
                </div>
              </div>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <strong className="text-emerald-900 block">Proprietà Invariantiva (k ≠ 0):</strong>
                  <span><code className="font-mono font-bold text-emerald-800">a ÷ b = (a × k) ÷ (b × k) = (a ÷ k) ÷ (b ÷ k)</code>. Cancella gli zeri o raddoppia per dividere per 10 (es. 180 ÷ 5 = 360 ÷ 10 = 36).</span>
                </div>
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                  <strong className="text-amber-900 block">Distributiva sul Dividendo:</strong>
                  <span><code className="font-mono font-bold text-amber-800">(a + b) ÷ c = (a ÷ c) + (b ÷ c)</code>. MAI al divisore!</span>
                </div>
                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-rose-900">
                  <strong className="block">Regole dello Zero:</strong>
                  <span>0 ÷ a = 0 (con a ≠ 0). Ma <code className="font-bold">a ÷ 0 è IMPOSSIBILE</code> e <code className="font-bold">0 ÷ 0 è INDETERMINATO</code>.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Formulario d'Oro */}
      {activeTab === 'formulario' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Tabella di Sintesi Ufficiale</span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">Il Formulario d'Oro delle 4 Operazioni</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Scuola Secondaria di 1° Grado</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-amber-100/60 text-amber-900 border-b border-amber-200">
                  <th className="p-3 font-black">Operazione</th>
                  <th className="p-3 font-black">Proprietà</th>
                  <th className="p-3 font-black">Formula Algebrica</th>
                  <th className="p-3 font-black">Esempio Pratico</th>
                  <th className="p-3 font-black">Scorciatoia Mentale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-amber-50/40">
                  <td className="p-3 font-bold text-slate-900">Addizione</td>
                  <td className="p-3 font-semibold text-amber-800">Commutativa</td>
                  <td className="p-3 font-mono font-bold text-slate-800">a + b = b + a</td>
                  <td className="p-3 font-mono text-slate-700">14 + 79 = 79 + 14 = 93</td>
                  <td className="p-3 text-slate-600">Parti dal numero più grande</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="p-3 font-bold text-slate-900">Addizione</td>
                  <td className="p-3 font-semibold text-amber-800">Associativa</td>
                  <td className="p-3 font-mono font-bold text-slate-800">(a + b) + c = a + (b + c)</td>
                  <td className="p-3 font-mono text-slate-700">(37 + 63) + 45 = 100 + 45 = 145</td>
                  <td className="p-3 text-slate-600">Cerca gli amici del 10 o del 100</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="p-3 font-bold text-slate-900">Addizione</td>
                  <td className="p-3 font-semibold text-emerald-800">Elemento Neutro</td>
                  <td className="p-3 font-mono font-bold text-slate-800">a + 0 = a</td>
                  <td className="p-3 font-mono text-slate-700">450 + 0 = 450</td>
                  <td className="p-3 text-slate-600">Lo zero non aggiunge valore</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="p-3 font-bold text-slate-900">Moltiplicazione</td>
                  <td className="p-3 font-semibold text-purple-800">Commutativa</td>
                  <td className="p-3 font-mono font-bold text-slate-800">a × b = b × a</td>
                  <td className="p-3 font-mono text-slate-700">6 × 15 = 15 × 6 = 90</td>
                  <td className="p-3 text-slate-600">Inverti per ricordare la tabellina</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="p-3 font-bold text-slate-900">Moltiplicazione</td>
                  <td className="p-3 font-semibold text-purple-800">Associativa</td>
                  <td className="p-3 font-mono font-bold text-slate-800">(a × b) × c = a × (b × c)</td>
                  <td className="p-3 font-mono text-slate-700">(25 × 4) × 19 = 100 × 19 = 1900</td>
                  <td className="p-3 text-slate-600">Accoppia 2×5=10 o 4×25=100</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="p-3 font-bold text-slate-900">Moltiplicazione</td>
                  <td className="p-3 font-semibold text-purple-800">Distributiva</td>
                  <td className="p-3 font-mono font-bold text-slate-800">a × (b + c) = ab + ac</td>
                  <td className="p-3 font-mono text-slate-700">7 × 18 = 7×10 + 7×8 = 126</td>
                  <td className="p-3 text-slate-600">Scomponi in decine e unità</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="p-3 font-bold text-slate-900">Moltiplicazione</td>
                  <td className="p-3 font-semibold text-emerald-800">Neutro (1) e Assorbente (0)</td>
                  <td className="p-3 font-mono font-bold text-slate-800">a × 1 = a  |  a × 0 = 0</td>
                  <td className="p-3 font-mono text-slate-700">99 × 1 = 99  |  99 × 0 = 0</td>
                  <td className="p-3 text-slate-600">Per 1 resta identico; per 0 si annulla</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="p-3 font-bold text-slate-900">Sottrazione</td>
                  <td className="p-3 font-semibold text-sky-800">Invariantiva</td>
                  <td className="p-3 font-mono font-bold text-slate-800">a - b = (a±k) - (b±k)</td>
                  <td className="p-3 font-mono text-slate-700">73 - 29 = 74 - 30 = 44 (+1)</td>
                  <td className="p-3 text-slate-600">Arrotonda il sottraendo a decina piena</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="p-3 font-bold text-slate-900">Divisione</td>
                  <td className="p-3 font-semibold text-emerald-800">Invariantiva (k≠0)</td>
                  <td className="p-3 font-mono font-bold text-slate-800">a ÷ b = (a·k) ÷ (b·k)</td>
                  <td className="p-3 font-mono text-slate-700">360 ÷ 40 = 36 ÷ 4 = 9 (÷10)</td>
                  <td className="p-3 text-slate-600">Cancella zeri o raddoppia per 5</td>
                </tr>
                <tr className="hover:bg-amber-50/40">
                  <td className="p-3 font-bold text-slate-900">Divisione</td>
                  <td className="p-3 font-semibold text-rose-800">Divisione per zero</td>
                  <td className="p-3 font-mono font-bold text-rose-700">a ÷ 0 = IMPOSSIBILE</td>
                  <td className="p-3 font-mono text-slate-700">14 ÷ 0 = IMPOSSIBILE</td>
                  <td className="p-3 text-slate-600">Divieto assoluto della matematica</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Registro degli Errori Personale */}
      {activeTab === 'errori' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-4">
            <div>
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Archivio Lacune da Colmare</span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Il Tuo Registro degli Errori ({activeErrors.length} attivi)
              </h3>
            </div>
            {loggedErrors.length > 0 && (
              <button
                onClick={() => {
                  soundManager.playPop();
                  onClearErrors();
                }}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Trash2 className="w-4 h-4" />
                <span>Cancella storico errori</span>
              </button>
            )}
          </div>

          {activeErrors.length === 0 ? (
            <div className="p-10 text-center space-y-3 bg-emerald-50/50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-950">Nessun errore attivo al momento!</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Tutti gli esercizi affrontati sono stati superati, oppure hai segnato come risolti tutti gli errori passati. Continua così!
              </p>
              <button
                onClick={() => {
                  soundManager.playPop();
                  onGoToPractice();
                }}
                className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Vai alla Palestra di Esercizi →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Qui trovi tutti i quesiti in cui hai avuto un'esitazione durante gli esercizi, i giochi o il quiz. Studia la spiegazione del docente e contrassegnali come 'Compreso'!
              </p>

              <div className="space-y-3">
                {activeErrors.map(err => (
                  <div key={err.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                        {err.property} · Fonte: {err.sectionSource}
                      </span>
                      <button
                        onClick={() => handleMarkResolved(err.id)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ho capito la regola</span>
                      </button>
                    </div>

                    <p className="font-bold text-slate-900 text-sm">{err.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-slate-100">
                      <p className="text-rose-700 font-semibold">
                        ❌ Risposta data: <span className="line-through">{err.givenAnswer}</span>
                      </p>
                      <p className="text-emerald-700 font-bold">
                        ✓ Risposta corretta: {err.correctAnswer}
                      </p>
                    </div>

                    <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-slate-800 leading-relaxed">
                      <strong>Spiegazione Didattica:</strong> {err.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => {
            soundManager.playPop();
            onGoToTheory();
          }}
          className="px-5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
        >
          <BookOpen className="w-4 h-4 text-amber-700" />
          <span>Torna al Libro di Testo (Teoria)</span>
        </button>

        <button
          onClick={() => {
            soundManager.playPop();
            onGoHome();
          }}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Torna al Menu Principale</span>
        </button>
      </div>

    </div>
  );
};
