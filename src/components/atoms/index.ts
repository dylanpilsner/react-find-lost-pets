import { pullNearLostPets, sendLastSeenReport } from "../../lib/api";
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

const selectedPetState = atom({
  key: "selectedPet",
  default: {
    name: "",
    userId: 0,
    pictureURL: "",
  },
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

const reportedPetState = selector({
  key: "reportPet",
  get: async ({ get }) => {
    const selectedPet = get(selectedPetState);

    const sendedReport = await sendLastSeenReport(1, "1", "1", 1, "123");
    return sendedReport;
  },
});

export function useTest() {
  const test = useRecoilValue(reportedPetState);

  return test;
}

export function useSearchResults() {
  const nearLostPets = useRecoilValue(resultsState);

  return nearLostPets;
}

export { userLocationState, modalStatusState, selectedPetState };
