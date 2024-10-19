import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utility/api";
import Loader from "../components/Loader";
import PlaylistVideoCard from "../components/PlaylistVideoCard";
import EditPlaylistPopup from "../components/EditPlaylistPopup";
import toast from "react-hot-toast";

function DetailedPlaylistPage() {
  const [showOptions, setShowOptions] = useState(false);
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [error, setError] = useState(null);
  const { playlistId } = useParams();
  const [isEditActive, setIsEditActive] = useState(false);
  const navigate = useNavigate();

  const fetchPlaylist = async () => {
    try {
      const res = await api.get(`/playlist/${playlistId}`);
      setPlaylistDetails(res.data.data);
    } catch (err) {
      setError("Error fetching playlist");
      console.log("Error fetching playlist:", err);
    }
  };

  const toggleIsEdit = () => {
    setIsEditActive(!isEditActive);
  };

  const handlePlaylistPatch = async (playlistDetail) => {
    try {
      const res = await api.patch(`/playlist/${playlistId}`, playlistDetail);
      toast.success("Playlist details updated successfully");
      toggleIsEdit(); // Close the popup after a successful update
      fetchPlaylist(); // Refresh the playlist details
      console.log(res.data);
    } catch (error) {
      console.log("Error patching playlist:", error);
      toast.error("Error while patching the playlist");
    }
  };

  const handleVideoRemoveFromPlaylist = async (videoId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove this video from ${playlistDetails.name}`
    );
    if (confirmDelete) {
      try {
        const res = await api.patch(
          `/playlist/remove/${playlistId}/${videoId}`
        );
        fetchPlaylist();
        console.log(res.data);
      } catch (error) {
        console.log("Error removing a video from the playlist :", error);
      }
    }
  };

  const handlePlaylistDeletion = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this playlist`
    );
    if (confirmDelete) {
      try {
        const res = await api.delete(`/playlist/${playlistId}`);
        console.log(res);
        navigate("/playlist");
      } catch (error) {
        console.log("Error while deleting the playlist", error);
      }
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [playlistId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!playlistDetails) {
    return (
      <div className="w-full h-full flex flex-col">
        <Loader />;
      </div>
    );
  }

  const { name, description, videos = [] } = playlistDetails[0];

  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-hidden relative">
      <div className="w-full relative">
        <span
          onClick={() => setShowOptions(!showOptions)}
          className="absolute text-2xl text-white cursor-pointer bg-[#00000022] backdrop-blur bg-opacity-40 rounded p-1 top-1 right-2"
        >
          <HiOutlineDotsVertical />
        </span>
        {showOptions && (
          <div className="absolute text-sm top-9 right-1 bg-gray-800 text-white rounded shadow-md z-10">
            <ul className="py-1">
              <li
                className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                onClick={toggleIsEdit}
              >
                Edit Details
              </li>
              <li
                className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                onClick={handlePlaylistDeletion}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
        <h2 className="text-3xl">{name}</h2>
        <p className="max-w-[50rem] w-full text-white font-light p-2 bg-[#00000029] rounded-md backdrop-blur bg-opacity-40">
          {description}
        </p>
      </div>

      {isEditActive && (
        <EditPlaylistPopup
          detail={playlistDetails[0]}
          toggleIsEdit={toggleIsEdit}
          handlePlaylistPatch={handlePlaylistPatch} // Pass the function as a prop
        />
      )}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 min-[1960px]:grid-cols-5 gap-4">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <PlaylistVideoCard
              key={index}
              video={video}
              onDelete={handleVideoRemoveFromPlaylist}
            />
          ))
        ) : (
          <p>No videos available in this playlist.</p>
        )}
      </div>
    </div>
  );
}

export default DetailedPlaylistPage;
