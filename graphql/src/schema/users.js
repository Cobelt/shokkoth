import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Users } from '../models';
import { adminAccess } from '../utils/auth';
import * as resolvers from '../resolvers/users';

export default function useUsers(schemaComposer, customizationOptions = {}) {
  const UsersTC = composeWithMongoose(Users, customizationOptions);

  UsersTC.addResolver({
    name: 'addCharacter',
    type: UsersTC,
    args: { userId: 'MongoID!', characterId: 'MongoID!' },
    resolve: resolvers.addCharacter,
  })

  UsersTC.addResolver({
    name: 'updateSelf',
    type: UsersTC,
    args: { email: 'String', username: 'String', password: 'String', newPassword: 'String' },
    resolve: resolvers.updateSelf,
  })

  UsersTC.addResolver({
    name: 'myRoles',
    type: '[String]',
    args: { limit: 'Int', skip: 'Int' },
    resolve: resolvers.myRoles,
  })

  schemaComposer.Query.addFields({
    myRoles: UsersTC.get('$myRoles'),
    userById: UsersTC.get('$findById'),
    userByIds: UsersTC.get('$findByIds'),
    userOne: UsersTC.get('$findOne'),
    userMany: UsersTC.get('$findMany'),
    userCount: UsersTC.get('$count'),
    userConnection: UsersTC.get('$connection'),
    userPagination: UsersTC.get('$pagination'),
  });

  schemaComposer.Mutation.addFields({
    addCharacterToUser: UsersTC.getResolver('addCharacter'),
    userCreateOne: UsersTC.get('$createOne'),
    userUpdateSelf: UsersTC.getResolver('updateSelf'),
    ...adminAccess({
      userCreateMany: UsersTC.get('$createMany'),
      userUpdateById: UsersTC.get('$updateById'),
      userUpdateMany: UsersTC.get('$updateMany'),
      userRemoveById: UsersTC.get('$removeById'),
      userRemoveOne: UsersTC.get('$removeOne'),
      userRemoveMany: UsersTC.get('$removeMany'),
    }),
  });

  UsersTC.removeField('hash')
  return UsersTC;
}
