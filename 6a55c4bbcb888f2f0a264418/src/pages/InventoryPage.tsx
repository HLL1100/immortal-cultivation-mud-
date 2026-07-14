import { useGameStore } from '@/store/gameStore';
import { formatNumber } from '@/utils/storage';
import { getEffectTypeName } from '@/utils/helpers';
import { Package, ChevronRight } from 'lucide-react';

export const InventoryPage = () => {
  const { inventory, useItem } = useGameStore();

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'consumable': return 'text-blue-400';
      case 'material': return 'text-green-400';
      case 'equipment': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getItemTypeName = (type: string) => {
    switch (type) {
      case 'consumable': return '消耗品';
      case 'material': return '材料';
      case 'equipment': return '装备';
      default: return '未知';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-cultivation-purple/50 rounded-xl p-6 border border-cultivation-gold/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center">
            <Package className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-cultivation-gold">背包</h2>
            <p className="text-gray-400 text-sm">管理你的物品</p>
          </div>
        </div>

        {inventory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            背包是空的
          </div>
        ) : (
          <div className="space-y-3">
            {inventory.map((item) => (
              <div
                key={item.id}
                className="bg-cultivation-dark/50 rounded-lg p-4 border border-cultivation-gold/30"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-white font-bold">{item.name}</span>
                    <span className={`ml-2 text-xs ${getItemTypeColor(item.type)}`}>
                      {getItemTypeName(item.type)}
                    </span>
                  </div>
                  <span className="text-cultivation-gold font-bold">x{item.quantity}</span>
                </div>
                <p className="text-gray-400 text-xs mb-3">{item.description}</p>
                {item.effect && (
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-400">效果: </span>
                      <span className="text-green-400">
                        {getEffectTypeName(item.effect.type)} +{item.effect.value}
                      </span>
                    </div>
                    <button
                      onClick={() => useItem(item.id)}
                      className="flex items-center gap-1 px-3 py-1 rounded bg-cultivation-gold/20 text-cultivation-gold text-sm hover:bg-cultivation-gold/30 transition-all"
                    >
                      使用 <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};