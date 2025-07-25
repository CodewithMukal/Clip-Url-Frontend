import React, { useState } from "react";
import copy from "../assets/copy.svg";
import { toast, ToastContainer } from "react-toastify";
import { Dialog } from "./Dialog";
import { InputDialog } from "./InputDialog";

const BASE_URL =
  import.meta.env.VITE_ENV == "production"
    ? "https://clip-url-backend.onrender.com"
    : "http://localhost:8000";

export const Linkcard = (props) => {
    const [sure,setSure] = useState(false);
    const [edit,setEdit] = useState(false);
  return (
    <div className="bg-white font-[Inter] shadow w-[95%] flex flex-col mx-auto mt-[20px] px-[30px] py-[20px]">
      <ToastContainer />
      {
        sure &&
        <Dialog shortID={props.shortID} setSure={setSure} />
      }
      {
        edit &&
        <InputDialog shortID={props.shortID} setEdit={setEdit} />
      }
      <div className="flex items-center justify-between">
        <a className="text-2xl font-medium text-[#46A6FF]">{props.shortID}</a>
        <div>
          <p className="font-bold text-xl">Clicks: {props.clicks}</p>
        </div>
      </div>
      <div className="flex justify-between gap-2 md:gap-0 flex-col md:flex-row">
        <div className="flex flex-row gap-2 text-[#7f7f7f] text-left">
          <p className="md:text-[10px] text-[7px] lg:text-[14px]">Created at: 12/07/25</p>
          <p className="md:text-[10px] text-[7px] lg:text-[14px]">09:34 PM</p>
        </div>
        <div className="flex justify-start items-center gap-4">
          <button onClick={()=> setEdit(true)} className="text-white font-bold bg-yellow-500 hover:bg-red-500 text-[12px] md:text-[14px] lg:text-[16px] transition-colors rounded-[6px] px-4 py-2">
            Edit
          </button>
          <button onClick={()=>setSure(true)} className="text-white font-bold hover:bg-blue-500 transition-colors bg-red-700 text-[12px] md:text-[14px] lg:text-[16px] rounded-[6px] px-4 py-2">
            Delete
          </button>
        </div>
      </div>
      <label className="text-[18px] my-2 font-bold" htmlFor="">
        Original Link
      </label>
      <div className="flex items-start relative justify-center flex-col gap-2 ">
        <input
          className="w-full bg-[#EEEEEE] md:text-[14px] text-[12px] lg:text-[18px] px-[10px] py-2"
          value={props.orgLink}
          readOnly
          type="text"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(props.orgLink);
            toast.success("Orginal Link Copied!");
          }}
          className="absolute top-[50%] bg-gray-400 hover:bg-gray-700 py-[12px] flex justify-center items-center px-[12px] -translate-y-[50%] right-0 max-h-[100%]"
        >
          <img src={copy} alt="" />
        </button>
      </div>
      <label className="text-[18px] my-2 font-bold" htmlFor="">
        Short Link
      </label>
      <div className="flex items-start relative justify-center flex-col gap-2 ">
        <input
          className="w-full bg-[#EEEEEE] md:text-[14px] text-[12px] lg:text-[18px] px-[10px] py-2"
          value={`clipurlx.vercel.app/r/${props.shortID}`}
          readOnly
          type="text"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              "clipurlx.vercel.app/r/" + props.shortID
            );
            toast.success("Short Link Copied!");
          }}
          className="absolute bg-gray-400 hover:bg-gray-700 z-20 top-[50%] max-h-[100%] py-[12px] flex justify-center items-center px-[12px] -translate-y-[50%] right-0"
        >
          <img src={copy} alt="" />
        </button>
      </div>
    </div>
  );
};
