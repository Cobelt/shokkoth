import express from 'express';

import * as CommonController from '../controllers/common';
import * as Controller from '../controllers/sets';

const setsRouter = express.Router();

// todoList Routes
setsRouter.route('/')
    .get(
      Controller.initLocalState,
      CommonController.getAll,
    );

setsRouter.route('/search/:searchText?')
    .get(
      Controller.initLocalState,
      CommonController.getSearchParams,
      CommonController.search,
      CommonController.sendSearchResult,
    )


setsRouter.route('/get/:setId')
    .get(Controller.initLocalState, Controller.getOne)
    .post(Controller.create)
    .put(Controller.update)
    .delete(Controller.remove);

export default (app) => app.use('/sets', setsRouter);

export const getSetsRouter = () => setsRouter;
