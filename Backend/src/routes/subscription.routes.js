import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";
import { Router } from "express";
const router = Router();

router.use(authMiddleware);

router
  .route("/c/:channelId")
  .post((req, res, next) => {
    console.log(req.params?.channelId); // Should log correctly
    next();
  }, toggleSubscription)
  .get(getSubscribedChannels);

router.route("/u/:channelId").get((req, res, next) => {
  console.log(req.params?.channelId); // Should log the correct channelId
  next();
}, getUserChannelSubscribers);
// Change 'subscriberId' to 'channelId'

export default router;
