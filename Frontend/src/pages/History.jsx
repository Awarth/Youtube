import { useEffect, useState } from "react";
import api from "../utility/api";
import Loader from "../components/Loader";
import HistoryCard from "../components/HistoryCard";

function History() {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/users/history");
        setHistory(res.data.data);
      } catch (error) {
        console.log("Error fetching history : ", error);
      }
    };
    fetchHistory();
  }, []);

  if (!history) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl mb-4">History</h2>
      <div className="w-full grid grid-cols-1 gap-4 lg:gap-2 lg:grid-cols-2">
        {history.map((video, index) => (
          <HistoryCard key={index} detail={video} />
        ))}
      </div>
    </>
  );
}

export default History;
