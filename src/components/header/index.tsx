import React from "react";
import { Outlet } from "react-router-dom";
import css from "./header.css";

function Header() {
  return (
    <header className={css.header}>
      <img className={css.logo} src="./src/assets/logo.png" />
      <div className={css["open-nav-menu"]}>
        <div className={css["hamburger-top-bread"]}></div>
        <div className={css["hamburger-top-patty"]}></div>
        <div className={css["hamburger-bottom-bread"]}></div>
      </div>
      <nav className={css["nav-menu"]}>
        <img className={css["close-nav-menu"]} src="./src/assets/close.png" />
        <nav className={css["nav-item my-data"]}>Mis datos</nav>
        <nav className={css["nav-item my-reported-pets"]}>
          Mis mascotas reportadas
        </nav>
        <nav className={css["nav-item report-pet"]}>Reportar mascota</nav>
        <div className={css["account-container"]}>
          <img className={css["user-img"]} src="./src/assets/user.png" />
          <span className={css.user}>test</span>
        </div>
        <div className={css.sign}>test</div>
      </nav>
    </header>
  );
}

export { Header };
