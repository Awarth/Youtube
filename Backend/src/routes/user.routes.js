import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateUserDetails,
  updateAvatarImage,
  updateCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secure routes
router.route("/logout").post(authMiddleware, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").patch(authMiddleware, changeCurrentPassword);
router.route("/current-user").get(authMiddleware, getCurrentUser);
router.route("/update-details").patch(authMiddleware, updateUserDetails);
router
  .route("/avatar")
  .patch(authMiddleware, upload.single("avatar"), updateAvatarImage);
router
  .route("/cover-image")
  .patch(authMiddleware, upload.single("coverImage"), updateCoverImage);
router.route("/channel/:username").get(authMiddleware, getUserChannelProfile);
router.route("/history").get(authMiddleware, getWatchHistory);

export default router;
