import React, { useState } from "react";
import search from "../assets/search.svg";
import arrow from "../assets/arrow.svg";

export const Accordion = (props) => {
  const [hideAns, setHide] = useState(true);
  return (
    <div
      onClick={() => setHide(!hideAns)}
      className="md:w-[700px] w-[90%] cursor-pointer relative flex flex-col bg-white border-[1px] border-black/10 px-10 transition-transform py-4 justify-center "
    >
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-8 font-[Inter] font-medium">
          <img className="w-[30px] h-auto" src={search} alt="" />
          <h1>{props.que}</h1>
        </div>
        <button className="cursor-pointer" onClick={() => setHide(!hideAns)}>
          <img
            className={`w-4 h-4 select-none transform transition-transform duration-300 ${
              !hideAns ? "rotate-180" : "rotate-0"
            }`}
            src={arrow}
            alt=""
          />
        </button>
      </div>
      {!hideAns && (
        <p className="px-5 transition-transform border-t-[1px] border-black/20 mt-5 animate-slideDown font-[Inter] py-2">
          {props.ans}
        </p>
      )}
    </div>
  );
};
