import { schemaComposer } from 'graphql-compose'

import createRelations from './relations'
//import createExtracters from './extracters'

import useBreeds from './breeds'
import useRecipes from './recipes'
import useResources from './resources'
import useSets from './sets'
import useEquipments from './equipments'
import useStuffs from './stuffs'
import useCharacters from './characters'
import useUsers from './users'

const customizationOptions = {
  fields: {
    remove: ['createdAt', 'updatedAt'],
  },
}

const BreedsTC = useBreeds(schemaComposer, customizationOptions)
const RecipesTC = useRecipes(schemaComposer, customizationOptions)
const ResourcesTC = useResources(schemaComposer, customizationOptions)
const SetsTC = useSets(schemaComposer, customizationOptions)
const EquipmentsTC = useEquipments(schemaComposer, customizationOptions)
const StuffsTC = useStuffs(schemaComposer, customizationOptions)
const CharactersTC = useCharacters(schemaComposer, customizationOptions)
const UsersTC = useUsers(schemaComposer, customizationOptions)

createRelations({ BreedsTC, SetsTC, EquipmentsTC, StuffsTC, CharactersTC, UsersTC })

//createExtracters({ BreedsTC, SetsTC, EquipmentsTC, StuffsTC, CharactersTC, UsersTC })

export default schemaComposer.buildSchema()
