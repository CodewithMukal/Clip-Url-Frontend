import React from "react";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center mt-4">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-[#46A6FF] rounded-full animate-spin"></div>
    </div>
  );
};
