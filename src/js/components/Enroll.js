import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { AiOutlineLoading } from "react-icons/ai";
import { BsHandThumbsUpFill } from "react-icons/bs";
export default function Enroll({ _id, setReg, setCanRoute, setUpload }) {
  const [res, setRes] = useState("");
  const [scan, setScan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const alert = useAlert();
  // console.log(_id);
  const getMessage = (event) => {
    window.removeEventListener("message", getMessage);
    if (event.source === window) {
      setLoading(false);
      if (!event.data.error) {
        setRes(`${event.data.file}?` + +new Date());
        // window.removeEventListener("message", getMessage);
        alert.show("success", { type: "success" });
        setScan(true);
      } else {
        switch (event.data.status) {
          case "try again":
            alert.show("try again", { type: "error" });
            break;
          default:
            alert.show("Connect Scanner", { type: "error" });
        }
        setRes("");
      }

      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-white text-5xl my-2">Enroll</h1>
      {/* <input
        type={"button"}
        className="btn btn-secondary w-10"
        style={{ alignSelf: "flex-start" }}
        onClick={() => {
          navigate("/");
        }}
        value="< Back"
      /> */}

      <div className="sub-container flex flex-col justify-center items-center p-4 w-3/5 h-3/4">
        <div className="flex items-center justify-center bg-bg1 p-2 my-2 rounded">
          <BsHandThumbsUpFill
            size={40}
            className={`text-white ${count < 1 && "opacity-30"}`}
          />
          <BsHandThumbsUpFill
            size={40}
            className={`text-white ${count < 2 && "opacity-30"}`}
          />
          <BsHandThumbsUpFill
            size={40}
            className={`text-white ${count < 3 && "opacity-30"}`}
          />
        </div>
        {(res && (
          <img
            src={res && `${res}`}
            style={{ height: "260px" }}
            className=" w-1/5"
          />
        )) || (
          <div
            className="w-1/5  bg-[#20232a] text-white flex justify-center items-center"
            style={{ textAlign: "center", height: "260px" }}
          >
            Place your thumb on the scanner and click "scan"
          </div>
        )}

        <button
          onClick={async () => {
            if (!_id) {
              return;
            }
            if (count === 2) {
              setCount((currentCount) => currentCount + 1);
            }
            setLoading(true);
            const res = await electron.runScan({ _id, count });

            window.addEventListener("message", getMessage);
          }}
          className="btn btn-primary bg-gradient-to-b from-primary to-blue-500 relative w-1/5 m-3 disabled:opacity-50 disabled:pointer-events-none"
          disabled={loading}
        >
          {loading && (
            <AiOutlineLoading
              size={20}
              className="animate-spin mr-5 absolute left-2  "
            />
          )}{" "}
          {(scan && "Re-Scan") || "Scan"}
        </button>
        {count < 3 && (
          <button
            onClick={async () => {
              if (count < 3) {
                setCount((currentCount) => currentCount + 1);
                setScan(false);
              }
            }}
            className="btn btn-primary bg-gradient-to-b from-primary to-blue-500 relative w-1/5 m-3 disabled:opacity-50 disabled:pointer-events-none"
          >
            Next
          </button>
        )}
        {count > 2 && (
          <input
            type="button"
            value={"Finish"}
            className="btn btn-secondary "
            style={{ alignSelf: "flex-end" }}
            onClick={() => {
              if (scan) {
                alert.show("Registration Completed", { type: "success" });
                setTimeout(() => {
                  setReg(false);
                  setUpload(false);
                  setCanRoute(true);
                }, 1500);
                return;
              }
              alert.show("You must enroll first", { type: "error" });
            }}
          />
        )}
      </div>
    </>
  );
}
