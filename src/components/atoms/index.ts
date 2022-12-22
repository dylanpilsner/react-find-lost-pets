import { pullNearLostPets } from "../../lib/api";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";

function setDefaultLocationState() {
  const userLocation = JSON.parse(localStorage.getItem("saved-location")!);
  const defaultUserLocation = userLocation
    ? userLocation
    : { geolocation: { lat: 0, lng: 0 } };

  return defaultUserLocation;
}

const userLocationState = atom({
  key: "userLocation",
  default: setDefaultLocationState(),
});
const modalStatusState = atom({
  key: "modalStatus",
  default: false,
});

const resultsState = selector({
  key: "searchResults",
  get: async ({ get }) => {
    const userLocation = get(userLocationState);

    const nearLostPets = await pullNearLostPets(
      userLocation.geolocation.lat,
      userLocation.geolocation.lng
    );

    return nearLostPets;
  },
});

export function useModalStatus() {
  const [modalStatus, setModalStatus] = useRecoilState(modalStatusState);

  if (setModalStatus) {
    setModalStatus(false);
  } else {
    setModalStatus(true);
  }
}

export function useSearchResults() {
  const nearLostPets = useRecoilValue(resultsState);

  return nearLostPets;
}

export { userLocationState, modalStatusState };
