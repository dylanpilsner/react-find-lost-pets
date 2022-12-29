import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userDataState, redirectState } from "../atoms";
import { useRecoilState } from "recoil";
import css from "./header.css";

function Header() {
  const navigate = useNavigate();
  const navMenu: any = useRef();
  const [userData, setUserData] = useRecoilState(userDataState);
  const [redirect, setRedirect] = useRecoilState(redirectState);
  const token = userData.token;

  function getUser() {
    if (userData.token) {
      return userData.email;
    }

    return "Invitadx";
  }

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

  function signOut() {
    localStorage.setItem(
      "saved-user-data",
      JSON.stringify({
        email: null,
        token: null,
      })
    );
    location.reload();
  }

  function setCustomRedirect(path) {
    if (token) {
      navigate(path);
    } else {
      setRedirect(path);
      localStorage.setItem("saved-redirect", JSON.stringify(path));
      navigate("/sign-up");
      if (location.pathname == "/sign-up") {
        location.reload();
      }
    }
  }

  const signIn = !userData.token ? (
    <div className={css.sign} onClick={() => navigate("/sign-in")}>
      INICIAR SESIÓN
    </div>
  ) : (
    <div className={css.sign} onClick={() => signOut()}>
      CERRAR SESIÓN
    </div>
  );

  const signUp = !userData.token ? (
    <div className={css.sign} onClick={() => navigate("/sign-up")}>
      REGISTRARSE
    </div>
  ) : null;

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
        <nav
          className={css["nav-item"]}
          onClick={() => setCustomRedirect("/profile")}
        >
          Mis datos
        </nav>
        <nav
          className={css["nav-item"]}
          onClick={() => setCustomRedirect("/my-reported-pets")}
        >
          Mis mascotas reportadas
        </nav>
        <nav
          className={css["nav-item"]}
          onClick={() => setCustomRedirect("/report-pet")}
        >
          Reportar mascota
        </nav>
        <div className={css["account-container"]}>
          <img className={css["user-img"]} src="./src/assets/user.png" />
          <span className={css.user}>{getUser()}</span>
        </div>
        {signIn}
        {signUp}
      </nav>
    </header>
  );
}

export { Header };
