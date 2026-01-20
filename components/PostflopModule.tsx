import React, { useState, useEffect } from 'react';
import { CardObj, BoardAnalysis } from '../types';
import { analyzeBoard } from '../utils/pokerMath';
import { RefreshCcw, Layers } from 'lucide-react';

// Standard 4-color deck colors for white backgrounds
const SUITS = [
  { id: 's', label: '♠', color: 'text-black' },
  { id: 'h', label: '♥', color: 'text-red-600' },
  { id: 'd', label: '♦', color: 'text-blue-600' }, 
  { id: 'c', label: '♣', color: 'text-green-600' } 
];

const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const PostflopModule: React.FC = () => {
  const [board, setBoard] = useState<CardObj[]>([]);
  const [analysis, setAnalysis] = useState<BoardAnalysis | null>(null);

  useEffect(() => {
    setAnalysis(analyzeBoard(board));
  }, [board]);

  const addCard = (rank: string, suit: string) => {
    if (board.length < 3) {
      setBoard([...board, { rank, suit }]);
    }
  };

  const resetBoard = () => setBoard([]);

  const renderCard = (card: CardObj, index: number) => {
    const suitObj = SUITS.find(s => s.id === card.suit);
    return (
      <div key={index} className="w-16 h-24 bg-white rounded-lg flex flex-col items-center justify-center border-2 border-slate-300 shadow-xl animate-scale-in">
        <span className={`text-xl font-bold ${suitObj?.color}`}>
          {card.rank}
        </span>
        <span className={`text-2xl ${suitObj?.color}`}>
          {suitObj?.label}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="text-emerald-400" />
              Board Texture Analyzer
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Seleziona 3 carte per analizzare la texture del flop e capire come adattare la strategia.
            </p>
          </div>
          <button 
            onClick={resetBoard}
            className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            <RefreshCcw size={16} /> Reset
          </button>
        </div>

        {/* Board Display */}
        <div className="h-32 bg-poker-felt rounded-xl border-4 border-amber-900/50 flex items-center justify-center gap-4 mb-8 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
          {board.length === 0 && <span className="text-white/30 font-bold uppercase tracking-widest">Seleziona Flop</span>}
          {board.map((card, i) => renderCard(card, i))}
        </div>

        {/* Analysis Result */}
        {analysis && board.length === 3 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8 animate-fade-in">
            <div className={`p-6 rounded-xl border-l-4 ${
              analysis.texture === 'Wet' ? 'bg-red-900/20 border-red-500' :
              analysis.texture === 'Dynamic' ? 'bg-amber-900/20 border-amber-500' :
              'bg-emerald-900/20 border-emerald-500'
            }`}>
              <h3 className="text-xl font-bold text-white mb-2">Texture: {analysis.texture}</h3>
              <p className="text-slate-300">{analysis.description}</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
               <h4 className="font-bold text-slate-200 mb-3">Strategia Consigliata</h4>
               <ul className="space-y-2 text-sm text-slate-400">
                 {analysis.texture === 'Wet' || analysis.texture === 'Dynamic' ? (
                   <>
                     <li>• <strong>Sizing:</strong> Usa size più grandi (66-75%) per far pagare i draw.</li>
                     <li>• <strong>Check-Raise:</strong> Molto efficace qui con draw forti.</li>
                     <li>• <strong>Equity:</strong> Cambierà drasticamente al turn.</li>
                   </>
                 ) : (
                   <>
                     <li>• <strong>C-Bet:</strong> Alta frequenza (range advantage).</li>
                     <li>• <strong>Sizing:</strong> Usa size piccole (33%) per bluffare economico.</li>
                     <li>• <strong>Bluff:</strong> Molto efficaci, difficile per villain aver connesso.</li>
                   </>
                 )}
               </ul>
            </div>
          </div>
        )}

        {/* Compact Card Selector */}
        {board.length < 3 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-500 uppercase">Seleziona Carta {board.length + 1}</h4>
            
            <div className="overflow-x-auto pb-4">
               <div className="flex flex-col gap-1.5 min-w-max">
                 {SUITS.map(suit => (
                   <div key={suit.id} className="flex gap-1.5">
                     {RANKS.map(rank => {
                        const isSelected = board.some(c => c.rank === rank && c.suit === suit.id);
                        return (
                           <button
                             key={`${rank}${suit.id}`}
                             onClick={() => addCard(rank, suit.id)}
                             disabled={isSelected}
                             className={`
                               w-9 h-12 rounded flex flex-col items-center justify-center border text-sm font-bold shadow-sm transition-all
                               ${isSelected 
                                 ? 'bg-slate-800 border-slate-700 opacity-20 cursor-not-allowed grayscale' 
                                 : 'bg-white border-slate-300 hover:scale-110 hover:shadow-md hover:z-10'
                               }
                               ${suit.color}
                             `}
                           >
                             <span className="leading-none">{rank}</span>
                             <span className="text-xs leading-none">{suit.label}</span>
                           </button>
                        );
                     })}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostflopModule;