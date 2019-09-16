import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Sets } from '../models';
import { adminAccess } from '../utils/auth';
import * as filters from '../filters';
import * as filtersSets from '../filters/sets';

export default function useSets(schemaComposer, customizationOptions = {}) {
  const SetsTC = composeWithMongoose(Sets, customizationOptions);

  SetsTC.setResolver('findMany', SetsTC.get('$findMany')
    .addFilterArg(filters.ankamaIdIn)
    .addFilterArg(filtersSets.search)
    .addFilterArg(filtersSets.searchName)
  );

  SetsTC.setResolver('findOne', SetsTC.get('$findOne')
    .addFilterArg(filters.ankamaIdIn)
    .addFilterArg(filtersSets.search)
    .addFilterArg(filtersSets.searchName)
  );

  schemaComposer.Query.addFields({
    setById: SetsTC.get('$findById'),
    setByIds: SetsTC.get('$findByIds'),
    setOne: SetsTC.get('$findOne'),
    setMany: SetsTC.get('$findMany'),
    setCount: SetsTC.get('$count'),
    ...adminAccess({
      setConnection: SetsTC.get('$connection'),
      setPagination: SetsTC.get('$pagination'),
    }),
  });

  schemaComposer.Mutation.addFields({
    ...adminAccess({
      setCreateOne: SetsTC.get('$createOne'),
      setCreateMany: SetsTC.get('$createMany'),
      setUpdateById: SetsTC.get('$updateById'),
      setUpdateOne: SetsTC.get('$updateOne'),
      setUpdateMany: SetsTC.get('$updateMany'),
      setRemoveById: SetsTC.get('$removeById'),
      setRemoveOne: SetsTC.get('$removeOne'),
      setRemoveMany: SetsTC.get('$removeMany'),
    }),
  });
  return SetsTC;
}
