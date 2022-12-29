import { pullNearLostPets, pullProfile } from "../../lib/api";
import { atom, selector, useRecoilValue } from "recoil";
import { useEffect } from "react";

function setDefaultLocationState() {
  const userLocation = JSON.parse(localStorage.getItem("saved-location"));
  const defaultUserLocation = userLocation
    ? userLocation
    : { geolocation: { lat: 0, lng: 0 } };

  return defaultUserLocation;
}
function setDefaultUserData() {
  const userData = JSON.parse(localStorage.getItem("saved-user-data"));
  const defaultUserData = userData ? userData : { email: null, token: null };

  return defaultUserData;
}
function setDefaultRedirect() {
  const redirect = JSON.parse(localStorage.getItem("saved-redirect"));
  const defaultRedirect = redirect ? redirect : "/";

  return defaultRedirect;
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

const userDataState = atom({
  key: "userData",
  default: setDefaultUserData(),
});

const redirectState = atom({
  key: "redirect",
  default: setDefaultRedirect(),
});

const results = selector({
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

const profileData = selector({
  key: "profileData",
  get: async ({ get }) => {
    const userData = get(userDataState);

    const profileData = await pullProfile(userData.token);

    return profileData;
  },
});

export function useProfileData() {
  const pulledProfile = useRecoilValue(profileData);

  return pulledProfile;
}

export function useSearchResults() {
  const nearLostPets = useRecoilValue(results);

  return nearLostPets;
}

export {
  userLocationState,
  modalStatusState,
  selectedPetState,
  userDataState,
  redirectState,
};
