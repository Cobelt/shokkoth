import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Characters } from '../models';

export default function useCharacters(schemaComposer, customizationOptions = {}) {
  const CharactersTC = composeWithMongoose(Characters, customizationOptions);
  schemaComposer.Query.addFields({
    characterById: CharactersTC.getResolver('findById'),
    characterByIds: CharactersTC.getResolver('findByIds'),
    characterOne: CharactersTC.getResolver('findOne'),
    characterMany: CharactersTC.getResolver('findMany'),
    characterCount: CharactersTC.getResolver('count'),
    characterConnection: CharactersTC.getResolver('connection'),
    characterPagination: CharactersTC.getResolver('pagination'),
  });

  schemaComposer.Mutation.addFields({
    characterCreateOne: CharactersTC.getResolver('createOne'),
    characterCreateMany: CharactersTC.getResolver('createMany'),
    characterUpdateById: CharactersTC.getResolver('updateById'),
    characterUpdateOne: CharactersTC.getResolver('updateOne'),
    characterUpdateMany: CharactersTC.getResolver('updateMany'),
    characterRemoveById: CharactersTC.getResolver('removeById'),
    characterRemoveOne: CharactersTC.getResolver('removeOne'),
    characterRemoveMany: CharactersTC.getResolver('removeMany'),
  });
  return CharactersTC;
}
