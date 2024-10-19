import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../utility/api";
import { convertToFormData } from "../utility/ConvertToFormData";
import { useNavigate } from "react-router-dom";

function MyVideoEdit() {
  const detail = useSelector((state) => state.editVideo.detail);
  const { title, description, thumbnail, isPublished } = detail;
  const navigate = useNavigate();

  const [newDetail, setNewDetail] = useState({
    localThumbnail: thumbnail || null,
    title: title || "",
    description: description || "",
  });

  const [isChecked, setIsChecked] = useState({
    updateThumbnail: false,
    updateTitle: false,
    updateDescription: false,
  });

  const [isPublishedChecked, setIsPublishedChecked] = useState(isPublished);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDetail({
      ...newDetail,
      [name]: value,
    });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setNewDetail({
      ...newDetail,
      localThumbnail: file,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setIsChecked({
      ...isChecked,
      [name]: checked,
    });
  };

  const handleIsPublishedChange = async (e) => {
    const checked = e.target.checked;
    setIsPublishedChecked(checked);
    console.log(checked);

    try {
      const res = await api.patch(`/videos/toggle/publish/${detail._id}`, {
        isPublished: checked,
      });
      console.log("Publishing status updated:", res.data);
    } catch (error) {
      console.log("Error updating publishing status:", error);
    }
  };

  const handleVideoEdit = (e) => {
    e.preventDefault();

    const updatedData = {};

    if (isChecked.updateThumbnail) {
      updatedData.localThumbnail = newDetail.localThumbnail;
    }
    if (isChecked.updateTitle) {
      updatedData.title = newDetail.title;
    }
    if (isChecked.updateDescription) {
      updatedData.description = newDetail.description;
    }

    console.log("Editing a video with details:", updatedData);

    const formattedData = convertToFormData(updatedData);

    const videoPatch = async () => {
      try {
        const res = await api.patch(`/videos/${detail._id}`, formattedData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
      } catch (error) {
        console.log("Error changing video detail:", error);
      } finally {
        navigate("/my-content");
      }
    };
    videoPatch();
  };

  return (
    <>
      <form
        className="overflow-hidden flex flex-col gap-2 border max-w-[40rem] w-full py-2 px-4 bg-[#0000004b] backdrop-blur bg-opacity-40 rounded-md"
        onSubmit={handleVideoEdit}
      >
        <h2 className="text-3xl">Change Details</h2>
        <p className="text-sm text-[#e6d4ca]">
          Select the fields you want to change
        </p>

        {/* Checkbox for isPublished */}
        <div className="flex justify-start items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isPublishedChecked}
              onChange={handleIsPublishedChange}
              defaultValue={detail.isPublished}
            />
            <div className="group peer bg-transparent rounded-full duration-300 w-12 h-6 ring-1 ring-[#F26430] after:duration-300 after:bg-[#F26430] peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-4 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"></div>
          </label>
          <label htmlFor="isPublished" className="text-xl text-[#97cbeb]">
            Published
          </label>
        </div>

        {/* Other fields go here... */}
        <div className="flex justify-start items-center gap-2">
          <input
            type="checkbox"
            name="updateThumbnail"
            checked={isChecked.updateThumbnail}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="localThumbnail" className="text-xl text-[#97cbeb]">
            New Thumbnail
          </label>
        </div>
        <input
          type="file"
          accept="image/*"
          name="localThumbnail"
          id="newThumbnail"
          onChange={handleThumbnailChange}
          className="cursor-pointer border border-[#97C8EB] bg-[#1C1C1C] p-1 rounded w-full"
        />

        <div className="flex justify-start items-center gap-2">
          <input
            type="checkbox"
            name="updateTitle"
            checked={isChecked.updateTitle}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="title" className="text-xl text-[#97cbeb]">
            New Title
          </label>
        </div>
        <input
          type="text"
          name="title"
          value={newDetail.title}
          onChange={handleInputChange}
          className="border border-[#97C8EB] bg-[#1C1C1C] rounded px-2 py-1 w-full"
        />

        <div className="flex justify-start items-center gap-2">
          <input
            type="checkbox"
            name="updateDescription"
            checked={isChecked.updateDescription}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="description" className="text-xl text-[#97cbeb]">
            New Description
          </label>
        </div>
        <textarea
          name="description"
          value={newDetail.description}
          onChange={handleInputChange}
          className="border border-[#97C8EB] bg-[#1C1C1C] rounded px-2 py-1 h-40 resize-none w-full"
        />

        <button
          type="submit"
          className="w-fit py-2 px-3 border hover:bg-transparent duration-300 transition-all ease-in-out hover:scale-105"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}

export default MyVideoEdit;
