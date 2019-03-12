import Axios from 'axios';
import jwt from 'jsonwebtoken';

export async function fetchCharactersService({ iduser }) {
    const response = Axios.get(`localhost:5013/api/characters/${iduser}`);
    return response.data;
}