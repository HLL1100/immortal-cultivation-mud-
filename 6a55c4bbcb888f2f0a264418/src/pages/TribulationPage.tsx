import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { getRealmById, getNextRealm } from '@/data/realms';
import { formatNumber } from '@/utils/storage';
import { Zap, AlertTriangle } from 'lucide-react';

export const TribulationPage = () => {
  const { player, isTribulating, tribulationProgress, calculateTribulationSuccessRate, addLog, completeTribulation } = useGameStore();
  const [lightningStrikes, setLightningStrikes] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentRealm = getRealmById(player.realm);
  const nextRealm = getNextRealm(player.realm);
  const successRate = calculateTribulationSuccessRate();

  useEffect(() => {
    if (!isTribulating) {
      setLightningStrikes(0);
      setIsAnimating(false);
      return;
    }

    const duration = 5000;
    const startTime = Date.now();
    const totalStrikes = 9;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      const strikes = Math.floor((progress / 100) * totalStrikes);
      if (strikes > lightningStrikes) {
        setLightningStrikes(strikes);
        setIsAnimating(true);
        addLog(`⚡ 第${strikes}道劫雷降临！`, 'warning');
        setTimeout(() => setIsAnimating(false), 300);
      }

      if (progress >= 100) {
        clearInterval(interval);
        const success = Math.random() * 100 < successRate;
        completeTribulation(success);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isTribulating, lightningStrikes, successRate, addLog, completeTribulation]);

  const canTribulate = currentRealm && nextRealm && player.realmLevel >= currentRealm.levels && nextRealm.tribulationRequired;

  return (
    <div className="space-y-6">
      <div className={`bg-cultivation-purple/50 rounded-xl p-6 border transition-all ${isTribulating ? 'border-cultivation-gold animate-pulse' : 'border-cultivation-gold/30'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center">
            <Zap className="text-red-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-cultivation-gold">渡劫系统</h2>
            <p className="text-gray-400 text-sm">突破大境界必须渡过天劫</p>
          </div>
        </div>

        {!isTribulating ? (
          <>
            {canTribulate ? (
              <div className="bg-cultivation-dark/50 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-cultivation-gold font-bold text-lg mb-2">
                    准备渡劫 {nextRealm?.name}
                  </div>
                  <p className="text-gray-400 text-sm">{currentRealm?.description}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">渡劫成功率</span>
                    <span className={`font-bold ${successRate >= 50 ? 'text-green-400' : 'text-red-400'}`}>
                      {successRate}%
                    </span>
                  </div>
                  <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${successRate >= 50 ? 'bg-gradient-to-r from-green-600 to-green-400' : 'bg-gradient-to-r from-red-600 to-red-400'}`}
                      style={{ width: `${successRate}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    addLog('渡劫开始！九天神雷降临！', 'warning');
                  }}
                  className="w-full py-3 px-4 rounded-lg font-bold bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-500 hover:to-orange-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Zap size={20} />
                  开始渡劫
                </button>

                <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/50">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-yellow-500 flex-shrink-0" size={16} />
                    <div className="text-sm">
                      <span className="text-yellow-500 font-bold">警告：</span>
                      <span className="text-gray-400">
                        渡劫失败将损失50%当前修为！建议提升渡劫秘法等级或等待更高成功率。
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">当前境界</div>
                <div className="text-cultivation-gold font-bold text-xl">
                  {currentRealm?.name}第{player.realmLevel}层
                </div>
                {nextRealm && player.realmLevel < currentRealm?.levels && (
                  <div className="text-gray-400 text-sm mt-2">
                    需要达到{currentRealm?.name}圆满才能渡劫
                  </div>
                )}
                {!nextRealm && (
                  <div className="text-cultivation-gold text-sm mt-2">
                    已达到最高境界！
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="bg-gradient-to-b from-red-900/30 to-cultivation-dark/50 rounded-lg p-6 text-center">
            <div className={`text-4xl mb-4 ${isAnimating ? 'animate-shake' : ''}`}>⚡⚡⚡</div>
            <h3 className="text-xl font-bold text-red-400 mb-2">渡劫进行中</h3>
            <p className="text-gray-400 mb-4">正在承受九天神雷...</p>
            
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i < lightningStrikes ? 'bg-red-500 animate-pulse' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mx-auto w-3/4">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-red-500 transition-all duration-100"
                style={{ width: `${tribulationProgress}%` }}
              />
            </div>
            <div className="text-cultivation-gold text-sm mt-2">
              第{lightningStrikes}/9道劫雷
            </div>
          </div>
        )}
      </div>

      <div className="bg-cultivation-purple/50 rounded-xl p-4 border border-cultivation-gold/30">
        <h3 className="text-cultivation-gold font-bold mb-3">渡劫技巧</h3>
        <ul className="text-sm text-gray-400 space-y-2">
          <li>• 提升"渡劫秘法"功法等级可增加成功率</li>
          <li>• 高级矿区可能产出渡劫辅助物品</li>
          <li>• 渡劫失败会损失50%当前修为</li>
          <li>• 每次渡劫消耗大量灵气</li>
        </ul>
      </div>
    </div>
  );
};