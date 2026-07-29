import React, { useState } from 'react';
import { UserProfile, ProgressEntry, Achievement } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { Award, Download } from 'lucide-react';

interface ProgressModuleProps {
  profile: UserProfile;
  progressHistory: ProgressEntry[];
  achievements: Achievement[];
}

export const ProgressModule: React.FC<ProgressModuleProps> = ({
  profile,
  progressHistory,
  achievements,
}) => {
  const [activeTab, setActiveTab] = useState<'weight' | 'calories' | 'achievements' | 'report'>('weight');

  // Calculate current BMI
  const heightM = profile.heightCm / 100;
  const bmi = (profile.weightKg / (heightM * heightM)).toFixed(1);

  let bmiCategory = 'Normal Weight';
  if (Number(bmi) < 18.5) bmiCategory = 'Underweight';
  else if (Number(bmi) >= 25 && Number(bmi) < 30) bmiCategory = 'Overweight';
  else if (Number(bmi) >= 30) bmiCategory = 'Obese';

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Progress & Analytics</h2>
          <p className="text-xs text-[#8E8E93]">Track weight trends, calories burned & achievements</p>
        </div>

        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0D0D0F] border border-[#1F1F22]">
          <button
            onClick={() => setActiveTab('weight')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'weight' ? 'bg-[#D1FF52] text-[#050506]' : 'text-[#8E8E93] hover:text-white'
            }`}
          >
            Weight
          </button>
          <button
            onClick={() => setActiveTab('calories')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'calories' ? 'bg-[#D1FF52] text-[#050506]' : 'text-[#8E8E93] hover:text-white'
            }`}
          >
            Calories
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'achievements' ? 'bg-[#D1FF52] text-[#050506]' : 'text-[#8E8E93] hover:text-white'
            }`}
          >
            Badges
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'report' ? 'bg-[#D1FF52] text-[#050506]' : 'text-[#8E8E93] hover:text-white'
            }`}
          >
            Report
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-5 rounded-[28px] bg-[#0D0D0F] border border-[#1F1F22] text-center">
          <span className="text-[10px] text-[#8E8E93] block mb-1">Current Weight</span>
          <strong className="text-xl font-black text-white">{profile.weightKg} kg</strong>
          <span className="text-[10px] text-[#D1FF52] block mt-0.5">Target: {profile.targetWeightKg} kg</span>
        </div>

        <div className="p-5 rounded-[28px] bg-[#0D0D0F] border border-[#1F1F22] text-center">
          <span className="text-[10px] text-[#8E8E93] block mb-1">Body Mass Index</span>
          <strong className="text-xl font-black text-[#D1FF52]">{bmi}</strong>
          <span className="text-[10px] text-white block mt-0.5">{bmiCategory}</span>
        </div>

        <div className="p-5 rounded-[28px] bg-[#0D0D0F] border border-[#1F1F22] text-center">
          <span className="text-[10px] text-[#8E8E93] block mb-1">Fitness Streak</span>
          <strong className="text-xl font-black text-[#D1FF52]">{profile.streakDays} Days</strong>
          <span className="text-[10px] text-[#8E8E93] block mt-0.5">Active Streak</span>
        </div>

        <div className="p-5 rounded-[28px] bg-[#0D0D0F] border border-[#1F1F22] text-center">
          <span className="text-[10px] text-[#8E8E93] block mb-1">Total Workouts</span>
          <strong className="text-xl font-black text-white">{profile.totalWorkouts}</strong>
          <span className="text-[10px] text-[#8E8E93] block mt-0.5">Sessions Completed</span>
        </div>
      </div>

      {/* Tab 1: Weight Chart */}
      {activeTab === 'weight' && (
        <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Weight Trend Over Time</h3>
            <span className="text-xs text-[#D1FF52] font-semibold">-1.5 kg in last 7 days</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F1F22" />
                <XAxis dataKey="date" stroke="#8E8E93" fontSize={11} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#8E8E93" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#050506', borderColor: '#1F1F22', borderRadius: '16px', fontSize: '12px', color: '#E0E0E6' }}
                />
                <Line type="monotone" dataKey="weightKg" name="Weight (kg)" stroke="#D1FF52" strokeWidth={3} dot={{ fill: '#D1FF52', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 2: Calories Chart */}
      {activeTab === 'calories' && (
        <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Calories Consumed vs Burned</h3>
            <span className="text-xs text-[#D1FF52] font-semibold">Avg Calorie Deficit: 350 kcal/day</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F1F22" />
                <XAxis dataKey="date" stroke="#8E8E93" fontSize={11} />
                <YAxis stroke="#8E8E93" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#050506', borderColor: '#1F1F22', borderRadius: '16px', fontSize: '12px', color: '#E0E0E6' }}
                />
                <Bar dataKey="caloriesIn" name="Calories Consumed" fill="#E0E0E6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="caloriesBurned" name="Calories Burned" fill="#D1FF52" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 3: Achievements Grid */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-5 rounded-[28px] border flex items-start gap-3 transition-all ${
                ach.isUnlocked
                  ? 'bg-[#0D0D0F] border-[#D1FF52]/40 text-white'
                  : 'bg-[#161618] border-[#1F1F22] text-[#8E8E93]'
              }`}
            >
              <div className={`p-3 rounded-2xl flex items-center justify-center shrink-0 ${
                ach.isUnlocked ? 'bg-[#D1FF52]/10 text-[#D1FF52]' : 'bg-[#161618] text-[#8E8E93]'
              }`}>
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">{ach.title}</h4>
                  {ach.isUnlocked && (
                    <span className="px-2.5 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-[#D1FF52]/10 text-[#D1FF52] border border-[#D1FF52]/30">
                      UNLOCKED
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#8E8E93] mt-0.5">{ach.description}</p>
                {ach.unlockedAt && (
                  <span className="text-[9px] text-[#8E8E93] block mt-1">Unlocked: {ach.unlockedAt}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Downloadable Weekly AI Progress Report */}
      {activeTab === 'report' && (
        <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] space-y-4 text-[#E0E0E6]">
          <div className="flex items-center justify-between pb-3 border-b border-[#1F1F22]">
            <div>
              <h3 className="text-lg font-bold text-white">Weekly AI Performance Report</h3>
              <p className="text-xs text-[#8E8E93]">July 22 - July 28, 2026</p>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full bg-[#D1FF52] text-[#050506] font-bold text-xs flex items-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-4 rounded-2xl bg-[#161618] border border-[#1F1F22]">
              <h4 className="font-bold text-[#D1FF52] mb-1">EXECUTIVE AI SUMMARY</h4>
              <p className="text-[#E0E0E6]">
                Congratulations Alex! You have maintained a <strong className="text-[#D1FF52]">7-day active fitness streak</strong> with consistent strength training. Your total weight decreased from 78.0 kg to 76.5 kg (-1.5 kg), staying perfectly aligned with your <strong className="text-white">{profile.fitnessGoal}</strong> target.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#161618] border border-[#1F1F22]">
                <span className="text-[#8E8E93] block">Avg Daily Water</span>
                <strong className="text-[#D1FF52] font-bold text-sm">2,960 ml / day</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#161618] border border-[#1F1F22]">
                <span className="text-[#8E8E93] block">Avg Steps Count</span>
                <strong className="text-[#D1FF52] font-bold text-sm">9,042 steps / day</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#161618] border border-[#1F1F22]">
              <h4 className="font-bold text-[#D1FF52] mb-1">COACH RECOMMENDATION FOR NEXT WEEK</h4>
              <p className="text-[#E0E0E6]">
                Increase progressive overload on incline bench press by 2.5 kg. Maintain your current daily calorie target of 2,100 kcal with high protein intake (160g) to preserve lean muscle mass during fat loss.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
