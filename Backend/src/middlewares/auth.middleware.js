import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utility/ApiError.js";
import { asyncHandler } from "../utility/asyncHandler.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || 
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized access");
    }    

    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the user with the ID from the token
    const user = await User.findById(verifiedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Attach the user to the request
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid Access Token");
  }
});
