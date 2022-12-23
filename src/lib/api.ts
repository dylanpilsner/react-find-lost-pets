const API_BASE_URL = "https://find-lost-pets.onrender.com";
// const API_BASE_URL = "http://localhost:3000";
import { selectedPetState } from "../components/atoms";
import { useRecoilValue } from "recoil";

async function pullNearLostPets(lat: number, lng: number) {
  const res = await fetch(
    `${API_BASE_URL}/near-lost-pets?lat=${lat}&lng=${lng}`
  );
  const data = await res.json();

  return data;
}

async function sendLastSeenReport(
  phone: number,
  description: string,
  senderName: string,
  userId: number,
  petImage: string
) {
  const res = await fetch(`${API_BASE_URL}/report-last-seen`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      phone,
      description,
      senderName,
      userId,
      petImage,
    }),
  });
  const data = await res.json();

  return data;
}

export { pullNearLostPets, sendLastSeenReport };
