import get from 'lodash.get';

import {
  STATS,
  AP,
  MP,
  SUMMONS,
  VITALITY,
  INITIATIVE,
  ELEMENTS_STATS,
} from '../../constants/stats';


export const calculateStats = (newStats, stuff, setsBonuses, characterStats) => {
  newStats[AP] = stuff.lvl && stuff.lvl < 100 ? 6 : 7;
  newStats[MP] = 3;
  newStats[SUMMONS] = 1;
  newStats[VITALITY] = 55 + (stuff.lvl || 200) * 5;

  if (characterStats) {
    for (let [statName, { base = 0, parchemin = 0 } = {}] in Object.entries(characterStats)) {
      newStats[statName] += base + parchemin;
    }
  }

  if (stuff) {
    for (let [category, equipment] of Object.entries(stuff)) {
      if (get(equipment, 'statistics.length') > 0)
      for (let stat of equipment.statistics) {
        if (stat && Object.keys(STATS).includes(stat.name)) {
          newStats[stat.name] += parseInt(stat.value || stat.max || stat.min, 10);
        }
      }
    }

    if (setsBonuses) {
      for (let { nbItems, equiped, set } of setsBonuses) {
        const currentBonus = set.bonus.find(bonus => bonus.number === nbItems - 1);
        if (get(currentBonus, 'statistics')) {
          for (let stat of currentBonus.statistics) {
            if (stat && Object.keys(STATS).includes(stat.name)) {
              newStats[stat.name] += parseInt(stat.value || stat.max || stat.min, 10);
            }
          }
        }
      }
    }
  }

  Object.keys(ELEMENTS_STATS).forEach(name => {
    newStats[INITIATIVE] += newStats[name];
  });

  return newStats
}
