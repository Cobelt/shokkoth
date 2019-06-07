import axios from 'axios';

export async function fetchTypes() {
  const response = await axios.get('http://api.shokkoth.tk/equipments/types');
  return response.data;
}



export async function fetchEquipments({ perPage, page, type, order, currentLevel, lvlMin, lvlMax } = {}) {
  const params = [];
  if (perPage) params.push(`perPage=${perPage}`);
  if (page) params.push(`page=${page}`);
  if (type) params.push(`type=${type}`);
  if (order) params.push(`order=${JSON.stringify(order)}`);

  if (currentLevel) params.push(`currentLevel=${currentLevel}`);
  if (lvlMin) params.push(`lvlMin=${lvlMin}`);
  if (lvlMax) params.push(`lvlMax=${lvlMax}`);

  const response = await axios.get(`http://api.shokkoth.tk/equipments/details?${params.join('&')}`);
  return response.data;
}
