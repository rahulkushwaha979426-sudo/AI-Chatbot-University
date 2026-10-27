import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ChatSidebar } from './components/Chat/ChatSidebar';
import { ChatWindow } from './components/Chat/ChatWindow';
import { StudentDashboard } from './components/Dashboard/StudentDashboard';
import { UniversityServices } from './components/Services/UniversityServices';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/Profile/ProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { useAuth } from './context/AuthContext';
import { chatAPI } from './api';

export function App() {
  const { user, isAuthenticated } = useAuth();

  // Navigation tab: 'chat' | 'dashboard' | 'services'
  const [activeTab, setActiveTab] = useState('chat');

  // Chat sessions state
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

  // Settings & Audio
  const [ttsEnabled, setTtsEnabled] = useState(false);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load chat sessions when user is authenticated or demo session
  const loadSessions = async () => {
    try {
      if (isAuthenticated) {
        const res = await chatAPI.getSessions();
        if (res.data.success && res.data.sessions.length > 0) {
          setSessions(res.data.sessions);
          if (!activeSessionId) {
            setActiveSessionId(res.data.sessions[0]._id || res.data.sessions[0].id);
          }
          return;
        }
      }
      
      // Default fallback sample session for visitor / initial load
      const initialSession = {
        _id: 'default_sess_01',
        id: 'default_sess_01',
        title: 'Admissions & Scholarships Guide',
        category: 'Scholarships',
        messages: [
          {
            _id: 'msg_welcome',
            sender: 'assistant',
            content: `🎓 **Welcome to Apex Institute of Science & Technology AI Virtual Support!**\n\nI can answer questions regarding:\n* 📘 **Admissions & Eligibility**: B.Tech, BCA, MCA, M.Tech cutoffs & application deadlines\n* 🏆 **Scholarships**: 100% merit waivers, sports quota, need-based fee reductions\n* 📝 **Examinations**: Mid-terms, SEE schedules, 10-point CGPA grading scale, backlogs\n* 📋 **Attendance**: 75% minimum rule, medical leaves & condonation\n* 🏢 **Campus Facilities**: AC/Non-AC hostels, mess menu, 24/7 central library\n* 💼 **Placements**: Average ₹8.6 LPA, highest ₹44.5 LPA, Google/Microsoft recruitment drives\n\n*How may I assist you today? Feel free to ask any question or tap a quick prompt below!*`,
            timestamp: new Date(),
            category: 'General Support',
            feedback: 'none',
            source: 'knowledge-base'
          }
        ]
      };
      setSessions([initialSession]);
      setActiveSessionId('default_sess_01');
    } catch (err) {
      console.warn('Could not load sessions from API:', err.message);
    }
  };

  useEffect(() => {
    loadSessions();
  }, [isAuthenticated]);

  // Active Session Object
  const currentSession = sessions.find(s => (s._id || s.id) === activeSessionId) || sessions[0];

  // Create new session
  const handleCreateSession = async () => {
    if (isAuthenticated) {
      try {
        const res = await chatAPI.createSession({ title: 'New University Query' });
        if (res.data.success) {
          setSessions(prev => [res.data.session, ...prev]);
          setActiveSessionId(res.data.session._id || res.data.session.id);
          showToast('New conversation started', 'success');
          return;
        }
      } catch (err) {
        console.warn('Session creation fallback:', err);
      }
    }

    const localNew = {
      _id: 'local_sess_' + Date.now(),
      id: 'local_sess_' + Date.now(),
      title: 'New University Query',
      category: 'General',
      messages: []
    };
    setSessions(prev => [localNew, ...prev]);
    setActiveSessionId(localNew._id);
    showToast('New conversation started', 'success');
  };

  // Send message
  const handleSendMessage = async (text) => {
    if (!text || !text.trim()) return;

    const userMsg = {
      _id: 'temp_user_' + Date.now(),
      sender: 'user',
      content: text,
      timestamp: new Date()
    };

    // Optimistically update session with user message
    setSessions(prev => prev.map(s => {
      const sid = s._id || s.id;
      if (sid === activeSessionId) {
        return {
          ...s,
          messages: [...(s.messages || []), userMsg]
        };
      }
      return s;
    }));

    setLoadingMessage(true);

    try {
      const customKey = localStorage.getItem('university_gemini_key');
      const res = await chatAPI.sendMessage(activeSessionId, {
        content: text,
        customApiKey: customKey || undefined
      });

      if (res.data.success) {
        const assistantMsg = res.data.assistantMessage;

        setSessions(prev => prev.map(s => {
          const sid = s._id || s.id;
          if (sid === activeSessionId) {
            // Replace with server response
            const existing = s.messages.filter(m => m._id !== userMsg._id);
            return {
              ...s,
              title: s.title === 'New University Query' ? text.slice(0, 32) + '...' : s.title,
              category: res.data.category || s.category,
              messages: [...existing, res.data.userMessage || userMsg, assistantMsg]
            };
          }
          return s;
        }));

        // Trigger TTS if enabled
        if (ttsEnabled && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const cleanSpeech = assistantMsg.content.replace(/[#*`_\[\]()]/g, ' ');
          const utterance = new SpeechSynthesisUtterance(cleanSpeech);
          const rate = localStorage.getItem('university_speech_rate') || '1';
          utterance.rate = Number(rate);
          window.speechSynthesis.speak(utterance);
        }
      }
    } catch (err) {
      console.error('Error sending message:', err);
      // Fallback local response
      const fallbackReply = {
        _id: 'fb_msg_' + Date.now(),
        sender: 'assistant',
        content: `I have received your query regarding **"${text}"**.\n\nOur official campus knowledge repository confirms that details can be reviewed in the **University Services** tab or by contacting the Registrar helpline: **+91 (011) 2999-4400**.`,
        timestamp: new Date(),
        category: 'General Support',
        source: 'knowledge-base'
      };

      setSessions(prev => prev.map(s => {
        const sid = s._id || s.id;
        if (sid === activeSessionId) {
          return {
            ...s,
            messages: [...s.messages, fallbackReply]
          };
        }
        return s;
      }));
    } finally {
      setLoadingMessage(false);
    }
  };

  // Rename session
  const handleRenameSession = async (sessionId, newTitle) => {
    if (isAuthenticated) {
      try {
        await chatAPI.renameSession(sessionId, { title: newTitle });
      } catch (err) {
        console.warn('Rename sync error:', err);
      }
    }
    setSessions(prev => prev.map(s => {
      if ((s._id || s.id) === sessionId) {
        return { ...s, title: newTitle };
      }
      return s;
    }));
    showToast('Conversation renamed', 'success');
  };

  // Delete session
  const handleDeleteSession = async (sessionId) => {
    if (isAuthenticated) {
      try {
        await chatAPI.deleteSession(sessionId);
      } catch (err) {
        console.warn('Delete sync error:', err);
      }
    }
    const filtered = sessions.filter(s => (s._id || s.id) !== sessionId);
    setSessions(filtered);
    if (activeSessionId === sessionId) {
      setActiveSessionId(filtered[0]?._id || filtered[0]?.id || null);
    }
    showToast('Conversation deleted', 'info');
  };

  // Clear session
  const handleClearSession = async () => {
    if (isAuthenticated) {
      try {
        await chatAPI.clearSession(activeSessionId);
      } catch (err) {
        console.warn('Clear sync error:', err);
      }
    }
    setSessions(prev => prev.map(s => {
      if ((s._id || s.id) === activeSessionId) {
        return { ...s, messages: [] };
      }
      return s;
    }));
    showToast('Conversation messages cleared', 'info');
  };

  // Message feedback
  const handleFeedback = async (messageId, feedback) => {
    if (isAuthenticated) {
      try {
        await chatAPI.sendFeedback(activeSessionId, messageId, { feedback });
      } catch (err) {
        console.warn('Feedback sync error:', err);
      }
    }
    setSessions(prev => prev.map(s => {
      if ((s._id || s.id) === activeSessionId) {
        const msgs = s.messages.map(m => {
          if ((m._id || m.id) === messageId) {
            return { ...m, feedback };
          }
          return m;
        });
        return { ...s, messages: msgs };
      }
      return s;
    }));
    showToast('Thank you for your feedback!', 'success');
  };

  // Ask chatbot shortcut from Services tab
  const handleAskChatbotFromServices = (query) => {
    setActiveTab('chat');
    handleSendMessage(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 py-2 px-4 rounded-xl glass-panel border border-brand-500/40 text-xs font-semibold text-white shadow-2xl animate-bounce-soft flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-400" />
          {toast.message}
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
        ttsEnabled={ttsEnabled}
        setTtsEnabled={setTtsEnabled}
      />

      {/* Main View Router */}
      <main className="flex-1 flex overflow-hidden">
        {activeTab === 'chat' && (
          <div className="flex-1 flex w-full h-[calc(100vh-4rem)]">
            <ChatSidebar
              sessions={sessions}
              activeSessionId={activeSessionId}
              onSelectSession={(id) => setActiveSessionId(id)}
              onCreateSession={handleCreateSession}
              onRenameSession={handleRenameSession}
              onDeleteSession={handleDeleteSession}
              isOpen={sidebarOpenMobile}
              onCloseMobile={() => setSidebarOpenMobile(false)}
            />
            <ChatWindow
              session={currentSession}
              student={user}
              loading={loadingMessage}
              onSendMessage={handleSendMessage}
              onClearSession={handleClearSession}
              onFeedback={handleFeedback}
              onOpenSidebar={() => setSidebarOpenMobile(true)}
              ttsEnabled={ttsEnabled}
            />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <StudentDashboard />
        )}

        {activeTab === 'services' && (
          <UniversityServices onAskChatbot={handleAskChatbotFromServices} />
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />

    </div>
  );
}

export default App;
