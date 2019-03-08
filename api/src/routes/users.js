import express from 'express';

import * as Controller from '../controllers/users';

const usersRouter = express.Router();

// todoList Routes
// usersRouter.route('/')
//     .get(Controller.getAll);

usersRouter.route('/sign-in')
    .post(Controller.signIn);

usersRouter.route('/login')
    .post(Controller.login)
    .get((req, res, next) => {
        const { username, password } = req.params;
        req.body = { username, password };
        next();
    }, Controller.login);

// usersRouter.route('/extract/all')
//     .get(Controller.extractAll)
//     .post(Controller.extractAll);
//
// usersRouter.route('/extract/:itemId')
//     .get(Controller.extract)
//     .post(Controller.extract);

const useRouter = (app) => app.use('/user', usersRouter);

export default useRouter;

export const getUsersRouter = () => usersRouter;