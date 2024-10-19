import { useEffect, useState } from "react";
import api from "../utility/api";
import CommentCard from "./CommentCard";
import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";
import Loader from "./Loader";
import toast from "react-hot-toast";

function CommentSection({ videoId }) {
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");

  // Fetch comments when the component mounts or when videoId changes
  useEffect(() => {
    fetchComments();
  }, [videoId]);

  // Function to fetch comments
  const fetchComments = async () => {
    try {
      const res = await api.get(`/comment/${videoId}`);
      setComments(res.data.data.docs);
      console.log(res.data.data.docs);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  // Handle adding a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await api.post(`/comment/${videoId}`, {
        content: newComment,
      });
      setNewComment("");
      fetchComments(); // Refetch comments after adding
      toast("Comment added successfully.");
    } catch (error) {
      console.log("Error adding comment:", error);
      toast.error("Failed to add the comment. Please try again.");
    }
  };

  // Handle saving a comment
  const handleSaveComment = async (commentId, text) => {
    try {
      await api.patch(`/comment/c/${commentId}`, { content: text });
      fetchComments(); // Refetch comments after saving
    } catch (error) {
      console.log("Error saving comment:", error);
      toast.error("Failed to save the comment. Please try again.");
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/comment/c/${commentId}`);
        fetchComments(); // Refetch comments after deletion
        toast("Comment deleted successfully.");
      } catch (error) {
        console.log("Error deleting comment:", error);
        toast.error("Failed to delete the comment. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-[35rem] w-full">
      <div className="flex w-full justify-between items-center mb-3">
        <h3 className="text-2xl">Comments</h3>
      </div>
      <form
        onSubmit={handleAddComment}
        className="flex mb-2 rounded-lg overflow-hidden"
      >
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full h-10 resize-none outline-none text-sm text-white font-light bg-[#00000029] p-2"
        />
        <button
          className="p-1 flex justify-center items-center bg-[#3AAFB9] text-white"
          type="submit"
        >
          <FaArrowRight />
        </button>
      </form>
      <div className="flex gap-2 flex-col">
        {comments === null ? (
          <Loader />
        ) : comments.length === 0 ? (
          <p className="text-white text-sm">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment._id}
              commentData={comment}
              onSave={handleSaveComment} // Pass the save handler
              onDelete={handleDeleteComment} // Pass the delete handler
            />
          ))
        )}
      </div>
    </div>
  );
}

CommentSection.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default CommentSection;
