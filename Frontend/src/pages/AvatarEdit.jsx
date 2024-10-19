import { useState } from "react";
import { convertToFormData } from "../utility/ConvertToFormData";
import toast from "react-hot-toast";
import api from "../utility/api";

function AvatarEdit() {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const { name, files } = e.target;
    setAvatar((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleAvatarUpload = (e) => {
    e.preventDefault();
    const formData = convertToFormData(avatar);
    const avatarUpload = async () => {
      try {
        const res = await api.patch(`/users/avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        setAvatar(null);
        toast.success("Avatar changed successfully");
        document.getElementById("avatarInput").value = null;
      } catch (error) {
        console.log("Error while changing avatar image :", error);
        toast.error("Error while changing avatar");
      }
    };
    avatarUpload();
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="changeAvatar max-w-96 w-full relative border bg-[#001011] rounded p-8">
        <h2 className="text-center text-3xl mb-2">Change Avatar</h2>
        <form className="w-full flex flex-col" onSubmit={handleAvatarUpload}>
          <label htmlFor="avatar" className="mb-1">
            Avatar
          </label>
          <input
            id="avatarInput"
            required={true}
            type="file"
            name="avatar"
            accept="image/*"
            className="mb-4 border border-white rounded p-1"
            onChange={handleAvatarChange}
          />
          <div className="relative w-full cursor-pointer">
            <button className="w-full py-2 px-4 flex justify-center items-center overflow-hidden border border-[#97C8EB] bg-transparent gap-1 rounded transition-all duration-300 ease-in-out hover:scale-105 before:rounded before:absolute before:top-0 before:right-full before:w-0 before:h-full before:transition-all before:bg-gradient-to-r before:bg-[#3AAFB9] before:duration-300 before:ease-in-out before:z-[-1] hover:before:right-0 hover:before:w-full text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AvatarEdit;
