import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Linkcard } from "./components/Linkcard";

const BASE_URL = import.meta.env.VITE_ENV=="production"?"https://clip-url-backend.onrender.com":"http://localhost:8000";

export const ManageLinks = () => {
  const navigate = useNavigate();
  const [loggedIn, setStatus] = useState(false);
  const [links, setLinks] = useState([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const checkLoginAndFetchInfo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user/info`, {
          credentials: "include",
        });
        const data = await response.json();
        setStatus(data.loggedIn);

        if (!data.loggedIn) {
          navigate("/login");
          return; // Don't proceed further
        }

        // ✅ User is logged in, now fetch all info
        const infoResponse = await fetch(
          `${BASE_URL}/api/url/allInfo`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        const infoData = await infoResponse.json();
        const links = infoData.user.urls.map((url)=>(
            <Linkcard
                key={url.shortID}
                clicks={url.visitHistory.length}
                shortID={url.shortID}
                orgLink={url.orgUrl}
                createdAt={url.createdAt}
            />
        ));
        setLinks(links.reverse());
        setFetching(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    checkLoginAndFetchInfo();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="pl-[60px]">
        <Topbar />
        <div>
          {fetching ? (
            <div className="flex items-center mt-10 justify-center h-full">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-[#46A6FF] rounded-full animate-spin"></div>
          </div>
          ): (
            <div>
              {links.length > 0 ? links :
                (
                  <p className="text-center text-gray-500 mt-10">
                    No links found. Please create a new link to manage.
                  </p>
                )}
            </div>
            
          )}
        </div>
      </div>
    </div>
  );
};
