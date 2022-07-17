import React, { useState } from "react";
import "./App.css";
import "../src/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Startpage from "./pages/Startpage";
import MoviePage from "./pages/MoviePage";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserPage from "./pages/UserPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Startpage />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="/movie/:name" element={<MoviePage />} />
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
    </>
  );
};

export default App;
