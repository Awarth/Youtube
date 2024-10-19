import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { asyncHandler } from "../utility/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const likedAlready = await Like.findOne({
    video: videoId,
    likeBy: req.user?.id,
  });

  if (likedAlready) {
    await Like.findByIdAndDelete(likedAlready._id);

    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: false }, "Like removed"));
  }

  await Like.create({
    video: videoId,
    likeBy: req.user?.id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { isLiked: true }, "Video liked"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id");
  }

  const likedAlready = await Like.findOne({
    comment: commentId,
    likeBy: req.user?.id,
  });

  if (likedAlready) {
    await Like.findByIdAndDelete(likedAlready._id);

    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: false }, "Like removed"));
  }

  await Like.create({
    comment: commentId,
    likeBy: req.user?.id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { isLiked: true }, "Comment liked"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id");
  }

  const likedAlready = await Like.findOne({
    tweet: tweetId,
    likeBy: req.user?.id,
  });

  if (likedAlready) {
    await Like.findByIdAndDelete(likedAlready._id);

    return res
      .status(200)
      .json(new ApiResponse(200, { isLiked: false }, "Like removed"));
  }

  await Like.create({
    tweet: tweetId,
    likeBy: req.user?.id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { isLiked: true }, "Tweet liked"));
});

const getLikeVideos = asyncHandler(async (req, res) => {
  const likeVideoAggregate = await Like.aggregate([
    {
      $match: {
        likeBy: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "likedVideo",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "ownerDetails",
            },
          },
          {
            $unwind: "$ownerDetails",
          },
        ],
      },
    },
    {
      $unwind: "$likedVideo",
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        _id: 0,
        likedVideo: {
          _id: 1,
          videoFile: 1,
          thumbnail: 1,
          owner: 1,
          title: 1,
          description: 1,
          views: 1,
          duration: 1,
          createdAt: 1,
          isPublished: 1,
          ownerDetails: {
            username: 1,
            fullName: 1,
            "avatar.url": 1,
          },
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        likeVideoAggregate,
        "Retrieved all liked videos successfully"
      )
    );
});

export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikeVideos };
