import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx";
import LogoutModal from "./components/subcomponents/LogoutModal.jsx";
import ConfirmEmail from "./components/ConfirmEmail.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import Reset2 from "./components/Reset2.jsx";
import Coverhome from "./components/Coverhome.jsx";

export default function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Coverhome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<LogoutModal />} />
          <Route path="/confirm-otp" element={<ConfirmEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} /> <Route path="/reset2" element={<Reset2 />} />
        </Routes>
      </>
    </Router>
  );
}
