import React, { useState, useEffect } from 'react';
import { WorkoutRoutine } from '../types';
import { Dumbbell, Search, Play, Clock, Flame, Check, Sparkles, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WorkoutModuleProps {
  routines: WorkoutRoutine[];
  onFinishWorkout: (routine: WorkoutRoutine) => void;
  activeWorkout: WorkoutRoutine | null;
  setActiveWorkout: (routine: WorkoutRoutine | null) => void;
}

export const WorkoutModule: React.FC<WorkoutModuleProps> = ({
  routines,
  onFinishWorkout,
  activeWorkout,
  setActiveWorkout,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Active Workout Mode State
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [completedSetsMap, setCompletedSetsMap] = useState<Record<string, boolean[]>>({});
  const [restTimeLeft, setRestTimeLeft] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'HIIT', 'Cardio', 'Yoga', 'Stretching'];

  // Filter Routines
  const filteredRoutines = routines.filter(r => {
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.exercises.some(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Active Workout Timer Effect
  useEffect(() => {
    let timer: any;
    if (isResting && restTimeLeft > 0) {
      timer = setInterval(() => {
        setRestTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isResting && restTimeLeft === 0) {
      setIsResting(false);
      playBeep();
    }
    return () => clearInterval(timer);
  }, [isResting, restTimeLeft]);

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      // AudioContext fallback
    }
  };

  const handleStartRoutine = (routine: WorkoutRoutine) => {
    setActiveWorkout(routine);
    setCurrentExerciseIndex(0);
    setIsFinished(false);
    
    const initialMap: Record<string, boolean[]> = {};
    routine.exercises.forEach(ex => {
      initialMap[ex.id] = new Array(ex.sets).fill(false);
    });
    setCompletedSetsMap(initialMap);
  };

  const toggleSetCompleted = (exerciseId: string, setIndex: number, restSeconds: number) => {
    setCompletedSetsMap(prev => {
      const currentArr = [...(prev[exerciseId] || [])];
      const newStatus = !currentArr[setIndex];
      currentArr[setIndex] = newStatus;

      if (newStatus) {
        setRestTimeLeft(restSeconds || 60);
        setIsResting(true);
      }

      return { ...prev, [exerciseId]: currentArr };
    });
  };

  const handleCompleteWorkout = () => {
    if (activeWorkout) {
      setIsFinished(true);
      onFinishWorkout(activeWorkout);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Active Workout Session Player */}
      {activeWorkout && !isFinished && (
        <div className="fixed inset-0 z-50 bg-[#050506]/98 backdrop-blur-2xl p-4 sm:p-6 overflow-y-auto text-[#E0E0E6] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1F1F22]">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D1FF52]">ACTIVE SESSION</span>
              <h2 className="text-xl font-extrabold text-white">{activeWorkout.title}</h2>
            </div>
            <button
              onClick={() => setActiveWorkout(null)}
              className="px-4 py-2 rounded-full bg-[#161618] hover:bg-[#1F1F22] border border-[#1F1F22] text-xs font-bold text-[#E0E0E6]"
            >
              Exit Workout
            </button>
          </div>

          {/* Current Exercise Display */}
          {activeWorkout.exercises[currentExerciseIndex] && (
            <div className="my-6 flex-1 max-w-2xl mx-auto w-full space-y-6">
              
              {/* Exercise Banner */}
              <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] text-center relative overflow-hidden shadow-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1FF52]/10 text-[#D1FF52] text-xs font-bold mb-3 border border-[#D1FF52]/30">
                  <span>Exercise {currentExerciseIndex + 1} of {activeWorkout.exercises.length}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {activeWorkout.exercises[currentExerciseIndex].name}
                </h3>

                <p className="text-xs text-[#8E8E93] font-medium">
                  Equipment: {activeWorkout.exercises[currentExerciseIndex].equipment} • Target: {activeWorkout.exercises[currentExerciseIndex].targetMuscles.join(', ')}
                </p>

                {/* Rest Timer Banner */}
                {isResting && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#D1FF52]/10 border border-[#D1FF52]/40 flex items-center justify-between animate-pulse">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#D1FF52] animate-spin" />
                      <span className="text-xs font-bold text-[#D1FF52]">REST TIMER: {restTimeLeft}s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setRestTimeLeft(prev => prev + 30)}
                        className="px-3 py-1 rounded-full bg-[#D1FF52]/20 text-[#D1FF52] text-xs font-bold border border-[#D1FF52]/30"
                      >
                        +30s
                      </button>
                      <button
                        onClick={() => setIsResting(false)}
                        className="px-3 py-1 rounded-full bg-[#D1FF52] text-[#050506] text-xs font-bold"
                      >
                        Skip Rest
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Set Tracker Table */}
              <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">Sets & Reps Tracker</h4>
                <div className="space-y-2">
                  {Array.from({ length: activeWorkout.exercises[currentExerciseIndex].sets }).map((_, setIdx) => {
                    const exId = activeWorkout.exercises[currentExerciseIndex].id;
                    const isChecked = completedSetsMap[exId]?.[setIdx] || false;
                    return (
                      <div
                        key={setIdx}
                        onClick={() => toggleSetCompleted(exId, setIdx, activeWorkout.exercises[currentExerciseIndex].restSeconds)}
                        className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-[#D1FF52]/10 border-[#D1FF52] text-[#D1FF52]'
                            : 'bg-[#161618] border-[#1F1F22] text-[#E0E0E6] hover:border-[#2A2A2E]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold">SET {setIdx + 1}</span>
                          <span className="text-xs text-[#8E8E93]">Target: {activeWorkout.exercises[currentExerciseIndex].reps} Reps</span>
                        </div>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                          isChecked ? 'bg-[#D1FF52] border-[#D1FF52] text-[#050506]' : 'border-[#1F1F22]'
                        }`}>
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] space-y-2 text-xs text-[#E0E0E6]">
                <h4 className="font-bold uppercase tracking-wider text-[#8E8E93]">Execution Technique</h4>
                <ul className="list-disc list-inside space-y-1 text-[#8E8E93]">
                  {activeWorkout.exercises[currentExerciseIndex].instructions.map((inst, i) => (
                    <li key={i} className="text-[#E0E0E6]">{inst}</li>
                  ))}
                </ul>
              </div>

              {/* Stepper Navigation */}
              <div className="flex items-center justify-between gap-3 pt-4">
                <button
                  disabled={currentExerciseIndex === 0}
                  onClick={() => setCurrentExerciseIndex(prev => Math.max(0, prev - 1))}
                  className="px-5 py-3.5 rounded-full bg-[#161618] border border-[#1F1F22] disabled:opacity-40 text-xs font-bold text-[#E0E0E6]"
                >
                  Previous
                </button>

                {currentExerciseIndex < activeWorkout.exercises.length - 1 ? (
                  <button
                    onClick={() => setCurrentExerciseIndex(prev => prev + 1)}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#D1FF52] hover:bg-[#c2f043] text-[#050506] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(209,255,82,0.3)]"
                  >
                    <span>Next Exercise</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteWorkout}
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#D1FF52] hover:bg-[#c2f043] text-[#050506] font-black text-xs shadow-[0_0_25px_rgba(209,255,82,0.4)]"
                  >
                    Complete Workout Session 🎉
                  </button>
                )}
              </div>

            </div>
          )}
        </div>
      )}

      {/* Completion Modal */}
      {isFinished && activeWorkout && (
        <div className="fixed inset-0 z-50 bg-[#050506]/90 backdrop-blur-md p-6 flex items-center justify-center">
          <div className="bg-[#0D0D0F] border border-[#1F1F22] rounded-[32px] p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-[#D1FF52]/10 border border-[#D1FF52]/40 text-[#D1FF52] flex items-center justify-center mx-auto animate-bounce">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">Workout Complete!</h3>
              <p className="text-xs text-[#8E8E93] mt-1">
                You crushed <strong className="text-[#D1FF52]">{activeWorkout.title}</strong>!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#161618] border border-[#1F1F22] text-xs">
              <div>
                <span className="text-[#8E8E93] block">Est. Burned</span>
                <strong className="text-[#D1FF52] font-bold text-base">{activeWorkout.caloriesBurned} kcal</strong>
              </div>
              <div>
                <span className="text-[#8E8E93] block">Duration</span>
                <strong className="text-white font-bold text-base">{activeWorkout.estimatedDuration}</strong>
              </div>
            </div>

            <button
              onClick={() => {
                setIsFinished(false);
                setActiveWorkout(null);
              }}
              className="w-full py-3.5 rounded-full bg-[#D1FF52] text-[#050506] font-bold text-sm shadow-[0_0_20px_rgba(209,255,82,0.3)]"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Top Search & Category Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Workout Routines</h2>
            <p className="text-xs text-[#8E8E93]">Targeted programs for every goal & muscle group</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8E8E93] absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search exercises or routines (e.g. Chest, HIIT, Legs)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[#0D0D0F] border border-[#1F1F22] text-xs text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#D1FF52]"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D1FF52] text-[#050506] shadow-[0_0_15px_rgba(209,255,82,0.3)]'
                  : 'bg-[#0D0D0F] border border-[#1F1F22] text-[#8E8E93] hover:text-white hover:bg-[#161618]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Routine Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoutines.map((routine) => (
          <div
            key={routine.id}
            className="rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] overflow-hidden shadow-xl hover:border-[#D1FF52]/40 transition-all flex flex-col justify-between group"
          >
            {/* Banner Image Header */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={routine.bannerImage}
                alt={routine.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] via-[#0D0D0F]/40 to-transparent" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#050506]/80 backdrop-blur-md text-white border border-[#1F1F22]">
                  {routine.category}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D1FF52]/80 backdrop-blur-md text-[#050506]">
                  {routine.difficulty}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-semibold">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D1FF52]" />
                  <span>{routine.estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#D1FF52]">
                  <Flame className="w-3.5 h-3.5 text-[#D1FF52]" />
                  <span>{routine.caloriesBurned} kcal</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{routine.title}</h3>
                <p className="text-xs text-[#8E8E93] line-clamp-2">
                  Includes: {routine.exercises.map(e => e.name).join(', ')}
                </p>
              </div>

              <button
                onClick={() => handleStartRoutine(routine)}
                className="w-full py-3 rounded-full bg-[#D1FF52] hover:bg-[#c2f043] text-[#050506] font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-[#050506]" />
                <span>Start Session</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
