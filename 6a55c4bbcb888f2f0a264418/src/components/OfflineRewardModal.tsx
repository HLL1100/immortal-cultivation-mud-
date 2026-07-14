import { useGameStore } from '@/store/gameStore';
import { formatNumber, formatTime } from '@/utils/storage';
import { Gift } from 'lucide-react';

export const OfflineRewardModal = () => {
  const { offlineReward, collectOfflineReward } = useGameStore();

  if (!offlineReward) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-cultivation-purple rounded-xl p-6 border-2 border-cultivation-gold max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cultivation-gold/20 flex items-center justify-center">
            <Gift className="text-cultivation-gold" size={32} />
          </div>
          <h2 className="text-xl font-bold text-cultivation-gold mb-2">离线收益</h2>
          <p className="text-gray-400">您离开了 {formatTime(offlineReward.timeAway)}</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center bg-cultivation-dark/50 rounded-lg p-3">
            <span className="text-cultivation-blue">修为</span>
            <span className="text-cultivation-gold font-bold font-mono">
              +{formatNumber(offlineReward.cultivation)}
            </span>
          </div>
          <div className="flex justify-between items-center bg-cultivation-dark/50 rounded-lg p-3">
            <span className="text-cultivation-gold">灵石</span>
            <span className="text-cultivation-gold font-bold font-mono">
              +{formatNumber(offlineReward.spiritStone)}
            </span>
          </div>
        </div>

        <button
          onClick={collectOfflineReward}
          className="w-full py-3 px-4 rounded-lg font-bold bg-gradient-to-r from-cultivation-gold-dark to-cultivation-gold text-cultivation-dark hover:from-cultivation-gold hover:to-yellow-300 transition-all duration-300"
        >
          领取收益
        </button>
      </div>
    </div>
  );
};