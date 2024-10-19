import { useEffect, useState, useCallback } from "react";
import api from "../utility/api";
import SubscriptionCard from "../components/SubscriptionCard";
import Loader from "../components/Loader";

function Subscriptions() {
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  const [userSubs, setUserSubs] = useState(null);
  const [error, setError] = useState(null);

  const fetchSubs = useCallback(async () => {
    try {
      const res = await api.get(`/subscription/c/${userId}`);
      setUserSubs(res.data.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      setError("Failed to load subscriptions");
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchSubs();
    }
  }, [userId, fetchSubs]);

  return (
    <div className="subscriptions">
      <h2 className="text-2xl md:text-3xl mb-3">All Subscriptions</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : userSubs ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          {userSubs.map((subs, index) => (
            <SubscriptionCard key={index} detail={subs} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Subscriptions;
