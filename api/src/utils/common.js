import get from 'lodash.get';
import set from 'lodash.set';
import removeAccent from 'lodash.deburr';

export const getParam = (req, param) => {
  if (Array.isArray(param)) {
    const results = param.map(n => ({ [n]: getParam(req, n) }))
    return Object.assign({}, ...results);
  }
  return get(req, `params.${param}`) || get(req, `query.${param}`) || get(req, `body.${param}`);
}

export const setLocale = (res, value) => set(res, 'locales', { ...get(res, 'locales'), ...value });


export const getLocale = (res, name) => {
  if (Array.isArray(name)) {
    const results = name.map(n => ({ [n]: getLocale(res, n) }))
    return Object.assign({}, ...results);
  }
  return get(res, `locales.${name}`);
}

export function updateLastModifDate(next) {
  try {
      this.updatedAt = Date.now();
      next();
  } catch (err) {
      next(err);
  }
}

export const toLowerCaseNFC = string => string.normalize('NFC').toLowerCase();

export const toURLValid = string => toLowerCaseNFC(removeAccent(string).replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').replace(/\W+/g, '-'));

export const findMatchingParam = (typesList, param) => {
  typesList.find(type => [toURLValid(type.fr), toURLValid(type.en)].includes(toURLValid(param)))
}
