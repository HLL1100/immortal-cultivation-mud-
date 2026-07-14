export interface Player {
  name: string;
  realm: string;
  realmLevel: number;
  cultivation: number;
  cultivationMax: number;
  spiritStone: number;
  attack: number;
  defense: number;
  miningLevel: number;
  miningExp: number;
  lastOnlineTime: number;
  totalMined: number;
}

export interface Realm {
  id: string;
  name: string;
  levels: number;
  cultivationPerLevel: number;
  tribulationRequired: boolean;
  tribulationSuccessRate: number;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  effectType: 'cultivationSpeed' | 'attack' | 'defense' | 'miningSpeed' | 'tribulationSuccess';
  effectValue: number;
  effectPerLevel: number;
  upgradeCost: number;
  upgradeCostMultiplier: number;
  description: string;
  unlocked: boolean;
  unlockRealm: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  stats: {
    attack?: number;
    defense?: number;
    cultivationSpeed?: number;
    tribulationSuccess?: number;
  };
  description: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'consumable' | 'material' | 'equipment';
  quantity: number;
  description: string;
  effect?: {
    type: 'cultivation' | 'spiritStone' | 'attack' | 'defense';
    value: number;
  };
  equipment?: Equipment;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  target: {
    type: 'realm' | 'mining' | 'skill';
    value: number;
  };
  rewards: {
    spiritStone?: number;
    cultivation?: number;
    item?: { id: string; quantity: number };
  };
  completed: boolean;
  claimed: boolean;
}

export interface MiningArea {
  id: string;
  name: string;
  level: number;
  baseYield: number;
  duration: number;
  unlockRealm: string;
  description: string;
}

export interface MiningTask {
  areaId: string;
  startTime: number;
  endTime: number;
  yield: number;
}

export interface GameLog {
  id: string;
  message: string;
  timestamp: number;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface OfflineReward {
  cultivation: number;
  spiritStone: number;
  timeAway: number;
}