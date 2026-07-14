import { useGameStore } from '@/store/gameStore';
import { calculateSkillEffect, calculateUpgradeCost } from '@/data/skills';
import { getRealmById } from '@/data/realms';
import { formatNumber } from '@/utils/storage';
import { getEffectTypeName } from '@/utils/helpers';
import { BookOpen, ChevronRight, Lock } from 'lucide-react';

export const SkillsPage = () => {
  const { player, playerSkills, upgradeSkill, unlockSkill } = useGameStore();

  const handleUpgrade = (skillId: string) => {
    const skill = playerSkills.find(s => s.id === skillId);
    if (!skill) return;
    
    if (!skill.unlocked) {
      const unlockRealm = getRealmById(skill.unlockRealm);
      if (unlockRealm) {
        unlockSkill(skillId);
      }
      return;
    }
    
    upgradeSkill(skillId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-cultivation-purple/50 rounded-xl p-6 border border-cultivation-gold/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center">
            <BookOpen className="text-purple-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-cultivation-gold">功法</h2>
            <p className="text-gray-400 text-sm">学习和升级功法提升实力</p>
          </div>
        </div>

        <div className="space-y-3">
          {playerSkills.map((skill) => {
            const effect = calculateSkillEffect(skill);
            const upgradeCost = calculateUpgradeCost(skill);
            const isMaxLevel = skill.level >= skill.maxLevel;
            const canAfford = player.spiritStone >= upgradeCost;
            
            return (
              <div
                key={skill.id}
                className={`rounded-lg p-4 border transition-all ${
                  skill.unlocked
                    ? 'bg-cultivation-dark/50 border-cultivation-gold/30 hover:border-cultivation-gold/60'
                    : 'bg-gray-800/30 border-gray-700'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{skill.name}</span>
                    <span className="text-xs text-cultivation-gold">
                      Lv.{skill.level}/{skill.maxLevel}
                    </span>
                  </div>
                  {!skill.unlocked && (
                    <Lock className="text-gray-500" size={16} />
                  )}
                </div>
                <p className="text-gray-400 text-xs mb-3">{skill.description}</p>
                
                {skill.unlocked ? (
                  <>
                    <div className="flex justify-between text-sm mb-3">
                      <div>
                        <span className="text-gray-400">当前效果: </span>
                        <span className="text-green-400">
                          {getEffectTypeName(skill.effectType)} +{(effect * 100).toFixed(0)}%
                        </span>
                      </div>
                      {!isMaxLevel && (
                        <div className="text-cultivation-gold">
                          升级消耗: {formatNumber(upgradeCost)} 灵石
                        </div>
                      )}
                    </div>
                    {isMaxLevel ? (
                      <div className="text-center py-2 text-yellow-400 text-sm font-bold">
                        已达最高等级
                      </div>
                    ) : (
                      <button
                        onClick={() => handleUpgrade(skill.id)}
                        disabled={!canAfford}
                        className={`w-full py-2 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                          canAfford
                            ? 'bg-purple-600 hover:bg-purple-500 text-white'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        升级 <ChevronRight size={14} />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      需要达到 {getRealmById(skill.unlockRealm)?.name} 解锁
                    </span>
                    <button
                      onClick={() => handleUpgrade(skill.id)}
                      className="px-3 py-1 rounded bg-gray-700 text-gray-500 text-sm cursor-not-allowed"
                      disabled
                    >
                      未解锁
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};