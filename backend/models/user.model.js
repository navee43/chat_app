import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        index:true

    }
    ,
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,


    }
    ,
    image:{
        type:String,
        
    },
    password:{
        type:String,
        required:true,

    },
    refreshToken:{
        type:String
    }
    
},{Timestamp:true})



userSchema.pre("save" ,async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


// console.log("the expiry is ",process.env.ACCESS_TOKEN_EXPIRY)

userSchema.methods.generateAccessToken = function(){
    console.log("the secret is ",process.env.ACCESS_TOKEN_SECRET)
  return  jwt.sign(
        {
            _id:this._id ,
            email:this.email,
            userName:this.userName,
          
        },
   
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// console.log("🚀 Signing token with secret:", process.env.ACCESS_TOKEN_SECRET);


userSchema.methods.generateRefreshToken = function(){
   return jwt.sign(
        {
            _id:this._id ,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User' , userSchema)