import { Stuffs, Characters } from '../models';

export const addEquipment = async ({ source, args, context, info }) => {
  try {
    const { equipmentId, stuffId } = args;
    const stuff = await Stuffs.findOne({ _id: stuffId });
    console.log('found stuff', stuff)
    stuff.equipments.push(equipmentId);
    const saved = await stuff.save();
    return saved;
  }
  catch (e) {
    return new Error(e);
  }
}

export const emptyEquipments = async ({ source, args, context, info }) => {
  try {
    const { stuffId } = args;

    const stuff = await Stuffs.findOne({ _id: stuffId });
    console.log('found stuff', stuff)
    stuff.equipments = [];
    stuff.save();

    return stuff;
    // return Stuffs.findOne({ _id: stuffId }).populate('equipments');
  }
  catch (e) {
    return new Error(e);
  }
}

export const createOne = async ({ source, args, context, info }, StuffsTC) => {
  const { characterId, record } = args;

  const stuff = await Stuffs.create(record);
  const newStuffId = StuffsTC.getRecordIdFn()(stuff);
  await Characters.updateOne({ _id: characterId }, { $push: { stuffs: newStuffId } });

  return stuff;
}
