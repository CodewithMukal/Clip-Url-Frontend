import React, { useState } from "react";
import copy from "../assets/copy.svg";
import { ToastContainer, toast } from "react-toastify";

export const Urlinput = () => {
  const [result, setResult] = useState(false);
  const [advance, setAdvance] = useState(false);
  const [shortLink, setLink] = useState("");
  const [url, setUrl] = useState("");
  const [alias,setAlias] = useState("");
  const handleShorten = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url:url, alias:alias }),
        credentials: "include"
      });
      if (response.status === 201) {
        const data = await response.json();
        setLink("localhost:5173/r/" + data.shortID);
        setResult(true);
      }
      else
      {
        const data = await response.json();
        toast.error(data.error || "Failed to shorten URL");
        setResult(false);
        setLink("");
        setAlias("");
        setUrl("");
        return;
      }
    } catch (err) {
      console.error("Error shortening URL:", err);
      setResult(false);
    }
  };

  return (
    <div className="w-[95%] flex flex-col gap-6 py-6 justify-center items-start px-[20px] bg-white shadow">
      <ToastContainer/>
      <input
        placeholder="Enter your URL here"
        className="w-full focus:outline-0 focus:ring-1 ring-[#46A6FF] focus:placeholder:text-[#46A6FF] transition-colors rounded bg-black/5 font-[Inter] text-[13px] px-[10px] py-[5px]"
        type="url"
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="flex gap-3 font-[Inter] text-[14px] justify-center items-center">
        <div
          onClick={() => handleShorten()}
          className="bg-[#3646F4] hover:bg-[#46A6FF] transition-colors text-white px-2 py-1 rounded font-medium"
        >
          <button>Shorten</button>
        </div>
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
          <button onClick={()=> {navigator.clipboard.writeText(shortLink); toast.success("Copied")}} className="absolute top-[50%] -translate-y-[50%] right-0 hover:bg-black/2 bg-white h-full px-2">
            <img src={copy} alt="" />
          </button>
          
        </div>
      )}
    </div>
  );
};
