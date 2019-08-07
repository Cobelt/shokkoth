import axios from 'axios';
import get from 'lodash.get';
import set from 'lodash.set';
import mongoose from 'mongoose';
import fs from 'fs';

import { Equipments, Sets, Breeds } from '../models';


import { _save } from './common';

import { formatFullEquipment as format, formatSet } from '../utils/format';
import { getParam, setLocale, getLocale } from '../utils/common';

import {
  DOFUSBOOK_ROUTE_EQUIPMENTS,
  DOFUSBOOK_ROUTE_EQUIPMENTS_END,
  DOFUSBOOK_URI,

  ALL_EQUIPMENTS_FILE,
  ALL_WEAPONS_FILE,
  ALL_PETS_FILE,
  ALL_MOUNTS_FILE,
  ALL_SETS_FILE,
  ALL_BREEDS_FILE,
} from '../constants/extracter';


export const getDataFromFile = async function(req, res, next) {
  const toRead = getLocale(res, 'file');

  try {
    const unparsedData = fs.readFileSync(toRead);
    setLocale(res, { dataFromFile: JSON.parse(unparsedData) });
    return next();
  }
  catch (e) {
    return res.status(500).send('Error when grabbing data from file', file);
  }
};


export const getTruthfulURL = async function (req, res, next) {
  const dofusBookURL = get(req, 'query.url');
  if (!dofusBookURL) return next(new Error('No URL given'));

  // verify it's a db URL before doing anything !!
  const match = dofusBookURL.replace(DOFUSBOOK_URI, '').replace(DOFUSBOOK_ROUTE_EQUIPMENTS, '').replace(DOFUSBOOK_ROUTE_EQUIPMENTS_END, '').match(/(\d*-[\w\d-]*)/)
  if (!match) return next(new Error)

  const stuffIDAndName = match[1];
  if (!stuffIDAndName) return next(new Error('URL doesn\'t match'));

  const truthfulURL = [
      DOFUSBOOK_URI, // DOMAIN
      DOFUSBOOK_ROUTE_EQUIPMENTS, // ROUTE
      stuffIDAndName, // STUFF ID
      DOFUSBOOK_ROUTE_EQUIPMENTS_END // /OBJETS
  ].join('');

  if (!truthfulURL) return next(new Error("URL can't be truthful"))

  set(req, 'body.truthfulURL', truthfulURL);
  next();
}


export const initEquipmentsExtraction = async function(req, res, next) {
  setLocale(res, { file: ALL_EQUIPMENTS_FILE })
  next();
};

export const initWeaponsExtraction = async function(req, res, next) {
  setLocale(res, { file: ALL_WEAPONS_FILE })
  next();
};

export const initPetsExtraction = async function(req, res, next) {
  setLocale(res, { file: ALL_PETS_FILE })
  next();
};

export const initMountsExtraction = async function(req, res, next) {
  setLocale(res, { file: ALL_MOUNTS_FILE })
  next();
};

export const initSetsExtraction = async function(req, res, next) {
  setLocale(res, { file: ALL_SETS_FILE })
  next();
};

export const initBreedsExtraction = async function(req, res, next) {
  setLocale(res, { file: ALL_BREEDS_FILE })
  next();
};


export const extractEquipements = async function(req, res, next) {
  const data = getLocale(res, 'dataFromFile');
  if (!data) return next(new Error('Got no data from the file'));

  console.log('[==>] Extracting', data.length, 'items.');

  const promises = data.map(equipment => new Promise((resolve, reject) => {
    let formatted = format(equipment);
    if (!formatted) reject("Error from formatting");

    const ankamaId = formatted.set
    delete formatted.set;

    if (ankamaId) {
      Sets.findOne({ ankamaId }).then(set => {
        if (set) {
          formatted.set = get(set, '_id');
        }

        const toSave = new Equipments(formatted);
        if (!toSave) reject("Error from Model");

        _save(Equipments, toSave).then(saved => resolve(saved)).catch(err => reject(err));
      }).catch(err => reject(err));
    }
    else {
      const toSave = new Equipments(formatted);
      if (!toSave) reject("Error from Model");

      _save(Equipments, toSave).then(saved => resolve(saved)).catch(err => reject(err));
    }
  }));

  Promise.all(promises).then(items => {
    setLocale(res, { extracted: items.map(i => i && i._id).filter(e => !!e) });
    console.log('[==>] Done.');
    return next();
  }).catch(err => {
    return next(err);
  });
};



export const extractSets = async function(req, res, next) {
  try {
    const data = getLocale(res, 'dataFromFile');
    if (!data) return next(new Error('Got no data from the file'));
    console.log('[==>] Extracting', data.length, 'items.');


    const items = await Promise.all(data.map(async equipmentsSet => {
      const formatted = formatSet(equipmentsSet);
      if (!formatted) reject("Error from formatting");

      const ankamaIds = formatted.equipments;
      formatted.equipments = [];

      if (ankamaIds) {
        const equipments = await Promise.all(ankamaIds.map(async ankamaId => await Equipments.findOne({ ankamaId })));
        formatted.equipments = equipments.map(i => i && i._id).filter(e => !!e);
      }
      console.log('from:', ankamaIds, 'to:', formatted.equipments);

      return await Sets.findOneAndUpdate({ ankamaId: formatted.ankamaId }, formatted, { new: true, upsert: true });
    }));

    setLocale(res, { extracted: items.map(i => i && i._id) });


    console.log('[==>] Done.');
    return next();
  }
  catch (err) {
    return next(err);
  }
};



export const extractBreeds = async function(req, res, next) {
  const data = getLocale(res, 'dataFromFile');
  if (!data) return next(new Error('Got no data from the file'));

  console.log('[==>] Extracting', data.length, 'items.');

  const promises = data.map(breed => new Promise((resolve, reject) => {
    // to remove
    delete breed.spells;

    const toSave = new Breeds(breed);
    if (!toSave) reject("Error from Model");

    _save(Sets, toSave).then(saved => resolve(saved)).catch(err => reject(err));
  }));

  Promise.all(promises).then(items => {
    setLocale(res, { extracted: items.map(i => i && i._id) });
    console.log('[==>] Done.');
    return next();
  }).catch(err => {
    return next(err);
  });
};



// // SENDERS
export const sendDone = function(req, res) {
  res.send('Action done yay');
}

export const sendExtracted = function(req, res) {
  res.send(getLocale(res, 'extracted'));
}

export const sendTruthfulURL = function(req, res, next) {
  const { truthfulURL } = req.body;
  if (!truthfulURL) return res.send(new Error("URL couldn't be truthful"))

  res.send(truthfulURL);
}

export const sendDofusBookIframe = function(req, res) {
  const { truthfulURL } = req.body;
  if (!truthfulURL) return res.send(new Error("URL couldn't be truthful"))

  res.format({ html: () => res.send(`<iframe id="inlineFrameExample" width="100%" height="100%" src="${truthfulURL}" />`) });
};
