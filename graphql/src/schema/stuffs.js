import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Stuffs } from '../models';
import { ownOrAdmin } from '../utils/auth';
import * as resolvers from '../resolvers/stuffs';
import { canUpdateCharacter } from '../resolvers/auth';

export default function useStuffs(schemaComposer, customizationOptions = {}) {
  const StuffsTC = composeWithMongoose(Stuffs, customizationOptions);

  StuffsTC.addResolver({
    kind: 'mutation',
    name: 'addEquipment',
    type: StuffsTC,
    args: { stuffId: 'MongoID!', equipmentId: 'MongoID!' },
    resolve: resolvers.addEquipment,
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
    name: 'createCharacterStuff',
    type: StuffsTC,
    args: { ...StuffsTC.get('$createOne').getArgs(), characterId: 'MongoID!' },
    resolve: async (rp) => {
      const { characterId, record } = rp.args;
      const stuff = await Stuffs.create(record);
      const newStuffId = StuffsTC.getRecordIdFn()(stuff);
      await Characters.updateOne({ _id: characterId }, { $push: { stuffs: newStuffId } });
      return stuff;
    },
  })

  schemaComposer.Query.addFields({
    stuffById: StuffsTC.get('$findById'),
    stuffByIds: StuffsTC.get('$findByIds'),
    stuffOne: StuffsTC.get('$findOne'),
    stuffMany: StuffsTC.get('$findMany'),
    stuffCount: StuffsTC.get('$count'),
    stuffConnection: StuffsTC.get('$connection'),
    stuffPagination: StuffsTC.get('$pagination'),
  });

  schemaComposer.Mutation.addFields({
    addEquipmentToStuff: StuffsTC.getResolver('addEquipment'),
    emptyStuffEquipments: StuffsTC.getResolver('emptyEquipments'),
    createCharacterStuff: StuffsTC.getResolver('createCharacterStuff').wrapResolve(canUpdateCharacter),
    stuffUpdateById: StuffsTC.get('$updateById'),
    stuffUpdateOne: StuffsTC.get('$updateOne'),
    stuffUpdateMany: StuffsTC.get('$updateMany'),
    stuffRemoveById: StuffsTC.get('$removeById'),
    stuffRemoveOne: StuffsTC.get('$removeOne'),
    stuffRemoveMany: StuffsTC.get('$removeMany'),
  });
  return StuffsTC;
}
