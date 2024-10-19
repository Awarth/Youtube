import { useState } from "react";
import PropTypes from "prop-types";
// import toast from "react-hot-toast";

function AddVideoPopup({ toggleAddVideo, handleAddVideo }) {
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddVideo(videoDetails);
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-[#0000004f] backdrop-blur bg-opacity-40 z-10">
      <form
        onSubmit={handleSubmit}
        className="p-4 flex flex-col gap-2 relative h-fit border bg-[#001011] max-w-[22rem] w-full rounded-md"
      >
        <h2 className="text-2xl">Add New Video</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={videoDetails.title}
            onChange={handleInputChange}
            className="bg-transparent border border-[#97C8EB] rounded p-1 w-full"
          />
        </div>
        <div>
          <label htmlFor="url">Video URL</label>
          <input
            type="text"
            name="url"
            value={videoDetails.url}
            onChange={handleInputChange}
            className="bg-transparent border border-[#97C8EB] rounded p-1 w-full"
          />
        </div>
        <button
          type="submit"
          className="border py-1 px-3 w-fit border-[#97C8EB] bg-[#3AAFB9]"
        >
          Add Video
        </button>
        <button
          type="button"
          onClick={toggleAddVideo}
          className="border py-1 px-3 mt-2 w-fit border-[#97C8EB]"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

AddVideoPopup.propTypes = {
  toggleAddVideo: PropTypes.func.isRequired,
  handleAddVideo: PropTypes.func.isRequired,
};

export default AddVideoPopup;
