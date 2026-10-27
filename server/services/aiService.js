import { GoogleGenerativeAI } from '@google/generative-ai';
import { UNIVERSITY_INFO, KNOWLEDGE_TOPICS, findRelevantContext } from './universityKnowledge.js';

// Detect query category for analytics and context specialization
export function detectCategory(query) {
  const q = query.toLowerCase();
  if (q.includes('admit') || q.includes('admission') || q.includes('apply') || q.includes('entrance') || q.includes('eligibility')) return 'Admissions';
  if (q.includes('course') || q.includes('degree') || q.includes('b.tech') || q.includes('mca') || q.includes('bca') || q.includes('curriculum')) return 'Courses';
  if (q.includes('subject') || q.includes('syllabus') || q.includes('math') || q.includes('dsa') || q.includes('dbms')) return 'Subjects';
  if (q.includes('faculty') || q.includes('professor') || q.includes('teacher') || q.includes('hod') || q.includes('dean')) return 'Faculty';
  if (q.includes('timetable') || q.includes('schedule') || q.includes('period') || q.includes('lecture time') || q.includes('timing')) return 'Timetable';
  if (q.includes('attendance') || q.includes('75%') || q.includes('shortage') || q.includes('medical leave') || q.includes('od')) return 'Attendance';
  if (q.includes('exam') || q.includes('mid-term') || q.includes('mid term') || q.includes('reval') || q.includes('backlog') || q.includes('test')) return 'Exams';
  if (q.includes('result') || q.includes('cgpa') || q.includes('sgpa') || q.includes('grade') || q.includes('marksheet')) return 'Results';
  if (q.includes('scholarship') || q.includes('waiver') || q.includes('financial aid') || q.includes('concession')) return 'Scholarships';
  if (q.includes('fee') || q.includes('tuition') || q.includes('installment') || q.includes('fine') || q.includes('dues')) return 'Fees';
  if (q.includes('hostel') || q.includes('mess') || q.includes('room') || q.includes('warden') || q.includes('curfew')) return 'Hostel';
  if (q.includes('library') || q.includes('book') || q.includes('ieee') || q.includes('reading room') || q.includes('journal')) return 'Library';
  if (q.includes('event') || q.includes('fest') || q.includes('aura') || q.includes('hackathon') || q.includes('celebration')) return 'Campus Events';
  if (q.includes('club') || q.includes('society') || q.includes('acm') || q.includes('gdsc') || q.includes('dance') || q.includes('music')) return 'Clubs';
  if (q.includes('sport') || q.includes('gym') || q.includes('cricket') || q.includes('pool') || q.includes('badminton')) return 'Sports';
  if (q.includes('placement') || q.includes('package') || q.includes('recruiter') || q.includes('interview') || q.includes('job') || q.includes('internship')) return 'Placements';
  if (q.includes('calendar') || q.includes('vacation') || q.includes('holiday') || q.includes('diwali') || q.includes('semester start')) return 'Academic Calendar';
  if (q.includes('ragging') || q.includes('policy') || q.includes('grievance') || q.includes('rule') || q.includes('harassment')) return 'University Policies';
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('helpline') || q.includes('emergency') || q.includes('address')) return 'Contact Information';
  return 'General Support';
}

// Generate smart, context-rich fallback response directly from university knowledge base
function generateIntelligentOfflineResponse(userMessage, conversationHistory = [], studentProfile = null) {
  const category = detectCategory(userMessage);
  const relevantTopics = findRelevantContext(userMessage);
  const q = userMessage.toLowerCase().trim();

  // Personalized greeting if available
  const studentGreeting = studentProfile ? `Hello **${studentProfile.name}** (${studentProfile.studentId || 'Apex Student'}), ` : 'Hello! ';

  // Greetings handler
  if (/^(hi|hello|hey|good morning|good evening|good afternoon|namaste)/i.test(q) && q.length < 25) {
    return `${studentGreeting}Welcome to the **${UNIVERSITY_INFO.name} Virtual Assistant**! 🎓\n\nI am here 24/7 to help you with:\n- 📚 **Academics**: Courses, Syllabi, Timetables, Faculty\n- 📝 **Examinations**: Mid-terms, SEE Schedules, Results & CGPA, Backlogs\n- 💰 **Finances**: Fee Structures, Payment Deadlines, Scholarships\n- 🏢 **Campus Life**: Hostel Accommodation, Mess, Central Library, Sports\n- 💼 **Career**: Training & Placement statistics, Recruiter drives, Internships\n- 🚨 **Services**: University Contacts, Emergency Helpline, Grievance Cell\n\nHow may I assist you today? Feel free to ask any question or tap a quick prompt below!`;
  }

  // Thanks handler
  if (/^(thanks|thank you|awesome|great|appreciated)/i.test(q)) {
    return `You're very welcome! 😊 Always happy to assist you. If you have any more questions about courses, exams, fees, or campus life at **${UNIVERSITY_INFO.name}**, just let me know. Have a wonderful day ahead!`;
  }

  // Topic specific rich templates
  if (category === 'Admissions') {
    return `### 🎓 Admissions & Eligibility Guide — ${UNIVERSITY_INFO.name}\n\nHere are the official admissions details for the upcoming academic cycle:\n\n* **Undergraduate (B.Tech)**:\n  - Minimum **60% aggregate** in 10+2 with Physics, Mathematics, and Chemistry/CS.\n  - Valid **JEE Main** score or **Apex University Entrance Exam (AUEE)**.\n* **BCA / B.Sc (Data Science)**:\n  - Minimum **50% in 10+2** with Mathematics or Computer Applications.\n* **Postgraduate (M.Tech / MBA)**:\n  - M.Tech: Valid **GATE** score or university screening (min 55% in B.Tech).\n  - MBA: CAT/MAT/CMAT or APEX-MAT followed by GD-PI.\n* **Key Deadlines**:\n  - Online Application Phase 1: **March 1 – June 15**\n  - AUEE Entrance Test: **June 22**\n  - Counselling Sessions: **July 5 onwards**\n\n👉 **Application Portal**: Apply online with ₹1,200 fee at \`https://admissions.apexuniversity.edu.in\`.\n\n*Would you like to know about fee structures, hostel booking, or merit scholarships?*`;
  }

  if (category === 'Scholarships') {
    return `### 🌟 Scholarships & Financial Assistance at ${UNIVERSITY_INFO.name}\n\nWe believe every deserving student should have access to quality education. Here are our active scholarship programs:\n\n| Scholarship Scheme | Criteria | Award / Waiver |\n| :--- | :--- | :--- |\n| **Apex Super-Merit** | JEE Main < 10,000 Rank OR 12th Board ≥ 95% | **100% Tuition Waiver** |\n| **Merit Tier-2** | 12th Board 90.0% – 94.9% | **50% Tuition Waiver** |\n| **Merit Tier-3** | 12th Board 85.0% – 89.9% | **25% Tuition Waiver** |\n| **Need-cum-Means** | Family Annual Income < ₹2.5 Lakhs | **Up to 75% Concession** |\n| **Sports Excellence** | State/National Level Medalists | **50% – 100% Waiver** |\n| **Special Concession** | Single Girl Child / Defence Wards | **15% Annual Waiver** |\n\n📌 **Continuation Rule**: To retain merit scholarships across successive semesters, you must maintain a **CGPA of 8.5+** and clear all subjects on the first attempt.\n\n*Applications open at the start of each semester via ERP Portal > Finance > Apply Scholarship.*`;
  }

  if (category === 'Attendance') {
    return `### 📋 Attendance Policy & Condonation Guidelines\n\nAt **${UNIVERSITY_INFO.name}**, academic regularity is strictly monitored:\n\n1. **75% Mandatory Attendance**: Every student must maintain at least **75% attendance** in both lectures and laboratory sessions individually.\n2. **Medical Condonation**: Relaxation down to **65%** is permissible only for serious medical illnesses upon submitting a stamped medical certificate to your HOD within **7 days**.\n3. **On-Duty (OD) Leave**: Approved for official university representation in sports, hackathons, and conferences.\n4. **Critical Warning & Debarment**:\n   - **65% - 74%**: Placed on conditional probation / warning.\n   - **Below 65%**: Automatic debarment from Semester End Examinations (SEE).\n\n💡 *Tip: Check your live biometric attendance records anytime on the Student Portal.*`;
  }

  if (category === 'Exams' || category === 'Results') {
    return `### 📝 Examination & Evaluation Framework\n\n**Grading & Evaluation Scheme**:\n* **Continuous Internal Evaluation (CIE)**: 40 Marks (Two Mid-Terms for 20M best-of-two + Quizzes/Assignments 10M + Attendance 10M).\n* **Semester End Examination (SEE)**: 60 Marks (Comprehensive 3-hour centralized exam).\n\n**Relative Grading System (10-Point Scale)**:\n* **O (Outstanding)**: 10.0 Grade Points (90%+)\n* **A+ (Excellent)**: 9.0 Grade Points (80–89%)\n* **A (Very Good)**: 8.0 Grade Points (70–79%)\n* **B+ (Good)**: 7.0 Grade Points (60–69%)\n* **F (Fail)**: 0.0 Grade Points (<40% — Requires Backlog Exam)\n\n**Backlog & Revaluation**:\n- Supplementary examinations are conducted in July and January.\n- Revaluation fee: ₹800/subject; Answer script photocopy: ₹400/subject (apply within 15 days of result declaration).`;
  }

  if (category === 'Placements') {
    return `### 💼 Training & Placement Cell (T&P) Highlights\n\nOur campus boasts an exceptional placement record with leading global tech and core enterprises:\n\n* 🚀 **Highest Domestic / Global Package**: ₹44.5 LPA\n* 📈 **Average Campus Package**: ₹8.6 LPA\n* 🎯 **Placement Conversion Rate**: 94.2%\n* 🏢 **Top Recruiting Partners**: Google, Microsoft, Amazon, Cisco, Goldman Sachs, Oracle, Deloitte, TCS, Infosys, Capgemini.\n* 🛠️ **Training Support**: DSA Sprints, System Design classes, Resume workshops, and mock behavioral interviews start from **Semester 5**.\n* ⏳ **Internship Rule**: Mandatory 8-week summer internship after Semester 6; Semester 8 allows a full 6-month industry internship.`;
  }

  if (category === 'Hostel') {
    return `### 🏡 Hostel Accommodation & Amenities\n\nCampus housing is designed to be your home away from home:\n\n* **Room Categories & Annual Fees**:\n  - **3-Sharing Non-AC**: ₹85,000 / year\n  - **2-Sharing Non-AC**: ₹1,05,000 / year\n  - **2-Sharing AC**: ₹1,35,000 / year\n  - **Single AC**: ₹1,65,000 / year *(All fees include 4 meals daily in the dining mess)*\n* **Curfew & Timings**: Gates close at **9:30 PM (Weekdays)** and **10:30 PM (Weekends)**. Late outpass requires parent approval via the mobile app.\n* **Wardens On Duty**:\n  - Boys Hostel: Prof. S. K. Verma (\`+91 98765-43210\`)\n  - Girls Hostel: Dr. Ananya Mukherjee (\`+91 98765-43211\`)`;
  }

  if (category === 'Fees') {
    return `### 💳 Fee Structure & Online Payment Portal\n\n* **B.Tech Tuition**: ₹1,80,000/year (₹90,000 per semester).\n* **BCA / B.Sc**: ₹95,000/year (₹47,500 per semester).\n* **Payment Deadlines**:\n  - Odd Semester: **July 31st**\n  - Even Semester: **January 15th**\n* **Late Fines**: ₹100/day for first 15 days, ₹250/day up to 30 days.\n* **Bank Transfer Info**: Bank of Baroda, A/C: \`981200210041\`, IFSC: \`BARB0APEXUN\`.\n* Online payments accepted via NetBanking, UPI, and Cards on ERP Finance.`;
  }

  // Composite response based on matched context topics
  let answer = `### 🎓 ${relevantTopics[0]?.title || 'University Information'}\n\n`;
  for (const topic of relevantTopics) {
    answer += `**${topic.title}**\n${topic.summary}\n\n`;
    for (const point of topic.details.slice(0, 4)) {
      answer += `- ${point}\n`;
    }
    answer += '\n';
  }

  answer += `\n📞 **Need Direct Assistance?**\nContact the Student Welfare Desk at \`${UNIVERSITY_INFO.emergencyHelpline}\` or email \`${UNIVERSITY_INFO.email}\`.`;
  return answer;
}

// Master AI response generator (Gemini API with seamless offline fallback)
export async function generateChatResponse(userMessage, conversationHistory = [], studentProfile = null, customApiKey = null) {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  const category = detectCategory(userMessage);

  if (apiKey && apiKey.trim() !== '' && apiKey !== 'your_gemini_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Prefer modern gemini-1.5-flash or gemini-2.0-flash
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Gather relevant university knowledge
      const relevantTopics = findRelevantContext(userMessage);
      const kbSnippets = relevantTopics.map(t => `Topic: ${t.title}\nDetails:\n` + t.details.join('\n')).join('\n\n');

      const systemPrompt = `You are the official Virtual University Assistant for "${UNIVERSITY_INFO.name}".
Your role is to assist university students, applicants, and parents with 100% accuracy, warmth, clarity, and professionalism.

University Overview:
- Name: ${UNIVERSITY_INFO.name}
- Accreditation: ${UNIVERSITY_INFO.accreditation}
- Helpline: ${UNIVERSITY_INFO.emergencyHelpline}
- Support Email: ${UNIVERSITY_INFO.email}

Student Context (if logged in):
- Name: ${studentProfile?.name || 'Student'}
- Student ID: ${studentProfile?.studentId || 'N/A'}
- Department: ${studentProfile?.department || 'N/A'}
- Semester: ${studentProfile?.semester || 'N/A'}
- CGPA: ${studentProfile?.cgpa || 'N/A'}
- Attendance: ${studentProfile?.attendance || 'N/A'}%

Knowledge Base Reference:
${kbSnippets}

Instructions:
1. Provide structured, accurate, and empathetic responses using clear Markdown (bullet points, bold highlights, tables when presenting comparisons/fees/schedules).
2. If student asks about attendance, grades, or personal details, reference their student profile when relevant.
3. Keep the tone inspiring, respectful, and authoritative yet friendly.
4. If asked about emergency or safety issues, immediately provide the emergency helpline.`;

      // Build chat context
      const chatHistory = conversationHistory.slice(-6).map(msg => ({
        role: msg.sender === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        }
      });

      const promptWithSystem = `${systemPrompt}\n\nStudent Query: ${userMessage}`;
      const result = await chat.sendMessage(promptWithSystem);
      const text = result.response.text();

      return {
        reply: text,
        category,
        source: 'gemini-api'
      };
    } catch (err) {
      console.warn('⚠️ Gemini API call failed or key invalid, falling back to Knowledge Engine:', err.message);
      // Graceful fallback to rich offline engine
      const offlineReply = generateIntelligentOfflineResponse(userMessage, conversationHistory, studentProfile);
      return {
        reply: offlineReply,
        category,
        source: 'knowledge-engine-fallback',
        errorNotice: 'AI Key fallback active: answered via verified university knowledge repository.'
      };
    }
  }

  // Pure offline high-fidelity university knowledge engine
  const offlineReply = generateIntelligentOfflineResponse(userMessage, conversationHistory, studentProfile);
  return {
    reply: offlineReply,
    category,
    source: 'knowledge-engine'
  };
}
