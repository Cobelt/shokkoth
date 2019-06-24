import get from 'lodash.get';

import { isStat, isPassif, isWeaponCharac, getWeaponCharac, getStatSrcImg, getDefaultPassiveImg } from './stats';
import { toCategory } from './equipments';

export const formatCharacteristics = equipment => {
  const toReturn = equipment;
  const characteristicsArray = [];

  if (get(equipment, 'characteristics')) {
    for (let [name, values] of Object.entries(get(equipment, 'characteristics'))) {
      if (name === 'CC') {
        const [rateToFix, boostToFix] = values.split(' ');

        const rate = rateToFix && rateToFix.replace(/^1\//, '');
        const boost = boostToFix && boostToFix.replace(/\(|\)|\+]/gi, '')

        if (parseInt(rate, 10) === 0) {
          name = 'Pas de critique possible';
          characteristicsArray.push({ name, ...getWeaponCharac('Pas de critique possible') });
        }
        else {
          name = '% Critique (base)';
          characteristicsArray.push({ name, ...getWeaponCharac(name), min: rate, max: rate });
          name = 'Dommages bonus (CC)';
          characteristicsArray.push({ name, ...getWeaponCharac(name), min: boost, max: boost });
        }
      }
      else {
        values = (typeof values === 'string' ? { value: values } : values);
        characteristicsArray.push({ name, ...getWeaponCharac(name), ...values });
      }
    }

    toReturn.characteristics = characteristicsArray;
  }

  return toReturn;
}

export const formatStatistics = equipment => {
    const toReturn = equipment;
    const statisticsArray = [];
    const passivesArray = [];

    if (get(equipment, 'statistics.length') > 0) {
        equipment.statistics.forEach((stat, index) => {
          const entries = Object.entries(stat)[0];
          const value = typeof entries[1] === 'string' ? { value: entries[1] } : { min: entries[1].min || entries[1].max, max: entries[1].max || entries[1].min };

          if (entries[0].match(/^\(.*?\)$/)) {
            const finalName = entries[0].replace(/^\((.*?)\)$/, '$1');
            toReturn.characteristics.push({ name: finalName, ...getWeaponCharac(finalName), ...value });
          }
          else if (entries[0] !== 'Compatible avec : 0') {
            if (isStat(entries[0]))
              statisticsArray.push({ name: entries[0], imgUrl: getStatSrcImg(entries[0]), ...value });
            else if (isPassif(entries[0]))
              passivesArray.push({ name: entries[0], imgUrl: getDefaultPassiveImg(entries[0]), ...value })
          }

        });
        toReturn.statistics = statisticsArray;
        toReturn.passives = passivesArray;
    }
    return toReturn;
};


export const formatRecipe = equipment => {
    const toReturn = equipment;
    if (get(equipment, 'recipe.length') > 0) {
        equipment.recipe.forEach((stat, index) => {
            const statEntry = Object.entries(stat)[0];
            const { imgUrl, ankamaId: _id, ...infos } = statEntry[1];
            // Todo : new model Resource and just put the _id here
            toReturn.recipe[index] = { _id, name: statEntry[0], imgUrl: imgUrl.replace('https://s.ankama.com/www/static.ankama.com', '//img.shokkoth.tk'), ...infos };
        });
    }
    return toReturn;
};


export const formatImgUrl = equipment => {
  const toReturn = equipment;
  if (equipment.imgUrl) {
    toReturn.imgUrl = equipment.imgUrl.replace('https://s.ankama.com/www/static.ankama.com', '//img.shokkoth.tk');
  }
  return toReturn;
};


export const formatTypeToCategory = equipment => {
  const toReturn = equipment;
  toReturn.category = toCategory(equipment.type);
  return toReturn;
}


export const formatId = equipment => {
  const toReturn = equipment;
  toReturn._id = equipment.ankamaId;
  return toReturn;
};

export const formatFullEquipment = toFormat => formatId(formatTypeToCategory(formatImgUrl(formatRecipe(formatStatistics(formatCharacteristics(toFormat))))));
