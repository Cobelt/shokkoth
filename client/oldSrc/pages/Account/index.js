import React from 'react';
import { Column, Element, Button } from 'muejs';
import { withRouter } from 'react-router-dom';

import Account from '../../components/Account';

import './stylesheet.styl';


const AccountPage = ({ match, location, history, staticContext, className, ...props }) => {


  return (
    <div className="page-account">
      <Account />
    </div>
  );
}

export default withRouter(AccountPage);
