import { getMyPets, pullNearLostPets, pullProfile } from "../../lib/api";
import { atom, selector, useRecoilValue } from "recoil";

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
function setDefaultToEditPet() {
  const toEditPet = JSON.parse(localStorage.getItem("saved-to-edit-pet"));
  const defaultRedirect = toEditPet
    ? toEditPet
    : {
        name: null,
        pictureURL: null,
        point_of_reference: null,
        coordinates: {
          lat: null,
          lng: null,
        },
        status: null,
        id: null,
      };

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

const toEditPetState = atom({
  key: "toEditPet",
  default: setDefaultToEditPet(),
});

const pointOfReferenceState = atom({
  key: "pointOfReference",
  default: null,
});

const userDataState = atom({
  key: "userData",
  default: setDefaultUserData(),
});

const redirectState = atom({
  key: "redirect",
  default: setDefaultRedirect(),
});

const petPicState = atom({
  key: "petPic",
  default: null,
});

const petLastLocationState = atom({
  key: "petLastLocation",
  default: {
    lng: null,
    lat: null,
  },
});

const nearLostPetsResults = selector({
  key: "nearLostPetsResults",
  get: async ({ get }) => {
    const userLocation = get(userLocationState);

    const nearLostPets = await pullNearLostPets(
      userLocation.geolocation.lat,
      userLocation.geolocation.lng
    );

    return nearLostPets;
  },
});

const myReportedPetsResults = selector({
  key: "myReportedPetsResults",
  get: async ({ get }) => {
    const userData = get(userDataState);
    const myReportedPets = await getMyPets(userData.token);

    return myReportedPets;
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

export function useNearLostPetsResults() {
  const nearLostPets = useRecoilValue(nearLostPetsResults);

  return nearLostPets;
}
export function useGetMyPets() {
  const myReportedPets = useRecoilValue(myReportedPetsResults);

  return myReportedPets;
}

export {
  userLocationState,
  modalStatusState,
  selectedPetState,
  userDataState,
  redirectState,
  petPicState,
  petLastLocationState,
  pointOfReferenceState,
  toEditPetState,
};
