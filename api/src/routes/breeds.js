import express from 'express';

import * as Controller from '../controllers/breeds';

const breedsRouter = express.Router();

// todoList Routes
breedsRouter.route('/')
    .get(
      Controller.getAll,
    );

export default (app) => app.use('/breeds', breedsRouter);

export const getPetsRouter = () => breedsRouter;
