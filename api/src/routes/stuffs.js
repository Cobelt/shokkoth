import express from 'express';

import * as Controller from '../controllers/suffs';

const stuffsRouter = express.Router();

// todoList Routes
stuffsRouter.route('/')
    .get(Controller.getAll);

stuffsRouter.route('/:itemId')
    .get(Controller.getOne)
    .post(Controller.create)
    .put(Controller.update)
    .delete(Controller.remove);

export default (app) => app.use('/stuffs', stuffsRouter);

export const getStuffsRouter = () => stuffsRouter;
