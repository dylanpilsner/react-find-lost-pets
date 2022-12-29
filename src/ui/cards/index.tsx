import React from "react";
import css from "./cards.css";
import { modalStatusState, selectedPetState } from "../../components/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

function HomeCard(petData: {
  name: string;
  petLocation: string;
  pictureURL: string;
  userId: number;
}) {
  const [modalStatus, setModalStatus] = useRecoilState(modalStatusState);
  const [selectedPet, setSelectedPet] = useRecoilState(selectedPetState);

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

function ReportedPetCard(petData: { pictureURL; name; petLocation }) {
  const navigate = useNavigate();

  function handleClick() {
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
            <p className={css["status"]}>
              Estado:
              <span className={css["status"]}> Encontrado</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HomeCard, ReportedPetCard };
