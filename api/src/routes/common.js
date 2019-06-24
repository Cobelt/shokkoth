import express from 'express';

import * as Controller from '../controllers/common';

const commonRouter = express.Router();

// todoList Routes
commonRouter.route('/')
    .get(
      Controller.initLocalState,
      Controller.getAll,
    );

commonRouter.route('/details/:types?')
  .get(
    Controller.initLocalState,
    Controller.getSearchParams,
    Controller.search,
    Controller.sendSearchResult,
  );

commonRouter.route('/types')
  .get(
    Controller.initLocalState,
    Controller.sendTypes,
  );

commonRouter.route('/search/:plainText')
  .get(
    Controller.initLocalState,
    Controller.getSearchParams,
    Controller.getPlainTextParam,
    Controller.searchPlainText,
    Controller.sendSearchResult,
  )

commonRouter.route('/get/some')
  .get(
    Controller.initLocalState,
    Controller.getIdsParam,
    Controller.getEquipements,
  )

commonRouter.route('/get/:itemId')
  .get(
    Controller.initLocalState,
    Controller.get,
  )

export default (app) => app.use('/all', commonRouter);


export const getCommonRouter = () => commonRouter;
