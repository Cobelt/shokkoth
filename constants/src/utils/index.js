import removeAccent from 'lodash.deburr'
import get from 'lodash.get'

export function updateLastModifDate(next) {
  try {
      this.updatedAt = Date.now()
      next()
  } catch (err) {
      next(err)
  }
}

export const toLowerCaseNFC = string => string.normalize('NFC').toLowerCase()

export const toURLValid = string => toLowerCaseNFC(removeAccent(string).replace(/\W+/g, '-'))

export function findKey (type, translations) {
  const validType = toURLValid(type)
  const [foundKey, foundTranslation] = Object.entries(translations).find(([key, translation]) => {
    return (toURLValid(translation.fr) === validType || toURLValid(translation.en) === validType)
  }) || []
  return foundKey
}

export function findOrder (type, translations) {
  return get(translations, `[${type}].order`)
}

export function findCategory (type, translations) {
  return get(translations, `[${type}].category`)
}

export function findTypesOfCategory (category, translations) {
  return Object.entries(translations).map(([key, value]) => {
    if (!category && get(value, 'category') || category && get(value, 'category') == category) return key
  }).filter(e => !!e)
}

export const translateType = (type, translations, lang) => {
  const validType = toURLValid(type)
  console.log({ validType })
  const found = Object.values(translations).map(translation => {
    if (toURLValid(translation.fr) === validType || toURLValid(translation.en) === validType) {
      if (['fr', 'en'].includes(lang.toLowerCase())) return translation[lang]
      if (toURLValid(translation.fr) === validType) return translation.en
      if (toURLValid(translation.en) === validType) return translation.fr
    }
  }).filter(e => !!e)
  if (found.length > 0) return found[0]
}

export const validate = (type, translationName, translations = {}) => {
  if (!translations[translationName]) return false
  if (translationName === findKey(type, translations)) return true
  return false
}
