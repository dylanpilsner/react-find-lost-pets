import React from "react";
import { Title } from "../../ui/texts";
import { Header } from "../../components/header";
import { SignUpForm } from "../../components/forms";

import css from "./sign-up.css";

function SignUpPage() {
  return (
    <div>
      <Header />
      <div className={css["auth-container"]}>
        <Title>Registrarse</Title>
        <SignUpForm />
      </div>
    </div>
  );
}

export { SignUpPage };
