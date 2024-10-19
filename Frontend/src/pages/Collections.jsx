import { useEffect, useState } from "react";
import CreatePlaylistPopup from "../components/CreatePlaylistPopup";
import PlaylistCard from "../components/PlaylistCard";
import api from "../utility/api";
import Loader from "../components/Loader";

function Collections() {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = JSON.parse(localStorage.getItem("user"))._id.replace(/"/g, "");

  const togglePopup = () => {
    setIsPopupActive(!isPopupActive);
  };

  useEffect(() => {
    const fetchPlaylist = async () => {
      setError("");
      setLoading(true);

      try {
        const res = await api.get(`/playlist/user/${userId}`);
        setPlaylist(res.data.data);
      } catch (error) {
        console.log("Error fetching playlists:", error);
        setError("No playlists found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [isPopupActive, userId]);

  return (
    <div className="relative h-full">
      <div className="z-10 bg-[#001011] sticky top-0 flex justify-between items-center p-2 border mb-2">
        <h2 className="text-3xl ml-2">Playlist</h2>

        <button
          onClick={togglePopup}
          className="w-fit px-4 py-2 mt-2 mb-1 mr-2 bg-[#3AAFB9] text-white rounded transition-all duration-300 ease-in-out hover:scale-105"
        >
          Create
        </button>
      </div>

      {isPopupActive && <CreatePlaylistPopup togglePopup={togglePopup} />}

      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>
      ) : playlist && playlist.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 min-[1960px]:grid-cols-5 gap-4 p-4">
          {playlist.map((playlistItem, index) => (
            <PlaylistCard key={index} detail={playlistItem} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          {error || "No playlists found."}
        </div>
      )}
    </div>
  );
}

export default Collections;
