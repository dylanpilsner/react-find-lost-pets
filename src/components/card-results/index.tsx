import React, { useState } from "react";
import { useSearchResults } from "../atoms";
import css from "./card-results.css";
import { HomeCard } from "../../ui/cards";
import { Modal } from "../../ui/modal";
import { useRecoilValue } from "recoil";
import { selectedPetState } from "../atoms";

function CardResults() {
  const nearLostPets = useSearchResults();
  const selectedPet = useRecoilValue(selectedPetState);
  const noNearLostPets =
    nearLostPets.length == 0 ? (
      <h3 style={{ textAlign: "center" }}>
        No hay mascotas perdidas cerca de tu ubicación
      </h3>
    ) : null;

  return (
    <div className="results">
      {noNearLostPets}
      <div className={css["card-container"]}>
        {nearLostPets.map((i) => {
          return (
            <div key={i.id}>
              <HomeCard
                name={i.name}
                petLocation={i.point_of_reference}
                pictureURL={i.pictureURL}
                userId={i.userId}
              />
            </div>
          );
        })}
      </div>
      <Modal
        name={selectedPet.name}
        userId={selectedPet.userId}
        pictureURL={selectedPet.pictureURL}
      />
    </div>
  );
}

export { CardResults };
