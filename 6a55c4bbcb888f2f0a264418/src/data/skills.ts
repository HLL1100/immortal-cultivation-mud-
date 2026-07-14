import { Skill } from '@/types';

export const skills: Skill[] = [
  {
    id: 'basic-cultivation',
    name: '基础心法',
    level: 1,
    maxLevel: 10,
    effectType: 'cultivationSpeed',
    effectValue: 1,
    effectPerLevel: 0.1,
    upgradeCost: 100,
    upgradeCostMultiplier: 1.5,
    description: '修仙入门心法，提升修炼速度',
    unlocked: true,
    unlockRealm: 'qi-refining'
  },
  {
    id: 'iron-body',
    name: '铁布衫',
    level: 0,
    maxLevel: 10,
    effectType: 'defense',
    effectValue: 0,
    effectPerLevel: 5,
    upgradeCost: 200,
    upgradeCostMultiplier: 1.8,
    description: '锤炼肉身，提升防御',
    unlocked: false,
    unlockRealm: 'qi-refining'
  },
  {
    id: 'sharp-blade',
    name: '裂风诀',
    level: 0,
    maxLevel: 10,
    effectType: 'attack',
    effectValue: 0,
    effectPerLevel: 5,
    upgradeCost: 200,
    upgradeCostMultiplier: 1.8,
    description: '修炼剑诀，提升攻击',
    unlocked: false,
    unlockRealm: 'qi-refining'
  },
  {
    id: 'fast-mining',
    name: '挖矿术',
    level: 0,
    maxLevel: 10,
    effectType: 'miningSpeed',
    effectValue: 0,
    effectPerLevel: 0.1,
    upgradeCost: 150,
    upgradeCostMultiplier: 1.6,
    description: '提升挖矿速度和产量',
    unlocked: false,
    unlockRealm: 'qi-refining'
  },
  {
    id: 'tribulation-resistance',
    name: '渡劫秘法',
    level: 0,
    maxLevel: 10,
    effectType: 'tribulationSuccess',
    effectValue: 0,
    effectPerLevel: 2,
    upgradeCost: 500,
    upgradeCostMultiplier: 2.0,
    description: '增强渡劫成功率',
    unlocked: false,
    unlockRealm: 'foundation'
  },
  {
    id: 'advanced-cultivation',
    name: '天元诀',
    level: 0,
    maxLevel: 10,
    effectType: 'cultivationSpeed',
    effectValue: 0,
    effectPerLevel: 0.2,
    upgradeCost: 1000,
    upgradeCostMultiplier: 2.0,
    description: '高级修炼心法，大幅提升修炼速度',
    unlocked: false,
    unlockRealm: 'golden-core'
  },
  {
    id: 'soul-strengthening',
    name: '炼神术',
    level: 0,
    maxLevel: 10,
    effectType: 'attack',
    effectValue: 0,
    effectPerLevel: 15,
    upgradeCost: 2000,
    upgradeCostMultiplier: 2.2,
    description: '锤炼元神，攻击力暴涨',
    unlocked: false,
    unlockRealm: 'nascent-soul'
  }
];

export const getSkillById = (id: string): Skill | undefined => {
  return skills.find(s => s.id === id);
};

export const calculateSkillEffect = (skill: Skill): number => {
  return skill.effectValue + skill.effectPerLevel * skill.level;
};

export const calculateUpgradeCost = (skill: Skill): number => {
  return Math.floor(skill.upgradeCost * Math.pow(skill.upgradeCostMultiplier, skill.level));
};