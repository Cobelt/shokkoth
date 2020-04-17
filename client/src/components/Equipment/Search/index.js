import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Column, Spinner } from 'muejs'

import SearchBar from './Searchbar'
import List from '../List'

import { arrayToClassName } from '../../../utils/common'
import { equipmentsList } from '../../../queries'

import './stylesheet.styl'


const Search = ({ className, ...otherProps }) => {
  const [variables, setVariables] = useState(null)  

  const { loading, error, data: { equipmentMany: equipments = [] } = {}, refetch } = useQuery(gql(equipmentsList), { variables })

  useEffect(() => {
    refetch()
  }, [JSON.stringify(variables)])

  return (
    <Column className={arrayToClassName(['equipments-search', className])} {...otherProps}>
      <SearchBar setQueryVariables={setVariables} />

      {/* add "type" filter in list (to get only pets, petsmount or mounts for example) */}
      <List equipments={equipments} loading={loading} />
    </Column>
  )
}
export default Search
