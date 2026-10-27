import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Key, 
  Sparkles, 
  Cpu, 
  Volume2, 
  CheckCircle2, 
  ExternalLink,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';

export function SettingsModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('university_gemini_key') || '');
  const [aiMode, setAiMode] = useState(() => localStorage.getItem('university_ai_mode') || 'auto'); // 'auto' | 'offline_only'
  const [speechRate, setSpeechRate] = useState(() => localStorage.getItem('university_speech_rate') || '1');
  const [savedMessage, setSavedMessage] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (apiKey) {
      localStorage.setItem('university_gemini_key', apiKey.trim());
    } else {
      localStorage.removeItem('university_gemini_key');
    }
    localStorage.setItem('university_ai_mode', aiMode);
    localStorage.setItem('university_speech_rate', speechRate);

    setSavedMessage(true);
    setTimeout(() => {
      setSavedMessage(false);
      onClose();
    }, 1000);
  };

  const handleTestVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Hello! This is the Apex University Virtual Assistant voice.");
      utterance.rate = Number(speechRate);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel border border-white/10 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-brand-600/20 text-brand-400 border border-brand-500/30">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Engine & Voice Settings</h2>
            <p className="text-xs text-slate-400">Configure LLM intelligence provider and assistant audio</p>
          </div>
        </div>

        {savedMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          {/* AI Mode Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-2">AI Execution Mode</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAiMode('auto')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  aiMode === 'auto'
                    ? 'bg-brand-600/20 border-brand-500 text-white shadow-md shadow-brand-500/10'
                    : 'bg-slate-900 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                  <span className="text-xs font-bold text-white">Gemini + KB Fallback</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Uses Gemini AI when API key is provided, with instant verified university KB fallback.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setAiMode('offline_only')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  aiMode === 'offline_only'
                    ? 'bg-brand-600/20 border-brand-500 text-white shadow-md shadow-brand-500/10'
                    : 'bg-slate-900 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Knowledge Base Only</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Zero external API calls. 100% deterministic official university handbook answers.
                </p>
              </button>
            </div>
          </div>

          {/* Gemini API Key */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-brand-400" />
                Google Gemini API Key (Optional)
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-brand-400 hover:text-brand-300 flex items-center gap-1"
              >
                Get Free Key <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              If left blank, the chatbot uses the built-in verified university dataset covering all 20+ topics seamlessly!
            </p>
          </div>

          {/* Speech Synthesis Settings */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-brand-400" />
                Text-to-Speech Speed ({speechRate}x)
              </label>
              <button
                type="button"
                onClick={handleTestVoice}
                className="text-[11px] text-brand-400 hover:text-brand-300 font-medium"
              >
                ▶ Test Voice
              </button>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.5"
              step="0.05"
              value={speechRate}
              onChange={(e) => setSpeechRate(e.target.value)}
              className="w-full accent-brand-500 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition-all"
            >
              Save Configuration
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
