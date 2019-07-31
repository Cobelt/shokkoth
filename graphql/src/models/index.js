import mongoose from 'mongoose';
import { BreedsSchema, SetsSchema, EquipmentsSchema, StuffsSchema, CharactersSchema, UsersSchema } from 'shokkoth-models';

const Breeds = mongoose.model('Breeds', BreedsSchema);
const Sets = mongoose.model('Sets', SetsSchema);
const Equipments = mongoose.model('Equipments', EquipmentsSchema);
const Stuffs = mongoose.model('Stuffs', StuffsSchema);
const Characters = mongoose.model('Characters', CharactersSchema);
const Users = mongoose.model('Users', UsersSchema);

export { Breeds, Sets, Equipments, Stuffs, Characters, Users };
