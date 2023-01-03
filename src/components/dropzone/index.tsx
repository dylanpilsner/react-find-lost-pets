import React, { ReactElement, useEffect, useRef, useState } from "react";
import Dropzone from "dropzone";
import css from "./dropzone.css";

export function DropZoneButton(props: {
  children: string;
  imgContainer: ReactElement;
}) {
  const buttonEl = useRef();
  const imgEl: any = useRef();
  const [test, setTest] = useState([]);

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
        const pic = file.dataURL;
        setTest([...imgEl.current.children]);
      });
    }

    if (test.length > 1) {
      test[0].remove();
    }

    if (test.length > 0) {
      test[test.length - 1].children[1].remove();
      test[test.length - 1].children[4].remove();
      test[test.length - 1].children[3].remove();
      test[test.length - 1].classList.add(css["dz-image"]);
      test[test.length - 1].children[0].classList.add(css["dz-image"]);
    }
  }, [test]);

  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <div className={css["dropzone-container"]}>
      <div className={css["img-container"]}>
        <div ref={imgEl} className={css["img"]}></div>
      </div>
      <div className={css["button-container"]}>
        <button
          onClick={handleClick}
          ref={buttonEl}
          className={[css["button"], css["secondary"]].join(" ")}
        >
          {props.children}
        </button>
      </div>
    </div>
  );
}
