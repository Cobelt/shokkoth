import { useReducer } from 'react'
import get from 'lodash.get'
import clone from 'lodash.clonedeep'

import { removeEmpty } from '../utils/common'

function reducer(state, action) {
    const toReturn = clone(state)

    Object.entries(action).forEach(([name, value]) => {
        if (name === 'options') return null
        
        const currentValue = get(state, name)
        if (currentValue instanceof Object) {
            const { options: { replace } = {} } = action || {}
            if (replace) {
                toReturn[name] = value
            }
            else {
                toReturn[name] = { ...currentValue, ...value }
            }
        }
        else {
            toReturn[name] = value
        }
    })

    return removeEmpty(toReturn)
}

export const useParams = (initialState) => {
    return useReducer(reducer, initialState)
}

export default useParams
