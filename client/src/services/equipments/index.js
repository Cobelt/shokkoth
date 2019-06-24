import axios from 'axios';
import { WEAPONS, PETS, MOUNTS, EQUIPMENTS, ALL } from '../../constants/equipments';


export async function fetchTypes() {
  const response = await axios.get('//api.shokkoth.tk/equipments/all/types');
  return response.data;
}


export async function fetchOne({ id }) {
  const response = await axios.get(`//api.shokkoth.tk/equipments/all/get/${id}`);
  return response.data;
}

export async function fetchSome({ ids }) {
  const idsParam = ids.map(id => `ids[]=${id}`).join('&')
  const response = await axios.get(`//api.shokkoth.tk/equipments/all/get/some?${idsParam}`);
  return response.data;
}


export async function fetchEquipments({ perPage, page, types, order, lvlMin, lvlMax } = {}) {
  const params = [];
  if (perPage) params.push(`perPage=${perPage}`);
  if (page) params.push(`page=${page}`);

  if (order) params.push(`order=${JSON.stringify(order)}`);

  if (lvlMin) params.push(`lvlMin=${lvlMin}`);
  if (lvlMax) params.push(`lvlMax=${lvlMax}`);

  let typesGroup = '';
  switch (types) {
    case WEAPONS:
      typesGroup = 'weapons'
      break;
    case MOUNTS:
      typesGroup = 'mounts'
      break;
    case PETS:
      typesGroup = 'pets'
      break;
    case ALL:
      typesGroup = 'all'
      break;
    case EQUIPMENTS:
      typesGroup = ''
      break;
    default: {
      typesGroup = 'all';
      if (types)params.push(`types=${types}`);
      break;
    }
  }

  const response = await axios.get(`//api.shokkoth.tk/equipments/${typesGroup ? `${typesGroup}/` : ''}details?${params.join('&')}`);
  return response.data;
}
