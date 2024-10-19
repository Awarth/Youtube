import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utility/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    throw new ApiError("Name and description of the playlist needed");
  }

  const playlist = await Playlist.create({
    name: name,
    description: description,
    owner: req.user?._id,
  });

  if (!playlist) {
    throw new ApiError(401, "Playlist not created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, `Playlist created successfully`));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const playlistId = req.params.playlistId;

  if (!playlistId) {
    throw new ApiError(400, "Playlist ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new ApiError(400, "Invalid playlist ID format");
  }

  try {
    const playlist = await Playlist.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(playlistId) },
      },
      {
        $lookup: {
          from: "videos",
          localField: "videos",
          foreignField: "_id",
          as: "videoDetails",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
                thumbnail: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          videos: "$videoDetails",
        },
      },
      {
        $project: {
          videoDetails: 0,
        },
      },
    ]);

    if (!playlist || playlist.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "No playlist found with this ID"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, playlist, "Playlist retrieved successfully"));
  } catch (error) {
    console.error("Error while fetching playlist:", error);
    throw new ApiError(500, "An error occurred while retrieving the playlist");
  }
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const playlistId = req.params.playlistId;

  if (!playlistId) {
    throw new ApiError(400, "Provide correct playlist id");
  }

  const playlist = await Playlist.findByIdAndDelete(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const playlistId = req.params.playlistId;

  const { name, description } = req.body;

  if (!name || !description) {
    throw new ApiError(400, "Provide name or description");
  }

  if (!playlistId) {
    throw new ApiError(400, "Provide correct playlist id");
  }

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    { name, description },
    { new: true }
  );

  if (!playlist) {
    throw new ApiError(404, "Playlist does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

const getUserPlaylist = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    throw new ApiError(400, "Provide user ID");
  }

  // Ensure the `userId` is converted to an ObjectId if necessary
  const playlists = await Playlist.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videoDetail",
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        createdAt: 1,
        videoDetail: {
          thumbnail: 1,
          title: 1,
          duration: 1,
          _id: 1,
        },
      },
    },
  ]);

  if (!playlists || playlists.length === 0) {
    throw new ApiError(404, "No playlists found for this user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlists, "Playlists retrieved successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!playlistId || !videoId) {
    throw new ApiError(400, "Playlist and video id required");
  }

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    { $push: { videos: videoId } },
    { new: true }
  );

  if (!playlist) {
    throw new ApiError(400, "Playlist with particular id does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, playlist, "Video added to the playlist successfully")
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!playlistId || !videoId) {
    throw new ApiError(400, "Playlist and video id required");
  }

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    { $pull: { videos: videoId } },
    { new: true }
  );

  if (!playlist) {
    throw new ApiError(400, "Playlist with particular does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Video removed from the playlist"));
});

export {
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getUserPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
};
