import React, { useState } from "react";
import { useSearchResults } from "../atoms";
import css from "./card-results.css";
import { HomeCard } from "../../ui/cards";
import { Modal } from "../../ui/modal";

function CardResults() {
  const [modalStatus, setModalStatus] = useState(false);

  const nearLostPets = useSearchResults();

  function test() {
    if (!modalStatus) {
      setModalStatus(true);
    } else {
      setModalStatus(false);
    }
  }

  return (
    <div className={css["card-container"]}>
      {nearLostPets.map((i) => {
        return (
          <div key={i.id}>
            <h1 onClick={test}>CLICKEAME</h1>
            <HomeCard
              name={i.name}
              petLocation={i.point_of_reference}
              pictureURL={i.pictureURL}
            />
            <Modal isActive={modalStatus} />
          </div>
        );
      })}
    </div>
  );
}

export { CardResults };
