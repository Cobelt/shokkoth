import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import './models';

import {
  useUsersRouter,
  useBreedsRouter,
  useCharactersRouter,
  useExtracterRouter,
  useEquipmentsRouter,
} from './routes';

import { PORT, ALLOWED_ORIGINS } from './env';
const hostname = 'localhost';
const port = process.env.PORT || PORT || 5013;

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
    if (origin && !ALLOWED_ORIGINS.includes(origin.replace(/https?:\/\//, '').replace(/:\d+$/, ''))){
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    console.log('Accepted origin =', origin);
    return callback(null, true);
  },
  header: '*'
}));

// app.use((req, res, next) => {
//   const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
//   console.log('Called by IP', ip);
//   next();
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

useUsersRouter(app);
useBreedsRouter(app);
useCharactersRouter(app);
useExtracterRouter(app);
useEquipmentsRouter(app);

app.listen(port, hostname, () => console.log(`Shokkoth's API started on http://${hostname}:${port}`));
