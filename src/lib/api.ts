// const API_BASE_URL = "https://find-lost-pets.onrender.com";
const API_BASE_URL = "http://localhost:3000";

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

async function verifyEmail(email: string) {
  const res = await fetch(`${API_BASE_URL}/verify-user`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  return data.verifiedEmail;
}

async function signIn(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/user/token`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  return data;
}

async function recoverPassword(email: string) {
  const res = await fetch(`${API_BASE_URL}/recover-password`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

async function signUp(email: string, first_name: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/user`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, first_name, password }),
  });
  const data = await res.json();
}

async function pullProfile(token) {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}

async function updateName(first_name: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/update-name`, {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ first_name }),
  });
}

async function updatePassword(password: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/update-password`, {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });
  const data = await res.json();
  return data;
}

async function getMyPets(token: string) {
  const res = await fetch(`${API_BASE_URL}/get-my-reported-pets`, {
    headers: {
      authorization: `bearer ${token}`,
    },
  });
  const data = await res.json();

  return data;
}

export {
  pullNearLostPets,
  sendLastSeenReport,
  verifyEmail,
  signIn,
  recoverPassword,
  signUp,
  pullProfile,
  updateName,
  updatePassword,
  getMyPets,
};
