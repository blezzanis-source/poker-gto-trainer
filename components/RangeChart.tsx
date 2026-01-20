import React, { useState } from 'react';
import { HandCell } from '../types';

interface RangeChartProps {
  grid: HandCell[][];
}

type ViewFilter = 'all' | 'pair' | 'suited' | 'offsuit';

const RangeChart: React.FC<RangeChartProps> = ({ grid }) => {
  const [filter, setFilter] = useState<ViewFilter>('all');
  
  const getCellColor = (freq: number, type: string) => {
    // If filtering and this cell doesn't match the type, dim it significantly
    if (filter !== 'all' && type !== filter) {
      return 'bg-slate-900 opacity-20 text-slate-700';
    }

    if (freq === 0) return 'bg-slate-800 text-slate-600'; // Fold
    if (freq === 1) return 'bg-emerald-600 text-white border-emerald-500 shadow-inner'; // Always
    if (freq >= 0.8) return 'bg-emerald-500 text-white'; // Usually
    if (freq >= 0.5) return 'bg-yellow-500 text-black'; // Mixed High
    if (freq > 0) return 'bg-orange-500 text-white'; // Mixed Low
    return 'bg-slate-800';
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      
      {/* View Filters */}
      <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700 justify-between sm:justify-start gap-1 sm:gap-2">
        <button 
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs sm:text-sm rounded font-medium transition-all ${filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          Tutte
        </button>
        <button 
          onClick={() => setFilter('pair')}
          className={`px-3 py-1.5 text-xs sm:text-sm rounded font-medium transition-all ${filter === 'pair' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          Coppie (Pairs)
        </button>
        <button 
          onClick={() => setFilter('suited')}
          className={`px-3 py-1.5 text-xs sm:text-sm rounded font-medium transition-all ${filter === 'suited' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          Suited (Seme uguale)
        </button>
        <button 
          onClick={() => setFilter('offsuit')}
          className={`px-3 py-1.5 text-xs sm:text-sm rounded font-medium transition-all ${filter === 'offsuit' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          Offsuit (Semi diversi)
        </button>
      </div>

      {/* Grid */}
      <div className="aspect-square bg-slate-900 p-1 rounded-lg border border-slate-700 shadow-2xl relative">
        {/* Axis Labels (Top) */}
        <div className="absolute -top-6 left-0 w-full flex pl-1">
             {['A','K','Q','J','T','9','8','7','6','5','4','3','2'].map(r => (
               <div key={r} className="flex-1 text-center text-xs font-mono text-slate-500">{r}</div>
             ))}
        </div>
        {/* Axis Labels (Left) */}
        <div className="absolute top-0 -left-6 h-full flex flex-col pt-1">
             {['A','K','Q','J','T','9','8','7','6','5','4','3','2'].map(r => (
               <div key={r} className="flex-1 flex items-center justify-end pr-2 text-xs font-mono text-slate-500">{r}</div>
             ))}
        </div>

        <div 
          className="grid gap-[1px] h-full w-full bg-slate-900"
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(13, 1fr)', 
            gridTemplateRows: 'repeat(13, 1fr)' 
          }}
        >
          {grid.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    relative flex items-center justify-center select-none transition-all duration-300
                    ${getCellColor(cell.freq, cell.type)}
                    hover:scale-110 hover:z-20 hover:brightness-125 cursor-help group rounded-[1px]
                  `}
                  title={`${cell.hand} - ${(cell.freq * 100).toFixed(0)}%`}
                >
                  <span className={`
                    text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm font-bold leading-none
                    ${cell.freq === 0 && filter === 'all' ? 'opacity-20 font-normal' : 'opacity-100'}
                  `}>
                    {cell.hand}
                  </span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <p className="text-center text-xs text-slate-500 mt-2">
        {filter === 'all' && "La diagonale sono le Coppie. Sopra la diagonale sono i Suited. Sotto sono gli Offsuit."}
        {filter === 'pair' && "Visualizzando solo le Coppie (AA, KK, QQ...)."}
        {filter === 'suited' && "Visualizzando solo mani dello stesso seme (AKs, T9s...)."}
        {filter === 'offsuit' && "Visualizzando solo mani di semi diversi (AKo, JTo...)."}
      </p>
    </div>
  );
};

export default RangeChart;