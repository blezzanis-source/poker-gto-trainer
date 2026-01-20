import React, { useState, useMemo } from 'react';
import { UserSearch, Target, ShieldAlert } from 'lucide-react';
import { analyzeOpponent } from '../utils/pokerMath';

const OpponentModule: React.FC = () => {
  const [stats, setStats] = useState({
    vpip: 25,
    pfr: 20,
    threeBet: 8
  });

  const profile = useMemo(() => analyzeOpponent(stats), [stats]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
            <UserSearch size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Opponent Profiler</h2>
            <p className="text-slate-400">Inserisci le statistiche HUD dell'avversario per scoprire come exploitarlo.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-bold text-slate-300">VPIP (Voluntarily Put Money In Pot)</label>
                <span className="text-purple-400 font-mono">{stats.vpip}%</span>
              </div>
              <input 
                type="range" min="0" max="100" 
                value={stats.vpip} onChange={e => setStats({...stats, vpip: Number(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <p className="text-xs text-slate-500 mt-1">Quanto spesso gioca una mano.</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="font-bold text-slate-300">PFR (Preflop Raise)</label>
                <span className="text-blue-400 font-mono">{stats.pfr}%</span>
              </div>
              <input 
                type="range" min="0" max={stats.vpip} 
                value={stats.pfr} onChange={e => setStats({...stats, pfr: Number(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <p className="text-xs text-slate-500 mt-1">Quanto spesso entra rilanciando.</p>
            </div>
          </div>

          {/* Result Card */}
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-20"></div>
             <div className="relative bg-slate-900 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-3xl font-extrabold text-white tracking-tight">{profile.type}</h3>
                   <span className="px-3 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400">CONFIDENCE: HIGH</span>
                </div>
                
                <p className="text-slate-300 mb-6 border-b border-slate-800 pb-4">
                  {profile.description}
                </p>

                <div>
                   <h4 className="flex items-center gap-2 font-bold text-red-400 mb-3">
                     <Target size={18} />
                     Exploit Plan
                   </h4>
                   <ul className="space-y-3">
                     {profile.exploit.map((tip, idx) => (
                       <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 bg-slate-800/50 p-2 rounded">
                         <span className="text-green-500 font-bold">✓</span>
                         {tip}
                       </li>
                     ))}
                   </ul>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpponentModule;