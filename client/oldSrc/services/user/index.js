import axios from '../axios';
import { API_URI } from '../../constants/URIs';

export async function login({ username, password }) {
  if (!username || !password) return;

  // user some CONSTANTS ENV to set SHOKKOTH.TK or .FR
  const response = await axios.post(API_URI + '/users/login', { username, password });
  return response.data;
}

export async function signin({ username, password }) {
  if (!username || !password) return;

  // user some CONSTANTS ENV to set SHOKKOTH.TK or .FR
  const response = await axios.post(API_URI + '/users/signin', { username, password });
  return response.data;
}
