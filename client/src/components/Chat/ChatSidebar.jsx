import React, { useState } from 'react';
import { 
  Plus, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Search, 
  GraduationCap,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export function ChatSidebar({ 
  sessions, 
  activeSessionId, 
  onSelectSession, 
  onCreateSession, 
  onRenameSession, 
  onDeleteSession,
  isOpen,
  onCloseMobile
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const filteredSessions = sessions.filter(s => 
    s.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startRename = (e, session) => {
    e.stopPropagation();
    setEditingId(session._id || session.id);
    setEditTitle(session.title);
  };

  const saveRename = (e, session) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRenameSession(session._id || session.id, editTitle.trim());
    }
    setEditingId(null);
  };

  const cancelRename = (e) => {
    e.stopPropagation();
    setEditingId(null);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-30 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed lg:static top-16 bottom-0 left-0 z-30
        w-72 sm:w-80 glass-panel border-r border-white/5
        flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* New Chat Button */}
        <div className="p-4 border-b border-white/5">
          <button
            onClick={() => {
              onCreateSession();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-500 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            Start New Conversation
          </button>

          {/* Search sessions */}
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search chat history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900/90 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          <div className="px-2 pb-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Conversations ({filteredSessions.length})
          </div>

          {filteredSessions.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">
              No conversations found.
            </div>
          ) : (
            filteredSessions.map((session) => {
              const sid = session._id || session.id;
              const isActive = sid === activeSessionId;
              const isEditing = sid === editingId;

              return (
                <div
                  key={sid}
                  onClick={() => {
                    onSelectSession(sid);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition-all ${
                    isActive
                      ? 'bg-brand-600/25 border border-brand-500/40 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <MessageSquare className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} />
                    
                    {isEditing ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveRename(e, session);
                          if (e.key === 'Escape') cancelRename(e);
                        }}
                        autoFocus
                        className="w-full bg-slate-950 border border-brand-400 px-2 py-0.5 rounded text-xs text-white focus:outline-none"
                      />
                    ) : (
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{session.title || 'Untitled Query'}</p>
                        <p className="text-[10px] text-slate-500">
                          {session.messages?.length || 0} messages
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions: Edit / Delete */}
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={(e) => saveRename(e, session)}
                          className="p-1 rounded hover:bg-emerald-500/20 text-emerald-400"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={cancelRename}
                          className="p-1 rounded hover:bg-white/10 text-slate-400"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                        <button
                          onClick={(e) => startRename(e, session)}
                          title="Rename thread"
                          className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this conversation?')) {
                              onDeleteSession(sid);
                            }
                          }}
                          title="Delete thread"
                          className="p-1 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info card */}
        <div className="p-3 m-3 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 font-semibold text-slate-300 mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            20+ Topic Support
          </div>
          <p className="text-[10px] text-slate-400">
            Admissions, Exams, Hostel, Fees, Scholarships, Timetables, Placements & more.
          </p>
        </div>
      </aside>
    </>
  );
}
