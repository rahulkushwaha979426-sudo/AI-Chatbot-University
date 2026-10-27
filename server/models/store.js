import bcrypt from 'bcryptjs';
import { isMongoConnected } from '../config/db.js';
import { UserModel } from './User.js';
import { ChatSessionModel } from './ChatSession.js';

// Seed demo user credentials
const DEFAULT_PASSWORD = 'password123';
const hashedPassword = bcrypt.hashSync(DEFAULT_PASSWORD, 10);

// In-Memory store fallback
const localStore = {
  users: [
    {
      _id: 'usr_demo_01',
      id: 'usr_demo_01',
      name: 'Aarav Sharma',
      email: 'student@apex.edu',
      password: hashedPassword,
      studentId: 'APEX-2023-CS042',
      department: 'Computer Science & Engineering',
      semester: 'Semester 4',
      cgpa: 8.92,
      attendance: 88.5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phoneNumber: '+91 98110 54321',
      hostelResident: true,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      createdAt: new Date('2024-08-01')
    }
  ],
  sessions: [
    {
      _id: 'sess_sample_01',
      id: 'sess_sample_01',
      userId: 'usr_demo_01',
      title: 'Admissions & Scholarships Inquiry',
      category: 'Scholarships',
      createdAt: new Date(Date.now() - 3600 * 1000 * 24),
      updatedAt: new Date(),
      messages: [
        {
          _id: 'msg_01',
          sender: 'user',
          content: 'Hello! Can you tell me what scholarship options are available for Computer Science students?',
          timestamp: new Date(Date.now() - 3600 * 1000 * 24),
          category: 'Scholarships',
          feedback: 'none'
        },
        {
          _id: 'msg_02',
          sender: 'assistant',
          content: `Welcome to **Apex Institute of Science and Technology Virtual Support**! 🎓\n\nHere are the top scholarship opportunities available for you:\n\n1. **Merit-Based Scholarship**:\n   - **100% Tuition Waiver**: JEE Main Rank < 10,000 or Class 12th Board >= 95%\n   - **50% Tuition Waiver**: Class 12th Board 90% - 94.9%\n   - **25% Tuition Waiver**: Class 12th Board 85% - 89.9%\n\n2. **Apex Merit Continuation**:\n   - Maintain a CGPA of **8.5 or higher** each academic year to retain your annual waiver.\n\n3. **Need-cum-Means Financial Aid**:\n   - Up to 75% fee concession for families with annual income < ₹2.5 Lakhs.\n\n4. **Sports & Special Concessions**:\n   - 50%-100% sports quota for state/national medalists.\n   - 15% concession for Single Girl Child & Defence wards.\n\nWould you like guidance on submitting your scholarship application through the ERP portal?`,
          timestamp: new Date(Date.now() - 3600 * 1000 * 24 + 1000),
          category: 'Scholarships',
          feedback: 'like'
        }
      ]
    }
  ],
  queryLogs: [
    { category: 'Scholarships', timestamp: new Date(), latency: 240 },
    { category: 'Admissions', timestamp: new Date(), latency: 190 },
    { category: 'Exams', timestamp: new Date(), latency: 310 },
    { category: 'Hostel', timestamp: new Date(), latency: 180 },
    { category: 'Placements', timestamp: new Date(), latency: 290 },
    { category: 'Timetable', timestamp: new Date(), latency: 150 },
    { category: 'Attendance', timestamp: new Date(), latency: 210 },
    { category: 'Fees', timestamp: new Date(), latency: 260 }
  ]
};

// Data Access Layer
export const DBStore = {
  // USER METHODS
  async findUserByEmail(email) {
    const cleanEmail = email.toLowerCase().trim();
    if (isMongoConnected) {
      try {
        const u = await UserModel.findOne({ email: cleanEmail });
        return u ? u.toObject() : null;
      } catch (err) {
        console.error('Mongo findUserByEmail error:', err.message);
      }
    }
    const user = localStore.users.find(u => u.email.toLowerCase() === cleanEmail);
    return user || null;
  },

  async findUserById(id) {
    if (isMongoConnected) {
      try {
        const u = await UserModel.findById(id);
        return u ? u.toObject() : null;
      } catch (err) {
        console.error('Mongo findUserById error:', err.message);
      }
    }
    const user = localStore.users.find(u => u._id === id || u.id === id);
    return user || null;
  },

  async createUser(userData) {
    if (isMongoConnected) {
      try {
        const created = await UserModel.create(userData);
        return created.toObject();
      } catch (err) {
        console.error('Mongo createUser error:', err.message);
      }
    }
    const id = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const newUser = {
      _id: id,
      id: id,
      ...userData,
      studentId: userData.studentId || 'APEX-' + Math.floor(100000 + Math.random() * 900000),
      department: userData.department || 'Computer Science & Engineering',
      semester: userData.semester || 'Semester 1',
      cgpa: userData.cgpa || 8.0,
      attendance: userData.attendance || 85.0,
      avatar: userData.avatar || '',
      phoneNumber: userData.phoneNumber || '+91 98765 00000',
      hostelResident: userData.hostelResident ?? false,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      createdAt: new Date()
    };
    localStore.users.push(newUser);
    return newUser;
  },

  async updateUser(id, updates) {
    if (isMongoConnected) {
      try {
        const updated = await UserModel.findByIdAndUpdate(id, updates, { new: true });
        return updated ? updated.toObject() : null;
      } catch (err) {
        console.error('Mongo updateUser error:', err.message);
      }
    }
    const index = localStore.users.findIndex(u => u._id === id || u.id === id);
    if (index !== -1) {
      localStore.users[index] = { ...localStore.users[index], ...updates };
      return localStore.users[index];
    }
    return null;
  },

  async setResetToken(email, token, expiresAt) {
    const cleanEmail = email.toLowerCase().trim();
    if (isMongoConnected) {
      try {
        return await UserModel.findOneAndUpdate(
          { email: cleanEmail },
          { resetPasswordToken: token, resetPasswordExpires: expiresAt },
          { new: true }
        );
      } catch (err) {
        console.error('Mongo setResetToken error:', err.message);
      }
    }
    const user = localStore.users.find(u => u.email.toLowerCase() === cleanEmail);
    if (user) {
      user.resetPasswordToken = token;
      user.resetPasswordExpires = expiresAt;
      return user;
    }
    return null;
  },

  async resetPasswordByToken(token, newPasswordHash) {
    if (isMongoConnected) {
      try {
        const user = await UserModel.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: new Date() }
        });
        if (!user) return null;
        user.password = newPasswordHash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        return user.toObject();
      } catch (err) {
        console.error('Mongo resetPasswordByToken error:', err.message);
      }
    }
    const user = localStore.users.find(
      u => u.resetPasswordToken === token && u.resetPasswordExpires > new Date()
    );
    if (user) {
      user.password = newPasswordHash;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      return user;
    }
    return null;
  },

  // CHAT SESSION METHODS
  async getUserSessions(userId) {
    if (isMongoConnected) {
      try {
        const list = await ChatSessionModel.find({ userId }).sort({ updatedAt: -1 });
        return list.map(item => item.toObject());
      } catch (err) {
        console.error('Mongo getUserSessions error:', err.message);
      }
    }
    return localStore.sessions
      .filter(s => s.userId === userId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  },

  async getSessionById(sessionId, userId) {
    if (isMongoConnected) {
      try {
        const sess = await ChatSessionModel.findOne({ _id: sessionId, userId });
        return sess ? sess.toObject() : null;
      } catch (err) {
        console.error('Mongo getSessionById error:', err.message);
      }
    }
    return localStore.sessions.find(
      s => (s._id === sessionId || s.id === sessionId) && s.userId === userId
    ) || null;
  },

  async createSession(userId, title = 'New Conversation', category = 'General') {
    if (isMongoConnected) {
      try {
        const created = await ChatSessionModel.create({
          userId,
          title,
          category,
          messages: []
        });
        return created.toObject();
      } catch (err) {
        console.error('Mongo createSession error:', err.message);
      }
    }
    const id = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const newSession = {
      _id: id,
      id: id,
      userId,
      title,
      category,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    localStore.sessions.unshift(newSession);
    return newSession;
  },

  async addMessage(sessionId, message) {
    const msgId = 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const fullMessage = {
      _id: msgId,
      id: msgId,
      timestamp: new Date(),
      feedback: 'none',
      ...message
    };

    if (isMongoConnected) {
      try {
        const updated = await ChatSessionModel.findByIdAndUpdate(
          sessionId,
          {
            $push: { messages: fullMessage },
            $set: { updatedAt: new Date() }
          },
          { new: true }
        );
        return { updatedSession: updated ? updated.toObject() : null, message: fullMessage };
      } catch (err) {
        console.error('Mongo addMessage error:', err.message);
      }
    }

    const sess = localStore.sessions.find(s => s._id === sessionId || s.id === sessionId);
    if (sess) {
      sess.messages.push(fullMessage);
      sess.updatedAt = new Date();
      return { updatedSession: sess, message: fullMessage };
    }
    return null;
  },

  async updateFeedback(sessionId, messageId, feedback) {
    if (isMongoConnected) {
      try {
        await ChatSessionModel.updateOne(
          { _id: sessionId, 'messages._id': messageId },
          { $set: { 'messages.$.feedback': feedback } }
        );
        return true;
      } catch (err) {
        console.error('Mongo updateFeedback error:', err.message);
      }
    }
    const sess = localStore.sessions.find(s => s._id === sessionId || s.id === sessionId);
    if (sess) {
      const msg = sess.messages.find(m => m._id === messageId || m.id === messageId);
      if (msg) {
        msg.feedback = feedback;
        return true;
      }
    }
    return false;
  },

  async renameSession(sessionId, userId, title) {
    if (isMongoConnected) {
      try {
        const updated = await ChatSessionModel.findOneAndUpdate(
          { _id: sessionId, userId },
          { title, updatedAt: new Date() },
          { new: true }
        );
        return updated ? updated.toObject() : null;
      } catch (err) {
        console.error('Mongo renameSession error:', err.message);
      }
    }
    const sess = localStore.sessions.find(
      s => (s._id === sessionId || s.id === sessionId) && s.userId === userId
    );
    if (sess) {
      sess.title = title;
      sess.updatedAt = new Date();
      return sess;
    }
    return null;
  },

  async deleteSession(sessionId, userId) {
    if (isMongoConnected) {
      try {
        await ChatSessionModel.deleteOne({ _id: sessionId, userId });
        return true;
      } catch (err) {
        console.error('Mongo deleteSession error:', err.message);
      }
    }
    const idx = localStore.sessions.findIndex(
      s => (s._id === sessionId || s.id === sessionId) && s.userId === userId
    );
    if (idx !== -1) {
      localStore.sessions.splice(idx, 1);
      return true;
    }
    return false;
  },

  async clearSession(sessionId, userId) {
    if (isMongoConnected) {
      try {
        const updated = await ChatSessionModel.findOneAndUpdate(
          { _id: sessionId, userId },
          { messages: [], updatedAt: new Date() },
          { new: true }
        );
        return updated ? updated.toObject() : null;
      } catch (err) {
        console.error('Mongo clearSession error:', err.message);
      }
    }
    const sess = localStore.sessions.find(
      s => (s._id === sessionId || s.id === sessionId) && s.userId === userId
    );
    if (sess) {
      sess.messages = [];
      sess.updatedAt = new Date();
      return sess;
    }
    return null;
  },

  // ANALYTICS & QUERY LOGGING
  logQuery(userId, query, category, latency = 200) {
    localStore.queryLogs.push({
      userId,
      query,
      category,
      latency,
      timestamp: new Date()
    });
  },

  getAnalytics() {
    const counts = {};
    for (const log of localStore.queryLogs) {
      counts[log.category] = (counts[log.category] || 0) + 1;
    }
    const categories = Object.keys(counts).map(key => ({
      category: key,
      count: counts[key]
    }));

    return {
      totalQueries: localStore.queryLogs.length,
      categories,
      averageLatencyMs: 215,
      resolvedRate: '98.4%',
      satisfactionRate: '4.8 / 5.0'
    };
  }
};
