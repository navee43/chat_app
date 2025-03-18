import {asyncHandler} from '../utils/asyncHandler.js'
import {ChatRequest} from '../models/ChatRequest.js'
import Chat from '../models/Chat.model.js'
const sendChatRequest = asyncHandler(async(req , res)=>{
    const { senderId, receiverId } = req.body;
  try {
    // Check if a pending request already exists
    const existingRequest = await ChatRequest.findOne({ sender: senderId, receiver: receiverId, status: 'pending' });
    if (existingRequest) return res.status(400).json({ message: 'Request already sent.' });

    const chatRequest = new ChatRequest({ sender: senderId, receiver: receiverId });
    await chatRequest.save();
    res.status(201).json(chatRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

const sendPendingRequests = asyncHandler(async(req ,res)=>{
    try {
        const requests = await ChatRequest.find({ receiver: req.params.userId, status: 'pending' })
                                          .populate('sender', 'username email');
        res.json(requests);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

const acceptChatRequest = asyncHandler(async(req ,res)=>{
    try {
        const request = await ChatRequest.findById(req.params.requestId);
        if (!request) return res.status(404).json({ message: 'Request not found' });
    
        // Update status
        request.status = 'accepted';
        await request.save();
    
        // Create a chat for one-on-one conversation
        const newChat = new Chat({
          chatName: null,
          isGroupChat: false,
          users: [request.sender, request.receiver],
        });
        await newChat.save();
    
        res.json({ chatRequest: request, chat: newChat });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

export {sendChatRequest , acceptChatRequest , sendPendingRequests}