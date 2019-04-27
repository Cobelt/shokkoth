import express from 'express';

import * as Controller from '../controllers/equipments';

const equipmentsRouter = express.Router();

// todoList Routes
equipmentsRouter.route('/')
    .get(Controller.getAll);

equipmentsRouter.route('/details')
    .get(Controller.getDetailed);

equipmentsRouter.route('/type/:type')
    .get(Controller.searchByType);

equipmentsRouter.route('/:itemId')
    .get(Controller.get)
    .post(Controller.create)
    .put(Controller.update)
    .delete(Controller.remove);

const useRouter = (app) => app.use('/equipments', equipmentsRouter);

export default useRouter;

export const getEquipmentsRouter = () => equipmentsRouter;
