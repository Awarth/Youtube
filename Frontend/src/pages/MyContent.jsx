import { useEffect, useState } from "react";
import api from "../utility/api";
import Loader from "../components/Loader";
import MyVideoCard from "../components/MyVideoCard";
import MyTweetCard from "../components/MyTweetCard";
import toast from "react-hot-toast";

function MyContent() {
  const [videos, setVideos] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const [tweetError, setTweetError] = useState(null);

  const fetchMyVideos = async () => {
    try {
      const res = await api.get("videos/my-videos");
      setVideos(res.data.data);
    } catch (error) {
      setVideoError("Error fetching videos");
      console.log("Error fetching videos: ", error);
    }
  };

  const fetchMyTweets = async () => {
    try {
      const res = await api.get("/tweet/user");
      setTweets(res.data.data);
    } catch (error) {
      setTweetError("Error fetching tweets");
      console.log("Error fetching tweets: ", error);
    }
  };

  useEffect(() => {
    fetchMyVideos();
    fetchMyTweets();
  }, []);

  const handleVideoDelete = async (videoId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this video`
    );
    if (confirmDelete) {
      try {
        const res = await api.delete(`/videos/${videoId}`);
        console.log(res.data);
        toast("Video deleted successfully");
        fetchMyVideos();
      } catch (error) {
        toast("Error deleting the video");
        console.log("Error while deleting a video : ", error);
      }
    }
  };

  const handleTweetDelete = async (tweetId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this tweet`
    );
    if (confirmDelete) {
      try {
        const res = await api.delete(`/tweet/${tweetId}`);
        console.log(res.data);
        toast("Tweet deleted successfully");
        fetchMyTweets();
      } catch (error) {
        toast("Error deleting the tweet");
        console.log("Error while deleting a tweet : ", error);
      }
    }
  };

  return (
    <div className="h-full w-full p-0">
      <h2 className="text-3xl mb-2">My Videos</h2>
      {videos ? (
        videos.length > 0 ? (
          <div className="w-full flex gap-4 overflow-x-auto scrollbar-hide mb-4">
            {videos.map((video, index) => (
              <MyVideoCard
                key={index}
                detail={video}
                onDelete={handleVideoDelete}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No videos available</p>
        )
      ) : videoError ? (
        <p className="text-red-500">{videoError}</p>
      ) : (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}

      <h2 className="text-3xl mb-4">My Tweets</h2>
      {tweets ? (
        tweets.length > 0 ? (
          <div className="w-full flex gap-4 overflow-x-auto scrollbar-hide mb-4">
            {tweets.map((tweet, index) => (
              <MyTweetCard
                key={index}
                detail={tweet}
                onDelete={handleTweetDelete}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No tweets available</p>
        )
      ) : tweetError ? (
        <p className="text-red-500">{tweetError}</p>
      ) : (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default MyContent;
