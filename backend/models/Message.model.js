import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, trim: true, required: true },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
}, {
  timestamps: true // Automatically records when the message was sent.
});
  
  export default mongoose.model("Message", messageSchema);
  