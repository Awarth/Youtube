import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(404, "Invalid user");
  }

  const totalVideos = await Video.countDocuments({
    owner: new mongoose.Types.ObjectId(userId),
  });

  const totalSubscribers = await Subscription.countDocuments({
    channel: new mongoose.Types.ObjectId(userId),
  });

  const totalViews = await Video.aggregate([
    { $match: { owner: new mongoose.Types.ObjectId(userId) } },
    {
      $group: { _id: null, totalViews: { $sum: "$views" } },
    },
  ]);
  const views = totalViews[0].totalViews || 0;

  const totalVideoLikes = await Like.countDocuments({
    video: {
      $in: await Video.distinct("_id", {
        owner: new mongoose.Types.ObjectId(userId),
      }),
    },
  });

  const totalTweetLikes = await Like.countDocuments({
    tweet: {
      $in: await Video.distinct("_id", {
        owner: new mongoose.Types.ObjectId(userId),
      }),
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalVideos,
        totalSubscribers,
        totalViews: views,
        totalVideoLikes,
        totalTweetLikes,
      },
      "Channel stats fetched successfully"
    )
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(404, "Channel not found");
  }

  const videos = await Video.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    {
      $addFields: {
        createdAt: {
          $dateToParts: {
            date: "$createdAt",
          },
        },
        likesCount: { $size: "$likes" },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        videoFile: 1,
        thumbnail: 1,
        createdAt: {
          year: 1,
          month: 1,
          day: 1,
        },
        isPublished: 1,
        likesCount: 1,
      },
    },
  ]);

  const totalVideos = videos[0] || 0;

  return res
    .status(200)
    .json(
      new ApiResponse(200, totalVideos, "Channel stats fetched successfully")
    );
});

export { getChannelStats, getChannelVideos };
