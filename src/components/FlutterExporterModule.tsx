import React, { useState } from 'react';
import { flutterCodebase } from '../data/initialData';
import { Copy, Check, FileCode, CheckCircle2, Terminal } from 'lucide-react';

export const FlutterExporterModule: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>(flutterCodebase[0].path);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [copiedListing, setCopiedListing] = useState<boolean>(false);

  const currentFile = flutterCodebase.find(f => f.path === selectedFile) || flutterCodebase[0];

  const handleCopyCode = (code: string, path: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2500);
  };

  const playStoreDescription = `FitFuel AI - AI Personal Trainer, Workout & Nutrition Tracker

Transform your body with FitFuel AI, the ultimate AI-powered personal trainer, workout planner, and macro nutrition tracker built with Google Gemini AI technology and Firebase.

🔥 KEY FEATURES:
• AI Personal Coach: Get 24/7 personalized training, form analysis, and nutrition guidance powered by Gemini 3.6 Flash.
• Custom Workout Generator: Hypertrophy, Fat Loss, HIIT, Strength, Yoga & Bodyweight routines tailored to your equipment and experience.
• Precision Macro Tracker & AI Photo Analyzer: Track Calories, Protein, Carbs, Fat, and Fiber effortlessly. Snap a photo of your meal for instant AI calorie calculation!
• Interactive Exercise Player: Rest timers, set check-offs, audio cue beeps, and technique guides.
• Gamified Streaks & Hydration Tracker: Water intake reminders, level badges, and daily streak tracking.
• Automated Weekly Progress Reports: Downloadable AI reports detailing weight trends, BMI, and calorie deficits.

⚡ TECH STACK & ARCHITECTURE:
• Clean Architecture (Data, Domain, Presentation)
• Flutter & Riverpod State Management
• Firebase Auth, Cloud Firestore & FCM
• Offline Caching with Hive DB

Download FitFuel AI today and fuel your peak performance!`;

  const handleCopyListing = () => {
    navigator.clipboard.writeText(playStoreDescription);
    setCopiedListing(true);
    setTimeout(() => setCopiedListing(false), 2500);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Banner */}
      <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D1FF52] text-[#050506]">
            PLAY STORE READY
          </span>
          <span className="text-xs text-[#D1FF52] font-semibold">Flutter Clean Architecture & Gemini SDK</span>
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight">
          Flutter Production Code & Publishing Hub
        </h2>

        <p className="text-xs text-[#E0E0E6] max-w-2xl leading-relaxed">
          Inspect, copy, or export the production-grade Dart / Flutter source code built with Riverpod state management, Clean Architecture, Firebase, and Gemini AI. Includes Play Store listing metadata and release configuration files!
        </p>
      </div>

      {/* Code Browser & File Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* File Explorer Sidebar */}
        <div className="p-4 rounded-[28px] bg-[#0D0D0F] border border-[#1F1F22] space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] mb-3 px-2">Project Structure</h3>
          {flutterCodebase.map((file) => (
            <button
              key={file.path}
              onClick={() => setSelectedFile(file.path)}
              className={`w-full text-left px-3.5 py-2.5 rounded-full text-xs font-medium flex items-center justify-between transition-all ${
                selectedFile === file.path
                  ? 'bg-[#D1FF52] text-[#050506] font-bold shadow-md shadow-[#D1FF52]/10'
                  : 'text-[#8E8E93] hover:text-white hover:bg-[#161618]'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FileCode className="w-4 h-4 shrink-0" />
                <span className="truncate">{file.path}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Code View Canvas */}
        <div className="lg:col-span-3 rounded-[28px] bg-[#050506] border border-[#1F1F22] overflow-hidden flex flex-col justify-between shadow-2xl">
          
          {/* Header Bar */}
          <div className="p-4 bg-[#0D0D0F] border-b border-[#1F1F22] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#E0E0E6] font-mono">
              <Terminal className="w-4 h-4 text-[#D1FF52]" />
              <span>{currentFile.path}</span>
            </div>

            <button
              onClick={() => handleCopyCode(currentFile.content, currentFile.path)}
              className="px-3.5 py-1.5 rounded-full bg-[#161618] hover:bg-[#1F1F22] text-[#D1FF52] text-xs font-bold border border-[#1F1F22] flex items-center gap-1.5 transition-all"
            >
              {copiedPath === currentFile.path ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#D1FF52]" />
                  <span className="text-[#D1FF52]">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code Body */}
          <div className="p-5 overflow-x-auto max-h-[420px] text-xs font-mono text-[#E0E0E6] leading-relaxed">
            <pre><code>{currentFile.content}</code></pre>
          </div>

          {/* Footer Info */}
          <div className="p-3 bg-[#0D0D0F] border-t border-[#1F1F22] text-[11px] text-[#8E8E93] flex items-center justify-between">
            <span>Language: <strong className="text-[#D1FF52] uppercase">{currentFile.language}</strong></span>
            <span>Architecture: <strong className="text-[#D1FF52]">Clean Architecture (MVVM)</strong></span>
          </div>

        </div>

      </div>

      {/* Play Store Listing & Publishing Checklist */}
      <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1F1F22]">
          <div>
            <h3 className="text-lg font-bold text-white">Google Play Store & App Store Listing</h3>
            <p className="text-xs text-[#8E8E93]">Pre-formatted marketing descriptions & metadata</p>
          </div>

          <button
            onClick={handleCopyListing}
            className="px-4 py-2 rounded-full bg-[#D1FF52] text-[#050506] font-bold text-xs flex items-center gap-2 shadow-md"
          >
            {copiedListing ? <Check className="w-4 h-4 text-[#050506]" /> : <Copy className="w-4 h-4" />}
            <span>{copiedListing ? 'Listing Copied!' : 'Copy Play Store Text'}</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-2xl bg-[#161618] border border-[#1F1F22]">
            <span className="text-[#8E8E93] block mb-1 font-bold uppercase">App Title</span>
            <strong className="text-white text-sm">FitFuel AI - AI Personal Trainer & Workout Tracker</strong>
          </div>

          <div className="p-4 rounded-2xl bg-[#161618] border border-[#1F1F22]">
            <span className="text-[#8E8E93] block mb-1 font-bold uppercase">Short Description (Max 80 chars)</span>
            <strong className="text-[#D1FF52]">AI Personal Trainer, Custom Workouts, Macro Tracker & Gemini AI Coach.</strong>
          </div>

          <div className="p-4 rounded-2xl bg-[#161618] border border-[#1F1F22]">
            <span className="text-[#8E8E93] block mb-1 font-bold uppercase">Full Long Description</span>
            <pre className="text-[#E0E0E6] font-sans whitespace-pre-wrap leading-relaxed text-xs">{playStoreDescription}</pre>
          </div>
        </div>
      </div>

      {/* Step-by-Step Play Store Release Checklist */}
      <div className="p-6 rounded-[32px] bg-[#0D0D0F] border border-[#1F1F22] space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white">Production Release Checklist</h3>
        
        <div className="space-y-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#161618] border border-[#1F1F22] flex items-center gap-3 text-[#E0E0E6]">
            <CheckCircle2 className="w-4 h-4 text-[#D1FF52] shrink-0" />
            <span>Generate Android Upload Keystore: <code className="text-[#D1FF52] bg-[#050506] px-1.5 py-0.5 rounded">keytool -genkey -v -keystore upload-keystore.jks</code></span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#161618] border border-[#1F1F22] flex items-center gap-3 text-[#E0E0E6]">
            <CheckCircle2 className="w-4 h-4 text-[#D1FF52] shrink-0" />
            <span>Build Signed App Bundle: <code className="text-[#D1FF52] bg-[#050506] px-1.5 py-0.5 rounded">flutter build appbundle --release</code></span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#161618] border border-[#1F1F22] flex items-center gap-3 text-[#E0E0E6]">
            <CheckCircle2 className="w-4 h-4 text-[#D1FF52] shrink-0" />
            <span>Place <code className="text-[#D1FF52] bg-[#050506] px-1.5 py-0.5 rounded">google-services.json</code> inside <code className="text-[#D1FF52] bg-[#050506] px-1.5 py-0.5 rounded">android/app/</code> directory</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#161618] border border-[#1F1F22] flex items-center gap-3 text-[#E0E0E6]">
            <CheckCircle2 className="w-4 h-4 text-[#D1FF52] shrink-0" />
            <span>Upload <code className="text-[#D1FF52] bg-[#050506] px-1.5 py-0.5 rounded">app-release.aab</code> to Google Play Console Internal Testing Track</span>
          </div>
        </div>
      </div>

    </div>
  );
};
