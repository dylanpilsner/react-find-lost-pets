import React, { useEffect, useState } from "react";
import {
  useNearLostPetsResults,
  useGetMyPets,
  userLocationState,
} from "../atoms";
import css from "./card-results.css";
import { HomeCard, ReportedPetCard } from "../../ui/cards";
import { Modal } from "../../ui/modal";
import { useRecoilValue } from "recoil";
import { selectedPetState } from "../atoms";

function HomeCardResults() {
  const nearLostPets = useNearLostPetsResults();
  const location = useRecoilValue(userLocationState);
  const selectedPet = useRecoilValue(selectedPetState);
  const noNearLostPets =
    nearLostPets.length == 0 &&
    location.geolocation.lat != 0 &&
    location.geolocation.lng != 0 ? (
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

  useEffect(() => {
    // cualquier código que quieres ejecutar cuando myPetsCardResults cambie
    console.log(myPetsCardResults);
  }, [myPetsCardResults]);

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
                lat={i.last_location_lat}
                lng={i.last_location_lng}
                id={i.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { HomeCardResults, MyPetsCardResults };
