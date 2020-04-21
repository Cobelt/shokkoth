import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Column, Row, Icon } from 'muejs'

import SearchBar from './Searchbar'
import List from '../List'

import { arrayToClassName } from '../../../utils/common'
import { equipmentsList } from '../../../queries'

import './stylesheet.styl'


const Search = ({ className, ...otherProps }) => {
  const [isMinimized, minimizeSearch] = useState(false)
  const [variables, setVariables] = useState(null)

  const [fetch, { called, data: { equipmentMany: equipments = [] } = {}, loading, error }] = useLazyQuery(gql(equipmentsList), { variables })

  useEffect(() => {
    fetch()
  }, [JSON.stringify(variables)])

  return (
    <Column className={arrayToClassName(['equipments-search',  isMinimized && 'minimized', className])} {...otherProps}>
      <Row className="justify-center hide-since-lg" style={{ transform: 'translateY(50%)' }}>
        <span 
          onClick={() => minimizeSearch(!isMinimized)} 
          className={`bg-primary round ph-20 pb-30 pt-5 pointer`}
        >
          <Icon icon={ isMinimized ? 'add' : 'remove' } size="sm" />
        </span>
      </Row>
      
      <SearchBar setQueryVariables={setVariables} />

      <List equipments={equipments} loading={called && loading} />
    </Column>
  )
}
export default Search
