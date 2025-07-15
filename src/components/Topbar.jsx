import React from "react";
import logo from '../assets/logo.svg';
import user from '../assets/user.svg';
import { useNavigate } from "react-router";

export const Topbar = () => {
const navigate = useNavigate();
const handleLogoClick = ()=>{
    navigate("/");
}
const handleUserClick = () => {
    navigate("/profile");
}
  return (
    <div className="py-[6px] px-[10px] bg-white flex justify-between items-center">
      <button
        onClick={() => handleLogoClick()}
        className="cursor-pointer w-[100px]"
      >
        <img src={logo} alt="" />
      </button>
      <button>
        <img
          src={user}
          onClick={() => handleUserClick()}
          className="bg-black/10 p-[5px] cursor-pointer rounded-full w-[30px]"
          alt=""
        />
      </button>
    </div>
  );
};
