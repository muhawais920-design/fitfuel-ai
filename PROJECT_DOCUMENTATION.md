# FitFuel AI — Project Documentation

## Overview
FitFuel AI is a web-based fitness and nutrition companion. The code includes workout routines, meal logging, hydration tracking, progress history, achievements, an AI coach, and a mobile-device preview.

## Problem and Goal
Fitness activities and nutrition records are often managed in separate tools. FitFuel AI aims to bring daily fitness tracking and AI-assisted guidance into one dashboard.

## Main Modules
- Dashboard: fitness profile, today's workout, meals, hydration and shortcuts.
- Workout module: browse routines, start sessions and record completed workouts.
- Nutrition module: log meals and track water intake.
- AI Coach: chat with an AI assistant.
- Progress: view progress history and achievements.
- Settings: appearance preferences and reset functionality.
- Flutter Exporter: a dedicated export module is present in the interface.
- Onboarding and profile management.

## AI API
The Express server integrates the Google GenAI SDK and defines endpoints for coach chat, diet-plan generation, workout-plan generation, meal photo/text analysis, recipe generation and motivation. The server reads GEMINI_API_KEY from the environment. Never commit API keys.

## Technology
- React 19 and TypeScript
- Vite
- Tailwind CSS
- Node.js and Express
- Google GenAI SDK
- Motion, Lucide React and Recharts
- dotenv and esbuild

## Data Handling
The React app initializes profile, workouts, meals, progress history and achievements from browser localStorage or sample data. Profile, meal and progress changes are synchronized to localStorage. The inspected code does not establish a production cloud database.

## Run Locally
Requirements: Node.js and npm.
1. Clone: https://github.com/muhawais920-design/fitfuel-ai
2. Open the project folder and run: npm install
3. Create a root .env file containing GEMINI_API_KEY=your_gemini_api_key
4. Run: npm run dev
5. Open http://localhost:3000

Production: npm run build, then npm start.

## Important Files
- src/App.tsx — app state, navigation, localStorage and module composition.
- src/components/ — dashboard, workouts, nutrition, AI chat, progress and settings UI.
- src/types/ — TypeScript data models.
- src/data/initialData — sample/default data.
- server.ts — Express server and Gemini endpoints.
- package.json — scripts and dependencies.

## Workflow
The user navigates between modules; React state holds current profile and activity data; selected data is persisted in localStorage; AI features send requests to Express endpoints, which call Gemini using the server-side API key.

## Future Improvements
Add secure accounts and cloud synchronization, automated tests, API validation/rate limiting, clearer error states, and safety review for AI-generated health and fitness content. Document the Flutter export workflow.

## Learning Outcomes
React component architecture, TypeScript, browser persistence, REST API integration, environment configuration and generative-AI integration.

## Repository
https://github.com/muhawais920-design/fitfuel-ai
