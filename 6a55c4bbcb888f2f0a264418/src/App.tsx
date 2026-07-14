import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { BottomNav } from '@/components/BottomNav';
import { OfflineRewardModal } from '@/components/OfflineRewardModal';
import { HomePage } from '@/pages/HomePage';
import { MiningPage } from '@/pages/MiningPage';
import { InventoryPage } from '@/pages/InventoryPage';
import { SkillsPage } from '@/pages/SkillsPage';
import { TribulationPage } from '@/pages/TribulationPage';
import { TasksPage } from '@/pages/TasksPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { load, save, isCultivating, addCultivation, calculateCultivationSpeed } = useGameStore();

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      save();
    }, 30000);
    return () => clearInterval(saveInterval);
  }, [save]);

  useEffect(() => {
    if (!isCultivating) return;

    const speed = calculateCultivationSpeed();
    const interval = setInterval(() => {
      addCultivation(speed);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCultivating, addCultivation, calculateCultivationSpeed]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      save();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [save]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'mine':
        return <MiningPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'skills':
        return <SkillsPage />;
      case 'tribulation':
        return <TribulationPage />;
      case 'tasks':
        return <TasksPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-cultivation-dark">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
      </div>

      <header className="sticky top-0 bg-cultivation-dark/80 backdrop-blur border-b border-cultivation-gold/30 z-30">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">⚔️</span>
            <h1 className="text-xl font-bold text-cultivation-gold tracking-wider">
              修仙传
            </h1>
            <span className="text-2xl">🏮</span>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-4 pb-24">
        {renderPage()}
      </main>

      <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />

      <OfflineRewardModal />
    </div>
  );
}

export default App;