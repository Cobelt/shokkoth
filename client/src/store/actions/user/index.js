import React from 'react';
import deepEqual from 'lodash.isequal';

import {
    getUser,
} from '../../selectors/user';



const saveUserInStore = ({ type, user }) => ({
    type,
    payload: { user },
});



export const CREATE_USER = 'user/CREATE_USER';
export const UPDATE_USER = 'user/UPDATE_USER';



export const createUser = ({ user }) => {
	return store => {
		if (!user) return;

        return saveUserInStore({ type: CREATE_USER, user });
    };
};


export const updateUser = ({ user }) => {
	return store => {
		if (!user) return;

		if (deepEqual(user, getUser(store))) return;

		return saveUserInStore({ type: UPDATE_USER, user });
	};
};
