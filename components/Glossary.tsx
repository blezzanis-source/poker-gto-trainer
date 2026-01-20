import React, { useState } from 'react';
import { Search, Book } from 'lucide-react';

interface Term {
  term: string;
  category: 'Concetti Base' | 'Preflop' | 'Postflop' | 'Matematica';
  definition: string;
  example?: string;
}

const TERMS: Term[] = [
  // Concetti Base
  {
    term: "GTO (Game Theory Optimal)",
    category: "Concetti Base",
    definition: "Una strategia di gioco difensiva perfetta che non può essere sfruttata dagli avversari. Si basa sull'equilibrio matematico.",
    example: "Se giochi GTO, un avversario non può vincere contro di te a lungo termine, ma tu potresti non vincere il massimo contro un avversario debole."
  },
  {
    term: "Range",
    category: "Concetti Base",
    definition: "L'insieme di tutte le possibili mani che un giocatore può avere in una determinata situazione.",
    example: "Non mettere l'avversario su una singola mano (es. Assi), ma su un range (es. Assi, Re, o AK)."
  },
  {
    term: "Exploitative",
    category: "Concetti Base",
    definition: "Una strategia che devia dal GTO per sfruttare gli errori o le debolezze specifiche di un avversario.",
    example: "Se l'avversario folda troppo spesso, una strategia Exploitative blufferebbe molto più del normale."
  },
  {
    term: "Nuts",
    category: "Concetti Base",
    definition: "La miglior mano possibile in un dato momento.",
    example: "Se il board è A-K-Q-J-10 dello stesso seme, la Scala Reale è il Nuts."
  },

  // Preflop
  {
    term: "RFI (Raise First In)",
    category: "Preflop",
    definition: "Essere il primo giocatore a rilanciare in un piatto in cui tutti gli altri prima hanno foldato.",
    example: "Sei sul bottone, tutti foldano fino a te, tu rilanci: questo è un RFI."
  },
  {
    term: "3-Bet",
    category: "Preflop",
    definition: "Il terzo rilancio in una sequenza di puntate. (Il Big Blind è il primo 'bet', l'Open Raise è il secondo, il rilancio successivo è la 3-Bet).",
    example: "Giocatore A apre a 2.5BB, Giocatore B rilancia a 9BB. Giocatore B ha effettuato una 3-Bet."
  },
  {
    term: "4-Bet",
    category: "Preflop",
    definition: "Rilanciare contro una 3-Bet.",
  },
  {
    term: "Cold Call",
    category: "Preflop",
    definition: "Chiamare un rilancio (o una 3-bet) senza aver investito denaro nel piatto precedentemente (es. non eri nei bui).",
  },
  {
    term: "Suited",
    category: "Preflop",
    definition: "Due carte dello stesso seme (cuori, quadri, fiori, picche). Indicate con una 's' (es. AKs).",
    example: "AKs ha circa il 2-3% di equity in più rispetto a AKo."
  },
  {
    term: "Offsuit",
    category: "Preflop",
    definition: "Due carte di semi diversi. Indicate con una 'o' (es. AKo).",
  },
  {
    term: "Connectors",
    category: "Preflop",
    definition: "Carte consecutive di valore (es. 9 e 8). Se dello stesso seme, si dicono 'Suited Connectors'.",
  },
  
  // Postflop
  {
    term: "C-Bet (Continuation Bet)",
    category: "Postflop",
    definition: "Una puntata fatta al flop dal giocatore che ha rilanciato preflop (l'aggressore originale).",
  },
  {
    term: "Donk Bet",
    category: "Postflop",
    definition: "Una puntata fatta al flop da un giocatore fuori posizione contro l'aggressore preflop, anticipando la sua azione.",
  },
  {
    term: "Value Bet",
    category: "Postflop",
    definition: "Puntare con una mano forte sperando di essere chiamati da una mano peggiore.",
  },
  {
    term: "Bluff",
    category: "Postflop",
    definition: "Puntare con una mano debole sperando che l'avversario foldi una mano migliore.",
  },

  // Matematica
  {
    term: "EV (Expected Value)",
    category: "Matematica",
    definition: "Il valore atteso. La somma media di denaro che ti aspetti di vincere o perdere con una certa giocata sul lungo periodo.",
    example: "Un call può avere EV positivo (+EV) o negativo (-EV)."
  },
  {
    term: "Equity",
    category: "Matematica",
    definition: "La percentuale di probabilità che la tua mano ha di vincere allo showdown contro il range avversario.",
    example: "AA contro KK ha circa l'80% di equity preflop."
  },
  {
    term: "Pot Odds",
    category: "Matematica",
    definition: "Il rapporto tra la dimensione del piatto e l'importo che devi chiamare. Ti dice quanta equity ti serve per chiamare in pareggio.",
  },
  {
    term: "MDF (Minimum Defense Frequency)",
    category: "Matematica",
    definition: "La frequenza minima con cui devi difendere (call o raise) contro una puntata per impedire all'avversario di fare profitto automatico bluffando.",
  },
];

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = TERMS.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by category
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    if (!acc[term.category]) acc[term.category] = [];
    acc[term.category].push(term);
    return acc;
  }, {} as Record<string, Term[]>);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-violet-500/20 rounded-lg text-violet-400">
            <Book size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Glossario del Poker</h1>
            <p className="text-slate-400">Dizionario dei termini tecnici per principianti e avanzati.</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text"
            placeholder="Cerca un termine (es. GTO, RFI, Equity)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid gap-8">
        {Object.keys(groupedTerms).length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            Nessun termine trovato per "{searchTerm}"
          </div>
        ) : (
          Object.entries(groupedTerms).map(([category, terms]) => (
            <div key={category} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-900/80 px-6 py-3 border-b border-slate-700">
                <h2 className="text-xl font-bold text-emerald-400">{category}</h2>
              </div>
              <div className="divide-y divide-slate-700/50">
                {terms.map((item, idx) => (
                  <div key={idx} className="p-6 hover:bg-slate-800/80 transition-colors">
                    <h3 className="text-lg font-bold text-white mb-2">{item.term}</h3>
                    <p className="text-slate-300 leading-relaxed mb-2">{item.definition}</p>
                    {item.example && (
                      <p className="text-sm text-slate-500 italic bg-slate-900/50 p-2 rounded border-l-2 border-violet-500">
                        <span className="font-semibold not-italic text-violet-400 mr-2">Esempio:</span> 
                        {item.example}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Glossary;