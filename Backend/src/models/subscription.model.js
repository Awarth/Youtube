import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Add required if necessary
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Add required if necessary
    },
  },
  { timestamps: true } // Fixed: it's timestamps, not timestamp
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
