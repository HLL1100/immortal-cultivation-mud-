import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getMiningAreaById, getUnlockedMiningAreas } from '@/data/miningAreas';
import { formatNumber } from '@/utils/storage';
import { Pickaxe, Clock, Lock } from 'lucide-react';

export const MiningPage = () => {
  const { player, miningTask, startMining, completeMining, calculateTotalStats } = useGameStore();
  const [remainingTime, setRemainingTime] = useState(0);
  const [miningProgress, setMiningProgress] = useState(0);

  const unlockedAreas = getUnlockedMiningAreas(player.realm);
  const currentArea = miningTask ? getMiningAreaById(miningTask.areaId) : null;
  const stats = calculateTotalStats();

  useEffect(() => {
    if (!miningTask) {
      setRemainingTime(0);
      setMiningProgress(0);
      return;
    }

    const updateProgress = () => {
      const now = Date.now();
      const totalDuration = miningTask.endTime - miningTask.startTime;
      const elapsed = now - miningTask.startTime;
      const progress = Math.min((elapsed / totalDuration) * 100, 100);
      const remaining = Math.max(miningTask.endTime - now, 0);

      setMiningProgress(progress);
      setRemainingTime(remaining);

      if (remaining <= 0) {
        completeMining();
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, [miningTask, completeMining]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}分${seconds % 60}秒`;
    }
    return `${seconds}秒`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-cultivation-purple/50 rounded-xl p-6 border border-cultivation-gold/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center">
            <Pickaxe className="text-green-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-cultivation-gold">挖矿系统</h2>
            <p className="text-gray-400 text-sm">选择矿区挖掘灵石</p>
          </div>
        </div>

        {miningTask && currentArea && (
          <div className="bg-cultivation-dark/50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-cultivation-gold font-bold">{currentArea.name}</span>
              <span className="text-green-400">{formatTime(remainingTime)}</span>
            </div>
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-100"
                style={{ width: `${miningProgress}%` }}
              />
            </div>
            <div className="mt-2 text-center">
              <span className="text-cultivation-gold text-sm">
                预计获得: {formatNumber(miningTask.yield)} 灵石
              </span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {getUnlockedMiningAreas(player.realm).map((area) => {
            const skillBonus = 1 + stats.miningSpeed + player.miningLevel * 0.1;
            const expectedYield = Math.floor(area.baseYield * skillBonus);
            const duration = Math.floor(area.duration / (1 + stats.miningSpeed)) / 1000;
            const isUnlocked = unlockedAreas.find(a => a.id === area.id);

            return (
              <div
                key={area.id}
                className={`rounded-lg p-4 border transition-all ${
                  isUnlocked
                    ? 'bg-cultivation-dark/50 border-cultivation-gold/30 hover:border-cultivation-gold/60'
                    : 'bg-gray-800/30 border-gray-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-cultivation-gold font-bold">{area.name}</span>
                    <span className="text-xs text-gray-500">Lv.{area.level}</span>
                  </div>
                  {!isUnlocked && (
                    <Lock className="text-gray-500" size={16} />
                  )}
                </div>
                <p className="text-gray-400 text-xs mb-3">{area.description}</p>
                <div className="flex justify-between text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Pickaxe className="text-green-400" size={14} />
                    <span className="text-green-400">{formatNumber(expectedYield)} 灵石</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="text-gray-400" size={14} />
                    <span className="text-gray-400">{duration.toFixed(1)}秒</span>
                  </div>
                </div>
                <button
                  onClick={() => startMining(area.id)}
                  disabled={!isUnlocked || miningTask !== null}
                  className={`w-full py-2 px-4 rounded-lg font-bold text-sm transition-all ${
                    isUnlocked && !miningTask
                      ? 'bg-green-600 hover:bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {miningTask ? '挖矿中...' : isUnlocked ? '开始挖矿' : '未解锁'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-cultivation-purple/50 rounded-xl p-4 border border-cultivation-gold/30">
        <h3 className="text-cultivation-gold font-bold mb-3">挖矿统计</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-cultivation-dark/50 rounded-lg p-3">
            <div className="text-xs text-gray-400">挖矿等级</div>
            <div className="text-lg font-bold text-green-400">Lv.{player.miningLevel}</div>
          </div>
          <div className="bg-cultivation-dark/50 rounded-lg p-3">
            <div className="text-xs text-gray-400">挖矿次数</div>
            <div className="text-lg font-bold text-green-400">{player.totalMined}</div>
          </div>
        </div>
      </div>
    </div>
  );
};