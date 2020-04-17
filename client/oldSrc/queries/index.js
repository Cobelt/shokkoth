import { mainEquipmentsData, stuffFragment, stuffEquipments, breedFragment, characterWithoutStuffs } from './fragments';

export const getBreeds = `
  query getBreeds {
    breedMany(sort: _ID_ASC) {
      _id
      name
      imgUrl
      url
      roles
      description
      skins {
        male
        female
      }
    }
  }
`;

export const equipmentsList = `
  query equipmentsList($filter: FilterFindManyEquipmentsInput, $sort: SortFindManyEquipmentsInput, $perPage: Int, $skip: Int) {
    equipmentMany(filter: $filter, sort: $sort, limit: $perPage, skip: $skip) {
      ...mainEquipmentsData
    }
  }
  ${mainEquipmentsData}
`;


export const getStuffEquipments = `
  query StuffEquipments($ankamaIds: [Float]!) {
    equipmentMany(filter: { ankamaIdIn: $ankamaIds }) {
      ...mainEquipmentsData
    }
  }
  ${mainEquipmentsData}
`;

export const getMyStuffs = `
  query MyStuffs($filter: FilterFindManyStuffsInput, $limit: Int, $skip: Int) {
    myStuffs(filter: $filter, limit: $limit, skip: $skip) {
      ...stuffFragment
      character {
        ...characterWithoutStuffs
      }
    }
  }
  ${stuffFragment}
  ${characterWithoutStuffs}
`;

export const getStuffs = `
  query Stuffs($filter: FilterFindManyStuffsInput, $limit: Int, $skip: Int) {
    stuffMany(filter: $filter, limit: $limit, skip: $skip) {
      ...stuffFragment
      character {
        ...characterWithoutStuffs
      }
    }
  }
  ${stuffFragment}
  ${characterWithoutStuffs}
`;

export const getMyCharacters = `
  query MyCharacters($filter: FilterFindManyCharactersInput, $limit: Int, $skip: Int) {
    myCharacters(filter: $filter, limit: $limit, skip: $skip) {
      ...characterWithoutStuffs
      stuffs {
        ...stuffFragment
      }
    }
  }
  ${stuffFragment}
  ${characterWithoutStuffs}
`;

export const getMyRoles = `
  query MyRoles {
    myRoles
  }
`;

export const getStuff = `
  query Stuff($id: MongoID!) {
    stuffOne(filter: { _id: $id }) {
      ...stuffFragment
      character {
        ...characterWithoutStuffs
      }
    }
  }
  ${stuffFragment}
  ${characterWithoutStuffs}
`;


export const getCharacter = `
  query Character($id: MongoID!) {
    characterOne(filter: { _id: $id }) {
      ...characterWithoutStuffs
      stuffs {
        ...stuffFragment
      }
    }
  }
  ${stuffFragment}
  ${characterWithoutStuffs}
`;

export const getDecodedToken = `
query DecodeToken {
  decodeToken {
    _id
    username
    email
    roles
  }
}
`;
