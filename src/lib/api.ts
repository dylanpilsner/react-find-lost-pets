const API_BASE_URL = "https://find-lost-pets.onrender.com";
// const API_BASE_URL = "http://localhost:3000";

async function pullNearLostPets(lat: number, lng: number) {
  const res = await fetch(
    `${API_BASE_URL}/near-lost-pets?lat=${lat}&lng=${lng}`
  );
  const data = await res.json();

  return data;
}

export { pullNearLostPets };
