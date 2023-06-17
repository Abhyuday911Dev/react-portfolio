import React from "react";
import "./Styles/App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
    </Routes>
  );
};

export default App;
