import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { calculateGtoFrequencies, formatCurrency, formatPercent } from '../utils/pokerMath';

const GtoSimulator: React.FC = () => {
  const [potSize, setPotSize] = useState<number>(100);
  const [betSize, setBetSize] = useState<number>(50);

  const stats = useMemo(() => calculateGtoFrequencies(potSize, betSize), [potSize, betSize]);

  const chartData = [
    { name: 'Value Bet (Mani Forti)', value: stats.optimalValueFreq, color: '#ef4444' }, // Red
    { name: 'Bluff (Aria)', value: stats.optimalBluffFreq, color: '#3b82f6' }, // Blue
  ];

  const handleBetSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBetSize(Number(e.target.value));
  };

  return (
    <div className="bg-poker-card rounded-xl p-6 shadow-xl border border-slate-700">
      <h2 className="text-2xl font-bold text-poker-accent mb-4">Simulatore Frequenze River</h2>
      <p className="text-slate-400 mb-6">
        Modifica la dimensione del piatto e della puntata per vedere come cambia il rapporto ottimale tra Value Bet e Bluff.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Dimensione Piatto (Pot): <span className="text-emerald-400 font-bold">{formatCurrency(potSize)}</span>
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={potSize}
              onChange={(e) => setPotSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="bg-slate-800/50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              La Tua Puntata (Bet): <span className="text-yellow-400 font-bold">{formatCurrency(betSize)}</span>
            </label>
            <input
              type="range"
              min="10"
              max={potSize * 2}
              step="10"
              value={betSize}
              onChange={handleBetSliderChange}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Min</span>
              <span>2x Pot</span>
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-poker-accent">
            <h3 className="text-lg font-semibold text-white mb-2">Analisi Matematica</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex justify-between">
                <span>Rapporto Bet/Pot:</span>
                <span className="font-mono text-white">{(betSize / potSize).toFixed(2)}x</span>
              </li>
              <li className="flex justify-between">
                <span>Odds offerte all'avversario:</span>
                <span className="font-mono text-white">{betSize} su {(potSize + 2 * betSize)} ({formatPercent(stats.potOdds)})</span>
              </li>
              <li className="flex justify-between border-t border-slate-700 pt-2 mt-2">
                <span>Frequenza Bluff Ottimale:</span>
                <span className="font-bold text-blue-400">{formatPercent(stats.optimalBluffFreq)}</span>
              </li>
              <li className="flex justify-between">
                <span>Frequenza Value Ottimale:</span>
                <span className="font-bold text-red-400">{formatPercent(stats.optimalValueFreq)}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Visualization */}
        <div className="h-80 w-full relative bg-slate-800/30 rounded-lg flex flex-col items-center justify-center p-4">
            <h3 className="text-center font-semibold text-slate-200 mb-2">Composizione Range GTO</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    formatter={(value: number) => formatPercent(value)}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center mt-4">
                <span className="block text-2xl font-bold text-slate-200">
                  {formatPercent(stats.optimalValueFreq)}
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-widest">Value</span>
              </div>
            </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-emerald-900/20 text-emerald-100 rounded-lg text-sm border border-emerald-900/50">
        <p>
          <strong>Interpretazione:</strong> Se punti <strong>{formatCurrency(betSize)}</strong> su un piatto di <strong>{formatCurrency(potSize)}</strong>, 
          l'avversario ha bisogno di vincere solo il <strong>{formatPercent(stats.requiredEquity)}</strong> delle volte per fare break-even. 
          Pertanto, il tuo range deve contenere esattamente il {formatPercent(stats.optimalBluffFreq)} di bluff per renderlo indifferente. 
          Qualsiasi altra frequenza darebbe all'avversario un vantaggio matematico sfruttando Fold o Call.
        </p>
      </div>
    </div>
  );
};

export default GtoSimulator;