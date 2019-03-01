import express from 'express';

import * as Controller from '../controllers/equipments';

const equipmentsRouter = express.Router();

// todoList Routes
equipmentsRouter.route('/')
    .get(Controller.getAll);

equipmentsRouter.route('/:itemId')
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

const useRouter = (app) => app.use('/equipments', equipmentsRouter);

export default useRouter;

export const getEquipmentsRouter = () => equipmentsRouter;