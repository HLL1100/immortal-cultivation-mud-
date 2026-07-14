import { useGameStore } from '@/store/gameStore';
import { formatNumber } from '@/utils/storage';
import { getEffectTypeName } from '@/utils/helpers';
import { ScrollText, Check, ChevronRight, Gift } from 'lucide-react';

export const TasksPage = () => {
  const { player, tasks, claimTaskReward } = useGameStore();

  const getTargetProgress = (task: typeof tasks[0]) => {
    switch (task.target.type) {
      case 'realm':
        return Math.min(task.target.value, player.realmLevel);
      case 'mining':
        return Math.min(task.target.value, player.totalMined);
      case 'skill':
        return Math.min(task.target.value, 0);
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-cultivation-purple/50 rounded-xl p-6 border border-cultivation-gold/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-yellow-900/30 flex items-center justify-center">
            <ScrollText className="text-yellow-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-cultivation-gold">任务系统</h2>
            <p className="text-gray-400 text-sm">完成任务获取丰厚奖励</p>
          </div>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => {
            const progress = getTargetProgress(task);
            const progressPercent = (progress / task.target.value) * 100;
            
            return (
              <div
                key={task.id}
                className={`rounded-lg p-4 border transition-all ${
                  task.completed && !task.claimed
                    ? 'bg-green-900/20 border-green-500/50'
                    : task.claimed
                    ? 'bg-gray-800/30 border-gray-700'
                    : 'bg-cultivation-dark/50 border-cultivation-gold/30'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {task.completed && (
                      <Check className="text-green-400" size={16} />
                    )}
                    <span className={`font-bold ${task.claimed ? 'text-gray-500' : 'text-white'}`}>
                      {task.title}
                    </span>
                  </div>
                  {task.completed && !task.claimed && (
                    <Gift className="text-green-400 animate-pulse" size={16} />
                  )}
                </div>
                <p className={`text-xs mb-3 ${task.claimed ? 'text-gray-600' : 'text-gray-400'}`}>
                  {task.description}
                </p>
                
                {!task.completed && !task.claimed && (
                  <>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">进度</span>
                      <span className="text-cultivation-gold">
                        {progress}/{task.target.value}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-cultivation-blue to-cultivation-gold transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  {task.rewards.spiritStone && (
                    <span className="px-2 py-1 rounded bg-cultivation-gold/20 text-cultivation-gold text-xs">
                      {formatNumber(task.rewards.spiritStone)} 灵石
                    </span>
                  )}
                  {task.rewards.cultivation && (
                    <span className="px-2 py-1 rounded bg-cultivation-blue/20 text-cultivation-blue text-xs">
                      {formatNumber(task.rewards.cultivation)} 修为
                    </span>
                  )}
                  {task.rewards.item && (
                    <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-xs">
                      物品奖励
                    </span>
                  )}
                </div>

                <button
                  onClick={() => claimTaskReward(task.id)}
                  disabled={!task.completed || task.claimed}
                  className={`w-full py-2 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    task.completed && !task.claimed
                      ? 'bg-green-600 hover:bg-green-500 text-white'
                      : task.claimed
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {task.claimed ? (
                    '已领取'
                  ) : task.completed ? (
                    <>领取奖励 <ChevronRight size={14} /></>
                  ) : (
                    '进行中'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-cultivation-purple/50 rounded-xl p-4 border border-cultivation-gold/30">
        <h3 className="text-cultivation-gold font-bold mb-3">任务说明</h3>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>• 任务会自动跟踪进度</li>
          <li>• 完成后可立即领取奖励</li>
          <li>• 奖励包括灵石、修为和物品</li>
          <li>• 高级任务需要达到特定境界</li>
        </ul>
      </div>
    </div>
  );
};