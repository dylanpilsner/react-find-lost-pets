import React, { useState } from "react";
import { recoverPassword, verifyEmail } from "../../lib/api";
import css from "./recover-password.css";
import { Header } from "../../components/header";
import { Title } from "../../ui/texts";
import { RecoverPasswordForm } from "../../components/forms";

function RecoverPassword() {
  const [status, setStatus] = useState({ message: "", type: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const apiResponse = await verifyEmail(email);

    if (!apiResponse) {
      setStatus({ message: "Este email no está registrado.", type: "error" });
      return false;
    }

    await recoverPassword(email);
    setStatus({
      message:
        "Recibirás un email con tu nueva contraseña para poder ingresar a tu cuenta.",
      type: "success",
    });
  }

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
