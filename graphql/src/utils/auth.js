import get from 'lodash.get';
import memoize from 'lodash.memoize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getParam, getLocale, setLocale } from './index.js';
import { SECRET_KEY } from '../env';


export const findJWT = async (req) => {
  let token = get(req, 'headers.authorization') || getParam(req, 'jwt') || getParam(req, 'shokkothJWT') || get(req, 'cookies.shokkothJWT'); // Express headers are auto converted to lowercase
  if (!token || typeof token !== 'string') return;

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  return token;
};


export const decodeToken = memoize(async token => {
  if (!token) return;

  try {
    const decoded = await jwt.verify(token, SECRET_KEY);
    if (!decoded) return;
    return decoded;
  }
  catch (err) {
    return new Error(err, { statusCode: 403 });
  }
});


export function generateHash(password) {
  return bcrypt.hash(password, 12);
}


export function comparePassword(passwordToVerify, hash) {
  return new Promise((resolve, reject) => {
    if (!passwordToVerify || !hash) return reject(new Error('Please send both args to compare'));

    bcrypt.compare(passwordToVerify, hash, (err, result) => {
      if (err) return reject(err);
      if (!result) return resolve(false);

      return resolve(true);
    });
  });
}

export function getJWTDecoded(rp) {
  return getLocale(get(rp, 'context.res'), 'decoded');
}

export const getUserId = rp => {
  return get(getJWTDecoded(rp), '_id');
};

export const hasRoles = (rp, wantedRoles) => {
  const role = get(getJWTDecoded(rp), 'role');
  return role && [wantedRoles].flat().includes(role);
}

export const isAtLeastAdmin = memoize(rp => {
  return hasRoles(rp, ['SUPER_ADMIN', 'ADMIN']);
}, rp => JSON.stringify(getJWTDecoded(rp)));

export const isSuperAdmin = memoize(rp => {
  return hasRoles(rp, ['SUPER_ADMIN']);
}, rp => JSON.stringify(getJWTDecoded(rp)));


export function adminAccess(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => (rp) => {
      try {
        rp.beforeRecordMutate = async (doc, rp) => {
          if (!isAtLeastAdmin(rp)) {
            throw new Error('You should be admin, to have access to this action.');
          }
          return doc;
        }

        return next(rp);
      }
      catch (e) {
        return next(e);
      }

    });
  });
  return resolvers;
}

export function ownOrAdmin(resolvers) {
  Object.keys(resolvers).forEach((k) => {
    resolvers[k] = resolvers[k].wrapResolve(next => (rp) => {
      try {
        rp.beforeRecordMutate = async (doc, rp) => {
          const userId = getUserId(rp);
          console.log('source=', doc);
          const isAdmin = isAtLeastAdmin(rp);

          if (!ownIt && !isAdmin) {
            throw new Error('You should be admin, to have access to this action.');
          }
          return doc;
        }

        return next(rp);
      }
      catch (e) {
        return next(e);
      }

    });
  });
  return resolvers;
}
