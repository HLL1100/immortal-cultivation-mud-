import { Home, Pickaxe, Package, BookOpen, Zap, ScrollText } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const BottomNav = ({ currentPage, onPageChange }: BottomNavProps) => {
  const navItems = [
    { id: 'home', icon: Home, label: '修炼' },
    { id: 'mine', icon: Pickaxe, label: '挖矿' },
    { id: 'inventory', icon: Package, label: '背包' },
    { id: 'skills', icon: BookOpen, label: '功法' },
    { id: 'tribulation', icon: Zap, label: '渡劫' },
    { id: 'tasks', icon: ScrollText, label: '任务' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-cultivation-dark/95 backdrop-blur border-t border-cultivation-gold/30 z-40">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex flex-col items-center justify-center w-full h-full transition-all ${
                  isActive ? 'text-cultivation-gold' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon size={20} className={`transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs mt-1">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 w-12 h-0.5 bg-cultivation-gold rounded-t" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};