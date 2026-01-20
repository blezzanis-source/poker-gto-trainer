import React, { useState } from 'react';
import { Trophy, ArrowDown, Hand } from 'lucide-react';

// Simplified mocked data for visualization
const PUSH_FOLD_10BB: Record<string, string> = {
  'AA': 'Push', 'KK': 'Push', 'QQ': 'Push', 'JJ': 'Push', 'TT': 'Push',
  'AKs': 'Push', 'AQs': 'Push', 'AJs': 'Push', 'ATs': 'Push',
  'AKo': 'Push', 'AQo': 'Push', 'AJo': 'Push', 'ATo': 'Push',
  'KQs': 'Push', 'KJs': 'Push', 'QJs': 'Push',
  '22': 'Push', '72o': 'Fold'
};

const TournamentModule: React.FC = () => {
  const [stack, setStack] = useState(10);
  const [position, setPosition] = useState('BTN');

  // Simple heuristic for visual demo
  const getAction = (hand: string) => {
    if (stack <= 5) return 'PUSH ANY';
    if (stack > 15) return 'Standard Open';
    return PUSH_FOLD_10BB[hand] || 'Fold'; // Simplified
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
           <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400">
             <Trophy size={32} />
           </div>
           <div>
             <h2 className="text-2xl font-bold text-white">Torneo & Push/Fold</h2>
             <p className="text-slate-400">Strategia short stack per la fase finale dei tornei (ICM).</p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <div className="space-y-6">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <label className="block text-sm font-bold text-slate-300 mb-4">Effective Stack (BB)</label>
                <div className="flex gap-2">
                   {[5, 10, 15, 20].map(val => (
                     <button
                       key={val}
                       onClick={() => setStack(val)}
                       className={`flex-1 py-2 rounded font-bold transition-all ${stack === val ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-400'}`}
                     >
                       {val} BB
                     </button>
                   ))}
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <label className="block text-sm font-bold text-slate-300 mb-4">La tua Posizione</label>
                <div className="flex gap-2">
                   {['SB', 'BTN', 'CO', 'UTG'].map(pos => (
                     <button
                       key={pos}
                       onClick={() => setPosition(pos)}
                       className={`flex-1 py-2 rounded font-bold transition-all ${position === pos ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}
                     >
                       {pos}
                     </button>
                   ))}
                </div>
              </div>

              <div className="p-4 bg-amber-900/20 border border-amber-800 rounded-lg">
                 <h4 className="font-bold text-amber-400 mb-2">ICM Pressure</h4>
                 <p className="text-sm text-slate-300">
                   {stack <= 10 
                     ? "Sei in zona Push/Fold. Non ci sono raise/fold. O vai All-in o foldi. L'obiettivo è rubare i bui per sopravvivere." 
                     : "Hai ancora margine di manovra. Puoi fare min-raise, ma evita di chiamare raise con mani marginali."}
                 </p>
              </div>
           </div>

           <div className="bg-slate-900 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-700 text-center">
              <span className="text-slate-500 text-sm uppercase tracking-widest mb-2">Strategia Consigliata</span>
              <div className="text-5xl font-extrabold text-white mb-4">
                 {stack <= 10 ? 'PUSH / FOLD' : 'RFI / 3-BET'}
              </div>
              
              <div className="w-full grid grid-cols-2 gap-4 mt-4">
                 <div className="p-4 bg-emerald-900/30 rounded border border-emerald-800">
                    <span className="block text-2xl font-bold text-emerald-400">
                      {stack <= 5 ? '100%' : stack <= 10 ? '45%' : '25%'}
                    </span>
                    <span className="text-xs text-slate-400">Push Range</span>
                 </div>
                 <div className="p-4 bg-slate-800 rounded border border-slate-700">
                    <span className="block text-2xl font-bold text-slate-400">
                      {stack <= 5 ? '0%' : stack <= 10 ? '55%' : '75%'}
                    </span>
                    <span className="text-xs text-slate-500">Fold Range</span>
                 </div>
              </div>

              <p className="mt-6 text-xs text-slate-500">
                *Stime basate su Nash Equilibrium (senza ante)
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentModule;