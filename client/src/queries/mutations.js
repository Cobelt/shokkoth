export const addStuffToCharacter = `
  mutation addStuffToCharacter($characterId: MongoID!, $stuffId: MongoID!) {
    addStuffToCharacter(characterId: $characterId, stuffId: $stuffId) {
      stuffs {
        name
      }
    }
  }
`;

export const createEmptyStuff = `
  mutation newstuff($name: String) {
    stuffCreateOne(record: { name: $name }) {
      record {
        _id
        name
      }
    }
  }
`;

export const createCharacter = `
  mutation CreateCharacter($name: String!, $level: Float, $gender: EnumCharactersGender, $breed: Float!) {
    createCharacter(record: { name: $name, level: $level, gender: $gender, breed: $breed }) {
  	  name
      level
      breed {
        name
      }
      gender
    }
  }
`;
