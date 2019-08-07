import mongoose from 'mongoose';
import { StuffsSchema, COMMON, WEAPONS } from 'shokkoth-models';
import { Equipments } from './index.js';

function countOfType(equipments, type) {
  return equipments.filter(i => COMMON.validateType(i.type, type)).length;
}

function countOfTypes(equipments, types) {
  return types.reduce((type, count) => count + countOfType(equipments, type));
}

export async function validateEquipments(equipments = []) {
  if (equipments.length > 0) {
    const populatedEquipments = await Equipments.find({ _id: { $in: equipments }}).exec();
    const differenceLength = equipments.length - populatedEquipments.length;
    if (differenceLength > 1) throw new Error(`${differenceLength} ids were not found in database.`);

    if (countOfType(populatedEquipments, 'HAT') > 1) throw new Error('Error: Max 1 hat in equipment');
    if (countOfType(populatedEquipments, 'AMULET') > 1) throw new Error('Error: Max 1 amulet in equipment');
    if (countOfType(populatedEquipments, 'RING') > 2) throw new Error('Error: Max 2 rings in equipment');
    if (countOfType(populatedEquipments, 'SHIELD') > 1) throw new Error('Error: Max 1 shield in equipment');
    if (countOfType(populatedEquipments, 'RING') > 2) throw new Error('Error: Max 2 rings in equipment');
    if (countOfType(populatedEquipments, 'BELT') > 1) throw new Error('Error: Max 1 belt in equipment');
    if (countOfType(populatedEquipments, 'BOOTS') > 1) throw new Error('Error: Max 1 pair of boots in equipment');
    if (countOfType(populatedEquipments, 'PET') > 1) throw new Error('Error: Max 1 pet in equipment');
    if (countOfType(populatedEquipments, 'PETSMOUNT') > 1) throw new Error('Error: Max 1 petsmount in equipment');
    if (countOfType(populatedEquipments, 'MOUNT') > 1) throw new Error('Error: Max 1 mount in equipment');
    if (countOfTypes(populatedEquipments, ['DOFUS', 'TROPHY']) > 6) throw new Error('Error: Max 6 dofus or trophies in equipment');
    if (countOfTypes(populatedEquipments, ['CLOAK', 'BACKPACK']) > 1) throw new Error('Error: Max 1 cloak or backpack in equipment');
    if (countOfTypes(populatedEquipments, WEAPONS.ENUM) > 1) throw new Error('Error: Max 1 weapon in equipment');
  }
}


StuffsSchema.pre(['validate', 'updateOne', 'findOneAndUpdate'], async function () {
  await validateEquipments(this.equipments);
});

const Stuffs = mongoose.model('Stuffs', StuffsSchema);
export default Stuffs;
