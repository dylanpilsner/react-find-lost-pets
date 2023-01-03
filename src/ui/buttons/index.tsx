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
  };

  return (
    <div className={css["button-container"]}>
      <button
        className={[css["button"], css["main"]].join(" ")}
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
}

function FormButton(props: { children }) {
  return (
    <div className={css["button-container"]}>
      <button className={[css["button"], css["main"]].join(" ")}>
        {props.children}
      </button>
    </div>
  );
}

function MainButton(props: { children: string; action? }) {
  function handleClick(e) {
    e.preventDefault();
    props.action();
  }

  return (
    <div className={css["button-container"]}>
      <button
        className={[css["button"], css["main"]].join(" ")}
        onClick={handleClick}
      >
        {props.children}
      </button>
    </div>
  );
}

function SecondaryButton(props: { children: string; action? }) {
  function handleClick(e) {
    e.preventDefault();
    props.action();
  }

  return (
    <div className={css["button-container"]}>
      <button
        className={[css["button"], css["secondary"]].join(" ")}
        onClick={handleClick}
      >
        {props.children}
      </button>
    </div>
  );
}

function TertiaryButton(props: { children: string; action? }) {
  function handleClick(e) {
    e.preventDefault();
    props.action();
  }

  return (
    <div className={css["button-container"]}>
      <button
        className={[css["button"], css["tertiary"]].join(" ")}
        onClick={handleClick}
      >
        {props.children}
      </button>
    </div>
  );
}

function GoHomeButton(props: { children: string; action? }) {
  function handleClick(e) {
    e.preventDefault();
    props.action();
  }

  return (
    <div className={css["button-container"]}>
      <button
        className={[css["button"], css["secondary"]].join(" ")}
        onClick={handleClick}
      >
        {props.children}
      </button>
    </div>
  );
}

export {
  LocationButton,
  FormButton,
  MainButton,
  SecondaryButton,
  TertiaryButton,
  GoHomeButton,
};
