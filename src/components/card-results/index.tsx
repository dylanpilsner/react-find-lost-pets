import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchResults } from "../atoms";
import css from "./card-results.css";
import { HomeCard } from "../../ui/cards";

function CardResults() {
  const nearLostPets = useSearchResults();
  console.log(nearLostPets);

  return (
    <div className={css["card-container"]}>
      {nearLostPets.map((i) => {
        return (
          <HomeCard
            name={i.name}
            petLocation={i.point_of_reference}
            pictureURL={i.pictureURL}
            key={i.id}
          />
        );
      })}
    </div>
  );
}

export { CardResults };
