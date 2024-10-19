import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import api from "../utility/api";
import toast from "react-hot-toast";
function UserPasswordEdit() {
  const [text, setText] = useState(false);
  const [error, setError] = useState(false);

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordInput = (e) => {
    const { name, value } = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setError(null);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&]{10,}$/;

    if (!passwordRegex.test(password.newPassword)) {
      setError("Password must is not strong enough");
      return;
    } else if (password.newPassword !== password.confirmPassword) {
      setError("New password and Confirm password does not match");
      return;
    } else if (password.oldPassword === password.confirmPassword) {
      setError("Old password and new password should be different");
      return;
    }

    const passwordChange = async () => {
      try {
        const res = await api.patch("/users/change-password", {
          oldPassword: password.oldPassword,
          newPassword: password.confirmPassword,
        });
        console.log(res.data);
        toast.success("Password changed successfully");
        setPassword({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.log("Error changing password", error);
        toast.error("Error changing password");
      }
    };
    passwordChange();
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="changeProfile max-w-96 w-full border bg-[#001011] rounded p-8">
        <h2 className="text-center text-3xl mb-2">Change Profile</h2>
        <form className="w-full flex flex-col" onSubmit={handlePasswordChange}>
          <label htmlFor="oldPasswords" className="mb-1">
            Old Password
          </label>
          <input
            name="oldPassword"
            type="text"
            required={true}
            value={password.oldPassword}
            onChange={handlePasswordInput}
            className="bg-transparent outline-none px-2 py-1 border border-[#97C8EB] rounded mb-2"
          />
          <label htmlFor="newPassword" className="mb-1">
            New Password
          </label>
          <div className="flex justify-between items-center border border-[#97C8EB] text-[#97C8EB] rounded overflow-hidden mb-4">
            <input
              name="newPassword"
              type={text ? `text` : `password`}
              required={true}
              value={password.newPassword}
              onChange={handlePasswordInput}
              className="bg-transparent border-none text-[#97C8EB] px-2 py-1 outline-none"
            />
            <span onClick={() => setText(!text)} className="text-2xl mx-1">
              {text ? <PiEyeSlash /> : <PiEyeLight />}
            </span>
          </div>
          <label htmlFor="confirmPassword" className="mb-1">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            required={true}
            value={password.confirmPassword}
            onChange={handlePasswordInput}
            className="bg-transparent border border-[#97C8EB] text-[#97C8EB] px-2 py-1 rounded mb-4"
          />
          <span className="text-sm font-extralight">
            New password must include
            <ul className="list-disc list-inside">
              <li>password must be 10 char long</li>
              <li>1 symbol [@,$,!,%,*,?,&,_]</li>
              <li>1 uppercase letter [A-Z]</li>
              <li>1 number [0-9]</li>
              <li>lowercase letters [a-z]</li>
            </ul>
          </span>
          <p className="text-red-500 text-center text-sm mb-4">
            {error ? error : ""}
          </p>
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

export default UserPasswordEdit;
