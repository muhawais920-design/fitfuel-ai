import React, { useState } from 'react';
import { UserProfile, ChatMessage } from '../types';
import { Bot, Send, Sparkles, Dumbbell, Utensils } from 'lucide-react';

interface AiCoachChatProps {
  profile: UserProfile;
}

export const AiCoachChat: React.FC<AiCoachChatProps> = ({ profile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${profile.name}! I am your FitFuel AI Personal Coach. I have analyzed your profile: goal is **${profile.fitnessGoal}**, target calories are **${profile.targetCalories} kcal**, and experience is **${profile.workoutExperience}**.\n\nHow can I help fuel your performance today? You can ask me for a custom diet plan, workout routine, or form advice!`,
      timestamp: 'Just now',
      suggestions: [
        'Generate a 1-day diet plan for my goal',
        'Suggest a 45-min chest & shoulder routine',
        'How much water should I drink during workouts?',
        'How to prevent knee pain during squatting?'
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // AI Diet Plan Modal
  const [isDietModalOpen, setIsDietModalOpen] = useState(false);
  const [isGeneratingDiet, setIsGeneratingDiet] = useState(false);
  const [generatedDietPlan, setGeneratedDietPlan] = useState<any>(null);

  // AI Workout Plan Modal
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isGeneratingWorkout, setIsGeneratingWorkout] = useState(false);
  const [generatedWorkoutPlan, setGeneratedWorkoutPlan] = useState<any>(null);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            name: profile.name,
            goal: profile.fitnessGoal,
            targetCalories: profile.targetCalories,
            weightKg: profile.weightKg,
            dietPreference: profile.dietPreference,
            workoutExperience: profile.workoutExperience,
          },
        }),
      });

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || 'Keep training hard! Stay consistent and hydrated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Failed to send AI chat message:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Sorry, I encountered an issue connecting to Gemini. Please try again.',
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateDietPlan = async () => {
    setIsGeneratingDiet(true);
    try {
      const res = await fetch('/api/gemini/diet-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: profile.fitnessGoal,
          calorieTarget: profile.targetCalories,
          dietPreference: profile.dietPreference,
          allergies: profile.allergies,
          medicalConditions: profile.medicalConditions,
          weight: profile.weightKg,
          targetWeight: profile.targetWeightKg,
        }),
      });

      const data = await res.json();
      setGeneratedDietPlan(data);
    } catch (err) {
      console.error('Error generating diet plan:', err);
    } finally {
      setIsGeneratingDiet(false);
    }
  };

  const handleGenerateWorkoutPlan = async () => {
    setIsGeneratingWorkout(true);
    try {
      const res = await fetch('/api/gemini/workout-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: profile.fitnessGoal,
          experience: profile.workoutExperience,
          location: 'Gym & Free Weights',
        }),
      });

      const data = await res.json();
      setGeneratedWorkoutPlan(data);
    } catch (err) {
      console.error('Error generating workout plan:', err);
    } finally {
      setIsGeneratingWorkout(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">AI Personal Coach</h2>
          <p className="text-xs text-[#8E8E93]">Powered by Gemini 3.6 Flash</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { setIsDietModalOpen(true); handleGenerateDietPlan(); }}
            className="px-3.5 py-2 rounded-full bg-[#0D0D0F] hover:bg-[#161618] border border-[#1F1F22] text-xs font-bold text-[#E0E0E6] flex items-center gap-1.5 transition-all"
          >
            <Utensils className="w-3.5 h-3.5 text-[#D1FF52]" />
            <span>AI Diet Plan</span>
          </button>

          <button
            onClick={() => { setIsWorkoutModalOpen(true); handleGenerateWorkoutPlan(); }}
            className="px-3.5 py-2 rounded-full bg-[#0D0D0F] hover:bg-[#161618] border border-[#1F1F22] text-xs font-bold text-[#E0E0E6] flex items-center gap-1.5 transition-all"
          >
            <Dumbbell className="w-3.5 h-3.5 text-[#D1FF52]" />
            <span>AI Workout Plan</span>
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] p-4 sm:p-6 shadow-xl flex flex-col min-h-[500px] justify-between">
        
        {/* Messages Scroll Area */}
        <div className="space-y-4 mb-4 overflow-y-auto max-h-[420px] pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-[#161618] border border-[#1F1F22] text-white font-bold text-xs' 
                  : 'bg-[#D1FF52] text-[#050506]'
              }`}>
                {msg.sender === 'user' ? 'You' : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[82%] rounded-[24px] p-4 text-xs leading-relaxed space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-[#D1FF52] text-[#050506] font-medium'
                  : 'bg-[#161618] border border-[#1F1F22] text-[#E0E0E6]'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className={`text-[9px] block text-right ${msg.sender === 'user' ? 'text-[#050506]/60' : 'text-[#8E8E93]'}`}>{msg.timestamp}</span>

                {/* Quick Suggestion Pills */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(sug)}
                        className="px-3 py-1.5 rounded-full bg-[#0D0D0F] hover:bg-[#161618] text-[#D1FF52] border border-[#D1FF52]/30 text-[10px] font-bold transition-all text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D1FF52] flex items-center justify-center text-[#050506]">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-[#161618] border border-[#1F1F22] text-xs text-[#8E8E93] italic">
                AI Coach is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="flex items-center gap-2 pt-3 border-t border-[#1F1F22]"
        >
          <input
            type="text"
            placeholder="Ask AI Coach anything (e.g., 'Fix my bench press form')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-full bg-[#161618] border border-[#1F1F22] text-xs text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#D1FF52]"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3.5 rounded-full bg-[#D1FF52] disabled:opacity-50 text-[#050506] font-bold text-xs shadow-[0_0_15px_rgba(209,255,82,0.3)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

      {/* AI Diet Plan Modal */}
      {isDietModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050506]/90 backdrop-blur-md p-4 flex items-center justify-center">
          <div className="bg-[#0D0D0F] border border-[#1F1F22] rounded-[32px] p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto text-[#E0E0E6]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F1F22]">
              <h3 className="text-lg font-bold text-white">Custom AI Diet Plan</h3>
              <button onClick={() => setIsDietModalOpen(false)} className="text-xs text-[#8E8E93] hover:text-white">Close</button>
            </div>

            {isGeneratingDiet ? (
              <div className="p-8 text-center text-xs text-[#D1FF52]">
                <Sparkles className="w-8 h-8 animate-spin mx-auto mb-2 text-[#D1FF52]" />
                <span>Crafting personalized meal plan with Gemini 3.6 Flash...</span>
              </div>
            ) : generatedDietPlan ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#161618] border border-[#1F1F22]">
                  <h4 className="text-sm font-bold text-white mb-1">{generatedDietPlan.dayTitle || 'Daily Custom Meal Plan'}</h4>
                  <p className="text-xs text-[#D1FF52]">Target Calories: {generatedDietPlan.totalCalories || profile.targetCalories} kcal</p>
                </div>

                <div className="space-y-3">
                  {generatedDietPlan.meals?.map((m: any, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#161618] border border-[#1F1F22] space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-white">{m.time} - {m.name}</strong>
                        <span className="text-[#D1FF52] font-bold">{m.calories} kcal</span>
                      </div>
                      <p className="text-[11px] text-[#8E8E93]">{m.description}</p>
                      <span className="text-[10px] text-[#D1FF52] block">P: {m.protein}g • C: {m.carbs}g • F: {m.fat}g</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* AI Workout Plan Modal */}
      {isWorkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050506]/90 backdrop-blur-md p-4 flex items-center justify-center">
          <div className="bg-[#0D0D0F] border border-[#1F1F22] rounded-[32px] p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto text-[#E0E0E6]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F1F22]">
              <h3 className="text-lg font-bold text-white">Custom AI Workout Routine</h3>
              <button onClick={() => setIsWorkoutModalOpen(false)} className="text-xs text-[#8E8E93] hover:text-white">Close</button>
            </div>

            {isGeneratingWorkout ? (
              <div className="p-8 text-center text-xs text-[#D1FF52]">
                <Dumbbell className="w-8 h-8 animate-bounce mx-auto mb-2 text-[#D1FF52]" />
                <span>Generating tailored exercises with Gemini 3.6 Flash...</span>
              </div>
            ) : generatedWorkoutPlan ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#161618] border border-[#1F1F22]">
                  <h4 className="text-sm font-bold text-white mb-1">{generatedWorkoutPlan.routineTitle}</h4>
                  <p className="text-xs text-[#D1FF52]">Target: {generatedWorkoutPlan.targetMuscles?.join(', ')} • {generatedWorkoutPlan.estimatedDuration}</p>
                </div>

                <div className="space-y-2">
                  {generatedWorkoutPlan.exercises?.map((ex: any, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#161618] border border-[#1F1F22] space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-white">{ex.name}</strong>
                        <span className="text-[#D1FF52] font-bold">{ex.sets} Sets x {ex.reps} Reps</span>
                      </div>
                      <p className="text-[11px] text-[#8E8E93]">{ex.instructions}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

    </div>
  );
};
