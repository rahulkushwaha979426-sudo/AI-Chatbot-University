import React, { useState } from 'react';
import { 
  X, 
  Camera, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Building, 
  Calendar,
  Save,
  QrCode,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function ProfileModal({ isOpen, onClose }) {
  const { user, updateProfile, uploadAvatar } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [department, setDepartment] = useState(user?.department || 'Computer Science & Engineering');
  const [semester, setSemester] = useState(user?.semester || 'Semester 4');
  const [hostelResident, setHostelResident] = useState(user?.hostelResident ?? true);
  const [cgpa, setCgpa] = useState(user?.cgpa || 8.65);
  const [attendance, setAttendance] = useState(user?.attendance || 84.5);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      await uploadAvatar(file);
      setMessage({ type: 'success', text: 'Profile picture updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Avatar upload failed.' });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await updateProfile({
        name,
        phoneNumber,
        department,
        semester,
        hostelResident,
        cgpa: Number(cgpa),
        attendance: Number(attendance)
      });
      setMessage({ type: 'success', text: 'Student profile details updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl glass-panel border border-white/10 p-6 sm:p-8 shadow-2xl my-8">
        
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
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Student Profile & Digital ID</h2>
            <p className="text-xs text-slate-400">Manage academic credentials and student identity</p>
          </div>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-xl border text-xs flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        {/* Digital Student Identity Card Preview */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900/90 to-brand-950/80 border border-brand-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar with upload overlay */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-brand-400/60 shadow-lg bg-slate-800 flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-white uppercase">{user?.name ? user.name[0] : 'S'}</span>
                )}
              </div>
              <label className="absolute inset-0 bg-black/60 rounded-2xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Camera className="w-5 h-5 mb-0.5" />
                <span className="text-[9px] font-medium">{uploadingAvatar ? 'Uploading...' : 'Change Photo'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange} 
                  disabled={uploadingAvatar} 
                  className="hidden" 
                />
              </label>
            </div>

            {/* Student ID Details */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-bold text-white">{user?.name || name}</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> Active Enrolled
                </span>
              </div>
              <p className="text-xs text-brand-300 font-mono mt-0.5">
                Roll No: {user?.studentId || 'APEX-2023-CS042'}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                {user?.department || department} • {user?.semester || semester}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
                <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-slate-400">CGPA: </span>
                  <span className="font-bold text-amber-300">{user?.cgpa || cgpa}</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-slate-400">Attendance: </span>
                  <span className="font-bold text-emerald-300">{user?.attendance || attendance}%</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-slate-400">Hostel: </span>
                  <span className="font-semibold text-slate-200">{hostelResident ? 'Hostel Wing B' : 'Day Scholar'}</span>
                </div>
              </div>
            </div>

            {/* Fake QR code badge */}
            <div className="hidden sm:flex flex-col items-center justify-center p-2 rounded-xl bg-white/10 border border-white/10">
              <QrCode className="w-10 h-10 text-white" />
              <span className="text-[9px] text-slate-400 mt-1">Verified ID</span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Contact Phone</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              >
                <option>Computer Science & Engineering</option>
                <option>Information Technology</option>
                <option>AI & Data Science</option>
                <option>Electronics & Communication</option>
                <option>Mechanical Engineering</option>
                <option>Business Administration (MBA)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Current Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              >
                <option>Semester 1</option>
                <option>Semester 2</option>
                <option>Semester 3</option>
                <option>Semester 4</option>
                <option>Semester 5</option>
                <option>Semester 6</option>
                <option>Semester 7</option>
                <option>Semester 8</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Current CGPA (out of 10.0)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Overall Attendance (%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-900 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="hostelCheck"
              checked={hostelResident}
              onChange={(e) => setHostelResident(e.target.checked)}
              className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 bg-slate-900 border-white/20"
            />
            <label htmlFor="hostelCheck" className="text-xs text-slate-300">
              Campus Hostel Resident (Wing B / C)
            </label>
          </div>

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
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
