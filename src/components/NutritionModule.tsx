import React, { useState } from 'react';
import { UserProfile, LoggedMeal } from '../types';
import { Sparkles, Camera, Barcode, BookOpen } from 'lucide-react';

interface NutritionModuleProps {
  profile: UserProfile;
  loggedMeals: LoggedMeal[];
  onAddMeal: (meal: LoggedMeal) => void;
  onAddWater: (amountMl: number) => void;
}

export const NutritionModule: React.FC<NutritionModuleProps> = ({
  profile,
  loggedMeals,
  onAddMeal,
}) => {
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [mealDescription, setMealDescription] = useState('');
  const [mealImage, setMealImage] = useState<string | null>(null);
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'>('Lunch');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Recipe Generator state
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState('chicken breast, eggs, spinach, oats, avocado');
  const [isGeneratingRecipes, setIsGeneratingRecipes] = useState(false);
  const [generatedRecipes, setGeneratedRecipes] = useState<any[]>([]);

  // Barcode Scanner Modal State
  const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);

  // Totals
  const totalCalories = loggedMeals.reduce((s, m) => s + m.calories, 0);
  const totalProtein = loggedMeals.reduce((s, m) => s + m.protein, 0);
  const totalCarbs = loggedMeals.reduce((s, m) => s + m.carbs, 0);
  const totalFat = loggedMeals.reduce((s, m) => s + m.fat, 0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMealImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealDescription && !mealImage) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/gemini/analyze-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: mealDescription,
          imageBase64: mealImage,
        }),
      });

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error('Failed to analyze meal:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConfirmAddMeal = () => {
    if (analysisResult) {
      const newMeal: LoggedMeal = {
        id: `meal-${Date.now()}`,
        mealType,
        name: analysisResult.foodName || 'AI Logged Meal',
        calories: Number(analysisResult.calories) || 400,
        protein: Number(analysisResult.protein) || 30,
        carbs: Number(analysisResult.carbs) || 40,
        fat: Number(analysisResult.fat) || 12,
        fiber: Number(analysisResult.fiber) || 5,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        assessment: analysisResult.assessment,
      };

      onAddMeal(newMeal);
      setIsAnalyzerOpen(false);
      setAnalysisResult(null);
      setMealDescription('');
      setMealImage(null);
    }
  };

  const handleGenerateRecipes = async () => {
    setIsGeneratingRecipes(true);
    try {
      const res = await fetch('/api/gemini/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: recipeIngredients,
          goal: profile.fitnessGoal,
          diet: profile.dietPreference,
        }),
      });
      const data = await res.json();
      setGeneratedRecipes(data);
    } catch (err) {
      console.error('Failed to generate recipes:', err);
    } finally {
      setIsGeneratingRecipes(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Nutrition Tracker</h2>
          <p className="text-xs text-[#8E8E93]">Macro balance & AI Meal Analysis</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBarcodeOpen(true)}
            className="p-2.5 rounded-full bg-[#0D0D0F] hover:bg-[#161618] border border-[#1F1F22] text-[#E0E0E6] transition-all"
            title="Scan Barcode"
          >
            <Barcode className="w-4 h-4 text-[#D1FF52]" />
          </button>

          <button
            onClick={() => setIsAnalyzerOpen(true)}
            className="px-4 py-2.5 rounded-full bg-[#D1FF52] hover:bg-[#c2f043] text-[#050506] font-extrabold text-xs shadow-[0_0_20px_rgba(209,255,82,0.3)] flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#050506]" />
            <span>AI Meal Analyzer</span>
          </button>
        </div>
      </div>

      {/* Macros Overview Card */}
      <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">DAILY MACRONUTRIENT BREAKDOWN</span>
          <span className="text-xs font-semibold text-[#D1FF52]">{totalCalories} / {profile.targetCalories} kcal</span>
        </div>

        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-[#161618] border border-[#1F1F22]">
            <span className="text-[10px] text-[#8E8E93] block mb-1">Calories</span>
            <strong className="text-lg font-black text-white">{totalCalories}</strong>
            <span className="text-[9px] text-[#8E8E93] block">kcal</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#161618] border border-[#1F1F22]">
            <span className="text-[10px] text-[#8E8E93] block mb-1">Protein</span>
            <strong className="text-lg font-black text-[#D1FF52]">{totalProtein}g</strong>
            <span className="text-[9px] text-[#8E8E93] block">/ {profile.targetProteinG}g</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#161618] border border-[#1F1F22]">
            <span className="text-[10px] text-[#8E8E93] block mb-1">Carbs</span>
            <strong className="text-lg font-black text-white">{totalCarbs}g</strong>
            <span className="text-[9px] text-[#8E8E93] block">/ {profile.targetCarbsG}g</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#161618] border border-[#1F1F22]">
            <span className="text-[10px] text-[#8E8E93] block mb-1">Fat</span>
            <strong className="text-lg font-black text-white">{totalFat}g</strong>
            <span className="text-[9px] text-[#8E8E93] block">/ {profile.targetFatG}g</span>
          </div>
        </div>
      </div>

      {/* Recipe Finder Quick Trigger Banner */}
      <div className="p-5 rounded-[28px] bg-[#0D0D0F] border border-[#1F1F22] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#161618] border border-[#1F1F22] text-[#D1FF52]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">AI Healthy Recipe Generator</h4>
            <p className="text-xs text-[#8E8E93]">Input ingredients to get high-protein recipes</p>
          </div>
        </div>

        <button
          onClick={() => setIsRecipeModalOpen(true)}
          className="px-4 py-2 rounded-full bg-[#161618] hover:bg-[#1F1F22] border border-[#1F1F22] text-[#D1FF52] font-bold text-xs shadow-md whitespace-nowrap"
        >
          Suggest Recipes
        </button>
      </div>

      {/* Logged Meals List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">Today's Meals</h3>

        {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((category) => {
          const mealsInCategory = loggedMeals.filter(m => m.mealType === category);
          const categoryCals = mealsInCategory.reduce((s, m) => s + m.calories, 0);

          return (
            <div key={category} className="p-5 rounded-[28px] bg-[#0D0D0F] border border-[#1F1F22] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1F1F22]">
                <span className="text-xs font-bold text-white">{category}</span>
                <span className="text-xs text-[#8E8E93] font-medium">{categoryCals} kcal</span>
              </div>

              {mealsInCategory.length === 0 ? (
                <p className="text-xs text-[#8E8E93] italic">No items logged yet.</p>
              ) : (
                <div className="space-y-2">
                  {mealsInCategory.map((meal) => (
                    <div key={meal.id} className="p-3.5 rounded-2xl bg-[#161618] border border-[#1F1F22] flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white">{meal.name}</h4>
                        <span className="text-[10px] text-[#8E8E93]">
                          P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#D1FF52]">{meal.calories} kcal</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Meal Photo & Text Analyzer Modal */}
      {isAnalyzerOpen && (
        <div className="fixed inset-0 z-50 bg-[#050506]/90 backdrop-blur-md p-4 flex items-center justify-center">
          <div className="bg-[#0D0D0F] border border-[#1F1F22] rounded-[32px] p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto text-[#E0E0E6]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F1F22]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D1FF52]" />
                <h3 className="text-lg font-bold text-white">AI Meal Photo & Text Analyzer</h3>
              </div>
              <button onClick={() => setIsAnalyzerOpen(false)} className="text-xs text-[#8E8E93] hover:text-white">Close</button>
            </div>

            <form onSubmit={handleAnalyzeMeal} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#8E8E93] mb-1">Meal Type</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161618] border border-[#1F1F22] text-xs text-white"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snacks">Snacks</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8E8E93] mb-1">Upload Photo or Take Snap</label>
                <div className="relative border-2 border-dashed border-[#1F1F22] rounded-2xl p-4 text-center hover:border-[#D1FF52]/50 transition-colors">
                  {mealImage ? (
                    <div className="relative max-h-40 overflow-hidden rounded-xl">
                      <img src={mealImage} alt="Uploaded meal" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setMealImage(null)}
                        className="absolute top-2 right-2 px-2 py-1 rounded-md bg-[#050506]/80 text-[10px] text-white"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center gap-1">
                      <Camera className="w-6 h-6 text-[#D1FF52]" />
                      <span className="text-xs font-semibold text-[#E0E0E6]">Choose meal image file</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#8E8E93] mb-1">Meal Description / Ingredients</label>
                <textarea
                  rows={2}
                  placeholder="e.g., Grilled chicken breast (200g) with 1 cup brown rice and steamed broccoli..."
                  value={mealDescription}
                  onChange={(e) => setMealDescription(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[#161618] border border-[#1F1F22] text-xs text-white focus:outline-none focus:border-[#D1FF52]"
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-3 rounded-full bg-[#D1FF52] text-[#050506] font-bold text-xs shadow-lg shadow-[rgba(209,255,82,0.3)] flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <span>Analyzing with Gemini 3.6 Flash...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#050506]" />
                    <span>Calculate Nutritional Values</span>
                  </>
                )}
              </button>
            </form>

            {/* Analysis Result */}
            {analysisResult && (
              <div className="p-4 rounded-2xl bg-[#161618] border border-[#1F1F22] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-white">{analysisResult.foodName}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D1FF52]/10 text-[#D1FF52] text-[10px] font-bold border border-[#D1FF52]/30">
                    Health Score: {analysisResult.healthScore || 90}/100
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-[#0D0D0F] border border-[#1F1F22]">
                    <span className="text-[10px] text-[#8E8E93] block">Calories</span>
                    <strong className="text-white font-bold">{analysisResult.calories} kcal</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#0D0D0F] border border-[#1F1F22]">
                    <span className="text-[10px] text-[#8E8E93] block">Protein</span>
                    <strong className="text-[#D1FF52] font-bold">{analysisResult.protein}g</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#0D0D0F] border border-[#1F1F22]">
                    <span className="text-[10px] text-[#8E8E93] block">Carbs</span>
                    <strong className="text-white font-bold">{analysisResult.carbs}g</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#0D0D0F] border border-[#1F1F22]">
                    <span className="text-[10px] text-[#8E8E93] block">Fat</span>
                    <strong className="text-white font-bold">{analysisResult.fat}g</strong>
                  </div>
                </div>

                {analysisResult.assessment && (
                  <p className="text-xs text-[#E0E0E6] italic">"{analysisResult.assessment}"</p>
                )}

                <button
                  onClick={handleConfirmAddMeal}
                  className="w-full py-2.5 rounded-full bg-[#D1FF52] text-[#050506] font-bold text-xs"
                >
                  Add to Today's {mealType} Log
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Healthy Recipe Generator Modal */}
      {isRecipeModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050506]/90 backdrop-blur-md p-4 flex items-center justify-center">
          <div className="bg-[#0D0D0F] border border-[#1F1F22] rounded-[32px] p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto text-[#E0E0E6]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F1F22]">
              <h3 className="text-lg font-bold text-white">AI Recipe Generator</h3>
              <button onClick={() => setIsRecipeModalOpen(false)} className="text-xs text-[#8E8E93] hover:text-white">Close</button>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8E8E93] mb-1">Available Ingredients</label>
              <input
                type="text"
                value={recipeIngredients}
                onChange={(e) => setRecipeIngredients(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[#161618] border border-[#1F1F22] text-xs text-white"
              />
            </div>

            <button
              onClick={handleGenerateRecipes}
              disabled={isGeneratingRecipes}
              className="w-full py-3 rounded-full bg-[#D1FF52] text-[#050506] font-bold text-xs"
            >
              {isGeneratingRecipes ? 'Generating Recipes...' : 'Generate High-Protein Recipes'}
            </button>

            {generatedRecipes.length > 0 && (
              <div className="space-y-3 pt-2">
                {generatedRecipes.map((rec, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#161618] border border-[#1F1F22] space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{rec.title}</h4>
                      <span className="text-[10px] text-[#D1FF52] font-bold">{rec.calories} kcal</span>
                    </div>
                    <p className="text-[11px] text-[#8E8E93]">P: {rec.protein}g • C: {rec.carbs}g • F: {rec.fat}g</p>
                    <div className="text-[10px] text-[#E0E0E6] space-y-1">
                      <strong>Ingredients:</strong> {rec.ingredients?.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Barcode Scanner Modal Placeholder */}
      {isBarcodeOpen && (
        <div className="fixed inset-0 z-50 bg-[#050506]/90 backdrop-blur-md p-4 flex items-center justify-center">
          <div className="bg-[#0D0D0F] border border-[#1F1F22] rounded-[32px] p-6 max-w-sm w-full text-center space-y-4">
            <Barcode className="w-12 h-12 text-[#D1FF52] mx-auto animate-pulse" />
            <h3 className="text-lg font-bold text-white">Camera Barcode Scanner</h3>
            <p className="text-xs text-[#8E8E93]">Align food barcode within frame to fetch instant USDA macro data.</p>
            <div className="h-32 bg-[#161618] rounded-2xl border border-[#1F1F22] flex items-center justify-center text-xs text-[#D1FF52] font-mono">
              [ SCANNING ACTIVE ]
            </div>
            <button onClick={() => setIsBarcodeOpen(false)} className="w-full py-2.5 rounded-full bg-[#161618] border border-[#1F1F22] text-xs font-bold text-[#E0E0E6]">
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
