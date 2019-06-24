import express from 'express';

import * as Controller from '../controllers/extracter';

const extracterRouter = express.Router();

extracterRouter.route('/dofusbook/url')
    .get(Controller.getTruthfulURL, Controller.sendTruthfulURL);

extracterRouter.route('/dofusbook/iframe')
    .get(Controller.getTruthfulURL, Controller.sendDofusBookIframe);


extracterRouter.route('/equipments/all')
    .get(
      Controller.initEquipmentsExtraction,
      Controller.extractEquipements,
      Controller.sendExtracted
    );

extracterRouter.route('/weapons/all')
    .get(
      Controller.initWeaponsExtraction,
      Controller.extractEquipements,
      Controller.sendExtracted
    );

extracterRouter.route('/pets/all')
    .get(
      Controller.initPetsExtraction,
      Controller.extractEquipements,
      Controller.sendExtracted
    );

extracterRouter.route('/mounts/all')
    .get(
      Controller.initMountsExtraction,
      Controller.extractEquipements,
      Controller.sendExtracted
    );



extracterRouter.route('/equipments/:itemId')
    .get(Controller.initEquipmentsExtraction, Controller.extractEquipement);

extracterRouter.route('/weapons/:itemId')
    .get(Controller.initWeaponsExtraction, Controller.extractEquipement);


// extracterRouter.route('/dofapi2/')

export default (app) => app.use('/extract', extracterRouter);

export const getExtracterRouter = () => extracterRouter;
