import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { retry } from "@reduxjs/toolkit/query";




const generateAccessAndRefreshTokens = async(userId)=>{  
    try{
     const user = await User.findById(userId)
     const accessToken = user.generateAccessToken()
     const refreshToken = user.generateRefreshToken()
    
      user.refreshToken = refreshToken
      console.log(user.refreshToken)
   
      await user.save({validateBeforeSave:false})
      return {accessToken , refreshToken}
    }
    catch(err){
       throw new ApiError(500 ,err)
    }
 }

const Register = asyncHandler(async(req,res)=>{
    const {userName , email , password } = req.body;
    // console.log(req?.body)
    console.log(userName , password , email);
    
    if (!userName || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    
    const existed = await User.findOne({
        email
    })
    if(existed){
        throw new ApiError(400 , "email already existed ")
    }
    const avatarLocalPath = req.file?.path;
    console.log(avatarLocalPath)
    if(!avatarLocalPath){
        throw new ApiError(400 , "path of profile  is unknown ")
    }
    console.log(avatarLocalPath)

    const image = await uploadOnCloudinary(avatarLocalPath)

    if(!image){
        throw new ApiError(400 , "profile pic  is required")
        
    }

    const user = await User.create({
        userName , 
        email,
        image: image.url,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )
     if(!createdUser){
        throw new ApiError(500 , "something went wrong while registering the user ")
     }
     console.log(createdUser)

     return res.status(201).json(new ApiResponse(201 , createdUser , "user created successfully"))
    // console.log(password)


    res.status(200).json({message:"ok"})
   
})

const Login = asyncHandler(async(req,res)=>{

    const {email , password}= req.body;
    if(!email || !password){
        throw new ApiError(400 , "enter all the fields properly")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(400 , " user not found please check email once again")
    }
    const isPasswordValid = await user.isPasswordCorrect(password) 
    if(!isPasswordValid){
        throw new ApiError(400 , "invalid password , try again ")
    }
    const {accessToken ,refreshToken} = await generateAccessAndRefreshTokens(user._id)
const loggedIn = await User.findById(user._id).select("-password -refreshToken")

const options ={
    httpOnly:true,
    secure:true,
    sameSite:"Lax",
  }
 
  console.log('success')
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken" , refreshToken , options)
    .json(
       new ApiResponse(
          200,
          {
             user: loggedIn , accessToken ,
             refreshToken
          },
          "user logged in successully"
       )
    )



})
const Logout = asyncHandler(async(req,res)=>{
    const user = await User.findByIdAndUpdate( req.user._id ,{
        $unset:{
            refreshToken:1
        }

    },{new:true })

    const options ={
        httpOnly:true,
        secure:true,
        sameSite:"Lax", 
 // POST https://chat-app-backend-8vht.onrender.com/api/user/logout 401 (Unauthorized)
      }
      return res.status(200)
      .clearCookie("accessToken",options)
      .clearCookie("refreshToken",options)
      .json(new ApiResponse(200 , {},"user logged out succesfully"))
})

const getUsers = asyncHandler(async(req, res)=>{

    const users = await User.find({}).select("-refreshToken -password")
    if(!users){
        throw new ApiError(400 , "there is some issue while fetching users ")
    }
    return res.status(200).json(new ApiResponse(200 , users  , "users fetched successfully"))
})

export  {Register , Login ,Logout , getUsers}

 
