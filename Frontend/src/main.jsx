import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import MyContent from "./pages/MyContent.jsx";
import Collections from "./pages/Collections.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";
import Profile from "./pages/Profile.jsx";
import Upload from "./pages/Upload.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import AvatarEdit from "./pages/AvatarEdit.jsx";
import CoverImageEdit from "./pages/CoverImageEdit.jsx";
import UserPasswordEdit from "./pages/UserPasswordEdit.jsx";
import UserDetailsEdit from "./pages/UserDetailsEdit.jsx";
import PrivateRoute from "./components/PrivateRoute";
import Twitter from "./pages/Twitter.jsx";
import VideoPlayer from "./pages/DetailedVideo.jsx";
import MyVideoEdit from "./pages/MyVideoEdit.jsx";
import MyTweetEdit from "./pages/MyTweetEdit.jsx";
import DetailedPlaylistPage from "./pages/DetailedPlaylistPage.jsx";
import UserProfile from "./pages/UserProfile.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/profile/sign-up" element={<SignUpPage />} />
        <Route path="/profile/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/tweet" element={<Twitter />} />
          <Route path="/liked-videos" element={<LikedVideos />} />
          <Route path="/history" element={<History />} />
          <Route path="/my-content" element={<MyContent />} />
          <Route path="/playlist" element={<Collections />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/avatar" element={<AvatarEdit />} />
          <Route path="/profile/cover" element={<CoverImageEdit />} />
          <Route path="/video/:videoId" element={<VideoPlayer />} />
          <Route path="/edit-video/:videoId" element={<MyVideoEdit />} />
          <Route path="/edit-tweet/:tweetId" element={<MyTweetEdit />} />
          <Route path="/channel/:username" element={<UserProfile />} />
          <Route
            path="/playlist-detail/:playlistId"
            element={<DetailedPlaylistPage />}
          />
          <Route
            path="/profile/change-password"
            element={<UserPasswordEdit />}
          />
          <Route path="/profile/update-details" element={<UserDetailsEdit />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
