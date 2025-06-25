// import Chat from '../models/Chat.model.js'
// import {User} from "../models/user.model.js";

// // Create a one-on-one chat
// export const createOneOnOneChat = async (req, res) => {
//   try {
//     const { userId1, userId2 } = req.body;

//     // Check if chat already exists
//     let chat = await Chat.findOne({ members: { $all: [userId1, userId2] }, isGroup: false });

//     if (!chat) {
//       chat = new Chat({ members: [userId1, userId2], isGroup: false });
//       await chat.save();
//     }

//     res.status(200).json(chat);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Create a group chat
// export const createGroupChat = async (req, res) => {
//   try {
//     const { name, members, createdBy } = req.body;

//     if (!members || members.length < 2) {
//       return res.status(400).json({ message: "A group chat needs at least 3 users" });
//     }

//     const groupChat = new Chat({ isGroup: true, name, members, createdBy });
//     await groupChat.save();

//     res.status(201).json(groupChat);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Get all chats for a user
// export const getUserChats = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const chats = await Chat.find({ members: userId }).populate("members", "username email");
//     res.status(200).json(chats);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };



import {asyncHandler} from '../utils/asyncHandler.js'
import {Chat}  from '../models/Chat.model.js'
import {User} from '../models/user.model.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { json } from 'express'
import { Message } from '../models/Message.model.js'


const accessChat = asyncHandler(async(req,res)=>{
   
    const {userId} = req.body ; 
    console.log("the user id is " , req.body)
    console.log("mine is " , req.user._id)

    if(!userId){
        console.log("userId of receiver not found ")
        throw new ApiError(400  , "userId of receiver is not found in req ")
    }
    
    var isChat = await Chat.find({
        isGroupChat:false,
        $and:[ 
            {users:{$elemMatch:{$eq:userId}}},
           {users:{$elemMatch:{$eq:req.user._id}}}  ]
    })
   .populate("users" ,"-password")
   .populate("latestMessage");

   isChat  = await User.populate(isChat , {
    path:"latestMessage.sender",
    select:"name email"
   })

   if (isChat && isChat.length > 0) {
    console.log("Existing chat found:", isChat[0]);
    return res.status(200).json(new ApiResponse(200, isChat[0], "Chat accessed successfully"));
  } 
  
   else{
    var chatData = {
        isGroupChat : false ,
        chatName : "sender",
        users:[req.user._id , userId]

    }

try {
    const createdChat = await Chat.create(chatData);
    console.log("Chat created:", createdChat); 

    const fullChat = await Chat.findOne({ _id: createdChat._id })
      .populate("users", "-password");

    console.log("Full chat with users:", fullChat); 

    return res.status(200).json(new ApiResponse(200, fullChat, "New chat created"));
} catch (error) {
    console.error("Error while creating chat:", error);
    return res.status(400).json(new ApiError(400, "Failed to create a new chat"));
}


//     try {
//         const createdChat = await Chat.create(chatData);
//         const fullChat = await Chat.findOne({_id:createdChat._id}).select("users" , "-password")

//         return res.status(200).json(new ApiResponse(200 ,fullChat , "new chat is created with user :"))
        
    // }
    //  catch (error) {
    //     return res.status(400).json( new ApiError(400 , "failed to create a new chat with the user "))
        
    // }
   }

})


const fetchChats = asyncHandler(async(req ,res)=>{
    var chat = await Chat.find({
        users:{$elemMatch:{$eq:req.user._id}}
    }).populate("users", "-password")
    .populate("groupAdmin" ,"-password")
    .populate("latestMessage")
    .sort({updated:-1})

    chat = await User.populate(chat , {
        path:"latestMessage.sender",
        select:"name email"
    })

    if(!chat){
        throw new ApiError(400 , "there is some error occured while fetching chats")
    }

    return res.status(200).json(new ApiResponse(200,chat , "chat fetched successfully"))
})


const fetchGroupChat = asyncHandler(async(req , res)=>{
    const allGroups = await Chat.where("isGroupChat").equals(true).populate("groupAdmin","-password");
    if(!allGroups){
        throw new ApiError(400 , "there is some problem while fetching group chat ")
    }
    return res.status(200).json(new ApiResponse(200, allGroups , "group chat fetched successfully  "))
})

const createGroupChat = asyncHandler(async(req, res)=>{
    const {users , groupChatName } = req.body;
    console.log( "incoming users are",users)

    // var usersArray = JSON.parse(users)
    // usersArray.push(req.user)

    // console.log("the users array ",usersArray)

    if(!users||!groupChatName){
        throw new ApiError(400 , "please give users and name of group")
    }
    // var usersArray = JSON.parse(users)
    users.push(req.user)
    // console.log("the users array ",usersArray)

    const groupChat = await Chat.create({
        chatName:groupChatName,
        groupAdmin:req.user,
        isGroupChat:true,
        users:users

    })

    const fullGroupChat = await Chat.find({_id:groupChat._id})
    .populate("users","-password")
    .populate("groupAdmin","-password")

    if(!fullGroupChat){
        throw new ApiError(400,"there is some error while creating a group chat ")
    }
    return res.status(200).json(new ApiResponse(200 , fullGroupChat , "group created successfully"))
})


const groupExit = asyncHandler(async(req , res)=>{
    const {chatId , userId} = req.body;
    const removed = await Chat.findByIdAndUpdate(
        chatId ,{
            $pull:{users:userId}
        },{
            new:true
        }
    ).populate("users","-password")
    .populate("groupAdmin","-password")

    if(!removed){
        throw new ApiError(400 , "there is some error while removing user from group")

    }
    return res.status(200).json(new ApiResponse(200, removed , "user successfully removed from the group"))
})


const addSelfToGroup = asyncHandler(async(req , res)=>{
    const {chatId , userId} = req.body;
    const addSelf = await Chat.findByIdAndUpdate(chatId , {
        $push:{users:userId},

    } ,{new:true}
).populate("users","-password").populate("groupAdmin","-password")

if(!addSelf){
    throw new ApiError(400 , "there is some error while adding ourself to group")
}
return res.status(200).json(new ApiResponse(200 , addSelf, "you are added in group successfully"))
})

const deleteChat  = asyncHandler(async(req, res)=>{
    const {chatId} = req.params;
    // console.log(chatId)
    const chat = await Chat.findById(chatId)

    if(!chat){
        throw new ApiError(404 , "no chat found with this id ")
    }
if(!chat.users.includes(req.user._id) && chat.groupAdmin !==req.user._id){
    return res.status(403).json(new ApiError(403, "not authorized"))
}

       const deletedMess =   await Message.deleteMany({chat:chatId})
        const deletedChat =  await Chat.findByIdAndDelete(chatId)
 if(!deletedChat || !deletedMess){
    throw new ApiError(400 , "some error while deleting chat ")
 }

 return res.status(200).json(new ApiResponse(200 , deletedChat , "chat deleted successfully"))

})


export {accessChat , fetchChats , addSelfToGroup , groupExit  ,createGroupChat,fetchGroupChat ,deleteChat}