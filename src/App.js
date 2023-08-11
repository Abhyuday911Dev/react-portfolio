import React from "react";
import "./Styles/App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Profile from "./Components/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
    </Routes>
  );
};

export default App;
