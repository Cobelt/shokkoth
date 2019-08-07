import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Sets } from '../models';

export default function useSets(schemaComposer, customizationOptions = {}) {
  const SetsTC = composeWithMongoose(Sets, customizationOptions);
  schemaComposer.Query.addFields({
    setById: SetsTC.get('$findById'),
    setByIds: SetsTC.get('$findByIds'),
    setOne: SetsTC.get('$findOne'),
    setMany: SetsTC.get('$findMany'),
    setCount: SetsTC.get('$count'),
    setConnection: SetsTC.get('$connection'),
    setPagination: SetsTC.get('$pagination'),
  });

  schemaComposer.Mutation.addFields({
    setCreateOne: SetsTC.get('$createOne'),
    setCreateMany: SetsTC.get('$createMany'),
    setUpdateById: SetsTC.get('$updateById'),
    setUpdateOne: SetsTC.get('$updateOne'),
    setUpdateMany: SetsTC.get('$updateMany'),
    setRemoveById: SetsTC.get('$removeById'),
    setRemoveOne: SetsTC.get('$removeOne'),
    setRemoveMany: SetsTC.get('$removeMany'),
  });
  return SetsTC;
}
