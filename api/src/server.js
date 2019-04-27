import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { EquipmentsModel } from './models';
import { useEquipmentsRouter, useExtracterRouter } from './routes';

const hostname = 'localhost';
const port = process.env.PORT || 5012;

const app = express();



// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27018/dofusLab');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

useEquipmentsRouter(app);
useExtracterRouter(app);


app.listen(port, hostname, () => console.log(`DofusLab-API started on http://${hostname}:${port}`));