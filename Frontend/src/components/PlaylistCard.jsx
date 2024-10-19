import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function PlaylistCard({ detail }) {
  const { name, videoDetail = [] } = detail;
  const thumbnail = videoDetail[0]?.thumbnail;
  const navigate = useNavigate();

  const playlistId = detail._id;

  const handlePlaylistRedirect = () => {
    navigate(`/playlist-detail/${playlistId}`);
  };

  return (
    <div
      onClick={handlePlaylistRedirect}
      className="relative w-full aspect-[16/11] rounded border overflow-hidden text-xl text-white"
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={`${name} thumbnail`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center"></div>
      )}
      <span className="cursor-pointer absolute inset-0 bg-[#0000002d] bg-opacity-90 backdrop-blur-[1px] flex items-center justify-center break-words p-2">
        {name}
      </span>
    </div>
  );
}

PlaylistCard.propTypes = {
  detail: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    videoDetail: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default PlaylistCard;
