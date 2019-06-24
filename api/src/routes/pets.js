import express from 'express';

import * as CommonController from '../controllers/common';
import * as Controller from '../controllers/pets';

const petsRouter = express.Router();

// todoList Routes
petsRouter.route('/')
    .get(
      Controller.initLocalState,
      CommonController.getAll,
    );

petsRouter.route('/details')
  .get(
    Controller.initLocalState,
    CommonController.getSearchParams,
    CommonController.search,
    CommonController.sendSearchResult,
  );

petsRouter.route('/types')
  .get(
    Controller.initLocalState,
    CommonController.sendTypes,
  );


petsRouter.route('/get/:itemId')
    .get(Controller.get)
    .post(Controller.create)
    .put(Controller.update)
    .delete(Controller.remove);

export default (app) => app.use('/pets', petsRouter);

export const getPetsRouter = () => petsRouter;
