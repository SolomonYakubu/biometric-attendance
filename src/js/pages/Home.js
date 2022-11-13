import React from "react";
import { useNavigate } from "react-router-dom";
// import { fingerprint } from "../../img/test.bmp";
import { GoSignIn } from "react-icons/go";
import { TiTick, TiChartBar } from "react-icons/ti";
import { TbFileReport } from "react-icons/tb";
export default function Home() {
  const navigate = useNavigate();
  const links = [
    { name: "Register", link: "/register", icon: <GoSignIn size={40} /> },
    { name: "Take Attendance", link: "/match", icon: <TiTick size={40} /> },
    { name: "Stats", link: "/stats", icon: <TiChartBar size={40} /> },
    { name: "Report", link: "/report", icon: <TbFileReport size={40} /> },
  ];
  return (
    <div className="container flex flex-col h-[95vh]">
      <h1 className="text-white text-5xl my-2">Home</h1>
      <div className="sub-container flex flex-col items-center justify-center h-3/4 w-3/5">
        <img
          src="./src/img/finger.svg"
          onMouseOver={(e) => {
            e.target.src = "./src/img/finger.gif";
          }}
          onMouseLeave={(e) => {
            e.target.src = "./src/img/finger.svg";
          }}
          className="h-40 w-40"
          // height="200"
          // width="200"
        />
        <div className="h-full w-full flex flex-wrap items-start justify-center gap-x-7">
          {links.map((item, index) => (
            <div key={index} className=" w-2/5 h-2/5">
              <button
                className=" btn-primary bg-gradient-to-r from-primary to-blue-500 flex flex-col justify-center items-center rounded-lg w-full h-full"
                onClick={() => {
                  navigate(item.link);
                }}
              >
                {item.icon}
                {item.name}
              </button>
            </div>
          ))}
        </div>
        {/* <button
          className="btn btn-primary w-4/5 m-2"
          onClick={() => {
            navigate("./match");
          }}
        >
          Take Attendance
        </button>
        <button
          className="btn btn-primary w-4/5 m-2"
          onClick={() => {
            navigate("./register");
          }}
        >
          Register
        </button> */}
        {/* <button
          className="btn btn-primary w-50 m-15"
          onClick={() => {
            navigate("./upload");
          }}
        >
          Upload
        </button> */}
      </div>
    </div>
  );
}
