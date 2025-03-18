import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chatName: { type: String, trim: true }, // For group chats; might be optional for one-on-one chats.
  isGroupChat: { type: Boolean, default: false },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
}, {
  timestamps: true // To track when the chat was created or updated.
});
  
  export default mongoose.model("Chat", chatSchema);
    