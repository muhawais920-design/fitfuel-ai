import React, { useState } from 'react';
import { UserProfile, WorkoutRoutine, LoggedMeal } from '../types';
import { Flame, Dumbbell, Utensils, Droplet, Footprints, TrendingDown, Sparkles, Play, Plus, ChevronRight, Award, Zap } from 'lucide-react';

interface DashboardProps {
  profile: UserProfile;
  todaysWorkout: WorkoutRoutine;
  loggedMeals: LoggedMeal[];
  onStartWorkout: (workout: WorkoutRoutine) => void;
  onAddWater: (amountMl: number) => void;
  onNavigate: (tab: string) => void;
  onOpenAiCoach: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  todaysWorkout,
  loggedMeals,
  onStartWorkout,
  onAddWater,
  onNavigate,
  onOpenAiCoach,
}) => {
  const [aiTip] = useState<string>(
    `Prioritize 30g protein within 45 minutes after today's workout to maximize muscle protein synthesis for your ${profile.fitnessGoal} goal.`
  );

  // Macro Calculations
  const totalCaloriesConsumed = loggedMeals.reduce((sum, m) => sum + m.calories, 0);
  const totalProteinConsumed = loggedMeals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbsConsumed = loggedMeals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFatConsumed = loggedMeals.reduce((sum, m) => sum + m.fat, 0);

  const calPercentage = Math.min(100, Math.round((totalCaloriesConsumed / profile.targetCalories) * 100));
  const waterPercentage = Math.min(100, Math.round((profile.waterConsumedMl / profile.dailyWaterGoalMl) * 100));
  const stepsPercentage = Math.min(100, Math.round((profile.stepsTaken / profile.targetSteps) * 100));

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Welcome Banner & AI Motivation */}
      <div className="relative overflow-hidden rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D1FF52]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-[#D1FF52] uppercase tracking-wider">
                DAILY FITNESS CALIBRATION
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D1FF52]/10 text-[#D1FF52] border border-[#D1FF52]/30">
                <Flame className="w-3 h-3 mr-1 text-[#D1FF52]" />
                {profile.streakDays} Day Streak
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-[#D1FF52]">{profile.name}</span>!
            </h2>
            <p className="text-xs text-[#8E8E93] mt-1 max-w-lg">
              Goal: <strong className="text-[#E0E0E6]">{profile.fitnessGoal}</strong> • Target Calories: <strong className="text-[#E0E0E6]">{profile.targetCalories} kcal</strong>
            </p>
          </div>

          <button
            onClick={onOpenAiCoach}
            className="group flex items-center gap-2 px-5 py-3 rounded-full bg-[#D1FF52] hover:bg-[#c2f043] text-[#050506] font-bold text-xs shadow-[0_0_20px_rgba(209,255,82,0.3)] transition-all transform hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-[#050506]" />
            <span>Ask AI Coach</span>
            <ChevronRight className="w-4 h-4 text-[#050506] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* AI Smart Tip Box */}
        <div className="mt-5 p-4 rounded-2xl bg-[#161618] border border-[#1F1F22] flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#D1FF52]/10 text-[#D1FF52] shrink-0 border border-[#D1FF52]/20">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D1FF52]">AI DAILY NUTRITION INSIGHT</span>
            <p className="text-xs text-[#E0E0E6] mt-0.5 leading-relaxed">{aiTip}</p>
          </div>
        </div>
      </div>

      {/* Today's Workout Hero Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] shadow-2xl group">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-25 transition-opacity duration-500"
          style={{ backgroundImage: `url(${todaysWorkout.bannerImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050506] via-[#0D0D0F]/90 to-transparent" />

        <div className="relative z-10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#D1FF52] text-[#050506] shadow-sm">
                TODAY'S WORKOUT
              </span>
              <span className="text-xs text-[#8E8E93] font-medium">{todaysWorkout.category} • {todaysWorkout.estimatedDuration}</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              {todaysWorkout.title}
            </h3>

            <p className="text-xs text-[#8E8E93] line-clamp-2">
              Focus: {todaysWorkout.exercises.map(e => e.name).join(', ')}
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-[#E0E0E6] pt-1">
              <div className="flex items-center gap-1 text-[#D1FF52]">
                <Flame className="w-4 h-4 text-[#D1FF52]" />
                <span>{todaysWorkout.caloriesBurned} kcal burn</span>
              </div>
              <div className="flex items-center gap-1 text-[#8E8E93]">
                <Dumbbell className="w-4 h-4" />
                <span>{todaysWorkout.exercises.length} Exercises</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onStartWorkout(todaysWorkout)}
            className="flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#D1FF52] hover:bg-[#c2f043] text-[#050506] font-black text-sm shadow-[0_0_25px_rgba(209,255,82,0.3)] hover:scale-[1.03] transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-[#050506] flex items-center justify-center">
              <Play className="w-4 h-4 fill-[#D1FF52] text-[#D1FF52] ml-0.5" />
            </div>
            <span>Start Session Now</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid: Nutrition, Water, Steps, Weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Calories & Macros Card */}
        <div className="p-5 rounded-[28px] bg-[#0D0D0F] border border-[#1F1F22] shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#161618] border border-[#1F1F22] text-[#D1FF52]">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">Calories</span>
            </div>
            <button onClick={() => onNavigate('nutrition')} className="text-[11px] font-semibold text-[#D1FF52] hover:underline">
              Log Meal
            </button>
          </div>

          <div className="my-2 flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black text-white">{totalCaloriesConsumed}</span>
              <span className="text-xs text-[#8E8E93]"> / {profile.targetCalories} kcal</span>
            </div>
            <span className="text-xs font-bold text-[#D1FF52]">{calPercentage}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-[#161618] overflow-hidden mb-3">
            <div 
              className="h-full rounded-full bg-[#D1FF52] transition-all duration-500 shadow-[0_0_10px_#D1FF52]"
              style={{ width: `${calPercentage}%` }}
            />
          </div>

          {/* Macros Mini Breakdown */}
          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-[#1F1F22] text-[10px] text-center">
            <div>
              <span className="text-[#8E8E93] block">Protein</span>
              <strong className="text-white">{totalProteinConsumed} / {profile.targetProteinG}g</strong>
            </div>
            <div>
              <span className="text-[#8E8E93] block">Carbs</span>
              <strong className="text-white">{totalCarbsConsumed} / {profile.targetCarbsG}g</strong>
            </div>
            <div>
              <span className="text-[#8E8E93] block">Fat</span>
              <strong className="text-white">{totalFatConsumed} / {profile.targetFatG}g</strong>
            </div>
          </div>
        </div>

        {/* 2. Water Intake Card */}
        <div className="p-5 rounded-[28px] bg-[#0D0D0F] border border-[#1F1F22] shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#161618] border border-[#1F1F22] text-cyan-400">
                <Droplet className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">Water Goal</span>
            </div>
            <span className="text-xs font-bold text-cyan-400">{waterPercentage}%</span>
          </div>

          <div className="my-2 flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black text-white">{profile.waterConsumedMl}</span>
              <span className="text-xs text-[#8E8E93]"> / {profile.dailyWaterGoalMl} ml</span>
            </div>
          </div>

          {/* Liquid Wave Progress Bar */}
          <div className="relative w-full h-2 rounded-full bg-[#161618] overflow-hidden mb-3">
            <div 
              className="h-full rounded-full bg-cyan-400 transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
              style={{ width: `${waterPercentage}%` }}
            />
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#1F1F22]">
            <button
              onClick={() => onAddWater(250)}
              className="flex-1 py-1.5 rounded-full bg-[#161618] hover:bg-[#1F1F22] text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1 border border-[#1F1F22] transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+250 ml</span>
            </button>
            <button
              onClick={() => onAddWater(500)}
              className="flex-1 py-1.5 rounded-full bg-[#161618] hover:bg-[#1F1F22] text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1 border border-[#1F1F22] transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+500 ml</span>
            </button>
          </div>
        </div>

        {/* 3. Steps Tracker Card */}
        <div className="p-5 rounded-[28px] bg-[#0D0D0F] border border-[#1F1F22] shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#161618] border border-[#1F1F22] text-[#D1FF52]">
                <Footprints className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">Daily Steps</span>
            </div>
            <span className="text-xs font-bold text-[#D1FF52]">{stepsPercentage}%</span>
          </div>

          <div className="my-2">
            <span className="text-2xl font-black text-white">{profile.stepsTaken.toLocaleString()}</span>
            <span className="text-xs text-[#8E8E93]"> / {profile.targetSteps.toLocaleString()}</span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#161618] overflow-hidden mb-3">
            <div 
              className="h-full rounded-full bg-[#D1FF52] transition-all duration-500 shadow-[0_0_10px_#D1FF52]"
              style={{ width: `${stepsPercentage}%` }}
            />
          </div>

          <div className="text-[11px] text-[#8E8E93] flex items-center justify-between pt-2 border-t border-[#1F1F22]">
            <span>Est. Distance: {(profile.stepsTaken * 0.00075).toFixed(1)} km</span>
            <span className="text-[#D1FF52] font-semibold">Active Motion</span>
          </div>
        </div>

        {/* 4. Weight Progress Card */}
        <div className="p-5 rounded-[28px] bg-[#0D0D0F] border border-[#1F1F22] shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#161618] border border-[#1F1F22] text-rose-400">
                <TrendingDown className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">Weight Goal</span>
            </div>
            <button onClick={() => onNavigate('progress')} className="text-[11px] font-semibold text-[#D1FF52] hover:underline">
              Chart
            </button>
          </div>

          <div className="my-2">
            <span className="text-2xl font-black text-white">{profile.weightKg} kg</span>
            <span className="text-xs text-[#8E8E93]"> → Target: {profile.targetWeightKg} kg</span>
          </div>

          <div className="p-2 rounded-xl bg-[#161618] border border-[#1F1F22] text-[11px] text-[#E0E0E6] flex items-center justify-between mb-2">
            <span>Progress:</span>
            <strong className="font-bold text-[#D1FF52]">-1.5 kg this month</strong>
          </div>

          <button
            onClick={() => onNavigate('progress')}
            className="w-full py-2 rounded-full bg-[#161618] hover:bg-[#1F1F22] text-xs font-semibold text-[#E0E0E6] border border-[#1F1F22] transition-all"
          >
            Update Weight Entry
          </button>
        </div>

      </div>

      {/* Quick Access Modules Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigate('workouts')}
          className="p-4 rounded-[24px] bg-[#0D0D0F] hover:bg-[#161618] border border-[#1F1F22] flex items-center gap-3 text-left transition-all"
        >
          <div className="p-2.5 rounded-2xl bg-[#161618] border border-[#1F1F22] text-[#D1FF52]">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Workouts</h4>
            <p className="text-[10px] text-[#8E8E93]">Custom routines</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('nutrition')}
          className="p-4 rounded-[24px] bg-[#0D0D0F] hover:bg-[#161618] border border-[#1F1F22] flex items-center gap-3 text-left transition-all"
        >
          <div className="p-2.5 rounded-2xl bg-[#161618] border border-[#1F1F22] text-[#D1FF52]">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Nutrition</h4>
            <p className="text-[10px] text-[#8E8E93]">AI Meal Analyzer</p>
          </div>
        </button>

        <button
          onClick={onOpenAiCoach}
          className="p-4 rounded-[24px] bg-[#0D0D0F] hover:bg-[#161618] border border-[#1F1F22] flex items-center gap-3 text-left transition-all"
        >
          <div className="p-2.5 rounded-2xl bg-[#161618] border border-[#1F1F22] text-[#D1FF52]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">AI Coach</h4>
            <p className="text-[10px] text-[#8E8E93]">Gemini 3.6 Flash</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('flutter')}
          className="p-4 rounded-[24px] bg-[#0D0D0F] hover:bg-[#161618] border border-[#1F1F22] flex items-center gap-3 text-left transition-all"
        >
          <div className="p-2.5 rounded-2xl bg-[#161618] border border-[#1F1F22] text-[#D1FF52]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Flutter Code</h4>
            <p className="text-[10px] text-[#8E8E93]">Play Store Ready</p>
          </div>
        </button>
      </div>

    </div>
  );
};
