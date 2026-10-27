import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  category: { type: String, default: 'general' },
  feedback: { type: String, enum: ['like', 'dislike', 'none'], default: 'none' }
});

const chatSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, default: 'New Conversation' },
  category: { type: String, default: 'General Support' },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const ChatSessionModel = mongoose.models.ChatSession || mongoose.model('ChatSession', chatSessionSchema);
