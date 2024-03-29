export default function createRelations({ BreedsTC, SetsTC, EquipmentsTC, StuffsTC, CharactersTC, UsersTC }) {
  // RecipesTC.addRelation(
  //   'create',
  //   {
  //     resolver: () => EquipmentsTC.get('$findByIds'),
  //     prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
  //       _ids: (source) => source.create,
  //     },
  //     projection: { create: 1, createModel: 1 },
  //   }
  // )

  StuffsTC.addRelation(
    'character',
    {
      resolver: () => CharactersTC.get('$findOne'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        filter: (source) => ({
          hasStuffIn: source._id,
        }),
      },
      projection: { _id: 1 },
    }
  );

  StuffsTC.addRelation(
    'equipments',
    {
      resolver: () => EquipmentsTC.get('$findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.equipments,
      },
      projection: { equipments: 1 },
    }
  );
  
  StuffsTC.addRelation(
    'breed',
    {
      resolver: () => BreedsTC.get('$findById'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _id: (source) => source.breed,
      },
      projection: { breed: 1 },
    }
  );

  SetsTC.addRelation(
    'equipments',
    {
      resolver: () => EquipmentsTC.get('$findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: source => source.equipments,
      },
      projection: { equipments: 1 },
    }
  );

  EquipmentsTC.addRelation(
    'set',
    {
      resolver: () => SetsTC.get('$findOne'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        filter: (source) => ({
          equipments: source._id,
        }),
      },
      projection: { _id: 1 },
    }
  );

  CharactersTC.addRelation(
    'breed',
    {
      resolver: () => BreedsTC.get('$findById'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _id: (source) => source.breed,
      },
      projection: { breed: 1 },
    }
  );

  CharactersTC.addRelation(
    'stuffs',
    {
      resolver: () => StuffsTC.get('$findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.stuffs,
      },
      projection: { stuffs: 1 },
    }
  );

  UsersTC.addRelation(
    'characters',
    {
      resolver: () => CharactersTC.get('$findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.characters,
      },
      projection: { characters: 1 },
    }
  );

  UsersTC.addRelation(
    'stuffs',
    {
      resolver: () => StuffsTC.get('$findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.stuffs,
      },
      projection: { stuffs: 1 },
    }
  );
}
