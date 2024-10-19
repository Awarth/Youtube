import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";

function ProfileEditPopUp({ onClose }) {

  const handleClosePopup = () => {
    onClose();
  };

  return (
    <div className="border relative border-white p-10 flex flex-col gap-5 rounded-md bg-[#001011]">
      <span
        onClick={handleClosePopup}
        className="p-1 bg-[#ffffff3a] w-fit rounded-full text-xl text-white absolute top-2 right-2 cursor-pointer"
      >
        <RxCross2 />
      </span>
      <div className="relative w-full cursor-pointer">
        <Link
          to="/profile/update-details" 
          className="w-full py-2 px-4 flex items-center overflow-hidden border border-[#97C8EB] bg-transparent gap-1 rounded transition-all duration-300 ease-in-out hover:scale-105 before:rounded before:absolute before:top-0 before:right-full before:w-0 before:h-full before:transition-all before:bg-gradient-to-r before:bg-[#3AAFB9] before:duration-300 before:ease-in-out before:z-[-1] hover:before:right-0 hover:before:w-full text-white"
        >
          <FiEdit2 />
          Edit Profile
        </Link>
      </div>
      <div className="relative w-full cursor-pointer">
        <Link
          to="/profile/avatar"
          className="w-full py-2 px-4 flex items-center overflow-hidden border border-[#97C8EB] bg-transparent gap-1 rounded transition-all duration-300 ease-in-out hover:scale-105 before:rounded before:absolute before:top-0 before:right-full before:w-0 before:h-full before:transition-all before:bg-gradient-to-r before:bg-[#3AAFB9] before:duration-300 before:ease-in-out before:z-[-1] hover:before:right-0 hover:before:w-full text-white"
        >
          <FiEdit2 />
          Change Avatar
        </Link>
      </div>
      <div className="relative w-full cursor-pointer">
        <Link
          to="/profile/cover" // Changed to be relative
          className="w-full py-2 px-4 flex items-center overflow-hidden border border-[#97C8EB] bg-transparent gap-1 rounded transition-all duration-300 ease-in-out hover:scale-105 before:rounded before:absolute before:top-0 before:right-full before:w-0 before:h-full before:transition-all before:bg-gradient-to-r before:bg-[#3AAFB9] before:duration-300 before:ease-in-out before:z-[-1] hover:before:right-0 hover:before:w-full text-white"
        >
          <FiEdit2 />
          Change Cover
        </Link>
      </div>
      <div className="relative w-full cursor-pointer">
        <Link
          to="/profile/change-password" // Changed to be relative
          className="w-full py-2 px-4 flex items-center overflow-hidden border border-[#97C8EB] bg-transparent gap-1 rounded transition-all duration-300 ease-in-out hover:scale-105 before:rounded before:absolute before:top-0 before:right-full before:w-0 before:h-full before:transition-all before:bg-gradient-to-r before:bg-[#3AAFB9] before:duration-300 before:ease-in-out before:z-[-1] hover:before:right-0 hover:before:w-full text-white"
        >
          <FiEdit2 />
          Change Password
        </Link>
      </div>
    </div>
  );
}

ProfileEditPopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ProfileEditPopUp;
