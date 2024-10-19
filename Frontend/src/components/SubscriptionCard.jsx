import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function SubscriptionCard({ detail }) {
  const navigate = useNavigate();

  const { subscribedChannel } = detail;

  const handleUserNavigate = () => {
    navigate(`/channel/${subscribedChannel.username}`);
  };

  const handleVideoNavigate = () => {
    navigate(`/video/${subscribedChannel.latestVideo._id}`);
  };

  return (
    <>
      <div className="w-full p-4 bg-[#8080800c] bg-opacity-40 backdrop-blur flex flex-col text-white sm:flex-row items-center justify-between gap-2 rounded-lg">
        <img
          src={subscribedChannel.avatar}
          alt="avatar"
          className="w-full max-w-[7rem] aspect-square rounded-full cursor-pointer"
          onClick={handleUserNavigate}
        />
        <p className="text-white cursor-pointer" onClick={handleUserNavigate}>
          {subscribedChannel.username}
        </p>
        <span>
          <h3 className="text-xl font-extralight">Latest video</h3>
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={subscribedChannel?.latestVideo.thumbnail}
              alt="thumbnail"
              className="max-w-44"
            />
            <p
              onClick={handleVideoNavigate}
              className="absolute inset-0 bg-[#0000002d] bg-opacity-90 backdrop-blur-[1px] cursor-pointer flex items-center justify-center break-words p-2"
            >
              {subscribedChannel?.latestVideo.title}
            </p>
          </div>
        </span>
      </div>
    </>
  );
}

SubscriptionCard.propTypes = {
  detail: PropTypes.object.isRequired,
};

export default SubscriptionCard;
