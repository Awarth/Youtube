import { HiOutlineDotsVertical } from "react-icons/hi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveDetail } from "../redux/slices/editTweetDetail";

function TweetCard({ detail, onDelete }) {
  const { content } = detail;
  const dispatch = useDispatch();

  const tweetId = detail._id;

  const [showOptions, setShowOptions] = useState(false);

  const handleEditTweet = () => {
    dispatch(saveDetail(detail));
  };

  return (
    <>
      <span className="overflow-y-scroll scrollbar-hide bg-black relative w-64 min-w-[12rem] md:min-w-[15rem] lg:min-w-[18rem] xl:min-w-[24rem] aspect-[16/11] border p-4 text-white rounded-md">
        <p>{content}</p>
        <span
          onClick={() => setShowOptions(!showOptions)}
          className=" absolute cursor-pointer top-2 right-2 rounded p-1  backdrop-blur bg-opacity-40 bg-[#ffffffc5] text-black text-xl"
        >
          <HiOutlineDotsVertical />
        </span>
        {showOptions && (
          <div className="absolute text-sm top-9 right-1 bg-gray-800 text-white rounded shadow-md">
            <ul className="py-1">
              <Link
                to={`/edit-tweet/${tweetId}`}
                onClick={handleEditTweet}
                className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
              >
                Edit
              </Link>
              <li
                onClick={() => onDelete(tweetId)}
                className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </span>
    </>
  );
}

TweetCard.propTypes = {
  detail: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TweetCard;
