import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Enroll from "../components/Enroll";
import Upload from "../components/Upload";

export default function Register({ setCanRoute }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [building, setBuilding] = useState("");
  const [id, setId] = useState("");
  const [reg, setReg] = useState(false);
  const [_id, set_id] = useState("");
  const [upload, setUpload] = useState(false);
  const alert = useAlert();
  const getRegStats = (event) => {
    if (event.source === window) {
      if (event.data.error) {
        alert.show(event.data.status, { type: "error" });
      } else {
        alert.show("Data Recorded Successfully", { type: "success" });
        setName("");
        setDepartment("");
        setId("");
        set_id("");
        setEmail("");
        setBuilding("");
        setReg(true);

        set_id(event.data._id);
        setCanRoute(false);
      }
    }
    window.removeEventListener("message", getRegStats);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      name == "" ||
      id == "" ||
      department == "" ||
      email == "" ||
      building == ""
    ) {
      alert.show("fill out all fields", { type: "error" });
      return;
    }
    electron.register({
      name,
      staffID: id,
      department,
      email,
      building,
    });
    window.addEventListener("message", getRegStats);
  };
  return (
    <div className="container flex flex-col  ">
      <div className="flex flex-row justify-around items-center text-white w-40 mb-3">
        <div
          className={`${
            (!reg && !upload && "opacity-100") || "opacity-40"
          } border-solid rounded-full bg-white w-8 h-8`}
        ></div>
        <div
          className={`${
            (reg && !upload && "opacity-100") || "opacity-40"
          } border-solid rounded-full bg-white w-8 h-8`}
        ></div>
        <div
          className={`${
            (reg && upload && "opacity-100") || "opacity-40"
          } border-solid rounded-full bg-white w-8 h-8`}
        ></div>
      </div>
      {!reg && !upload ? (
        <>
          <h1 className=" text-white text-5xl mb-4">Register</h1>
          {/* <input
            type={"button"}
            className="btn btn-secondary w-10"
            style={{ alignSelf: "flex-start" }}
            onClick={() => {
              navigate("/");
            }}
            value="< Back"
          /> */}

          <form
            onSubmit={onSubmit}
            className="sub-container flex flex-col items-center justify-center w-3/5 p-10"
          >
            <div className=" w-full flex flex-col justify-between items-start m-2">
              <label for="name" className="text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="input w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className=" w-full flex flex-col justify-between items-start m-2">
              <label for="department" className="text-white fs-16">
                Department
              </label>
              <input
                type="text"
                id="department"
                className="input w-full"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            <div className=" w-full flex flex-col justify-between items-start m-2">
              <label for="email" className="text-white fs-16">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className=" w-full flex flex-col justify-between items-start m-2">
              <label for="id" className="text-white fs-16">
                Staff ID
              </label>
              <input
                type="text"
                className="input w-full"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required={true}
              />
            </div>
            <div className=" w-full flex flex-col justify-between items-start m-2">
              <label className="text-white fs-16" for="building">
                Building
              </label>
              <input
                type="text"
                id="building"
                className="input w-full"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                required
              />
            </div>

            <div className=" w-full flex flex-col justify-between items-start m-2">
              <button className="btn btn-primary bg-gradient-to-b from-primary to-blue-500 w-100 my-15 fs-16">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          {(!upload && reg && (
            <Upload setReg={setReg} setUpload={setUpload} _id={_id} />
          )) || (
            <Enroll
              _id={_id}
              setReg={setReg}
              setUpload={setUpload}
              reg={reg}
              setCanRoute={setCanRoute}
            />
          )}
        </>
      )}
    </div>
  );
}
