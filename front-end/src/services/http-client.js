import { getToken, isAuthenticated } from "./auth";

export const getAsync = async (endpoint, request = {}) => {
  isAuthenticated();
  let urlSearchParams = new URLSearchParams();
  Object.keys(request).forEach((key) => {
    urlSearchParams.append(key, request[key]);
  });

  

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}?${urlSearchParams}`,
      {
        method: "GET",
        headers: {
          "x-access-token": getToken(),
        },
      }
    );
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const postAsync = async (endpoint, request = {}) => {
  isAuthenticated();
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}`,

      {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "x-access-token": getToken(),
          "Content-Type": "application/json"
        },
      }
    );

    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const putAsync = async (endpoint, request = {}) => {
  isAuthenticated();
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}`,
      {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          "x-access-token": getToken(),
          "Content-Type": "application/json"
        },
      }
    );

    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const deleteAsync = async (endpoint) => {
  isAuthenticated();
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}`,
      {
        method: "DELETE",
        headers: {
          "x-access-token": getToken(),
        },
      }
    );

    return response.json();
  } catch (err) {
    console.error(err);
  }
};