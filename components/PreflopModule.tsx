import React, { useState, useMemo } from 'react';
import { Position, ActionType } from '../types';
import { generateRangeGrid, calculateStats, formatPercent } from '../utils/pokerMath';
import RangeChart from './RangeChart';
import { Filter, Info, Users, ArrowRightCircle } from 'lucide-react';

const POSITIONS: Position[] = ['UTG', 'MP', 'CO', 'BTN', 'SB', 'BB'];
const ACTIONS: ActionType[] = ['RFI', 'vs 3-Bet'];

const PreflopModule: React.FC = () => {
  const [position, setPosition] = useState<Position>('BTN');
  const [action, setAction] = useState<ActionType>('RFI');

  // Generate grid based on current selection
  const grid = useMemo(() => generateRangeGrid(position, action), [position, action]);
  const stats = useMemo(() => calculateStats(grid), [grid]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Controls */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Users className="text-emerald-400" />
              Range Viewer GTO
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Visualizza i range ottimali per 6-Max Cash Game (100BB).
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
             <div className="bg-slate-900 p-1 rounded-lg border border-slate-700 flex">
                {POSITIONS.map(pos => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos)}
                    className={`
                      px-3 py-1.5 text-xs md:text-sm font-semibold rounded-md transition-all
                      ${position === pos 
                        ? 'bg-emerald-600 text-white shadow' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                    `}
                  >
                    {pos}
                  </button>
                ))}
             </div>

             <div className="bg-slate-900 p-1 rounded-lg border border-slate-700 flex">
                {ACTIONS.map(act => (
                  <button
                    key={act}
                    onClick={() => setAction(act)}
                    className={`
                      px-3 py-1.5 text-xs md:text-sm font-semibold rounded-md transition-all
                      ${action === act 
                        ? 'bg-blue-600 text-white shadow' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                    `}
                  >
                    {act === 'RFI' ? 'Open Raise' : act}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
           <div>
             <span className="text-xs text-slate-500 uppercase font-bold">Posizione</span>
             <p className="text-lg font-bold text-white">{position}</p>
           </div>
           <div>
             <span className="text-xs text-slate-500 uppercase font-bold">Azione</span>
             <p className="text-lg font-bold text-white">{action === 'RFI' ? 'Raise First In' : 'Vs 3-Bet'}</p>
           </div>
           <div>
             <span className="text-xs text-slate-500 uppercase font-bold">Combos</span>
             <p className="text-lg font-mono text-emerald-400">{stats.combos} <span className="text-xs text-slate-600">/ 1326</span></p>
           </div>
           <div>
             <span className="text-xs text-slate-500 uppercase font-bold">Frequenza</span>
             <p className="text-lg font-mono text-emerald-400">{formatPercent(stats.percentage / 100)}</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Matrix */}
        <div className="lg:col-span-2">
           <RangeChart grid={grid} />
           
           {/* Legend */}
           <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 bg-slate-800/50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-600 rounded-sm"></div>
                <span>Always (100%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                <span>Mixed (~50%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-800 border border-slate-600 rounded-sm"></div>
                <span>Fold (0%)</span>
              </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
             <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
               <Info size={18} className="text-blue-400" />
               Analisi Strategica
             </h3>
             
             {position === 'UTG' && action === 'RFI' && (
               <p className="text-sm text-slate-300 leading-relaxed">
                 Da <strong>UTG (Under The Gun)</strong>, il range è molto stretto ("Tight"). 
                 Devi agire per primo post-flop e hai molti giocatori dietro che possono svegliarsi con mani forti. 
                 Gioca solo mani premium e middle pairs forti.
               </p>
             )}
             
             {position === 'BTN' && action === 'RFI' && (
               <p className="text-sm text-slate-300 leading-relaxed">
                 Il <strong>Button</strong> è la posizione più potente. 
                 Puoi aprire un range molto ampio ("Wide") per rubare i bui. 
                 Include tutti gli assi suited, i re suited, connectors bassi e tutte le coppie.
               </p>
             )}
             
             {position === 'BB' && action === 'RFI' && (
               <p className="text-sm text-slate-300 leading-relaxed">
                 Non puoi fare Open Raise (RFI) dal Big Blind perché sei già nel piatto. 
                 Se tutti foldano, vinci automaticamente.
               </p>
             )}

             {action === 'vs 3-Bet' && (
               <div className="mt-3 p-3 bg-red-900/20 border border-red-900/50 rounded-lg">
                 <p className="text-xs text-red-200">
                   <strong>Attenzione:</strong> Quando affronti una 3-Bet, devi difendere molto meno. 
                   Folda le mani speculative e continua solo con mani che hanno buona equity o playability post-flop.
                 </p>
               </div>
             )}
           </div>

           <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-xl border border-slate-700">
             <h3 className="text-lg font-bold text-white mb-4">Struttura Matrice</h3>
             <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-slate-700 rounded text-xs font-mono">AA</span>
                  <span className="text-slate-300">Diagonale: Coppie</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-slate-700 rounded text-xs font-mono">AKs</span>
                  <span className="text-slate-300">Sopra: Suited</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-slate-700 rounded text-xs font-mono">AKo</span>
                  <span className="text-slate-300">Sotto: Offsuit</span>
                </li>
             </ul>
           </div>
           
           <div className="p-4 bg-emerald-900/10 border border-emerald-900/30 rounded-xl">
              <h4 className="text-emerald-400 font-bold mb-1">Lo Sapevi?</h4>
              <p className="text-xs text-emerald-100/70">
                Ci sono 169 mani di partenza distinte, ma 1326 combinazioni totali. 
                AA ha solo 6 combinazioni, mentre AKo ne ha 12. Ecco perché è più probabile avere AKo che AA.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PreflopModule;