import { HiOutlineDotsVertical } from "react-icons/hi";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PlaylistVideoCard({ video, onDelete }) {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const videoId = video._id;

  const handleVideoNavigate = () => {
    navigate(`/video/${videoId}`);
  };

  return (
    <>
      <span className="border w-full overflow-hidden rounded-md relative">
        <span
          onClick={() => setShowOptions(!showOptions)}
          className="p-1 bg-[#000000d2] backdrop-blur bg-opacity-40 text-white absolute top-1 right-1 rounded text-xl z-10"
        >
          <HiOutlineDotsVertical />
        </span>
        {showOptions && (
          <div className="absolute text-sm top-8 right-1 bg-gray-800 text-white rounded shadow-md text-center">
            <ul className="py-1">
              <li
                onClick={() => onDelete(videoId)}
                className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
              >
                Remove from
                <br />
                playlist
              </li>
            </ul>
          </div>
        )}
        <img
          src={video.thumbnail}
          alt={video.title || "thumbnail"}
          className="w-full aspect-[16/11]"
          onClick={handleVideoNavigate}
        />
        <p className="cursor-pointer absolute left-1 bottom-2 text-white bg-[#000000d2] rounded p-1 text-sm backdrop-blur bg-opacity-40">
          {video.title}
        </p>
      </span>
    </>
  );
}

PlaylistVideoCard.propTypes = {
  video: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PlaylistVideoCard;
