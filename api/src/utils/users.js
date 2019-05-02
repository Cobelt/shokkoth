import get from 'lodash.get';

export const getParam = (req, param) => get(req, `params.${param}`) || get(req, `query.${param}`) || get(req, `body.${param}`);
