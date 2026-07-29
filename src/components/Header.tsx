import React from 'react';
import { UserProfile } from '../types';
import { Flame, Smartphone, Monitor, Sun, Moon, Sparkles, User } from 'lucide-react';

interface HeaderProps {
  profile: UserProfile;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenProfile: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  isMobileFrame,
  setIsMobileFrame,
  darkMode,
  setDarkMode,
  onOpenProfile,
  activeTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0D0D0F]/90 backdrop-blur-md border-b border-[#1F1F22] text-[#E0E0E6] px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-[#D1FF52] text-[#050506] font-extrabold text-base shadow-[0_0_20px_rgba(209,255,82,0.3)]">
            FF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-lg tracking-tight text-white">
                FitFuel AI
              </h1>
              <span className="hidden sm:inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-[#D1FF52]/10 text-[#D1FF52] border border-[#D1FF52]/20">
                PRO AI COACH
              </span>
            </div>
            <p className="text-[11px] text-[#8E8E93] font-medium hidden sm:block">
              Clean Architecture & Gemini AI Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Streak Counter Badge */}
          <div 
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#161618] border border-[#1F1F22] text-[#D1FF52] text-xs font-bold cursor-pointer hover:border-[#D1FF52]/40 transition-all shadow-sm"
          >
            <Flame className="w-4 h-4 text-[#D1FF52]" />
            <span>{profile.streakDays} Day Streak</span>
          </div>

          {/* Device Frame View Toggle */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title={isMobileFrame ? "Switch to Full Desktop View" : "Switch to Mobile Phone Preview"}
            className={`hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isMobileFrame
                ? 'bg-[#D1FF52]/10 border-[#D1FF52] text-[#D1FF52]'
                : 'bg-[#161618] border-[#1F1F22] text-[#8E8E93] hover:text-white hover:border-[#2A2A2E]'
            }`}
          >
            {isMobileFrame ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#D1FF52]" />
                <span>Mobile Frame</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#8E8E93]" />
                <span>Full Canvas</span>
              </>
            )}
          </button>

          {/* Dark / Light Mode Switch */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Theme"
            className="p-2 rounded-full bg-[#161618] hover:bg-[#1F1F22] border border-[#1F1F22] text-[#8E8E93] hover:text-white transition-all"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#D1FF52]" /> : <Moon className="w-4 h-4 text-[#D1FF52]" />}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#161618] border-2 border-[#1F1F22] text-[#D1FF52] font-bold text-xs hover:border-[#D1FF52] transition-all shadow-md"
          >
            {profile.name ? profile.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
