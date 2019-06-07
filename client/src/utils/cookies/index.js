import get from 'lodash.get';

const getCookies = () => {
  const cookies = {};
  document.cookie.split(';').forEach(cookie => {
    const [key, value] = cookie.split('=');
    cookies[key] = value;
  })
  return cookies;
}

const getCookie = (name) => {
  if (!name) return;
  return get(getCookies(), name);
}

const setCookie = (name = undefined, value = undefined, expires = undefined) => {
  if ([name, value, expires].includes(undefined)) return;
  document.cookie = `${name}=${value}; expires=${expires}`;
}

const removeCookie = (name) => {
  if (!getCookie(name)) return;
  document.cookie = `${name}= ; expires=`;
}

export { getCookies as getAll, getCookie as get, setCookie as set, removeCookie as remove };
