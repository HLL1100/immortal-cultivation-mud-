import { realms } from '@/data/realms';

export const getTotalRealmLevel = (realmId: string, realmLevel: number): number => {
  const realmOrder = realms.map(r => r.id);
  const index = realmOrder.indexOf(realmId);
  return index * 10 + realmLevel;
};

export const getRealmProgress = (realmId: string): number => {
  const realmOrder = realms.map(r => r.id);
  const index = realmOrder.indexOf(realmId);
  return ((index + 1) / realms.length) * 100;
};

export const getRarityColor = (rarity: string): string => {
  const colors: Record<string, string> = {
    common: 'text-gray-400',
    uncommon: 'text-green-400',
    rare: 'text-blue-400',
    epic: 'text-purple-400',
    legendary: 'text-yellow-400',
  };
  return colors[rarity] || 'text-gray-400';
};

export const getRarityBgColor = (rarity: string): string => {
  const colors: Record<string, string> = {
    common: 'bg-gray-700',
    uncommon: 'bg-green-900/30',
    rare: 'bg-blue-900/30',
    epic: 'bg-purple-900/30',
    legendary: 'bg-yellow-900/30',
  };
  return colors[rarity] || 'bg-gray-700';
};

export const getEffectTypeName = (type: string): string => {
  const names: Record<string, string> = {
    cultivationSpeed: '修炼速度',
    attack: '攻击力',
    defense: '防御力',
    miningSpeed: '挖矿速度',
    tribulationSuccess: '渡劫成功率',
    cultivation: '修为',
    spiritStone: '灵石',
  };
  return names[type] || type;
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};