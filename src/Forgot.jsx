import React, { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "./components/Spinner";
import Success from "./assets/Success.gif";

const BASE_URL = import.meta.env.VITE_ENV=="production"?"https://clip-url-backend.onrender.com":"http://localhost:8000";

export const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(null); // null until check finishes
  const [emailSelect, setEmailSelect] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch(`${BASE_URL}/api/user/info`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setLoggedIn(data.loggedIn);
      setEmail(data.user.email);
    };

    checkLogin();
  }, []);
  const handleLogoClick = () => {
    navigate("/");
  };
  const resetPassword = async () => {
    setSending(true);
    if (!email) {
      toast.error("Please enter your email address");
    }
    const response = await fetch(
      `${BASE_URL}/api/user/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      setSent(true);
      setSending(false);
      toast.success("Email sent! Please check your inbox.");
    } else {
      setSent(false);
      setSending(false);
      console.error(data.message);
      toast.error("Failed to send email. " + data.message);
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
        {!loggedIn ? (
          <div className="flex  gap-4 justify-center items-center">
            <div>
              <button
                onClick={() => navigate("/login")}
                className="font-[Gabarito] transition-colors hover:bg-[#46A6FF] font-bold bg-[#3646F4] text-[18px] rounded-full px-[20px] py-[8px] text-white"
              >
                Login
              </button>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => navigate("/signup")}
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
                onClick={() => navigate("/dashboard")}
                className="font-[Gabarito] transition-colors hover:bg-[#46A6FF] font-bold bg-[#3646F4] text-[18px] rounded-full px-[20px] py-[8px] text-white"
              >
                Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
      {!sending && !sent ? (
        <div className="bg-white mt-[70px] shadow rounded-[20px] flex justify-center px-[50px] gap-6 py-[30px] font-[Inter] w-fit mx-auto flex-col">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-center text-xl">Forgot Password</h1>
            <p className="text-center text-xs text-black/70">
              A password reset link will be sent to your email account <br /> if
              it is registered with us.
            </p>
          </div>
          <div className="flex flex-col">
            <label
              className={`${
                !emailSelect ? "text-[#767676]" : "text-blue-500"
              } font-medium text-[14px]`}
              htmlFor=""
            >
              Email
            </label>
            <input
              onFocus={() => setEmailSelect(true)}
              onBlur={() => setEmailSelect(false)}
              className="bg-white text-black focus:outline-blue-500 border-[1px] px-[20px] py-[8px] border-black/10"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <button
              onClick={() => resetPassword()}
              className="text-white w-full transition-colors py-2 hover:bg-[#46A6FF] font-bold bg-[#3646F4]"
            >
              Send me an Email
            </button>
          </div>
        </div>
      ) : (
        <div>
          {sending && !sent ? (
            <div className="bg-white mt-[70px] shadow rounded-[20px] flex justify-center px-[50px] gap-6 py-[30px] font-[Inter] w-fit mx-auto flex-col">
              <div className="font-bold text-center text-xl">
                <h1>Sending Email...</h1>
                <Spinner />
              </div>
            </div>
          ) : (
            <div className="bg-white mt-[70px] shadow rounded-[20px] flex justify-center px-[50px] gap-6 py-[30px] font-[Inter] w-fit mx-auto flex-col">
              <div className="font-bold text-center text-xl">
                <h1>Email sent!</h1>
                <img className="w-[80px] h-auto mx-auto" src={Success} alt="" />
                <p className="text-[16px] font-normal">
                  Password reset link has been shared to your email address. <br />
                  Do not share the link with anyone else!. <br />
                  The link will expire in 30 minutes. <br />
                  Check spam if not received.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
