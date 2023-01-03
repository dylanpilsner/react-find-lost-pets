import React, { useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN } from "../../lib/mapbox";
import css from "./map.css";
import "mapbox-gl/dist/mapbox-gl.css";

export function Map() {
  const mapContainer: any = useRef();
  useEffect(() => {
    new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      accessToken: MAPBOX_TOKEN,
    });
    const controlContainer = mapContainer.current.children[2];

    controlContainer.remove();
  }, []);

  return (
    <div className={css["container"]}>
      <div
        className={css["map"]}
        ref={mapContainer}
        style={{ width: "100%", height: "250px" }}
      ></div>
    </div>
  );
}
