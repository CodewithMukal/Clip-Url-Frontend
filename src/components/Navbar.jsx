import React from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_ENV=="production"?"https://clip-url-backend.onrender.com":"http://localhost:8000";

export const Navbar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(null); // null until check finishes

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch(`${BASE_URL}/api/user/info`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setLoggedIn(data.loggedIn);
    };

    checkLogin();
  }, []);
  const handleLoginNav = () => {
    navigate("/login");
  };
  const handleSignupClick = () => {
    navigate("/signup");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div className="flex justify-between px-[24px] items-center py-[12px] bg-white">
      <div className="flex justify-center gap-[64px] items-center">
        <a href="#">
          <img className="w-[100px] h-auto" src={logo} alt="" />
        </a>
        <a
          className="text-[18px] hover:opacity-75 hover:-translate-y-[1px] font-[Inter]"
          href="#"
        >
          Home
        </a>
        <a
          className="text-[18px] hover:opacity-75 hover:-translate-y-[1px] font-[Inter]"
          href="#"
        >
          About
        </a>
        <a
          className="text-[18px] hover:opacity-75 hover:-translate-y-[1px] font-[Inter]"
          href="#"
        >
          How to Use
        </a>
        <a
          className="text-[18px] hover:opacity-75 hover:-translate-y-[1px] font-[Inter]"
          href="#"
        >
          Features
        </a>
      </div>
      <div className="flex justify-center items-center">
        {!loggedIn ? (
          <div className="flex  gap-4 justify-center items-center">
            <div>
              <button
                onClick={() => handleLoginNav()}
                className="font-[Gabarito] transition-colors hover:bg-[#46A6FF] font-bold bg-[#3646F4] text-[18px] rounded-full px-[20px] py-[8px] text-white"
              >
                Login
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
        ) : (
          <div>
            <div>
              <button
                onClick={() => handleDashboard()}
                className="font-[Gabarito] transition-colors hover:bg-[#46A6FF] font-bold bg-[#3646F4] text-[18px] rounded-full px-[20px] py-[8px] text-white"
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
