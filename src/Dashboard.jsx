import React, { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Urlinput } from "./components/Urlinput";
import pie from "./assets/pie.svg";
import { Card } from "./components/Card";
import linkvector from "./assets/linkvector.svg";
import { useNavigate } from "react-router";
import eye from "./assets/eye.svg";
import crown from "./assets/crown.svg";
import { Topbar } from "./components/Topbar";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "./components/Spinner";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [loggedIn, setStatus] = useState(false);
  const [totalClicks, setClicks] = useState(0);
  const [monthClicks, setMonthClicks] = useState(0);
  const [mostViewed, setMostViewed] = useState(0);
  const [monthMostViewed, setMonthMostViewed] = useState(0);
  const [links, setLinks] = useState(0);
  const [monthLinks, setMonthLinks] = useState(0);
  const handleLogoClick = async () => {
    navigate("/");
  };
  useEffect(() => {
    const checkLoginAndFetchInfo = async () => {
      try {
        const response = await fetch("/api/user/info", {
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
          "/api/url/allInfo",
          {
            method: "POST",
            credentials: "include",
          }
        );
        const infoData = await infoResponse.json();
        if (infoData) {
          const now = new Date();
          const todayStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          const todayEnd = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1
          );

          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

          const urlsToday = infoData.user.urls.filter((url) => {
            const createdAt = new Date(url.createdAt);
            return createdAt >= todayStart && createdAt < todayEnd;
          });

          const monthUrls = infoData.user.urls.filter((url) => {
            const createdAt = new Date(url.createdAt);
            return createdAt >= monthStart && createdAt < monthEnd;
          });
          setLinks(urlsToday.length);
          setMonthLinks(monthUrls.length);
          const urls = infoData.user.urls;
          let clicksToday = 0;
          let mostViewed = 0;
          let monthMostViewed = 0;
          let clicksThisMonth = 0;
          urls.forEach((url) => {
            if (Array.isArray(url.visitHistory)) {
              url.visitHistory.forEach((entry) => {
                const clicked = new Date(entry.clickedOn);
                if (clicked >= todayStart && clicked < todayEnd) {
                  clicksToday++;
                }
                if (clicked >= monthStart && clicked < monthEnd) {
                  clicksThisMonth++;
                }
              });
            }
          });
          // Find most viewed URL today
          urls.forEach((url) => {
            if (Array.isArray(url.visitHistory)) {
              const todayViews = url.visitHistory.filter((entry) => {
                const clicked = new Date(entry.clickedOn);
                return clicked >= todayStart && clicked < todayEnd;
              }).length;
              if (todayViews > mostViewed) {
                mostViewed = todayViews;
              }
            }
          });
          // Find most viewed URL this month
          urls.forEach((url) => {
            if (Array.isArray(url.visitHistory)) {
              const monthViews = url.visitHistory.filter((entry) => {
                const clicked = new Date(entry.clickedOn);
                return clicked >= monthStart && clicked < monthEnd;
              }).length;
              if (monthViews > monthMostViewed) {
                monthMostViewed = monthViews;
              }
            }
          });
          setClicks(clicksToday);
          setMonthClicks(clicksThisMonth);
          setMostViewed(mostViewed);
          setMonthMostViewed(monthMostViewed);
        }
        // optionally: set state here to render user info
      } catch (err) {
        console.error("Error during auth or data fetch:", err);
      }
    };

    checkLoginAndFetchInfo();
  }, []);

  return (
    <div>
      {loggedIn ? (
        <div className="pl-[60px]">
          <Sidebar />
          <Topbar />
          <ToastContainer />
          <div className="flex flex-col gap-6 mt-[20px] justify-center items-center">
            <Urlinput />
            <select
              className="bg-white px-2 focus:outline-0 focus:ring-1 ring-blue-400 py-2 shadow rounded text-[#46A6FF] text-[14px]"
              name="month"
              id=""
            >
              <option value="">July 2025</option>
              <option value="">June 2025</option>
              <option value="">May 2025</option>
              <option value="">April 2025</option>
              <option value="">March 2025</option>
            </select>
            <div className="w-[95%] py-2 bg-[#46A6FF] rounded">
              <p className="flex gap-2 font-bold text-white justify-center items-center">
                <img src={pie} alt="" /> Today's Report
              </p>
            </div>
            <div className="flex w-[95%] justify-around items-center">
              <Card text="Total Views" num={totalClicks} image={eye} />
              <Card text="Links Created" num={links} image={linkvector} />
              <Card text="Most Viewed" num={mostViewed} image={crown} />
            </div>
            <div className="w-[95%] py-2 mt-[50px] bg-[#46A6FF] rounded">
              <p className="flex gap-2 font-bold text-white justify-center items-center">
                <img src={pie} alt="" /> This Month's Report
              </p>
            </div>
            <div className="flex w-[95%] justify-around items-center">
              <Card text="Total Views" num={monthClicks} image={eye} />
              <Card text="Links Created" num={monthLinks} image={linkvector} />
              <Card text="Most Viewed" num={monthMostViewed} image={crown} />
            </div>
          </div>
        </div>
      ) : (
        <Spinner/>
      )}
    </div>
  );
};
