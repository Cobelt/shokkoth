import express from 'express';

import * as Controller from '../controllers/extracter';

const extracterRouter = express.Router();

extracterRouter.route('/dofusbook/url')
  .get(Controller.getTruthfulURL, Controller.sendTruthfulURL);

extracterRouter.route('/dofusbook/iframe')
  .get(Controller.getTruthfulURL, Controller.sendDofusBookIframe);

extracterRouter.route('/everything/')
  .get(
    Controller.initEquipmentsExtraction,
    Controller.extractEquipements,

    Controller.initWeaponsExtraction,
    Controller.extractEquipements,

    Controller.initWeaponsExtraction,
    Controller.extractEquipements,

    Controller.initPetsExtraction,
    Controller.extractEquipements,

    Controller.initMountsExtraction,
    Controller.extractEquipements,

    // Controller.initSetsExtraction,
    // Controller.extractSets,
    Controller.sendExtracted
  )

extracterRouter.route('/equipments')
  .get(
    Controller.initEquipmentsExtraction,
    Controller.extractEquipements,
    Controller.sendExtracted
  );

extracterRouter.route('/weapons')
  .get(
    Controller.initWeaponsExtraction,
    Controller.extractEquipements,
    Controller.sendExtracted
  );

extracterRouter.route('/pets')
  .get(
    Controller.initPetsExtraction,
    Controller.extractEquipements,
    Controller.sendExtracted
  );

extracterRouter.route('/mounts')
  .get(
    Controller.initMountsExtraction,
    Controller.extractEquipements,
    Controller.sendExtracted
  );

extracterRouter.route('/sets')
  .get(
    Controller.initSetsExtraction,
    Controller.extractSets,
    Controller.sendExtracted
  );

extracterRouter.route('/equipments/:itemId')
    .get(Controller.initEquipmentsExtraction, Controller.extractEquipement);

extracterRouter.route('/weapons/:itemId')
    .get(Controller.initWeaponsExtraction, Controller.extractEquipement);


// extracterRouter.route('/dofapi2/')

export default (app) => app.use('/extract', extracterRouter);

export const getExtracterRouter = () => extracterRouter;
