import { FiEdit2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useLayoutEffect, useState } from "react";
import api from "../utility/api";
import Loader from "../components/Loader";
import ProfileEditPopUp from "../components/ProfileEditPopUp";
import SubscriberCard from "../components/SubscriberCard";

function Profile() {
  const [settingOpen, setSettingOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [subscribers, setSubscribers] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const [totalSubs, setTotalSubs] = useState(0);

  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useLayoutEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/current-user`, {
          withCredentials: true,
        });
        setUserDetails(res.data.data);
      } catch (error) {
        console.error("Error fetching profile: ", error);
        toast.error("Error fetching profile");
      } finally {
        setLoadingProfile(false);
      }
    };

    const fetchSubscribers = async () => {
      try {
        const res = await api.get(`/subscription/u/${userId}`);

        console.log(res.data.data);

        setSubscribers(res.data.data.subscribersList);
        setTotalSubs(res.data.data.totalSubscribers);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
        toast.error("Error fetching subscribers");
      } finally {
        setLoadingSubscribers(false);
      }
    };

    if (userId) {
      fetchProfile();
      fetchSubscribers();
    }
  }, [userId]);

  // Function to close the edit popup
  const handleEditPopup = () => {
    setSettingOpen(false);
  };

  if (loadingProfile) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return userDetails ? (
    <div className="profile">
      <div className="avatarAndCoverImage w-full h-fit border-b-[3px] border-white mb-2">
        <img
          src={userDetails.coverImage}
          alt="Cover"
          className="h-40 sm:h-52 md:h-56 w-full object-cover"
        />
      </div>

      <div className="flex justify-center items-center gap-1 md:gap-2 relative mb-2">
        <img
          src={userDetails.avatar}
          alt="Avatar"
          className="w-20 sm:w-32 md:w-40 aspect-square rounded-full border-2"
        />
        <div className="userDetail p-2 pt-4 sm:p-4 md:p-6 text-lg sm:text-xl flex flex-col w-full">
          <span className="text-xl sm:text-4xl">{userDetails.fullName}</span>
          <span className="font-[300] text-base sm:text-xl">
            {userDetails.username}
          </span>
          <span className="font-[300] text-base sm:text-xl">
            {userDetails.email}
          </span>
          <span
            onClick={() => setSettingOpen(true)}
            className="p-2 cursor-pointer absolute right-1 text-white bg-[#ffffff14] rounded-full border border-white hover:bg-[#ffffff1a] flex items-center justify-center gap-1 text-base"
          >
            <FiEdit2 />
          </span>
        </div>
      </div>

      {settingOpen && (
        <div className="fixed inset-0 bg-[#00000020] bg-opacity-50 backdrop-blur flex justify-center items-center z-40">
          <ProfileEditPopUp onClose={handleEditPopup} />
        </div>
      )}

      <div className="z-10 bg-[#001011] sticky top-0 flex justify-between items-center p-2 border mb-2">
        <h2 className="text-xl">Subscribers</h2>
        <p>Total : {totalSubs}</p>
      </div>
      {loadingSubscribers ? (
        <Loader />
      ) : (
        <div className="w-full grid justify-items-center gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {subscribers ? (
            subscribers.map((subscriber, index) => (
              <SubscriberCard key={index} detail={subscriber} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No subscribers found.
            </p>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <Loader />
    </div>
  );
}

export default Profile;
