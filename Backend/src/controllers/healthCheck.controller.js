import { ApiResponse } from "../utility/ApiResponse.js";
import { asyncHandler } from "../utility/asyncHandler.js";

const healthCheck = asyncHandler(async (_, res) => {
  return res.status(200).json(new ApiResponse(200, {}, "Everything is okay"));
});

export { healthCheck };
