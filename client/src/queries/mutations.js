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
