import get from 'lodash.get';
import set from 'lodash.set';

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
