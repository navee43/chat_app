import mongoose , {Schema} from "mongoose";
import {User} from './user.model.js'
import {Message} from './Message.model.js'

const ChatSchema = mongoose.Schema({

chatName:{
  type:String ,


},
isGroupChat:{
  type:Boolean
},
users:[
  {
    type:mongoose.Schema.ObjectId,
    ref:"User"
  }
]
,
groupAdmin:{
  type:mongoose.Schema.ObjectId,
  ref:"User"
},
latestMessage:{
  type:mongoose.Schema.ObjectId,
  ref:"Message"
}

},{Timestamp:true})


export const Chat = mongoose.model("Chat" ,ChatSchema)