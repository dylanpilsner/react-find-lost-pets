import React, { useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN } from "../../lib/mapbox";

function initMap(container) {}

export function Map() {
  const mapContainer = useRef();
  const token =
    "pk.eyJ1IjoiZHlsYW5kZXYiLCJhIjoiY2xiMDNtbHBnMWZxazN2bnBvczJ5MnU0MyJ9.amcslgDMLVFcS3PrmpPSMA";

  useEffect(() => {
    mapboxgl.accessToken = token;
    Object.defineProperty(mapboxgl, "accessToken", {
      value: "YOUR_ACCESS_TOKEN_HERE",
      // writable: true,
      // enumerable: true,
      configurable: true,
    });
    // console.log(mapboxgl.accessToken);

    // mapboxgl.accessToken = token;
    // new mapboxgl.Map({
    //   container: mapContainer.current,
    //   style: "mapbox://styles/mapbox/streets-v11",
    // });
  }, []);

  return <div className="map" ref={mapContainer}></div>;
}
