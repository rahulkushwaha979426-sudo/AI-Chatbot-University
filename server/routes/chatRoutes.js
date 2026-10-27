import express from 'express';
import { DBStore } from '../models/store.js';
import { authenticateToken } from '../middleware/auth.js';
import { generateChatResponse, detectCategory } from '../services/aiService.js';

const router = express.Router();

// GET ALL SESSIONS FOR CURRENT STUDENT
router.get('/sessions', authenticateToken, async (req, res) => {
  try {
    const sessions = await DBStore.getUserSessions(req.user.id);
    res.json({ success: true, sessions });
  } catch (err) {
    console.error('Error fetching sessions:', err);
    res.status(500).json({ success: false, message: 'Could not fetch chat history.' });
  }
});

// CREATE NEW SESSION
router.post('/sessions', authenticateToken, async (req, res) => {
  try {
    const { title, category } = req.body;
    const session = await DBStore.createSession(
      req.user.id,
      title || 'New University Query',
      category || 'General Support'
    );
    res.status(201).json({ success: true, session });
  } catch (err) {
    console.error('Error creating session:', err);
    res.status(500).json({ success: false, message: 'Could not create new chat session.' });
  }
});

// GET SINGLE SESSION WITH MESSAGES
router.get('/sessions/:id', authenticateToken, async (req, res) => {
  try {
    const session = await DBStore.getSessionById(req.params.id, req.user.id);
    if (!session) {
      return res.status(404).json({ success: false, message: 'Chat session not found.' });
    }
    res.json({ success: true, session });
  } catch (err) {
    console.error('Error fetching session:', err);
    res.status(500).json({ success: false, message: 'Could not load conversation.' });
  }
});

// SEND MESSAGE & GENERATE AI RESPONSE
router.post('/sessions/:id/messages', authenticateToken, async (req, res) => {
  try {
    const { content, customApiKey } = req.body;
    const sessionId = req.params.id;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Message content cannot be empty.' });
    }

    // Verify session belongs to user
    let session = await DBStore.getSessionById(sessionId, req.user.id);
    if (!session) {
      // If session doesn't exist, create it
      session = await DBStore.createSession(req.user.id, content.slice(0, 32) + '...');
    }

    // Student profile context
    const student = await DBStore.findUserById(req.user.id);

    // 1. Add student message
    const studentMsgCategory = detectCategory(content);
    const userMsgResult = await DBStore.addMessage(session._id || session.id, {
      sender: 'user',
      content: content.trim(),
      category: studentMsgCategory
    });

    const startTime = Date.now();

    // 2. Generate AI response (Gemini API or smart university knowledge base)
    const aiResult = await generateChatResponse(
      content.trim(),
      session.messages || [],
      student,
      customApiKey
    );

    const latency = Date.now() - startTime;

    // 3. Add AI assistant message
    const botMsgResult = await DBStore.addMessage(session._id || session.id, {
      sender: 'assistant',
      content: aiResult.reply,
      category: aiResult.category,
      source: aiResult.source
    });

    // 4. Update session title if default
    if (session.title === 'New University Query' || session.title === 'New Conversation') {
      const newTitle = content.length > 35 ? content.slice(0, 35) + '...' : content;
      await DBStore.renameSession(session._id || session.id, req.user.id, newTitle);
    }

    // 5. Log query for analytics
    DBStore.logQuery(req.user.id, content, aiResult.category, latency);

    // 6. Return response
    res.json({
      success: true,
      userMessage: userMsgResult?.message,
      assistantMessage: botMsgResult?.message,
      source: aiResult.source,
      category: aiResult.category,
      errorNotice: aiResult.errorNotice
    });
  } catch (err) {
    console.error('Error generating chat response:', err);
    res.status(500).json({ success: false, message: 'AI Chatbot service encountered an issue.' });
  }
});

// RENAME SESSION
router.put('/sessions/:id/title', authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title is required.' });
    }
    const session = await DBStore.renameSession(req.params.id, req.user.id, title.trim());
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found.' });
    }
    res.json({ success: true, session });
  } catch (err) {
    console.error('Error renaming session:', err);
    res.status(500).json({ success: false, message: 'Could not rename conversation.' });
  }
});

// DELETE SESSION
router.delete('/sessions/:id', authenticateToken, async (req, res) => {
  try {
    const ok = await DBStore.deleteSession(req.params.id, req.user.id);
    if (!ok) {
      return res.status(404).json({ success: false, message: 'Session not found or already deleted.' });
    }
    res.json({ success: true, message: 'Conversation deleted successfully.' });
  } catch (err) {
    console.error('Error deleting session:', err);
    res.status(500).json({ success: false, message: 'Could not delete conversation.' });
  }
});

// CLEAR SESSION MESSAGES
router.post('/sessions/:id/clear', authenticateToken, async (req, res) => {
  try {
    const session = await DBStore.clearSession(req.params.id, req.user.id);
    res.json({ success: true, message: 'Chat history cleared.', session });
  } catch (err) {
    console.error('Error clearing session:', err);
    res.status(500).json({ success: false, message: 'Could not clear chat messages.' });
  }
});

// SUBMIT FEEDBACK (LIKE / DISLIKE)
router.post('/sessions/:id/messages/:messageId/feedback', authenticateToken, async (req, res) => {
  try {
    const { feedback } = req.body; // 'like' or 'dislike'
    const success = await DBStore.updateFeedback(req.params.id, req.params.messageId, feedback);
    res.json({ success, message: 'Feedback recorded, thank you!' });
  } catch (err) {
    console.error('Error updating feedback:', err);
    res.status(500).json({ success: false, message: 'Could not record feedback.' });
  }
});

export default router;
