import jwt from 'jsonwebtoken'
import {ApiError} from '../utils/ApiError.js'
import { asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'

export const verifyJWT= asyncHandler(async(req ,_,next)=>{
    try{
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer" , "")
        console.log("the token at render is  " , token );
    if(!token){
        throw new ApiError(401 , "unauthorized req")
    }
        const secret = "859a04be247f7b54c0e4b727589731e29190db9bf2bc5b306b59726680ff971a";
        console.log("🔐 Verifying token with secret:", process.env.ACCESS_TOKEN_SECRET);
console.log("📦 Token being verified:", token);

  const decodedToken =   jwt.verify(token , secret)
        console.log("the decoded token at render is  ", decodedToken)
  const user = await User.findById(decodedToken._id).
  select("-password -refreshToken")
            console.log("the user info is at render ", user);
  if(!user){
    throw new ApiError(401 , "invalid access token ")

  }
  req.user = user;
  next()
    }
    catch(err){
          console.log("❌ JWT Verify Error:", err.message); 
       throw new ApiError(401  , err?.message || "invalid access token ")
       
    }
})


