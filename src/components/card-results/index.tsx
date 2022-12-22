import React, { useState } from "react";
import { useSearchResults } from "../atoms";
import css from "./card-results.css";
import { HomeCard } from "../../ui/cards";
import { Modal } from "../../ui/modal";
import { modalStatusState } from "../atoms";
import { useRecoilState } from "recoil";

function CardResults() {
  const [modalStatus, setModalStatus] = useRecoilState(modalStatusState);
  const [selectedPet, setSelectedPet] = useState({ name: "" });

  function selectPet(newData) {
    setSelectedPet({ name: newData });
  }

  const nearLostPets = useSearchResults();

  function test() {
    if (!modalStatus) {
      setModalStatus(true);
    } else {
      setModalStatus(false);
    }
  }

  return (
    <div className="results">
      <div className={css["card-container"]}>
        {nearLostPets.map((i) => {
          return (
            <div key={i.id}>
              <HomeCard
                name={i.name}
                petLocation={i.point_of_reference}
                pictureURL={i.pictureURL}
              />
            </div>
          );
        })}
      </div>
      <Modal name={selectedPet.name} />
    </div>
  );
}

export { CardResults };
