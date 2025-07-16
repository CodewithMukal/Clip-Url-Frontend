import React from "react";

export const Spinner = (props) => {
  switch (props.mode) {
    case 1:
      return (
        <div className="flex items-center justify-center mt-4">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-[#46A6FF] rounded-full animate-spin"></div>
        </div>
      );
      break;
    case 2:
      return (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-blue-200 border-t-white rounded-full animate-spin"></div>
        </div>
      );
      break;
    default:
      return (
        <div className="flex items-center justify-center mt-4">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-[#46A6FF] rounded-full animate-spin"></div>
        </div>
      );
  }
};
