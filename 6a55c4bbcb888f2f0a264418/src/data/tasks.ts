import { Task } from '@/types';

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: '初入仙途',
    description: '达到炼气期3层',
    target: { type: 'realm', value: 3 },
    rewards: { spiritStone: 100, cultivation: 50 },
    completed: false,
    claimed: false
  },
  {
    id: 'task-2',
    title: '勤奋修炼',
    description: '达到筑基期',
    target: { type: 'realm', value: 11 },
    rewards: { spiritStone: 500, cultivation: 500 },
    completed: false,
    claimed: false
  },
  {
    id: 'task-3',
    title: '挖矿新手',
    description: '累计挖矿10次',
    target: { type: 'mining', value: 10 },
    rewards: { spiritStone: 200 },
    completed: false,
    claimed: false
  },
  {
    id: 'task-4',
    title: '挖矿达人',
    description: '累计挖矿100次',
    target: { type: 'mining', value: 100 },
    rewards: { spiritStone: 2000 },
    completed: false,
    claimed: false
  },
  {
    id: 'task-5',
    title: '功法入门',
    description: '将任意功法升至5级',
    target: { type: 'skill', value: 5 },
    rewards: { spiritStone: 500, cultivation: 200 },
    completed: false,
    claimed: false
  },
  {
    id: 'task-6',
    title: '金丹大道',
    description: '达到金丹期',
    target: { type: 'realm', value: 21 },
    rewards: { spiritStone: 5000, cultivation: 5000 },
    completed: false,
    claimed: false
  },
  {
    id: 'task-7',
    title: '元婴出世',
    description: '达到元婴期',
    target: { type: 'realm', value: 31 },
    rewards: { spiritStone: 20000, cultivation: 20000 },
    completed: false,
    claimed: false
  },
  {
    id: 'task-8',
    title: '挖矿大师',
    description: '累计挖矿1000次',
    target: { type: 'mining', value: 1000 },
    rewards: { spiritStone: 20000 },
    completed: false,
    claimed: false
  }
];

export const getTaskById = (id: string): Task | undefined => {
  return initialTasks.find(t => t.id === id);
};