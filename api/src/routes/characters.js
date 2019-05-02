import express from 'express';

import * as Controller from '../controllers/characters';

const charactersRouter = express.Router();

// todoList Routes
charactersRouter.route('/')
    .get(Controller.getAll);

charactersRouter.route('/details')
    .get(Controller.getDetailed);

charactersRouter.route('/type/:type')
    .get(Controller.searchByType);

charactersRouter.route('/:itemId')
    .get(Controller.get)
    .post(Controller.create)
    .put(Controller.update)
    .delete(Controller.remove);

equipmentsRouter.route('/extract/all')
    .get(Controller.extractAll)
    .post(Controller.extractAll);

equipmentsRouter.route('/extract/:itemId')
    .get(Controller.extract)
    .post(Controller.extract);

export default (app) => app.use('/equipments', equipmentsRouter);

export const getEquipmentsRouter = () => equipmentsRouter;
