import React, { useState, useEffect } from 'react';
import { VERIFICATION_QUESTION_BANK, VerificationQuestion } from '../../data/verificationQuizData';
import { AvatarConfig, LoggedError } from '../../types/math';
import { soundManager } from '../../utils/audio';
import { 
  FileCheck2, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  BarChart3,
  HelpCircle,
  Home
} from 'lucide-react';

interface FinalAssessmentSectionProps {
  avatarConfig: AvatarConfig;
  onAwardXp: (amount: number) => void;
  onGoHome: () => void;
  onGoToReview: () => void;
  onGoToTheory: () => void;
  onLogError: (err: LoggedError) => void;
}

// Helper to shuffle questions
function getShuffled30Questions(): VerificationQuestion[] {
  const copy = [...VERIFICATION_QUESTION_BANK];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 30);
}

export const FinalAssessmentSection: React.FC<FinalAssessmentSectionProps> = ({
  avatarConfig,
  onAwardXp,
  onGoHome,
  onGoToReview,
  onGoToTheory,
  onLogError
}) => {
  // Questions pool: exactly 30 questions
  const [questions, setQuestions] = useState<VerificationQuestion[]>(() => getShuffled30Questions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [qId: string]: string }>({});
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Timer
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectChoice = (choice: string) => {
    setSelectedChoice(choice);
  };

  const handleConfirmAnswer = () => {
    if (!selectedChoice) return;

    soundManager.playPop();

    // Record answer
    const newAnswers = { ...answers, [currentQ.id]: selectedChoice };
    setAnswers(newAnswers);

    // If answer is wrong, log it immediately
    if (selectedChoice !== currentQ.correctAnswer) {
      onLogError({
        id: `err_quiz_${Date.now()}_${currentQ.id}`,
        timestamp: Date.now(),
        exerciseTitle: `Verifica: ${currentQ.topic}`,
        question: currentQ.equationPrompt ? `${currentQ.question} [${currentQ.equationPrompt}]` : currentQ.question,
        givenAnswer: selectedChoice,
        correctAnswer: currentQ.correctAnswer,
        explanation: currentQ.explanation,
        property: currentQ.topic,
        sectionSource: 'prova'
      });
    }

    // Check if test completed
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedChoice(null);
    } else {
      // Calculate final score
      let correct = 0;
      questions.forEach(q => {
        if (newAnswers[q.id] === q.correctAnswer) correct++;
      });

      soundManager.playLevelUp();
      setIsFinished(true);
      onAwardXp(correct * 20 + 200);
    }
  };

  /**
   * CORREZIONE CRITICA RICHIESTA DALL'UTENTE:
   * Quando si clicca su RIFAI IL QUIZ:
   * - Azzera completamente le risposte precedenti.
   * - Azzera il punteggio.
   * - Azzera il numero della domanda.
   * - Ripristina tutti gli stati iniziali.
   * - Estrai un nuovo gruppo di domande casuali.
   * - Non mantenere selezioni precedenti.
   * - Mostra nuovamente la prima domanda.
   */
  const handleResetQuiz = () => {
    soundManager.playPop();
    const freshQuestions = getShuffled30Questions();
    setQuestions(freshQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setSelectedChoice(null);
    setIsFinished(false);
    setTimeElapsed(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Evaluation calculations
  const totalCorrect = questions.filter(q => answers[q.id] === q.correctAnswer).length;
  const percentage = Math.round((totalCorrect / questions.length) * 100);
  const gradeInTenths = (totalCorrect / 3).toFixed(1); // e.g. 27/30 = 9.0/10

  // Topic mastery breakdown
  const topicStats: { [t: string]: { correct: number; total: number } } = {};
  questions.forEach(q => {
    if (!topicStats[q.topic]) topicStats[q.topic] = { correct: 0, total: 0 };
    topicStats[q.topic].total++;
    if (answers[q.id] === q.correctAnswer) topicStats[q.topic].correct++;
  });

  const understoodTopics = Object.keys(topicStats).filter(
    t => (topicStats[t].correct / topicStats[t].total) >= 0.7
  );
  const reviewTopics = Object.keys(topicStats).filter(
    t => (topicStats[t].correct / topicStats[t].total) < 0.7
  );

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-purple-100 border border-white/25">
              <FileCheck2 className="w-3.5 h-3.5 text-yellow-300" />
              <span>Sezione 5 · Mi Metto alla Prova</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-display">
              Verifica Finale: Test Ufficiale di 30 Domande
            </h2>
            <p className="text-xs sm:text-sm text-purple-100/90 max-w-2xl leading-relaxed">
              Domande estratte casualmente su tutte le proprietà delle 4 operazioni ed elementi neutri. Valutazione in decimi e scheda dettagliata di ripasso.
            </p>
          </div>

          {!isFinished && (
            <div className="flex items-center gap-3 bg-black/25 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 shrink-0">
              <Clock className="w-5 h-5 text-amber-300" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200 block">Tempo di Prova</span>
                <span className="font-mono text-sm font-bold text-white">{formatTime(timeElapsed)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isFinished ? (
        /* Question Answering View */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl space-y-6">
          
          {/* Progress Header */}
          <div className="space-y-2 border-b border-amber-100 pb-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                Argomento: {currentQ.topic}
              </span>
              <span>Domanda {currentIndex + 1} di {questions.length}</span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>

            {currentQ.equationPrompt && (
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 font-mono text-xl font-bold text-slate-900 text-center shadow-xs">
                {currentQ.equationPrompt}
              </div>
            )}
          </div>

          {/* Choices Grid */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedChoice === opt;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    soundManager.playPop();
                    handleSelectChoice(opt);
                  }}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 active:scale-98 ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md font-bold'
                      : 'bg-white hover:bg-amber-50/70 border-slate-200 text-slate-800'
                  }`}
                >
                  <span className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation action */}
          <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {selectedChoice ? 'Risposta selezionata' : 'Seleziona un\'opzione per confermare'}
            </span>

            <button
              disabled={!selectedChoice}
              onClick={handleConfirmAnswer}
              className={`px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 ${
                selectedChoice
                  ? 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{currentIndex < questions.length - 1 ? 'Conferma e Continua' : 'Concludi la Verifica'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Results Report Screen */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl space-y-10 animate-fade-in">
          
          {/* Header Summary */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-md">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Scheda di Valutazione Ufficiale
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Ecco l'esito della tua prova completata in {formatTime(timeElapsed)}.
            </p>
          </div>

          {/* Score Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Punteggio Totale</span>
              <p className="text-3xl font-black text-amber-700 mt-1">{totalCorrect} / {questions.length}</p>
              <p className="text-xs text-slate-500 mt-0.5">{percentage}% di risposte esatte</p>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-5 rounded-2xl text-white text-center shadow-sm">
              <span className="text-xs font-bold text-amber-100 uppercase">Voto in Decimi</span>
              <p className="text-3xl font-black text-white mt-1">{gradeInTenths} / 10</p>
              <p className="text-xs text-amber-100 mt-0.5">
                {Number(gradeInTenths) >= 8 ? 'Valutazione Eccellente!' : Number(gradeInTenths) >= 6 ? 'Valutazione Sufficiente' : 'Da Rivedere con Ripasso'}
              </p>
            </div>

            <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 text-center">
              <span className="text-xs font-bold text-purple-700 uppercase">Tempo Impiegato</span>
              <p className="text-3xl font-black text-purple-900 mt-1">{formatTime(timeElapsed)}</p>
              <p className="text-xs text-purple-600 mt-0.5">Media: {(timeElapsed / 30).toFixed(0)} sec per domanda</p>
            </div>
          </div>

          {/* Topics understood vs topics to review */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Understood topics */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Argomenti Compresi Pienamente (≥ 70%)</span>
              </div>
              {understoodTopics.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {understoodTopics.map(t => (
                    <span key={t} className="px-3 py-1 bg-white text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold shadow-2xs">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-600">Nessun argomento ha raggiunto la soglia del 70%. È consigliato ripassare la teoria!</p>
              )}
            </div>

            {/* Review topics */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-rose-900">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>Argomenti da Consolidare e Ripassare (&lt; 70%)</span>
              </div>
              {reviewTopics.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {reviewTopics.map(t => (
                      <span key={t} className="px-3 py-1 bg-white text-rose-800 border border-rose-300 rounded-xl text-xs font-bold shadow-2xs">
                        ⚠️ {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      onGoToTheory();
                    }}
                    className="text-xs font-bold text-rose-700 hover:text-rose-900 underline block pt-1"
                  >
                    Apri il Libro di Testo per ripassare questi capitoli →
                  </button>
                </div>
              ) : (
                <p className="text-xs text-emerald-700 font-semibold">Fantastico! Hai superato brilliantemente tutti gli argomenti!</p>
              )}
            </div>
          </div>

          {/* Detailed wrong answers explanations list */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Riepilogo Dettagliato delle Domande da Rivedere ({questions.filter(q => answers[q.id] !== q.correctAnswer).length} errori):</span>
            </h4>

            {questions.filter(q => answers[q.id] !== q.correctAnswer).length === 0 ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-bold">
                🎉 Punteggio perfetto: 30 risposte esatte su 30! Nessun errore commesso!
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {questions
                  .filter(q => answers[q.id] !== q.correctAnswer)
                  .map((q, idx) => (
                    <div key={q.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                          {q.topic}
                        </span>
                        <span className="text-slate-400 font-semibold">Q#{idx + 1}</span>
                      </div>
                      <p className="font-bold text-slate-900">{q.question}</p>
                      {q.equationPrompt && (
                        <p className="font-mono text-slate-700 bg-white p-2 rounded-lg border border-slate-200 inline-block font-bold">
                          {q.equationPrompt}
                        </p>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <p className="text-rose-700 font-semibold">
                          ❌ La tua risposta: <span className="line-through">{answers[q.id]}</span>
                        </p>
                        <p className="text-emerald-700 font-bold">
                          ✓ Risposta corretta: {q.correctAnswer}
                        </p>
                      </div>
                      <p className="text-slate-600 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                        <strong>Spiegazione del docente:</strong> {q.explanation}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Action Buttons with the 100% FIXED RIFAI IL QUIZ Button */}
          <div className="pt-6 border-t border-amber-200 flex flex-wrap items-center justify-between gap-4">
            {/* The user-requested flawless 'RIFAI IL QUIZ' button */}
            <button
              onClick={handleResetQuiz}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Rifai il Quiz (30 Nuove Domande Estratte)</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundManager.playPop();
                  onGoToReview();
                }}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
              >
                <span>Vai alla Sezione Ripasso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  soundManager.playPop();
                  onGoHome();
                }}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Torna alla Home</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
