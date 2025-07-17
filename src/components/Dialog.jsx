import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "./Spinner";

const BASE_URL =
  import.meta.env.VITE_ENV == "production"
    ? "https://clip-url-backend.onrender.com"
    : "http://localhost:8000";

export const Dialog = (props) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    console.log("Delete clicked for", props.shortID);
    const response = await fetch(`${BASE_URL}/api/url/${props.shortID}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    if (data.status === "success") {
      alert("Deleted!");
      setLoading(false);
      props.setSure(false);
    } else {
      toast.error(`Error: ${data.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-xl z-40 font-[Inter] w-[100vw] h-[100vh] fixed top-0 left-0">
      <ToastContainer />
      <div className="w-fit z-20 flex animate-scale transition-all flex-col py-4 px-8 rounded-2xl mx-auto relative top-[50%] -translate-y-[50%] bg-white items-center">
        <h1 className="text-2xl font-bold">Are you sure you want to delete?</h1>
        <p>{props.shortID}</p>
        <div className="flex gap-4 my-4">
          {!loading ? (
            <button
              onClick={() => handleDelete()}
              className="bg-red-600 px-4 transition-all py-2 hover:bg-red-800 text-white font-bold"
            >
              Delete
            </button>
          ) : (
            <button
              className="bg-gray-400 px-4 transition-all py-2 text-white font-bold"
            >
              <Spinner mode={2}/>
            </button>
          )}
          <button
            onClick={() => props.setSure(false)}
            className="px-4 py-2 hover:bg-amber-700 transition-colors bg-blue-500 text-white font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
