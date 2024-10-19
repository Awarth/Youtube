import { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { PiLineVertical } from "react-icons/pi";
import api from "../utility/api";
import Loader from "../components/Loader";
import CommentSection from "../components/CommentSection";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import AddToPlaylistPopup from "../components/AddToPlaylistPopup";
import toast from "react-hot-toast";

function DetailedVideo() {
  const [like, setLike] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [details, setDetails] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [isAddToPlaylistActive, setIsAddToPlaylistActive] = useState(false);
  const navigate = useNavigate();

  const { videoId } = useParams();
  const userId = JSON.parse(localStorage.getItem("user"))._id.replace(/"/g, "");

  const fetchVideoDetails = async () => {
    try {
      const res = await api.get(`/videos/${videoId}`);
      setDetails(res.data.data);
      setTotalLikes(res.data.data.totalLikes);
      setLike(res.data.data.isVideoLikedByUser);
      setOwnerDetails(res.data.data.ownerDetails);
      setSubscribed(res.data.data.isSubscribedToOwner);
    } catch (error) {
      console.log("Error fetching details:", error);
    }
  };

  const fetchPlaylistDetails = async () => {
    try {
      const res = await api.get(`/playlist/user/${userId}`);
      setPlaylist(res.data.data);
    } catch (error) {
      console.log("Error while fetching playlist :", error);
    }
  };

  const toggleSubscription = async () => {
    if (!ownerDetails || !ownerDetails._id) return;
    try {
      await api.post(`/subscription/c/${ownerDetails._id}`);
      setSubscribed(!subscribed);
    } catch (error) {
      console.log("Error toggling subscription:", error);
    }
  };

  const toggleVideoLike = async () => {
    try {
      await api.post(`/like/toggle/v/${videoId}`);
      setLike(!like);
      setTotalLikes((prev) => (like ? prev - 1 : prev + 1));
    } catch (error) {
      console.log("Error while toggling like:", error);
    }
  };

  const toggleAddToPlaylist = () => {
    setIsAddToPlaylistActive(!isAddToPlaylistActive);
    setShowOptions(false);
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await api.patch(`/playlist/add/${playlistId}/${videoId}`);
      toggleAddToPlaylist();
      toast.success("Video added to playlist");
    } catch (error) {
      console.log("Error adding video to playlist:", error);
    }
  };

  const handleUserNavigate = (channelUsername) => {
    navigate(`/channel/${channelUsername}`);
  };

  const handleCollectionNavigate = () => {
    navigate("/playlist");
  };

  useEffect(() => {
    fetchVideoDetails();
    fetchPlaylistDetails();
  }, [videoId]);

  if (!details) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[50rem]">
      <video className="w-full" controls>
        <source src={details.videoFile} />
      </video>
      <div className="flex justify-between items-start my-2">
        <div>
          <h2 className="text-xl sm:text-2xl w-full">{details.title}</h2>
          <p className="text-white text-sm">{details.views} views</p>
        </div>
        <div className="flex items-center gap-2 relative">
          <span className="w-fit text-xl border border-[#97C8EB] px-3 py-1 rounded-3xl flex justify-center items-center gap-1">
            <button onClick={toggleVideoLike}>
              {like ? <BiSolidLike className="text-[#97c8eb]" /> : <BiLike />}
            </button>
            <PiLineVertical />
            <p>{totalLikes}</p>
          </span>
          <span
            onClick={() => setShowOptions(!showOptions)}
            className="cursor-pointer border h-full aspect-square border-[#97C8EB] p-1 rounded-full flex justify-center items-center text-xl"
          >
            <HiOutlineDotsVertical />
          </span>
          {showOptions && (
            <div className="absolute text-sm top-9 right-1 bg-gray-800 text-white rounded shadow-md text-center">
              <ul className="py-1">
                {playlist.length > 0 ? (
                  <li
                    onClick={toggleAddToPlaylist}
                    className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                  >
                    Add to playlist
                  </li>
                ) : (
                  <li
                    className="px-2 py-1 cursor-default"
                    onClick={handleCollectionNavigate}
                  >
                    Create a playlist <br /> to add videos
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col justify-start min-[500px]:justify-between items-center min-[500px]:flex-row mb-2">
        <div className="flex items-center justify-start min-[500]:justify-center gap-2 w-full">
          <img
            src={ownerDetails.avatar}
            alt="avatar"
            className="aspect-square max-w-12 w-full rounded-full mr-1 cursor-pointer"
            onClick={() => handleUserNavigate(ownerDetails.username)}
          />
          <span
            className="text-white cursor-pointer"
            onClick={() => handleUserNavigate(ownerDetails.username)}
          >
            {ownerDetails.username}
          </span>
          <button
            onClick={toggleSubscription}
            className={`border border-[#97C8EB] rounded-3xl text-xs text-white py-2 px-4 cursor-pointer transition-all duration-300 ease-in-out ml-auto ${
              subscribed ? "bg-transparent" : "bg-[#3AAFB9]"
            }`}
          >
            {subscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        </div>
      </div>
      <div className="text-sm font-light text-white bg-[#80808017] backdrop-blur bg-opacity-40 p-1 rounded mb-1">
        {details.description}
      </div>
      <CommentSection videoId={videoId} />
      {isAddToPlaylistActive && (
        <AddToPlaylistPopup
          playlists={playlist}
          toggleAddToPlaylist={toggleAddToPlaylist}
          handleAddToPlaylist={handleAddToPlaylist}
          playlistExist={playlist.length > 0}
        />
      )}
    </div>
  );
}

export default DetailedVideo;
