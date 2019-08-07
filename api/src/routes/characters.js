import express from 'express';

import * as UserController from '../controllers/users';
import * as Controller from '../controllers/characters';

const charactersRouter = express.Router();

// todoList Routes
charactersRouter.route('/')
    .get(Controller.getAll);


charactersRouter.route('/mine')
    .get(
      UserController.getJWT,
      UserController.verifyToken,
      Controller.getMine
    );



export default (app) => app.use('/characters', charactersRouter);

export const getCharactersRouter = () => charactersRouter;
