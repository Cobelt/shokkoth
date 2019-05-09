import axios from 'axios';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import set from 'lodash.set';
import get from 'lodash.set';

import { SECRET_KEY } from '../env';
import { getParam, setLocale, getLocale } from '../utils/users';

const User = mongoose.model('Users');

// // ENTRY POINTS
export const getLogIds = function(req, res, next) {
  const username = getParam(req, 'username');
  const password = getParam(req, 'password');

  if (!username) return next('Username undefined');
  if (!password) return next('Password undefined');

  setLocale(res, { username });
  setLocale(res, { password });

  next();
};

export const getUserId = function(req, res, next) {
    const userId = getParam(req, 'userId');

    if (!userId) return next('UserId undefined');

    setLocale(res, { userId });

    next();
}

export const getJWT = function(req, res, next) {
  let token = getParam(req, 'jwt') || get(req, 'headers[x-access-token]') || get(req, 'headers.authorization'); // Express headers are auto converted to lowercase
  if (!token || typeof token !== 'string') return next('No token given');

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, jwt.length);
  }
  
  setLocale(res, { token });

  next();
}




// // PASSING THROUGH
export const getUsers = function(req, res, next) {
  User.find({}, 'username')
    .catch(err => next(err))
    .then(users => {
      setLocale(res, { users });
      next();
  });
};

export const findById = function(req, res, next) {
  const userId = getLocale(res, 'userId');
  if (!userId) next('I think you should use getAll');

  User.findById(userId)
    .catch(err => next(err))
    .then(user => {
      setLocale(res, { user });
      next();
    });
};

export const findByUsername = function(req, res, next) {
  const username = getLocale(res, 'username');
  if (!username) next('Username undefined');

  User.findOne({ username })
    .catch(err => next(err))
    .then(user => {
      setLocale(res, { user });
      next();
    });
};


export const update = function(req, res, next) {
  const userId = getLocale(res, 'userId');
  if (!userId) next('UserId undefined and please create it before updating it !');

  User.findOneAndUpdate({_id: userId}, req.body, { new: true })
    .catch(err => next(err))
    .then(user => {
      setLocale(res, { user });
      next();
  });
};

export const remove = function(req, res, next) {
  const userId = getLocale(res, 'userId');
  if (!userId) next('UserId undefined and I can\'t remove undefined !');

  User.remove({ _id: userId })
    .catch(err => next(err))
    .then(user => {
      setLocale(res, { user });
      next();
  });
};




// Sign In
export const signIn = function(req, res, next) {
  const user = getLocale(res, 'user');
  const username = getLocale(res, 'username');
  const password = getLocale(res, 'password');

  if (user) return next('User already exist');

  bcrypt.hash(password, 16.5)
    .catch(err => next(err))
    .then(hash => {
      const newUser = new User({ username, hash });

      newUser.save()
        .catch(err => next(err))
        .then(user => {
          setLocale(res, { user });
          next();
        })
  });
};


// Change password
export const changePassword = function(req, res, next) {
  const user = getLocale(res, 'user');
  const newPassword = getLocale(res, 'password');

  bcrypt.hash(newPassword, 16.5)
    .catch(err => next(err))
    .then(hash => {
      user.hash = hash;

      user.save()
        .catch(err => next(err))
        .then(user => {
          setLocale(res, { user });
          next();
        })
  });
};


// Log In
export const comparePassword = function(req, res, next) {
  const user = getLocale(res, 'user');
  const password = getLocale(res, 'password');
  
  if (!user) next('Invalid username or password');
  const { hash } = user;

  bcrypt.compare(password, hash, (err, result) => {
    if (err) return next(err);
    if (!result) next('Invalid username or password')

    next();
  });
}


export const login = function(req, res, next) {
  const user = getLocale(res, 'user');
  const { _id, hash } = user;

  jwt.sign({ _id, authenticated: true, role: 'admin' }, SECRET_KEY, { algorithm: 'HS256', expiresIn: '7d' }, (err, token) => {
    if (!token) return next('No token created');

    setLocale(res, { token });
    next();
  });
};


export const verifyToken = function(req, res, next) {
  const token = getLocale(res, 'token');
  
  if (!token) return next('No token given');

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return next("REFUSED: Token's signature is probably not valid");
    if (!decoded) return next('Auth token is not supplied');

    setLocale(res, { isAuth: true });
    setLocale(res, { decoded });
    next();
  });
};

export const saveTokenInCookies = function(req, res, next) {
  const token = getLocale(res, 'token');
  if (!token) return next('Token not found !');

  setCookie(res, { name: 'shokkothJWT', value: token, expiresIn: 7 });
}






// // SENDERS
export const sendDone = function(req, res) {
  res.send('Action done yay');
}

export const sendToken = function(req, res) {
  res.send(getLocale(res, 'token'));
}

export const sendIsAuth = function(req, res) {
  res.send(`Is authenticated ? ${!!getLocale(res, 'isAuth')}`);
}

export const sendDecoded = function(req, res) {
  res.send(getLocale(res, 'decoded'));
}

export const sendUser = function(req, res) {
  const user = getLocale(res, 'user');
  if (!user) res.send('No user found');
  res.send(user);
}

export const sendUsers = function(req, res) {
  const users = getLocale(res, 'users');
  if (!users) res.send('No users found');
  res.send(users);
}
