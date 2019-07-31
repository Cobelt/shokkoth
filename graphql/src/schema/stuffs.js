import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Stuffs } from '../models';

export default function useStuffs(schemaComposer, customizationOptions = {}) {
  const StuffsTC = composeWithMongoose(Stuffs, customizationOptions);
  schemaComposer.Query.addFields({
    stuffById: StuffsTC.getResolver('findById'),
    stuffByIds: StuffsTC.getResolver('findByIds'),
    stuffOne: StuffsTC.getResolver('findOne'),
    stuffMany: StuffsTC.getResolver('findMany'),
    stuffCount: StuffsTC.getResolver('count'),
    stuffConnection: StuffsTC.getResolver('connection'),
    stuffPagination: StuffsTC.getResolver('pagination'),
  });

  schemaComposer.Mutation.addFields({
    stuffCreateOne: StuffsTC.getResolver('createOne'),
    stuffCreateMany: StuffsTC.getResolver('createMany'),
    stuffUpdateById: StuffsTC.getResolver('updateById'),
    stuffUpdateOne: StuffsTC.getResolver('updateOne'),
    stuffUpdateMany: StuffsTC.getResolver('updateMany'),
    stuffRemoveById: StuffsTC.getResolver('removeById'),
    stuffRemoveOne: StuffsTC.getResolver('removeOne'),
    stuffRemoveMany: StuffsTC.getResolver('removeMany'),
  });
  return StuffsTC;
}
