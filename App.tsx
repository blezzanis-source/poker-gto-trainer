import React, { useState } from 'react';
import { SectionId, NavItem } from './types';
import GtoSimulator from './components/GtoSimulator';
import Comparison from './components/Comparison';
import PreflopModule from './components/PreflopModule';
import PostflopModule from './components/PostflopModule';
import MathModule from './components/MathModule';
import OpponentModule from './components/OpponentModule';
import TournamentModule from './components/TournamentModule';
import Glossary from './components/Glossary';
import { 
  BookOpen, 
  Cpu, 
  Calculator, 
  Scale, 
  TrendingUp, 
  Menu, 
  X,
  ChevronRight,
  Info,
  Grid,
  Book,
  Layers,
  UserSearch,
  Trophy,
  Sigma
} from 'lucide-react';

// --- Navigation Data ---
const NAV_ITEMS: NavItem[] = [
  { id: SectionId.INTRO, label: 'Introduzione', icon: <BookOpen size={20} /> },
  { id: SectionId.RANGES, label: 'Range Preflop', icon: <Grid size={20} /> },
  { id: SectionId.POSTFLOP, label: 'Postflop & Board', icon: <Layers size={20} /> },
  { id: SectionId.MATH, label: 'Matematica & Odds', icon: <Sigma size={20} /> },
  { id: SectionId.OPPONENT, label: 'Opponent Profiler', icon: <UserSearch size={20} /> },
  { id: SectionId.TOURNAMENT, label: 'Torneo (ICM)', icon: <Trophy size={20} /> },
  { id: SectionId.SIMULATOR, label: 'Simulatore River', icon: <Calculator size={20} /> },
  { id: SectionId.GLOSSARY, label: 'Glossario', icon: <Book size={20} /> },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.INTRO);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case SectionId.INTRO:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 p-8 rounded-2xl border border-emerald-800 shadow-xl">
              <h1 className="text-4xl font-extrabold text-white mb-4">
                GTO nel Poker <span className="text-emerald-400">Masterclass</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                <strong className="text-white">Game Theory Optimal</strong> è la strategia di poker matematicamente perfetta. 
                Scopri come rendere il tuo gioco inattaccabile.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 mb-4">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Concetto Base</h3>
                <p className="text-slate-400 text-sm">
                  Giocare in modo che nessun avversario possa profittare dalle tue decisioni sul lungo periodo.
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 mb-4">
                  <Scale size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Equilibrio</h3>
                <p className="text-slate-400 text-sm">
                  Bilanciare bluff e value bet perfettamente per rendere l'avversario indifferente (Indifference Principle).
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 mb-4">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Non-Sfruttabile</h3>
                <p className="text-slate-400 text-sm">
                  Una strategia difensiva perfetta che garantisce di non perdere valore contro qualsiasi contro-strategia.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl border-l-4 border-poker-accent mt-8">
              <h3 className="text-xl font-semibold text-white mb-3">Definizione Formale</h3>
              <p className="text-slate-300 italic">
                "Il poker GTO si basa sulla teoria dei giochi. Significa giocare una strategia in equilibrio di Nash, 
                dove nessun giocatore può aumentare il proprio guadagno (EV) cambiando unilateralmente la propria strategia."
              </p>
            </div>
            
            <button 
              onClick={() => setActiveSection(SectionId.MECHANICS)}
              className="mt-8 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors group"
            >
              Inizia a Imparare <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );

      case SectionId.GLOSSARY:
        return <Glossary />;
      
      case SectionId.RANGES:
        return <PreflopModule />;

      case SectionId.POSTFLOP:
        return <PostflopModule />;

      case SectionId.MATH:
        return <MathModule />;

      case SectionId.OPPONENT:
        return <OpponentModule />;
      
      case SectionId.TOURNAMENT:
        return <TournamentModule />;

      case SectionId.SIMULATOR:
        return (
          <div className="space-y-6 animate-fade-in">
             <div className="border-b border-slate-700 pb-4">
               <h2 className="text-3xl font-bold text-white mb-2">Simulatore GTO River</h2>
               <p className="text-slate-400">
                 Calcola le frequenze ottimali per rendere indifferente il tuo avversario.
               </p>
             </div>
             <GtoSimulator />
          </div>
        );

      case SectionId.MECHANICS: // Keeping Mechanics but removed from main nav to simplify
      case SectionId.COMPARISON:
      case SectionId.STRATEGY:
         // Reusing existing content components if needed or routing to Comparison
         return (
           <div className="space-y-6 animate-fade-in">
             <div className="border-b border-slate-700 pb-4">
               <h2 className="text-3xl font-bold text-white mb-2">GTO vs Exploitative</h2>
               <p className="text-slate-400">
                 Due filosofie di gioco a confronto. Quale scegliere?
               </p>
             </div>
             <Comparison />
           </div>
        );

      default:
        return <Comparison />; // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-poker-bg text-poker-text font-sans selection:bg-emerald-500/30">
      
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <span className="text-xl font-bold text-white tracking-tight">GTO<span className="text-emerald-500">Poker</span></span>
        <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} className="text-slate-300">
          {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex max-w-7xl mx-auto min-h-screen">
        
        {/* Sidebar Navigation */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:block
          ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6">
            <div className="hidden lg:block text-2xl font-extrabold text-white mb-10 tracking-tight">
              GTO<span className="text-emerald-500">Poker</span>
            </div>
            <nav className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileNavOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeSection === item.id 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 bg-slate-900/90 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center">
              © 2024 GTO Masterclass<br/>Educational Purpose Only
            </p>
          </div>
        </aside>

        {/* Overlay for mobile nav */}
        {isMobileNavOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
             {renderContent()}
          </div>
        </main>

      </div>
    </div>
  );
};

export default App;