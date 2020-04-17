import get from 'lodash.get';
import memoize from 'lodash.memoize';
import { DateTime } from 'luxon';

const getCookies = () => {
  const cookies = {};
  document.cookie.split(';').filter(e => !!e).forEach(cookie => {
    if (cookie) {
      const [key, value] = cookie.split('=');
      cookies[key.trim()] = value.trim();
    }
  })
  return cookies;
}

const getCookie = (name) => {
  if (!name) return;
  const cookie = get(getCookies(), name);
  try {
    return JSON.parse(cookie);
  }
  catch (e) {
    return cookie;
  }
}

const setCookie = (name = undefined, value = undefined, expires = DateTime.local().plus({ weeks: 1 }).toHTTP(), domain = '*.shokkoth.fr', path = '/') => {
  if ([name, value].includes(undefined)) return;
  document.cookie = `${name}=${value}; expires=${expires}; domain=${domain}; path=${path}`;
}

const deleteCookie = (name, domain = 'shokkoth.fr', path = '/') => {
  if (!getCookie(name)) return;
  document.cookie = `${name}=; expires=; domain=${domain}; path=${path}`;
}

const deleteAllCookies = () => {
    for (let cookieName of Object.keys(getCookies())) {
        deleteCookie(cookieName);
    }
}

export { getCookies as getAll, getCookie as get, setCookie as set, deleteCookie as delete, deleteAllCookies as deleteAll };
