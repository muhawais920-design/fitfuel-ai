import React, { useState } from 'react';
import { UserProfile, FitnessGoal, ActivityLevel, WorkoutExperience, DietPreference } from '../types';
import { Sparkles, Dumbbell, Award, ArrowRight, ArrowLeft, Check, Mail, Lock } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updatedProfile: UserProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [step, setStep] = useState<'splash' | 'onboarding' | 'auth' | 'profileForm'>('splash');
  const [onboardingSlide, setOnboardingSlide] = useState(0);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Auth Form State
  const [email, setEmail] = useState('user@fitfuel.ai');
  const [password, setPassword] = useState('••••••••');
  
  // Profile Form State
  const [formData, setFormData] = useState<UserProfile>({ ...profile });

  if (!isOpen) return null;

  const slides = [
    {
      title: 'AI Personal Coach in Your Pocket',
      description: 'Powered by Gemini 3.6 Flash. Get tailored workout routines, meal plans, and real-time form advice 24/7.',
      icon: Sparkles,
    },
    {
      title: 'Hyper-Personalized Nutrition & Training',
      description: 'Precision macro tracking, meal photo AI analyzer, and progressive overload tracking for optimal results.',
      icon: Dumbbell,
    },
    {
      title: 'Track Streaks, Water & Achievements',
      description: 'Stay accountable with gamified fitness streaks, water intake reminders, and automated weekly AI reports.',
      icon: Award,
    },
  ];

  const goalsList: FitnessGoal[] = [
    'Weight Loss',
    'Weight Gain',
    'Muscle Building',
    'Fat Loss',
    'Maintain Weight',
    'General Fitness',
    'Body Recomposition',
  ];

  const activityLevels: ActivityLevel[] = [
    'Sedentary (Little or no exercise)',
    'Lightly Active (1-3 days/week)',
    'Moderately Active (3-5 days/week)',
    'Very Active (6-7 days/week)',
    'Extra Active (Hard exercise & physical job)',
  ];

  const experiences: WorkoutExperience[] = ['Beginner', 'Intermediate', 'Advanced'];
  const diets: DietPreference[] = ['Balanced / Anything', 'High Protein', 'Keto', 'Vegan', 'Vegetarian', 'Paleo', 'Low Carb'];

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Calculate recommended target macros based on body parameters
    const BMR = 10 * formData.weightKg + 6.25 * formData.heightCm - 5 * formData.age + 5;
    let multiplier = 1.2;
    if (formData.activityLevel.includes('Lightly')) multiplier = 1.375;
    if (formData.activityLevel.includes('Moderately')) multiplier = 1.55;
    if (formData.activityLevel.includes('Very')) multiplier = 1.725;
    
    let targetCals = Math.round(BMR * multiplier);
    if (formData.fitnessGoal === 'Weight Loss' || formData.fitnessGoal === 'Fat Loss') targetCals -= 400;
    if (formData.fitnessGoal === 'Muscle Building' || formData.fitnessGoal === 'Weight Gain') targetCals += 300;

    const targetProtein = Math.round(formData.weightKg * 2.1);
    const targetFat = Math.round((targetCals * 0.25) / 9);
    const targetCarbs = Math.round((targetCals - (targetProtein * 4 + targetFat * 9)) / 4);

    const updated = {
      ...formData,
      targetCalories: targetCals,
      targetProteinG: targetProtein,
      targetCarbsG: Math.max(100, targetCarbs),
      targetFatG: Math.max(40, targetFat),
      isLoggedIn: true,
      isOnboarded: true,
    };

    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050506]/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0D0D0F] border border-[#1F1F22] rounded-[36px] shadow-2xl overflow-hidden text-[#E0E0E6]">
        
        {/* Step 1: Splash Screen */}
        {step === 'splash' && (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[460px] bg-[#0D0D0F]">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-[28px] bg-[#D1FF52] text-[#050506] flex items-center justify-center shadow-xl shadow-[#D1FF52]/20">
                <Dumbbell className="w-12 h-12" />
              </div>
              <Sparkles className="w-7 h-7 text-[#D1FF52] absolute -top-2 -right-2 animate-spin" />
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white mb-2">
              FitFuel <span className="text-[#D1FF52]">AI</span>
            </h2>
            <p className="text-sm text-[#8E8E93] max-w-xs mb-8">
              Your Complete AI Personal Trainer, Nutritionist & Clean Architecture Mobile Experience
            </p>

            <button
              onClick={() => setStep('onboarding')}
              className="w-full py-4 px-6 rounded-full bg-[#D1FF52] text-[#050506] font-extrabold text-sm shadow-lg shadow-[#D1FF52]/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: 3-Slide Onboarding */}
        {step === 'onboarding' && (
          <div className="p-8 flex flex-col min-h-[460px]">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              {React.createElement(slides[onboardingSlide].icon, {
                className: 'w-16 h-16 mb-6 p-3.5 rounded-[24px] bg-[#161618] border border-[#1F1F22] text-[#D1FF52] shadow-lg'
              })}
              
              <h3 className="text-2xl font-bold text-white mb-3">
                {slides[onboardingSlide].title}
              </h3>
              <p className="text-sm text-[#8E8E93] max-w-xs leading-relaxed mb-6">
                {slides[onboardingSlide].description}
              </p>

              {/* Dots */}
              <div className="flex items-center gap-2 mb-8">
                {slides.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === onboardingSlide ? 'w-8 bg-[#D1FF52]' : 'w-2 bg-[#1F1F22]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {onboardingSlide > 0 && (
                <button
                  onClick={() => setOnboardingSlide(onboardingSlide - 1)}
                  className="p-3.5 rounded-full border border-[#1F1F22] bg-[#161618] text-[#E0E0E6] hover:bg-[#1F1F22]"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              
              <button
                onClick={() => {
                  if (onboardingSlide < slides.length - 1) {
                    setOnboardingSlide(onboardingSlide + 1);
                  } else {
                    setStep('auth');
                  }
                }}
                className="flex-1 py-4 px-6 rounded-full bg-[#D1FF52] text-[#050506] font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>{onboardingSlide === slides.length - 1 ? 'Continue to Sign In' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Auth Screen (Login / Register / Guest) */}
        {step === 'auth' && (
          <div className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                {authMode === 'login' && 'Welcome Back'}
                {authMode === 'register' && 'Create Your Account'}
                {authMode === 'forgot' && 'Reset Password'}
              </h3>
              <p className="text-xs text-[#8E8E93] mt-1">
                {authMode === 'login' && 'Sign in to sync your fitness data & AI plans'}
                {authMode === 'register' && 'Start your AI fitness transformation today'}
                {authMode === 'forgot' && 'Enter your email to receive password reset link'}
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setStep('profileForm'); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#8E8E93] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white focus:outline-none focus:border-[#D1FF52]"
                  />
                </div>
              </div>

              {authMode !== 'forgot' && (
                <div>
                  <label className="block text-xs font-medium text-[#8E8E93] mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8E8E93] absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white focus:outline-none focus:border-[#D1FF52]"
                    />
                  </div>
                </div>
              )}

              {authMode === 'login' && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-xs text-[#D1FF52] hover:underline font-bold"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#D1FF52] text-[#050506] font-extrabold text-xs shadow-lg shadow-[#D1FF52]/20"
              >
                {authMode === 'login' && 'Sign In'}
                {authMode === 'register' && 'Create Account'}
                {authMode === 'forgot' && 'Send Reset Email'}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-[#1F1F22]" />
              <span className="text-[11px] text-[#8E8E93] uppercase">Or continue with</span>
              <div className="flex-1 h-px bg-[#1F1F22]" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setStep('profileForm')}
                className="py-3 px-4 rounded-full bg-[#161618] hover:bg-[#1F1F22] border border-[#1F1F22] flex items-center justify-center gap-2 text-xs text-[#E0E0E6] font-medium"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => setStep('profileForm')}
                className="py-3 px-4 rounded-full bg-[#161618] hover:bg-[#1F1F22] border border-[#1F1F22] flex items-center justify-center gap-2 text-xs text-[#E0E0E6] font-medium"
              >
                <AppleIcon className="w-4 h-4 fill-current text-white" />
                <span>Apple</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setStep('profileForm')}
              className="w-full py-3 rounded-full bg-[#161618] hover:bg-[#1F1F22] text-[#E0E0E6] text-xs font-semibold border border-[#1F1F22]"
            >
              Continue as Guest Mode
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-xs text-[#D1FF52] hover:underline font-bold"
              >
                {authMode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: 14-Metrics Profile Setup Form */}
        {step === 'profileForm' && (
          <div className="p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#1F1F22] mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Setup Your Profile</h3>
                <p className="text-xs text-[#8E8E93]">14 metrics for precision AI recommendations</p>
              </div>
              <span className="px-3 py-1 text-[10px] font-extrabold rounded-full bg-[#D1FF52]/10 text-[#D1FF52] border border-[#D1FF52]/30">
                AI CALIBRATION
              </span>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              {/* Name & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#8E8E93] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white focus:border-[#D1FF52] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8E8E93] mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white focus:border-[#D1FF52] focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Age, Height, Weight, Target Weight */}
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[10px] font-medium text-[#8E8E93] mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-2 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white text-center focus:border-[#D1FF52] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-[#8E8E93] mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.heightCm}
                    onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                    className="w-full px-2 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white text-center focus:border-[#D1FF52] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-[#8E8E93] mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                    className="w-full px-2 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white text-center focus:border-[#D1FF52] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-[#8E8E93] mb-1">Target (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.targetWeightKg}
                    onChange={(e) => setFormData({ ...formData, targetWeightKg: Number(e.target.value) })}
                    className="w-full px-2 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white text-center focus:border-[#D1FF52] focus:outline-none"
                  />
                </div>
              </div>

              {/* Fitness Goal */}
              <div>
                <label className="block text-xs font-medium text-[#8E8E93] mb-1">Primary Fitness Goal</label>
                <select
                  value={formData.fitnessGoal}
                  onChange={(e) => setFormData({ ...formData, fitnessGoal: e.target.value as FitnessGoal })}
                  className="w-full px-3.5 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white focus:border-[#D1FF52] focus:outline-none"
                >
                  {goalsList.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Activity Level & Workout Experience */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#8E8E93] mb-1">Activity Level</label>
                  <select
                    value={formData.activityLevel}
                    onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as ActivityLevel })}
                    className="w-full px-3.5 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white focus:border-[#D1FF52] focus:outline-none"
                  >
                    {activityLevels.map((a) => (
                      <option key={a} value={a}>{a.split(' ')[0]} {a.split(' ')[1]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8E8E93] mb-1">Workout Experience</label>
                  <select
                    value={formData.workoutExperience}
                    onChange={(e) => setFormData({ ...formData, workoutExperience: e.target.value as WorkoutExperience })}
                    className="w-full px-3.5 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white focus:border-[#D1FF52] focus:outline-none"
                  >
                    {experiences.map((exp) => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Diet Preference & Daily Water Goal */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#8E8E93] mb-1">Diet Preference</label>
                  <select
                    value={formData.dietPreference}
                    onChange={(e) => setFormData({ ...formData, dietPreference: e.target.value as DietPreference })}
                    className="w-full px-3.5 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white focus:border-[#D1FF52] focus:outline-none"
                  >
                    {diets.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8E8E93] mb-1">Daily Water Goal (ml)</label>
                  <input
                    type="number"
                    step="250"
                    value={formData.dailyWaterGoalMl}
                    onChange={(e) => setFormData({ ...formData, dailyWaterGoalMl: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white focus:border-[#D1FF52] focus:outline-none"
                  />
                </div>
              </div>

              {/* Medical Conditions & Allergies */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#8E8E93] mb-1">Medical Conditions</label>
                  <input
                    type="text"
                    placeholder="e.g. Asthma, Knee pain, None"
                    value={formData.medicalConditions}
                    onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white focus:border-[#D1FF52] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8E8E93] mb-1">Allergies</label>
                  <input
                    type="text"
                    placeholder="e.g. Peanuts, Dairy, None"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white focus:border-[#D1FF52] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#D1FF52] text-[#050506] font-extrabold text-xs shadow-xl flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Profile & Launch FitFuel AI</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 170 170">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-5.01.24-9.93-1.83-14.76-6.23-3.29-2.94-7.23-7.7-11.82-14.28-6.6-9.43-11.75-19.98-15.45-31.65-3.7-11.67-5.55-22.9-5.55-33.68 0-14.15 3.51-26.02 10.53-35.61 7.02-9.6 15.89-14.46 26.61-14.59 5.01 0 10.57 1.29 16.67 3.88 6.1 2.59 10.24 3.94 12.43 4.06 2.07 0 6.34-1.41 12.82-4.24 6.48-2.83 12.01-4.12 16.59-3.88 12.14.95 21.68 5.66 28.62 14.13-10.77 6.52-16.03 15.63-15.79 27.32.24 9.17 3.73 16.89 10.47 23.16 6.74 6.27 14.82 9.87 24.23 10.8-2.32 6.82-5.18 13.51-8.58 20.08zM119.22 31.83c0-6.72 2.4-13.12 7.2-19.2 4.8-6.08 10.9-10.02 18.3-11.83.6 7.08-1.57 13.72-6.51 19.92-4.94 6.2-11 10.15-18.18 11.86-.24-.25-.48-.5-.81-.75z"/>
  </svg>
);
