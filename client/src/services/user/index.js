import axios from 'axios';

export async function login({ username, password }) {
  if (!username || !password) return;

  const response = await axios.post('http://localhost:5013/users/login', {
    // headers: { jwtTokenHeader },
    username,
    password,
  });

  return response.data;
}
