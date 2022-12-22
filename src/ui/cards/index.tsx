import React from "react";
import css from "./cards.css";
import { modalStatusState } from "../../components/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

function HomeCard(petData: {
  name: string;
  petLocation: string;
  pictureURL: string;
}) {
  const [modalStatus, setModalStatus] = useRecoilState(modalStatusState);

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
              onClick={toggleModal}
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

export { HomeCard };
