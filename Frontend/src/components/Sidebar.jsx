import { FiHome } from "react-icons/fi";
import { BiLike } from "react-icons/bi";
import { BiHistory } from "react-icons/bi";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { IoFolderOpenOutline } from "react-icons/io5";
import { FiUserCheck } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";
import { TfiTwitter } from "react-icons/tfi";
import { IoIosLogOut } from "react-icons/io";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// import avatar from "../assets/images/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../utility/api";
import { logout } from "../redux/slices/authSlice";

function Sidebar({ className }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      const res = await api.post(`/users/logout`);
      console.log(res.data);

      dispatch(logout());

      window.location.href = "/profile/login";
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <aside
        className={`border-r border-[#97C8EB] w-auto lg:w-72 p-2 sm:p-2 ${className} bg-[#001011]`}
      >
        <div className="h-full px-1 py-1 lg:p-4 text-[#97C8EB] text-2xl lg:text-xl flex flex-col justify-between">
          <div className="controls flex flex-col gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center border border-[#97C8EB] gap-0 lg:gap-1 p-2 rounded lg:px-3 lg:py-1 cursor-pointer transition-all duration-300 ease-in ${
                  isActive ? "bg-[#093A3E]" : "hover:bg-[#093A3E]"
                }`
              }
            >
              <FiHome />
              <p className="max-lg:hidden">Home</p>
            </NavLink>

            <NavLink
              to="/tweet"
              className={({ isActive }) =>
                `flex items-center border border-[#97C8EB] gap-0 lg:gap-1 p-2 rounded lg:px-3 lg:py-1 cursor-pointer transition-all duration-300 ease-in ${
                  isActive ? "bg-[#093A3E]" : "hover:bg-[#093A3E]"
                }`
              }
            >
              <TfiTwitter />
              <p className="max-lg:hidden">Tweet</p>
            </NavLink>

            <NavLink
              to="/liked-videos"
              className={({ isActive }) =>
                `flex items-center border border-[#97C8EB] gap-0 lg:gap-1 p-2 rounded lg:px-3 lg:py-1 cursor-pointer transition-all duration-300 ease-in ${
                  isActive ? "bg-[#093A3E]" : "hover:bg-[#093A3E]"
                }`
              }
            >
              <BiLike />
              <p className="max-lg:hidden">Liked Videos</p>
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                `flex items-center border border-[#97C8EB] gap-0 lg:gap-1 p-2 rounded lg:px-3 lg:py-1 cursor-pointer transition-all duration-300 ease-in ${
                  isActive ? "bg-[#093A3E]" : "hover:bg-[#093A3E]"
                }`
              }
            >
              <BiHistory />
              <p className="max-lg:hidden">History</p>
            </NavLink>

            <NavLink
              to="/my-content"
              className={({ isActive }) =>
                `flex items-center border border-[#97C8EB] gap-0 lg:gap-1 p-2 rounded lg:px-3 lg:py-1 cursor-pointer transition-all duration-300 ease-in ${
                  isActive ? "bg-[#093A3E]" : "hover:bg-[#093A3E]"
                }`
              }
            >
              <LiaPhotoVideoSolid />
              <p className="max-lg:hidden">My Content</p>
            </NavLink>

            <NavLink
              to="/playlist"
              className={({ isActive }) =>
                `flex items-center border border-[#97C8EB] gap-0 lg:gap-1 p-2 rounded lg:px-3 lg:py-1 cursor-pointer transition-all duration-300 ease-in ${
                  isActive ? "bg-[#093A3E]" : "hover:bg-[#093A3E]"
                }`
              }
            >
              <IoFolderOpenOutline />
              <p className="max-lg:hidden">Playlist</p>
            </NavLink>
            <NavLink
              to="/subscriptions"
              className={({ isActive }) =>
                `flex items-center border border-[#97C8EB] gap-0 lg:gap-1 p-2 rounded lg:px-3 lg:py-1 cursor-pointer transition-all duration-300 ease-in ${
                  isActive ? "bg-[#093A3E]" : "hover:bg-[#093A3E]"
                }`
              }
            >
              <FiUserCheck />
              <p className="max-lg:hidden">Subscriptions</p>
            </NavLink>

            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `flex items-center border border-[#97C8EB] gap-0 lg:gap-1 p-2 rounded lg:px-3 lg:py-1 cursor-pointer transition-all duration-300 ease-in ${
                  isActive ? "bg-[#093A3E]" : "hover:bg-[#093A3E]"
                }`
              }
            >
              <MdOutlineFileUpload />
              <p className="max-lg:hidden">Upload</p>
            </NavLink>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center border border-[#97C8EB] gap-0 lg:gap-1 p-2 rounded lg:px-3 lg:py-1 cursor-pointer transition-all duration-300 ease-in hover:bg-[#093A3E]"
            >
              <IoIosLogOut />
              <p className="max-lg:hidden">Logout</p>
            </button>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex w-full items-center border border-[#97C8EB] gap-0 lg:gap-1 p-1 rounded lg:px-3 lg:py-1 cursor-pointer transition-all duration-300 ease-in ${
                  isActive ? "bg-[#093A3E]" : "hover:bg-[#093A3E]"
                }`
              }
            >
              <img
                src={user.avatar}
                alt="avatar"
                className="rounded-full w-8 aspect-square border border-[#97C8EB]"
              />
              <p className="text-lg max-lg:hidden">{user.username}</p>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
