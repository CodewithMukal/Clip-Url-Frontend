import React, { useEffect } from "react";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";

export const Redirect = () => {
    const { shortid } = useParams();
    const redirectToUrl = async () => {
        try {
            const response = await fetch(`${BASE_URL}/${shortid}`, {
                method: "GET",
            });
            const data = await response.json();
            if (data.status === "success") {
                window.location.href = data.orgUrl; // Redirect to the original URL
            } else {
                toast.error("Redirect failed:", data.message);
            }
        } catch (error) {
            toast.error("Error during redirect:", error);
        }
    };
    useEffect(()=>{
        redirectToUrl();
    },[])
    return (
    <div className="text-center w-fit mx-auto mt-8 font-[Inter] py-5 px-10 bg-white rounded-2xl shadow ">
      Redirecting...
      <ToastContainer/>
    </div>
  );
};
