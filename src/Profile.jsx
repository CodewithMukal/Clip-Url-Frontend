import React, { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const BASE_URL = "https://clip-url-backend.onrender.com";

export const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    user: {
      username: "Fetching...",
      email: "Fetching...",
      password: "Fetching...",
    },
  });
  const [editable, setEdit] = useState(false);
  const navigate = useNavigate()
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/info`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const handleSave = async ()=>{
    try {
      const response = await fetch(`${BASE_URL}/api/user/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userDetails.user.username,
        }),
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        toast.success("Changes saved")
        setEdit(false);
      } else {
        alert("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  }
  useEffect(() => {
    const loadUserDetails = async () => {
      const data = await fetchUserDetails();
      setUserDetails(data);
    };

    loadUserDetails();
  }, []);
  const handleLogout = async () => {
    const response = await fetch(`${BASE_URL}/api/user/logout`,{
        method: "POST",
        credentials: "include"
    });
    const data = await response.json();
    if(data.status === "success"){
        toast.success("Logged Out!")
        navigate("/");
    }
  }
  return (
    <div className="pl-[60px] flex flex-col justify-center">
      <Sidebar />
      <Topbar />
      <ToastContainer/>
      <div className="flex flex-col w-fit gap-4 shadow justify-center bg-white px-[20px] py-[10px] mx-auto mt-[50px] items-start ">
        <div className="flex flex-col gap-2">
          <label className="text-[#767676] font-medium text-[20px]" htmlFor="">
            Username
          </label>
          <input
            type="text"
            {...editable ? {} : { readOnly: true }} 
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                user: {
                  ...userDetails.user,
                  username: e.target.value,
                },
              });
            }}
            className={`focus:outline-0 focus:ring-1 ring-[#46A6FF] focus:placeholder:text-[#46A6FF] transition-colors bg-black/5 rounded-full text-black/50 font-[Inter] text-[26px] px-[20px] py-[5px]  ${editable ? "text-black" : "text-black/50"}`}
            value={userDetails.user.username}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#767676] font-medium text-[20px]" htmlFor="">
            Email
          </label>
          <input
            type="email"
            readOnly
            className={`focus:outline-0 focus:ring-1 ring-[#46A6FF] focus:placeholder:text-[#46A6FF] transition-colors bg-black/5 rounded-full font-[Inter] text-black/50 text-[26px] px-[20px] py-[5px]`}
            value={userDetails.user.email}
          />
        </div>
        <div className="flex gap-2 justify-center items-center my-[20px]">
          <div>
            {editable ? (
              <button
                onClick={() => handleSave()}
                className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-4 py-2 rounded font-medium"
              >
                Save Details
              </button>
            ) : (
              <button
                onClick={() => setEdit(!editable)}
                className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-4 py-2 rounded font-medium"
              >
                Edit Details
              </button>
            )}
          </div>
          <button onClick={()=> navigate('/change-password')} className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-4 py-2 rounded font-medium">
            Change Password
          </button>
        </div>
      </div>
      <button onClick={()=>handleLogout()} className="bg-red-500 hover:bg-red-800 transition-colors w-fit mx-auto my-6 font-bold font-[Inter] px-46 py-2 flex justify-center items-center text-white">
        Logout
      </button>
    </div>
  );
};
