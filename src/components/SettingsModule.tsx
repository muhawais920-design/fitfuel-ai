import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Moon, Sun, Bell, Globe, Trash2 } from 'lucide-react';

interface SettingsModuleProps {
  profile: UserProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onResetData: () => void;
  onOpenProfileModal: () => void;
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({
  profile,
  darkMode,
  setDarkMode,
  onResetData,
  onOpenProfileModal,
}) => {
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [waterReminders, setWaterReminders] = useState(true);
  const [mealReminders, setMealReminders] = useState(true);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const triggerTestNotification = () => {
    setShowNotificationToast(true);
    setTimeout(() => setShowNotificationToast(false), 4000);
  };

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">App Settings</h2>
        <p className="text-xs text-[#8E8E93]">Configure theme, notifications, units & account</p>
      </div>

      {/* Test Push Notification Toast Simulator */}
      {showNotificationToast && (
        <div className="p-4 rounded-2xl bg-[#D1FF52] text-[#050506] shadow-xl flex items-center justify-between animate-bounce border border-[#D1FF52]">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-[#050506]" />
            <div>
              <h4 className="text-xs font-bold">FitFuel AI Push Reminder</h4>
              <p className="text-[11px] opacity-90">Time to drink 250ml water & log your meal!</p>
            </div>
          </div>
          <button onClick={() => setShowNotificationToast(false)} className="text-xs font-extrabold">
            Dismiss
          </button>
        </div>
      )}

      {/* Profile & Account Section */}
      <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">User Profile</h3>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold text-white">{profile.name}</h4>
            <p className="text-xs text-[#8E8E93]">{profile.gender} • {profile.age} yrs • {profile.heightCm} cm • {profile.weightKg} kg</p>
          </div>
          <button
            onClick={onOpenProfileModal}
            className="px-4 py-2 rounded-full bg-[#161618] hover:bg-[#1F1F22] border border-[#1F1F22] text-xs font-bold text-[#E0E0E6]"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">Preferences</h3>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-[#1F1F22]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-[#D1FF52]">
              {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">App Theme</h4>
              <p className="text-[11px] text-[#8E8E93]">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full bg-[#161618] hover:bg-[#1F1F22] border border-[#1F1F22] text-xs font-bold text-[#E0E0E6]"
          >
            Toggle Theme
          </button>
        </div>

        {/* Units Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-[#1F1F22]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-[#D1FF52]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Unit System</h4>
              <p className="text-[11px] text-[#8E8E93]">{unitSystem === 'metric' ? 'Metric (kg, cm, ml)' : 'Imperial (lbs, ft, oz)'}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-full bg-[#161618] border border-[#1F1F22]">
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-3.5 py-1 rounded-full text-xs font-bold ${unitSystem === 'metric' ? 'bg-[#D1FF52] text-[#050506]' : 'text-[#8E8E93]'}`}
            >
              Metric
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-3.5 py-1 rounded-full text-xs font-bold ${unitSystem === 'imperial' ? 'bg-[#D1FF52] text-[#050506]' : 'text-[#8E8E93]'}`}
            >
              Imperial
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">Push Notifications</h3>
          <button
            onClick={triggerTestNotification}
            className="text-xs text-[#D1FF52] hover:underline font-bold"
          >
            Test Push Alert
          </button>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer py-1">
            <span className="text-xs font-medium text-[#E0E0E6]">Daily Workout Reminders</span>
            <input
              type="checkbox"
              checked={workoutReminders}
              onChange={(e) => setWorkoutReminders(e.target.checked)}
              className="w-4 h-4 accent-[#D1FF52] rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-1">
            <span className="text-xs font-medium text-[#E0E0E6]">Water Intake Reminders (Every 2 hrs)</span>
            <input
              type="checkbox"
              checked={waterReminders}
              onChange={(e) => setWaterReminders(e.target.checked)}
              className="w-4 h-4 accent-[#D1FF52] rounded"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer py-1">
            <span className="text-xs font-medium text-[#E0E0E6]">Meal & Macro Logging Reminders</span>
            <input
              type="checkbox"
              checked={mealReminders}
              onChange={(e) => setMealReminders(e.target.checked)}
              className="w-4 h-4 accent-[#D1FF52] rounded"
            />
          </label>
        </div>
      </div>

      {/* Legal & About */}
      <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] space-y-3 text-xs text-[#E0E0E6]">
        <h3 className="font-bold uppercase tracking-wider text-[#8E8E93]">About FitFuel AI</h3>
        <p className="text-[#8E8E93] leading-relaxed">
          Version 1.0.0 • Built with Flutter Clean Architecture, Riverpod State Management, Firebase, and Gemini 3.6 Flash AI Engine.
        </p>

        <div className="pt-2 flex items-center gap-4 text-[#D1FF52] font-bold">
          <button onClick={() => alert('FitFuel AI respects user privacy. All local storage is encrypted.')} className="hover:underline">
            Privacy Policy
          </button>
          <span>•</span>
          <button onClick={() => alert('FitFuel AI Terms of Service applied.')} className="hover:underline">
            Terms of Service
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-[32px] bg-[#161618] border border-red-500/20 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-red-400">Danger Zone</h3>
        <button
          onClick={onResetData}
          className="px-4 py-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30 flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Reset All App Cache & Restore Defaults</span>
        </button>
      </div>

    </div>
  );
};
