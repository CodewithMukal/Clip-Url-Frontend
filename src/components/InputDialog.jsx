import React, { useState } from "react";
import { Spinner } from "./Spinner";

const BASE_URL =
  import.meta.env.VITE_ENV == "production"
    ? "https://clip-url-backend.onrender.com"
    : "http://localhost:8000";

export const InputDialog = (props) => {
  const [loading, setLoading] = useState(false);
  const [newID, setNewID] = useState("");
  const handleEdit = async () => {
    setLoading(true);
    if (newID.length < 3 || newID.length > 10) {
      alert("Invalid NewID");
      setLoading(false);
      return;
    }
    const response = await fetch(`${BASE_URL}/api/url/${props.shortID}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // <-- you forgot this
      },
      body: JSON.stringify({ newID: newID }),
    });
    const data = await response.json();
    if (data.status === "success") {
      alert("Edit complete!");
      setLoading(false);
      props.setEdit(false);
    } else {
      alert(`Error: ${data.message}`);
      setLoading(false);
    }
  };
  return (
    <div className="bg-black/30 backdrop-blur-xl z-10 font-[Inter] w-[100vw] h-[100vh] fixed top-0 left-0">
      <div className="w-fit z-20 animate-scale transition-all flex flex-col gap-3 py-4 px-8 rounded-2xl mx-auto relative top-[50%] -translate-y-[50%] bg-white items-center">
        <h1 className="text-2xl font-bold">Edit Link</h1>
        <div className="flex flex-col">
          <label htmlFor="">Original</label>
          <input
            readOnly
            value={props.shortID}
            type="text"
            className="bg-black/8 focus:outline-amber-300 py-1 px-2 border-[1px] border-black/15 text-black/60 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">New</label>
          <input
            type="text"
            value={newID}
            onChange={(e) => setNewID(e.target.value)}
            className="bg-black/8 px-2 border-[1px] py-1 border-black/15"
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          {!loading ? (
            <button
              onClick={handleEdit}
              className="bg-yellow-500 transition-colors hover:bg-yellow-600 px-4 py-2 font-bold text-white"
            >
              Change
            </button>
          ) : (
            <button className="bg-gray-500 min-w-4 flex justify-center items-center transition-colors px-4 py-2 font-bold text-white">
              <Spinner mode={2} />
            </button>
          )}
          <button
            onClick={() => props.setEdit(false)}
            className="bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
