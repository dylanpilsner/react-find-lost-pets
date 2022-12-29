import React from "react";
import { Header } from "../../components/header";
import { CenteredTitle } from "../../ui/texts";
import { MyPetsCardResults } from "../../components/card-results";
import css from "./reported-pets.css";

export function ReportedPetsPage() {
  return (
    <div>
      <Header />
      <section className={css["reported-pets-container"]}>
        <CenteredTitle>Mis mascotas reportadas</CenteredTitle>
        <MyPetsCardResults />
      </section>
    </div>
  );
}
