import React from "react";
import css from "./buttons.css";
import { userLocationState } from "../../components/atoms";
import { useRecoilState } from "recoil";

function LocationButton({ children }) {
  const [userLoc, setUserLoc] = useRecoilState(userLocationState);
  const handleClick = () => {
    const geolocation = navigator.geolocation.getCurrentPosition(
      (geoposition) => {
        const lat = geoposition.coords.latitude;
        const lng = geoposition.coords.longitude;
        setUserLoc({ geolocation: { lat, lng } });
        localStorage.setItem(
          "saved-location",
          JSON.stringify({ geolocation: { lat, lng } })
        );
      }
    );
    console.log(userLoc);
  };

  return (
    <div className={css["button-container"]}>
      <button className={css["main-button"]} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}

function SendReportButton({ children }) {
  function handleClick(e) {
    e.preventDefault();
    console.log("hola");
  }

  return (
    <div className={css["button-container"]}>
      <button className={css["main-button"]} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}

export { LocationButton, SendReportButton };
