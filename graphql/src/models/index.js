import mongoose from 'mongoose';
import { BreedsSchema, SetsSchema, EquipmentsSchema, CharactersSchema, UsersSchema } from 'shokkoth-models';

const Breeds = mongoose.model('Breeds', BreedsSchema);
const Equipments = mongoose.model('Equipments', EquipmentsSchema);
const Sets = mongoose.model('Sets', SetsSchema);
const Characters = mongoose.model('Characters', CharactersSchema);
const Users = mongoose.model('Users', UsersSchema);

export { Breeds, Sets, Equipments, Characters, Users };
export Stuffs from './stuffs';
