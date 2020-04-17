import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import { Grid, Spinner } from 'muejs'

import { useUser } from '../../../hooks/useUser'

import StuffsSearch from '../../../components/Stuff/Search'

import { getMyStuffs } from '../../../queries'

import './stylesheet.styl'


const MyStuffs = () => {
  const { token, user, isLogged } = useUser()

  const variables = { filter: { notDraft: true, notEmpty: true } }
  const { data: { myStuffs: stuffs = [] } = {}, loading, error, refetch } = useQuery(gql(getMyStuffs), { variables })

  if (token && !user) return <Spinner />

  if (!token && !isLogged) return <Redirect to="/login" />

  return (
    <Grid className="my-stuffs stuffs-list" gap="3rem" columnsTemplate={{ xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)', xxxl: 'repeat(4, 1fr)' }}>

      <StuffsSearch
        searchBarPosition={{ row: 1, width: { md: 2, xl: 3, xxxl: 4 } }}
        spinnerPosition={{ row: 2, width: { md: 2, xl: 3, xxxl: 4 } }}
        stuffs={stuffs}
        refetch={refetch}
        error={error}
        loading={loading}
        defaultSmall={true}
      />

    </Grid>
  )
}
export default MyStuffs
