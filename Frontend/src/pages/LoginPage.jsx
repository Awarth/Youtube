import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import api from "../utility/api";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [text, setText] = useState(false);
  const [error, setError] = useState(""); // Keep track of error messages
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setError(""); // Reset error before the login attempt

    const sendLoginRequest = async () => {
      try {
        const response = await api.post(`/users/login`, details);

        if (response.status === 200) {
          setError(""); // Clear any existing errors
          dispatch(
            loginSuccess({
              accessToken: response.data.data.accessToken,
              user: response.data.data.user,
            })
          );
          navigate("/"); // Only navigate on successful login

          // Optionally reset form fields
          setDetails({
            username: "",
            password: "",
          });
        }
      } catch (error) {
        // Set error message based on the type of error
        if (error.response && error.response.status === 401) {
          setError("Invalid username or password. Please try again.");
        } else {
          setError("An error occurred. Please try again later.");
        }
        console.error("Error during login:", error);
      }
    };

    sendLoginRequest();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen gap-3">
      <div className="max-w-[26rem] w-full border border-[#97C8EB] rounded-xl flex flex-col p-8 bg-[#001011] text-[#97C8EB]">
        <h2 className="text-4xl text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col w-full text-lg">
          <label htmlFor="username" className="mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={details.username}
            onChange={handleInputChange}
            className="border border-[#97C8EB] px-2 py-1 bg-transparent rounded font-light mb-4"
            required
          />
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <div className="flex w-full justify-between items-center border border-[#97C8EB] rounded mb-2">
            <input
              type={text ? "text" : "password"}
              name="password"
              value={details.password}
              onChange={handleInputChange}
              className=" w-full bg-transparent px-2 py-1 outline-none font-light"
              required
            />
            <p
              onClick={() => setText(!text)}
              className="text-3xl px-2 cursor-pointer"
            >
              {text ? <PiEyeSlash /> : <PiEyeLight />}
            </p>
          </div>
          {error && <p className="text-center text-red-500 mb-4">{error}</p>}
          <p className="text-base font-light mb-4">
            Don’t have an account?{" "}
            <Link
              to="/profile/sign-up"
              className="underline font-medium text-[#bd5c49] cursor-pointer"
            >
              Sign up
            </Link>
          </p>
          <div className="relative w-full cursor-pointer">
            <button
              type="submit"
              className="w-full py-2 px-4 flex justify-center items-center overflow-hidden border border-[#97C8EB] bg-transparent gap-1 rounded transition-all duration-300 ease-in-out hover:scale-105 before:rounded before:absolute before:top-0 before:right-full before:w-0 before:h-full before:transition-all before:bg-gradient-to-r before:bg-[#3AAFB9] before:duration-300 before:ease-in-out before:z-[-1] hover:before:right-0 hover:before:w-full "
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-[26rem] w- border border-[#97C8EB] py-1 px-2 text-[#97C8EB] rounded-md">
        <h2>Demo Login</h2>
        <p>username : adarsh</p>
        <p>password : Adarsh@123</p>
      </div>
    </div>
  );
}

export default Login;
