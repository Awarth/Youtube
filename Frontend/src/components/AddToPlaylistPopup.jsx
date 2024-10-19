import { useState } from "react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";

function AddToPlaylistPopup({
  playlists,
  toggleAddToPlaylist,
  handleAddToPlaylist,
}) {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const handleCheckboxChange = (playlistId) => {
    setSelectedPlaylist(playlistId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedPlaylist);
    if (selectedPlaylist) {
      handleAddToPlaylist(selectedPlaylist);
      toggleAddToPlaylist();
    }
  };

  return (
    <div className="w-full h-full absolute inset-0 flex justify-center items-center bg-[#0000004f] backdrop-blur bg-opacity-40 z-50">
      <form
        onSubmit={handleSubmit}
        className="relative p-4 flex flex-col gap-2 h-fit border bg-[#001011] max-w-[22rem] w-full rounded-md"
      >
        <span
          onClick={toggleAddToPlaylist}
          className="p-1 bg-[#ffffff3a] w-fit rounded-full text-xl text-white absolute top-1 right-1 cursor-pointer"
        >
          <RxCross2 />
        </span>
        <h2 className="text-2xl">Add to Playlist</h2>
        <div className="text-xl">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={playlist._id}
                checked={selectedPlaylist}
                onChange={() => handleCheckboxChange(playlist._id)}
              />
              <label htmlFor={playlist._id}>{playlist.name}</label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="border py-1 px-3 w-fit border-[#97C8EB] bg-[#3AAFB9] text-white"
        >
          Add
        </button>
      </form>
    </div>
  );
}

AddToPlaylistPopup.propTypes = {
  playlists: PropTypes.array.isRequired,
  toggleAddToPlaylist: PropTypes.func.isRequired,
  handleAddToPlaylist: PropTypes.func.isRequired,
  videoId: PropTypes.string.isRequired,
};

export default AddToPlaylistPopup;
