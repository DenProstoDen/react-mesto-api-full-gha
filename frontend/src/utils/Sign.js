export const BASE_URL = "export const BASE_URL = 'api.mesto.cohort77.nomoredomainsmonster.ru";

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

function request(url, options) {
  return fetch(`${BASE_URL}${url}`, options).then(getResponse);
}

export const register = (email, password) => {
  return request(`/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const login = (email, password) => {
  return request(`/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const getContent = (token) => {
  return request(`/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => getResponse(res))
}