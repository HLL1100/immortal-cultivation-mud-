import { MiningArea } from '@/types';

export const miningAreas: MiningArea[] = [
  {
    id: 'novice-mine',
    name: '新手矿区',
    level: 1,
    baseYield: 10,
    duration: 10000,
    unlockRealm: 'qi-refining',
    description: '适合新手的安全矿区'
  },
  {
    id: 'stone-mine',
    name: '青石矿洞',
    level: 2,
    baseYield: 25,
    duration: 15000,
    unlockRealm: 'qi-refining',
    description: '蕴含少量灵石的普通矿洞'
  },
  {
    id: 'iron-mine',
    name: '铁矿脉',
    level: 3,
    baseYield: 50,
    duration: 20000,
    unlockRealm: 'foundation',
    description: '蕴含铁矿和灵石的矿脉'
  },
  {
    id: 'jade-mine',
    name: '翡翠矿坑',
    level: 4,
    baseYield: 100,
    duration: 30000,
    unlockRealm: 'foundation',
    description: '盛产翡翠和灵石的宝地'
  },
  {
    id: 'crystal-mine',
    name: '水晶矿洞',
    level: 5,
    baseYield: 200,
    duration: 45000,
    unlockRealm: 'golden-core',
    description: '蕴含大量灵石水晶的矿洞'
  },
  {
    id: 'spirit-mine',
    name: '灵脉矿源',
    level: 6,
    baseYield: 500,
    duration: 60000,
    unlockRealm: 'golden-core',
    description: '直接连接灵脉的矿源'
  },
  {
    id: 'immortal-mine',
    name: '仙矿秘境',
    level: 7,
    baseYield: 1000,
    duration: 90000,
    unlockRealm: 'nascent-soul',
    description: '传说中的仙矿秘境'
  },
  {
    id: 'celestial-mine',
    name: '天界矿场',
    level: 8,
    baseYield: 5000,
    duration: 120000,
    unlockRealm: 'celestial',
    description: '只有仙人才能开采的天界矿场'
  }
];

export const getMiningAreaById = (id: string): MiningArea | undefined => {
  return miningAreas.find(m => m.id === id);
};

export const getUnlockedMiningAreas = (realm: string): MiningArea[] => {
  const realmOrder = ['qi-refining', 'foundation', 'golden-core', 'nascent-soul', 'transformation', 'fusion', 'mahayana', 'immortal', 'celestial'];
  const currentIndex = realmOrder.indexOf(realm);
  return miningAreas.filter(m => {
    const unlockIndex = realmOrder.indexOf(m.unlockRealm);
    return unlockIndex <= currentIndex;
  });
};