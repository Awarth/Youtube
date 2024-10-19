import PropTypes from "prop-types";
import { formatDuration } from "../utility/FormatDuration";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveDetail } from "../redux/slices/editVideoDetail";

function MyVideoCard({ detail, onDelete }) {
  const { duration, thumbnail, title } = detail;
  const formattedDuration = formatDuration(duration);
  const dispatch = useDispatch();

  const videoId = detail._id;

  const [showOptions, setShowOptions] = useState(false);

  const handleEditVideo = () => {
    dispatch(saveDetail(detail));
  };

  return (
    <>
      <span className="cursor-pointer overflow-hidden relative w-64 min-w-[13rem] md:min-w-[15rem] lg:min-w-[18rem] xl:min-w-[24rem] aspect-[16/11] border flex justify-center items-center rounded-md">
        <img src={thumbnail} alt={title} className="w-full h-full" />
        <span
          onClick={() => setShowOptions(!showOptions)}
          className=" absolute cursor-pointer top-2 right-2 rounded p-1  backdrop-blur bg-opacity-40 bg-[#000000c5] text-white text-xl"
        >
          <HiOutlineDotsVertical />
        </span>
        {showOptions && (
          <div className="absolute text-sm top-9 right-1 bg-gray-800 text-white rounded shadow-md">
            <ul className="py-1">
              <Link
                to={`/edit-video/${videoId}`}
                onClick={handleEditVideo}
                className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
              >
                Edit
              </Link>
              <li
                onClick={() => onDelete(videoId)}
                className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
              >
                Delete
              </li>
            </ul>
          </div>
        )}
        <p className="absolute bottom-2 right-2 text-white text-sm md:text-base rounded p-1 backdrop-blur bg-opacity-40 bg-[#000000c5]">
          {formattedDuration}
        </p>
      </span>
    </>
  );
}

MyVideoCard.propTypes = {
  detail: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MyVideoCard;
