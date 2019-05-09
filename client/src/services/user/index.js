import axios from 'axios';

export async function login({ username, password }) {
  if (!username || !password) return;

  const response = await axios.post('http://api.shokkoth.tk/users/login', { username, password });

  return response.data;
}
