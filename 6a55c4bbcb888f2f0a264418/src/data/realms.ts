import { Realm } from '@/types';

export const realms: Realm[] = [
  {
    id: 'qi-refining',
    name: '炼气期',
    levels: 10,
    cultivationPerLevel: 100,
    tribulationRequired: false,
    tribulationSuccessRate: 0,
    description: '修仙之路的起点，引气入体，淬炼经脉'
  },
  {
    id: 'foundation',
    name: '筑基期',
    levels: 10,
    cultivationPerLevel: 500,
    tribulationRequired: true,
    tribulationSuccessRate: 80,
    description: '打下坚实基础，寿元大增，可辟谷'
  },
  {
    id: 'golden-core',
    name: '金丹期',
    levels: 10,
    cultivationPerLevel: 2000,
    tribulationRequired: true,
    tribulationSuccessRate: 60,
    description: '凝聚金丹，长生不老，可御空飞行'
  },
  {
    id: 'nascent-soul',
    name: '元婴期',
    levels: 10,
    cultivationPerLevel: 10000,
    tribulationRequired: true,
    tribulationSuccessRate: 40,
    description: '元婴出窍，神游太虚，举手投足间毁天灭地'
  },
  {
    id: 'transformation',
    name: '化神期',
    levels: 10,
    cultivationPerLevel: 50000,
    tribulationRequired: true,
    tribulationSuccessRate: 25,
    description: '化神归虚，一念之间可移山填海'
  },
  {
    id: 'fusion',
    name: '合体期',
    levels: 10,
    cultivationPerLevel: 200000,
    tribulationRequired: true,
    tribulationSuccessRate: 15,
    description: '身与道合，超越凡人极限'
  },
  {
    id: 'mahayana',
    name: '大乘期',
    levels: 10,
    cultivationPerLevel: 1000000,
    tribulationRequired: true,
    tribulationSuccessRate: 10,
    description: '大乘圆满，距离飞升仅一步之遥'
  },
  {
    id: 'immortal',
    name: '渡劫期',
    levels: 1,
    cultivationPerLevel: 5000000,
    tribulationRequired: true,
    tribulationSuccessRate: 5,
    description: '最终考验，渡过便可飞升仙界'
  },
  {
    id: 'celestial',
    name: '仙人',
    levels: 10,
    cultivationPerLevel: 10000000,
    tribulationRequired: false,
    tribulationSuccessRate: 0,
    description: '飞升仙界，位列仙班'
  }
];

export const getRealmById = (id: string): Realm | undefined => {
  return realms.find(r => r.id === id);
};

export const getCurrentRealmIndex = (id: string): number => {
  return realms.findIndex(r => r.id === id);
};

export const getNextRealm = (id: string): Realm | undefined => {
  const index = getCurrentRealmIndex(id);
  if (index >= 0 && index < realms.length - 1) {
    return realms[index + 1];
  }
  return undefined;
};