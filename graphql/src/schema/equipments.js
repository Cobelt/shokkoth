import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Equipments } from '../models';
import { adminAccess } from '../utils/auth';
import * as resolvers from '../resolvers/equipments';
import * as filters from '../filters';

export default function useEquipments(schemaComposer, customizationOptions = {}) {
  const EquipmentsTC = composeWithMongoose(Equipments, customizationOptions);

  EquipmentsTC.setResolver('findMany', EquipmentsTC.get('$findMany')
    .addFilterArg(filters.ankamaIdIn)
    .addFilterArg(filters.setAnkamaIdIn)
    .addFilterArg(filters.setIdIn)
  );

  schemaComposer.Query.addFields({
    equipmentById: EquipmentsTC.get('$findById'),
    equipmentByIds: EquipmentsTC.get('$findByIds'),
    equipmentOne: EquipmentsTC.get('$findOne'),
    equipmentMany: EquipmentsTC.get('$findMany'),
    equipmentCount: EquipmentsTC.get('$count'),
    equipmentConnection: EquipmentsTC.get('$connection'),
    equipmentPagination: EquipmentsTC.get('$pagination'),

    hatMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.hatOnly),
    amuletMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.amuletOnly),
    beltMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.beltOnly),
    bootsMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.bootsOnly),
    ringMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.ringOnly),
    shieldMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.shieldOnly),
    cloakMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.cloakOnly),
    backpackMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.backpackOnly),
    dofusMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.dofusOnly),
    trophyMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.trophyOnly),
    petMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.petOnly),
    petsmountMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.petsmountOnly),
    mountMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.mountOnly),

    dofusAndTrophiesMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.dofusAndTrophies),
    backMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.backOnly),
    weaponsMany: EquipmentsTC.get('$findMany').wrapResolve(resolvers.weaponsOnly),
  });

  schemaComposer.Mutation.addFields({
    ...adminAccess({
      equipmentCreateOne: EquipmentsTC.get('$createOne'),
      equipmentCreateMany: EquipmentsTC.get('$createMany'),
      equipmentUpdateById: EquipmentsTC.get('$updateById'),
      equipmentUpdateOne: EquipmentsTC.get('$updateOne'),
      equipmentUpdateMany: EquipmentsTC.get('$updateMany'),
      equipmentRemoveById: EquipmentsTC.get('$removeById'),
      equipmentRemoveOne: EquipmentsTC.get('$removeOne'),
      equipmentRemoveMany: EquipmentsTC.get('$removeMany'),
    }),
  });
  return EquipmentsTC;
}
