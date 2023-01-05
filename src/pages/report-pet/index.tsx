import React, { useEffect, useRef } from "react";
import { Header } from "../../components/header";
import { FormButton, TertiaryButton } from "../../ui/buttons";
import { MainTextField, ReportPetTextField } from "../../ui/text-field";
import { CenteredTitle } from "../../ui/texts";
import { Map } from "../../components/map";
import { DropZoneButton } from "../../components/dropzone";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { petPicState } from "../../components/atoms";
import css from "./report-pet.css";

export function ReportPetPage() {
  const navigate = useNavigate();
  const petPic = useRecoilValue(petPicState);

  function handleSubmit(e) {
    e.preventDefault();
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
            Buscá un punto de referencia para reportar a tu mascota. Puede ser
            una dirección, un barrio o una ciudad.
          </p>
          <span className={css["status-message"]}></span>
          <FormButton>Guardar</FormButton>
          <TertiaryButton action={goHome}>Cancelar</TertiaryButton>
        </form>
      </div>
    </div>
  );
}
