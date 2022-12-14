import React from "react";
import { Title, Paragraph } from "../../ui/texts";
import { LocationButton } from "../../ui/buttons";
import { HomeCard } from "../../ui/cards";
import { CardResults } from "../../components/card-results";

import css from "./home.css";

function Home() {
  return (
    <div className={css["home-container"]}>
      <Title>Mascotas perdidas cerca tuyo</Title>
      <Paragraph>
        Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
        conocer tu ubicación.
      </Paragraph>
      <LocationButton>Dar mi ubicación</LocationButton>

      <CardResults />
    </div>
  );
}

export { Home };
