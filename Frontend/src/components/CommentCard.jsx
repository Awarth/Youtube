import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import PropTypes from "prop-types";
import api from "../utility/api";
import toast from "react-hot-toast";

function CommentCard({ commentData, onSave, onDelete }) {
  const {
    _id = "",
    content = "",
    owner = {},
    isLiked = false,
    likesCount = 0,
  } = commentData;
  const { avatar = "", username = "Anonymous" } = owner;
  const commentId = _id;

  const userId = JSON.parse(localStorage.getItem("user"))._id.replace(/"/g, "");

  const [newComment, setNewComment] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const [like, setLike] = useState(isLiked);
  const [likesCountState, setLikesCountState] = useState(likesCount);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleLikeToggle = async () => {
    try {
      const res = await api.post(`/like/toggle/c/${commentId}`);
      setLike(res.data.data.isLiked);
      setLikesCountState(
        res.data.data.isLiked
          ? likesCountState + 1
          : Math.max(likesCountState - 1, 0)
      );
    } catch (error) {
      console.log("Error toggling comment like:", error);
      toast.error("Failed to toggle like.");
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setNewComment(content); // Reset to original content if canceling
    }
    setIsEditing(!isEditing);
    setShowDropdown(false); // Hide dropdown when editing
  };

  if (!commentData) {
    return null;
  }

  return (
    <span className="relative w-full bg-[#00000029] backdrop-blur bg-opacity-40 py-1 px-2 rounded flex gap-1">
      <img src={avatar} alt="avatar" className="rounded-full w-11 h-11" />
      <div className="w-full">
        <p className="text-sm font-light text-[#e8cfc399]">{username}</p>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          disabled={!isEditing}
          className={`w-full h-10 resize-none outline-none bg-transparent text-sm text-white font-light ${
            isEditing ? "border border-[#e8cfc399]" : ""
          }`}
        />
        <div className="flex gap-2 text-sm mt-1">
          <button onClick={handleLikeToggle}>
            {like ? <BiSolidLike className="text-[#3AAFB9]" /> : <BiLike />}
          </button>
          <p>{likesCountState}</p>
        </div>
        {isEditing && (
          <button
            onClick={() => {
              onSave(commentId, newComment); // Call save with the updated comment
              setIsEditing(false); // Exit editing mode after saving
            }}
            className="mt-1 bg-[#093A3E] text-white py-1 px-2 rounded text-xs"
          >
            Save
          </button>
        )}
      </div>

      {userId === owner._id && (
        <span
          className="absolute top-1 right-1 cursor-pointer text-white"
          onClick={toggleDropdown}
        >
          <HiOutlineDotsVertical />
        </span>
      )}
      {showDropdown && (
        <div className="absolute text-sm top-6 right-1 bg-gray-800 text-white rounded shadow-md">
          <ul className="py-1">
            <li
              onClick={handleEditToggle}
              className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
            >
              Edit
            </li>
            <li
              onClick={() => onDelete(commentId)}
              className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </span>
  );
}

CommentCard.propTypes = {
  commentData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      _id: PropTypes.string,
      avatar: PropTypes.string,
      username: PropTypes.string,
    }),
    isLiked: PropTypes.bool,
    likesCount: PropTypes.number,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentCard;
