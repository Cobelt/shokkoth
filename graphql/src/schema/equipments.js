import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Equipments } from '../models';

export default function useEquipments(schemaComposer, customizationOptions = {}) {
  const EquipmentsTC = composeWithMongoose(Equipments, customizationOptions);
  schemaComposer.Query.addFields({
    equipmentById: EquipmentsTC.getResolver('findById'),
    equipmentByIds: EquipmentsTC.getResolver('findByIds'),
    equipmentOne: EquipmentsTC.getResolver('findOne'),
    equipmentMany: EquipmentsTC.getResolver('findMany'),
    equipmentCount: EquipmentsTC.getResolver('count'),
    equipmentConnection: EquipmentsTC.getResolver('connection'),
    equipmentPagination: EquipmentsTC.getResolver('pagination'),
  });

  schemaComposer.Mutation.addFields({
    equipmentCreateOne: EquipmentsTC.getResolver('createOne'),
    equipmentCreateMany: EquipmentsTC.getResolver('createMany'),
    equipmentUpdateById: EquipmentsTC.getResolver('updateById'),
    equipmentUpdateOne: EquipmentsTC.getResolver('updateOne'),
    equipmentUpdateMany: EquipmentsTC.getResolver('updateMany'),
    equipmentRemoveById: EquipmentsTC.getResolver('removeById'),
    equipmentRemoveOne: EquipmentsTC.getResolver('removeOne'),
    equipmentRemoveMany: EquipmentsTC.getResolver('removeMany'),
  });
  return EquipmentsTC;
}
