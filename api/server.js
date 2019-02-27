import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { EquipmentsModel } from './src/models';
import { useEquipmentsRouter } from './src/routes';

const hostname = 'localhost';
const port = process.env.PORT || 5012;

const app = express();



// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dofusLab');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

useEquipmentsRouter(app);


app.listen(port, hostname, () => console.log(`DofusLab-API started on http://${hostname}:${port}`));