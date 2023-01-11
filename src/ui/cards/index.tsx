import React from "react";
import css from "./cards.css";

import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  modalStatusState,
  selectedPetState,
  toEditPetState,
} from "../../components/atoms";

function HomeCard(petData: {
  name: string;
  petLocation: string;
  pictureURL: string;
  userId: number;
}) {
  const [modalStatus, setModalStatus] = useRecoilState(modalStatusState);
  const setSelectedPet = useSetRecoilState(selectedPetState);

  function selectPet() {
    setSelectedPet({
      name: petData.name,
      userId: petData.userId,
      pictureURL: petData.pictureURL,
    });
  }

  function toggleModal() {
    if (!modalStatus) {
      setModalStatus(true);
    } else {
      setModalStatus(false);
    }
  }
  return (
    <div className={css["card"]}>
      <div className={css["img-container"]}>
        <img className={css["pet-image"]} src={petData.pictureURL} />
        <div className={css["pet-information"]}>
          <div className={css["main-information-container"]}>
            <h1 className={css["pet-name"]}>{petData.name}</h1>
            <span className={css["pet-location"]}>{petData.petLocation}</span>
          </div>
          <div className={css["report-information-container"]}>
            <span
              className={css["report-information-link"]}
              onClick={() => {
                toggleModal();
                selectPet();
              }}
            >
              REPORTAR <br />
              INFORMACIÓN
            </span>
            <span className={css["invisible-id"]}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportedPetCard(petData: {
  pictureURL: string;
  name: string;
  petLocation: string;
  status: string;
  lat: number;
  lng: number;
  id: number;
}) {
  const navigate = useNavigate();
  const setToEditPet = useSetRecoilState(toEditPetState);

  const statusEl =
    petData.status == "lost" ? (
      <span className={[css["status"], css["lost"], css["span"]].join(" ")}>
        Perdido
      </span>
    ) : (
      <span className={[css["status"], css["found"], css["span"]].join(" ")}>
        Encontrado
      </span>
    );

  function handleClick() {
    setToEditPet({
      name: petData.name,
      point_of_reference: petData.petLocation,
      pictureURL: petData.pictureURL,
      coordinates: { lat: petData.lat, lng: petData.lng },
      status: petData.status,
      id: petData.id,
    });

    localStorage.setItem(
      "saved-to-edit-pet",
      JSON.stringify({
        name: petData.name,
        point_of_reference: petData.petLocation,
        pictureURL: petData.pictureURL,
        coordinates: { lat: petData.lat, lng: petData.lng },
        status: petData.status,
        id: petData.id,
      })
    );

    navigate("/edit-pet");
  }

  return (
    <div className={css["card"]}>
      <div className={css["img-container"]}>
        <img className={css["pet-image"]} src={petData.pictureURL} />
        <div className={css["pet-information"]}>
          <div className={css["main-information-container"]}>
            <h1 className={css["pet-name"]}>{petData.name}</h1>
            <span className={css["pet-location"]}>{petData.petLocation}</span>
          </div>
          <div className={css["edit-information"]}>
            <img
              className={css["edit"]}
              onClick={handleClick}
              src="./src/assets/edit.png"
            />
            <p className={css["status"]}>Estado: {statusEl}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HomeCard, ReportedPetCard };
