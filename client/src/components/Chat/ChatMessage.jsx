import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  ThumbsUp, 
  ThumbsDown, 
  GraduationCap, 
  User, 
  Sparkles,
  Cpu,
  Bookmark
} from 'lucide-react';

export function ChatMessage({ 
  message, 
  student, 
  onFeedback, 
  ttsEnabled,
  speakingMessageId,
  onSpeak,
  onStopSpeak 
}) {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);
  const isSpeaking = speakingMessageId === (message._id || message.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedTime = message.timestamp 
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`flex gap-3 sm:gap-4 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      {/* Bot Avatar */}
      {!isUser && (
        <div className="shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-accent-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* Message Bubble Container */}
      <div className={`max-w-[88%] sm:max-w-[80%] md:max-w-[75%] rounded-2xl p-4 transition-all ${
        isUser
          ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-br-sm shadow-lg shadow-brand-600/20'
          : 'glass-card border border-white/10 text-slate-100 rounded-bl-sm shadow-xl'
      }`}>
        
        {/* Header meta for Assistant */}
        {!isUser && (
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">Apex Virtual Assistant</span>
              {message.category && (
                <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-medium border border-brand-500/30">
                  {message.category}
                </span>
              )}
              {message.source && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-400">
                  {message.source.includes('gemini') ? (
                    <>
                      <Sparkles className="w-2.5 h-2.5 text-amber-400" /> Gemini AI
                    </>
                  ) : (
                    <>
                      <Cpu className="w-2.5 h-2.5 text-emerald-400" /> Knowledge Base
                    </>
                  )}
                </span>
              )}
            </div>

            {/* Speaking active wave */}
            {isSpeaking && (
              <span className="flex items-center gap-1 text-[10px] text-brand-400 animate-pulse">
                <Volume2 className="w-3.5 h-3.5" /> Speaking...
              </span>
            )}
          </div>
        )}

        {/* Content */}
        {isUser ? (
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-normal">
            {message.content}
          </p>
        ) : (
          <div className="prose-chat">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        {/* Footer Meta & Action Toolbar */}
        <div className={`flex items-center justify-between gap-3 pt-2.5 mt-2 border-t text-[11px] ${
          isUser ? 'border-white/15 text-indigo-100' : 'border-white/5 text-slate-400'
        }`}>
          <span className="text-[10px]">{formattedTime}</span>

          <div className="flex items-center gap-1.5">
            {/* Copy button */}
            <button
              onClick={handleCopy}
              title={copied ? "Copied to clipboard!" : "Copy message"}
              className={`p-1.5 rounded-lg transition-all ${
                isUser 
                  ? 'hover:bg-white/10 text-indigo-100' 
                  : 'hover:bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {/* Read aloud / stop speech button for assistant */}
            {!isUser && (
              <button
                onClick={() => {
                  if (isSpeaking) {
                    onStopSpeak();
                  } else {
                    onSpeak(message._id || message.id, message.content);
                  }
                }}
                title={isSpeaking ? "Stop reading" : "Read aloud"}
                className={`p-1.5 rounded-lg transition-all ${
                  isSpeaking
                    ? 'bg-brand-500/20 text-brand-300'
                    : 'hover:bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Feedback for assistant */}
            {!isUser && (
              <div className="flex items-center gap-0.5 ml-1 border-l border-white/10 pl-1.5">
                <button
                  onClick={() => onFeedback(message._id || message.id, 'like')}
                  title="Helpful response"
                  className={`p-1 rounded-md transition-all ${
                    message.feedback === 'like'
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onFeedback(message._id || message.id, 'dislike')}
                  title="Not helpful"
                  className={`p-1 rounded-md transition-all ${
                    message.feedback === 'dislike'
                      ? 'text-rose-400 bg-rose-500/10'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="shrink-0">
          {student?.avatar ? (
            <img 
              src={student.avatar} 
              alt={student.name} 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-white/20 shadow-md" 
            />
          ) : (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold text-white uppercase shadow-md">
              {student?.name ? student.name[0] : 'S'}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
