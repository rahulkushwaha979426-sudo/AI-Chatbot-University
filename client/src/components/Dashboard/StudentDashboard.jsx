import React, { useEffect, useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileCheck,
  Layers,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { analyticsAPI } from '../../api';
import { useAuth } from '../../context/AuthContext';

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler
);

export function StudentDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await analyticsAPI.getDashboard();
      if (res.data.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const cgpa = user?.cgpa || 8.65;
  const attendance = user?.attendance || 84.5;
  const isAttendanceSafe = attendance >= 75;

  // 1. Monthly Attendance Trend Line Chart
  const attendanceTrendData = {
    labels: ['January', 'February', 'March', 'April (Current)'],
    datasets: [
      {
        label: 'Student Attendance (%)',
        data: [92, 88, 85, attendance],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#818cf8',
        pointBorderColor: '#ffffff',
        pointRadius: 5,
      },
      {
        label: 'Mandatory Cutoff (75%)',
        data: [75, 75, 75, 75],
        borderColor: '#f43f5e',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      }
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#94a3b8', font: { family: 'Outfit', size: 11 } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#6366f1',
        borderWidth: 1,
        titleColor: '#ffffff',
        bodyColor: '#c7d2fe',
      }
    },
    scales: {
      y: {
        min: 60,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', callback: (val) => `${val}%` }
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  // 2. Subject-wise Attendance Bar Chart
  const subjectAttendanceData = {
    labels: ['DSA', 'DBMS', 'OS', 'Comp Networks', 'Software Engg'],
    datasets: [
      {
        label: 'Attendance Rate (%)',
        data: [88, 82, 85, 80, 89],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(217, 70, 239, 0.8)',
        ],
        borderRadius: 8,
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#6366f1',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        min: 50,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', callback: (val) => `${val}%` }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  // 3. Query Topics Breakdown Doughnut Chart
  const categoriesList = data?.stats?.categories || [
    { category: 'Scholarships', count: 35 },
    { category: 'Admissions', count: 28 },
    { category: 'Exams', count: 24 },
    { category: 'Hostel', count: 18 },
    { category: 'Placements', count: 20 },
    { category: 'Fees', count: 15 },
  ];

  const doughnutData = {
    labels: categoriesList.map(c => c.category),
    datasets: [
      {
        data: categoriesList.map(c => c.count),
        backgroundColor: [
          '#6366f1',
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ec4899',
          '#8b5cf6',
          '#06b6d4',
          '#14b8a6',
        ],
        borderColor: '#090d16',
        borderWidth: 2,
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#94a3b8', font: { family: 'Outfit', size: 10 }, boxWidth: 12 }
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-brand-400" />
            Student Academic Dashboard & Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time biometric attendance, exam evaluations, and automated query insights
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-brand-400' : ''}`} />
          Refresh Stats
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CGPA */}
        <div className="p-4 rounded-2xl glass-card border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Cumulative CGPA</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{cgpa}</div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-amber-300">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Top 5% of B.Tech Batch</span>
          </div>
        </div>

        {/* Attendance */}
        <div className="p-4 rounded-2xl glass-card border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Overall Attendance</span>
            <div className={`p-2 rounded-lg ${isAttendanceSafe ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {isAttendanceSafe ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            </div>
          </div>
          <div className={`text-3xl font-extrabold ${isAttendanceSafe ? 'text-emerald-400' : 'text-rose-400'}`}>
            {attendance}%
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400">
            <span>Mandatory Cutoff: 75%</span>
            <span className="text-emerald-400 font-semibold">(Eligible for SEE)</span>
          </div>
        </div>

        {/* Total Credits */}
        <div className="p-4 rounded-2xl glass-card border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Earned Credits</span>
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">68 / 160</div>
          <div className="mt-2 text-[11px] text-brand-300">
            Semester 4 of 8 In Progress
          </div>
        </div>

        {/* Virtual Support Queries */}
        <div className="p-4 rounded-2xl glass-card border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">AI Query Resolution</span>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">98.4%</div>
          <div className="mt-2 text-[11px] text-teal-300">
            Average response time: 215ms
          </div>
        </div>
      </div>

      {/* Chart Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Attendance Trend Line Chart */}
        <div className="p-5 rounded-2xl glass-card border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Semester Biometric Attendance Trend</h3>
              <p className="text-[11px] text-slate-400">Monthly progress versus mandatory 75% examination threshold</p>
            </div>
          </div>
          <div className="h-64">
            <Line data={attendanceTrendData} options={lineChartOptions} />
          </div>
        </div>

        {/* Subject Attendance Bar Chart */}
        <div className="p-5 rounded-2xl glass-card border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Subject-Wise Attendance Distribution</h3>
              <p className="text-[11px] text-slate-400">Live lecture & lab log compliance per registered subject</p>
            </div>
          </div>
          <div className="h-64">
            <Bar data={subjectAttendanceData} options={barChartOptions} />
          </div>
        </div>

      </div>

      {/* Second Row: Query Categories & University Circulars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Query Topics Doughnut */}
        <div className="p-5 rounded-2xl glass-card border border-white/10">
          <h3 className="text-sm font-bold text-white mb-1">Student AI Inquiry Categories</h3>
          <p className="text-[11px] text-slate-400 mb-3">Breakdown of support topics handled by the chatbot</p>
          <div className="h-56">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Mid-Term Examination Performance */}
        <div className="p-5 rounded-2xl glass-card border border-white/10 lg:col-span-2">
          <h3 className="text-sm font-bold text-white mb-1">Continuous Internal Evaluation (CIE) Marks</h3>
          <p className="text-[11px] text-slate-400 mb-4">Mid-Term 1 & Mid-Term 2 score report (out of 20 marks each)</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="py-2 px-3 font-semibold">Course Code & Title</th>
                  <th className="py-2 px-3 font-semibold text-center">Mid-Term 1 (20M)</th>
                  <th className="py-2 px-3 font-semibold text-center">Mid-Term 2 (20M)</th>
                  <th className="py-2 px-3 font-semibold text-center">Best Score</th>
                  <th className="py-2 px-3 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-2.5 px-3 font-medium text-white">CS401: Data Structures & Algorithms</td>
                  <td className="py-2.5 px-3 text-center text-slate-300">18 / 20</td>
                  <td className="py-2.5 px-3 text-center text-slate-300">19 / 20</td>
                  <td className="py-2.5 px-3 text-center font-bold text-emerald-400">19 / 20</td>
                  <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-medium">Cleared</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-white">CS402: Database Management Systems</td>
                  <td className="py-2.5 px-3 text-center text-slate-300">17 / 20</td>
                  <td className="py-2.5 px-3 text-center text-slate-300">18 / 20</td>
                  <td className="py-2.5 px-3 text-center font-bold text-emerald-400">18 / 20</td>
                  <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-medium">Cleared</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-white">CS403: Operating Systems Architecture</td>
                  <td className="py-2.5 px-3 text-center text-slate-300">16 / 20</td>
                  <td className="py-2.5 px-3 text-center text-slate-300">18 / 20</td>
                  <td className="py-2.5 px-3 text-center font-bold text-emerald-400">18 / 20</td>
                  <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-medium">Cleared</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-white">CS404: Computer Networks</td>
                  <td className="py-2.5 px-3 text-center text-slate-300">17 / 20</td>
                  <td className="py-2.5 px-3 text-center text-slate-300">19 / 20</td>
                  <td className="py-2.5 px-3 text-center font-bold text-emerald-400">19 / 20</td>
                  <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-medium">Cleared</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
