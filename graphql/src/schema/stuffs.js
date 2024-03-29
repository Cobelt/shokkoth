import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Stuffs } from '../models';
import { ownOrAdmin, adminAccess } from '../utils/auth';
import * as resolvers from '../resolvers/stuffs';
import * as filters from '../filters/stuffs';
import * as authResolvers from '../resolvers/auth';

export default function useStuffs(schemaComposer, customizationOptions = {}) {
  const StuffsTC = composeWithMongoose(Stuffs, customizationOptions);

  StuffsTC.setResolver('findMany', StuffsTC.get('$findMany')
    .addFilterArg(filters.searchName)
    .addFilterArg(filters.search)
    .addFilterArg(filters.notEmptyStuffs)
    .addFilterArg(filters.almostFullStuff)
  );

  StuffsTC.setResolver('findOne', StuffsTC.get('$findOne')
    .addFilterArg(filters.searchName)
    .addFilterArg(filters.search)
    .addFilterArg(filters.notEmptyStuffs)
    .addFilterArg(filters.almostFullStuff)
  );

  StuffsTC.addResolver({
    name: 'myStuffs',
    type: [StuffsTC],
    args: StuffsTC.get('$findMany').getArgs(),
    resolve: resolvers.myStuffs,
  })


  StuffsTC.addResolver({
    kind: 'mutation',
    name: 'equip',
    type: StuffsTC,
    args: { stuffId: 'MongoID!', equipmentId: 'MongoID!', replacedEquipmentId: 'MongoID' },
    resolve: resolvers.equip,
  })

  StuffsTC.addResolver({
    kind: 'mutation',
    name: 'removeEquipment',
    type: StuffsTC,
    args: { stuffId: 'MongoID!', equipmentId: 'MongoID!' },
    resolve: resolvers.removeEquipment,
  })

  StuffsTC.addResolver({
    kind: 'mutation',
    name: 'emptyEquipments',
    type: StuffsTC,
    args: { stuffId: 'MongoID!' },
    resolve: resolvers.emptyEquipments,
  })

  StuffsTC.addResolver({
    kind: 'mutation',
    name: 'saveStuff',
    type: StuffsTC,
    // change args to public / name / level / equipments ?
    args: { record: StuffsTC.get('$updateOne').getArgs().record, stuffId: 'MongoID' },
    resolve: resolvers.save,
  })

  StuffsTC.addResolver({
    kind: 'mutation',
    name: 'createStuff',
    type: StuffsTC,
    // change args to public / name / level / equipments ?
    args: StuffsTC.get('$createOne').getArgs(),
    resolve: async function createOne(rp) {
      try {
        const { record } = rp.args
        const userId = getUserId(rp)
    
        const stuff = await Stuffs.create(record)
        await Users.updateOne({ _id: userId }, { $push: { stuffs: stuff._id } }).exec()
    
        return Stuffs.findOne({ _id: stuff._id })
      }
      catch (e) {
        return e
      }
    },
  })

  StuffsTC.addResolver({
    kind: 'mutation',
    name: 'updateStuff',
    type: StuffsTC,
    // change args to public / name / level / equipments ?
    args: { record: StuffsTC.get('$updateOne').getArgs().record, stuffId: 'MongoID!' },
    resolve: resolvers.updateOne,
  })

  StuffsTC.addResolver({
    kind: 'mutation',
    name: 'duplicateStuff',
    type: StuffsTC,
    // change args to public / name / level / equipments ?
    args: { stuffId: 'MongoID!', characterId: 'MongoID' },
    resolve: resolvers.duplicateOne,
  })

  StuffsTC.addResolver({
    kind: 'mutation',
    name: 'removeStuff',
    type: StuffsTC,
    args: { stuffId: 'MongoID!' },
    resolve: resolvers.removeOne,
  })

  schemaComposer.Query.addFields({
    myStuffs: StuffsTC.get('$myStuffs'),
    stuffOne: StuffsTC.get('$findOne')
      .wrapResolve(resolvers.forcePublicFilter)
      .wrapResolve(resolvers.addNotEmptyFilter)
      .wrapResolve(resolvers.sortByLatest),

    stuffMany: StuffsTC.get('$findMany')
      .wrapResolve(resolvers.forcePublicFilter)
      .wrapResolve(resolvers.addNotEmptyFilter)
      .wrapResolve(resolvers.sortByLatest),

    stuffCount: StuffsTC.get('$count').wrapResolve(resolvers.forcePublicFilter),
    // stuffConnection: StuffsTC.get('$connection'),
    // stuffPagination: StuffsTC.get('$pagination'),
    ...adminAccess({
      stuffAll: StuffsTC.get('$findMany')
    }),
  });

  schemaComposer.Mutation.addFields({
    equip: StuffsTC.get('$equip').wrapResolve(authResolvers.canUpdateStuff),
    unequip: StuffsTC.get('$removeEquipment').wrapResolve(authResolvers.canUpdateStuff),
    emptyEquipments: StuffsTC.get('$emptyEquipments').wrapResolve(authResolvers.canUpdateStuff),

    duplicateStuff: StuffsTC.get('$duplicateStuff').wrapResolve(authResolvers.canUpdateCharacter).wrapResolve(authResolvers.canSeeStuff),
    saveStuff: StuffsTC.get('$saveStuff').wrapResolve(authResolvers.canUpdateStuff),
    createStuff: StuffsTC.get('$createStuff').wrapResolve(authResolvers.canUpdateStuff),
    updateStuff: StuffsTC.get('$updateStuff').wrapResolve(authResolvers.canUpdateStuff),
    removeStuff: StuffsTC.get('$removeStuff').wrapResolve(authResolvers.canUpdateStuff),

    ...adminAccess({
      stuffUpdateById: StuffsTC.get('$updateById'),
      stuffUpdateOne: StuffsTC.get('$updateOne'),
      stuffUpdateMany: StuffsTC.get('$updateMany'),
      stuffRemoveById: StuffsTC.get('$removeById'),
      stuffRemoveOne: StuffsTC.get('$removeOne'),
      stuffRemoveMany: StuffsTC.get('$removeMany'),
    }),
  });
  return StuffsTC;
}
