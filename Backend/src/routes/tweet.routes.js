import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
  getAllTweets,
} from "../controllers/tweet.controller.js";

const router = Router();

router.use(authMiddleware);

router.route("/").post(createTweet).get(getAllTweets);
router.route("/user").get(getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router;
