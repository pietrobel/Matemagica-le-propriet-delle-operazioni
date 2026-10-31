import React, { useState } from 'react';
import { TEXTBOOK_CHAPTERS } from '../../data/textbookData';
import { TextbookChapter, MiniCheckExercise } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Sparkles, 
  ArrowRight,
  ListOrdered,
  BookmarkCheck,
  Video,
  Dumbbell
} from 'lucide-react';

interface TextbookSectionProps {
  onGoToVideo: () => void;
  onGoToPractice: () => void;
  onAwardXp: (amount: number) => void;
}

export const TextbookSection: React.FC<TextbookSectionProps> = ({
  onGoToVideo,
  onGoToPractice,
  onAwardXp
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [miniCheckAnswers, setMiniCheckAnswers] = useState<{ [checkId: string]: number }>({});
  const [miniCheckSubmitted, setMiniCheckSubmitted] = useState<{ [checkId: string]: boolean }>({});
  const [completedMiniChecks, setCompletedMiniChecks] = useState<string[]>([]);

  const currentChapter = TEXTBOOK_CHAPTERS.find(c => c.id === selectedChapterId) || TEXTBOOK_CHAPTERS[0];

  const handleSelectOption = (checkId: string, optIndex: number) => {
    if (miniCheckSubmitted[checkId]) return;
    setMiniCheckAnswers(prev => ({ ...prev, [checkId]: optIndex }));
  };

  const handleVerifyMiniCheck = (check: MiniCheckExercise) => {
    const selected = miniCheckAnswers[check.id];
    if (selected === undefined) return;

    setMiniCheckSubmitted(prev => ({ ...prev, [check.id]: true }));

    if (selected === check.correctIndex) {
      soundManager.playCorrect();
      if (!completedMiniChecks.includes(check.id)) {
        setCompletedMiniChecks(prev => [...prev, check.id]);
        onAwardXp(30);
      }
    } else {
      soundManager.playGentleError();
    }
  };

  const handleResetMiniCheck = (checkId: string) => {
    soundManager.playPop();
    setMiniCheckSubmitted(prev => ({ ...prev, [checkId]: false }));
    setMiniCheckAnswers(prev => {
      const copy = { ...prev };
      delete copy[checkId];
      return copy;
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Textbook Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-amber-100 border border-white/25">
              <BookOpen className="w-3.5 h-3.5 text-yellow-300" />
              <span>Sezione 1 · Libro di Testo Interattivo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-display">
              Manuale Ragionato delle Proprietà
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl leading-relaxed">
              Un vero testo per la scuola secondaria di primo grado: spiegazioni chiare, regole algebriche, esempi passo-passo e verifiche immediate di comprensione.
            </p>
          </div>

          {/* Quick jump to video or practice */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => { soundManager.playPop(); onGoToVideo(); }}
              className="px-4 py-2 bg-black/25 hover:bg-black/35 text-white border border-white/30 rounded-xl font-bold text-xs flex items-center gap-2 transition-all active:scale-95"
            >
              <Video className="w-4 h-4 text-amber-300" />
              <span>Guarda i Video</span>
            </button>
            <button
              onClick={() => { soundManager.playPop(); onGoToPractice(); }}
              className="px-4 py-2 bg-white text-slate-900 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all hover:bg-amber-50 active:scale-95"
            >
              <Dumbbell className="w-4 h-4 text-orange-600" />
              <span>Vai agli Esercizi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chapters Index Bar */}
      <div className="bg-white rounded-2xl p-2.5 border border-amber-200 shadow-xs flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-black uppercase text-amber-900/60 px-3 shrink-0 flex items-center gap-1.5">
          <ListOrdered className="w-4 h-4 text-amber-600" />
          <span>Indice:</span>
        </span>
        {TEXTBOOK_CHAPTERS.map(ch => {
          const isSelected = ch.id === selectedChapterId;
          return (
            <button
              key={ch.id}
              onClick={() => {
                soundManager.playPop();
                setSelectedChapterId(ch.id);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50'
              }`}
            >
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${
                isSelected ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-800'
              }`}>
                {ch.id}
              </span>
              <span>{ch.title.split('–')[1]?.trim() || ch.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Chapter Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-sm space-y-10">
        
        {/* Chapter Header */}
        <div className="border-b border-amber-100 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
            <BookmarkCheck className="w-4 h-4" />
            <span>Capitolo {currentChapter.id} di {TEXTBOOK_CHAPTERS.length}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {currentChapter.title}
          </h3>
          <p className="text-sm font-semibold text-amber-800 mt-1">
            {currentChapter.subtitle}
          </p>
          <div className="mt-4 text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
            {currentChapter.introduction}
          </div>
        </div>

        {/* Highlighted General Rule Box */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Regola Ufficiale</span>
              <h4 className="text-lg font-bold text-slate-900">{currentChapter.generalRuleBox.ruleName}</h4>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs font-mono text-sm sm:text-base font-bold text-slate-900 text-center text-balance">
            {currentChapter.generalRuleBox.algebraicFormula}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
            {currentChapter.generalRuleBox.verbalRule}
          </p>

          {currentChapter.generalRuleBox.conditionNote && (
            <p className="text-[11px] text-amber-800/90 bg-amber-100/60 px-3 py-1.5 rounded-xl border border-amber-200 font-semibold">
              📌 Nota per la scuola secondaria: {currentChapter.generalRuleBox.conditionNote}
            </p>
          )}
        </div>

        {/* Worked Examples Section (4-5 per chapter) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-amber-500 rounded-full" />
            <h4 className="text-xl font-bold text-slate-900">
              Esempi Numerici Svolti Passo dopo Passo
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {currentChapter.workedExamples.map((ex, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/80 border border-slate-200 hover:border-amber-300 rounded-2xl p-5 sm:p-6 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <h5 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">
                      {idx + 1}
                    </span>
                    <span>{ex.title}</span>
                  </h5>
                  <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100/60 px-3 py-1 rounded-lg self-start sm:self-auto">
                    {ex.initialEquation}
                  </span>
                </div>

                {/* Steps Sequence */}
                <div className="space-y-2.5">
                  {ex.steps.map((st) => (
                    <div key={st.stepNumber} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-100 text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {st.stepNumber}
                      </span>
                      <div className="flex-1 space-y-1">
                        <p className="text-slate-700">{st.text}</p>
                        <p className="font-mono font-bold text-amber-700">{st.mathExpression}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Result explanation & practical tip */}
                <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/60 text-xs space-y-1.5">
                  <p className="font-bold text-slate-900">
                    💡 Spiegazione del procedimento: <span className="font-normal text-slate-700">{ex.resultExplanation}</span>
                  </p>
                  <p className="text-amber-800 font-semibold flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Consiglio per il compito in classe: {ex.practicalTip}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Application Box */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
            <Lightbulb className="w-4 h-4 text-sky-600" />
            <span>A cosa servono nella pratica?</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {currentChapter.practicalApplication.whyItMatters}
          </p>
          <div className="p-3 bg-white rounded-xl border border-sky-100 text-xs text-sky-900 font-medium">
            <span className="font-bold">Esempio concreto di vita reale: </span>
            {currentChapter.practicalApplication.realLifeScenario}
          </div>
        </div>

        {/* 3 Interactive Mini-Checks per chapter */}
        <div className="space-y-6 pt-4 border-t border-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Verifica di Comprensione</span>
              <h4 className="text-xl font-bold text-slate-900 mt-0.5">
                3 Piccoli Esercizi Interattivi del Capitolo
              </h4>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              +30 XP a risposta corretta
            </span>
          </div>

          <div className="space-y-6">
            {currentChapter.miniChecks.map((check, cIdx) => {
              const selected = miniCheckAnswers[check.id];
              const isSubmitted = miniCheckSubmitted[check.id];
              const isCorrect = isSubmitted && selected === check.correctIndex;
              const isWrong = isSubmitted && selected !== check.correctIndex;

              return (
                <div key={check.id} className="bg-amber-50/40 border border-amber-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                        Domanda {cIdx + 1} di 3
                      </span>
                      <p className="text-sm font-bold text-slate-900 mt-1">
                        {check.question}
                      </p>
                      {check.promptEquation && (
                        <p className="font-mono text-sm font-bold text-amber-800 bg-white px-3 py-1 rounded-lg border border-amber-200 inline-block mt-1">
                          {check.promptEquation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {check.options.map((opt, oIdx) => {
                      const isOptionSelected = selected === oIdx;
                      let btnStyle = 'bg-white hover:bg-amber-50 border-amber-200 text-slate-800';

                      if (isSubmitted) {
                        if (oIdx === check.correctIndex) {
                          btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-sm font-bold';
                        } else if (isOptionSelected) {
                          btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                        } else {
                          btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-amber-500 text-white border-amber-600 font-bold shadow-xs';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isSubmitted}
                          onClick={() => {
                            soundManager.playPop();
                            handleSelectOption(check.id, oIdx);
                          }}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-md bg-black/10 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="flex-1 leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Action buttons & feedback */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    {!isSubmitted ? (
                      <button
                        disabled={selected === undefined}
                        onClick={() => handleVerifyMiniCheck(check)}
                        className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                          selected !== undefined
                            ? 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Verifica Risposta
                      </button>
                    ) : (
                      <div className="w-full space-y-2">
                        <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                          isCorrect 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                            : 'bg-rose-50 border-rose-300 text-rose-900'
                        }`}>
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-bold">{isCorrect ? 'Esatto! Ben fatto!' : 'Attenzione, risposta errata.'}</p>
                            <p className="mt-0.5 text-slate-700">{check.explanation}</p>
                          </div>
                        </div>

                        {isWrong && (
                          <button
                            onClick={() => handleResetMiniCheck(check.id)}
                            className="text-xs font-bold text-amber-700 hover:text-amber-900 underline"
                          >
                            Riprova questa domanda
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Chapter Navigation Footer */}
        <div className="pt-8 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            disabled={currentChapter.id === 1}
            onClick={() => {
              soundManager.playPop();
              setSelectedChapterId(prev => Math.max(1, prev - 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              currentChapter.id > 1
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                : 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Capitolo Precedente</span>
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-slate-600 hover:text-amber-800 py-1"
          >
            Torna all'indice dei capitoli ↑
          </button>

          {currentChapter.id < TEXTBOOK_CHAPTERS.length ? (
            <button
              onClick={() => {
                soundManager.playPop();
                setSelectedChapterId(prev => Math.min(TEXTBOOK_CHAPTERS.length, prev + 1));
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <span>Capitolo Successivo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                soundManager.playPop();
                onGoToPractice();
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span>Terminato il Libro! Vai agli Esercizi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
