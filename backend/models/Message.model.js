import mongoose ,{Schema} from "mongoose";


const MessageSchema = mongoose.Schema({
  sender:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
  },
  receiver:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
  },
  content:{
    type:String ,
    trim:true
  },
  chat:{
    type:mongoose.Schema.ObjectId,
    ref:"Chat"
  }
},{timestamps:true});


export const Message = mongoose.model("Message" , MessageSchema);