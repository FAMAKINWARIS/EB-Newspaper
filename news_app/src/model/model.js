import { Schema, model } from "mongoose";

// Define the schema for the chat message
const messageSchema = new Schema({
  userName: {
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
const savedMessage = model('savedMessage', messageSchema);

export default savedMessage
