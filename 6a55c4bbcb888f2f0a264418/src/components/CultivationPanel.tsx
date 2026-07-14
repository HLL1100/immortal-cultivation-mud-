import { useGameStore } from '@/store/gameStore';
import { getRealmById, getNextRealm } from '@/data/realms';
import { formatNumber } from '@/utils/storage';
import { Play, Pause, Zap } from 'lucide-react';

export const CultivationPanel = () => {
  const {
    player,
    isCultivating,
    startCultivation,
    stopCultivation,
    tryBreakthrough,
    calculateCultivationSpeed,
    calculateTribulationSuccessRate,
    isTribulating,
    tribulationProgress,
  } = useGameStore();

  const currentRealm = getRealmById(player.realm);
  const nextRealm = getNextRealm(player.realm);
  const progress = (player.cultivation / player.cultivationMax) * 100;
  const speed = calculateCultivationSpeed();
  const canBreakthrough = player.realmLevel >= currentRealm?.levels && nextRealm;
  const tribulationRate = calculateTribulationSuccessRate();

  return (
    <div className="bg-cultivation-purple/50 rounded-xl p-6 border border-cultivation-gold/30">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-cultivation-gold mb-2">
          {currentRealm?.name}第{player.realmLevel}层
        </h2>
        <p className="text-cultivation-blue/80 text-sm">{currentRealm?.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-cultivation-gold">修为</span>
          <span className="text-white font-mono">
            {formatNumber(player.cultivation)} / {formatNumber(player.cultivationMax)}
          </span>
        </div>
        <div className="h-4 bg-cultivation-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cultivation-blue to-cultivation-gold transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="text-cultivation-gold/80 text-xs">
            修炼速度: {speed.toFixed(2)} 修为/秒
          </span>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={isCultivating ? stopCultivation : startCultivation}
          className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            isCultivating
              ? 'bg-cultivation-red/80 hover:bg-cultivation-red text-white'
              : 'bg-cultivation-green/80 hover:bg-cultivation-green text-white'
          }`}
          disabled={isTribulating}
        >
          {isCultivating ? (
            <>
              <Pause size={20} />
              停止修炼
            </>
          ) : (
            <>
              <Play size={20} />
              开始修炼
            </>
          )}
        </button>
      </div>

      {canBreakthrough && (
        <div className="bg-cultivation-dark/50 rounded-lg p-4 border border-cultivation-gold/50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-cultivation-gold font-bold">突破境界</span>
            <span className="text-cultivation-blue">{nextRealm?.name}</span>
          </div>
          {nextRealm?.tribulationRequired ? (
            <>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">渡劫成功率</span>
                <span className={`font-bold ${tribulationRate >= 50 ? 'text-green-400' : 'text-red-400'}`}>
                  {tribulationRate}%
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full transition-all duration-500 ${
                    tribulationRate >= 50 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${tribulationRate}%` }}
                />
              </div>
            </>
          ) : null}
          <button
            onClick={tryBreakthrough}
            className="w-full py-3 px-4 rounded-lg font-bold bg-gradient-to-r from-cultivation-gold-dark to-cultivation-gold text-cultivation-dark hover:from-cultivation-gold hover:to-yellow-300 transition-all duration-300 flex items-center justify-center gap-2"
            disabled={isTribulating}
          >
            <Zap size={20} />
            {nextRealm?.tribulationRequired ? '渡劫突破' : '突破'}
          </button>
        </div>
      )}
    </div>
  );
};