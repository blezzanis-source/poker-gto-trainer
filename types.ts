import React from 'react';

export enum SectionId {
  INTRO = 'INTRO',
  MECHANICS = 'MECHANICS',
  RANGES = 'RANGES',
  POSTFLOP = 'POSTFLOP', // New
  MATH = 'MATH',         // New
  OPPONENT = 'OPPONENT', // New
  TOURNAMENT = 'TOURNAMENT', // New
  SIMULATOR = 'SIMULATOR',
  COMPARISON = 'COMPARISON',
  STRATEGY = 'STRATEGY',
  GLOSSARY = 'GLOSSARY'
}

export interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

export interface SimulationResult {
  potOdds: number;
  requiredEquity: number;
  optimalBluffFreq: number;
  optimalValueFreq: number;
}

export type Position = 'UTG' | 'MP' | 'CO' | 'BTN' | 'SB' | 'BB';
export type ActionType = 'RFI' | 'vs 3-Bet';

export interface HandCell {
  hand: string;
  type: 'pair' | 'suited' | 'offsuit';
  freq: number; // 0.0 to 1.0
}

export interface CardObj {
  rank: string;
  suit: string; // 's' | 'h' | 'd' | 'c'
}

export interface BoardAnalysis {
  texture: 'Dry' | 'Wet' | 'Dynamic' | 'Static';
  score: number; // 0-10 wetness
  description: string;
}

export interface PlayerStats {
  vpip: number;
  pfr: number;
  threeBet: number;
}

export interface PlayerProfile {
  type: 'Nit' | 'TAG' | 'LAG' | 'Fish/Station' | 'Maniac';
  description: string;
  exploit: string[];
}