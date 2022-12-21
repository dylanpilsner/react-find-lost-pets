import React from "react";
import css from "./text-field.css";

export function TextField(props: { text: string; name: string }) {
  return (
    <label className={css["form-label"]}>
      <div className={css["field-label"]}>{props.text}</div>
      <input
        type="text"
        className={css["form-input"]}
        name={props.name}
        required
      />
    </label>
  );
}
export function TextAreaField(props: { text: string; name: string }) {
  return (
    <label className={css["form-label"]}>
      <div className={css["field-label"]}>{props.text}</div>
      <textarea
        className={css["form-textarea"]}
        name={props.name}
        required
      ></textarea>
    </label>
  );
}
