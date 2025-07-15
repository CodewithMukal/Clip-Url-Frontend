import React, { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import google from "./assets/google.svg";
import { useNavigate } from "react-router";
import { Tooltip } from "./components/Tooltip";
import { toast, ToastContainer } from "react-toastify";

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(null); // null until check finishes
  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);
  const [passSelect, setPassSelect] = useState(false);
  const [error, setError] = useState(false);

  const BASE_URL = "https://clip-url-backend.onrender.com";

  useEffect(() => {
    setLevel1(password.length > 0);
    setLevel2(password.length >= 8);
    setLevel3(
      password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)
    );
  }, [password]);

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
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleSignup = () => {
    console.log(email, username, password);

    const userData = {
      username,
      email,
      password,
    };
    const sendData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/user/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // if you're using cookies
            body: JSON.stringify(userData),
          }
        );

        const resData = await response.json();

        if (resData.status === "success") {
          alert("Signup successful!");
          navigate("/dashboard");
        }
        if (resData.status === "failed") {
          toast.error("Signup failed! " + resData.message);
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("Something went wrong!");
      }
    };

    if(level3)
      {
        sendData();
      }
    else{
      setError(true);
      toast.error("Password requirements not met! Please check the password strength indicators.");
    }
  };

  return (
    <div>
      <ToastContainer/>
      <div className="flex justify-between py-[15px] px-[100px] items-center">
        <div className="flex justify-center items-center">
          <button className="cursor-pointer" onClick={() => handleLogoClick()}>
            <img className="w-[100px] h-auto" src={logo} alt="" />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleLoginClick()}
            className="font-[Gabarito] transition-colors font-bold hover:bg-[#46A6FF] bg-[#3646F4] text-[18px] rounded-full px-[20px] py-[8px] text-white"
          >
            Login
          </button>
        </div>
      </div>
      <div className="bg-white mt-[70px] shadow rounded-[20px] flex justify-center px-[50px] gap-6 py-[30px] font-[Inter] w-fit mx-auto flex-col">
        <h1 className="font-bold text-xl">Signup</h1>
        <div className="flex flex-col">
          <label className="text-[#767676] font-medium text-[14px]" htmlFor="">
            Username
          </label>
          <input
            className="bg-white border-[1px] px-[20px] py-[8px] border-black/10"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[#767676] font-medium text-[14px]" htmlFor="">
            Email Address
          </label>
          <input
            className="bg-white border-[1px] px-[20px] py-[8px] border-black/10"
            type="email"
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
          </div>
          <input
            onFocus={() => setPassSelect(true)}
            onSelect={() => setError(false)}
            onBlur={()=> setPassSelect(false)}
            className={`bg-white border-[1px] px-[20px] py-[8px] border-black/10 ${error ? "border-red-500" : ""}`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          {
            passSelect && (
              <Tooltip/>)
          }
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
            <button
              onClick={() => handleLoginClick()}
              className="text-[12px] text-[#46A6FF] underline hover:no-underline"
            >
              Already Registered?
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleSignup()}
            className="text-white w-full transition-colors py-2 hover:bg-[#46A6FF] font-bold bg-[#3646F4]"
          >
            Signup
          </button>
        </div>
        <div className="flex justify-center text-black/60 font-bold items-center border-[1px] border-black/20 mx-auto w-10 h-10 rounded-full">
          <p>or</p>
        </div>
        <div>
          <button className="text-white transition-colors flex justify-center items-center gap-2 w-full py-2 hover:bg-[#46A6FF] font-bold bg-[#3646F4]">
            <img src={google} alt="" /> Signup with Google
          </button>
        </div>
      </div>
    </div>
  );
};
