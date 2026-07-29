import React from 'react';
import { LayoutDashboard, Dumbbell, UtensilsCrossed, Bot, TrendingUp, Code2, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileFrame: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, isMobileFrame }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: UtensilsCrossed },
    { id: 'aicoach', label: 'AI Coach', icon: Bot, badge: 'AI' },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'flutter', label: 'Flutter Hub', icon: Code2, badge: 'Code' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Frame Bottom Navigation Bar */}
      <nav className={`z-30 bg-[#0D0D0F]/95 backdrop-blur-xl border-t border-[#1F1F22] text-[#8E8E93] px-2 py-2 ${
        isMobileFrame ? 'rounded-b-[36px]' : 'block md:hidden sticky bottom-0'
      }`}>
        <div className="flex items-center justify-around gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#D1FF52] font-semibold'
                    : 'hover:text-white text-[#8E8E93]'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-[#D1FF52]/10 text-[#D1FF52] scale-105' : ''
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 line-clamp-1">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D1FF52] mt-0.5 shadow-[0_0_8px_#D1FF52]" />
                )}
                {item.badge && !isActive && (
                  <span className="absolute top-0 right-1 px-1 py-0.2 text-[8px] font-bold bg-[#D1FF52]/20 text-[#D1FF52] rounded-full border border-[#D1FF52]/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Navigation Top Bar (visible when full canvas mode) */}
      {!isMobileFrame && (
        <div className="hidden md:flex items-center justify-center gap-2 bg-[#050506] border-b border-[#1F1F22] px-4 py-3">
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0D0D0F] border border-[#1F1F22] shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#D1FF52] text-[#050506] shadow-[0_0_15px_rgba(209,255,82,0.3)]'
                      : 'text-[#8E8E93] hover:text-white hover:bg-[#161618]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-full ${
                      isActive ? 'bg-[#050506]/20 text-[#050506]' : 'bg-[#D1FF52]/10 text-[#D1FF52] border border-[#D1FF52]/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
