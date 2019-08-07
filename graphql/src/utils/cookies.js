export function setCookie(res, { name, value, expiresIn = 60 }) {
  if (!name || !value) return;

  const expirationDt = new Date(Date.now() + (expiresIn*24*60*60*1000)).toUTCString();
  // set cookie, need cookie-parser https://stackoverflow.com/questions/16209145/how-to-set-cookie-in-node-js-using-express-framework
}

function getCookie({ name }) {
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookieValue = decodedCookies.replace(new RegExp(`(?:(?:^|.*;\s*)${name}\s*\=\s*([^;]*).*$)|^.*$/`), '$1');
  return cookieValue || false;
}

function checkCookie({ name, value, expiresIn }) {
  const cookie = getCookie({ name });
  if (cookie) return true;

  setCookie({ name, value, expiresIn });
}
