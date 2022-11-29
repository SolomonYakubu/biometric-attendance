import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Register from "./pages/Register";
import Stats from "./pages/Stats";
import Report from "./pages/Report";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Match from "./pages/Match";

import Splash from "./pages/Splash";
export default function App() {
  const [canRoute, setCanRoute] = useState(true);
  const [splash, setSplash] = useState(true);
  const [login, setLogin] = useState(false);

  return (
    <>
      {(splash && <Splash setSplash={setSplash} />) ||
        (!login && <Login setLogin={setLogin} />) || (
          <>
            <Sidebar canRoute={canRoute} />

            <div className="flex flex-row justify-end items-center w-screen gap-2 min-h-screen transition-all">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/match" element={<Match />} />

                <Route
                  path="/register"
                  element={<Register setCanRoute={setCanRoute} />}
                />
                <Route
                  path="/stats"
                  element={<Stats setCanRoute={setCanRoute} />}
                />
                <Route
                  path="/report"
                  element={<Report setCanRoute={setCanRoute} />}
                />
              </Routes>
            </div>
          </>
        )}
    </>
  );
}
