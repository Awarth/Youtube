import { useState } from "react";
import toast from "react-hot-toast";
import { base_url } from "../constants";
import { convertToFormData } from "../utility/ConvertToFormData";
import api from "../utility/api";

function Upload() {
  const [video, setVideo] = useState({
    videoFile: null,
    thumbnail: null,
    title: "",
    description: "",
    isPublished: true,
  });

  const [tweet, setTweet] = useState({
    content: "",
  });

  const formData = convertToFormData(video);

  const handleVideoUpload = (e) => {
    e.preventDefault();
    console.log(formData);
    const uploading = async () => {
      try {
        const res = await api.post(`${base_url}/videos`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        toast.success("Video uploaded successfully");
        setVideo({
          videoFile: null,
          thumbnail: null,
          title: "",
          description: "",
          isPublished: true,
        });
      } catch (error) {
        toast.error("Error while uploading the video");
        console.log("Error while uploading the video :", error);
      }
    };
    uploading();
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setVideo((prevVideo) => ({
      ...prevVideo,
      [name]: files[0],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "content") {
      setTweet((prevTweet) => ({
        ...prevTweet,
        [name]: value,
      }));
    }
    if (type === "checkbox") {
      setVideo((prevVideo) => ({
        ...prevVideo,
        [name]: checked,
      }));
    } else {
      setVideo((prevVideo) => ({
        ...prevVideo,
        [name]: value,
      }));
    }
  };

  const handleTweetUpload = (e) => {
    e.preventDefault();
    console.log(tweet);

    const uploading = async () => {
      try {
        const res = await api.post(`${base_url}/tweet`, tweet);

        console.log(res.data);
        toast.success("Tweet uploaded successfully");
        setTweet({
          content: "",
        });
      } catch (error) {
        toast.error("Error while uploading the tweet");
        console.log("Error while uploading the tweet:", error);
      }
    };

    uploading();
  };

  return (
    <>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
        <form
          onSubmit={handleVideoUpload}
          className="videoUploadControl flex flex-col border-b md:border-b-0 md:border-r border-white pb-8 md:pr-4"
        >
          <h2 className="text-3xl text-[#3AAFB9] mb-2 font-semibold">Video</h2>
          <label className="mb-1" htmlFor="videoFile">
            VideoFile
          </label>
          <input
            type="file"
            accept="video/"
            required={true}
            name="videoFile"
            className="cursor-pointer border border-[#97C8EB] bg-[#1C1C1C] p-1 rounded mb-2"
            onChange={handleFileChange}
          />
          <label className="mb-1" htmlFor="thumbnail">
            Thumbnail
          </label>
          <input
            type="file"
            accept="image/"
            name="thumbnail"
            className="cursor-pointer border border-[#97C8EB] bg-[#1C1C1C] p-1 rounded mb-2"
            onChange={handleFileChange}
          />
          <label className="mb-1" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            required={true}
            className="border border-[#97C8EB] bg-transparent rounded px-2 py-1 mb-2"
            value={video.title}
            onChange={handleInputChange}
          />
          <label className="mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            required={true}
            className="border border-[#97C8EB] bg-transparent rounded px-2 py-1 h-40 resize-none mb-2"
            value={video.description}
            onChange={handleInputChange}
          />
          <label htmlFor="isPublished" className="mb-1">
            Publish
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              name="isPublished"
              onChange={handleInputChange}
              checked={video.isPublished}
            />
            <div className="group peer bg-transparent rounded-full duration-300 w-12 h-6 ring-1 ring-[#F26430] after:duration-300 after:bg-[#F26430] peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-4 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"></div>
          </label>
          <button className="w-fit text-lg bg-transparent border border-[#97C8EB] px-3 py-1 mt-4 overflow-hidden transition-all duration-300 ease-in hover:scale-105 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:bg-[#093A3E] before:transition-all before:duration-300 before:ease-in-out before:z-[-1] hover:before:left-0 text-[#97C8EB]">
            Upload
          </button>
        </form>
        <form
          onSubmit={handleTweetUpload}
          className="tweetUploadControl flex flex-col pb-8 md:pb-0 pt-4 md:pt-0 md:pl-4"
        >
          <h2 className="text-3xl text-[#3AAFB9] mb-2 font-semibold">Tweet</h2>
          <textarea
            type="text"
            name="content"
            required={true}
            className="border border-[#97C8EB] bg-transparent rounded h-48 px-2 py-1 "
            onChange={handleInputChange}
          />
          <button className="w-fit text-lg bg-transparent border border-[#97C8EB] px-3 py-1 mt-4 overflow-hidden transition-all duration-300 ease-in hover:scale-105 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:bg-[#093A3E] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:before:left-0 text-[#97C8EB]">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default Upload;
