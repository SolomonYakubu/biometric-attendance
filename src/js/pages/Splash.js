import React from "react";
import { useNavigate } from "react-router-dom";
export default function Splash({ setSplash }) {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="sub-container p-6 h-4/5 w-3/5 text-white flex flex-col justify-center gap-2 items-center">
        <h2 className="text-3xl text-center font-bold m-3">
          Fingerprint Biometrics Attendance System Designed for FUTMINNA
        </h2>
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
        <p>
          Before Clicking "Continue" Make Sure your PC Date/Time is Accurate
        </p>

        <button
          className="btn btn-primary bg-gradient-to-b from-primary to-blue-500"
          onClick={() => setSplash(false)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
