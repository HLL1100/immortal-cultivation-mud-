import { useGameStore } from '@/store/gameStore';
import { formatNumber } from '@/utils/storage';
import { Sword, Shield, Gem, Pickaxe } from 'lucide-react';

export const StatusBar = () => {
  const { player, calculateTotalStats } = useGameStore();
  const stats = calculateTotalStats();

  return (
    <div className="bg-cultivation-purple/50 rounded-xl p-4 border border-cultivation-gold/30">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cultivation-gold/20 flex items-center justify-center">
            <Gem className="text-cultivation-gold" size={16} />
          </div>
          <div>
            <div className="text-xs text-gray-400">灵石</div>
            <div className="text-sm font-bold text-cultivation-gold font-mono">
              {formatNumber(player.spiritStone)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center">
            <Sword className="text-red-400" size={16} />
          </div>
          <div>
            <div className="text-xs text-gray-400">攻击力</div>
            <div className="text-sm font-bold text-red-400 font-mono">
              {formatNumber(stats.attack)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
            <Shield className="text-blue-400" size={16} />
          </div>
          <div>
            <div className="text-xs text-gray-400">防御力</div>
            <div className="text-sm font-bold text-blue-400 font-mono">
              {formatNumber(stats.defense)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center">
            <Pickaxe className="text-green-400" size={16} />
          </div>
          <div>
            <div className="text-xs text-gray-400">挖矿等级</div>
            <div className="text-sm font-bold text-green-400 font-mono">
              Lv.{player.miningLevel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};