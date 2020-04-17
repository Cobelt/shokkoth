import removeAccent from 'lodash.deburr';

export const toLowerCaseNFC = string => string.normalize('NFC').toLowerCase();

export const toURLValid = string => toLowerCaseNFC(removeAccent(string).replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').replace(/\W+/g, '-'));

export const arrayToClassName = array => Array.isArray(array) && array.filter(e => !!e).join(' ').trim()

export const removeEmpty = obj => {
    const newObj = {}

    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === "object") {
            newObj[key] = removeEmpty(obj[key]) // recurse
        } else if (obj[key] != null) {
            newObj[key] = obj[key] // copy value
        }
    })

    return newObj
}