import React, { useEffect, useRef, useState } from 'react';
import { 
  Download, 
  Trash2, 
  Menu, 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Award, 
  Building, 
  Briefcase,
  HelpCircle,
  FileText
} from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { exportChatToPDF } from '../../utils/pdfExport';
import confetti from 'canvas-confetti';

export function ChatWindow({ 
  session, 
  student, 
  loading, 
  onSendMessage, 
  onClearSession, 
  onFeedback,
  onOpenSidebar,
  ttsEnabled 
}) {
  const messagesEndRef = useRef(null);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session?.messages, loading]);

  // Handle Speech Synthesis
  const handleSpeak = (messageId, text) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingMessageId(messageId);

    // Clean markdown symbols for natural speech
    const cleanSpeechText = text
      .replace(/[#*`_\[\]()]/g, ' ')
      .replace(/https?:\/\/\S+/g, 'link');

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    const storedRate = localStorage.getItem('university_speech_rate') || '1';
    utterance.rate = Number(storedRate);

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };
    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
  };

  const handleExportPDF = () => {
    if (!session || !session.messages || session.messages.length === 0) {
      alert('Conversation is empty. Start chatting to export PDF.');
      return;
    }
    // Confetti celebration
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    exportChatToPDF(session, student);
  };

  const messages = session?.messages || [];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] relative bg-slate-950/40">
      
      {/* Top Session Bar */}
      <div className="h-14 px-4 sm:px-6 border-b border-white/5 flex items-center justify-between glass-panel shrink-0 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenSidebar}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 lg:hidden"
            title="Open Conversations"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
              {session?.title || 'Apex University Virtual Assistant'}
            </h2>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{session?.category || 'General Academic Support'}</span>
              <span>•</span>
              <span>{messages.length} messages</span>
            </div>
          </div>
        </div>

        {/* Toolbar: Export PDF & Clear */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            disabled={messages.length === 0}
            title="Download transcript as PDF"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:border-brand-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Download className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Clear all messages in this conversation?')) {
                onClearSession();
              }
            }}
            disabled={messages.length === 0}
            title="Clear conversation"
            className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
        {messages.length === 0 ? (
          /* Empty State / Welcome Screen */
          <div className="max-w-3xl mx-auto my-auto text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-accent-500 mb-4 shadow-xl shadow-brand-500/25">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome to Apex Virtual University Assistant
            </h1>
            <p className="text-sm text-slate-400 max-w-lg mx-auto mt-2 leading-relaxed">
              Your 24/7 intelligent guide for admissions, examinations, semester timetables, scholarships, hostel living, and campus placement drives.
            </p>

            {/* Quick Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mt-8 text-left">
              <div 
                onClick={() => onSendMessage("Tell me about B.Tech admissions, entrance exams, and eligibility criteria.")}
                className="p-4 rounded-xl glass-card hover:border-brand-500/50 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-2.5 text-brand-400 font-semibold text-xs sm:text-sm mb-1">
                  <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Admissions & Courses
                </div>
                <p className="text-xs text-slate-400">
                  Eligibility norms, AUEE test dates, B.Tech/BCA cutoffs, and lateral entry procedures.
                </p>
              </div>

              <div 
                onClick={() => onSendMessage("What scholarships and fee waivers are available for high achievers?")}
                className="p-4 rounded-xl glass-card hover:border-brand-500/50 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-2.5 text-accent-400 font-semibold text-xs sm:text-sm mb-1">
                  <Award className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Scholarships & Fees
                </div>
                <p className="text-xs text-slate-400">
                  Up to 100% merit waivers, sports quotas, need-based aid, and installment due dates.
                </p>
              </div>

              <div 
                onClick={() => onSendMessage("What is the hostel fee structure, mess food quality, and curfew rules?")}
                className="p-4 rounded-xl glass-card hover:border-brand-500/50 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-xs sm:text-sm mb-1">
                  <Building className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Hostel & Campus Facilities
                </div>
                <p className="text-xs text-slate-400">
                  AC/Non-AC room options, 4-time dining menu, 24/7 library, and sports complex.
                </p>
              </div>

              <div 
                onClick={() => onSendMessage("What are the placement statistics for Computer Science and top recruiters?")}
                className="p-4 rounded-xl glass-card hover:border-brand-500/50 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-2.5 text-amber-400 font-semibold text-xs sm:text-sm mb-1">
                  <Briefcase className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Placements & Careers
                </div>
                <p className="text-xs text-slate-400">
                  Highest package ₹44.5 LPA, average ₹8.6 LPA, Google/Microsoft recruiter drives.
                </p>
              </div>
            </div>

          </div>
        ) : (
          /* Messages list */
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message._id || message.id || Math.random()}
                message={message}
                student={student}
                onFeedback={onFeedback}
                ttsEnabled={ttsEnabled}
                speakingMessageId={speakingMessageId}
                onSpeak={handleSpeak}
                onStopSpeak={handleStopSpeak}
              />
            ))}

            {/* Typing Animation */}
            {loading && (
              <div className="flex gap-3 my-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white shrink-0 shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="glass-card border border-white/10 rounded-2xl rounded-bl-sm p-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-400 typing-dot-1" />
                  <span className="w-2 h-2 rounded-full bg-brand-400 typing-dot-2" />
                  <span className="w-2 h-2 rounded-full bg-brand-400 typing-dot-3" />
                  <span className="text-xs text-slate-400 ml-2">Consulting university knowledge base...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Dock */}
      <ChatInput
        onSendMessage={onSendMessage}
        loading={loading}
      />

    </div>
  );
}
