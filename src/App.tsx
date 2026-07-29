import React, { useState, useEffect } from 'react';
import { UserProfile, WorkoutRoutine, LoggedMeal, ProgressEntry, Achievement } from './types';
import { defaultProfile, sampleWorkouts, sampleLoggedMeals, sampleProgressHistory, sampleAchievements } from './data/initialData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { WorkoutModule } from './components/WorkoutModule';
import { NutritionModule } from './components/NutritionModule';
import { AiCoachChat } from './components/AiCoachChat';
import { ProgressModule } from './components/ProgressModule';
import { SettingsModule } from './components/SettingsModule';
import { FlutterExporterModule } from './components/FlutterExporterModule';
import { OnboardingModal } from './components/OnboardingModal';

export default function App() {
  // Theme & Layout state
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // App Data state initialized from localStorage
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fitfuel_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [workouts, setWorkouts] = useState<WorkoutRoutine[]>(() => {
    const saved = localStorage.getItem('fitfuel_workouts');
    return saved ? JSON.parse(saved) : sampleWorkouts;
  });

  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>(() => {
    const saved = localStorage.getItem('fitfuel_meals');
    return saved ? JSON.parse(saved) : sampleLoggedMeals;
  });

  const [progressHistory, setProgressHistory] = useState<ProgressEntry[]>(() => {
    const saved = localStorage.getItem('fitfuel_progress');
    return saved ? JSON.parse(saved) : sampleProgressHistory;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('fitfuel_achievements');
    return saved ? JSON.parse(saved) : sampleAchievements;
  });

  // Active workout session
  const [activeWorkout, setActiveWorkout] = useState<WorkoutRoutine | null>(null);

  // Profile Onboarding Modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('fitfuel_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('fitfuel_meals', JSON.stringify(loggedMeals));
  }, [loggedMeals]);

  useEffect(() => {
    localStorage.setItem('fitfuel_progress', JSON.stringify(progressHistory));
  }, [progressHistory]);

  const handleAddWater = (amountMl: number) => {
    setProfile(prev => {
      const newWater = prev.waterConsumedMl + amountMl;
      return { ...prev, waterConsumedMl: newWater };
    });
  };

  const handleAddMeal = (meal: LoggedMeal) => {
    setLoggedMeals(prev => [meal, ...prev]);
  };

  const handleFinishWorkout = (routine: WorkoutRoutine) => {
    setProfile(prev => ({
      ...prev,
      totalWorkouts: prev.totalWorkouts + 1,
      streakDays: prev.streakDays + 1,
    }));

    // Add entry to progress history
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const newEntry: ProgressEntry = {
      id: `p-${Date.now()}`,
      date: todayStr,
      weightKg: profile.weightKg,
      bmi: Number((profile.weightKg / Math.pow(profile.heightCm / 100, 2)).toFixed(1)),
      caloriesIn: loggedMeals.reduce((s, m) => s + m.calories, 0),
      caloriesBurned: routine.caloriesBurned,
      waterMl: profile.waterConsumedMl,
      steps: profile.stepsTaken,
      workoutCompletedTitle: routine.title,
    };

    setProgressHistory(prev => [...prev, newEntry]);
  };

  const handleResetData = () => {
    localStorage.clear();
    setProfile(defaultProfile);
    setLoggedMeals(sampleLoggedMeals);
    setProgressHistory(sampleProgressHistory);
    setAchievements(sampleAchievements);
    alert('App data reset to default successfully!');
  };

  return (
    <div className={`${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} min-h-screen flex flex-col font-sans transition-colors duration-300`}>
      
      {/* Top Header */}
      <Header
        profile={profile}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        activeTab={activeTab}
      />

      {/* Main Content Area (Mobile Frame Toggleable) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        
        {isMobileFrame ? (
          /* Simulated iPhone 16 Pro Device Frame Container */
          <div className="relative mx-auto w-full max-w-[410px] h-[840px] bg-slate-950 rounded-[48px] border-[10px] border-slate-800 shadow-2xl overflow-hidden flex flex-col ring-1 ring-slate-700/50">
            
            {/* iPhone Dynamic Island notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-full z-40 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-950 mr-2" />
              <div className="w-2 h-2 rounded-full bg-indigo-950 ring-1 ring-indigo-500/40" />
            </div>

            {/* App Screen inside phone */}
            <div className="flex-1 overflow-y-auto pt-10 px-4 pb-20 bg-slate-950">
              {activeTab === 'dashboard' && (
                <Dashboard
                  profile={profile}
                  todaysWorkout={workouts[0]}
                  loggedMeals={loggedMeals}
                  onStartWorkout={(w) => setActiveWorkout(w)}
                  onAddWater={handleAddWater}
                  onNavigate={(tab) => setActiveTab(tab)}
                  onOpenAiCoach={() => setActiveTab('aicoach')}
                />
              )}
              {activeTab === 'workouts' && (
                <WorkoutModule
                  routines={workouts}
                  onFinishWorkout={handleFinishWorkout}
                  activeWorkout={activeWorkout}
                  setActiveWorkout={setActiveWorkout}
                />
              )}
              {activeTab === 'nutrition' && (
                <NutritionModule
                  profile={profile}
                  loggedMeals={loggedMeals}
                  onAddMeal={handleAddMeal}
                  onAddWater={handleAddWater}
                />
              )}
              {activeTab === 'aicoach' && <AiCoachChat profile={profile} />}
              {activeTab === 'progress' && (
                <ProgressModule
                  profile={profile}
                  progressHistory={progressHistory}
                  achievements={achievements}
                />
              )}
              {activeTab === 'flutter' && <FlutterExporterModule />}
              {activeTab === 'settings' && (
                <SettingsModule
                  profile={profile}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  onResetData={handleResetData}
                  onOpenProfileModal={() => setIsProfileModalOpen(true)}
                />
              )}
            </div>

            {/* Bottom Phone Bar Navigation */}
            <div className="absolute bottom-0 left-0 right-0 z-30">
              <Navigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMobileFrame={true}
              />
            </div>
          </div>
        ) : (
          /* Full Expanded Canvas View */
          <div className="flex-1">
            <Navigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isMobileFrame={false}
            />

            <div className="pt-4">
              {activeTab === 'dashboard' && (
                <Dashboard
                  profile={profile}
                  todaysWorkout={workouts[0]}
                  loggedMeals={loggedMeals}
                  onStartWorkout={(w) => setActiveWorkout(w)}
                  onAddWater={handleAddWater}
                  onNavigate={(tab) => setActiveTab(tab)}
                  onOpenAiCoach={() => setActiveTab('aicoach')}
                />
              )}
              {activeTab === 'workouts' && (
                <WorkoutModule
                  routines={workouts}
                  onFinishWorkout={handleFinishWorkout}
                  activeWorkout={activeWorkout}
                  setActiveWorkout={setActiveWorkout}
                />
              )}
              {activeTab === 'nutrition' && (
                <NutritionModule
                  profile={profile}
                  loggedMeals={loggedMeals}
                  onAddMeal={handleAddMeal}
                  onAddWater={handleAddWater}
                />
              )}
              {activeTab === 'aicoach' && <AiCoachChat profile={profile} />}
              {activeTab === 'progress' && (
                <ProgressModule
                  profile={profile}
                  progressHistory={progressHistory}
                  achievements={achievements}
                />
              )}
              {activeTab === 'flutter' && <FlutterExporterModule />}
              {activeTab === 'settings' && (
                <SettingsModule
                  profile={profile}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  onResetData={handleResetData}
                  onOpenProfileModal={() => setIsProfileModalOpen(true)}
                />
              )}
            </div>
          </div>
        )}

      </main>

      {/* Onboarding & Profile Modal */}
      <OnboardingModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={(updated) => setProfile(updated)}
      />

    </div>
  );
}
