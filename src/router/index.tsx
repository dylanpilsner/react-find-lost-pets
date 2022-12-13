import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { Home } from "../pages/home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
      </Route>
    </Routes>
  );
}

export { AppRoutes };
