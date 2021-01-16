import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Redirect } from 'react-router-dom'
import { Spinner } from 'muejs'

import { useUser } from '../../../hooks/useUser'

import StuffsSearch from '../../../components/Stuff/Search'

import { getMyStuffs } from '../../../queries'

import './stylesheet.styl'


const MyStuffs = () => {
  const { token, user, isLogged } = useUser()

  const { data: { myStuffs: stuffs = [] } = {}, loading, error, refetch } = useQuery(gql(getMyStuffs))

  if (token && !user) return <Spinner />

  if (!token && !isLogged) return <Redirect to="/login" />

  return (
      <StuffsSearch
        className="flex-1"
        stuffs={stuffs}
        refetch={refetch}
        error={error}
        loading={loading}
        defaultSmall={true}
      />
  )
}
export default MyStuffs
