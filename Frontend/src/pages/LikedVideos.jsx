import { useEffect, useState } from "react";
import LikeVideoCard from "../components/LikeVideoCard";
import Loader from "../components/Loader";
import api from "../utility/api";

function LikedVideos() {
  const [likedVideos, setLikedVideos] = useState(null);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const res = await api.get("/like/videos");
        setLikedVideos(res.data.data);
      } catch (error) {
        console.log("Error while fetching liked videos : ", error);
      }
    };

    fetchLikedVideos();
  }, []);

  if (!likedVideos) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl mb-3">Liked videos</h2>
      <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 md:gap-2">
        {likedVideos.map((video, index) => (
          <LikeVideoCard key={index} detail={video.likedVideo} />
        ))}
      </div>
    </>
  );
}

export default LikedVideos;
