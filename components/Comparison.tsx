import React from 'react';
import { ShieldCheck, Sword, Target, BrainCircuit, XCircle, AlertTriangle } from 'lucide-react';

const Comparison: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* GTO Card */}
        <div className="bg-slate-800 rounded-xl p-1 border-t-4 border-blue-500 shadow-lg">
          <div className="bg-slate-900/50 p-6 h-full rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Strategia GTO</h3>
                <p className="text-sm text-blue-400 font-mono">Game Theory Optimal</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <BrainCircuit className="text-green-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-300">Matematicamente solida e inattaccabile.</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="text-green-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-300">Difesa perfetta: funziona contro chiunque.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="text-red-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-400">Non massimizza i profitti contro avversari deboli (fish).</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="text-red-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-400">Impossibile da eseguire perfettamente per un umano.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Exploitative Card */}
        <div className="bg-slate-800 rounded-xl p-1 border-t-4 border-red-500 shadow-lg">
          <div className="bg-slate-900/50 p-6 h-full rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-500/20 rounded-full text-red-400">
                <Sword size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Strategia Exploitative</h3>
                <p className="text-sm text-red-400 font-mono">Sfruttante</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Target className="text-green-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-300">Massimizza i profitti colpendo gli errori specifici.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sword className="text-green-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-300">Devastante contro giocatori deboli o prevedibili.</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="text-yellow-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-400">Vulnerabile: se l'avversario si adatta, puoi perdere soldi.</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="text-yellow-500 shrink-0 mt-1" size={18} />
                <span className="text-slate-400">Richiede letture (reads) precise sull'avversario.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4">Quando usare quale?</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-800">
              <tr>
                <th className="px-6 py-3">Situazione</th>
                <th className="px-6 py-3">Approccio Consigliato</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-white">Contro Pro / Giocatori Forti</td>
                <td className="px-6 py-4 text-blue-400 font-bold">GTO</td>
              </tr>
              <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-white">Senza Informazioni (Unknown)</td>
                <td className="px-6 py-4 text-blue-400 font-bold">GTO</td>
              </tr>
              <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-white">Avversario Folda Troppo</td>
                <td className="px-6 py-4 text-red-400 font-bold">Exploitative (Bluffa di più)</td>
              </tr>
              <tr className="border-b border-slate-700 hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-white">Avversario Chiama Tutto (Calling Station)</td>
                <td className="px-6 py-4 text-red-400 font-bold">Exploitative (Niente Bluff, solo Value)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-white">Tornei High Stakes</td>
                <td className="px-6 py-4 text-blue-400 font-bold">GTO (Baseline)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Comparison;