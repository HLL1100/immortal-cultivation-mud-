import { CultivationPanel } from '@/components/CultivationPanel';
import { StatusBar } from '@/components/StatusBar';
import { GameLog } from '@/components/GameLog';

export const HomePage = () => {
  return (
    <div className="space-y-6">
      <StatusBar />
      <CultivationPanel />
      <GameLog />
    </div>
  );
};