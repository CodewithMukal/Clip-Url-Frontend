import React, { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "./components/Spinner";

const BASE_URL =
  import.meta.env.VITE_ENV == "production"
    ? "https://clip-url-backend.onrender.com"
    : "http://localhost:8000";

export const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    user: {
      username: "Fetching...",
      email: "Fetching...",
    },
  });
  const [verified, setVerify] = useState(false);
  const [sending,setSend] = useState(false);
  const [editable, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const sendVerifyMail = async () => {
    setSend(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/verify`, {
        method: "GET",
        credentials: "include",
      });

      const text = await response.text(); // Only read once!
      let data;

      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        console.error("❌ Failed to parse JSON:", text);
        toast.error("Invalid response from server");
        return;
      }

      console.log("✅ Verify mail response:", data);

      if (data.status === "success") {
        toast.success(`${data.message} at ${data.email}`);
      } else {
        toast.error(data.message || "Failed to send verification mail");
      }
    } catch (err) {
      console.error("🚨 Fetch failed:", err);
      toast.error("Something went wrong while sending the verification mail.");
    }
    finally{
      setSend(false)
    }
  };
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/info`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setVerify(data.isVerified)
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userDetails.user.username,
        }),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success("Changes saved");
        setEdit(false);
        setLoading(false);
      } else {
        alert(
          "Failed to update user details as another user exists with same username."
        );
        setEdit(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      setEdit(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    const loadUserDetails = async () => {
      const data = await fetchUserDetails();
      setUserDetails(data);
    };

    loadUserDetails();
  }, []);
  const handleLogout = async () => {
    setLoggingOut(true);
    const response = await fetch(`${BASE_URL}/api/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (data.status === "success") {
      toast.success("Logged Out!");
      navigate("/");
    }
  };
  return (
    <div className="pl-[60px] flex flex-col justify-center">
      <Sidebar />
      <Topbar />
      <ToastContainer />
      <div className="flex flex-col w-fit gap-4 shadow justify-center bg-white px-[20px] py-[10px] mx-auto mt-[50px] items-start ">
        <div className="flex flex-col gap-2">
          <label className="text-[#767676] font-medium text-[20px]" htmlFor="">
            Username
          </label>
          <input
            type="text"
            {...(editable ? {} : { readOnly: true })}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                user: {
                  ...userDetails.user,
                  username: e.target.value,
                },
              });
            }}
            className={`focus:outline-0 focus:ring-1 ring-[#46A6FF] focus:placeholder:text-[#46A6FF] transition-colors bg-black/5 rounded-full font-[Inter] text-[26px] px-[20px] py-[5px]  ${
              editable ? "text-black" : "text-black/50"
            }`}
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
        {verified ? (
          <div>
            <p className="font-medium font-[Inter] text-green-600">Verified!</p>
          </div>
        ) : (
          <div>
            <p className="font-medium font-[Inter] text-red-600">
              You are not verified!
            </p>
            {
              !sending?
              (
                <button onClick={sendVerifyMail} className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white rounded font-bold px-4 py-2">
              Verify Now
            </button>
              )
              :
              (
                <button onClick={sendVerifyMail} className="bg-gray-300 transition-colors text-white rounded font-bold px-4 py-2">
              <Spinner mode={2} />
            </button>
              )
            }
          </div>
        )}
        <div className="flex gap-2 justify-center items-center my-[20px]">
          <div>
            {editable ? (
              <div>
                {!loading ? (
                  <button
                    onClick={() => handleSave()}
                    className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-4 py-2 rounded font-medium"
                  >
                    Save Details
                  </button>
                ) : (
                  <button className="bg-gray-300 transition-colors text-white px-4 py-2 rounded font-medium">
                    <Spinner mode={2} />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setEdit(!editable)}
                className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-4 py-2 rounded font-medium"
              >
                Edit Details
              </button>
            )}
          </div>
          <button
            onClick={() => navigate("/change-password")}
            className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-4 py-2 rounded font-medium"
          >
            Change Password
          </button>
        </div>
      </div>
      <div>
        {!loggingOut ? (
          <button
            onClick={() => handleLogout()}
            className="bg-red-500 hover:bg-red-800 transition-colors w-fit mx-auto my-6 font-bold font-[Inter] px-46 py-2 flex justify-center items-center text-white"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => handleLogout()}
            className="bg-gray-300 transition-colors w-fit mx-auto my-6 font-bold font-[Inter] px-46 py-2 flex justify-center items-center text-white"
          >
            <Spinner mode={2} />
          </button>
        )}
      </div>
    </div>
  );
};
