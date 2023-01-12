import React, { useEffect, useRef, useState } from "react";
import Dropzone from "dropzone";
import css from "./dropzone.css";
import { useSetRecoilState } from "recoil";
import { petPicState } from "../atoms";

export function DropZoneButton(props: {
  children: string;
  defaultValue?: string;
}) {
  const buttonEl = useRef();
  const imgEl: any = useRef();
  const [imgElChildren, setImgElChildren] = useState([]);
  const setPetPic = useSetRecoilState(petPicState);

  const defaultImg = props.defaultValue ? (
    <img
      className={[css["default-image"], "test"].join(" ")}
      src={props.defaultValue}
    />
  ) : null;

  useEffect(() => {
    // Funciona para la page report-pet, ya que no tiene una etiqueta img dentro del contenedor. Hace que Dropzone no se monte cada vez que subo una imagen y que arroje error
    if (
      imgEl.current.children.length < 1 &&
      location.pathname == "/report-pet"
    ) {
      const myDropzone = new Dropzone(buttonEl.current, {
        url: "/falsa",
        autoProcessQueue: false,
        thumbnailWidth: 350,
        thumbnailHeight: 145,
        previewsContainer: imgEl.current,
      });

      myDropzone.on("thumbnail", (file) => {
        setPetPic(file.dataURL);

        setImgElChildren([...imgEl.current.children]);
      });
    }

    // Funciona para la page edit-pet, al subir una nueva foto, remueve la etiqueta img y Dropzone no vuelve a cargarse nunca más dentro del contenedor, evitando que arroje errores.
    if (imgEl.current.children.length < 2 && location.pathname == "/edit-pet") {
      const myDropzone = new Dropzone(buttonEl.current, {
        url: "/falsa",
        autoProcessQueue: false,
        thumbnailWidth: 350,
        thumbnailHeight: 145,
        previewsContainer: imgEl.current,
      });

      myDropzone.on("thumbnail", (file) => {
        setPetPic(file.dataURL);

        setImgElChildren([...imgEl.current.children]);
      });
    }

    if (imgElChildren.length > 1) {
      imgElChildren[0].remove();
    }

    if (imgElChildren.length > 0) {
      imgElChildren[imgElChildren.length - 1].children[1].remove();
      imgElChildren[imgElChildren.length - 1].children[4].remove();
      imgElChildren[imgElChildren.length - 1].children[3].remove();
      imgElChildren[imgElChildren.length - 1].classList.add(css["dz-image"]);
      imgElChildren[imgElChildren.length - 1].children[0].classList.add(
        css["dz-image"]
      );
    }
  }, [imgElChildren]);

  function handleClick(e) {
    e.preventDefault();
  }

  function handleKeyDown(e) {
    if (e.keyCode == 13) {
      e.stopPropagation();
    }
  }

  return (
    <div className={css["dropzone-container"]}>
      <div className={css["img-container"]}>
        <div ref={imgEl} className={css["img"]}>
          {defaultImg}
        </div>
      </div>
      <div className={css["button-container"]}>
        <div
          className={[css["button"], css["secondary"]].join(" ")}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          <h1 ref={buttonEl} className={css["button-text"]}>
            {props.children}
          </h1>
        </div>
      </div>
    </div>
  );
}
