import removeAccent from 'lodash.deburr';

export function updateLastModifDate(next) {
  try {
      this.updatedAt = Date.now();
      next();
  } catch (err) {
      next(err);
  }
}

export const toLowerCaseNFC = string => string.normalize('NFC').toLowerCase();

export const toURLValid = string => toLowerCaseNFC(removeAccent(string).replace(/\W+/g, '-'));

export const findKey = (type, translations) => {
  const validType = toURLValid(type);
  const [found] = Object.entries(translations).find(([key, translation]) => {
    return (toURLValid(translation.fr) === validType || toURLValid(translation.en) === validType);
  }) || [undefined];
  return found;
}

export const translateType = (type, translations, lang) => {
  const validType = toURLValid(type);
  const found = Object.values(translations).map(translation => {
    if (toURLValid(translation.fr) === validType || toURLValid(translation.en) === validType) {
      if (['fr', 'en'].includes(lang.toLowerCase())) return translation[lang];
      if (toURLValid(translation.fr) === validType) return translation.en;
      if (toURLValid(translation.en) === validType) return translation.fr;
    }
  }).filter(e => !!e);
  if (found.length > 0) return found[0];
}

export const validateype = (type, translationName, translations) => {
  if (!get(translations, translationName)) return false;

  if (translationName === findKey(type, translations)) return true;
  return false;
}
