import axios from 'axios';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import set from 'lodash.set';
import get from 'lodash.get';

import { Users } from '../models';

import { SECRET_KEY } from '../env';
import { getParam, setLocale, getLocale } from '../utils';
import { decodeToken, findJWT, generateHash } from '../utils/auth';
import { setCookie } from '../utils/cookies'

// // ENTRY POINTS
export const getLogIds = async function(req, res, next) {
  const { username, password } = getParam(req, ['username', 'password']);

  if (!username) return next('Username undefined');
  if (!password) return next('Password undefined');

  setLocale(res, { username, password });

  next();
};

export const getUserId = async function(req, res, next) {
    const userId = getParam(req, 'userId');

    if (!userId) return next('UserId undefined');

    setLocale(res, { userId });

    next();
}

// // PASSING THROUGH
export const getUsers = async function(req, res, next) {
  Users.find({}, 'username')
    .catch(err => next(err))
    .then(users => {
      setLocale(res, { users });
      next();
  });
};

export const findById = async function(req, res, next) {
  const userId = getLocale(res, 'userId');
  if (!userId) return next('I think you should use getAll');

  Users.findById(userId)
    .catch(err => next(err))
    .then(user => {
      setLocale(res, { user });
      next();
    });
};

export const findByUsername = async function(req, res, next) {
  const username = getLocale(res, 'username');
  if (!username) return res.status(400).send('Username undefined');

  Users.findOne({ username })
    .catch(err => next(err))
    .then(user => {
      setLocale(res, { user });
      next();
    });
};


export const update = async function(req, res, next) {
  const userId = getLocale(res, 'userId');
  if (!userId) return res.status(400).send('UserId undefined and please create it before updating it !');

  Users.findOneAndUpdate({_id: userId}, req.body, { new: true })
    .catch(err => next(err))
    .then(user => {
      setLocale(res, { user });
      next();
  });
};

export const remove = async function(req, res, next) {
  const userId = getLocale(res, 'userId');
  if (!userId) return res.status(400).send('UserId undefined and I can\'t remove undefined !');

  Users.remove({ _id: userId })
    .catch(err => next(err))
    .then(user => {
      setLocale(res, { user });
      next();
  });
};




// Sign In
export const signIn = async function(req, res, next) {
  const { user, username, password } = getLocale(res, ['user', 'username', 'password']);

  if (user) return res.status(401).send('Username already exist');

  const hash = await generateHash(password);
  const newUser = new Users({ username, hash });
  newUser.save()
    .catch(err => next(err))
    .then(user => {
      setLocale(res, { user });
      next();
    })
};


// Log In

export const login = async function(req, res, next) {
  const { user, isAuth } = getLocale(res, ['user', 'isAuth']);
  const { _id, hash, username, role } = user;

  jwt.sign({ _id, authenticated: isAuth, username, role }, SECRET_KEY, { algorithm: 'HS256', expiresIn: '7d' }, (err, token) => {
    if (!token) return res.status(500).send('No token created');

    user.lastConnection = Date.now();
    user.save();

    setLocale(res, { token });
    return next();
  });
};


export const saveTokenInCookies = async function(req, res, next) {
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
