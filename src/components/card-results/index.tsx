import React, { useState } from "react";
import { useNearLostPetsResults, useGetMyPets } from "../atoms";
import css from "./card-results.css";
import { HomeCard, ReportedPetCard } from "../../ui/cards";
import { Modal } from "../../ui/modal";
import { useRecoilValue } from "recoil";
import { selectedPetState } from "../atoms";

function HomeCardResults() {
  const nearLostPets = useNearLostPetsResults();
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

function MyPetsCardResults() {
  const myPetsCardResults = useGetMyPets();

  return (
    <div>
      <div className={css["card-container"]}>
        {myPetsCardResults.map((i) => {
          return (
            <div key={i.id}>
              <ReportedPetCard
                pictureURL={i.pictureURL}
                name={i.name}
                petLocation={i.point_of_reference}
                status={i.status}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { HomeCardResults, MyPetsCardResults };
