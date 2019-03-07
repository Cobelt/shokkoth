import React from 'react';
import deepEqual from 'lodash.isequal';

import {
    getUser,
} from '../../selectors/user';


const UserContext = React.createContext();
export default UserContext;


export const UserConsumer = UserContext.Consumer;



export const CREATE_USER = 'user/CREATE_USER';
const createUserAction = ({ user }) => ({
    type: CREATE_USER,
    payload: {
        user,
    }
});
export const createUser = ({ user }) => {
	return store => {
		if (!user) return;

        return createUserAction({ user });
    };
};


export const UPDATE_USER = 'user/UPDATE_USER';
const updateUserAction = ({ user }) => ({
	type: UPDATE_USER,
	payload: {
		user,
	}
});
export const updateUser = ({ user }) => {
	return store => {
		if (!user) return;

		if (deepEqual(user, getUser(store, { user }))) return;

		return updateUserAction({ user });
	};
};
