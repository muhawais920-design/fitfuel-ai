import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini AI client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'FitFuel AI Server' });
});

// AI Personal Coach Chat Endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, profileHistory, context } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGeminiClient();
    const systemInstruction = `You are FitFuel AI Coach, an expert elite fitness trainer, sports nutritionist, and compassionate habit coach.
Provide concise, actionable, evidence-based, encouraging fitness and nutrition advice tailored to the user's goals.
User profile context: ${JSON.stringify(context || {})}
Use clear formatting with bullet points or numbered lists where applicable. Keep responses inspiring and direct (around 150-250 words max unless detailed explanation is requested).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "Keep pushing forward! Every rep counts." });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate AI response' });
  }
});

// AI Diet Plan Generator
app.post('/api/gemini/diet-plan', async (req, res) => {
  try {
    const { goal, calorieTarget, dietPreference, allergies, medicalConditions, weight, targetWeight } = req.body;

    const ai = getGeminiClient();
    const prompt = `Generate a structured 1-day sample high-protein meal plan for a person with:
- Fitness Goal: ${goal || 'Weight Loss'}
- Daily Calorie Target: ${calorieTarget || 2000} kcal
- Diet Preference: ${dietPreference || 'Balanced / Anything'}
- Allergies / Restrictions: ${allergies || 'None'}
- Medical Conditions: ${medicalConditions || 'None'}
- Current Weight: ${weight || 70} kg, Target Weight: ${targetWeight || 65} kg

Return ONLY a valid JSON object with the following structure:
{
  "dayTitle": "Day 1 - High Performance Energy",
  "totalCalories": 2000,
  "macros": { "protein": 150, "carbs": 200, "fat": 60, "fiber": 30 },
  "meals": [
    {
      "time": "Breakfast (8:00 AM)",
      "name": "Meal Name",
      "calories": 450,
      "protein": 35,
      "carbs": 45,
      "fat": 12,
      "description": "Brief description and ingredients",
      "prepTime": "10 mins"
    },
    ... include Breakfast, Lunch, Dinner, Snack
  ],
  "nutritionTip": "Top advice for today"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/diet-plan:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate diet plan' });
  }
});

// AI Workout Plan Generator
app.post('/api/gemini/workout-plan', async (req, res) => {
  try {
    const { goal, experience, workoutDays, location } = req.body;

    const ai = getGeminiClient();
    const prompt = `Generate a customized workout session routine for:
- Goal: ${goal || 'Muscle Building'}
- Experience Level: ${experience || 'Intermediate'}
- Location / Equipment: ${location || 'Gym / Full Equipment'}

Return ONLY a valid JSON object with this exact structure:
{
  "routineTitle": "Hypertrophy Push & Core Blast",
  "targetMuscles": ["Chest", "Shoulders", "Triceps", "Abs"],
  "estimatedDuration": "45 mins",
  "difficulty": "Intermediate",
  "exercises": [
    {
      "name": "Barbell Incline Bench Press",
      "category": "Chest",
      "sets": 4,
      "reps": "8-10",
      "restSeconds": 90,
      "instructions": "Keep shoulder blades retracted and press explosively upwards.",
      "tips": "Focus on upper chest contraction at the top."
    },
    ... generate 5 to 6 varied exercises
  ],
  "warmup": "5 mins light cardio + shoulder arm circles",
  "cooldown": "5 mins static chest and shoulder stretching"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/workout-plan:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate workout plan' });
  }
});

// AI Meal Photo & Text Analyzer
app.post('/api/gemini/analyze-meal', async (req, res) => {
  try {
    const { description, imageBase64 } = req.body;

    const ai = getGeminiClient();

    let contents: any;
    if (imageBase64) {
      // Strip data url prefix if present
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      contents = {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64,
            },
          },
          {
            text: `Analyze this meal image. ${description ? `User description: ${description}.` : ''} Calculate estimated nutritional values.`,
          },
        ],
      };
    } else {
      contents = `Analyze this meal description: "${description || 'A plate of grilled chicken breast with quinoa and steamed broccoli'}". Calculate estimated nutritional values.`;
    }

    const promptInstructions = `
Return ONLY a valid JSON object with the following structure:
{
  "foodName": "Grilled Chicken Quinoa Bowl",
  "calories": 520,
  "protein": 42,
  "carbs": 48,
  "fat": 14,
  "fiber": 6,
  "healthScore": 92,
  "assessment": "Excellent macronutrient ratio! High lean protein and complex carbs.",
  "suggestions": "Consider adding a drizzle of olive oil for essential healthy fats."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: typeof contents === 'string' ? `${contents}\n${promptInstructions}` : {
        parts: [...contents.parts, { text: promptInstructions }]
      },
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/analyze-meal:', error);
    res.status(500).json({ error: error?.message || 'Failed to analyze meal' });
  }
});

// AI Recipes Generator
app.post('/api/gemini/recipes', async (req, res) => {
  try {
    const { ingredients, goal, diet } = req.body;

    const ai = getGeminiClient();
    const prompt = `Generate 3 creative, high-protein healthy recipes using or featuring these ingredients: "${ingredients || 'chicken breast, eggs, spinach, oats, avocado'}".
Target goal: ${goal || 'Muscle Building'}, Diet preference: ${diet || 'High Protein'}.

Return ONLY a JSON array of objects with structure:
[
  {
    "title": "Avocado Spinach Omelette Wrap",
    "prepTime": "15 mins",
    "calories": 380,
    "protein": 28,
    "carbs": 18,
    "fat": 22,
    "ingredients": ["3 whole eggs", "1/2 cup spinach", "1/2 sliced avocado", "Whole wheat tortilla"],
    "steps": ["Beat eggs with salt and pepper", "Sauté spinach in skillet", "Pour eggs over spinach and cook", "Wrap in warm tortilla with avocado"]
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const parsed = JSON.parse(response.text || '[]');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/recipes:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate recipes' });
  }
});

// Daily AI Motivation & Tip
app.post('/api/gemini/motivation', async (req, res) => {
  try {
    const { name, goal, streak } = req.body;

    const ai = getGeminiClient();
    const prompt = `Give a short, powerful, punchy 2-sentence workout motivation quote and 1 quick fitness tip for ${name || 'Athlete'} whose goal is ${goal || 'Fat Loss'} and is currently on a ${streak || 5}-day streak.
Return ONLY JSON: { "quote": "...", "tip": "..." }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.8,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/motivation:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate motivation' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FitFuel AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
