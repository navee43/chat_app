// import Message from '../models/Message.model.js'
// import Chat from "../models/Chat.model.js";

// // Send a message
// export const sendMessage = async (req, res) => {
//   try {
//     const { chatId, sender, text, attachments } = req.body;

//     if (!chatId || !sender) {
//       return res.status(400).json({ message: "Chat ID and sender are required" });
//     }

//     const message = new Message({ chatId, sender, text, attachments });
//     await message.save();

//     res.status(201).json(message);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Get messages for a chat
// export const getChatMessages = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const messages = await Message.find({ chatId }).populate("sender", "username email");
//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Mark message as seen
// export const markAsSeen = async (req, res) => {
//   try {
//     const { messageId, userId } = req.body;
    
//     const message = await Message.findById(messageId);
//     if (!message) return res.status(404).json({ message: "Message not found" });

//     if (!message.seenBy.includes(userId)) {
//       message.seenBy.push(userId);
//       await message.save();
//     }

//     res.status(200).json({ message: "Message marked as seen" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };



import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from "../models/Message.model.js";
import {User} from '../models/user.model.js'
import {Chat} from '../models/Chat.model.js'

const allMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ chat: req.params.chatId })
    .populate("sender", "-password")
    .populate("receiver", "chatName image") // Populate receiver details
    .populate("chat");

  if (!messages) {
    throw new ApiError(400, "There was an error while fetching messages");
  }

  return res.status(200).json(new ApiResponse(200, messages, "Messages fetched successfully"));
});




const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    throw new ApiError(400, "Content and chatId are required");
  }

  const chat = await Chat.findById(chatId).populate("users", "name email");

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  // Get the receiver (the other user in the chat)
  const receiver = chat.users.find(user => user._id.toString() !== req.user._id.toString());

  const newMessage = {
    sender: req.user._id,
    chat: chatId,
    content: content,
    receiver: receiver?._id, // Store receiver ID in message
  };

  let message = await Message.create(newMessage);

  message = await message.populate("sender", "chatName email");
  message = await message.populate("chat");
  message = await message.populate("receiver", "chatName email");

  await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

  if (!message) {
    throw new ApiError(400, "There was an error while sending the message");
  }

  return res.status(200).json(new ApiResponse(200, message, "Message sent successfully"));
});


export {sendMessage , allMessages}