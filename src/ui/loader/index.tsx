import React from "react";
import css from "./loader.css";

function MainLoader() {
  return (
    <div
      className={[
        css["loadingio-spinner-spinner-ud9bmcq7e9"],
        css["main"],
      ].join(" ")}
    >
      <div className={css["ldio-7az8g223uuj"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
function SecondaryLoader(props: { active: boolean }) {
  const display = props.active ? "inline-block" : "none";

  return (
    <div
      style={{ display }}
      className={css["loadingio-spinner-spinner-ud9bmcq7e9"]}
    >
      <div className={css["ldio-7az8g223uuj"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export { MainLoader, SecondaryLoader };
