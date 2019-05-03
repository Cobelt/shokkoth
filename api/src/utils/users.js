import get from 'lodash.get';
import set from 'lodash.set';

export const getParam = (req, param) => get(req, `params.${param}`) || get(req, `query.${param}`) || get(req, `body.${param}`);

export const setLocale = (res, value) => set(res, 'locales', { ...get(res, 'locales'), ...value });
export const getLocale = (res, name) => get(res, `locales.${name}`);
