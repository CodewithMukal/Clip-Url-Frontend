import React, { useState, useEffect } from "react";
import copy from "../assets/copy.svg";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "./Spinner";
import { useParams } from "react-router";

const BASE_URL =
  import.meta.env.VITE_ENV == "production"
    ? "https://clip-url-backend.onrender.com"
    : "http://localhost:8000";

export const Urlinput = (props) => {
  const [result, setResult] = useState(false);
  const [advance, setAdvance] = useState(false);
  const [shortLink, setLink] = useState("");
  const [url, setUrl] = useState("");
  const [verified, setVerify] = useState(undefined);
  const [alias, setAlias] = useState("");
  const [shortening, setShorten] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch(`${BASE_URL}/api/user/info`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setVerify(data.isVerified);
    };
    if(props.url)
      {
        setUrl(props.url)
      }
    checkLogin();
  }, []);
  const sendVerifyMail = async () => {
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
  };

  const handleShorten = async () => {
    setShorten(true);
    try {
      const response = await fetch(`${BASE_URL}/api/url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url, alias: alias }),
        credentials: "include",
      });
      if (response.status === 201) {
        const data = await response.json();
        setLink("clipurlx.vercel.app/r/" + data.shortID);
        setResult(true);
        setShorten(false);
      } else {
        setShorten(false);
        const data = await response.json();
        toast.error(data.error || "Failed to shorten URL");
        setResult(false);
        setLink("");
        setAlias("");
        setUrl("");
        return;
      }
    } catch (err) {
      setShorten(false);
      console.error("Error shortening URL:", err);
      setResult(false);
    }
  };

  return (
    <div className="w-[95%] flex flex-col justify-center items-start md:px-[10px] px-[5px] lg:px-[20px] bg-white shadow">
      {verified ? (
        <div className="flex flex-col gap-6 py-6 justify-center items-start md:px-[10px] px-[5px] lg:px-[20px] w-full">
          <input
            placeholder="Enter your URL here"
            className="w-full focus:outline-0 focus:ring-1 ring-[#46A6FF] focus:placeholder:text-[#46A6FF] transition-colors rounded bg-black/5 font-[Inter] text-[13px] px-[10px] py-[5px]"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex gap-3 font-[Inter] text-[14px] justify-center items-center">
            {!shortening ? (
              <div
                onClick={() => handleShorten()}
                className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-2 py-1 rounded font-medium"
              >
                <button>Shorten</button>
              </div>
            ) : (
              <div className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-2 py-1 rounded font-medium">
                <Spinner mode={2} />
              </div>
            )}
            <div
              onClick={() => setAdvance(!advance)}
              className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-2 py-1 rounded font-medium"
            >
              <button>Advance</button>
            </div>
          </div>
          {advance && (
            <div className="w-full flex flex-col gap-2">
              <h1 className="font-bold text-black/50">Customise Link</h1>
              <div className="flex px-[10px] justify-center bg-black/5 items-center w-full">
                <p className="text-[13px]">clipurl.in/</p>
                <input
                  onChange={(e) => setAlias(e.target.value)}
                  value={alias}
                  placeholder="customised link"
                  className="w-full focus:outline-0  focus:placeholder:text-[#46A6FF] transition-colors rounded font-[Inter] text-[13px] pr-[10px] py-[5px]"
                  type="text"
                />
              </div>
            </div>
          )}
          {result && (
            <div className="w-full relative">
              <input
                placeholder="Result here"
                className="w-full focus:outline-0 focus:ring-1 ring-[#46A6FF] focus:placeholder:text-[#46A6FF] transition-colors rounded bg-black/5 font-[Inter] text-[13px] px-[10px] py-[5px]"
                type="text"
                value={shortLink}
                readOnly
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shortLink);
                  toast.success("Copied");
                }}
                className="absolute top-[50%] -translate-y-[50%] right-0 hover:bg-black/2 bg-white h-full px-2"
              >
                <img src={copy} alt="" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="px-5 py-6 flex flex-col gap-4 justify-center w-fit mx-auto">
          <p className="text-cl font-bold font-[Inter]">
            Verify your email to use shortner
          </p>
          {!loading ? (
            <button
              onClick={sendVerifyMail}
              className="bg-blue-500 font-bold text-white py-2 hover:bg-blue-700 transition-colors "
            >
              Send me verification mail!
            </button>
          ) : (
            <button
              className="bg-gray-300 font-bold text-white py-2 transition-colors "
            >
              <Spinner mode={2}/>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
