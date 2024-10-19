import PropTypes from "prop-types";
import { formatDuration } from "../utility/FormatDuration";
import { Link } from "react-router-dom";
import formatTimeAgo from "../utility/FormatTimeAgo";

function VideoCard({ details }) {
  const { title, duration, thumbnail, views, owner, _id, createdAt } = details;

  const videoId = _id;
  const time = formatTimeAgo(createdAt);

  return (
    <Link
      to={`/video/${videoId}`}
      className="flex flex-col rounded-md bg-[#001011] cursor-pointer aspect-[16/11]"
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-full aspect-video rounded-t"
        />
        <p className="absolute bottom-1 right-1 text-white text-xs rounded p-1 backdrop-blur bg-opacity-40 bg-[#000000c5]">
          {formatDuration(duration)}
        </p>
      </div>
      <div className="channelDetail border border-[#3d3d3d] bg-[#3d3d3d] rounded-b-md p-1 gap-2 flex justify-center items-center overflow-hidden">
        <img
          src={owner.avatar}
          alt="avatar"
          className="aspect-square w-11 text-xs rounded-full"
        />
        <div className="w-full mb-1 text-white">
          <p>{title}</p>
          <span className="text-xs flex flex-wrap leading-3 gap-2">
            <p className="w-fit">{owner.username}</p>
            <p className="w-fit">{views} views</p>
            <p className="w-fit">{time}</p>
          </span>
        </div>
      </div>
    </Link>
  );
}

VideoCard.propTypes = {
  details: PropTypes.object.isRequired,
};

export default VideoCard;
