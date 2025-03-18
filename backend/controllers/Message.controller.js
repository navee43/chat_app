import Message from '../models/Message.model.js'
import Chat from "../models/Chat.model.js";

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { chatId, sender, text, attachments } = req.body;

    if (!chatId || !sender) {
      return res.status(400).json({ message: "Chat ID and sender are required" });
    }

    const message = new Message({ chatId, sender, text, attachments });
    await message.save();

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get messages for a chat
export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).populate("sender", "username email");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Mark message as seen
export const markAsSeen = async (req, res) => {
  try {
    const { messageId, userId } = req.body;
    
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    if (!message.seenBy.includes(userId)) {
      message.seenBy.push(userId);
      await message.save();
    }

    res.status(200).json({ message: "Message marked as seen" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
