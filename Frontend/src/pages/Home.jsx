import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";
import { base_url } from "../constants";
import { useSelector } from "react-redux";
import api from "../utility/api";

function Home() {
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const limit = 30;

  const query = useSelector((state) => state.search.query);

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true);
      try {
        const res = await api.get(`${base_url}/videos`, {
          params: { query: query, page, limit },
        });
        setVideos(res.data.data.videos);
        setTotalPages(res.data.data.totalPages);
      } catch (error) {
        console.error("Error loading videos:", error);
        setError("Error loading videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, [query, page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      {loading ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="wrapper w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 min-[1960px]:grid-cols-5 grid-flow-row gap-4">
            {videos.map((video, index) => (
              <VideoCard key={index} details={video} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination-controls flex justify-between mt-4">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="p-2 bg-gray-700 rounded"
              >
                Previous
              </button>
              <p className="text-lg">
                {page} of {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="p-2 bg-gray-700 rounded"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Home;
