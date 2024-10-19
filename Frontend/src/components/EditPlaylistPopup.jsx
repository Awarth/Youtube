import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";

function EditPlaylistPopup({ detail, toggleIsEdit, handlePlaylistPatch }) {
  const [playlistDetail, setPlaylistDetail] = useState({
    name: detail.name || "",
    description: detail.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaylistDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePlaylistPatch(playlistDetail);  
  };

  return (
    <div className="absolute flex justify-center items-center inset-0 backdrop-blur bg-opacity-40 bg-[#0000004f] z-10">
      <form
        onSubmit={handleSubmit}
        className="p-4 flex flex-col gap-2 relative h-fit border bg-[#001011] max-w-[22rem] w-full rounded-md"
      >
        <span
          onClick={toggleIsEdit}
          className="absolute top-1 right-1 text-2xl w-fit bg-[#00000028] bg-opacity-40 backdrop-blur rounded-full p-1 text-white cursor-pointer"
        >
          <RxCross2 />
        </span>
        <h2 className="text-2xl">Change Details</h2>
        <div>
          <label htmlFor="name">New Name</label>
          <input
            type="text"
            name="name"
            value={playlistDetail.name}
            onChange={handleInputChange}
            className="bg-transparent border border-[#97C8EB] rounded p-1 w-full"
          />
        </div>
        <div>
          <label htmlFor="description">New Description</label>
          <textarea
            name="description"
            value={playlistDetail.description}
            onChange={handleInputChange}
            className="bg-transparent border border-[#97C8EB] rounded p-1 h-16 resize-none w-full"
          ></textarea>
        </div>
        <button
          type="submit"
          className="border py-1 px-3 w-fit text-white border-[#97C8EB] bg-[#3AAFB9]"
        >
          Save
        </button>
      </form>
    </div>
  );
}

EditPlaylistPopup.propTypes = {
  detail: PropTypes.object.isRequired,
  toggleIsEdit: PropTypes.func.isRequired,
  handlePlaylistPatch: PropTypes.func.isRequired, // Add prop type validation for the new prop
};

export default EditPlaylistPopup;
