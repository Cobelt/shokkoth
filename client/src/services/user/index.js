import axios from '../axios';

export async function login({ username, password }) {
  if (!username || !password) return;

  // user some CONSTANTS ENV to set SHOKKOTH.TK or .FR
  const response = await axios.post('//api.shokkoth.tk/users/login', { username, password });
  return response.data;
}

export async function signin({ username, password }) {
  if (!username || !password) return;

  // user some CONSTANTS ENV to set SHOKKOTH.TK or .FR
  const response = await axios.post('//api.shokkoth.tk/users/signin', { username, password });
  return response.data;
}

export async function fetchCharacters({ jwt }) {
  const response = axios.get(`//api.shokkoth.tk/characters/mine`);
  return response.data;
}
