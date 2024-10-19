import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { Video } from "../models/video.model.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import {
  uploadOnCLoudinary,
  deleteFromCloudinary,
} from "../utility/cloudinary.js";
import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Like } from "../models/like.model.js";
import { Subscription } from "../models/subscription.model.js";

const getVideos = asyncHandler(async (req, res) => {
  const {
    limit = 30,
    page = 1,
    query,
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  if (!limit || !page) {
    throw new ApiError(400, "Missing limit and page");
  }

  let filter = {};

  if (query) {
    filter = {
      $or: [
        {
          title: { $regex: query, $options: "i" },
        },
        {
          description: { $regex: query, $options: "i" },
        },
      ],
    };
  }

  if (userId) {
    filter.owner = userId;
  }

  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);
  const sortOptions = { [sortBy]: sortType === "asc" ? 1 : -1 };

  const videos = await Video.find(filter)
    .skip((parsedPage - 1) * parsedLimit)
    .limit(parsedLimit)
    .populate("owner", "fullName username avatar")
    .sort(sortOptions);

  const totalNumberOfVideos = await Video.countDocuments(filter);

  const totalPages = Math.ceil(totalNumberOfVideos / parsedLimit);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        videos,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: totalPages,
        totalNumberOfVideos: totalNumberOfVideos,
      },
      "Videos fetched successfully"
    )
  );
});

const publishAVideo = asyncHandler(async (req, res) => {
  const userId = req.user;

  if (!isValidObjectId(userId)) {
    throw new ApiError(401, "Login to upload a video");
  }

  const { title, description, isPublished } = req.body;

  const isPublishedBool = isPublished === "true";

  if (!(title && description && typeof isPublishedBool === "boolean")) {
    throw new ApiError(400, "Provide all the details");
  }

  const localVideoUrl = req.files?.videoFile?.[0]?.path;
  const localThumbnail = req.files?.thumbnail?.[0]?.path;

  if (!(localThumbnail || localVideoUrl)) {
    throw new ApiError(400, "Video file or thumbnail is required");
  }

  const videoFile = await uploadOnCLoudinary(localVideoUrl);

  if (!videoFile) {
    throw new ApiError(404, "Error occurred while uploading video");
  }

  const thumbnail = await uploadOnCLoudinary(localThumbnail);

  if (!thumbnail) {
    throw new ApiError(404, "Error occurred while uploading thumbnail");
  }

  const newVideo = await Video.create({
    videoFile: videoFile?.url,
    thumbnail: thumbnail?.url,
    owner: userId,
    title: title?.trim(),
    description: description,
    duration: videoFile?.duration,
    isPublished: isPublished,
  });

  const videoWithOwnerDetails = await Video.aggregate([
    {
      $match: { _id: newVideo._id },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner_details",
      },
    },
    {
      $unwind: "$owner_details",
    },
    {
      $project: {
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        duration: 1,
        isPublished: 1,
        "owner_details._id": 1,
        "owner_details.username": 1,
        "owner_details.fullName": 1,
        "owner_details.avatar": 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        videoWithOwnerDetails[0],
        "Video uploaded successfully"
      )
    );
});

const getAVideoById = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Provide a valid video ID");
  }

  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
        pipeline: [
          {
            $project: {
              _id: 1,
              avatar: 1,
              username: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$ownerDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  // If video is not found, return 404 error
  if (!video || video.length === 0) {
    throw new ApiError(404, "Video not found");
  }

  // Increment the view count for the video
  await Video.findByIdAndUpdate(videoId, {
    $inc: {
      views: 1,
    },
  });

  // Add the video to the user's watch history if logged in
  if (req.user?._id) {
    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { watchHistory: videoId } },
      { new: true }
    );
  }

  // Get the total number of likes for the video
  const totalLikes = await Like.countDocuments({ video: videoId });

  // Get the list of users who liked the video
  const likesForVideo = await Like.find({
    video: videoId,
  }).select("likeBy");

  // Determine if the video is liked by the current user
  const isVideoLikedByUser = req.user?._id
    ? likesForVideo.some(
        (like) => like.likeBy.toString() === req.user._id.toString()
      )
    : false;

  let isSubscribedToOwner = false;
  if (req.user?._id) {
    const subscriptionExists = await Subscription.exists({
      subscriber: req.user._id,
      channel: video[0].owner,
    });
    console.log(subscriptionExists);
    isSubscribedToOwner = subscriptionExists ? true : false;
  }

  // Prepare the response data
  const videoData = {
    ...video[0],
    totalLikes,
    isVideoLikedByUser,
    isSubscribedToOwner, // Include the subscription status
  };

  return res
    .status(200)
    .json(new ApiResponse(200, videoData, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Provide video id");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const localThumbnail = req.file?.path;

  // If a new thumbnail is provided, upload it and delete the old one
  if (localThumbnail) {
    const newThumbnail = await uploadOnCLoudinary(localThumbnail);

    if (!newThumbnail) {
      throw new ApiError(500, "Error while uploading thumbnail on cloudinary");
    }

    // Delete the old thumbnail if it exists
    if (video?.thumbnail) {
      await deleteFromCloudinary(video.thumbnail);
    }

    // Update the video thumbnail
    video.thumbnail = newThumbnail?.url;
  }

  // Update title and description if provided
  if (req.body?.title) video.title = req.body?.title;
  if (req.body?.description) video.description = req.body?.description;

  // Save the updated video details
  await video.save();

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video details updated successfully"));
});

const deleteAVideo = asyncHandler(async (req, res) => {
  const videoId = req.params?.videoId;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Provide a video id to delete it");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // Delete the video from Cloudinary
  await deleteFromCloudinary(video.videoFile);
  await deleteFromCloudinary(video.thumbnail);

  // Delete the video from the database
  await Video.findByIdAndDelete(videoId);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        `Video with id ${videoId} was deleted successfully`
      )
    );
});

const toggleIsPublished = asyncHandler(async (req, res) => {
  const videoId = req.params?.videoId;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Provide a video id to toggle is published");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video does not exist");
  }

  video.isPublished = !video.isPublished;
  video.save();

  return res
    .status(200)
    .json(new ApiResponse(200, video, "changed the published status"));
});

const currentUserVideo = asyncHandler(async (req, res) => {
  const userId = req.user;

  const videos = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
  ]);

  if (!videos) {
    return res.status(201).json(
      new ApiResponse(201, {
        message: "You have not uploaded any video",
      })
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, videos, "Your Videos fetched successfully"));
});

export {
  publishAVideo,
  getAVideoById,
  updateVideo,
  deleteAVideo,
  toggleIsPublished,
  getVideos,
  currentUserVideo,
};
