import { useGameStore } from '@/store/gameStore';

export const GameLog = () => {
  const { gameLogs } = useGameStore();

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-cultivation-purple/50 rounded-xl p-4 border border-cultivation-gold/30">
      <h3 className="text-cultivation-gold font-bold mb-3">系统日志</h3>
      <div className="h-32 overflow-y-auto space-y-1 text-sm font-mono">
        {gameLogs.slice(-20).map((log) => (
          <div key={log.id} className={`${getLogColor(log.type)} animate-fade-in`}>
            [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};