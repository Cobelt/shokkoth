import axios from 'axios';

export async function login({ username, password }) {
  if (!username || !password) return;

  // user some CONSTANTS ENV to set SHOKKOTH.TK or .FR and HTTP or HTTPS
  const response = await axios.post('http://api.shokkoth.tk/users/login', { username, password });

  return response.data;
}
