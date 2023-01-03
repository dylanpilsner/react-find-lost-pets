import React, { useEffect, useRef } from "react";
import { Header } from "../../components/header";
import { DropZoneButton, FormButton, TertiaryButton } from "../../ui/buttons";
import { MainTextField } from "../../ui/text-field";
import { CenteredTitle } from "../../ui/texts";
import { Map } from "../../ui/map";
import css from "./report-pet.css";

export function ReportPetPage() {
  const imgContainer = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <Header />
      <div className={css["report-pet-page-container"]}>
        <CenteredTitle>Reportar mascota perdida</CenteredTitle>
        <form className={css["form"]} onSubmit={handleSubmit}>
          <MainTextField text="NOMBRE" name="name" type="text" />

          {/* <div className={css["img-container"]}>
            <div ref={imgContainer} className={css["img"]}></div>
          </div> */}
          <DropZoneButton imgContainer={imgContainer.current}>
            Agregar/modificar foto
          </DropZoneButton>
          <Map />
          <MainTextField text="UBICACIÓN" name="ubication" type="text" />

          <p className={css["instructions"]}>
            Buscá un punto de referencia para reportar a tu mascota. Puede ser
            una dirección, un barrio o una ciudad.
          </p>
          <span className={css["status-message"]}></span>
          <FormButton>Guardar</FormButton>
          <TertiaryButton>Cancelar</TertiaryButton>
          {/* <SecondaryButton>Ir a la home</SecondaryButton> */}
        </form>
      </div>
    </div>
  );
}
