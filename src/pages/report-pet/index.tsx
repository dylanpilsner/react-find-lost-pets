import React from "react";
import { Header } from "../../components/header";
import { FormButton } from "../../ui/buttons";
import { MainTextField } from "../../ui/text-field";
import { CenteredTitle } from "../../ui/texts";
import { Map } from "../../ui/map";
import css from "./report-pet.css";

export function ReportPetPage() {
  return (
    <div>
      <Header />
      <div className={css["report-pet-page-container"]}>
        <CenteredTitle>Reportar mascota perdida</CenteredTitle>
        <form className={css["form"]}>
          <MainTextField text="NOMBRE" name="name" type="text" />

          <div className={css["img-container"]}>
            <div className={css["img"]}></div>
          </div>
          <FormButton>Agregar/Modificar foto</FormButton>
          <Map />
          <MainTextField text="UBICACIÓN" name="ubication" type="text" />

          <p className={css["instructions"]}>
            Buscá un punto de referencia para reportar a tu mascota. Puede ser
            una dirección, un barrio o una ciudad.
          </p>
          <span className={css["status-message"]}></span>
          <FormButton>Guardar</FormButton>
          <FormButton>Cancelar</FormButton>
          {/* <FormButton>Ir a la home</FormButton> */}
        </form>
      </div>
    </div>
  );
}
