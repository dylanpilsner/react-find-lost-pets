import React from "react";
import { Header } from "../../components/header";
import { CenteredTitle } from "../../ui/texts";

import css from "./report-pet.css";

import { ReportPetForm } from "../../components/forms";

export function ReportPetPage() {
  return (
    <div>
      <Header />
      <div className={css["report-pet-page-container"]}>
        <CenteredTitle>Reportar mascota perdida</CenteredTitle>
        <ReportPetForm />
      </div>
    </div>
  );
}
