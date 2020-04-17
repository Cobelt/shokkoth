import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import memoize from 'lodash.memoize'

import { getBreeds } from '../queries'

export const useBreeds = (variables) => {
  const { loading, data: { breedMany: breeds = [] } = {}, error } = useQuery(gql(getBreeds), { variables })
  return { breeds, loading, error }
}

export default useBreeds
