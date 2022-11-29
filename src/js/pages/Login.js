import React from "react";
import { useAlert } from "react-alert";

export default function Login({ setLogin }) {
  const alert = useAlert();
  const getLogin = (event) => {
    if (event.source === window) {
      if (event.data.error) {
        alert.show(event.data.status, { type: "error" });
      } else {
        alert.show("Login Successful", { type: "success" });
        setLogin(true);
      }
    }
    window.removeEventListener("message", getLogin);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    electron.login({ name, password });
    window.addEventListener("message", getLogin);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        className="flex flex-col p-12 w-1/3  bg-bg2 rounded"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          className="input mb-3"
          placeholder="User Name"
          id="name"
        />
        <input
          type="password"
          className="input mb-3"
          placeholder="Password"
          id="password"
        />
        <button className="btn btn-primary font-bold text-lg bg-gradient-to-b from-primary to-blue-500">
          Login
        </button>
      </form>
    </div>
  );
}
