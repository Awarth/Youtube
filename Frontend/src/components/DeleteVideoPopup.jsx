// DeleteVideoPopup.jsx
import PropTypes from "prop-types";

function DeleteVideoPopup({
  toggleDeleteVideo,
  handleDeleteVideo,
  videoTitle,
}) {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-[#0000004f] backdrop-blur bg-opacity-40 z-10">
      <div className="p-4 flex flex-col gap-2 relative h-fit border bg-[#001011] max-w-[22rem] w-full rounded-md">
        <h2 className="text-2xl">Delete Video</h2>
        <p>Are you sure you want to delete {videoTitle}?</p>
        <div className="flex gap-3">
          <button
            onClick={handleDeleteVideo}
            className="border py-1 px-3 w-fit border-[#97C8EB] bg-[#3AAFB9]"
          >
            Yes, Delete
          </button>
          <button
            onClick={toggleDeleteVideo}
            className="border py-1 px-3 w-fit border-[#97C8EB]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteVideoPopup.propTypes = {
  toggleDeleteVideo: PropTypes.func.isRequired,
  handleDeleteVideo: PropTypes.func.isRequired,
  videoTitle: PropTypes.string.isRequired,
};

export default DeleteVideoPopup;
