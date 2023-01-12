import React from "react";
import css from "./recover-password.css";
import { Header } from "../../components/header";
import { Title } from "../../ui/texts";
import { RecoverPasswordForm } from "../../components/forms";

function RecoverPassword() {
  return (
    <div>
      <Header />
      <div className={css["auth-container"]}>
        <div className={css["title-container"]}>
          <Title>Recuperar contraseña</Title>
        </div>
        <RecoverPasswordForm />
      </div>
    </div>
  );
}
export { RecoverPassword };
