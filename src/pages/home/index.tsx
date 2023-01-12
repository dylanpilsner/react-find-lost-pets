import React, { useEffect } from "react";
import { Title, Paragraph } from "../../ui/texts";
import { LocationButton } from "../../ui/buttons";
import { HomeCardResults } from "../../components/card-results";
import { Header } from "../../components/header";
import { redirectState } from "../../components/atoms";
import { useSetRecoilState } from "recoil";

import css from "./home.css";

function Home() {
  const setRedirect = useSetRecoilState(redirectState);
  useEffect(() => {
    setRedirect("/");
  }, []);

  localStorage.setItem("saved-redirect", JSON.stringify("/"));

  return (
    <div>
      <Header />
      <div className={css["home-container"]}>
        <Title>Mascotas perdidas cerca tuyo</Title>
        <Paragraph>
          Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
          conocer tu ubicación.
        </Paragraph>
        <LocationButton>Dar mi ubicación</LocationButton>
        <HomeCardResults />
      </div>
    </div>
  );
}

export { Home };
