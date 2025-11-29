import mongoose from 'mongoose';

const chatLogSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['user', 'assistant', 'system']
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  sessionId: {
    type: String,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Create a compound index for sessionId and createdAt for faster querying
chatLogSchema.index({ sessionId: 1, createdAt: 1 });

export default mongoose.models.ChatLog || mongoose.model('ChatLog', chatLogSchema);
