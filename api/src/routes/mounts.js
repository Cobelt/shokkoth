import express from 'express';

import * as CommonController from '../controllers/common';
import * as Controller from '../controllers/mounts';

const mountsRouter = express.Router();

// todoList Routes
mountsRouter.route('/')
    .get(
      Controller.initLocalState,
      CommonController.getAll,
    );

mountsRouter.route('/details')
  .get(
    Controller.initLocalState,
    CommonController.getSearchParams,
    CommonController.search,
    CommonController.sendSearchResult,
  );

mountsRouter.route('/types')
  .get(
    Controller.initLocalState,
    CommonController.sendTypes,
  );


mountsRouter.route('/get/:itemId')
    .get(Controller.get)
    .post(Controller.create)
    .put(Controller.update)
    .delete(Controller.remove);

export default (app) => app.use('/mounts', mountsRouter);

export const getMountsRouter = () => mountsRouter;
