import React, { useContext } from 'react';
import { Column, Element, Button } from 'muejs';
import { withRouter } from 'react-router-dom';

import UserContext from '../../store/context/user';
import Account from '../../components/Account';

import './stylesheet.styl';


const AccountPage = ({ match, location, history, staticContext, className, ...props }) => {
  const context = useContext(UserContext);

  return (
    <div className="page-account">
      <Account context={context} />
    </div>
  );
}

export default withRouter(AccountPage);
