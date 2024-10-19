import { LuDot } from "react-icons/lu";
import PropTypes from "prop-types";
import { formatDuration } from "../utility/FormatDuration";
import formatTimeAgo from "../utility/FormatTimeAgo";
import truncateText from "../utility/TruncateName";
import { useNavigate } from "react-router-dom";
// import thumbnail from "../assets/images/thumbnail1.jpg";

function HistoryCard({ detail }) {
  const navigate = useNavigate();
  const {
    title,
    duration,
    views,
    owner,
    thumbnail,
    description,
    createdAt,
    _id,
  } = detail;
  const formattedDuration = formatDuration(duration);

  const time = formatTimeAgo(createdAt);

  const truncatedTitle = truncateText(title, 15);
  const truncatedDescription = truncateText(description, 50);

  const handleUserNavigate = () => {
    navigate(`/channel/${owner.username}`);
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
        <div className="w-full channelDetail  rounded-r p-1 gap-1 flex ">
          <div className="w-full mb-1 text-white text-sm sm:text-xl flex flex-col pt-1 gap-1">
            <p className="">{truncatedTitle}</p>
            <span className="text-xs sm:text-base flex flex-wrap gap-[0.1rem] items-center">
              <p className="w-fit" onClick={handleUserNavigate}>
                {owner.username}
              </p>
              <LuDot />
              <p className="w-fit">{views} views</p>
              <LuDot />
              <p className="w-fit">{time}</p>
            </span>
            <p className="text-sm hidden sm:block">{truncatedDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

HistoryCard.propTypes = {
  detail: PropTypes.object.isRequired,
};

export default HistoryCard;
