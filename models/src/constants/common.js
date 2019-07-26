import { EquipmentsTypes, translateEquipmentsTypes } from './equipments';
import { WeaponsTypes, translateWeaponsTypes } from './weapons';
import { MountsTypes, translateMountsTypes } from './mounts';
import { PetsTypes, translatePetsTypes } from './pets';

export const AllTypes = [
  ...EquipmentsTypes,
  ...WeaponsTypes,
  ...MountsTypes,
  ...PetsTypes,

]

export const allTranslations = {
  ...translateEquipmentsTypes,
  ...translateWeaponsTypes,
  ...translateMountsTypes,
  ...translatePetsTypes,
  
}
