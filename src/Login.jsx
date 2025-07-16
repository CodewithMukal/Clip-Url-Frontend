import React, { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import { useNavigate } from "react-router";
import google from "./assets/google.svg";
import { toast, ToastContainer } from "react-toastify";
import eyeopen from "./assets/eyeopen.svg";
import eyeclose from "./assets/eyeclose.svg";

const BASE_URL = import.meta.env.VITE_ENV=="production"?"https://clip-url-backend.onrender.com":"http://localhost:8000";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(null);
  const [viewPass, setView] = useState(false);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch(`${BASE_URL}/api/user/info`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log("Login status:", data.loggedIn);
      setLoggedIn(data.loggedIn);
      if (data.loggedIn) navigate("/dashboard");
    };

    checkLogin();
  }, []);
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleSignupClick = () => {
    navigate("/signup");
  };
  const handleLogin = async () => {
    const data = {
      email,
      password,
      remember,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (resData.status === "success") {
        toast.success("Logged In");
        localStorage.setItem("token", resData.token);
        navigate("/dashboard");
      } else if (resData.status === "failed") {
        alert("Login failed! " + resData.message);
      } else {
        alert("Unexpected response: " + JSON.stringify(resData));
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Check console.");
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
            onClick={() => handleSignupClick()}
            className="font-[Gabarito] transition-colors font-bold hover:bg-[#46A6FF] bg-[#3646F4] text-[18px] rounded-full px-[20px] py-[8px] text-white"
          >
            Signup
          </button>
        </div>
      </div>
      <div className="bg-white mt-[70px] shadow rounded-[20px] flex justify-center px-[50px] gap-10 py-[30px] font-[Inter] w-fit mx-auto flex-col">
        <h1 className="font-bold text-xl">Login</h1>
        <div className="flex flex-col">
          <label className="text-[#767676] font-medium text-[14px]" htmlFor="">
            Email
          </label>
          <input
            className="bg-white border-[1px] px-[20px] py-[8px] border-black/10"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex relative flex-col">
          <div className="flex justify-between">
            <label
              className="text-[#767676] font-medium text-[14px]"
              htmlFor=""
            >
              Password
            </label>
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-[12px] font-medium hover:underline text-[#46A6FF]"
            >
              Forgot Password?
            </button>
          </div>
          <input
            className="bg-white border-[1px] px-[20px] py-[8px] border-black/10"
            type={viewPass ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-1 justify-center items-center">
            <input
              onClick={(e) => setRemember(e.target.value)}
              type="checkbox"
              name=""
              id=""
            />
            <p className="text-[12px]">Remember Me</p>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleSignupClick()}
              className="text-[12px] text-[#46A6FF] underline hover:no-underline"
            >
              Haven't Registered?
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleLogin()}
            className="text-white w-full py-2 hover:bg-[#46A6FF] font-bold bg-[#3646F4]"
          >
            Login
          </button>
        </div>
        <div className="flex justify-center text-black/60 font-bold items-center border-[1px] border-black/20 mx-auto w-10 h-10 rounded-full">
          <p>or</p>
        </div>
        <div>
          <button className="text-white flex justify-center items-center gap-2 w-full py-2 hover:bg-[#46A6FF] font-bold bg-[#3646F4]">
            <img src={google} alt="" /> Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};
