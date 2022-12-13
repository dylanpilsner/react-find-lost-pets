import React from "react";
import css from "./index.css";

export function TextField(props) {
  return <input {...props} className={css.root} />;
}
