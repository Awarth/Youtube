import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utility/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserDetailsEdit() {
  const navigate = useNavigate();
  const fullName = useSelector((state) => state.auth.user.fullName);
  const email = useSelector((state) => state.auth.user.email);

  const [userDetail, setDetail] = useState({
    fullName: fullName,
    email: email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserDetailsChange = (e) => {
    e.preventDefault();
    const changeUserDetail = async () => {
      try {
        await api.patch(`/users/update-details`, userDetail);
        toast.success("User details updated successfully");
        navigate("/profile");
      } catch (error) {
        toast.error("Error while updating");
        console.log("Error while changing name or email :", error);
      }
    };
    changeUserDetail();
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="changeProfile max-w-96 w-full relative border bg-[#001011] rounded p-8">
        <h2 className="text-center text-3xl mb-2">Change Profile</h2>
        <form
          className="w-full flex flex-col"
          onSubmit={handleUserDetailsChange}
        >
          <label htmlFor="fullName" className="mb-1">
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            value={userDetail.fullName}
            onChange={handleInputChange}
            className="bg-transparent border border-[#97C8EB] text-[#97C8EB] px-2 py-1 rounded mb-2"
          />
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userDetail.email}
            onChange={handleInputChange}
            className="bg-transparent border border-[#97C8EB] text-[#97C8EB] px-2 py-1 rounded mb-4"
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

export default UserDetailsEdit;
