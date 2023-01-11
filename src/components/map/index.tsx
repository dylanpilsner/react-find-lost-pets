import React, { useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN } from "../../lib/mapbox";
import css from "./map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { MainTextField, SearchLocationTextField } from "../../ui/text-field";
import { mapboxClient } from "../../lib/mapbox";
import { useRecoilState } from "recoil";
import { petLastLocationState } from "../atoms";

export function Map(props: { defaultValue? }) {
  const mapContainer: any = useRef();
  const mapRef: any = useRef();
  const inputValue: any = useRef();
  const [lastLocationPet, setLastLocationPet] =
    useRecoilState(petLastLocationState);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      accessToken: MAPBOX_TOKEN,
    });
    const controlContainer = mapContainer.current.children[2];
    if (props.defaultValue) {
      map.setCenter(props.defaultValue);
      map.setZoom(17);
    }

    controlContainer.remove();
    mapRef.current = map;
  }, []);

  function setCoordinatesAndMarker(results) {
    const firstResult = results[0];
    const [lng, lat] = firstResult.geometry.coordinates;
    setLastLocationPet({ lng, lat });
    const marker = new mapboxgl.Marker()
      .setLngLat(firstResult.geometry.coordinates)
      .addTo();
    mapRef.current.setCenter(firstResult.geometry.coordinates);
    mapRef.current.setZoom(17);
  }

  function onSearchLocation(value) {
    if (value) {
      mapboxClient.geocodeForward(
        value,
        {
          country: "ar",
          autocomplete: true,
          language: "es",
        },
        function (err, data, res) {
          if (!err) setCoordinatesAndMarker(data.features);
        }
      );
    }
  }

  return (
    <div className={css["container"]}>
      <div className={css["map-container"]}>
        <div
          className={[css["map"], "map"].join(" ")}
          ref={mapContainer}
          style={{ width: "100%", height: "250px" }}
        ></div>
      </div>
      <SearchLocationTextField
        onSearchLocation={onSearchLocation}
        text="UBICACIÓN"
        name="ubication"
        type="text"
      />
    </div>
  );
}
