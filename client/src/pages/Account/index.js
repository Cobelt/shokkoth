import React from 'react'
import { withRouter } from 'react-router-dom'
import { Column, Element, Button } from 'muejs'
import get from 'lodash.get'

import useUser from '../../hooks/useUser'

import './stylesheet.styl'


const Account = ({ match, location, history, staticContext, ...props }) => {
  const { user, logout } = useUser()

  return (
    <Column className="page-account" style={{ flex: 0 }}>
      <Element type="h2" className="m-0 font-primary text-center">Bonjour { get(user, 'username') },</Element>

      <Button aspect='filled-error' className='logout p-15 flex-1' onClick={() => logout()}>Se déconnecter</Button>
    </Column>
  )
}

export default withRouter(Account)
