import { mainEquipmentsData, stuffEquipments } from './fragments';

export const getBreeds = `
  query getBreeds {
    breedMany(sort: _ID_ASC) {
      _id
      name
      skins {
        male
        female
      }
      roles
    }
  }
`;

export const equipmentsList = `
  query equipmentsList($perPage: Int, $skip: Int) {
    equipmentMany(limit: $perPage, skip: $skip) {
      ...mainEquipmentsData
    }
  }
  ${mainEquipmentsData}
`;

export const getStuff = `
  query Stuff($id: MongoID!) {
    stuffById(_id: $id) {
      _id
      name
      ...stuffEquipments
    }
  }
  ${stuffEquipments}
`;


export const getStuffEquipments = `
  query StuffEquipments($ankamaIds: [Float]!) {
    equipmentMany(filter: { ankamaIdIn: $ankamaIds }) {
      ...mainEquipmentsData
    }
  }
  ${mainEquipmentsData}
`;


export const getMyCharacters = `
  query MyCharacters {
    myCharacters {
      name
      level
      genre
      breed {
        _id
        name
        imgUrl
      }
      stuffs {
        ...stuffEquipments
      }
    }
  }
  ${stuffEquipments}
`;

export const getMyRoles = `
  query MyRoles {
    myRoles
  }
`;


export const getCharacter = `
  query Character($id: MongoID!) {
    characterOne(filter: { _id: $id }) {
      name
      level
      genre
      stuffs {
        ...stuffEquipments
      }
      breed {
        _id
        name
        skins {
          male
          female
        }
      }
    }
  }
  ${stuffEquipments}
`;

export const searchCharacters = `

`;
