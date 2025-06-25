import jwt from 'jsonwebtoken'
import {ApiError} from '../utils/ApiError.js'
import { asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'




export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const rawToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
    const token = rawToken?.trim(); // 🔥 Trim to remove space

    console.log("📦 Token being verified:", JSON.stringify(token));

    const secret = process.env.ACCESS_TOKEN_SECRET;
    console.log("🔐 Verifying token with secret:", secret);

    if (!token) {
      throw new ApiError(401, "Token not found");
    }

    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("❌ JWT Verify Error:", err.message);
    throw new ApiError(401, err.message || "Invalid token");
  }
});

