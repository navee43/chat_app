import {asyncHandler} from '../utils/asyncHandler.js'
import {ChatRequest} from '../models/ChatRequest.js'
import {Chat} from '../models/Chat.model.js'
const sendChatRequest = asyncHandler(async(req , res)=>{
  try {
    console.log("Received Body:", req.body); // Debugging

    const senderId = req.user.id; // Extract senderId from JWT token
    const { receiverId } = req.body;

    if (!receiverId) return res.status(400).json({ message: "Receiver ID is required" });

    // Prevent duplicate requests
    const existingRequest = await ChatRequest.findOne({ sender: senderId, receiver: receiverId, status: "pending" });
    if (existingRequest) return res.status(400).json({ message: "Request already sent." });

    const chatRequest = new ChatRequest({ sender: senderId, receiver: receiverId });
    await chatRequest.save();

    res.status(201).json(chatRequest);
  } catch (error) {
    console.error("Error in sendChatRequest:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
})

const getPendingRequests = asyncHandler(async(req ,res)=>{
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

const rejectChatRequest = asyncHandler(async(req ,res)=>{
  try {
    const request = await ChatRequest.findById(req.params.requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = 'rejected';
    await request.save();

    res.json({ message: 'Chat request rejected' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
export {sendChatRequest , acceptChatRequest , getPendingRequests ,rejectChatRequest}