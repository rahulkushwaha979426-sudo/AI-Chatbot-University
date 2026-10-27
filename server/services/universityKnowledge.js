// Comprehensive University Knowledge Base for AI Student Assistant
// Covers: Admissions, Courses, Subjects, Faculty, Timetable, Attendance, Exams,
// Results, Scholarships, Fees, Hostel, Library, Events, Clubs, Sports, Placements,
// Calendar, Policies, Contacts, FAQs.

export const UNIVERSITY_INFO = {
  name: "Apex Institute of Science and Technology (Apex University)",
  motto: "Empowering Minds, Shaping Tomorrow",
  accreditation: "NAAC Grade A++, Approved by AICTE, UGC Recognized",
  established: 1998,
  campus: {
    location: "Knowledge City, Sector 62, Innovation Corridor",
    area: "120 Acres lush green eco-friendly campus",
    timings: "Monday to Saturday: 8:30 AM - 6:00 PM (Library & Labs open 24/7 during exams)"
  },
  emergencyHelpline: "+91 (011) 2999-4400 / Toll Free: 1800-123-APEX",
  email: "support@apexuniversity.edu.in",
  portalUrl: "https://portal.apexuniversity.edu.in"
};

export const KNOWLEDGE_TOPICS = {
  admissions: {
    title: "Admissions & Eligibility",
    summary: "Complete guide for UG, PG, and PhD admissions for academic year 2025-2026.",
    details: [
      "Eligibility for B.Tech: Minimum 60% aggregate in 10+2 with Physics, Mathematics, and Chemistry/Computer Science. Valid JEE Main score or Apex University Entrance Exam (AUEE).",
      "Eligibility for BCA / B.Sc: Minimum 50% in 10+2 with Mathematics or Computer Applications as a recognized subject.",
      "Eligibility for M.Tech: Valid GATE score or departmental screening test with min 55% in B.E./B.Tech.",
      "Eligibility for MBA: Minimum 50% in graduation + CAT/MAT/XAT/CMAT or APEX-MAT score followed by GD-PI.",
      "Application Process: Online via admissions portal (admissions.apexuniversity.edu.in). Application fee: ₹1,200.",
      "Important Dates: Application starts March 1, Phase 1 closes June 15, Entrance Exam on June 22, Counselling begins July 5.",
      "Lateral Entry: Diploma holders can apply directly for B.Tech 2nd Year (3rd Semester) through LEET with min 60% diploma marks.",
      "Refund Policy: 100% refund up to 15 days before commencement, 80% up to orientation day, as per UGC guidelines."
    ]
  },
  courses: {
    title: "Courses, Programs & Degrees",
    summary: "Undergraduate, Postgraduate, and Doctoral degree offerings.",
    details: [
      "School of Engineering & Technology: B.Tech (CSE, AI & Data Science, Electronics & Comm, Mechanical, Civil), M.Tech (Software Engg, VLSI, Robotics).",
      "School of Computing & IT: BCA (Cloud & Cybersecurity), MCA (Full Stack & Cloud Computing), B.Sc (Computer Science & AI).",
      "School of Business: BBA (FinTech, Digital Marketing), MBA (Data Analytics, Human Resources, Supply Chain).",
      "Credit System: Choice Based Credit System (CBCS). B.Tech requires 160 credits over 8 semesters; BCA requires 120 credits over 6 semesters.",
      "Dual Degree / Minors: Students with CGPA >= 8.0 can take Minor Specializations in AI/ML, FinTech, or Cyber Law."
    ]
  },
  subjects: {
    title: "Curriculum & Subjects",
    summary: "Course structure, core courses, electives, and practical syllabi.",
    details: [
      "CSE Semester 1 & 2: Engineering Mathematics, Physics for Computing, Programming in C & Python, Digital Electronics, Communication Skills.",
      "CSE Semester 3 & 4: Data Structures & Algorithms, Object-Oriented Programming (Java/C++), Computer Organization & Architecture, Database Management Systems (DBMS), Discrete Mathematics, Operating Systems.",
      "CSE Semester 5 & 6: Computer Networks, Formal Languages & Automata, Software Engineering, Artificial Intelligence & Machine Learning, Web Technologies, Cloud Computing.",
      "CSE Semester 7 & 8: Deep Learning, Information & Cyber Security, Distributed Systems, Capstone Industry Project, Open Electives.",
      "Lab Hours: Every practical subject includes 3 hours weekly hands-on laboratory sessions with continuous internal assessment."
    ]
  },
  faculty: {
    title: "Faculty & Academic Mentors",
    summary: "Distinguished professors, HODs, and academic council.",
    details: [
      "Dean of Academic Affairs: Prof. Dr. Arvind Ramanathan, Ph.D. (IIT Delhi), Cabin: Admin Block Room 204, Email: dean.academic@apexuniversity.edu.in",
      "HOD Computer Science & Engg: Prof. Dr. Meera Nambiar, Ph.D. (IISc Bangalore), Research: Deep Learning & NLP, Cabin: Tech Block B-302, Office Hours: Tue/Thu 3 PM - 5 PM.",
      "HOD Information Technology: Dr. Rajeshwar Sen, Ph.D., Research: Cloud Security & IoT, Cabin: Tech Block B-310.",
      "Faculty Student Ratio: 1:15, with over 78% doctorate holders from premier global and national institutes.",
      "Faculty Mentorship: Each student is assigned a dedicated Faculty Mentor for academic guidance, career roadmap, and grievance support."
    ]
  },
  timetable: {
    title: "Class Timetables & Daily Schedule",
    summary: "Lecture hours, lab slots, lunch breaks, and academic working hours.",
    details: [
      "Regular Lecture Timings: Monday to Friday from 9:00 AM to 4:45 PM.",
      "Period Breakdown: Period 1 (9:00 - 9:55 AM), Period 2 (9:55 - 10:50 AM), Tea Break (10:50 - 11:05 AM), Period 3 (11:05 - 12:00 PM), Period 4 (12:00 - 12:55 PM).",
      "Lunch Break: 12:55 PM - 1:50 PM across all departments.",
      "Afternoon Sessions / Labs: 1:50 PM - 4:45 PM (Two continuous 80-min lab sessions).",
      "Saturdays: 1st and 3rd Saturdays are working for technical workshops, club activities, and remedial classes. 2nd and 4th Saturdays are off.",
      "Timetable Portal: Real-time section timetables can be downloaded from ERP Student Portal > Academics > My Timetable."
    ]
  },
  attendance: {
    title: "Attendance Regulations & Leave Policy",
    summary: "Minimum attendance norms, condonation rules, and medical leaves.",
    details: [
      "Mandatory Requirement: Minimum 75% attendance in both lectures and practicals individually to be eligible for End-Semester Examinations.",
      "Medical Condonation: Up to 10% relaxation (i.e. minimum 65%) can be granted on genuine medical grounds upon submission of verified hospital certificate within 7 working days of recovery.",
      "Duty Leave (OD): Students representing the university in sports, inter-college hackathons, or cultural fests receive On-Duty attendance credit approved by the HOD.",
      "Attendance Tracking: Real-time biometric and RFID logging viewable daily on the Student Mobile App.",
      "Critical Warning: Students with attendance between 65-74% without condonation receive debarment warning; below 65% results in automatic semester debarment (Grade I - Incomplete)."
    ]
  },
  exams: {
    title: "Examinations & Evaluation System",
    summary: "Mid-term, End-term exams, practical assessments, and evaluation scheme.",
    details: [
      "Weightage Breakdown: 40% Continuous Internal Evaluation (CIE) + 60% Semester End Examination (SEE).",
      "Continuous Internal Evaluation (40 Marks): Two Mid-Term Tests (20 marks best-of-two), Quizzes & Assignments (10 marks), Class Participation & Attendance (10 marks).",
      "Semester End Examination (60 Marks): 3-hour comprehensive theory paper conducted centrally by the Controller of Examinations.",
      "Supplementary & Backlog Exams: Conducted twice a year (during July-August and January). Students can register on the ERP exam module with fee ₹600 per paper.",
      "Revaluation / Paper Inspection: Students can apply for photocopy of answer script (₹400) and re-checking (₹800 per subject) within 15 days of result declaration.",
      "Exam Hall Rules: Mandatory physical or digital Student ID card and Hall Ticket. Smartwatches, cell phones, and programmable calculators are strictly prohibited."
    ]
  },
  results: {
    title: "Results, CGPA & Grading Scale",
    summary: "Grading system, calculation of SGPA/CGPA, transcripts, and degree honors.",
    details: [
      "10-Point Relative Grading Scale: O (Outstanding, 10.0, 90%+), A+ (Excellent, 9.0, 80-89%), A (Very Good, 8.0, 70-79%), B+ (Good, 7.0, 60-69%), B (Above Average, 6.0, 50-59%), C (Pass, 5.0, 40-49%), F (Fail, 0, <40%).",
      "SGPA Formula: Sum of (Course Credits × Grade Points) divided by Total Semester Credits.",
      "CGPA: Cumulative average across all completed semesters.",
      "First Class with Distinction: Minimum 7.5 CGPA in first attempt with no backlogs.",
      "Official Transcripts & Degree: Digital verified transcripts with QR code available within 48 hours on Digilocker and ERP Student Portal."
    ]
  },
  scholarships: {
    title: "Scholarships & Financial Aid",
    summary: "Merit, sports, socio-economic scholarships, and fee concessions.",
    details: [
      "Merit-Based Scholarship: 100% tuition waiver for JEE Rank < 10,000 or 12th Board >= 95%; 50% waiver for 12th Board 90-94.9%; 25% waiver for 12th Board 85-89.9%.",
      "Apex Merit Continuation: Maintain CGPA >= 8.5 with no disciplinary record to retain annual scholarship.",
      "Need-cum-Means Financial Aid: Up to 75% fee concession for students with family annual income < ₹2.5 Lakhs (Income certificate required).",
      "Sports Quota Scholarship: 50% to 100% waiver for national/state level medal winners in recognized sports.",
      "Single Girl Child / Defence Wards: 15% tuition fee concession throughout the program duration.",
      "Government Schemes: Full coordination for National Scholarship Portal (NSP), Post-Matric SC/ST/OBC scholarships, and state welfare schemes."
    ]
  },
  fees: {
    title: "Fee Structure, Installments & Payment",
    summary: "Tuition fees, payment dates, bank details, and penalty guidelines.",
    details: [
      "B.Tech Annual Tuition: ₹1,80,000 (payable in 2 installments of ₹90,000 per semester).",
      "BCA / B.Sc Annual Tuition: ₹95,000 (₹47,500 per semester).",
      "M.Tech / MBA Annual Tuition: ₹1,60,000 (₹80,000 per semester).",
      "One-time Charges at Admission: Caution Deposit (Refundable): ₹10,000; Registration & Alumni Fee: ₹5,000.",
      "Due Dates: Odd Semester fees due by July 31st; Even Semester fees due by January 15th.",
      "Late Fee: ₹100 per day up to 15 days, ₹250 per day up to 30 days. Beyond 30 days, registration gets suspended.",
      "Payment Channels: ERP Netbanking, UPI, Credit/Debit card, or NEFT/RTGS to Bank of Baroda A/C: 981200210041, IFSC: BARB0APEXUN."
    ]
  },
  hostel: {
    title: "Hostel Facilities & Accommodation",
    summary: "Hostel rooms, dining mess, laundry, gym, curfew, and warden contacts.",
    details: [
      "Room Options & Annual Rent: 3-Sharing Non-AC: ₹85,000/yr; 2-Sharing Non-AC: ₹1,05,000/yr; 2-Sharing AC: ₹1,35,000/yr; Single AC: ₹1,65,000/yr (includes 4-time buffet meals).",
      "Hostel Amenities: High-speed Wi-Fi, laundry service (20 clothes/month included), 24/7 power backup, indoor games room, hot water geysers, RO purified drinking water.",
      "Mess Menu: Hygienic vegetarian & non-vegetarian options (North & South Indian cuisines), evening tea with snacks, special Sunday feasts.",
      "Hostel Timings & Curfew: Main gate closes at 9:30 PM on weekdays and 10:30 PM on weekends. Night outs require digital pass approved by parent via ERP Parent App.",
      "Chief Warden Contacts: Boys Hostel - Prof. S. K. Verma (+91 98765-43210); Girls Hostel - Dr. Ananya Mukherjee (+91 98765-43211)."
    ]
  },
  library: {
    title: "Central Library & Digital Resources",
    summary: "Library catalog, working hours, borrow limits, e-resources, and study spaces.",
    details: [
      "Timings: Monday - Saturday: 8:00 AM - 11:00 PM. During Mid-term & Final Exam weeks: Open 24/7.",
      "Collection: Over 85,000 physical volumes, 12,000 reference titles, and subscriptions to 140+ national and international print journals.",
      "Digital Access: Campus-wide and remote proxy access to IEEE Xplore, ScienceDirect, SpringerLink, ACM Digital Library, Scopus, and NPTEL lectures.",
      "Borrowing Limits: UG Students: 4 books for 14 days; PG/Research: 6 books for 28 days. Renewal possible twice online if not reserved.",
      "Overdue Fines: ₹5 per day per book for first 7 days, ₹10 per day thereafter.",
      "Facilities: 500-seat silent study hall, 8 group discussion pods, multimedia lab with 60 high-performance workstations for computational research."
    ]
  },
  events: {
    title: "Campus Events & Annual Fests",
    summary: "Flagship cultural, technical, entrepreneurial, and sports events.",
    details: [
      "AURA (Annual Cultural Fest): March - 3 days of music concerts, fashion shows, dance face-offs, celebrity night with 15,000+ participants.",
      "TECHVORTEX (National Hackathon & Tech Fest): October - 36-hour hackathon, robotics arena, coding marathon, competitive gaming with ₹5,00,000 prize pool.",
      "APEX E-SUMMIT: November - Organized by E-Cell featuring venture capitalists, startup pitching, and keynote by unicorn founders.",
      "KHELOTSAV (Annual Sports Meet): February - Inter-department and inter-collegiate athletics, cricket, football, basketball, and volleyball championships.",
      "TEDxApexUniversity: September - Independent event sharing inspiring ideas from industry pioneers and student innovators."
    ]
  },
  clubs: {
    title: "Student Clubs & Technical Societies",
    summary: "Clubs for coding, robotics, arts, social service, and entrepreneurship.",
    details: [
      "Apex Coding Club / ACM Student Chapter: Weekly LeetCode challenges, algorithm sprints, open-source workshops, hackathon mentoring.",
      "RoboTech & IoT Club: Hands-on autonomous drones, Arduino/Raspberry Pi projects, fighting bots for TechVortex.",
      "Google Developer Student Club (GDSC): Mobile, Web, Cloud, and Machine Learning solution challenges.",
      "Rotaract & NSS Wing: Community outreach, blood donation camps, digital literacy drives for local schools, tree plantation initiatives.",
      "Dhwani Music Society & Footloose Dance Troupe: Vibrant stage performers representing university at national cultural competitions.",
      "How to Join: Club induction drives take place during the 3rd week of August. Registrations open on ERP > Student Life > Club Memberships."
    ]
  },
  sports: {
    title: "Sports & Recreational Facilities",
    summary: "Outdoor grounds, indoor sports complex, swimming pool, and gym.",
    details: [
      "Outdoor Infrastructure: Full-sized floodlit cricket stadium, FIFA-standard football turf, 400m synthetic running track, 2 tennis courts.",
      "Indoor Sports Complex: 4 wooden badminton courts, 2 squash courts, table tennis arena, Olympic-grade 50-meter swimming pool.",
      "Fitness Center: 4,000 sq ft gymnasium with certified trainers, cardio equipment, free weights, and crossfit zone (Open 6 AM - 9 AM & 4:30 PM - 9 PM).",
      "Varsity Teams: Trials for university teams (Cricket, Football, Basketball, Badminton, Athletics) held in September.",
      "Coaching Clinics: Free weekend training clinics with NIS certified coaches for beginners."
    ]
  },
  placements: {
    title: "Training & Placement Cell (T&P)",
    summary: "Placement statistics, recruiting partners, internship policies, and training modules.",
    details: [
      "Placement Statistics 2024-2025: Highest Package: ₹44.5 LPA (International/Domestic); Average Package: ₹8.6 LPA; Overall Placement Rate: 94.2%.",
      "Top Recruiters: Google, Microsoft, Amazon, Cisco, Goldman Sachs, Oracle, Deloitte, Infosys, TCS, Wipro, Capgemini, Larsen & Toubro, Tata Motors.",
      "Pre-Placement Training: Aptitude training, Data Structures & System Design bootcamps, mock HR interviews, resume building workshops starting from Semester 5.",
      "Internship Policy: Mandatory 8-week summer internship after Semester 6. Full 8th semester dedicated to 6-month industry internship with stipend.",
      "T&P Portal: Registration begins in Semester 6. Minimum eligibility for tier-1 recruiters: CGPA >= 7.0 with no active backlogs.",
      "Contact: Head of Placements - Dr. Rohit Malhotra, Email: placements@apexuniversity.edu.in, Placement Office: Admin Block 1st Floor."
    ]
  },
  calendar: {
    title: "Academic Calendar 2025-2026",
    summary: "Key dates for semesters, examinations, vacations, and holidays.",
    details: [
      "Odd Semester: Classes commence August 1; Mid-Term Tests: September 22 - September 29; Practical Exams: November 15 - November 22; End-Semester Exams: December 1 - December 20.",
      "Winter Vacation: December 21 - January 10.",
      "Even Semester: Classes commence January 12; Tech Fest: March 5 - March 7; Mid-Term Tests: March 16 - March 23; Practical Exams: May 5 - May 12; End-Semester Exams: May 18 - June 6.",
      "Summer Vacation & Internship Window: June 7 - July 31.",
      "Holidays: Republic Day (Jan 26), Holi (March 14), Independence Day (Aug 15), Gandhi Jayanti (Oct 2), Diwali Break (Nov 1 - Nov 5)."
    ]
  },
  policies: {
    title: "University Policies & Student Conduct",
    summary: "Anti-ragging, code of conduct, women safety, and grievance procedures.",
    details: [
      "Zero-Tolerance Anti-Ragging Policy: Strictly complies with UGC & Supreme Court regulations. Ragging in any form is a cognizable criminal offense punishable by immediate rustication and FIR.",
      "Anti-Ragging Helpline: 1800-180-5522 (National) / 011-2999-4499 (Internal Squad Headed by Dean).",
      "Internal Complaints Committee (ICC / POSH): Ensures prevention and redressal of sexual harassment. Strict confidentiality maintained. Email: icc@apexuniversity.edu.in.",
      "Campus Code of Conduct: ID cards must be worn on campus at all times. Smoking, alcohol, or illicit substance possession leads to immediate expulsion.",
      "Student Grievance Redressal Committee: Submit confidential academic or administrative complaints via ERP Grievance Portal. Action report generated within 10 days."
    ]
  },
  contacts: {
    title: "University Directory & Help Desks",
    summary: "Important phone numbers, emails, and office locations.",
    details: [
      "Registrar Office: Phone: +91 11 2999-4401, Email: registrar@apexuniversity.edu.in, Admin Block Room 101.",
      "Controller of Examinations: Phone: +91 11 2999-4405, Email: coe@apexuniversity.edu.in, Exam Cell Block C.",
      "Student Welfare & Dean Affairs: Phone: +91 11 2999-4412, Email: dsw@apexuniversity.edu.in, Student Center 2nd Floor.",
      "Accounts & Fee Section: Phone: +91 11 2999-4420, Email: accounts@apexuniversity.edu.in, Admin Block Ground Floor.",
      "Campus Medical Center & Ambulance: 24/7 Helpline: +91 11 2999-4491, Doctor on duty: Block F Medical Unit.",
      "Campus IT Helpdesk / ERP Support: Email: itsupport@apexuniversity.edu.in, Extension: 4488."
    ]
  },
  faqs: {
    title: "Frequently Asked Questions (FAQs)",
    summary: "Quick answers to the top student inquiries.",
    details: [
      "Q: How do I calculate my CGPA?\nA: Multiply each subject's credit by the grade point earned, sum them up, and divide by total credits earned across all semesters.",
      "Q: What if I miss a mid-term exam due to sickness?\nA: Submit a medical certificate and apply for re-mid-term exam to your HOD within 5 working days of exam completion.",
      "Q: Can I change my branch after 1st year?\nA: Yes, branch change is allowed at the end of 1st year for students with CGPA >= 8.5 without backlogs, subject to seat availability.",
      "Q: Where can I get my bonafide certificate for education loan or passport?\nA: Apply online through ERP Student Portal > Documents > Request Bonafide. It will be digitally signed and ready to download in 24 hours.",
      "Q: How do I pay semester fees in installments?\nA: Contact the Accounts Section with an application co-signed by parents. Maximum 2 installments are granted upon approval from Registrar.",
      "Q: Are laptops mandatory for engineering students?\nA: Yes, a laptop with min 16GB RAM and modern multi-core processor (Core i5 / Ryzen 5 or higher) is recommended for lab coursework and programming projects."
    ]
  }
};

// Search knowledge base for relevant context
export function findRelevantContext(query) {
  const q = query.toLowerCase();
  const matched = [];

  for (const [key, topic] of Object.entries(KNOWLEDGE_TOPICS)) {
    let score = 0;
    const words = q.split(/\s+/);

    if (q.includes(key)) score += 5;
    if (q.includes(topic.title.toLowerCase())) score += 4;

    for (const w of words) {
      if (w.length > 3) {
        if (topic.title.toLowerCase().includes(w)) score += 2;
        if (topic.summary.toLowerCase().includes(w)) score += 1;
        for (const detail of topic.details) {
          if (detail.toLowerCase().includes(w)) score += 1;
        }
      }
    }

    if (score > 0) {
      matched.push({ key, topic, score });
    }
  }

  // Sort by score
  matched.sort((a, b) => b.score - a.score);

  if (matched.length === 0) {
    // Return default overview
    return [
      KNOWLEDGE_TOPICS.admissions,
      KNOWLEDGE_TOPICS.courses,
      KNOWLEDGE_TOPICS.exams,
      KNOWLEDGE_TOPICS.contacts
    ];
  }

  return matched.slice(0, 3).map(m => m.topic);
}
