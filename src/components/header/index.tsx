import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import css from "./header.css";

function Header() {
  const navigateHook = useNavigate();
  const navMenu: any = useRef();

  function openNavMenu(e) {
    const hasClosedClass = navMenu.current
      .getAttribute("class")
      .includes(css.closed);
    navMenu.current.classList.toggle(css.opened);
    if (hasClosedClass) {
      navMenu.current.classList.remove(css.closed);
    }
  }
  function closeNavMenu(e) {
    navMenu.current.classList.toggle(css.opened);
    navMenu.current.classList.toggle(css.closed);
  }

  function navigate(path) {
    navigateHook(path);
  }

  return (
    <header className={css.header}>
      <img
        className={css.logo}
        src="./src/assets/logo.png"
        onClick={() => navigate("/")}
      />
      <div className={css["open-nav-menu"]} onClick={openNavMenu}>
        <div className={css["hamburger-top-bread"]}></div>
        <div className={css["hamburger-top-patty"]}></div>
        <div className={css["hamburger-bottom-bread"]}></div>
      </div>
      <nav ref={navMenu} className={css["nav-menu"]}>
        <img
          className={css["close-nav-menu"]}
          src="./src/assets/close.png"
          onClick={closeNavMenu}
        />
        <nav className={css["nav-item"]} onClick={() => navigate("/test")}>
          Mis datos
        </nav>
        <nav
          className={css["nav-item"]}
          onClick={() => navigate("my-reported-pets")}
        >
          Mis mascotas reportadas
        </nav>
        <nav
          className={css["nav-item"]}
          onClick={() => navigate("/report-pet")}
        >
          Reportar mascota
        </nav>
        <div className={css["account-container"]}>
          <img className={css["user-img"]} src="./src/assets/user.png" />
          <span className={css.user}>Invitadx</span>
        </div>
        <div className={css.sign}>INICIAR SESIÓN</div>
      </nav>
    </header>
  );
}

export { Header };
