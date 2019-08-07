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

export const stuffEquipments = `
  fragment stuffEquipments on Stuffs {
    equipments {
      ...mainEquipmentsData
    }
  }
  ${mainEquipmentsData}
`;
