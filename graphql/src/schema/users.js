import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Users } from '../models';

export default function useUsers(schemaComposer, customizationOptions = {}) {
  const UsersTC = composeWithMongoose(Users, customizationOptions);
  schemaComposer.Query.addFields({
    userById: UsersTC.getResolver('findById'),
    userByIds: UsersTC.getResolver('findByIds'),
    userOne: UsersTC.getResolver('findOne'),
    userMany: UsersTC.getResolver('findMany'),
    userCount: UsersTC.getResolver('count'),
    userConnection: UsersTC.getResolver('connection'),
    userPagination: UsersTC.getResolver('pagination'),
  });

  schemaComposer.Mutation.addFields({
    userCreateOne: UsersTC.getResolver('createOne'),
    userCreateMany: UsersTC.getResolver('createMany'),
    userUpdateById: UsersTC.getResolver('updateById'),
    userUpdateOne: UsersTC.getResolver('updateOne'),
    userUpdateMany: UsersTC.getResolver('updateMany'),
    userRemoveById: UsersTC.getResolver('removeById'),
    userRemoveOne: UsersTC.getResolver('removeOne'),
    userRemoveMany: UsersTC.getResolver('removeMany'),
  });

  UsersTC.removeField('hash')
  return UsersTC;
}
