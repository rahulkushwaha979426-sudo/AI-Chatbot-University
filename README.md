# 🎓 AI-Powered Chatbot for University Student Support

A complete, production-ready, full-stack virtual campus assistant web application built with **React (Vite)**, **Node.js + Express**, **MongoDB (with high-performance fallback engine)**, **JWT Authentication**, **Google Gemini AI API**, **Tailwind CSS**, **Lucide Icons**, **Chart.js**, **Multer**, and **jsPDF**.

The chatbot provides instant, intelligent, context-aware responses to students regarding admissions, academics, examinations, campus facilities, placements, scholarships, fees, and institutional student services.

---

## 🌟 Highlights & Core Features

### 1. 🔐 Student Authentication & Profile Management
- **Registration**: Student signup with automatic ID generation, department selection, and semester assignment.
- **Login & JWT**: Secure session handling with bcrypt password hashing and 7-day JWT expiration.
- **Forgot & Reset Password**: Token-based password recovery workflow.
- **Quick Demo Login**: 1-click test login button with pre-configured student credentials.
- **Student Profile & Digital ID Card**: Visual university student card with live CGPA, biometric attendance rate, hostel residency status, and avatar uploads powered by **Multer**.

### 2. 🤖 AI Chatbot Engine
- **Comprehensive 20+ University Topics**:
  1. *Admissions & Cutoffs* (UG/PG, eligibility, entrance tests, deadlines)
  2. *Courses & Degrees* (B.Tech, BCA, MCA, M.Tech, MBA, credits)
  3. *Subjects & Syllabi* (Core, electives, labs, course codes)
  4. *Faculty Directory* (Professors, HODs, cabins, office hours)
  5. *Timetable & Schedules* (Lecture hours, lunch break, lab sessions)
  6. *Attendance Policy* (75% mandatory cutoff, medical condonation, OD leaves)
  7. *Examinations* (Mid-terms CIE, SEE, backlogs, supplementary exams)
  8. *Results & Grading* (10-point relative scale, SGPA/CGPA calculation)
  9. *Scholarships* (100% merit waivers, sports quota, need-based aid)
  10. *Fees & Payment* (Tuition fees, semester deadlines, online payment portals)
  11. *Hostel Accommodation* (AC/Non-AC rooms, mess menu, curfews, warden contacts)
  12. *Central Library* (85,000+ volumes, IEEE digital access, borrowing rules)
  13. *Campus Events* (Cultural fest 'Aura', hackathon 'TechVortex', TedX)
  14. *Student Clubs & Societies* (Coding Club/ACM, GDSC, Robotics, Dance)
  15. *Sports Infrastructure* (Cricket stadium, Olympic pool, gym, courts)
  16. *Placements & Careers* (Highest ₹44.5 LPA, average ₹8.6 LPA, top recruiters)
  17. *Academic Calendar* (Semester dates, Diwali & winter breaks, exams)
  18. *University Policies* (Zero-tolerance anti-ragging, POSH/ICC, grievances)
  19. *Contact Directory* (Registrar, COE, Dean, ambulance, helpdesks)
  20. *Frequently Asked Questions* (Instant Q&As)
- **Multi-Session Conversation History**: Create new threads, rename sessions inline, search past queries, and delete threads.
- **Context-Aware Responses**: Connects query context with the logged-in student's department, semester, CGPA, and attendance.
- **Rich Markdown Formatting**: Beautiful tables, code blocks, bullet points, and callouts.
- **One-Click Response Copy**: Copy message with toast confirmation.
- **PDF Export via jsPDF**: Generates official university transcript documents with letterhead, timestamps, and metadata.
- **Voice Input (Speech-to-Text)**: Speak your questions using the Web Speech Recognition API with active pulse indicator.
- **Text-to-Speech (Audio Playback)**: Assistant speaks responses with customizable speech rate.
- **Feedback Mechanism**: Thumbs up and thumbs down ratings on every response.

### 3. 📊 Academic Analytics Dashboard (Chart.js)
- **Attendance Progression Line Chart**: Monthly attendance trend vs 75% examination threshold.
- **Subject-wise Attendance Bar Chart**: Compliance tracking across enrolled courses.
- **Query Categories Doughnut Chart**: Breakdown of student inquiries.
- **Internal Evaluation Table**: Mid-term test scores and academic standing.

### 4. 🏛️ University Services & Knowledge Center
- Tabbed exploration of all university handbook sections.
- Expandable official FAQ accordions.
- Direct contact cards for medical emergency, anti-ragging squad, and placement cell.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React.js (Vite) |
| **Styling** | Tailwind CSS v3 (Dark Mode, Glassmorphism, Responsive) |
| **Icons** | Lucide React |
| **Charts & Visualizations** | Chart.js & react-chartjs-2 |
| **Document Generation** | jsPDF & jspdf-autotable |
| **Markdown Rendering** | react-markdown & remark-gfm |
| **Audio & Speech** | Web Speech API (SpeechRecognition & SpeechSynthesis) |
| **Backend Runtime** | Node.js + Express.js (ES Modules) |
| **Database** | MongoDB (with auto-fallback to persistent engine if local Mongo is inactive) |
| **Authentication** | JWT (JSON Web Tokens) + bcryptjs |
| **File Uploads** | Multer |
| **AI LLM Integration** | Google Gemini API (`@google/generative-ai`) + Smart Knowledge Fallback |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **npm** v9+

### 2. Quick Run (Full Stack)
From the project root:
```bash
# Starts both Express backend (Port 5000) and Vite frontend (Port 5173) concurrently
npm run dev
```

Alternatively, run in separate terminals:
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run client
```

Open your browser at: **`http://localhost:5173`**

---

## 🔑 Demo Student Credentials

For instant testing without signing up:
- **Email**: `student@apex.edu`
- **Password**: `password123`
*(Or simply click the **"Demo Login"** button on the Sign-In modal!)*

---

## ⚙️ AI Engine Configuration

1. **Out-of-the-box (Default)**: The application comes with a comprehensive, verified university knowledge repository covering all 20+ topics requested by the university.
2. **Google Gemini API**: To connect live Gemini LLM:
   - Click the **Settings icon (⚙️)** in the top right navbar.
   - Enter your [Google AI Studio Gemini API Key](https://aistudio.google.com/app/apikey).
   - Alternatively, add `GEMINI_API_KEY=your_key_here` to `server/.env`.
