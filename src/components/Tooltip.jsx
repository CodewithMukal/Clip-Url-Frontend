import React from "react";

export const Tooltip = () => {
  return (
    <div>
      <div className="absolute flex flex-col justify-center border-black/10 border-[1px] items-center bg-white px-5 py-3 rounded-b-xl rounded-tr-xl rounded-tl-0  my-13 md:my-0 lg:-right-66">
        <h1 className="font-bold text-black/60">Password Requirements:</h1>
        <ul className="list-disc text-[14px] ml-5">
          <li>At least 8 characters long</li>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one special character</li>
        </ul>
      </div>
    </div>
  );
};
