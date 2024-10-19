import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/slices/authSlice"; // Update the import path if necessary

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (accessToken && user) {
      dispatch(loginSuccess({ accessToken, user }));
    }
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Header className="sticky top-0 h-[4.5rem]" />
      <div className="main w-full h-full flex">
        <Sidebar className="sticky left-0 z-30 h-[calc(100vh-4.5rem)]" />
        <div className="text-[#97C8EB] w-full overflow-y-auto p-4 h-[calc(100vh-4.5rem)]">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
