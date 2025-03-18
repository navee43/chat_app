import Chat from '../models/Chat.model.js'
import {User} from "../models/user.model.js";

// Create a one-on-one chat
export const createOneOnOneChat = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;

    // Check if chat already exists
    let chat = await Chat.findOne({ members: { $all: [userId1, userId2] }, isGroup: false });

    if (!chat) {
      chat = new Chat({ members: [userId1, userId2], isGroup: false });
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a group chat
export const createGroupChat = async (req, res) => {
  try {
    const { name, members, createdBy } = req.body;

    if (!members || members.length < 2) {
      return res.status(400).json({ message: "A group chat needs at least 3 users" });
    }

    const groupChat = new Chat({ isGroup: true, name, members, createdBy });
    await groupChat.save();

    res.status(201).json(groupChat);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all chats for a user
export const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ members: userId }).populate("members", "username email");
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
