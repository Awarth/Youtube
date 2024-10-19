import { useEffect, useState } from "react";
import api from "../utility/api";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import avatarImage from "../assets/images/avatar.jpg";
import cover from "../assets/images/thumbnail.jpg";

function UserProfile() {
  const [channelDetails, setChannelDetails] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  const { username } = useParams();

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/users/channel/${username}`);
      setChannelDetails(res.data.data);
      setSubscribed(res.data.data.isSubscribed || false);
    } catch (error) {
      console.error("Error while fetching channel details:", error);
    }
  };

  const toggleSubscription = async () => {
    if (!channelDetails || !channelDetails._id) return;

    try {
      await api.post(`/subscription/c/${channelDetails._id}`);
      setSubscribed(!subscribed);
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username, subscribed]);

  if (!channelDetails) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const {
    avatar = avatarImage,
    coverImage = cover,
    email = "",
    fullName = "",
    subscribersCount = "0",
  } = channelDetails;

  return (
    <div className="profile">
      <div className="avatarAndCoverImage w-full h-fit border-b-[3px] border-white mb-2">
        <img
          src={coverImage}
          alt="Cover"
          className="h-40 sm:h-52 md:h-56 w-full object-cover justify-self-center"
        />
      </div>

      <div className="flex justify-center items-center gap-1 md:gap-2 relative mb-2">
        <img
          src={avatar}
          alt="Avatar"
          className="w-20 sm:w-32 md:w-40 aspect-square rounded-full border-2"
        />
        <div className="userDetail p-2 pt-4 sm:p-4 md:p-6 text-lg sm:text-xl flex flex-col justify-center w-full">
          <span className="text-xl sm:text-4xl">{fullName}</span>
          <span className="font-[300] text-base sm:text-xl">{username}</span>
          <span className="font-[300] text-base sm:text-xl">{email}</span>
          <span className="font-[300] text-base sm:text-xl">
            {subscribersCount} subscribers
          </span>
          <button
            onClick={toggleSubscription}
            className={`w-fit border border-[#97C8EB] rounded-3xl text-xs text-white py-2 px-4 cursor-pointer transition-all duration-300 ease-in-out mt-2 ${
              subscribed ? "bg-transparent" : "bg-[#3AAFB9]"
            }`}
          >
            {subscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
