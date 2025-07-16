import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Dashboard } from "./Dashboard";
import { Profile } from "./Profile";
import { ManageLinks } from "./ManageLinks";
import { Changepass } from "./Changepass";
import { Notfound } from "./Notfound";
import { Forgot } from "./Forgot";
import { Reset } from "./Reset";
import { Redirect } from "./Redirect";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manage" element={<ManageLinks />} />
          <Route path="/change-password" element={<Changepass/>}/>
          <Route path="/forgot-password" element={<Forgot/>}/>
          <Route path="/forgot-password/:id/:token" element={<Reset/>}/>
          <Route path="*" element={<Notfound/>} />
          <Route path="/r/:shortid" element={<Redirect/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
