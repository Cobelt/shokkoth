import express from 'express';

import * as Controller from '../controllers/extracter';

const extracterRouter = express.Router();

extracterRouter.route('/dofusbook/url')
  .get(Controller.getTruthfulURL, Controller.sendTruthfulURL);

extracterRouter.route('/dofusbook/iframe')
  .get(Controller.getTruthfulURL, Controller.sendDofusBookIframe);

extracterRouter.route('/everything/')
  .get(
    Controller.initSetsExtraction,
    Controller.getDataFromFile,
    Controller.extractSets,

    Controller.initEquipmentsExtraction,
    Controller.getDataFromFile,
    Controller.extractEquipements,

    Controller.initWeaponsExtraction,
    Controller.getDataFromFile,
    Controller.extractEquipements,

    Controller.initWeaponsExtraction,
    Controller.getDataFromFile,
    Controller.extractEquipements,

    Controller.initPetsExtraction,
    Controller.getDataFromFile,
    Controller.extractEquipements,

    Controller.initMountsExtraction,
    Controller.getDataFromFile,
    Controller.extractEquipements,

    Controller.initSetsExtraction,
    Controller.getDataFromFile,
    Controller.extractSets,
    Controller.sendExtracted
  )

extracterRouter.route('/equipments')
  .get(
    Controller.initEquipmentsExtraction,
    Controller.getDataFromFile,
    Controller.extractEquipements,
    Controller.sendExtracted
  );

extracterRouter.route('/weapons')
  .get(
    Controller.initWeaponsExtraction,
    Controller.getDataFromFile,
    Controller.extractEquipements,
    Controller.sendExtracted
  );

extracterRouter.route('/pets')
  .get(
    Controller.initPetsExtraction,
    Controller.getDataFromFile,
    Controller.extractEquipements,
    Controller.sendExtracted
  );

extracterRouter.route('/mounts')
  .get(
    Controller.initMountsExtraction,
    Controller.getDataFromFile,
    Controller.extractEquipements,
    Controller.sendExtracted
  );

extracterRouter.route('/sets')
  .get(
    Controller.initSetsExtraction,
    Controller.getDataFromFile,
    Controller.extractSets,
    Controller.sendExtracted
  );

extracterRouter.route('/breeds')
  .get(
    Controller.initBreedsExtraction,
    Controller.getDataFromFile,
    Controller.extractBreeds,
    Controller.sendExtracted,
  );

extracterRouter.route('/resources')
  .get(
    Controller.initResourcesExtraction,
    Controller.getDataFromFile,
    Controller.extractResources,
    Controller.sendExtracted,
  );


// extracterRouter.route('/dofapi2/')

export default (app) => app.use('/extract', extracterRouter);

export const getExtracterRouter = () => extracterRouter;
