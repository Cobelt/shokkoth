import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Characters } from '../models';
import { adminAccess } from '../utils/auth';
import * as resolvers from '../resolvers/characters';

export default function useCharacters(schemaComposer, customizationOptions = {}) {
  const CharactersTC = composeWithMongoose(Characters, customizationOptions);

  CharactersTC.addResolver({
    name: 'addStuff',
    type: CharactersTC,
    args: { characterId: 'MongoID!', stuffId: 'MongoID!' },
    resolve: resolvers.addStuff,
  })

  CharactersTC.addResolver({
    name: 'myCharacters',
    type: [CharactersTC],
    args: CharactersTC.get('$findMany').getArgs(),
    resolve: resolvers.myCharacters,
  })

  schemaComposer.Query.addFields({
    myCharacters: CharactersTC.get('$myCharacters'),
    characterById: CharactersTC.get('$findById'),
    characterByIds: CharactersTC.get('$findByIds'),
    characterOne: CharactersTC.get('$findOne'),
    characterMany: CharactersTC.get('$findMany'),
    characterCount: CharactersTC.get('$count'),
    characterConnection: CharactersTC.get('$connection'),
    characterPagination: CharactersTC.get('$pagination'),
  });

  schemaComposer.Mutation.addFields({
    addStuffToCharacter: CharactersTC.getResolver('addStuff'),
    characterCreateOne: CharactersTC.get('$createOne'),
    ...adminAccess({
      characterCreateMany: CharactersTC.get('$createMany'),
      characterUpdateById: CharactersTC.get('$updateById'),
      characterUpdateOne: CharactersTC.get('$updateOne'),
      characterUpdateMany: CharactersTC.get('$updateMany'),
      characterRemoveOne: CharactersTC.get('$removeOne'),
      characterRemoveById: CharactersTC.get('$removeById'),
      characterRemoveMany: CharactersTC.get('$removeMany'),
    }),
  });
  return CharactersTC;
}
