import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// The unique index is already defined in the schema with `unique: true`
// No need for the additional index() call

export default mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);
