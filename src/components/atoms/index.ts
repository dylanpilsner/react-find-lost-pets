import { pullNearLostPets } from "../../lib/api";
import { atom, selector, useRecoilState } from "recoil";

const userLocationState = atom({
  key: "userLocation",
  default: {},
});

const resultsState = selector({
  key: "searchResults",
  get: async ({ get }) => {
    const userLocation = get(userLocationState);

    console.log(userLocation);
  },
});

export function useUserLocation() {
  const [userLoc, setUserLoc] = useRecoilState(userLocationState);

  // setUserLoc({
  //   geolocation: {
  //     lat,
  //     lng,
  //   },
  // });
  console.log(userLoc);
  return 1;
}

export function useSearchResults() {
  const [userLoc, setUserLoc] = useRecoilState(userLocationState);
}
