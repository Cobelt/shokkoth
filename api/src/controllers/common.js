import mongoose from 'mongoose';
import { getParam, setLocale, getLocale, toURLValid } from '../utils/common';

import { AllTypes, allTranslations } from '../constants/common';


const Equipment = mongoose.model('Equipments');


export const _save = (model, toSave) => new Promise((resolve, reject) => {
  const Model = model;

  toSave.save(function(err, saved) {
    if(err) {
        if (err.code === 11000) {
          Model.findOneAndUpdate({ _id: toSave._id }, toSave, { returnNewDocument: true }, (updateError, updated) => {
            if (updateError) {
              return reject(updateError)
            }
            else {
              return resolve(updated);
            }
          });
        }
        else {
          return reject(err);
        }
    }
    // if (!saved) reject('Error on document with _id', toSave._id, ': Nothing saved', saved, err);
    return resolve(saved);
  });
});



// // ENTRY POINTS
export const initLocalState = function(req, res, next) {
  setLocale(res, { typesList: AllTypes, model: Equipment, translations: allTranslations, toPopulate: { path: 'set', select: '_id name level bonus equipments', populate: { path: 'equipments', select: '-recipe -createdAt -updatedAt' } } })
  next();
}



export const createTypesRegex = ({ chosenTypes, TYPES, translations }) => {
  const types = chosenTypes.split(',').map(type => TYPES.some(t => toURLValid(type) === toURLValid(t)) ? type : translations[type]).filter(e => !!e);
  return `(${types.join('|')})`;
}


export const getIdsParam = function(req, res, next) {
  const ids = getParam(req, 'ids');
  setLocale(res, { ids });
  next();
}


export const getSearchParams = function(req, res, next) {
    const { typesList: TYPES, translations } = getLocale(res, ['typesList', 'translations']);

    const {
      levelMin = 1,
      levelMax = 200,
      perPage = 100,
      page = 0,
      types = '',
      order = JSON.stringify({ level: -1, type: 1, _id: -1 }),
      searchText = '',
    } = getParam(req, ['levelMin', 'levelMax', 'perPage', 'page', 'types', 'order', 'searchText']);

    let regexTypes = '';

    if (TYPES && translations) {
      regexTypes = createTypesRegex({ chosenTypes: types, TYPES, translations });

      if (regexTypes.match(/\(\|?\)/)) {
        if (types !== '') {
          return next('Sorry but the type(s) you mentioned doesn\'t match anything of this route.')
        }
        else {
          regexTypes = createTypesRegex({ chosenTypes: TYPES.join(','), TYPES, translations });
        }
      }
    }

    setLocale(res, { levelMin, levelMax, perPage, page, types: regexTypes, order: JSON.parse(order), searchText });
    next();
}


export const search = function(req, res, next) {
    const { model: Model, toPopulate, levelMin, levelMax, perPage, page, types, order, searchText } = getLocale(res, ['model', 'toPopulate', 'levelMin', 'levelMax', 'perPage', 'page', 'types', 'order', 'searchText']);

    const filters = {};
    if (types) filters.type = new RegExp(types, 'i');

    filters.level = { $gte: Math.max(levelMin, 1), $lte: Math.min(levelMax, 200) }

    if (searchText) {
      filters.$text = { $search: searchText, $language: 'fr' };

      Model.find(filters)
        .populate(toPopulate)
        .sort(order)
        .skip(parseInt(perPage * page, 10))
        .limit(parseInt(perPage, 10))
        .exec((err, searchResult) => {
          if (err) return next(err);
          setLocale(res, { searchResult });
          next();
        });
    }
    else {
      Model.find(filters)
        .populate(toPopulate)
        .sort(order)
        .skip(parseInt(perPage * page, 10))
        .limit(parseInt(perPage, 10))
        .exec((err, searchResult) => {
          if (err) return next(err);
          setLocale(res, { searchResult });
          next();
        });
    }
};


export const getAll = function(req, res) {
  const { typesList: TYPES, model: Model, translations } = getLocale(res, ['typesList', 'model', 'translations']);

  const filters = {};
  if (TYPES && translations) {
    const types = createTypesRegex({ chosenTypes: TYPES.join(','), TYPES, translations });
    if (types) filters.type = new RegExp(types, 'i');
  }

  Model.find(filters).select('name').exec((err, result) => {
      if (err) res.send(err);
      res.json(result);
  });
};


export const get = function(req, res) {
    const { model: Model, toPopulate } = getLocale(res, ['model', 'toPopulate']);

    const itemId = getParam(req, 'itemId');
    if (!itemId) return res.send(new Error('No itemId given. Please tell me what I should search for !'));

    Model.findById(itemId).populate(toPopulate).exec((err, equipment) => {
        if (err) res.send(err);
        res.json(equipment.populate(toPopulate));
    });
};


export const getSome = function(req, res) {
    const { model: Model, ids, toPopulate = [] } = getLocale(res, ['model', 'ids', 'toPopulate']);

    if (!ids) return res.send(new Error('No ids given. Please tell me what I should search for !'));

    Model.find()
      .select('') // todo add recipe
      .where('_id')
      .in(ids)
      .populate(toPopulate)
      .exec(function(err, equipments) {
        if (err) res.send(err);
        res.json(equipments);
      });
};


export const sendSearchResult = function(req, res) {
  res.send(getLocale(res, 'searchResult'));
}

export const sendTypes = function(req, res) {
  res.send(getLocale(res, 'typesList'));
}
