import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { AiOutlineLoading } from "react-icons/ai";

export default function Match() {
  const [res, setRes] = useState("");
  const [img, setImg] = useState("");
  const [signIn, setSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();

  const getMatch = (event) => {
    window.removeEventListener("message", getMatch);
    if (event.source === window) {
      console.log(event.data);
      setLoading(false);
      if (event.data.error) {
        switch (event.data.status) {
          case "try again":
            alert.show("try again", { type: "error" });

            break;
          case "duplicate":
            alert.show("Attendance already taken", { type: "error" });
            break;
          case "not found":
            alert.show("Data not found", { type: "error" });
            break;
          default:
            alert.show("Connect Scanner", { type: "error" });
        }
        setRes("");
        return;
      }
      alert.show("Attendance Marked", { type: "success" });

      const imgPath =
        event.data.user.dp && electron.path.resolve("", event.data.user.dp);
      console.log(imgPath);
      setRes(event.data.user);
      setImg(imgPath);
    }
    // window.removeEventListener("message", getMatch);

    setLoading(false);
  };
  const getSignOut = (event) => {
    window.removeEventListener("message", getSignOut);
    if (event.source === window) {
      console.log(event.data);
      setLoading(false);
      if (event.data.error) {
        switch (event.data.status) {
          case "try again":
            alert.show("try again", { type: "error" });

            break;
          case "duplicate":
            alert.show("Signed Out Already", { type: "error" });
            break;
          case "not found":
            alert.show("Data not found", { type: "error" });
            break;
          case "not yet":
            alert.show("Can't sign out before 30 minutes", { type: "error" });
            break;
          case "not signed":
            alert.show("You have to sign in first", { type: "error" });
            break;
          default:
            alert.show("Connect Scanner", { type: "error" });
        }
        setRes("");
        return;
      }
      alert.show("Signed Out", { type: "success" });

      const imgPath =
        event.data.user.dp && electron.path.resolve("", event.data.user.dp);
      console.log(imgPath);
      setRes(event.data.user);
      setImg(imgPath);
    }
    // window.removeEventListener("message", getMatch);

    setLoading(false);
  };
  return (
    <div className="container flex flex-col justify-center items-center">
      <h1 className="text-white text-5xl my-2">Attendance</h1>
      <div className="flex items-center justify-center text-white gap-3 font-thin bg-bg2 rounded-full m-2 text-sm ">
        <button
          className={` transition-all shadow-2xl w-16 h-16  rounded-full ${
            (signIn &&
              "bg-primary bg-gradient-to-b from-primary to-blue-500") ||
            "bg-slate-700"
          }`}
          onClick={() => setSignIn(true)}
        >
          Sign In
        </button>
        <button
          className={` transition-all w-16 h-16 rounded-full ${
            (!signIn &&
              "bg-primary bg-gradient-to-b from-primary to-blue-500") ||
            " bg-slate-700"
          }`}
          onClick={() => setSignIn(false)}
        >
          Sign Out
        </button>
      </div>
      <div className="sub-container flex flex-col justify-center items-center w-3/5">
        <div className=" h-1/2 w-2/5 mt-3 p-2 m-2">
          {
            <>
              {(res && (
                <img
                  className=" w-full "
                  height="300"
                  width="150"
                  src={img}
                  alt=""
                />
              )) || (
                <div
                  className="w-full h-full bg-[#20232a] text-white  flex  p-2"
                  style={{ textAlign: "center", height: "300px" }}
                >
                  Scan thumb to mark Attendance
                </div>
              )}{" "}
            </>
          }
        </div>

        <div className="text-white h-1/3 column w-2/5 mt-5  flex flex-col items-start justify-center">
          <div>Name: {(res && res?.name) || "xxxxxxxx"}</div>
          <div>Staff ID: {(res && res?.staffID) || "xxxxxxxx"}</div>
          <div>Time: {(res && res?.time) || "xxxxxxxx"}</div>

          <button
            onClick={async () => {
              setLoading(true);

              signIn
                ? await electron.match("signIn")
                : await electron.match("signOut");

              window.addEventListener(
                "message",
                signIn ? getMatch : getSignOut
              );
            }}
            className="btn btn-primary bg-gradient-to-b from-primary to-blue-500 relative  w-full  my-5 disabled:opacity-50 disabled:pointer-events-none"
            disabled={loading}
          >
            {loading && (
              <AiOutlineLoading
                size={30}
                className="animate-spin mr-5 absolute left-2  "
              />
            )}{" "}
            {(signIn && "Sign In") || "Sign Out"}
          </button>
        </div>
      </div>
    </div>
  );
}
