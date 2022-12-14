import React from "react";
import css from "./cards.css";

function HomeCard() {
  return (
    <div className={css["card"]}>
      <div className={css["img-container"]}>
        <img className={css["pet-image"]} src="${i.pictureURL}" />
        <div className={css["pet-information"]}>
          <div className={css["main-information-container"]}>
            <h1 className={css["pet-name"]}>TEST</h1>
            <span className={css["pet-location"]}>TEST</span>
          </div>
          <div className={css["report-information-container"]}>
            <span className={css["report-information-link"]}>
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
