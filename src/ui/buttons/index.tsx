import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import css from "./buttons.css";
import Dropzone from "dropzone";
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

function DropZoneButton(props: {
  children: string;
  action?;
  imgContainer: ReactElement;
}) {
  const buttonEl = useRef();
  const imgEl: any = useRef();
  const [test, setTest] = useState([]);

  setTimeout(() => {
    console.log(imgEl.current.children.length);

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
  }, 20);

  console.log(test);

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

  function handleClick(e) {
    e.preventDefault();
    if (props.action) {
      props.action();
    }
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

export {
  LocationButton,
  FormButton,
  MainButton,
  SecondaryButton,
  TertiaryButton,
  GoHomeButton,
  DropZoneButton,
};
