import PropTypes from "prop-types";
import { useState } from "react";
import api from "../utility/api";
import toast from "react-hot-toast";

function CreatePlaylistPopup({ togglePopup }) {
  const [playlistDetails, setPlaylistDetails] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaylistDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    console.log(playlistDetails);

    const createPlaylist = async () => {
      try {
        const res = await api.post("/playlist/create", playlistDetails);
        setPlaylistDetails(res.data);
        toast.success(`'${res.data.data.name}' playlist created`);
        setPlaylistDetails({
          name: "",
          description: "",
        });
        togglePopup();
      } catch (error) {
        toast.error("Error while creating playlist");
        console.log("Error while creating playlist :", error);
      }
    };
    createPlaylist();
  };

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center  backdrop-blur bg-opacity-40 bg-[#0000004f] z-10">
        <form
          onSubmit={handleCreatePlaylist}
          className="bg-[#001011] p-6 rounded-lg shadow-lg max-w-md w-full relative"
        >
          <h3 className="text-2xl mb-4">Create New Playlist</h3>

          <input
            required={true}
            type="text"
            name="name"
            value={playlistDetails.name}
            onChange={handleInputChange}
            placeholder="Enter playlist name"
            className="w-full px-3 py-2 border bg-transparent border-[#97C8EB] text-[#97C8EB] rounded mb-4"
          />

          <textarea
            required={true}
            type="text"
            name="description"
            value={playlistDetails.description}
            onChange={handleInputChange}
            placeholder="Enter playlist description"
            className="w-full px-3 py-2 border bg-transparent border-[#97C8EB] text-[#97C8EB] rounded mb-4 h-44 resize-none"
          />

          <div className="flex justify-end gap-4">
            <span
              onClick={togglePopup}
              className="cursor-pointer px-4 py-2 border border-[#97C8EB] rounded"
            >
              Cancel
            </span>
            <button
              className="px-4 py-2 bg-[#3AAFB9] text-white rounded"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

CreatePlaylistPopup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
};

export default CreatePlaylistPopup;
