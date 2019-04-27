import axios from 'axios';
import get from 'lodash.get';
import set from 'lodash.set';
import mongoose from 'mongoose';

import { EquipmentsTypes } from '../constants/equipments';
import { _save, _update } from './equipments'

import { DOFUSBOOK_ROUTE_EQUIPMENTS, DOFUSBOOK_ROUTE_EQUIPMENTS_END, DOFUSBOOK_URI } from '../constants/extracter';


const Equipment = mongoose.model('Equipments');


const _formatExtractedStat = equipment => {
    const toReturn = equipment;
    if (equipment.stats.length > 0) {
        equipment.stats.forEach((stat, index) => {
            const statEntry = Object.entries(stat)[0];
            toReturn.stats[index] = { name: statEntry[0], ...statEntry[1] };
        });
    }
    return toReturn;
};

const _formatExtractedRecipe = equipment => {
    const toReturn = equipment;
    if (equipment.recipe.length > 0) {
        equipment.recipe.forEach((stat, index) => {
            const statEntry = Object.entries(stat)[0];
            toReturn.recipe[index] = { name: statEntry[0], ...statEntry[1] };
        });
    }
    return toReturn;
};


export const getTruthfulURL = function (req, res, next) {
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



export const extractEquipements = async function(req, res) {
    const { data } = await axios.get(`https://dofapi2.herokuapp.com/equipments`);

    if (!data) return next(new Error('Got no data from the API for https://dofapi2.herokuapp.com/equipments/'));

    console.log('=> Extracting', data.length, 'equipments !....');

    const extracted = [];
    data.map((equipmentFromAPI, index) => {
        const formattedEquipment = _formatExtractedRecipe(_formatExtractedStat(equipmentFromAPI));

        const newEquipment = new Equipment(formattedEquipment);
        try {
            const saved = _save(newEquipment).then(saved => extracted.push(saved));
        }
        catch (e) {
            res.send(err);
        }
    });
    res.send(`Done for ${extracted.length} equipments`);
};

export const extractEquipement = async function(req, res) {
    const { itemId } = req.params || {};
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should extract !'));

    const { data } = await axios.get(`https://dofapi2.herokuapp.com/equipments/${itemId}`);
    if (!data) return res.send(new Error(`Got no data from the API for https://dofapi2.herokuapp.com/equipments/${itemId}`));

    const newEquipment = new Equipment(response.data);
    newEquipment.save(function(err, equipment) {
        if (err) res.send(err);
        res.json(equipment);
    });
};
