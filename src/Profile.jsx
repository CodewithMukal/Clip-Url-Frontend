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
  const [sending, setSend] = useState(false);
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
    } finally {
      setSend(false);
    }
  };
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/info`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setVerify(data.isVerified);
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
    <div className="pl-[60px] flex flex-col min-h-screen">
      <Sidebar />
      <Topbar />
      <ToastContainer />

      <div className="flex flex-col w-full max-w-[600px] gap-4 shadow bg-white px-4 py-6 md:px-[20px] md:py-[10px] mx-auto mt-[30px] rounded-md">
        {/* Username Field */}
        <div className="flex flex-col gap-1">
          <label
            className="text-[#767676] font-medium text-lg md:text-xl"
            htmlFor=""
          >
            Username
          </label>
          <input
            type="text"
            {...(editable ? {} : { readOnly: true })}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                user: {
                  ...userDetails.user,
                  username: e.target.value,
                },
              })
            }
            className={`focus:outline-0 focus:ring-1 ring-[#46A6FF] transition-colors bg-black/5 rounded-full font-[Inter] text-lg md:text-2xl px-4 py-2 w-full ${
              editable ? "text-black" : "text-black/50"
            }`}
            value={userDetails.user.username}
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label
            className="text-[#767676] font-medium text-lg md:text-xl"
            htmlFor=""
          >
            Email
          </label>
          <input
            type="email"
            readOnly
            className="focus:outline-0 focus:ring-1 ring-[#46A6FF] transition-colors bg-black/5 rounded-full font-[Inter] text-black/50 text-lg md:text-2xl px-4 py-2 w-full"
            value={userDetails.user.email}
          />
        </div>

        {/* Verification Section */}
        <div>
          {verified ? (
            <p className="font-medium font-[Inter] text-green-600">Verified!</p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="font-medium font-[Inter] text-red-600">
                You are not verified!
              </p>
              <button
                onClick={sendVerifyMail}
                disabled={sending}
                className={`${
                  sending ? "bg-gray-300" : "bg-[#3646F4] hover:bg-[#46A6FF]"
                } transition-colors text-white rounded font-bold px-4 py-2 w-full md:w-fit`}
              >
                {sending ? <Spinner mode={2} /> : "Verify Now"}
              </button>
            </div>
          )}
        </div>

        {/* Save & Change Password Buttons */}
        <div className="flex flex-col md:flex-row gap-3 justify-start items-stretch md:items-center my-4 w-full">
          <div className="flex-1">
            {editable ? (
              <button
                onClick={handleSave}
                disabled={loading}
                className={`${
                  loading ? "bg-gray-300" : "bg-[#3646F4] hover:bg-[#46A6FF]"
                } transition-colors text-white px-4 py-2 rounded font-medium w-full`}
              >
                {loading ? <Spinner mode={2} /> : "Save Details"}
              </button>
            ) : (
              <button
                onClick={() => setEdit(true)}
                className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-4 py-2 rounded font-medium w-full"
              >
                Edit Details
              </button>
            )}
          </div>

          <button
            onClick={() => navigate("/change-password")}
            className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-4 py-2 rounded font-medium w-full md:w-fit"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center mt-4 mb-8">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className={`${
            loggingOut ? "bg-gray-300" : "bg-red-500 hover:bg-red-800"
          } transition-colors font-bold font-[Inter] px-6 py-2 text-white rounded w-full max-w-[200px]`}
        >
          {loggingOut ? <Spinner mode={2} /> : "Logout"}
        </button>
      </div>
    </div>
  );
};
