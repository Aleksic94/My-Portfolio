import jwt_decode from "jwt-decode";

export const getToken = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return "";
  }
  return JSON.parse(user).token;
};

export const getDecodedToken = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  let decoded = jwt_decode(JSON.parse(user).token);
  return decoded;
};

export const isAuthenticated = () => {
  let decoded = getDecodedToken();

  if (!decoded) {
    return false
  }

  if (Date.now() >= decoded.exp * 1000) {
    return false
  }
  return true;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};
