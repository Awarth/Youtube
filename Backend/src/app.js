import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // Allow all origins
    },
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Middlewares
app.use(
  express.json({
    limit: "30kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "30kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import playlistRoute from "./routes/playlist.routes.js";
import likeRoute from "./routes/like.routes.js";
import tweetRoute from "./routes/tweet.routes.js";
import commentRoute from "./routes/comment.routes.js";
import subscriptionRoute from "./routes/subscription.routes.js";
import dashboardRoute from "./routes/dashboard.routes.js";
import healthCheckRoute from "./routes/healthCheck.routes.js";

app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/playlist", playlistRoute);
app.use("/like", likeRoute);
app.use("/tweet", tweetRoute);
app.use("/comment", commentRoute);
app.use("/subscription", subscriptionRoute);
app.use("/dashboard", dashboardRoute);
app.use("/healthCheck", healthCheckRoute);

export default app;
