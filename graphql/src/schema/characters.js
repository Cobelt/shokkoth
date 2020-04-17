import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Characters } from '../models';
import { adminAccess } from '../utils/auth';
import * as authResolvers from '../resolvers/auth';
import * as resolvers from '../resolvers/characters';
import * as filters from '../filters/characters';

export default function useCharacters(schemaComposer, customizationOptions = {}) {
  const CharactersTC = composeWithMongoose(Characters, customizationOptions);

  CharactersTC.setResolver('findMany', CharactersTC.get('$findMany')
    .addFilterArg(filters.hasStuff)
    .addFilterArg(filters.withStuffs)
    .addFilterArg(filters.searchStuffs)
    .addFilterArg(filters.draft)
  );

  CharactersTC.setResolver('findOne', CharactersTC.get('$findOne')
    .addFilterArg(filters.hasStuff)
    .addFilterArg(filters.searchStuffs)
    .addFilterArg(filters.draft)
  );

  CharactersTC.addResolver({
    name: 'addStuff',
    type: CharactersTC,
    args: { characterId: 'MongoID!', stuffId: 'MongoID!' },
    resolve: resolvers.addStuff,
  })

  CharactersTC.addResolver({
    name: 'removeStuff',
    type: CharactersTC,
    args: { characterId: 'MongoID!', stuffId: 'MongoID!' },
    resolve: resolvers.removeStuff,
  })

  CharactersTC.addResolver({
    name: 'myCharacters',
    type: [CharactersTC],
    args: CharactersTC.get('$findMany').getArgs(),
    resolve: resolvers.myCharacters,
  })

  CharactersTC.addResolver({
    name: 'createCharacter',
    type: CharactersTC,
    args: CharactersTC.get('$createOne').getArgs(),
    resolve: resolvers.createOne,
  })

  CharactersTC.addResolver({
    kind: 'mutation',
    name: 'updateCharacter',
    type: CharactersTC,
    // change args to name / level / equipments ?
    args: { record: CharactersTC.get('$updateOne').getArgs().record, characterId: 'MongoID!' },
    resolve: resolvers.updateOne,
  })

  CharactersTC.addResolver({
    kind: 'mutation',
    name: 'removeCharacter',
    type: CharactersTC,
    args: { characterId: 'MongoID!' },
    resolve: resolvers.removeOne,
  })

  schemaComposer.Query.addFields({
    myCharacters: CharactersTC.get('$myCharacters'),
    characterOne: CharactersTC.get('$findOne'), // .wrapResolve(resolvers.addPublicFilter),
    characterMany: CharactersTC.get('$findMany'), //.wrapResolve(resolvers.addPublicFilter),
    characterCount: CharactersTC.get('$count'),
    ...adminAccess({
      characterConnection: CharactersTC.get('$connection'),
      characterPagination: CharactersTC.get('$pagination'),
    }),
  });

  schemaComposer.Mutation.addFields({
    linkStuff: CharactersTC.getResolver('addStuff').wrapResolve(authResolvers.canUpdateCharacter),
    unlinkStuff: CharactersTC.getResolver('removeStuff').wrapResolve(authResolvers.canUpdateCharacter),

    createCharacter: CharactersTC.get('$createCharacter'),
    updateCharacter: CharactersTC.get('$updateCharacter').wrapResolve(authResolvers.canUpdateCharacter),
    removeCharacter: CharactersTC.get('$removeCharacter').wrapResolve(authResolvers.canUpdateCharacter),


    ...adminAccess({
      characterCreateOne: CharactersTC.get('$createOne'),
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
