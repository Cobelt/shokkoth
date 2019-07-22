import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import { PORT, ALLOWED_ORIGINS } from './env';

import {
  EquipmentsModel,
  StuffsModel,
  CharactersModel,
  UsersModel,
} from './models';

import {
  useUsersRouter,
  useExtracterRouter,
  useEquipmentsRouter,
} from './routes';

const hostname = 'localhost';
const port = PORT || 5013;

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

useUsersRouter(app);
useExtracterRouter(app);
useEquipmentsRouter(app);

app.listen(port, hostname, () => console.log(`DofusLab-API started on http://${hostname}:${port}`));
