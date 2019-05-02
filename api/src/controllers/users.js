import axios from 'axios';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import set from 'lodash.set';
import get from 'lodash.set';

import { SECRET_KEY } from '../../env';
import { getParam } from '../utils/users';

const User = mongoose.model('Users');

// // ENTRY POINTS
export const getLogIds = function(req, res, next) {
  const username = getParam(req, 'username');
  const password = getParam(req, 'password');

  if (!username) return next('Username undefined');
  if (!password) return next('Password undefined');

  res.locals.username = username;
  res.locals.password = password;

  next();
};

export const getUserId = function(req, res, next) {
    const userId = getParam(req, 'userId');

    if (!userId) return next('UserId undefined');

    res.locals.userId = userId;

    next();
}


// // PASSING THROUGH
export const getUsers = function(req, res, next) {
  User.find({}, 'username')
    .catch(err => next(err))
    .then(users => {
      res.locals.users = users;
      next();
  });
};

export const findById = function(req, res, next) {
  const { userId } = res.locals || {};
  if (!userId) next('I think you should use getAll');

  User.findById(userId)
    .catch(err => next(err))
    .then(user => {
      res.locals.user = user;
      next();
    });
};

export const findByUsername = function(req, res, next) {
  const { username } = res.locals || {};
  if (!username) next('Username undefined');

  User.findOne({ username })
    .catch(err => next(err))
    .then(user => {
      res.locals.user = user;
      next();
    });
};


export const update = function(req, res, next) {
    const { userId } = res.locals || {};
    if (!userId) next('UserId undefined and please create it before updating it !');

    User.findOneAndUpdate({_id: userId}, req.body, { new: true })
      .catch(err => next(err))
      .then(user => {
        res.locals.user = user
        next();
    });
};

export const remove = function(req, res, next) {
    const { userId } = res.locals || {};
    if (!userId) next('UserId undefined and I can\'t remove undefined !');

    User.remove({ _id: userId })
      .catch(err => next(err))
      .then(user => {
        res.locals.user = user;
        next();
    });
};




// Sign In
export const signIn = function(req, res, next) {
    const { user, username, password } = res.locals || {};

    if (user) return next('User already exist');

    bcrypt.hash(password, 16.5)
      .catch(err => next(err))
      .then(hash => {
        const newUser = new User({ username, hash });

        newUser.save()
          .catch(err => next(err))
          .then(user => {
            res.locals.user = user;
            next();
          })
    });
};


// Log In
export const comparePassword = function(req, res, next) {
  const { user, password } = res.locals || {};
  const { hash } = user;

  bcrypt.compare(password, hash)
    .catch(err => next(err))
    .then(result => {
      if (!result) next('Invalid username or password')
      next();
    });
}


export const login = function(req, res) {
  const { user } = res.locals || {};
  const { hash, ...jwtContent } = user;

  jwt.sign({ ...jwtContent, role: 'admin' }, SECRET_KEY, { algorithm: 'RS256', expiresIn: '7d' }, (err, token) => {
    if (err) return res.send(err);
    res.send(token)
  });
};









// // SENDERS
export const sendDone = function(req, res) {
  res.send('Action done yay');
}

export const sendUser = function(req, res) {
  const { user } = res.locals;
  if (!user) res.send('No user found');
  res.send(user);
}

export const sendUsers = function(req, res) {
  const { users } = res.locals;
  if (!users) res.send('No users found');
  res.send(users);
}
