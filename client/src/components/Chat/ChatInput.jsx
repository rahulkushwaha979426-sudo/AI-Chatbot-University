import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  Paperclip, 
  ArrowUp,
  HelpCircle
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "What are the eligibility criteria for B.Tech admissions?",
  "Tell me about merit scholarships and tuition waivers.",
  "What is the minimum attendance requirement for exams?",
  "Show me hostel fees, room types, and mess facilities.",
  "What are the latest placement statistics and top recruiters?",
  "How is the CGPA and 10-point relative grade calculated?",
  "What are the library timings and digital IEEE access?",
  "Emergency helpline and anti-ragging contact numbers"
];

export function ChatInput({ onSendMessage, loading, disabled }) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Speech recognition start failed:', err);
      }
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || loading || disabled) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePromptClick = (prompt) => {
    onSendMessage(prompt);
  };

  // Auto resize textarea
  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4">
      {/* Quick Prompt Chips */}
      <div className="mb-3 flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none no-scrollbar">
        <span className="shrink-0 text-[11px] font-semibold text-slate-400 flex items-center gap-1 mr-1">
          <Sparkles className="w-3 h-3 text-brand-400" /> Suggested:
        </span>
        {SUGGESTED_PROMPTS.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePromptClick(prompt)}
            disabled={loading}
            className="shrink-0 text-xs px-3 py-1 rounded-full bg-slate-900/80 hover:bg-brand-600/20 text-slate-300 hover:text-white border border-white/5 hover:border-brand-500/30 transition-all text-left truncate max-w-xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Main Input Box */}
      <div className="relative rounded-2xl glass-panel border border-white/10 shadow-2xl p-2 transition-all focus-within:border-brand-500/50 focus-within:ring-2 focus-within:ring-brand-500/20">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            title={isListening ? "Listening... Click to stop" : "Speak your query"}
            className={`p-2.5 rounded-xl transition-all ${
              isListening
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={isListening ? "Listening to your voice..." : "Ask about admissions, exams, hostel, fees, scholarships, placements..."}
            className="w-full py-2 bg-transparent text-sm text-slate-100 placeholder-slate-500 resize-none focus:outline-none max-h-36 font-sans leading-relaxed"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || loading || disabled}
            className={`p-2.5 rounded-xl font-semibold transition-all flex items-center justify-center shrink-0 ${
              input.trim() && !loading && !disabled
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/25 scale-100'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </form>

        {isListening && (
          <div className="px-3 pt-1 pb-1 flex items-center gap-2 text-[11px] text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            Microphone active — speak clearly into your device
          </div>
        )}
      </div>

      <p className="text-center text-[10px] text-slate-400 mt-2">
        Apex University AI Assistant may provide guidance from official handbooks. Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">Enter</kbd> to send.
      </p>
    </div>
  );
}
