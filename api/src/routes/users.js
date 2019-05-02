import express from 'express';

import * as Controller from '../controllers/users';

const usersRouter = express.Router();

// todoList Routes
usersRouter.route('/new')
    .get(
      Controller.getLogIds,
      Controller.findByUsername,
      Controller.signIn,
      Controller.sendDone,
    );

usersRouter.route('/login')
    .get(
      Controller.getLogIds,
      Controller.findByUsername,
      Controller.comparePassword,
      Controller.login,
      Controller.sendDone,
    );


usersRouter.route('/:userId')
    .get(
      Controller.getUserId,
      Controller.findById,
      Controller.sendUser,
    );

usersRouter.route('/')
    .get(Controller.getUsers, Controller.sendUsers);



export default (app) => app.use('/users', usersRouter);

export const getUsersRouter = () => usersRouter;
