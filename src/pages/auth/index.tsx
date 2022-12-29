import React from "react";
import { Title } from "../../ui/texts";
import { Header } from "../../components/header";
import { LoginForm } from "../../components/forms";
import css from "./sign-in.css";

function AuthPage() {
  return (
    <div>
      <Header />
      <div className={css["auth-container"]}>
        <Title>Ingresar</Title>
        <LoginForm />
      </div>
    </div>
  );
}

export { AuthPage };
