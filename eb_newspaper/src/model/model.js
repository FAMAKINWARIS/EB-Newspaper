import mongoose from 'mongoose';

// Define the schema for the chat message
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create a model for the chat message
const Message = mongoose.model('Message', messageSchema);

export default Message;
