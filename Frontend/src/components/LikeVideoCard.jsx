import { LuDot } from "react-icons/lu";
import PropTypes from "prop-types";
import { formatDuration } from "../utility/FormatDuration";
import formatTimeAgo from "../utility/FormatTimeAgo";
import truncateText from "../utility/TruncateName";
import { useNavigate } from "react-router-dom";

function LikeVideoCard({ detail }) {
  const navigate = useNavigate();

  const { title, duration, views, ownerDetails, thumbnail, createdAt, _id } =
    detail;

  const formattedDuration = formatDuration(duration);

  const time = formatTimeAgo(createdAt);

  const truncatedTitle = truncateText(title, 20);

  const handleUserNavigate = () => {
    navigate(`/channel/${ownerDetails.username}`);
  };

  const handleVideoNavigate = () => {
    navigate(`/video/${_id}`);
  };

  return (
    <div className="flex flex-col rounded-md cursor-pointer w-full bg-[#3d3d3d21]">
      <div className="flex gap-4">
        <div className="relative flex">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full max-w-[25rem] aspect-video rounded-l cursor-pointer"
            onClick={handleVideoNavigate}
          />
          <p className="absolute bottom-1 right-1 text-white text-xs rounded p-1 backdrop-blur bg-opacity-40 bg-[#000000c5]">
            {formattedDuration}
          </p>
        </div>
        <div className="w-full channelDetail  rounded-r p-1 gap-2 flex">
          <div className="w-full mb-1 text-white text-base sm:text-xl flex flex-col gap-2 py-4">
            <p>{truncatedTitle}</p>
            <span className="text-xs sm:text-base flex flex-wrap gap-[0.1rem] items-center">
              <p className="w-fit" onClick={handleUserNavigate}>
                {ownerDetails.username}
              </p>
              <LuDot />
              <p className="w-fit">{views} views</p>
              <LuDot />
              <p className="w-fit">{time}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

LikeVideoCard.propTypes = {
  detail: PropTypes.object.isRequired,
};

export default LikeVideoCard;
