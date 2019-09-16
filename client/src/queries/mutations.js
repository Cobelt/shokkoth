import { mainEquipmentsData, stuffFragment, breedFragment, characterWithoutStuffs } from './fragments';

export const equip = `
  mutation Equip($equipmentId: MongoID!, $replacedEquipmentId: MongoID, $stuffId: MongoID!) {
    equip(equipmentId: $equipmentId, replacedEquipmentId: $replacedEquipmentId, stuffId: $stuffId) {
      ...stuffFragment
    }
  }
  ${stuffFragment}
`;

export const unequip = `
  mutation Uneuip($equipmentId: MongoID!, $stuffId: MongoID!) {
    unequip(equipmentId: $equipmentId, stuffId: $stuffId) {
      ...stuffFragment
    }
  }
  ${stuffFragment}
`;


export const addStuffToCharacter = `
  mutation addStuffToCharacter($characterId: MongoID!, $stuffId: MongoID!) {
    addStuffToCharacter(characterId: $characterId, stuffId: $stuffId) {
      stuffs {
        name
      }
    }
  }
`;

export const createCharacter = `
  mutation CreateCharacter($name: String!, $level: Float, $gender: EnumCharactersGender, $breed: Float!) {
    createCharacter(record: { name: $name, level: $level, gender: $gender, breed: $breed }) {
  	  ...characterWithoutStuffs
    }
  }
  ${characterWithoutStuffs}
`;

export const updateCharacter = `
  mutation UpdateCharacter($record: UpdateOneCharactersInput!, $characterId: MongoID!) {
    updateCharacter(record: $record, characterId: $characterId) {
      ...characterWithoutStuffs
    }
  }
  ${characterWithoutStuffs}
`;

export const removeCharacter = `
  mutation RemoveCharacter($id: MongoID!) {
    removeCharacter(characterId: $id) {
      ...characterWithoutStuffs
    }
  }
  ${characterWithoutStuffs}
`;




export const createStuff = `
  mutation CreateStuff($record: CreateOneStuffsInput!, $characterId: MongoID!) {
    createStuff(record: $record, characterId: $characterId) {
      ...stuffFragment
    }
  }
  ${stuffFragment}
`;

export const updateStuff = `
  mutation UpdateStuff($record: UpdateOneStuffsInput!, $stuffId: MongoID!) {
    updateStuff(record: $record, stuffId: $stuffId) {
      ...stuffFragment
    }
  }
  ${stuffFragment}
`;

export const removeStuff = `
  mutation RemoveStuff($id: MongoID!) {
    removeStuff(stuffId: $id) {
      ...stuffFragment
    }
  }
  ${stuffFragment}
`;

export const signin = `
  mutation Login($username: String!, $password: String!){
    signin(username: $username, password: $password)
  }
`;

export const login = `
  mutation Login($username: String, $email: String, $password: String!){
    login(username: $username, email: $email, password: $password)
  }
`;
