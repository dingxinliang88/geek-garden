const TOKEN_KEY = "geek_garden_token_key";

function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function removeToken() {
  return localStorage.removeItem(TOKEN_KEY);
}

export { setToken, getToken, removeToken };
