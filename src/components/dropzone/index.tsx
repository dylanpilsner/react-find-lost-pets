import React, { ReactElement, useEffect, useRef, useState } from "react";
import Dropzone from "dropzone";
import css from "./dropzone.css";
import { useRecoilState } from "recoil";
import { petPicState } from "../atoms";

export function DropZoneButton(props: { children: string }) {
  const buttonEl = useRef();
  const imgEl: any = useRef();
  const [imgElChildren, setImgElChildren] = useState([]);
  const [petPic, setPetPic] = useRecoilState(petPicState);

  useEffect(() => {
    if (imgEl.current.children.length == 0) {
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
        <div ref={imgEl} className={css["img"]}></div>
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
