import { Player, Skill, InventoryItem, Task, MiningTask } from '@/types';

interface SavedGame {
  player: Player;
  playerSkills: Skill[];
  inventory: InventoryItem[];
  tasks: Task[];
  miningTask: MiningTask | null;
}

const STORAGE_KEY = 'immortal_cultivation_save';

export const saveGame = (data: SavedGame): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};

export const loadGame = (): SavedGame | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load game:', error);
  }
  return null;
};

export const deleteGame = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return Math.floor(num).toString();
};

export const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}小时${minutes % 60}分钟`;
  }
  if (minutes > 0) {
    return `${minutes}分钟${seconds % 60}秒`;
  }
  return `${seconds}秒`;
};