const API_URL = "https://6a0ddcdd769682b8ee76f55b.mockapi.io/reservas";

export const getReservations = async () => {

  const response = await fetch(API_URL);

  return await response.json();

};

export const createReservation = async (reservation) => {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reservation)
  });

  return await response.json();

};

export const deleteReservation = async (id) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  return await response.json();

};

export const updateReservation = async (id, data) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await response.json();

};
//¿Por qué separar services? evita repetir fetch--mantiene componentes limpios--mejor organización