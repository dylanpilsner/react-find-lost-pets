import React from "react";
import css from "./buttons.css";
import { useUserLocation } from "../../components/atoms";

function LocationButton({ children }) {
  const userLocation = useUserLocation(1, 2);

  function handleOnClick() {
    navigator.geolocation.getCurrentPosition((geoposition) => {
      const lat = geoposition.coords.latitude;
      const lng = geoposition.coords.longitude;
    });
  }

  return (
    <div className={css["button-container"]}>
      <button
        className={css["main-button"]}
        onClick={() => {
          userLocation;
        }}
      >
        {children}
      </button>
    </div>
  );
}
export { LocationButton };
