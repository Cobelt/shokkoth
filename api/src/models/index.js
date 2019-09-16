import mongoose from 'mongoose';
import { BreedsSchema, SetsSchema, EquipmentsSchema, StuffsSchema, CharactersSchema, UsersSchema, RecipesSchema, ResourcesSchema } from 'shokkoth-models';

export const Breeds = mongoose.model('Breeds', BreedsSchema);
export const Recipes = mongoose.model('Recipes', RecipesSchema);
export const Resources = mongoose.model('Resources', ResourcesSchema);
export const Sets = mongoose.model('Sets', SetsSchema);
export const Equipments = mongoose.model('Equipments', EquipmentsSchema);
export const Stuffs = mongoose.model('Stuffs', StuffsSchema);
export const Characters = mongoose.model('Characters', CharactersSchema);
export const Users = mongoose.model('Users', UsersSchema);
