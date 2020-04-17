import express from 'express';

import * as CommonController from '../controllers/common';
import * as Controller from '../controllers/weapons';

const weaponsRouter = express.Router();

// todoList Routes
weaponsRouter.route('/')
    .get(
      Controller.initLocalState,
      CommonController.getAll,
    );

weaponsRouter.route('/search/:searchText?')
  .get(
    Controller.initLocalState,
    CommonController.getSearchParams,
    CommonController.search,
    CommonController.sendSearchResult,
  )


weaponsRouter.route('/types')
  .get(
    Controller.initLocalState,
    CommonController.sendTypes,
  );


weaponsRouter.route('/get/:itemId')
    .get(Controller.getOne)
    .post(Controller.create)
    .put(Controller.update)
    .delete(Controller.remove);

export default (app) => app.use('/weapons', weaponsRouter);

export const getWeaponsRouter = () => weaponsRouter;
