import get from 'lodash.get';
import set from 'lodash.set';

import { isStat, isPassif, isWeaponCharac, getWeaponCharac, getStatSrcImg, getDefaultPassiveImg } from './stats';
import { toCategory } from './equipments';

export const formatCharacteristics = toFormat => {
  const toReturn = toFormat;
  const characteristicsArray = [];

  if (get(toFormat, 'characteristics')) {
    for (let [name, values] of Object.entries(get(toFormat, 'characteristics'))) {
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


export const formatStatistics = toFormat => {
    const toReturn = toFormat;
    const statisticsArray = [];
    const passivesArray = [];

    if (get(toFormat, 'statistics.length') > 0) {
        toFormat.statistics.forEach((stat, index) => {
          const [name, values] = Object.entries(stat)[0] || [];
          const value = typeof values === 'string' ? { value: values } : { min: values.min || values.max, max: values.max || values.min };

          if (name.match(/^\(.*?\)$/)) {
            const finalName = name.replace(/^\((.*?)\)$/, '$1');
            toReturn.characteristics.push({ name: finalName, ...getWeaponCharac(finalName), ...value });
          }
          else if (name !== 'Compatible avec : 0') {
            if (isStat(name))
              statisticsArray.push({ name, imgUrl: getStatSrcImg(name), ...value });
            else if (isPassif(name))
              passivesArray.push({ name, imgUrl: getDefaultPassiveImg(name), ...value })
          }

        });
        toReturn.statistics = statisticsArray;
        toReturn.passives = passivesArray;
    }
    return toReturn;
};


export const formatSetBonus = toFormat => {
  const toReturn = toFormat;

  if (get(toFormat, 'bonus.length') > 0) {
    toFormat.bonus.forEach((bonus, index) => {

      if (get(bonus, 'statistics.length') > 0) {
        const statisticsArray = [];
        const passivesArray = [];
        bonus.statistics.forEach((stat, statIndex) => {

          const [name, values] = Object.entries(stat)[0] || [];
          const value = typeof values === 'string' ? { value: values } : { min: values.min || values.max, max: values.max || values.min };

          if (name !== 'Compatible avec : 0') {
            if (isStat(name))
              statisticsArray.push({ name, imgUrl: getStatSrcImg(name), ...value });
            else
              passivesArray.push({ name, imgUrl: getDefaultPassiveImg(name), ...value })
          }

        });
        
        set(toReturn, `bonus[${index}].statistics`, statisticsArray);
        set(toReturn, `bonus[${index}].passives`, passivesArray);
      }
    });
  }
  return toReturn;
};


export const formatRecipe = toFormat => {
    const toReturn = toFormat;
    if (get(toFormat, 'recipe.length') > 0) {
        toFormat.recipe.forEach((stat, index) => {
            const statEntry = Object.entries(stat)[0];
            const { imgUrl, ankamaId: _id, ...infos } = statEntry[1];
            // Todo : new model Resource and just put the _id here
            toReturn.recipe[index] = { _id, name: statEntry[0], imgUrl: imgUrl.replace('https://s.ankama.com/www/static.ankama.com', '//img.shokkoth.tk'), ...infos };
        });
    }
    return toReturn;
};


export const formatImgUrl = toFormat => {
  const toReturn = toFormat;
  if (toFormat.imgUrl) {
    toReturn.imgUrl = toFormat.imgUrl.replace('https://s.ankama.com/www/static.ankama.com', '//img.shokkoth.tk');
  }
  return toReturn;
};


export const formatTypeToCategory = toFormat => {
  const toReturn = toFormat;
  toReturn.category = toCategory(toFormat.type);
  return toReturn;
}


export const formatId = toFormat => {
  const toReturn = toFormat;
  toReturn._id = toFormat.ankamaId || toFormat._id || toFormat.id;
  toReturn.set = toFormat.set || toFormat.setId;
  return toReturn;
};

export const formatFullEquipment = toFormat => formatId(formatTypeToCategory(formatImgUrl(formatRecipe(formatStatistics(formatCharacteristics(toFormat))))));


export const formatSet = toFormat => formatId(formatImgUrl(formatSetBonus(toFormat)));
