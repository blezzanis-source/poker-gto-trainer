import React, { useState } from 'react';
import { Calculator, TrendingUp, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/pokerMath';

const MathModule: React.FC = () => {
  const [potSize, setPotSize] = useState(100);
  const [betToCall, setBetToCall] = useState(50);
  const [outs, setOuts] = useState(9); // Default flush draw
  const [street, setStreet] = useState<'flop' | 'turn'>('flop');

  const totalPot = potSize + betToCall;
  const potOdds = betToCall / (totalPot + betToCall);
  
  // Rule of 4 and 2
  const equity = outs * (street === 'flop' ? 4 : 2);
  const isProfitable = equity >= (potOdds * 100);
  const ev = (totalPot * (equity/100)) - (betToCall * (1 - equity/100));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Pot Odds Calculator */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
            <Calculator className="text-blue-400" />
            Pot Odds Calculator
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Piatto Attuale (Pot)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="10" max="1000" step="10" 
                  value={potSize} onChange={e => setPotSize(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="w-20 text-right font-mono text-white">{formatCurrency(potSize)}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Quanto devi chiamare? (Bet)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="10" max={potSize} step="5" 
                  value={betToCall} onChange={e => setBetToCall(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <span className="w-20 text-right font-mono text-white">{formatCurrency(betToCall)}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-slate-400">Pot Odds:</span>
                 <span className="text-xl font-bold text-white">
                   {(totalPot / betToCall).toFixed(1)} : 1
                 </span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-slate-400">Equity Necessaria:</span>
                 <span className="text-xl font-bold text-blue-400">
                   {formatPercent(potOdds)}
                 </span>
               </div>
            </div>
          </div>
        </div>

        {/* Equity & Decision */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
            <TrendingUp className="text-emerald-400" />
            Decisione EV
          </h2>

          <div className="space-y-6 flex-1">
             <div>
               <label className="block text-sm font-medium text-slate-400 mb-2">I tuoi Outs</label>
               <input 
                 type="number" min="1" max="22" 
                 value={outs} onChange={e => setOuts(Number(e.target.value))}
                 className="w-full bg-slate-900 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
               />
               <div className="flex gap-2 mt-2 text-xs">
                 <button onClick={() => setOuts(4)} className="px-2 py-1 bg-slate-700 rounded hover:bg-slate-600">Gutshot (4)</button>
                 <button onClick={() => setOuts(8)} className="px-2 py-1 bg-slate-700 rounded hover:bg-slate-600">OESD (8)</button>
                 <button onClick={() => setOuts(9)} className="px-2 py-1 bg-slate-700 rounded hover:bg-slate-600">Flush (9)</button>
               </div>
             </div>

             <div className="flex gap-4">
                <button 
                  onClick={() => setStreet('flop')}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${street === 'flop' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'}`}
                >
                  Siamo al Flop
                </button>
                <button 
                  onClick={() => setStreet('turn')}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${street === 'turn' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'}`}
                >
                  Siamo al Turn
                </button>
             </div>

             <div className={`mt-auto p-6 rounded-xl border-2 flex items-center justify-between ${isProfitable ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
                <div>
                  <span className="block text-sm text-slate-400">La tua Equity (Approx)</span>
                  <span className={`text-3xl font-bold ${isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
                    {equity}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-sm text-slate-400">Decisione</span>
                  <span className={`text-2xl font-bold uppercase ${isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isProfitable ? 'CALL' : 'FOLD'}
                  </span>
                  <span className="block text-xs text-slate-500 mt-1">EV: {ev > 0 ? '+' : ''}{ev.toFixed(1)}€</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-900/20 border border-amber-700/50 p-4 rounded-xl flex gap-3">
        <AlertTriangle className="text-amber-500 shrink-0" />
        <div className="text-sm text-amber-100">
          <strong className="block mb-1 text-amber-400">Implied Odds Warning</strong>
          Questo calcolatore usa le odds dirette. Se pensi di poter vincere molto di più quando chiudi il punto (Implied Odds), un Call potrebbe essere profittevole anche con EV leggermente negativo qui.
        </div>
      </div>
    </div>
  );
};

export default MathModule;