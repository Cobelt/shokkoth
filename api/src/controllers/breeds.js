import mongoose from 'mongoose';
import { Breeds } from '../models';


export const getAll = async function(req, res, next) {
  Breeds.find().exec((err, breeds) => {
    if (err) res.send(err);
    res.json(breeds);
  });
}
