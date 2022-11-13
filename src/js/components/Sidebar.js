import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
export default function Sidebar({ canRoute }) {
  const navigate = useNavigate();
  const alert = useAlert();
  const location = useLocation();
  //   const [indexActive, setIndexActive] = useState(0);

  const [pages, setPages] = useState([
    {
      name: "Home",
      url: "/",
      active: true,
      iconActive: "./src/img/home.gif",
      icon: "./src/img/home.svg",
    },
    {
      name: "Register",
      url: "/register",
      active: false,
      iconActive: "./src/img/register.gif",
      icon: "./src/img/register.svg",
    },
    {
      name: "Take Attendance",
      url: "/match",
      active: false,
      iconActive: "./src/img/attendance.gif",
      icon: "./src/img/attendance.svg",
    },
    {
      name: "Stats",
      url: "/stats",
      active: false,
      iconActive: "./src/img/stats.gif",
      icon: "./src/img/stats.svg",
    },
    {
      name: "Report",
      url: "/report",
      active: false,
      iconActive: "./src/img/report.gif",
      icon: "./src/img/report.svg",
    },
  ]);

  const getRoute = useCallback(
    (e) => {
      //   setRouteIndex(e?.target.value);

      let index;
      let indexActive = 0;
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].url === location.pathname) {
          index = i;
        }
        if (pages[i].active === true) {
          indexActive = i;
        }
      }

      if (location.pathname == "/register" && !canRoute) {
        return alert.show("You must complete registration first", {
          type: "error",
        });
      }
      let newIndex = e?.target?.getAttribute("data-index") || index;

      let newPages = pages;

      newPages[indexActive].active = false;
      newPages[newIndex].active = true;

      setPages(() => newPages);
      e = index;
      navigate(pages[newIndex].url);
    },
    [pages, location, canRoute]
  );
  useEffect(() => {
    getRoute();
  }, [navigate]);
  return (
    <div className=" w-1/5 top-[15%] left-0 fixed h-screen ">
      <input
        type={"button"}
        className="btn btn-secondary"
        style={{ alignSelf: "flex-start", fontSize: "16px" }}
        onClick={() => {
          navigate(-2);
        }}
        value="< Back"
      />

      {pages?.map((item, index) => (
        <button
          // value={index}
          key={index}
          data-index={index}
          className={`flex items-center justify-between px-5 text-sm transition-all duration-500  ${
            (item.active && " m-2 sidebar-scale ") || "sidebar m-2"
          }`}
          onClick={getRoute}
        >
          <img
            src={(item.active && item.iconActive) || item.icon}
            height="40"
            width="40"
          />
          {item.name}
        </button>
      ))}
    </div>
  );
}
