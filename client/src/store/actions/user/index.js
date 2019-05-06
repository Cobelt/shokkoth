import React from 'react';
import deepEqual from 'lodash.isequal';

import { SAVE_USER, SAVE_JWT } from '../../constants/user';
import { getUser } from '../../selectors/user';

export const action = ({ loading, data, error, actionType }) => ({ type: actionType, loading, payload: data || error });


export const saveUser = ({ user }) => {
	return (store, dispatch) => {
    if (!user) return;

    const actionType = SAVE_USER;


    const actualUser = getUser(store);
		if (actualUser && deepEqual(user, actualUser)) return;

    dispatch(action({ actionType, loading: false, data: { user } }));
	};
};


export const login = (data) => {
	return (store, dispatch) => {
    const { username, password } = data || data.getAll();
    if (!username || !password) return false;

    const actionType = SAVE_JWT;

    dispatch(action({ actionType, loading: true }))

    const data = service.login({ username, password })

    dispatch(action({ actionType, loading: false, data }))
	};
};
