import React, { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import { useNavigate } from "react-router";
import { Tooltip } from "./components/Tooltip";
import { toast, ToastContainer } from "react-toastify";
import eyeopen from "./assets/eyeopen.svg";
import eyeclose from "./assets/eyeclose.svg";
import { useParams } from "react-router";

const BASE_URL = "https://clip-url-backend.onrender.com";

export const Reset = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [viewPass, setView] = useState(false);
  const [viewConfirm, setConfirm] = useState(false);
  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);
  const [passSelect, setPassSelect] = useState(false);
  const [error, setError] = useState(false);
  const {id,token} = useParams();

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
    } 
    else if (confirmPassword !== newPassword) {
      toast.error("Make sure to enter same password in both fields!");
      setError(true);
      return;
    } 
    else {
      const data = { token, newPassword };
      try {
        const response = await fetch(
          `${BASE_URL}/api/user/reset-password`,
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
          toast.success("Password changed successfully! Redirecting in 3 seconds");
          setTimeout(()=>navigate("/login"),3000);
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
        
      </div>
      <div className="bg-white mt-[70px] shadow rounded-[20px] flex justify-center px-[50px] gap-6 py-[30px] font-[Inter] w-fit mx-auto flex-col">
        <h1 className="font-bold text-center text-xl">Change Password</h1>
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
          <div
            onClick={() => setView(!viewPass)}
            className="px-2 hover:opacity-50 -translate-y-[19%] py-2 absolute right-0 top-[48%]"
          >
            <img
              className="w-5 h-auto"
              src={viewPass ? eyeopen : eyeclose}
              alt=""
            />
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
        <div>
          <div className="flex flex-col relative">
            <div className="flex justify-between">
              <label
                className="text-[#767676] font-medium text-[14px]"
                htmlFor=""
              >
                Confirm Password
              </label>
            </div>
            <input
              onSelect={() => setError(false)}
              className={`bg-white border-[1px] px-[20px] py-[8px] border-black/10 ${
                error ? "border-red-500" : ""
              }`}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type={viewConfirm ? "text" : "password"}
            />
            <div
              onClick={() => setConfirm(!viewConfirm)}
              className="px-2 hover:opacity-50 -translate-y-[19%] py-2 absolute right-0 top-[48%]"
            >
              <img
                className="w-5 h-auto"
                src={viewConfirm ? eyeopen : eyeclose}
                alt=""
              />
            </div>
          </div>
          {
            confirmPassword != newPassword && 
            (
                <p className="text-center text-xs mt-2 text-red-500">
                    Passwords not matching!
                </p>
            )
          }
          <button
            onClick={() => handleChangePassword()}
            className="text-white w-full mt-6 transition-colors py-2 hover:bg-[#46A6FF] font-bold bg-[#3646F4]"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};
