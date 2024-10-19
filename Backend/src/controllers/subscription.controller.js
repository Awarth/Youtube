import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { Subscription } from "../models/subscription.model.js";
import mongoose, { isValidObjectId } from "mongoose";

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  const userId = req.user?._id;

  console.log("channel Id", userId);

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid Channel ID");
  }

  const subscribers = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribedToSubscriber",
            },
          },
          {
            $addFields: {
              subscribedToSubscriber: {
                $cond: {
                  if: {
                    $in: [userId, "$subscribedToSubscriber.subscriber"],
                  },
                  then: true,
                  else: false,
                },
              },
              subscribersCount: {
                $size: "$subscribedToSubscriber",
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$subscriber",
    },
    {
      $project: {
        _id: 0,
        subscriber: {
          _id: 1,
          username: 1,
          fullName: 1,
          avatar: 1,
          subscribedToSubscriber: 1,
          subscribersCount: 1,
        },
      },
    },
  ]);

  if (!subscribers?.length) {
    throw new ApiError(400, "No subscribers found");
  }

  const totalSubscribers = await Subscription.countDocuments({
    channel: userId,
  });

  const subscribersList = subscribers.map((item) => item.subscriber);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { subscribersList, totalSubscribers },
        "List of subscribers fetched successfully"
      )
    );
});

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const subscribed = await Subscription.findOne({
    subscriber: req.user?._id,
    channel: channelId,
  });

  if (subscribed) {
    await Subscription.findByIdAndDelete(subscribed?._id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, { subscribed: false }, "Unsubscribed successfully")
      );
  }

  await Subscription.create({
    subscriber: req.user?._id,
    channel: channelId,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { subscribed: true }, "Subscribed successfully")
    );
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid subscriber ID");
  }

  const subscribedChannels = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "channel",
        as: "subscribedChannel",
        pipeline: [
          {
            $lookup: {
              from: "videos",
              foreignField: "owner",
              localField: "_id",
              as: "videos",
            },
          },
          {
            $addFields: {
              latestVideo: {
                $ifNull: [
                  {
                    $arrayElemAt: [
                      {
                        $sortArray: {
                          input: "$videos",
                          sortBy: { createdAt: -1 },
                        },
                      },
                      0,
                    ],
                  },
                  null, // Fallback if no videos are found
                ],
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$subscribedChannel",
    },
    {
      $project: {
        _id: 0,
        subscribedChannel: {
          _id: 1,
          username: 1,
          fullName: 1,
          avatar: 1,
          latestVideo: {
            _id: 1,
            videoFile: 1,
            thumbnail: 1,
            owner: 1,
            title: 1,
            description: 1,
            duration: 1,
            createdAt: 1,
            views: 1,
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
        subscribedChannels,
        "Subscribed channel fetched successfully"
      )
    );
});

export { getUserChannelSubscribers, toggleSubscription, getSubscribedChannels };
