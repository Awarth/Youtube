import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../utility/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function MyTweetEdit() {
  const detail = useSelector((state) => state.editTweet.detail);
  const tweetId = detail._id;
  const navigate = useNavigate();

  const [newContent, setNewContent] = useState(detail.content || "");

  const handleContentChange = (e) => {
    setNewContent(e.target.value);
  };

  // Handle form submission
  const handleTweetEdit = (e) => {
    e.preventDefault();

    const handleTweetPatch = async () => {
      try {
        const res = await api.patch(`/tweet/${tweetId}`, {
          content: newContent,
        });
        console.log("Tweet updated successfully:", res.data);
      } catch (error) {
        console.log("Error while updating tweet:", error);
        toast.error("Error updating the tweet");
      } finally {
        navigate("/my-content");
      }
    };

    handleTweetPatch();
  };

  return (
    <form
      onSubmit={handleTweetEdit}
      className="flex flex-col max-w-[40rem] w-full gap-4 border py-2 px-3 rounded-md bg-[#00000016] backdrop-blur bg-opacity-40"
    >
      <h2 className="text-3xl">Change Content</h2>
      <label htmlFor="content" className="text-[#97cbeb] text-xl">
        New Content
      </label>
      <textarea
        name="content"
        className="border border-[#97C8EB] bg-[#001011] rounded px-2 py-1 h-40 resize-none w-full"
        value={newContent}
        onChange={handleContentChange}
      ></textarea>
      <button
        type="submit"
        className="w-fit py-2 px-3 border hover:bg-transparent duration-300 transition-all ease-in-out hover:scale-105"
      >
        Save Changes
      </button>
    </form>
  );
}

export default MyTweetEdit;
