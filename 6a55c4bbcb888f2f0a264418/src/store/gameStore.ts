import { create } from 'zustand';
import { Player, Skill, InventoryItem, Task, MiningTask, GameLog, OfflineReward } from '@/types';
import { realms, getRealmById, getNextRealm } from '@/data/realms';
import { skills, calculateSkillEffect, calculateUpgradeCost } from '@/data/skills';
import { initialTasks } from '@/data/tasks';
import { getMiningAreaById, getUnlockedMiningAreas } from '@/data/miningAreas';
import { saveGame, loadGame } from '@/utils/storage';
interface GameStore {
 player: Player;
 playerSkills: Skill[];
 inventory: InventoryItem[];
 tasks: Task[];
 miningTask: MiningTask | null;
 gameLogs: GameLog[];
 offlineReward: OfflineReward | null;
 isCultivating: boolean;
 isTribulating: boolean;
 tribulationProgress: number;
 addLog: (message: string, type?: GameLog['type']) => void;
 startCultivation: () => void;
 stopCultivation: () => void;
 addCultivation: (amount: number) => void;
 tryBreakthrough: () => void;
 startTribulation: () => void;
 completeTribulation: (success: boolean) => void;
 addSpiritStone: (amount: number) => void;
 upgradeSkill: (skillId: string) => boolean;
 unlockSkill: (skillId: string) => void;
 startMining: (areaId: string) => void;
 completeMining: () => void;
 addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
 useItem: (itemId: string) => boolean;
 claimTaskReward: (taskId: string) => boolean;
 checkTaskCompletion: () => void;
 calculateCultivationSpeed: () => number;
 calculateTribulationSuccessRate: () => number;
 calculateTotalStats: () => {
 attack: number;
 defense: number;
 cultivationSpeed: number;
 miningSpeed: number;
 };
 collectOfflineReward: () => void;
 save: () => void;
 load: () => void;
}
const createDefaultPlayer = (): Player => ({
 name: '无名修士',
 realm: 'qi-refining',
 realmLevel: 1,
 cultivation: 0,
 cultivationMax: 100,
 spiritStone: 100,
 attack: 10,
 defense: 10,
 miningLevel: 1,
 miningExp: 0,
 lastOnlineTime: Date.now(),
 totalMined: 0,
});
const createDefaultInventory = (): InventoryItem[] => ([
 {
 id: 'item-1',
 name: '灵石',
 type: 'consumable',
 quantity: 50,
 description: '蕴含天地灵气的矿石',
 effect: { type: 'cultivation', value: 100 },
 },
]);
export const useGameStore = create<GameStore>((set, get) => ({
 player: createDefaultPlayer(),
 playerSkills: skills.map(s => ({ ...s })),
 inventory: createDefaultInventory(),
 tasks: initialTasks.map(t => ({ ...t })),
 miningTask: null,
 gameLogs: [
 { id: 'log-1', message: '欢迎来到修仙世界！开始你的修行之旅吧！', timestamp: Date.now(), type: 'info' },
 ],
 offlineReward: null,
 isCultivating: true,
 isTribulating: false,
 tribulationProgress: 0,
 addLog: (message, type = 'info') => set(state => ({
 gameLogs: [...state.gameLogs.slice(-49), {
 id: `log-${Date.now()}`,
 message,
 timestamp: Date.now(),
 type,
 }],
 })),
 startCultivation: () => {
 set({ isCultivating: true });
 get().addLog('开始修炼...', 'info');
 },
 stopCultivation: () => {
 set({ isCultivating: false });
 get().addLog('停止修炼', 'info');
 },
 addCultivation: (amount) => set(state => {
 const { player, playerSkills } = state;
 let { cultivation, cultivationMax, realm, realmLevel } = player;
 const currentRealm = getRealmById(realm);
 const skillEffect = playerSkills
 .filter(s => s.effectType === 'cultivationSpeed' && s.level > 0)
 .reduce((sum, s) => sum + calculateSkillEffect(s), 0);
 const finalAmount = amount * skillEffect;
 cultivation += finalAmount;
 let logs: string[] = [];
 while (cultivation >= cultivationMax) {
 cultivation -= cultivationMax;
 if (realmLevel < currentRealm!.levels) {
 realmLevel++;
 logs.push(`恭喜！你突破到了${currentRealm!.name}第${realmLevel}层！`);
 }
 else {
 const nextRealm = getNextRealm(realm);
 if (nextRealm) {
 if (nextRealm.tribulationRequired) {
 logs.push(`你已达到${currentRealm!.name}圆满，需要渡劫才能进入${nextRealm.name}！`);
 cultivation = cultivationMax * 0.9;
 break;
 }
 else {
 realm = nextRealm.id;
 realmLevel = 1;
 logs.push(`恭喜！你突破到了${nextRealm.name}！`);
 }
 }
 else {
 logs.push('恭喜！你已达到最高境界！');
 cultivation = cultivationMax;
 break;
 }
 }
 const newRealm = getRealmById(realm);
 cultivationMax = newRealm!.cultivationPerLevel * realmLevel;
 }
 logs.forEach(log => get().addLog(log, 'success'));
 return {
 player: { ...player, cultivation, cultivationMax, realm, realmLevel },
 };
 }),
 tryBreakthrough: () => {
 const { player, playerSkills } = get();
 const currentRealm = getRealmById(player.realm);
 if (!currentRealm)
 return;
 if (player.realmLevel < currentRealm.levels) {
 get().addLog('还未达到当前境界圆满，无法突破！', 'warning');
 return;
 }
 const nextRealm = getNextRealm(player.realm);
 if (!nextRealm) {
 get().addLog('已经是最高境界了！', 'warning');
 return;
 }
 if (nextRealm.tribulationRequired) {
 get().addLog(`准备渡劫${nextRealm.name}...`, 'warning');
 get().startTribulation();
 }
 },
 startTribulation: () => {
 set({ isTribulating: true, tribulationProgress: 0 });
 get().addLog('渡劫开始！九天神雷降临！', 'warning');
 },
 completeTribulation: (success) => {
 const { player } = get();
 const currentRealm = getRealmById(player.realm);
 const nextRealm = getNextRealm(player.realm);
 if (!currentRealm || !nextRealm) {
 set({ isTribulating: false, tribulationProgress: 0 });
 return;
 }
 if (success) {
 get().addLog(`渡劫成功！恭喜你突破到${nextRealm.name}！`, 'success');
 set(state => ({
 isTribulating: false,
 tribulationProgress: 0,
 player: {
 ...state.player,
 realm: nextRealm.id,
 realmLevel: 1,
 cultivation: 0,
 cultivationMax: nextRealm.cultivationPerLevel,
 },
 }));
 get().checkTaskCompletion();
 }
 else {
 get().addLog('渡劫失败！修为受损...', 'error');
 set(state => ({
 isTribulating: false,
 tribulationProgress: 0,
 player: {
 ...state.player,
 cultivation: Math.max(0, state.player.cultivation * 0.5),
 },
 }));
 }
 },
 addSpiritStone: (amount) => set(state => ({
 player: { ...state.player, spiritStone: state.player.spiritStone + amount },
 })),
 upgradeSkill: (skillId) => {
 const { player, playerSkills } = get();
 const skill = playerSkills.find(s => s.id === skillId);
 if (!skill || !skill.unlocked)
 return false;
 if (skill.level >= skill.maxLevel) {
 get().addLog('功法已达到最高等级！', 'warning');
 return false;
 }
 const cost = calculateUpgradeCost(skill);
 if (player.spiritStone < cost) {
 get().addLog('灵石不足！', 'error');
 return false;
 }
 const newSkills = playerSkills.map(s => s.id === skillId ? { ...s, level: s.level + 1 } : s);
 set(state => ({
 player: { ...state.player, spiritStone: state.player.spiritStone - cost },
 playerSkills: newSkills,
 }));
 get().addLog(`${skill.name}升级到${skill.level + 1}级！`, 'success');
 get().checkTaskCompletion();
 return true;
 },
 unlockSkill: (skillId) => set(state => ({
 playerSkills: state.playerSkills.map(s => s.id === skillId ? { ...s, unlocked: true } : s),
 })),
 startMining: (areaId) => {
 const { player } = get();
 const area = getMiningAreaById(areaId);
 if (!area)
 return;
 const unlockedAreas = getUnlockedMiningAreas(player.realm);
 if (!unlockedAreas.find(a => a.id === areaId)) {
 get().addLog('该矿区尚未解锁！', 'warning');
 return;
 }
 if (get().miningTask) {
 get().addLog('正在挖矿中，请等待完成！', 'warning');
 return;
 }
 const skillEffect = get().playerSkills
 .filter(s => s.effectType === 'miningSpeed' && s.level > 0)
 .reduce((sum, s) => sum + calculateSkillEffect(s), 0);
 const yieldAmount = Math.floor(area.baseYield * (1 + skillEffect + player.miningLevel * 0.1));
 const duration = area.duration / (1 + skillEffect);
 set({
 miningTask: {
 areaId,
 startTime: Date.now(),
 endTime: Date.now() + duration,
 yield: yieldAmount,
 },
 });
 get().addLog(`开始在${area.name}挖矿...`, 'info');
 },
 completeMining: () => {
 const { miningTask, player } = get();
 if (!miningTask)
 return;
 const area = getMiningAreaById(miningTask.areaId);
 get().addSpiritStone(miningTask.yield);
 set(state => {
 const newExp = state.player.miningExp + 10;
 const levelUpExp = state.player.miningLevel * 100;
 let newLevel = state.player.miningLevel;
 if (newExp >= levelUpExp) {
 newLevel++;
 get().addLog(`挖矿等级提升到${newLevel}级！`, 'success');
 }
 return {
 miningTask: null,
 player: {
 ...state.player,
 miningExp: newExp % levelUpExp,
 miningLevel: newLevel,
 totalMined: state.player.totalMined + 1,
 },
 };
 });
 get().addLog(`挖矿完成！获得${miningTask.yield}灵石！`, 'success');
 get().checkTaskCompletion();
 },
 addInventoryItem: (item) => set(state => {
 const existingItem = state.inventory.find(i => i.name === item.name);
 if (existingItem) {
 return {
 inventory: state.inventory.map(i => i.name === item.name ? { ...i, quantity: i.quantity + item.quantity } : i),
 };
 }
 return {
 inventory: [...state.inventory, { ...item, id: `item-${Date.now()}` }],
 };
 }),
 useItem: (itemId) => {
 const { inventory, player } = get();
 const item = inventory.find(i => i.id === itemId);
 if (!item || item.quantity <= 0)
 return false;
 if (!item.effect) {
 get().addLog('该物品无法使用！', 'warning');
 return false;
 }
 set(state => ({
 inventory: state.inventory.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0),
 }));
 if (item.effect.type === 'cultivation') {
 get().addCultivation(item.effect.value);
 }
 else if (item.effect.type === 'spiritStone') {
 get().addSpiritStone(item.effect.value);
 }
 else if (item.effect.type === 'attack') {
 set(state => ({
 player: { ...state.player, attack: state.player.attack + item.effect.value },
 }));
 }
 else if (item.effect.type === 'defense') {
 set(state => ({
 player: { ...state.player, defense: state.player.defense + item.effect.value },
 }));
 }
 get().addLog(`使用了${item.name}！`, 'success');
 return true;
 },
 claimTaskReward: (taskId) => {
 const { tasks, player } = get();
 const task = tasks.find(t => t.id === taskId);
 if (!task || !task.completed || task.claimed)
 return false;
 if (task.rewards.spiritStone) {
 get().addSpiritStone(task.rewards.spiritStone);
 }
 if (task.rewards.cultivation) {
 get().addCultivation(task.rewards.cultivation);
 }
 if (task.rewards.item) {
 get().addInventoryItem({
 name: task.rewards.item.id,
 type: 'consumable',
 quantity: task.rewards.item.quantity,
 description: '任务奖励物品',
 });
 }
 set(state => ({
 tasks: state.tasks.map(t => t.id === taskId ? { ...t, claimed: true } : t),
 }));
 get().addLog(`领取了任务奖励：${task.title}！`, 'success');
 return true;
 },
 checkTaskCompletion: () => {
 const { player, tasks, playerSkills } = get();
 const realmOrder = realms.map(r => r.id);
 const currentRealmIndex = realmOrder.indexOf(player.realm);
 const totalRealmLevel = currentRealmIndex * 10 + player.realmLevel;
 const maxSkillLevel = Math.max(...playerSkills.map(s => s.level));
 set(state => ({
 tasks: state.tasks.map(task => {
 if (task.completed || task.claimed)
 return task;
 let completed = false;
 switch (task.target.type) {
 case 'realm':
 completed = totalRealmLevel >= task.target.value;
 break;
 case 'mining':
 completed = player.totalMined >= task.target.value;
 break;
 case 'skill':
 completed = maxSkillLevel >= task.target.value;
 break;
 }
 if (completed) {
 get().addLog(`任务完成：${task.title}！`, 'success');
 }
 return { ...task, completed };
 }),
 }));
 },
 calculateCultivationSpeed: () => {
 const { player, playerSkills } = get();
 const baseSpeed = 1;
 const realmMultiplier = 1 + (realms.findIndex(r => r.id === player.realm) * 0.5);
 const skillEffect = playerSkills
 .filter(s => s.effectType === 'cultivationSpeed' && s.level > 0)
 .reduce((sum, s) => sum + calculateSkillEffect(s), 0);
 return baseSpeed * realmMultiplier * skillEffect;
 },
 calculateTribulationSuccessRate: () => {
 const { player, playerSkills } = get();
 const currentRealm = getRealmById(player.realm);
 if (!currentRealm)
 return 0;
 const nextRealm = getNextRealm(player.realm);
 if (!nextRealm)
 return 0;
 const baseRate = nextRealm.tribulationSuccessRate;
 const skillBonus = playerSkills
 .filter(s => s.effectType === 'tribulationSuccess' && s.level > 0)
 .reduce((sum, s) => sum + calculateSkillEffect(s), 0);
 return Math.min(99, baseRate + skillBonus);
 },
 calculateTotalStats: () => {
 const { player, playerSkills } = get();
 const attack = player.attack + playerSkills
 .filter(s => s.effectType === 'attack' && s.level > 0)
 .reduce((sum, s) => sum + calculateSkillEffect(s), 0);
 const defense = player.defense + playerSkills
 .filter(s => s.effectType === 'defense' && s.level > 0)
 .reduce((sum, s) => sum + calculateSkillEffect(s), 0);
 const cultivationSpeed = playerSkills
 .filter(s => s.effectType === 'cultivationSpeed' && s.level > 0)
 .reduce((sum, s) => sum + calculateSkillEffect(s), 0);
 const miningSpeed = playerSkills
 .filter(s => s.effectType === 'miningSpeed' && s.level > 0)
 .reduce((sum, s) => sum + calculateSkillEffect(s), 0);
 return { attack, defense, cultivationSpeed, miningSpeed };
 },
 collectOfflineReward: () => {
 const { offlineReward } = get();
 if (!offlineReward)
 return;
 get().addCultivation(offlineReward.cultivation);
 get().addSpiritStone(offlineReward.spiritStone);
 get().addLog(`离线收益：${Math.floor(offlineReward.cultivation)}修为，${offlineReward.spiritStone}灵石`, 'success');
 set({ offlineReward: null });
 },
 save: () => {
 const state = get();
 saveGame({
 player: state.player,
 playerSkills: state.playerSkills,
 inventory: state.inventory,
 tasks: state.tasks,
 miningTask: state.miningTask,
 });
 },
 load: () => {
 const saved = loadGame();
 if (saved) {
 const offlineTime = Date.now() - saved.player.lastOnlineTime;
 const maxOfflineTime = 12 * 60 * 60 * 1000;
 const effectiveOfflineTime = Math.min(offlineTime, maxOfflineTime);
 if (effectiveOfflineTime > 60000) {
 const cultivationSpeed = 1 * (1 + realms.findIndex(r => r.id === saved.player.realm) * 0.5);
 const offlineCultivation = cultivationSpeed * (effectiveOfflineTime / 1000) * 0.5;
 const offlineSpiritStone = Math.floor(saved.player.miningLevel * (effectiveOfflineTime / 1000) * 0.3);
 set({
 offlineReward: {
 cultivation: offlineCultivation,
 spiritStone: offlineSpiritStone,
 timeAway: effectiveOfflineTime,
 },
 });
 }
 set(state => ({
 ...state,
 player: { ...saved.player, lastOnlineTime: Date.now() },
 playerSkills: saved.playerSkills,
 inventory: saved.inventory,
 tasks: saved.tasks,
 miningTask: saved.miningTask && saved.miningTask.endTime > Date.now()
 ? saved.miningTask
 : null,
 }));
 }
 },
}));
