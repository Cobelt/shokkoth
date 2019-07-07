import express from 'express';

import * as CommonController from '../controllers/common';
import * as Controller from '../controllers/equipments';

import injectCommonRouter from './common';
import injectWeaponsRouter from './weapons';
import injectMountsRouter from './mounts';
import injectPetsRouter from './pets';
import injectSetsRouter from './sets';

const equipmentsRouter = express.Router();

// todoList Routes
equipmentsRouter.route('/')
    .get(
      Controller.initLocalState,
      CommonController.getAll,
    );


equipmentsRouter.route('/search/:searchText?')
  .get(
    Controller.initLocalState,
    CommonController.getSearchParams,
    CommonController.search,
    CommonController.sendSearchResult,
  )


equipmentsRouter.route('/types')
  .get(
    Controller.initLocalState,
    CommonController.sendTypes
  );


equipmentsRouter.route('/get/:itemId')
    .get(Controller.get)
    .post(Controller.create)
    .put(Controller.update)
    .delete(Controller.remove);



injectSetsRouter(equipmentsRouter);

injectCommonRouter(equipmentsRouter);
injectWeaponsRouter(equipmentsRouter);
injectMountsRouter(equipmentsRouter);
injectPetsRouter(equipmentsRouter);



export default (app) => app.use('/equipments', equipmentsRouter);

export const getEquipmentsRouter = () => equipmentsRouter;
