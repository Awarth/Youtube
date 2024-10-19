import PropTypes from "prop-types";
import formatTimeAgo from "../utility/FormatTimeAgo";
import { useNavigate } from "react-router-dom";
function TweetCard({ tweet }) {
  const navigate = useNavigate();
  console.log(tweet);

  const formattedTime = formatTimeAgo(tweet.createdAt);

  const handleUserNavigate = () => {
    navigate(`/channel/${tweet.owner.username}`);
  };

  return (
    <>
      <div className=" border border-[#ffffff28] bg-[black] text-white rounded-md overflow-hidden flex flex-col justify-between">
        <p className="p-2 cursor-pointer">{tweet.content}</p>
        <div className="w-full p-2 flex gap-2 bg-[#ffffff14]">
          <img
            src={tweet.owner.avatar}
            alt={tweet.owner.username}
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={handleUserNavigate}
          />
          <span className="text-[#ffffffc4]">
            <p className="text-sm cursor-pointer" onClick={handleUserNavigate}>
              {tweet.owner.username}
            </p>
            <p className="text-xs">{formattedTime}</p>
          </span>
        </div>
      </div>
    </>
  );
}

TweetCard.propTypes = {
  tweet: PropTypes.object.isRequired,
};

export default TweetCard;
