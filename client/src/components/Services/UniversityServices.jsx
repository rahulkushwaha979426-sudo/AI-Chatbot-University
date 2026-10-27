import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  DollarSign, 
  Building, 
  Calendar, 
  Users, 
  Briefcase, 
  ShieldAlert, 
  PhoneCall, 
  HelpCircle,
  Search,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  Mail
} from 'lucide-react';
import { universityAPI } from '../../api';

const SERVICE_TABS = [
  { id: 'admissions', label: 'Admissions & Cutoffs', icon: GraduationCap },
  { id: 'courses', label: 'Courses & Programs', icon: BookOpen },
  { id: 'faculty', label: 'Faculty Directory', icon: Users },
  { id: 'scholarships', label: 'Scholarships & Aid', icon: Award },
  { id: 'fees', label: 'Fee Schedules', icon: DollarSign },
  { id: 'hostel', label: 'Hostel & Dining', icon: Building },
  { id: 'placements', label: 'Placements & Internships', icon: Briefcase },
  { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
  { id: 'policies', label: 'Policies & Anti-Ragging', icon: ShieldAlert },
  { id: 'contacts', label: 'Emergency Helplines', icon: PhoneCall },
  { id: 'faqs', label: 'Official FAQs', icon: HelpCircle },
];

export function UniversityServices({ onAskChatbot }) {
  const [activeTab, setActiveTab] = useState('admissions');
  const [topics, setTopics] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(0);

  useEffect(() => {
    async function loadTopics() {
      try {
        const res = await universityAPI.getTopics();
        if (res.data.success) {
          setTopics(res.data.topics);
        }
      } catch (err) {
        console.error('Failed to load topics:', err);
      }
    }
    loadTopics();
  }, []);

  const currentTopic = topics ? topics[activeTab] : null;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-brand-400" />
            University Services & Academic Knowledge Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse verified institutional information, faculty directories, timetables, and policies
          </p>
        </div>

        {/* Ask Chatbot button */}
        <button
          onClick={() => onAskChatbot(`Can you give me detailed information regarding ${SERVICE_TABS.find(t => t.id === activeTab)?.label}?`)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-brand-500/20 hover:from-brand-500 hover:to-indigo-500 transition-all"
        >
          Ask Chatbot About This →
        </button>
      </div>

      {/* Tabs Horizontal List */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {SERVICE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Main Topic Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-brand-600/20 text-brand-400 border border-brand-500/30">
                {(() => {
                  const CurrentIcon = SERVICE_TABS.find(t => t.id === activeTab)?.icon || BookOpen;
                  return <CurrentIcon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {currentTopic?.title || 'Academic Directory'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {currentTopic?.summary || 'Official regulations and student handbook provisions'}
                </p>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3 mt-6">
              {currentTopic?.details?.map((detail, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5 hover:border-brand-500/30 transition-all flex items-start gap-3 text-xs leading-relaxed text-slate-200"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1 whitespace-pre-line">{detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick FAQ Section if FAQS tab or additional */}
          <div className="p-6 rounded-2xl glass-card border border-white/10">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-400" />
              Frequently Asked Questions for {SERVICE_TABS.find(t => t.id === activeTab)?.label}
            </h3>

            <div className="space-y-2">
              {[
                { q: "How do I request a bonafide or recommendation letter?", a: "Submit an online request on ERP > Documents > Request Certificate. Digital certificate is ready in 24 hours." },
                { q: "What is the procedure for semester fee installment approval?", a: "Submit an application co-signed by parents to Accounts Section. Maximum 2 installments are granted upon approval." },
                { q: "Can I attend sports trials while having internal tests?", a: "Yes, submit an On-Duty (OD) form approved by the Physical Education Director and HOD before the trial date." }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="rounded-xl bg-slate-900/60 border border-white/5 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                    className="w-full p-3.5 text-left text-xs font-semibold text-slate-200 flex items-center justify-between hover:text-white"
                  >
                    <span>{item.q}</span>
                    {expandedFaq === index ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-3.5 pb-3 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Key University Contacts & Campus Timings */}
        <div className="space-y-6">
          
          {/* Quick Emergency / Contacts Card */}
          <div className="p-5 rounded-2xl glass-card border border-brand-500/20 bg-gradient-to-b from-indigo-950/40 to-slate-900/90 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-brand-400" />
              Direct Student Helpdesks
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="font-semibold text-slate-200">Anti-Ragging Squad (24/7)</p>
                <p className="text-brand-300 font-mono mt-0.5">+91 (011) 2999-4499</p>
                <p className="text-[10px] text-slate-400">Zero tolerance UGC enforcement</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="font-semibold text-slate-200">Campus Health & Ambulance</p>
                <p className="text-emerald-300 font-mono mt-0.5">+91 (011) 2999-4491</p>
                <p className="text-[10px] text-slate-400">Block F Medical Center</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="font-semibold text-slate-200">Training & Placement Desk</p>
                <p className="text-amber-300 font-mono mt-0.5">placements@apexuniversity.edu.in</p>
                <p className="text-[10px] text-slate-400">Admin Block Room 104</p>
              </div>
            </div>
          </div>

          {/* Campus Operating Hours */}
          <div className="p-5 rounded-2xl glass-card border border-white/10">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-400" />
              Campus Facilities Hours
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-slate-400">Central Library</span>
                <span className="font-medium text-slate-200">8:00 AM – 11:00 PM (24/7 in Exams)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-slate-400">Computer Labs</span>
                <span className="font-medium text-slate-200">8:30 AM – 9:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-slate-400">Indoor Sports Arena</span>
                <span className="font-medium text-slate-200">6:00 AM – 9:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-slate-400">Hostel Gates</span>
                <span className="font-medium text-slate-200">9:30 PM (Curfew)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
