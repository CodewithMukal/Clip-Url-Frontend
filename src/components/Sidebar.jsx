import React, { useState } from "react";
import ham from "../assets/ham.svg";
import stats from "../assets/stats.svg";
import links from "../assets/links.svg";
import setting from "../assets/setting.svg";
import {useNavigate} from 'react-router'

export const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();
  const handleSettingsClick = () => {
    navigate('/profile')
  }
  const handleDashboard = () => {
    navigate('/dashboard')
  }
  const handleManage = () => {
    navigate('/manage')
  }
  return (
    <div
      className={`bg-[#46A6FF] fixed z-10 top-0 left-0 justify-start gap-8 items-center px-[20px] py-[10px] flex flex-col h-[100vh] ${
        expand ? "w-[200px] animate-grow" : "w-[60px] animate-shrink"
      }`}
    >
      <div className="hover:bg-black/10 flex p-[5px] mt-[20px]  justify-center items-center" onClick={() => setExpand(!expand)}>
        <button className="flex justify-center items-center">
          <img className="w-[15px] h-[15px]" src={ham} alt="" />
        </button>
      </div>
      <div className="flex flex-col text-white font-bold justify-center items-center mt-[30px] gap-[40px]">
        <div>
          <button onClick={()=> handleDashboard()} className="w-[20px] text-white flex gap-2 justify-center items-center hover:opacity-60 h-auto">
            <img src={stats} alt="" />
            <p className={`${expand ? "block" : "hidden"}`}>Statistics</p>
          </button>
        </div>
        <div>
          <button onClick={()=> handleManage()} className="w-[20px] flex gap-2 justify-center items-center hover:opacity-60 h-auto">
            <img src={links} alt="" />
            <p className={`${expand ? "block" : "hidden"}`}>Manage</p>
          </button>
        </div>
        <div>
          <button onClick={()=> handleSettingsClick()} className="w-[20px] flex gap-2 justify-center items-center hover:opacity-60 h-auto">
            <img src={setting} alt="" />
            <p className={`${expand ? "block" : "hidden"}`}>Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
};
