import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addComment,
  deleteComment,
  getVideoComments,
  updatedComment,
} from "../controllers/comment.controller.js";
const router = Router();

router.use(authMiddleware);

router.route("/:videoId").get(getVideoComments).post(addComment);
router.route("/c/:commentId").patch(updatedComment).delete(deleteComment);

export default router;
    