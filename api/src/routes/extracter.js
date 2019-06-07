import express from 'express';

import * as Controller from '../controllers/extracter';

const extracterRouter = express.Router();

extracterRouter.route('/dofusbook/url')
    .get(Controller.getTruthfulURL, Controller.sendTruthfulURL);

extracterRouter.route('/dofusbook/iframe')
    .get(Controller.getTruthfulURL, Controller.sendDofusBookIframe);

extracterRouter.route('/items/all')
    .get(Controller.extractEquipements, Controller.sendExtracted)
    .post(Controller.extractEquipements);

extracterRouter.route('/items/:itemId')
    .get(Controller.extractEquipement)
    .post(Controller.extractEquipement);

// extracterRouter.route('/dofapi2/')

export default (app) => app.use('/extract', extracterRouter);

export const getExtracterRouter = () => extracterRouter;
