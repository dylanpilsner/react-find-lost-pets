import React from "react";
import { EditPetForm } from "../../components/forms";
import { Header } from "../../components/header";
import css from "./edit-pet.css";

export function EditPetPage() {
  return (
    <div>
      <Header />
      <div className={css["report-pet-page-container"]}>
        <EditPetForm />
      </div>
    </div>
  );
}
