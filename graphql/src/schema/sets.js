import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Sets } from '../models';

export default function useSets(schemaComposer, customizationOptions = {}) {
  const SetsTC = composeWithMongoose(Sets, customizationOptions);
  schemaComposer.Query.addFields({
    setById: SetsTC.getResolver('findById'),
    setByIds: SetsTC.getResolver('findByIds'),
    setOne: SetsTC.getResolver('findOne'),
    setMany: SetsTC.getResolver('findMany'),
    setCount: SetsTC.getResolver('count'),
    setConnection: SetsTC.getResolver('connection'),
    setPagination: SetsTC.getResolver('pagination'),
  });

  schemaComposer.Mutation.addFields({
    setCreateOne: SetsTC.getResolver('createOne'),
    setCreateMany: SetsTC.getResolver('createMany'),
    setUpdateById: SetsTC.getResolver('updateById'),
    setUpdateOne: SetsTC.getResolver('updateOne'),
    setUpdateMany: SetsTC.getResolver('updateMany'),
    setRemoveById: SetsTC.getResolver('removeById'),
    setRemoveOne: SetsTC.getResolver('removeOne'),
    setRemoveMany: SetsTC.getResolver('removeMany'),
  });
  return SetsTC;
}
