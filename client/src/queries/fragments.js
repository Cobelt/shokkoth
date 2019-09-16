export const mainEquipmentsData = `
  fragment mainEquipmentsData on Equipments {
    _id
    ankamaId
    name
    level
    type
    category
    description
    statistics
    characteristics
    passives
    conditions
    imgUrl
    url

    set {
      _id
      name
      level
      imgUrl
      url
      bonus
      equipments {
        _id
      }
    }
  }
`;

export const stuffStats = `
  fragment stuffStats on Stuffs {
    stats {
      attributed {
        VITALITY
        WIDSDOM
        STRENGTH
        INTELLIGENCE
        CHANCE
        AGILITY
      }
      parchment {
        VITALITY
        WIDSDOM
        STRENGTH
        INTELLIGENCE
        CHANCE
        AGILITY
      }
    }
  }
`;

export const stuffEquipments = `
  fragment stuffEquipments on Stuffs {
    equipments {
      ...mainEquipmentsData
    }
  }
  ${mainEquipmentsData}
`;

export const stuffFragment = `
  fragment stuffFragment on Stuffs {
    _id
    name
    public
    level
    ...stuffStats
    ...stuffEquipments
  }
  ${stuffStats}
  ${stuffEquipments}
`;

export const breedFragment = `
  fragment breedFragment on Breeds {
    _id
    name
    skins {
      male
      female
    }
  }
`;

export const characterWithoutStuffs = `
  fragment characterWithoutStuffs on Characters {
    _id
    name
    level
    gender
    public
    breed {
      ...breedFragment
    }
  }
  ${breedFragment}
`;
