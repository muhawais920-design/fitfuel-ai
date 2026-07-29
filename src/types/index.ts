export type FitnessGoal = 
  | 'Weight Loss'
  | 'Weight Gain'
  | 'Muscle Building'
  | 'Fat Loss'
  | 'Maintain Weight'
  | 'General Fitness'
  | 'Body Recomposition';

export type ActivityLevel = 
  | 'Sedentary (Little or no exercise)'
  | 'Lightly Active (1-3 days/week)'
  | 'Moderately Active (3-5 days/week)'
  | 'Very Active (6-7 days/week)'
  | 'Extra Active (Hard exercise & physical job)';

export type WorkoutExperience = 'Beginner' | 'Intermediate' | 'Advanced';

export type DietPreference = 'Balanced / Anything' | 'High Protein' | 'Keto' | 'Vegan' | 'Vegetarian' | 'Paleo' | 'Low Carb';

export interface UserProfile {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  activityLevel: ActivityLevel;
  fitnessGoal: FitnessGoal;
  dailyWaterGoalMl: number;
  workoutExperience: WorkoutExperience;
  dietPreference: DietPreference;
  medicalConditions: string;
  allergies: string;
  
  // Dynamic Stats
  streakDays: number;
  totalWorkouts: number;
  targetCalories: number;
  targetProteinG: number;
  targetCarbsG: number;
  targetFatG: number;
  
  // Daily Progress Log
  waterConsumedMl: number;
  stepsTaken: number;
  targetSteps: number;
  isLoggedIn: boolean;
  isOnboarded: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  sets: number;
  reps: string;
  restSeconds: number;
  targetMuscles: string[];
  instructions: string[];
  tips: string;
  equipment: string;
  isCompleted?: boolean;
}

export interface WorkoutRoutine {
  id: string;
  title: string;
  category: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'HIIT' | 'Cardio' | 'Yoga' | 'Stretching';
  estimatedDuration: string;
  caloriesBurned: number;
  exercises: Exercise[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isFavorite?: boolean;
  bannerImage: string;
}

export interface LoggedMeal {
  id: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  time: string;
  photoUrl?: string;
  assessment?: string;
}

export interface ProgressEntry {
  id: string;
  date: string;
  weightKg: number;
  bmi: number;
  caloriesIn: number;
  caloriesBurned: number;
  waterMl: number;
  steps: number;
  workoutCompletedTitle?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  category: 'Streak' | 'Workout' | 'Hydration' | 'Nutrition';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
