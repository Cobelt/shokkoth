import express from 'express';
import path from 'path';
import expressGraphQL from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import './models';
import schema from './schema';

import { PORT, ALLOWED_ORIGINS } from './env';
const hostname = 'localhost';
const port = PORT || 4000;

const app = express();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27018/shokkoth', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

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

app.use(cookieParser())

app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, hostname, () => console.log(`Shokkoth-Server started on http://${hostname}:${port}`));
