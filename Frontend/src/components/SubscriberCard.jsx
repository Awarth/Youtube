import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import api from "../utility/api";
import Loader from "./Loader";

function SubscriberCard({ detail }) {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setSubscribed(detail.subscribedToSubscriber);
  }, [detail]);

  const channelId = detail._id;

  const handleToggleSubscription = async () => {
    try {
      const res = await api.post(`/subscription/c/${channelId}`);
      if (res.data?.data?.subscribed !== undefined) {
        setSubscribed(res.data.data.subscribed);
      } else {
        setSubscribed(!subscribed);
      }
    } catch (error) {
      console.error("Error toggling subscription: ", error);
    }
  };

  if (!detail) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <span className="w-fit bg-[#8080801d] backdrop-blur rounded-lg py-4 px-8 flex flex-col gap-2 justify-center items-center">
      <img
        src={detail.avatar}
        alt="avatar"
        className="rounded-full max-w-[6rem] aspect-square"
      />
      <p className="text-white">{detail.username}</p>
      <button
        onClick={handleToggleSubscription}
        className={`border border-[#97C8EB] rounded-3xl text-base text-white py-2 px-4 cursor-pointer transition-all duration-300 ease-in-out ${
          subscribed ? "bg-transparent" : "bg-[#3AAFB9]"
        }`}
      >
        {subscribed ? <span>Unsubscribe</span> : <span>Subscribe</span>}
      </button>
    </span>
  );
}

SubscriberCard.propTypes = {
  detail: PropTypes.object.isRequired,
};

export default SubscriberCard;
