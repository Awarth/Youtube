import { IoSearch } from "react-icons/io5";
import { PiYoutubeLogoFill } from "react-icons/pi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setSearchQuery } from "../redux/slices/searchSlice";
function Header({ className }) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(inputValue));
  };
  return (
    <>
      <header
        className={`w-full bg-[#001011] flex items-center justify-center border-b border-[#97C8EB] ${className} z-50`}
      >
        <nav className="max-w-[1440px] w-full px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="logo text-[#3AAFB9] flex justify-center items-center cursor-pointer"
          >
            <PiYoutubeLogoFill className="text-[#3AAFB9] text-5xl" />{" "}
            <p className="text-3xl logo-text hidden sm:block">YouTube</p>
          </Link>
          <form
            onSubmit={handleSearch}
            className="search flex justify-center items-center gap-1 rounded-lg bg-transparent border border-[#97C8EB] p-1 text-[#97C8EB]"
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search..."
              className=" p-1 outline-none text-xl bg-transparent w-[200px] sm:w-auto"
            />
            <IoSearch className="text-2xl" />
          </form>
        </nav>
      </header>
    </>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
