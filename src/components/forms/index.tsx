import React, { useEffect, useRef, useState } from "react";
import css from "./forms.css";
import {
  EditProfileTextField,
  MainTextField,
  ReportPetTextField,
} from "../../ui/text-field";
import {
  FormButton,
  TertiaryButton,
  GoHomeButton,
  StatusButton,
} from "../../ui/buttons";
import {
  userDataState,
  redirectState,
  petPicState,
  petLastLocationState,
  pointOfReferenceState,
  toEditPetState,
  refetchState,
} from "../atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  deletePost,
  editPet,
  recoverPassword,
  reportLostPet,
  signIn,
  signUp,
  updateName,
  updatePassword,
  updateStatus,
  verifyEmail,
} from "../../lib/api";
import { DropZoneButton } from "../dropzone";
import { Map } from "../map";
import { SecondaryLoader } from "../../ui/loader";
import { log } from "console";

function LoginForm() {
  const setUserData = useSetRecoilState(userDataState);
  const redirect = useRecoilValue(redirectState);
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;
    setLoader(true);
    const apiResponse = await verifyEmail(email);

    if (!apiResponse) {
      setStatus("Este email no está registrado.");
      setLoader(false);
      return false;
    }

    const authentication = await signIn(email, password);
    if (!authentication.token.authenticationCompleted) {
      setStatus("Contraseña incorrecta.");
      setLoader(false);
      return false;
    }

    setUserData({
      email,
      token: authentication.token.token,
    });
    setLoader(false);

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
      <SecondaryLoader active={loader} />
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
  const setUserData = useSetRecoilState(userDataState);
  const redirect = useRecoilValue(redirectState);
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const name = target.name.value;
    const password = target.password.value;
    const repeatPassword = target["repeat-password"].value;
    setLoader(true);
    const apiResponse = await verifyEmail(email);

    if (apiResponse) {
      setStatus("El email ya está registrado.");
      setLoader(false);
      return false;
    }

    if (password != repeatPassword) {
      setStatus("Las contraseñas no coinciden.");
      setLoader(false);
      return false;
    }

    await signUp(email, name, password);
    const authentication = await signIn(email, password);
    setLoader(false);

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
      <SecondaryLoader active={loader} />
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
  const [loader, setLoader] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    setLoader(true);
    const apiResponse = await verifyEmail(email);
    if (!apiResponse) {
      setStatus({ message: "Este email no está registrado.", type: "error" });
      setLoader(false);
      return false;
    }
    await recoverPassword(email);
    setStatus({
      message:
        "Recibirás un email con tu nueva contraseña para poder ingresar a tu cuenta.",
      type: "success",
    });
    setLoader(false);
  }

  return (
    <form className={css["form"]} onSubmit={handleSubmit}>
      <MainTextField type="email" text="EMAIL" name="email" />
      <SecondaryLoader active={loader} />
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
  const [loader, setLoader] = useState(false);
  const userData = useRecoilValue(userDataState);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formEl.current;

    if (!form.name.hasAttribute("readonly")) {
      setLoader(true);
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
      setLoader(true);
      const apiResponse = await updatePassword(
        form.password.value,
        userData.token
      );

      if (!apiResponse.changeStatus) {
        setLoader(false);
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
        setLoader(false);
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
      <SecondaryLoader active={loader} />
      <span className={[css["status-message"], css[status.type]].join(" ")}>
        {status.message}
      </span>
      <FormButton>Guardar</FormButton>
    </form>
  );
}

function ReportPetForm() {
  const [status, setStatus] = useState({ message: null, type: null });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const petPic = useRecoilValue(petPicState);
  const petLastLocation = useRecoilValue(petLastLocationState);
  const pointOfReference = useRecoilValue(pointOfReferenceState);
  const userData = useRecoilValue(userDataState);
  const [refetch, setRefetch] = useRecoilState(refetchState);
  const [reportStatus, setReportStatus] = useState(false);

  const formButtons = reportStatus ? (
    <GoHomeButton action={goHome}>Ir a la home</GoHomeButton>
  ) : (
    <div className={css["button-container"]}>
      <FormButton>Guardar</FormButton>
      <TertiaryButton action={goHome}>Cancelar</TertiaryButton>
    </div>
  );

  useEffect(() => {
    if (reportStatus) {
      setReportStatus(false);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    const name = target.name.value;

    if (name && petPic && petLastLocation) {
      setLoader(true);
      await reportLostPet({
        name,
        last_location_lat: petLastLocation.lat,
        last_location_lng: petLastLocation.lng,
        point_of_reference: pointOfReference.toUpperCase(),
        pictureURL: petPic,
        token: userData.token,
      });
      setRefetch(refetch + 1);
      setReportStatus(true);
      setLoader(false);
      setStatus({ message: "Mascota reportada con éxito!", type: "success" });
    }

    if (!petLastLocation.lng || !petLastLocation.lat) {
      setStatus({
        message:
          "Por favor, informe dónde fue el último lugar en donde vió a su mascota. En caso de haberlo hecho, recuerde apretar la tecla 'Enter' en el campo de ubicación",
        type: "error",
      });
    }
    if (!petPic) {
      setStatus({
        message: "Por favor, ingrese una imagen de su mascota",
        type: "error",
      });
    }

    if (!name) {
      setStatus({
        message: "Por favor, introduzca el nombre de la mascota",
        type: "error",
      });
    }
  }

  function goHome() {
    navigate("/");
  }

  return (
    <form className={css["form"]} onSubmit={handleSubmit}>
      <ReportPetTextField text="NOMBRE" name="name" type="text" />
      <DropZoneButton>Agregar/modificar foto</DropZoneButton>
      <Map />
      <p className={css["instructions"]}>
        Buscá un punto de referencia para reportar a tu mascota y apriete la
        tecla 'enter'. Puede ser una dirección, un barrio o una ciudad.
      </p>
      <SecondaryLoader active={loader} />
      <span className={[css["status-message"], css[status.type]].join(" ")}>
        {status.message}
      </span>
      {formButtons}
    </form>
  );
}
function EditPetForm() {
  const [status, setStatus] = useState({ message: null, type: null });
  const [loader, setLoader] = useState(false);
  const [refetch, setRefetch] = useRecoilState(refetchState);
  const [reportStatus, setReportStatus] = useState(false);
  const navigate = useNavigate();
  const petLastLocation = useRecoilValue(petLastLocationState);
  const pointOfReference = useRecoilValue(pointOfReferenceState);
  const toEditPet = useRecoilValue(toEditPetState);
  const recoilPetPic = useRecoilValue(petPicState);
  const petPic = recoilPetPic ? recoilPetPic : toEditPet.pictureURL;
  const userData = useRecoilValue(userDataState);
  const formRef: any = useRef();
  const defaultPetLastLocation =
    petLastLocation.lat && petLastLocation.lng
      ? petLastLocation
      : toEditPet.coordinates;
  const lat = toEditPet.coordinates.lat;
  const lng = toEditPet.coordinates.lng;

  useEffect(() => {
    const ubication = formRef.current.children[2].children[1].children[1];
    formRef.current.name.value = toEditPet.name;
    ubication.value = toEditPet.point_of_reference;
  }, []);

  const formButtons = reportStatus ? (
    <GoHomeButton action={goHome}>Ir a la home</GoHomeButton>
  ) : (
    <div className={css["button-container"]}>
      <FormButton>Guardar</FormButton>
      <StatusButton action={changeStatus} petStatus={toEditPet.status} />
    </div>
  );

  useEffect(() => {
    setReportStatus(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    const name = target.name.value;
    const ubication = formRef.current.children[2].children[1].children[1];
    const defaultPointOfReference = pointOfReference
      ? pointOfReference
      : ubication.value;

    if (name && petPic && petLastLocation && ubication.value) {
      setLoader(true);
      await editPet({
        name,
        lat: defaultPetLastLocation.lat,
        lng: defaultPetLastLocation.lng,
        point_of_reference: defaultPointOfReference.toUpperCase(),
        pictureURL: petPic,
        petId: toEditPet.id,
        token: userData.token,
      });

      setRefetch(refetch + 1);

      setLoader(false);
      setStatus({ message: "Mascota reportada con éxito!", type: "success" });
      setReportStatus(true);
    }

    if (!ubication.value) {
      setStatus({
        message:
          "Por favor, informe dónde fue el último lugar en donde vió a su mascota. En caso de haberlo hecho, recuerde apretar la tecla 'Enter' en el campo de ubicación",
        type: "error",
      });
    }
    if (!petPic) {
      setStatus({
        message: "Por favor, ingrese una imagen de su mascota",
        type: "error",
      });
    }

    if (!name) {
      setStatus({
        message: "Por favor, introduzca el nombre de la mascota",
        type: "error",
      });
    }
  }

  async function handleClick() {
    setLoader(true);
    await deletePost(toEditPet.id, userData.token);
    setRefetch(refetch + 1);
    navigate("/my-reported-pets");
  }

  function goHome() {
    navigate("/");
  }

  async function changeStatus() {
    const statusToUpdate = toEditPet.status === "lost" ? "found" : "lost";
    setLoader(true);
    await updateStatus(statusToUpdate, toEditPet.id, userData.token);
    setLoader(false);
    setStatus({
      message: "El estado de tu mascota fue actualizado!",
      type: "success",
    });
    setReportStatus(true);
    setRefetch(refetch + 1);
  }

  return (
    <form ref={formRef} className={css["form"]} onSubmit={handleSubmit}>
      <ReportPetTextField text="NOMBRE" name="name" type="text" />
      <DropZoneButton defaultValue={toEditPet.pictureURL}>
        Agregar/modificar foto
      </DropZoneButton>
      <Map defaultValue={[lng, lat]} />
      <p className={css["instructions"]}>
        Buscá un punto de referencia para reportar a tu mascota y apriete la
        tecla 'enter'. Puede ser una dirección, un barrio o una ciudad.
      </p>
      <SecondaryLoader active={loader} />
      <span className={[css["status-message"], css[status.type]].join(" ")}>
        {status.message}
      </span>
      {formButtons}
      <span onClick={handleClick} className={css["unpublish"]}>
        DESPUBLICAR
      </span>
    </form>
  );
}

export {
  LoginForm,
  SignUpForm,
  RecoverPasswordForm,
  ProfileForm,
  ReportPetForm,
  EditPetForm,
};
