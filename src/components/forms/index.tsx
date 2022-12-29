import React, { useRef, useState } from "react";
import css from "./forms.css";
import { EditProfileTextField, MainTextField } from "../../ui/text-field";
import { FormButton } from "../../ui/buttons";
import {
  recoverPassword,
  signIn,
  signUp,
  updateName,
  updatePassword,
  verifyEmail,
} from "../../lib/api";
import { userDataState, redirectState, useProfileData } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [userData, setUserData] = useRecoilState(userDataState);
  const redirect = useRecoilValue(redirectState);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;
    const apiResponse = await verifyEmail(email);

    if (!apiResponse) {
      setStatus("Este email no está registrado.");
      return false;
    }

    const authentication = await signIn(email, password);
    if (!authentication.token.authenticationCompleted) {
      setStatus("Contraseña incorrecta.");
      return false;
    }

    setUserData({
      email,
      token: authentication.token.token,
    });

    localStorage.setItem(
      "saved-user-data",
      JSON.stringify({ email, token: authentication.token.token })
    );

    navigate(redirect);
  }

  return (
    <form className={css["form"]} onSubmit={handleSubmit}>
      <MainTextField type="email" text="EMAIL" name="email" />
      <MainTextField type="password" text="CONTRASEÑA" name="password" />
      <span className={[css["status-message"], css["error"]].join(" ")}>
        {status}
      </span>
      <span
        className={css["recover-password"]}
        onClick={() => navigate("/recover-password")}
      >
        Olvidé mi contraseña
      </span>

      <FormButton>Siguiente</FormButton>
    </form>
  );
}

function SignUpForm() {
  const [userData, setUserData] = useRecoilState(userDataState);
  const redirect = useRecoilValue(redirectState);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const name = target.name.value;
    const password = target.password.value;
    const repeatPassword = target["repeat-password"].value;

    const apiResponse = await verifyEmail(email);

    if (apiResponse) {
      setStatus("El email ya está registrado.");
      return false;
    }

    if (password != repeatPassword) {
      setStatus("Las contraseñas no coinciden.");
      return false;
    }

    await signUp(email, name, password);
    const authentication = await signIn(email, password);

    setUserData({
      email,
      token: authentication.token.token,
    });

    localStorage.setItem(
      "saved-user-data",
      JSON.stringify({ email, token: authentication.token.token })
    );

    navigate(redirect);
  }

  return (
    <form className={css["form"]} onSubmit={handleSubmit}>
      <MainTextField type="email" text="EMAIL" name="email" />
      <MainTextField type="text" text="NOMBRE" name="name" />
      <div className={css["separator"]}></div>
      <MainTextField type="password" text="CONTRASEÑA" name="password" />
      <MainTextField
        type="password"
        text="REPETIR CONTRASEÑA"
        name="repeat-password"
      />
      <span className={[css["status-message"], css["error"]].join(" ")}>
        {status}
      </span>
      <span
        className={css["sign-in-link"]}
        onClick={() => navigate("/sign-in")}
      >
        Ya tenés una cuenta?
      </span>

      <FormButton>Siguiente</FormButton>
    </form>
  );
}
function RecoverPasswordForm() {
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
    <form className={css["form"]} onSubmit={handleSubmit}>
      <MainTextField type="email" text="EMAIL" name="email" />
      <span className={[css["status-message"], css[status.type]].join(" ")}>
        {status.message}
      </span>
      <FormButton>Siguiente</FormButton>
    </form>
  );
}

function ProfileForm() {
  const formEl: any = useRef();
  const [status, setStatus] = useState({ message: null, type: null });
  const userData = useRecoilValue(userDataState);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formEl.current;

    if (!form.name.hasAttribute("readonly")) {
      await updateName(form.name.value, userData.token);
      location.reload();
    }

    if (!form.password.hasAttribute("readonly")) {
      if (form["password"].value != form["confirm-password"].value) {
        setStatus({ message: "Las contraseñas no coinciden", type: "error" });
        form["password"].toggleAttribute("readonly");
        form["confirm-password"].toggleAttribute("readonly");
        return false;
      }
    }

    if (!form.password.hasAttribute("readonly")) {
      const apiResponse = await updatePassword(
        form.password.value,
        userData.token
      );

      if (!apiResponse.changeStatus) {
        setStatus({
          message:
            "Por favor, introduzca una contraseña distinta a la anterior",
          type: "error",
        });
        form["password"].toggleAttribute("readonly");
        form["confirm-password"].toggleAttribute("readonly");
        return false;
      }
      if (apiResponse.changeStatus) {
        setStatus({
          message: "Contraseña actualizada con éxito",
          type: "success",
        });
      }
    }
  }

  function onEditName() {
    const form = formEl.current;
    const editPassword = form["password"].hasAttribute("readonly");
    if (editPassword) {
      form["name"].toggleAttribute("readonly");
    }
  }

  function onEditPassword() {
    const form = formEl.current;
    const editName = form["name"].hasAttribute("readonly");
    if (editName) {
      form["password"].value = "";
      form["confirm-password"].value = "";

      form["password"].toggleAttribute("readonly");
      form["confirm-password"].toggleAttribute("readonly");
    }
  }

  return (
    <form ref={formEl} className={css["form"]} onSubmit={handleSubmit}>
      <EditProfileTextField
        editable={true}
        text="Nombre"
        name="name"
        type="text"
        onEdit={onEditName}
      />
      <div className={css["separator"]}></div>
      <EditProfileTextField
        editable={true}
        text="Contraseña"
        name="password"
        type="password"
        onEdit={onEditPassword}
      />
      <EditProfileTextField
        editable={false}
        text="Repetir contraseña"
        name="confirm-password"
        type="password"
      />
      <span className={[css["status-message"], css[status.type]].join(" ")}>
        {status.message}
      </span>
      <FormButton>Guardar</FormButton>
    </form>
  );
}

export { LoginForm, SignUpForm, RecoverPasswordForm, ProfileForm };
