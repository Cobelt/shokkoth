import axios from 'axios';
import jwt from 'jsonwebtoken';

export async function fetchCharactersService({ iduser }) {
    const response = axios.get(`//api.shokkoth.tk/characters/${iduser}`);
    return response.data;
}
