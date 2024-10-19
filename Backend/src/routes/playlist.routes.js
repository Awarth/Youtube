import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createPlaylist,
  getUserPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "../controllers/playlist.controller.js";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

router.route("/create").post(createPlaylist);
router
  .route("/:playlistId")
  .get(getPlaylistById)
  .patch(updatePlaylist)
  .delete(deletePlaylist);

router.route("/add/:playlistId/:videoId").patch(addVideoToPlaylist);
router.route("/remove/:playlistId/:videoId").patch(removeVideoFromPlaylist);

router.route("/user/:userId").get(getUserPlaylist);

export default router;
