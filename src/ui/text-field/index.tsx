import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { petLastLocationState, useProfileData } from "../../components/atoms";
import * as mapboxgl from "mapbox-gl";
import css from "./text-field.css";
import { MAPBOX_TOKEN } from "../../lib/mapbox";

export function ModalTextField(props: {
  text: string;
  name: string;
  type: string;
}) {
  return (
    <label className={css["form-label"]}>
      <div className={css["field-label"]}>{props.text}</div>
      <input
        type={props.type}
        className={css["form-input"]}
        name={props.name}
        required
      />
    </label>
  );
}
export function ModalTextAreaField(props: { text: string; name: string }) {
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

export function MainTextField(props: {
  text: string;
  name: string;
  type: string;
}) {
  return (
    <label className={css["main-form-label"]}>
      <div className={css["field-label"]}>{props.text}</div>
      <input
        type={props.type}
        className={css["main-form-input"]}
        name={props.name}
        required
      />
    </label>
  );
}

export function EditProfileTextField(props: {
  text: string;
  name: string;
  type: string;
  editable: boolean;
  onEdit?: () => any;
}) {
  const profileData = useProfileData();
  const inputEl: any = useRef();

  function handleClick() {
    props.onEdit();
  }

  const editableEl = props.editable ? (
    <img
      onClick={handleClick}
      className={css["edit"]}
      src="./src/assets/edit.png"
    />
  ) : null;

  setTimeout(() => {
    if (props.name == "name") {
      inputEl.current.value = profileData["first_name"];
    } else {
      inputEl.current.value = profileData["password"].slice(0, 10);
    }
  }, 20);

  return (
    <label className={css["edit-profile-form-label"]}>
      <div className={css["edit-container"]}>
        <div className={css["field-label"]}>{props.text}</div>
        {editableEl}
      </div>
      <input
        ref={inputEl}
        type={props.type}
        className={css["edit-profile-form-input"]}
        name={props.name}
        required
        readOnly
      />
    </label>
  );
}

export function ReportPetTextField(props: {
  text: string;
  name: string;
  type: string;
}) {
  return (
    <label className={css["main-form-label"]}>
      <div className={css["field-label"]}>{props.text}</div>
      <input
        type={props.type}
        className={css["main-form-input"]}
        name={props.name}
      />
    </label>
  );
}

export function SearchLocationTextField(props: {
  text: string;
  name: string;
  type: string;
  onSearchLocation;
}) {
  function handleKeyDown(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      props.onSearchLocation(e.target.value);
    }
  }

  return (
    <label className={css["main-form-label"]}>
      <div className={css["field-label"]}>{props.text}</div>
      <input
        onKeyDown={handleKeyDown}
        type={props.type}
        className={css["main-form-input"]}
      />
    </label>
  );
}
