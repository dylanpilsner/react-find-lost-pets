import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import css from "./layout.css";

function Layout() {
  return <Header />;
}

export { Layout };
