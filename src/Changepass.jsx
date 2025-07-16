import React, { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import { useNavigate } from "react-router";
import { Tooltip } from "./components/Tooltip";
import { toast, ToastContainer } from "react-toastify";
import eyeopen from "./assets/eyeopen.svg";
import eyeclose from "./assets/eyeclose.svg";

const BASE_URL = import.meta.env.VITE_ENV=="production"?"https://clip-url-backend.onrender.com":"http://localhost:8000";

export const Changepass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [viewPass,setView] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null); // null until check finishes
  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);
  const [passSelect, setPassSelect] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLevel1(newPassword.length > 0);
    setLevel2(newPassword.length >= 8);
    setLevel3(
      newPassword.length >= 8 &&
        /[A-Z]/.test(newPassword) &&
        /[0-9]/.test(newPassword) &&
        /[!@#$%^&*]/.test(newPassword)
    );
  }, [newPassword]);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch(`${BASE_URL}/api/user/info`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log("Login status:", data);
      setLoggedIn(data.loggedIn);
      if (!data.loggedIn) navigate("/login");
      setEmail(data.user.email);
    };

    checkLogin();
  }, []);
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleChangePassword = async () => {
    if (!level3) {
      toast.error(
        "Password requirements not met! Please check the password strength indicators."
      );
      setError(true);
      return;
    } else if (oldPassword === newPassword) {
      toast.error("New password cannot be the same as old password.");
      setError(true);
      return;
    } else {
      const data = { email, oldPassword, newPassword };
      try {
        const response = await fetch(
          `${BASE_URL}/api/user/change-password`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
          }
        );
        const resData = await response.json();
        if (resData.status === "success") {
          toast.success("Password changed successfully!");
          navigate("/login");
        } else if (resData.status === "failed") {
          toast.error("Failed to change password! " + resData.message);
        } else {
          toast.error("Unexpected response: " + JSON.stringify(resData));
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between py-[15px] px-[100px] items-center">
        <div className="flex justify-center items-center">
          <button className="cursor-pointer" onClick={() => handleLogoClick()}>
            <img className="w-[100px] h-auto" src={logo} alt="" />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="font-[Gabarito] transition-colors font-bold hover:bg-[#46A6FF] bg-[#3646F4] text-[18px] rounded-full px-[20px] py-[8px] text-white"
          >
            Dashboard
          </button>
        </div>
      </div>
      <div className="bg-white mt-[70px] shadow rounded-[20px] flex justify-center px-[50px] gap-6 py-[30px] font-[Inter] w-fit mx-auto flex-col">
        <h1 className="font-bold text-center text-xl">Change Password</h1>
        <div className="flex flex-col">
          <label className="text-[#767676] font-medium text-[14px]" htmlFor="">
            Email
          </label>
          <input
            className="bg-white text-black/50 focus:outline-yellow-500 border-[1px] px-[20px] py-[8px] border-black/10"
            type="email"
            readOnly
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[#767676] font-medium text-[14px]" htmlFor="">
            Old Password
          </label>
          <input
            className="bg-white border-[1px] px-[20px] py-[8px] border-black/10"
            type="text"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
          />
        </div>
        <div className="flex relative flex-col">
          <div className="flex justify-between">
            <label
              className="text-[#767676] font-medium text-[14px]"
              htmlFor=""
            >
              New Password
            </label>
          </div>
          <input
            onFocus={() => setPassSelect(true)}
            onSelect={() => setError(false)}
            onBlur={() => setPassSelect(false)}
            className={`bg-white border-[1px] px-[20px] py-[8px] border-black/10 ${
              error ? "border-red-500" : ""
            }`}
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type={viewPass ? "text" : "password"}
          />
          <div onClick={()=>setView(!viewPass)} className="px-2 hover:opacity-50 -translate-y-[19%] py-2 absolute right-0 top-[48%]">
            <img className="w-5 h-auto" src={viewPass? eyeopen : eyeclose} alt="" />
          </div>
          {passSelect && <Tooltip />}
        </div>
        {passSelect && (
          <div className="flex gap-1">
            {level1 ? (
              <div className="w-full h-[2px] bg-red-500"></div>
            ) : (
              <div className="w-full h-[2px] bg-gray-300"></div>
            )}
            {level2 ? (
              <div className="w-full h-[2px] bg-yellow-500"></div>
            ) : (
              <div className="w-full h-[2px] bg-gray-300"></div>
            )}
            {level3 ? (
              <div className="w-full h-[2px] bg-green-500"></div>
            ) : (
              <div className="w-full h-[2px] bg-gray-300"></div>
            )}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <button onClick={()=> navigate('/forgot-password')} className="text-[12px] text-[#46A6FF] underline hover:no-underline">
              Forgot Password?
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleChangePassword()}
            className="text-white w-full transition-colors py-2 hover:bg-[#46A6FF] font-bold bg-[#3646F4]"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};
