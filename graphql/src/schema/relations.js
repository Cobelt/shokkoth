export default function createRelations({ BreedsTC, SetsTC, EquipmentsTC, StuffsTC, CharactersTC, UsersTC }) {

  SetsTC.addRelation(
    'equipments',
    {
      resolver: () => EquipmentsTC.getResolver('findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.equipments,
      },
      projection: { equipments: 1 },
    }
  );

  EquipmentsTC.addRelation(
    'set',
    {
      resolver: () => SetsTC.getResolver('findById'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _id: (source) => source.set,
      },
      projection: { set: 1 },
    }
  );

  CharactersTC.addRelation(
    'classe',
    {
      resolver: () => BreedsTC.getResolver('findById'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _id: (source) => source.classe,
      },
      projection: { classe: 1 },
    }
  );

  UsersTC.addRelation(
  'characters',
  {
    resolver: () => CharactersTC.getResolver('findByIds'),
    prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
      _ids: (source) => source.characters,
    },
    projection: { characters: 1 },
  }
);
}
