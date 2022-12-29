import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { RecoverPassword } from "../pages/recover-password";
import { SignInPage } from "../pages/sign-in";
import { SignUpPage } from "../pages/sign-up";
import { ProfilePage } from "../pages/profile";
import { ReportedPetsPage } from "../pages/reported-pets";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/sign-in" element={<SignInPage />}></Route>
      <Route path="/sign-up" element={<SignUpPage />}></Route>
      <Route path="/recover-password" element={<RecoverPassword />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/my-reported-pets" element={<ReportedPetsPage />}></Route>
    </Routes>
  );
}

export { AppRoutes };
