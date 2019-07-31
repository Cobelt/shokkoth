import { schemaComposer } from 'graphql-compose';

import createRelations from './relations';

import useBreeds from './breeds';
import useSets from './sets';
import useEquipments from './equipments';
import useStuffs from './stuffs';
import useCharacters from './characters';
import useUsers from './users';

const customizationOptions = {};

const BreedsTC = useBreeds(schemaComposer, customizationOptions);
const SetsTC = useSets(schemaComposer, customizationOptions);
const EquipmentsTC = useEquipments(schemaComposer, customizationOptions);
const StuffsTC = useStuffs(schemaComposer, customizationOptions);
const CharactersTC = useCharacters(schemaComposer, customizationOptions);
const UsersTC = useUsers(schemaComposer, customizationOptions);

createRelations({ BreedsTC, SetsTC, EquipmentsTC, StuffsTC, CharactersTC, UsersTC });

export default schemaComposer.buildSchema();
