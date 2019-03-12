import React from 'react';
import deepEqual from 'lodash.isequal';

import {
    getCharacter,
} from '../../selectors/characters';

import {
	fetchCharactersService,
} from '../../services/characters';


const saveCharactersInStore = ({ type, characters }) => ({
    type,
	payload: { characters },
});
const saveCharacterInStore = ({ type, character }) => ({
	type,
	payload: { character },
});


export const FETCH_CHARACTERS = 'characters/FETCH_CHARACTERS';
export const CREATE_CHARACTER = 'characters/CREATE_CHARACTER';
export const UPDATE_CHARACTER = 'characters/UPDATE_CHARACTER';
export const DELETE_CHARACTER = 'characters/DELETE_CHARACTER';


export const fetchCharacters = () => {
	return store => {
		const response = fetchCharactersService({ iduser: 0 });

		return createCharacterAction({ character });
	};
};


export const createCharacter = ({ character }) => {
	return store => {
		if (!character) return;

        return saveCharacterInStore({ type: CREATE_CHARACTER, character });
    };
};


export const updateCharacter = ({ character }) => {
	return store => {
		if (!characters) return;

		if (deepEqual(character, getCharacter(store, { character }))) return;

		return saveCharacterInStore({ type: UPDATE_CHARACTER, character });
	};
};
