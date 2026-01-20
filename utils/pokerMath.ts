import { SimulationResult, Position, ActionType, HandCell, CardObj, BoardAnalysis, PlayerStats, PlayerProfile } from '../types';

export const calculateGtoFrequencies = (pot: number, bet: number): SimulationResult => {
  const callAmount = bet;
  const totalPotAfterBet = pot + bet;
  const totalPotAfterCall = totalPotAfterBet + callAmount;

  const requiredEquity = callAmount / totalPotAfterCall;
  const optimalBluffFreq = requiredEquity;
  const optimalValueFreq = 1 - optimalBluffFreq;

  return {
    potOdds: requiredEquity,
    requiredEquity,
    optimalBluffFreq,
    optimalValueFreq
  };
};

export const formatPercent = (val: number): string => {
  return `${(val * 100).toFixed(1)}%`;
};

export const formatCurrency = (val: number): string => {
  return `€${val.toLocaleString()}`;
};

// --- Preflop Range Logic ---

const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

// Helper to determine if a specific hand is in a theoretical range based on heuristic GTO logic
const getFrequency = (rank1: string, rank2: string, suited: boolean, pos: Position, action: ActionType): number => {
  const r1Idx = RANKS.indexOf(rank1);
  const r2Idx = RANKS.indexOf(rank2);
  const isPair = rank1 === rank2;
  
  const score = Math.min(r1Idx, r2Idx) * 10 + Math.max(r1Idx, r2Idx) + (suited || isPair ? 0 : 20);
  let tightness = 0;
  
  if (action === 'RFI') {
    switch (pos) {
      case 'UTG': tightness = 40; break;
      case 'MP': tightness = 55; break;
      case 'CO': tightness = 75; break;
      case 'BTN': tightness = 110; break;
      case 'SB': tightness = 90; break;
      case 'BB': return 0;
    }
  } else if (action === 'vs 3-Bet') {
    switch (pos) {
      case 'UTG': tightness = 20; break;
      case 'MP': tightness = 25; break;
      case 'CO': tightness = 30; break;
      case 'BTN': tightness = 35; break;
      case 'SB': tightness = 20; break;
      case 'BB': tightness = 30; break;
    }
  }

  if (isPair) {
    if (action === 'RFI') {
       if (pos === 'UTG' && r1Idx <= RANKS.indexOf('6')) return 1;
       if (pos === 'BTN') return 1;
       return score < tightness ? 1 : 0;
    }
    if (r1Idx <= RANKS.indexOf('9')) return 1;
    if (pos === 'BTN' && r1Idx <= RANKS.indexOf('2')) return 0.5;
    return 0;
  }

  if (suited && Math.abs(r1Idx - r2Idx) === 1) {
    if (action === 'RFI' && pos !== 'UTG') return 1;
    if (action === 'vs 3-Bet' && pos === 'BTN' && r1Idx < 8) return 0.5;
  }

  if (suited && rank1 === 'A') {
    if (action === 'RFI') {
      if (pos === 'UTG' && r2Idx > RANKS.indexOf('T')) return 0;
      return 1;
    }
  }

  if (score < tightness) return 1;
  if (score < tightness + 10) return 0.5;
  return 0;
};

export const generateRangeGrid = (pos: Position, action: ActionType): HandCell[][] => {
  const grid: HandCell[][] = [];

  for (let i = 0; i < RANKS.length; i++) {
    const row: HandCell[] = [];
    for (let j = 0; j < RANKS.length; j++) {
      const rank1 = RANKS[i];
      const rank2 = RANKS[j];
      
      let handStr = '';
      let type: 'pair' | 'suited' | 'offsuit' = 'offsuit';
      
      if (i === j) {
        handStr = `${rank1}${rank2}`;
        type = 'pair';
      } else if (i < j) {
        handStr = `${rank1}${rank2}s`;
        type = 'suited';
      } else {
        handStr = `${rank2}${rank1}o`;
        type = 'offsuit';
      }

      const r1 = i < j ? rank1 : rank2;
      const r2 = i < j ? rank2 : rank1;
      const isSuited = i < j;
      const freq = getFrequency(r1, r2, isSuited, pos, action);

      row.push({
        hand: handStr,
        type,
        freq
      });
    }
    grid.push(row);
  }
  return grid;
};

export const calculateStats = (grid: HandCell[][]) => {
  let totalCombos = 0;
  let playedCombos = 0;

  grid.forEach(row => {
    row.forEach(cell => {
      let combos = 0;
      if (cell.type === 'pair') combos = 6;
      else if (cell.type === 'suited') combos = 4;
      else combos = 12;

      totalCombos += combos;
      playedCombos += combos * cell.freq;
    });
  });

  return {
    combos: Math.round(playedCombos),
    percentage: (playedCombos / 1326) * 100
  };
};

// --- Board Analysis Logic ---

export const analyzeBoard = (cards: CardObj[]): BoardAnalysis => {
  if (cards.length < 3) return { texture: 'Dry', score: 0, description: 'Inserisci le carte del flop' };

  let score = 0;
  const suits = cards.map(c => c.suit);
  const ranks = cards.map(c => RANKS.indexOf(c.rank)); // 0 is Ace, 12 is 2

  // Check Suits
  const suitCounts: Record<string, number> = {};
  suits.forEach(s => suitCounts[s] = (suitCounts[s] || 0) + 1);
  const maxSuits = Math.max(...Object.values(suitCounts));
  
  if (maxSuits >= 3) score += 4; // Monotone
  else if (maxSuits === 2) score += 2; // Two-tone

  // Check Connectedness (simplified)
  const sortedRanks = [...ranks].sort((a, b) => a - b);
  const gaps = [];
  for(let i = 0; i < sortedRanks.length - 1; i++) {
    gaps.push(sortedRanks[i+1] - sortedRanks[i]);
  }
  
  const connectedCount = gaps.filter(g => g === 1).length;
  const gapCount = gaps.filter(g => g === 2).length;

  if (connectedCount >= 2) score += 4; // e.g., 7-8-9
  else if (connectedCount === 1) score += 2;
  else if (gapCount >= 2) score += 1;

  // Check High Cards
  const highCards = ranks.filter(r => r <= 3).length; // A, K, Q, J
  
  // Classification
  let texture: BoardAnalysis['texture'] = 'Dry';
  let desc = '';

  if (score >= 6) {
    texture = 'Wet';
    desc = 'Board molto coordinato. Molti draw possibili. Il vantaggio del nuts cambia spesso al turn.';
  } else if (score >= 4) {
    texture = 'Dynamic';
    desc = 'Alcuni draw presenti. Richiede protezione ma permette bluff con equity.';
  } else if (highCards >= 2 && score < 3) {
    texture = 'Static';
    desc = 'Board disconnesso con carte alte. Difficile che le mani cambino valore. C-bet frequente.';
  } else {
    texture = 'Dry';
    desc = 'Board arido. Poche possibilità di scale o colori. Ottimo per bluffare con air.';
  }

  return { texture, score, description: desc };
};

// --- Player Profiling Logic ---

export const analyzeOpponent = (stats: PlayerStats): PlayerProfile => {
  const { vpip, pfr } = stats;

  if (vpip > 40 && pfr < 15) {
    return {
      type: 'Fish/Station',
      description: 'Gioca troppe mani passivamente. Chiama con qualsiasi cosa.',
      exploit: ['Value bettate enormi', 'MAI bluffare', 'Gioca solo mani forti']
    };
  }
  if (vpip > 35 && pfr > 25) {
    return {
      type: 'Maniac',
      description: 'Aggressivo senza logica. Betta e raisa costantemente.',
      exploit: ['Lascialo bluffare (trap)', 'Chiama (Call down) più leggero', 'Aspetta il nuts']
    };
  }
  if (vpip < 15) {
    return {
      type: 'Nit',
      description: 'Gioca solo le carte migliori (top 10-15%).',
      exploit: ['Ruba i suoi bui sempre', 'Folda se mostra aggressività', 'Over-fold al river']
    };
  }
  if (vpip >= 25 && vpip <= 35 && pfr >= 20) {
    return {
      type: 'LAG',
      description: 'Loose Aggressive. Gioca molte mani in modo aggressivo ma competente.',
      exploit: ['4-betta light', 'Chiama le C-bet se hai equity', 'Attacca i suoi check']
    };
  }
  
  // Default fallback (TAGish or generic)
  return {
    type: 'TAG',
    description: 'Tight Aggressive. Lo stile standard dei regolari.',
    exploit: ['Bilanciamento necessario', 'Cerca leak specifici postflop', 'Non regaali chips']
  };
};