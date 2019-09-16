import express from 'express';
import path from 'path';
import expressGraphQL from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { getParam, setLocale, getLocale } from './utils';
import { decodeToken, findJWT, generateHash } from './utils/auth';
import * as UserController from './controllers/users';

import './models';
import schema from './schema';

import { PORT, ALLOWED_ORIGINS } from './env';
const hostname = '0.0.0.0';
const port = process.env.PORT || PORT || 4000;

const DB_HOSTNAME = process.env.MONGO_SERVER || 'localhost';
const DB_PORT = process.env.MONGO_PORT || '27018';
const DB_NAME = process.env.MONGO_NAME || 'shokkoth';

const app = express();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });


app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if (origin && !ALLOWED_ORIGINS.includes(origin.replace(/https?:\/\//, ''))){
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    console.log('Accepted origin =', origin);
    return callback(null, true);
  },
  header: '*'
}));

var root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(async (req, res, next) => {
  try {
    const token = await findJWT(req);
    if (token) setLocale(res, { token });
    return next();
  } catch (e) {
    return next(e);
  }
});

app.use(async (req, res, next) => {
  try {
    const token = getLocale(res, 'token');
    if (token) {
      setLocale(res, { decoded: await decodeToken(token) });
    }
    return next();
  } catch (e) {
    return next(e);
  }
});

app.use('/', expressGraphQL({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// app.use(UserController.refreshToken);

app.listen(port, hostname, () => console.log(`Shokkoth-Server started on http://${hostname}:${port}`));
