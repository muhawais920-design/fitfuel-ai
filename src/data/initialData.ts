import { UserProfile, WorkoutRoutine, LoggedMeal, ProgressEntry, Achievement } from '../types';

export const defaultProfile: UserProfile = {
  name: 'Alex Rivera',
  age: 26,
  gender: 'Male',
  heightCm: 178,
  weightKg: 76.5,
  targetWeightKg: 72.0,
  activityLevel: 'Moderately Active (3-5 days/week)',
  fitnessGoal: 'Fat Loss',
  dailyWaterGoalMl: 3000,
  workoutExperience: 'Intermediate',
  dietPreference: 'High Protein',
  medicalConditions: 'None',
  allergies: 'None',
  streakDays: 7,
  totalWorkouts: 24,
  targetCalories: 2100,
  targetProteinG: 160,
  targetCarbsG: 210,
  targetFatG: 65,
  waterConsumedMl: 1750,
  stepsTaken: 7420,
  targetSteps: 10000,
  isLoggedIn: true,
  isOnboarded: true,
};

export const sampleWorkouts: WorkoutRoutine[] = [
  {
    id: 'w-chest-triceps',
    title: 'Hypertrophy Chest & Triceps',
    category: 'Chest',
    estimatedDuration: '45 mins',
    caloriesBurned: 380,
    difficulty: 'Intermediate',
    bannerImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex-1',
        name: 'Incline Barbell Bench Press',
        category: 'Chest',
        sets: 4,
        reps: '8-10',
        restSeconds: 90,
        equipment: 'Barbell & Incline Bench',
        targetMuscles: ['Upper Chest', 'Front Delts', 'Triceps'],
        instructions: [
          'Set incline bench to 30 degrees.',
          'Grip barbell slightly wider than shoulder width.',
          'Lower bar smoothly to upper chest while arching upper back slightly.',
          'Press bar up vertically while engaging upper chest.'
        ],
        tips: 'Keep shoulder blades packed back and down.'
      },
      {
        id: 'ex-2',
        name: 'Dumbbell Chest Flyes',
        category: 'Chest',
        sets: 3,
        reps: '12-15',
        restSeconds: 60,
        equipment: 'Dumbbells & Flat Bench',
        targetMuscles: ['Middle Chest', 'Inner Chest'],
        instructions: [
          'Lie flat on bench holding dumbbells with soft bend in elbows.',
          'Lower dumbbells wide to sides until feeling stretch in chest.',
          'Bring dumbbells back together at top as if hugging a large tree.'
        ],
        tips: 'Do not lock out elbows or go too heavy.'
      },
      {
        id: 'ex-3',
        name: 'Tricep Rope Pushdowns',
        category: 'Arms',
        sets: 4,
        reps: '12',
        restSeconds: 60,
        equipment: 'Cable Machine & Rope attachment',
        targetMuscles: ['Triceps Lateral Head'],
        instructions: [
          'Stand upright, elbows pinned to sides.',
          'Pull rope down and flare ends outward at bottom of extension.',
          'Squeeze triceps hard for 1 second before controlling weight back up.'
        ],
        tips: 'Avoid swinging torso; keep momentum out of the movement.'
      },
      {
        id: 'ex-4',
        name: 'Parallel Bar Dips',
        category: 'Chest',
        sets: 3,
        reps: '10-12',
        restSeconds: 75,
        equipment: 'Dip Station',
        targetMuscles: ['Lower Chest', 'Triceps'],
        instructions: [
          'Lean torso slightly forward to target lower chest.',
          'Lower body until upper arms are parallel to floor.',
          'Push back up forcefully to starting position.'
        ],
        tips: 'Keep core engaged to avoid body swing.'
      }
    ]
  },
  {
    id: 'w-hiit-shred',
    title: '30-Min High-Octane Fat Burner',
    category: 'HIIT',
    estimatedDuration: '30 mins',
    caloriesBurned: 420,
    difficulty: 'Intermediate',
    bannerImage: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex-5',
        name: 'Explosive Burpees',
        category: 'HIIT',
        sets: 4,
        reps: '45 sec work / 15 sec rest',
        restSeconds: 15,
        equipment: 'Bodyweight',
        targetMuscles: ['Full Body', 'Cardio system'],
        instructions: [
          'Drop into a squat, kick feet back to pushup stance.',
          'Perform a crisp pushup, jump feet back under hips.',
          'Explode vertically overhead with arms extended.'
        ],
        tips: 'Maintain steady pace without stopping during work interval.'
      },
      {
        id: 'ex-6',
        name: 'Mountain Climbers',
        category: 'Core',
        sets: 4,
        reps: '45 sec work',
        restSeconds: 15,
        equipment: 'Bodyweight',
        targetMuscles: ['Abs', 'Hip Flexors', 'Shoulders'],
        instructions: [
          'Start in high plank stance.',
          'Drive knees rapidly toward chest alternating legs in running motion.'
        ],
        tips: 'Keep hips low and aligned with shoulders.'
      },
      {
        id: 'ex-7',
        name: 'Kettlebell Swings',
        category: 'Back',
        sets: 4,
        reps: '20 reps',
        restSeconds: 45,
        equipment: 'Kettlebell',
        targetMuscles: ['Glutes', 'Hamstrings', 'Lower Back'],
        instructions: [
          'Hinge at hips pushing kettlebell back between legs.',
          'Snap hips forward forcefully to swing bell to chest height.'
        ],
        tips: 'Power comes from hips thrusting, not arms pulling.'
      }
    ]
  },
  {
    id: 'w-back-biceps',
    title: 'V-Taper Back & Bicep Sculpt',
    category: 'Back',
    estimatedDuration: '50 mins',
    caloriesBurned: 410,
    difficulty: 'Advanced',
    bannerImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex-8',
        name: 'Wide-Grip Lat Pulldown',
        category: 'Back',
        sets: 4,
        reps: '10-12',
        restSeconds: 75,
        equipment: 'Cable Machine',
        targetMuscles: ['Latissimus Dorsi', 'Rhomboideus'],
        instructions: [
          'Grip bar wide with overhand grip.',
          'Pull bar down to upper chest while arching chest upward slightly.',
          'Control return motion slowly.'
        ],
        tips: 'Think about pulling with your elbows rather than hands.'
      },
      {
        id: 'ex-9',
        name: 'Seated Cable Row',
        category: 'Back',
        sets: 4,
        reps: '10',
        restSeconds: 60,
        equipment: 'Seated Row Machine',
        targetMuscles: ['Mid Back', 'Rear Delts'],
        instructions: [
          'Sit with knees slightly bent.',
          'Pull handle into lower abdomen while squeezing shoulder blades together.'
        ],
        tips: 'Avoid leaning backward too far.'
      },
      {
        id: 'ex-10',
        name: 'Incline Dumbbell Bicep Curl',
        category: 'Arms',
        sets: 3,
        reps: '12',
        restSeconds: 60,
        equipment: 'Incline Bench & Dumbbells',
        targetMuscles: ['Biceps Long Head'],
        instructions: [
          'Sit on 45-degree incline bench with arms hanging fully stretched.',
          'Curl dumbbells up without moving upper arms.'
        ],
        tips: 'Enjoy the deep stretch at the bottom of movement.'
      }
    ]
  },
  {
    id: 'w-legs-core',
    title: 'Lower Body & Core Blast',
    category: 'Legs',
    estimatedDuration: '50 mins',
    caloriesBurned: 450,
    difficulty: 'Intermediate',
    bannerImage: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80',
    exercises: [
      {
        id: 'ex-11',
        name: 'Barbell Back Squats',
        category: 'Legs',
        sets: 4,
        reps: '8-10',
        restSeconds: 90,
        equipment: 'Squat Rack & Barbell',
        targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
        instructions: [
          'Position bar across traps, take shoulder-width stance.',
          'Break at knees and hips to lower thighs parallel to ground.',
          'Drive up through heels.'
        ],
        tips: 'Keep chest high and knees tracking over toes.'
      },
      {
        id: 'ex-12',
        name: 'Romanian Deadlifts',
        category: 'Legs',
        sets: 4,
        reps: '10-12',
        restSeconds: 75,
        equipment: 'Barbell / Dumbbells',
        targetMuscles: ['Hamstrings', 'Glutes', 'Erector Spinae'],
        instructions: [
          'Hinge forward at hips keeping back flat and knees slightly soft.',
          'Lower weight until feeling deep hamstring stretch.',
          'Drive hips forward to return.'
        ],
        tips: 'Do not round spine at bottom.'
      },
      {
        id: 'ex-13',
        name: 'Hanging Leg Raises',
        category: 'Core',
        sets: 3,
        reps: '15',
        restSeconds: 45,
        equipment: 'Pull-up Bar',
        targetMuscles: ['Lower Abs', 'Hip Flexors'],
        instructions: [
          'Hang from bar with extended arms.',
          'Raise legs smoothly until parallel with floor.'
        ],
        tips: 'Avoid swinging body momentum.'
      }
    ]
  }
];

export const sampleLoggedMeals: LoggedMeal[] = [
  {
    id: 'm-1',
    mealType: 'Breakfast',
    name: 'Protein Oatmeal & Egg Whites',
    calories: 480,
    protein: 38,
    carbs: 52,
    fat: 12,
    fiber: 8,
    time: '8:15 AM',
    assessment: 'Great low-GI energy source to fuel morning activity!'
  },
  {
    id: 'm-2',
    mealType: 'Lunch',
    name: 'Grilled Salmon & Quinoa Bowl',
    calories: 610,
    protein: 46,
    carbs: 48,
    fat: 22,
    fiber: 6,
    time: '1:00 PM',
    assessment: 'Rich in Omega-3 fatty acids and complete protein.'
  },
  {
    id: 'm-3',
    mealType: 'Snacks',
    name: 'Greek Yogurt with Blueberries & Honey',
    calories: 220,
    protein: 20,
    carbs: 26,
    fat: 4,
    fiber: 3,
    time: '4:30 PM',
    assessment: 'Optimal post-workout recovery snack.'
  }
];

export const sampleProgressHistory: ProgressEntry[] = [
  { id: 'p-1', date: 'Jul 22', weightKg: 78.0, bmi: 24.6, caloriesIn: 2200, caloriesBurned: 400, waterMl: 2800, steps: 8500, workoutCompletedTitle: 'Hypertrophy Chest & Triceps' },
  { id: 'p-2', date: 'Jul 23', weightKg: 77.8, bmi: 24.5, caloriesIn: 2050, caloriesBurned: 350, waterMl: 3000, steps: 9100, workoutCompletedTitle: 'Lower Body & Core' },
  { id: 'p-3', date: 'Jul 24', weightKg: 77.4, bmi: 24.4, caloriesIn: 2150, caloriesBurned: 420, waterMl: 3200, steps: 10400, workoutCompletedTitle: '30-Min HIIT' },
  { id: 'p-4', date: 'Jul 25', weightKg: 77.2, bmi: 24.3, caloriesIn: 2000, caloriesBurned: 380, waterMl: 2900, steps: 8800, workoutCompletedTitle: 'V-Taper Back' },
  { id: 'p-5', date: 'Jul 26', weightKg: 77.0, bmi: 24.3, caloriesIn: 2100, caloriesBurned: 450, waterMl: 3100, steps: 9600, workoutCompletedTitle: 'Chest & Triceps' },
  { id: 'p-6', date: 'Jul 27', weightKg: 76.8, bmi: 24.2, caloriesIn: 1980, caloriesBurned: 360, waterMl: 3000, steps: 8900, workoutCompletedTitle: 'Core Blast' },
  { id: 'p-7', date: 'Jul 28', weightKg: 76.5, bmi: 24.1, caloriesIn: 1310, caloriesBurned: 380, waterMl: 1750, steps: 7420, workoutCompletedTitle: 'Hypertrophy Chest' },
];

export const sampleAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: '7-Day Streak Master',
    description: 'Log workouts and track nutrition for 7 consecutive days.',
    iconName: 'Flame',
    isUnlocked: true,
    unlockedAt: 'Jul 28, 2026',
    category: 'Streak'
  },
  {
    id: 'ach-2',
    title: 'Hydration Hero',
    description: 'Reach your daily water goal 5 times in a week.',
    iconName: 'Droplet',
    isUnlocked: true,
    unlockedAt: 'Jul 26, 2026',
    category: 'Hydration'
  },
  {
    id: 'ach-3',
    title: 'Iron Lifter',
    description: 'Complete 20 strength training sessions.',
    iconName: 'Dumbbell',
    isUnlocked: true,
    unlockedAt: 'Jul 24, 2026',
    category: 'Workout'
  },
  {
    id: 'ach-4',
    title: 'Clean Eater Pro',
    description: 'Log 3 balanced meals for 5 consecutive days.',
    iconName: 'Apple',
    isUnlocked: true,
    unlockedAt: 'Jul 25, 2026',
    category: 'Nutrition'
  },
  {
    id: 'ach-5',
    title: '100,000 Step Legend',
    description: 'Accumulate 100,000 total steps on FitFuel AI.',
    iconName: 'Footprints',
    isUnlocked: false,
    category: 'Workout'
  },
  {
    id: 'ach-6',
    title: 'AI Fitness Pioneer',
    description: 'Generate 10 AI Coach meal & workout plans.',
    iconName: 'Bot',
    isUnlocked: false,
    category: 'Streak'
  }
];

export interface FlutterFile {
  path: string;
  language: string;
  content: string;
}

export const flutterCodebase: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    language: 'yaml',
    content: `name: fitfuel_ai
description: Production-Ready AI Fitness, Workout & Nutrition Mobile App powered by Gemini AI and Firebase.
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.4.9
  go_router: ^13.1.0
  firebase_core: ^2.24.2
  firebase_auth: ^4.16.0
  cloud_firestore: ^4.14.0
  firebase_storage: ^11.6.0
  firebase_messaging: ^14.7.10
  dio: ^5.4.0
  google_generative_ai: ^0.2.0
  hive_flutter: ^1.1.0
  shared_preferences: ^2.2.2
  cached_network_image: ^3.3.1
  lottie: ^3.0.0
  fl_chart: ^0.66.0
  google_fonts: ^6.1.0
  flutter_spinkit: ^5.2.0
  intl: ^0.19.0
  lucide_icons: ^0.257.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  build_runner: ^2.4.8
  hive_generator: ^2.0.1

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/animations/
`
  },
  {
    path: 'lib/main.dart',
    language: 'dart',
    content: `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'core/theme/app_theme.dart';
import 'core/router/app_router.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  await Hive.initFlutter();
  await Hive.openBox('fitfuel_cache');

  runApp(
    const ProviderScope(
      child: FitFuelApp(),
    ),
  );
}

class FitFuelApp extends ConsumerWidget {
  const FitFuelApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(appRouterProvider);
    return MaterialApp.router(
      title: 'FitFuel AI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      routerConfig: router,
    );
  }
}
`
  },
  {
    path: 'lib/core/services/gemini_service.dart',
    language: 'dart',
    content: `import 'package:google_generative_ai/google_generative_ai.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final geminiServiceProvider = Provider<GeminiService>((ref) {
  return GeminiService();
});

class GeminiService {
  late final GenerativeModel _textModel;
  
  GeminiService() {
    // In production, inject API Key safely via environment or server proxy
    const apiKey = String.fromEnvironment('GEMINI_API_KEY');
    _textModel = GenerativeModel(
      model: 'gemini-3.6-flash',
      apiKey: apiKey,
    );
  }

  Future<String> askAiCoach(String prompt, Map<String, dynamic> userProfile) async {
    final systemInstruction = '''You are FitFuel AI Coach, an expert fitness trainer and sports nutritionist.
Target User Goal: \${userProfile['fitnessGoal']}, Current Weight: \${userProfile['weightKg']} kg.
Give concise, highly actionable advice.''';

    final response = await _textModel.generateContent([
      Content.text('\$systemInstruction\\n\\nUser question: \$prompt')
    ]);

    return response.text ?? "Keep training hard! You've got this.";
  }
}
`
  },
  {
    path: 'lib/features/workout/presentation/workout_screen.dart',
    language: 'dart',
    content: `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class WorkoutScreen extends ConsumerWidget {
  const WorkoutScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Workout Routines'),
        centerTitle: false,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildHeroWorkoutCard(theme),
          const SizedBox(height: 20),
          Text(
            'Categories',
            style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          // Clean Grid of Workout Categories
        ],
      ),
    );
  }

  Widget _buildHeroWorkoutCard(ThemeData theme) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          colors: [Color(0xFF6366F1), Color(0xFF8B5CF6)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Chip(label: Text('TODAY\\'S WORKOUT')),
          const SizedBox(height: 10),
          const Text(
            'Hypertrophy Chest & Triceps',
            style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          ElevatedButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.play_arrow_rounded),
            label: const Text('Start Session'),
          )
        ],
      ),
    );
  }
}
`
  },
  {
    path: 'android/app/src/main/AndroidManifest.xml',
    language: 'xml',
    content: `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.fitfuel.ai">
    
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.VIBRATE"/>
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>

    <application
        android:label="FitFuel AI"
        android:name="\${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            <meta-data
              android:name="io.flutter.embedding.android.NormalTheme"
              android:resource="@style/NormalTheme" />
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
    </application>
</manifest>
`
  }
];
