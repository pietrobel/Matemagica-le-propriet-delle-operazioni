import React, { useState } from 'react';
import { 
  AvatarConfig, 
  AvatarArchetype, 
  HairStyle, 
  OutfitType, 
  AccessoryType, 
  ExpressionType 
} from '../../types/math';
import { AvatarRenderer } from './AvatarRenderer';
import { soundManager } from '../../utils/audio';
import { Sparkles, Dices, Check, X, Palette, User } from 'lucide-react';

interface AvatarCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: AvatarConfig;
  onSave: (newConfig: AvatarConfig) => void;
  userLevel?: number;
}

const ARCHETYPES: { id: AvatarArchetype; label: string; defaultColor: string }[] = [
  { id: 'kid_girl', label: 'Scienziata Mia', defaultColor: '#FDBA74' },
  { id: 'kid_boy', label: 'Esploratore Leo', defaultColor: '#FDBA74' },
  { id: 'fox', label: 'Volpe Astuta', defaultColor: '#F97316' },
  { id: 'owl', label: 'Gufo Saggio', defaultColor: '#8B5CF6' },
  { id: 'robot', label: 'RoboCalc', defaultColor: '#0EA5E9' }
];

const SKIN_TONES = [
  // Toni naturali pelle
  { hex: '#FFE4D6', label: 'Porcellana Chiara' },
  { hex: '#FDBA74', label: 'Pesca Naturale' },
  { hex: '#FED7AA', label: 'Sabbia Dorata' },
  { hex: '#E0A96D', label: 'Miele Caldo' },
  { hex: '#B47D49', label: 'Ambra / Caramello' },
  { hex: '#9A6036', label: 'Bronzo Intenso' },
  { hex: '#5C381E', label: 'Cioccolato Scuro' },
  // Toni speciali compagni / animali
  { hex: '#F97316', label: 'Arancio Volpe' },
  { hex: '#F8FAFC', label: 'Bianco Neve' },
  { hex: '#38BDF8', label: 'Azzurro Robot' },
  { hex: '#C084FC', label: 'Lilla Magico' },
  { hex: '#F472B6', label: 'Rosa Confetto' }
];

const HAIR_STYLES: { id: HairStyle; label: string; tag: string }[] = [
  { id: 'ponytail', label: 'Coda di Cavallo', tag: 'Femminile / Dinamico' },
  { id: 'top_bun', label: 'Chignon Alto', tag: 'Elegante' },
  { id: 'long_waves', label: 'Onde Lunghe', tag: 'Fluido' },
  { id: 'twin_pigtails', label: 'Due Codini', tag: 'Allegro' },
  { id: 'braids', label: 'Treccine', tag: 'Simpatico' },
  { id: 'bob', label: 'Caschetto', tag: 'Classico' },
  { id: 'spiky', label: 'Ciuffo Sprint', tag: 'Energico' },
  { id: 'curls', label: 'Ricci Belli', tag: 'Voluminoso' },
  { id: 'cap', label: 'Cappellino', tag: 'Sportivo' },
  { id: 'crest', label: 'Cresta Tech', tag: 'Futuristico' },
  { id: 'none', label: 'Semplice / Rasato', tag: 'Naturale' }
];

const HAIR_COLORS = [
  { hex: '#EA580C', label: 'Rame / Carota' },
  { hex: '#B45309', label: 'Castano Dorato' },
  { hex: '#1E293B', label: 'Nero Corvino' },
  { hex: '#78350F', label: 'Cioccolato' },
  { hex: '#F59E0B', label: 'Biondo Miele' },
  { hex: '#EF4444', label: 'Rosso Fuoco' },
  { hex: '#EC4899', label: 'Rosa Pastello' },
  { hex: '#8B5CF6', label: 'Viola Fantasia' },
  { hex: '#0284C7', label: 'Blu Cobalto' },
  { hex: '#059669', label: 'Verde Smeraldo' }
];

const OUTFITS: { id: OutfitType; label: string; desc: string }[] = [
  { id: 'salopette', label: 'Salopette con Toppe', desc: 'Comoda con toppa a stella' },
  { id: 'starry_dress', label: 'Abito Magico Stellato', desc: 'Con stelle dorate e nastro' },
  { id: 'superhero', label: 'Costume da Supereroe', desc: 'Con mantello e stemma matematico' },
  { id: 'hoodie', label: 'Felpa con Cappuccio', desc: 'Comoda per calcolare a mente' },
  { id: 'scientist', label: 'Camice da Scienziato', desc: 'Con taschino per le formule' },
  { id: 'astronaut', label: 'Tuta da Astronauta', desc: 'Per viaggiare nello spazio matematico' },
  { id: 'magician', label: 'Mantello del Mago', desc: 'Per magie di calcolo' },
  { id: 'athlete', label: 'Maglia dei Record', desc: 'Numero 7 vincente' },
  { id: 'math_tee', label: 'T-Shirt Operazioni', desc: 'Con i simboli +, -, ×, ÷' }
];

const OUTFIT_COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#0F172A', '#06B6D4', '#F43F5E', '#84CC16'
];

const ACCESSORIES: { id: AccessoryType; label: string }[] = [
  { id: 'hair_bow', label: 'Fiocco per Capelli' },
  { id: 'headband_stars', label: 'Cerchietto con Stelle' },
  { id: 'heart_glasses', label: 'Occhiali a Cuore' },
  { id: 'glasses', label: 'Occhiali da Genio' },
  { id: 'wizard_hat', label: 'Cappello a Punta da Mago' },
  { id: 'crown', label: 'Corona Reale' },
  { id: 'magic_wand', label: 'Bacchetta Magica' },
  { id: 'headphones', label: 'Cuffie Gamer' },
  { id: 'explorer_scarf', label: 'Sciarpa Avventura' },
  { id: 'medal', label: 'Medaglia d\'Oro' },
  { id: 'none', label: 'Nessuno' }
];

const EXPRESSIONS: { id: ExpressionType; label: string }[] = [
  { id: 'happy', label: 'Sorridente' },
  { id: 'sweet_smile', label: 'Sorriso Dolce' },
  { id: 'wink', label: 'Occhiolino Furbo' },
  { id: 'starry', label: 'Occhi a Stella' },
  { id: 'determined', label: 'Determinato & Grintoso' },
  { id: 'focused', label: 'Concentrato' }
];

export const AvatarCustomizerModal: React.FC<AvatarCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onSave
}) => {
  const [draft, setDraft] = useState<AvatarConfig>({ ...currentConfig });
  const [activeTab, setActiveTab] = useState<'character' | 'skin' | 'hair' | 'outfit' | 'accessory' | 'face'>('character');

  if (!isOpen) return null;

  const handleRandomize = () => {
    soundManager.playSwoosh();
    const randomArchetype = ARCHETYPES[Math.floor(Math.random() * ARCHETYPES.length)];
    const randomSkin = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)];
    const randomHair = HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)];
    const randomHairColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)];
    const randomOutfit = OUTFITS[Math.floor(Math.random() * OUTFITS.length)];
    const randomOutfitColor = OUTFIT_COLORS[Math.floor(Math.random() * OUTFIT_COLORS.length)];
    const randomAccessory = ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)];
    const randomExpression = EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)];

    setDraft(prev => ({
      ...prev,
      archetype: randomArchetype.id,
      primaryColor: randomSkin.hex,
      hairStyle: randomHair.id,
      hairColor: randomHairColor.hex,
      outfit: randomOutfit.id,
      outfitColor: randomOutfitColor,
      accessory: randomAccessory.id,
      expression: randomExpression.id
    }));
  };

  const handleSave = () => {
    soundManager.playCorrect();
    onSave(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Personalizza il Tuo Compagno Matematico</h2>
              <p className="text-xs text-amber-100 font-medium">Scegli viso, capelli, vestiti, colore della pelle e accessori speciali</p>
            </div>
          </div>
          <button
            onClick={() => { soundManager.playPop(); onClose(); }}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Chiudi"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Live Avatar Stage */}
          <div className="md:col-span-5 bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-2xl p-6 border border-amber-200/80 flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full flex justify-between items-center text-xs font-semibold text-amber-800">
              <span className="uppercase tracking-wider">Anteprima Viva</span>
              <button
                type="button"
                onClick={handleRandomize}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-700 rounded-lg border border-amber-300 text-xs font-semibold shadow-xs transition-colors"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Mescola Magico</span>
              </button>
            </div>

            {/* Avatar Big Preview */}
            <div className="my-auto py-2">
              <AvatarRenderer
                config={draft}
                size={190}
                speechBubble={`Pronto per vincere!` }
                isCelebrating={true}
              />
            </div>

            {/* Nickname Input */}
            <div className="w-full mt-2">
              <label htmlFor="companion-nickname" className="block text-xs font-semibold text-slate-700 mb-1">
                Nome del tuo Compagno:
              </label>
              <input
                id="companion-nickname"
                type="text"
                value={draft.nickname}
                maxLength={20}
                onChange={e => setDraft(prev => ({ ...prev, nickname: e.target.value }))}
                placeholder="Es. Mia, Leo, Stella, Volpina..."
                className="w-full px-3 py-2 text-sm font-semibold text-slate-800 bg-white border border-amber-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Right Column: Customization Deck & Tabs */}
          <div className="md:col-span-7 flex flex-col h-full">
            {/* Category Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-amber-100/60 rounded-xl mb-4 overflow-x-auto">
              {[
                { id: 'character', label: 'Personaggio' },
                { id: 'skin', label: 'Pelle & Manto' },
                { id: 'hair', label: 'Capelli' },
                { id: 'outfit', label: 'Vestiti' },
                { id: 'accessory', label: 'Accessori' },
                { id: 'face', label: 'Espressione' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { soundManager.playPop(); setActiveTab(tab.id as typeof activeTab); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-amber-900 shadow-xs'
                      : 'text-amber-800/80 hover:text-amber-900 hover:bg-white/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Archetipo */}
            {activeTab === 'character' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600">Scegli la base del tuo compagno:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {ARCHETYPES.map(arch => {
                    const isSelected = draft.archetype === arch.id;
                    return (
                      <button
                        key={arch.id}
                        onClick={() => {
                          soundManager.playPop();
                          setDraft(prev => ({
                            ...prev,
                            archetype: arch.id
                          }));
                        }}
                        className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/80 shadow-xs ring-2 ring-amber-200'
                            : 'border-slate-200 bg-white hover:border-amber-300'
                        }`}
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-slate-200"
                          style={{ backgroundColor: draft.primaryColor + '30' }}
                        >
                          <AvatarRenderer
                            config={{ ...draft, archetype: arch.id }}
                            size={36}
                            showShadow={false}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{arch.label}</p>
                          <p className="text-[10px] text-slate-500">Base del personaggio</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Colore Pelle & Manto */}
            {activeTab === 'skin' && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-1">Colore della Pelle o del Manto:</p>
                  <p className="text-[11px] text-slate-500 mb-3">Scegli una tonalità naturale o un colore vivace per il tuo personaggio</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SKIN_TONES.map(tone => {
                      const isSelected = draft.primaryColor === tone.hex;
                      return (
                        <button
                          key={tone.hex}
                          onClick={() => {
                            soundManager.playPop();
                            setDraft(prev => ({ ...prev, primaryColor: tone.hex }));
                          }}
                          className={`p-2.5 rounded-xl border-2 flex items-center gap-2.5 transition-all text-left ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200 shadow-xs'
                              : 'border-slate-200 bg-white hover:border-amber-300'
                          }`}
                        >
                          <span
                            className="w-6 h-6 rounded-full border border-slate-300 shrink-0 shadow-inner"
                            style={{ backgroundColor: tone.hex }}
                          />
                          <span className="text-xs font-bold text-slate-800 truncate">{tone.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Capelli & Acconciatura */}
            {activeTab === 'hair' && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2">Stile Capelli o Acconciatura:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[190px] overflow-y-auto pr-1">
                    {HAIR_STYLES.map(style => {
                      const isSelected = draft.hairStyle === style.id;
                      return (
                        <button
                          key={style.id}
                          onClick={() => {
                            soundManager.playPop();
                            setDraft(prev => ({ ...prev, hairStyle: style.id }));
                          }}
                          className={`p-2 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold ring-2 ring-amber-200 shadow-xs'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300 text-xs font-medium'
                          }`}
                        >
                          <p className="text-xs font-bold truncate">{style.label}</p>
                          <p className="text-[10px] text-slate-400 truncate">{style.tag}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2">Colore dei Capelli:</p>
                  <div className="flex flex-wrap gap-2">
                    {HAIR_COLORS.map(color => (
                      <button
                        key={color.hex}
                        onClick={() => {
                          soundManager.playPop();
                          setDraft(prev => ({ ...prev, hairColor: color.hex }));
                        }}
                        style={{ backgroundColor: color.hex }}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                          draft.hairColor === color.hex ? 'border-amber-600 ring-2 ring-amber-300 scale-105' : 'border-white shadow-xs'
                        }`}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Vestiti & Colori */}
            {activeTab === 'outfit' && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2">Outfit dell'Avventura:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[190px] overflow-y-auto pr-1">
                    {OUTFITS.map(outfit => {
                      const isSelected = draft.outfit === outfit.id;
                      return (
                        <button
                          key={outfit.id}
                          onClick={() => {
                            soundManager.playPop();
                            setDraft(prev => ({ ...prev, outfit: outfit.id }));
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-200 font-bold'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300'
                          }`}
                        >
                          <p className="text-xs font-bold text-slate-900 truncate">{outfit.label}</p>
                          <p className="text-[10px] text-slate-500 truncate">{outfit.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2">Tinta dell'Abbigliamento:</p>
                  <div className="flex flex-wrap gap-2">
                    {OUTFIT_COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => {
                          soundManager.playPop();
                          setDraft(prev => ({ ...prev, outfitColor: color }));
                        }}
                        style={{ backgroundColor: color }}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                          draft.outfitColor === color ? 'border-amber-600 ring-2 ring-amber-300 scale-105' : 'border-white shadow-xs'
                        }`}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Accessori Speciali */}
            {activeTab === 'accessory' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">Scegli un accessorio speciale per personalizzare il tuo eroe:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                  {ACCESSORIES.map(acc => {
                    const isSelected = draft.accessory === acc.id;
                    return (
                      <button
                        key={acc.id}
                        onClick={() => {
                          soundManager.playPop();
                          setDraft(prev => ({ ...prev, accessory: acc.id }));
                        }}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-200 font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300 font-medium'
                        }`}
                      >
                        <span className="text-xs truncate">{acc.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 6: Espressione */}
            {activeTab === 'face' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">Qual è l'umore e lo sguardo del tuo compagno?</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {EXPRESSIONS.map(expr => {
                    const isSelected = draft.expression === expr.id;
                    return (
                      <button
                        key={expr.id}
                        onClick={() => {
                          soundManager.playPop();
                          setDraft(prev => ({ ...prev, expression: expr.id }));
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-200 font-bold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300 font-medium'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-amber-100/60 flex items-center justify-center shrink-0 border border-amber-200">
                          <AvatarRenderer
                            config={{ ...draft, expression: expr.id }}
                            size={32}
                            showShadow={false}
                          />
                        </div>
                        <span className="text-xs flex-1 truncate">{expr.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Il compagno ti incoraggerà durante tutti i giochi e le lezioni!
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { soundManager.playPop(); onClose(); }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Salva Compagno</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
