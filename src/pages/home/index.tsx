import React, { useEffect } from "react";
import { Title, Paragraph } from "../../ui/texts";
import { LocationButton } from "../../ui/buttons";
import { CardResults } from "../../components/card-results";
import { Header } from "../../components/header";
import { redirectState } from "../../components/atoms";
import { useRecoilState } from "recoil";

import css from "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [redirect, setRedirect] = useRecoilState(redirectState);
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
        <CardResults />
      </div>
    </div>
  );
}

export { Home };
