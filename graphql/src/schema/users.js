import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Users } from '../models';
import { adminAccess, getJWTDecoded } from '../utils/auth';
import * as resolvers from '../resolvers/users';

export default function useUsers(schemaComposer, customizationOptions = {}) {
  const UsersTC = composeWithMongoose(Users, customizationOptions);

  UsersTC.addResolver({
    name: 'addCharacter',
    type: UsersTC,
    args: { userId: 'MongoID!', characterId: 'MongoID!' },
    resolve: resolvers.addCharacter,
  });

  UsersTC.addResolver({
    name: 'updateSelf',
    type: UsersTC,
    args: { email: 'String', username: 'String', password: 'String', newPassword: 'String' },
    resolve: resolvers.updateSelf,
  });

  UsersTC.addResolver({
    name: 'myRoles',
    type: '[String]',
    args: { limit: 'Int', skip: 'Int' },
    resolve: resolvers.myRoles,
  });

  UsersTC.addResolver({
    name: 'signin',
    type: 'String',
    args: { username: 'String!', password: 'String!' },
    resolve: resolvers.signin,
  });

  UsersTC.addResolver({
    name: 'login',
    type: 'String',
    args: { email: 'String', username: 'String', password: 'String!' },
    resolve: resolvers.login,
  });

  UsersTC.addResolver({
    name: 'logout',
    type: 'Boolean',
    args: { },
    resolve: resolvers.logout,
  });

  UsersTC.addResolver({
    name: 'decodeToken',
    type: UsersTC,
    args: {},
    resolve: rp => getJWTDecoded(rp),
  });

  UsersTC.addResolver({
    name: 'self',
    type: UsersTC,
    args: {},
    resolve: resolvers.getSelf,
  });

  schemaComposer.Query.addFields({
    self: UsersTC.get('$self'),
    myRoles: UsersTC.get('$myRoles'),
    decodeToken: UsersTC.get('$decodeToken'),

    ...adminAccess({
      userById: UsersTC.get('$findById'),
      userByIds: UsersTC.get('$findByIds'),
      userOne: UsersTC.get('$findOne'),
      userMany: UsersTC.get('$findMany'),
      userCount: UsersTC.get('$count'),
      userConnection: UsersTC.get('$connection'),
      userPagination: UsersTC.get('$pagination'),
    }),
  });

  schemaComposer.Mutation.addFields({
    addCharacterToUser: UsersTC.get('$addCharacter'),
    userUpdateSelf: UsersTC.get('$updateSelf'),
    signin: UsersTC.get('$signin'),
    login: UsersTC.get('$login'),

    ...adminAccess({
      userCreateOne: UsersTC.get('$createOne'),
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
