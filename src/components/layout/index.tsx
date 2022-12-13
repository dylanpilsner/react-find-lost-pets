import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import css from "./layout.css";
import { Title } from "../../ui/texts";

function Layout() {
  return (
    <div>
      <Header />
      <Title>Mascotas perdidas cerca tuyo</Title>
    </div>
  );
}

export { Layout };
