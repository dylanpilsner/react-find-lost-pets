import React, { useEffect, useRef, useState } from "react";
import { Header } from "../../components/header";
import { FormButton, TertiaryButton } from "../../ui/buttons";
import { MainTextField, ReportPetTextField } from "../../ui/text-field";
import { CenteredTitle } from "../../ui/texts";
import { Map } from "../../components/map";
import { DropZoneButton } from "../../components/dropzone";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  petLastLocationState,
  petPicState,
  userDataState,
} from "../../components/atoms";
import css from "./report-pet.css";
import { reportLostPet } from "../../lib/api";

export function ReportPetPage() {
  const navigate = useNavigate();
  const petPic = useRecoilValue(petPicState);
  const petLastLocation = useRecoilValue(petLastLocationState);
  const [status, setStatus] = useState({ message: null, type: null });
  const userData = useRecoilValue(userDataState);

  async function handleSubmit(e) {
    e.preventDefault();
    const target = e.target;
    const name = target.name.value;
    const pointOfReference = target.ubication.value;

    console.log(pointOfReference);

    // if (name && petPic && petLastLocation) {
    //   const newReport = await reportLostPet({
    //     name,
    //     last_location_lat: petLastLocation.lat,
    //     last_location_lng: petLastLocation.lng,
    //     point_of_reference: pointOfReference,
    //     pictureURL: petPic,
    //     token: userData.token,
    //   });

    //   console.log(newReport);
    // }

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
    <div>
      <Header />
      <div className={css["report-pet-page-container"]}>
        <CenteredTitle>Reportar mascota perdida</CenteredTitle>
        <form className={css["form"]} onSubmit={handleSubmit}>
          <ReportPetTextField text="NOMBRE" name="name" type="text" />
          <DropZoneButton>Agregar/modificar foto</DropZoneButton>
          <Map />
          <p className={css["instructions"]}>
            Buscá un punto de referencia para reportar a tu mascota y apriete la
            tecla 'enter'. Puede ser una dirección, un barrio o una ciudad.
          </p>
          <span className={[css["status-message"], css[status.type]].join(" ")}>
            {status.message}
          </span>
          <FormButton>Guardar</FormButton>
          <TertiaryButton action={goHome}>Cancelar</TertiaryButton>
        </form>
      </div>
    </div>
  );
}
