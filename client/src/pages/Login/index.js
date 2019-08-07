import React from 'react';
import { Column, Element, Button } from 'muejs';
import { withRouter } from 'react-router-dom';

import Login from '../../components/Login';

import './stylesheet.styl';


const LoginPage = ({ match, location, history, staticContext, className, ...props }) => {
  return (
    <div className="page-login">
      <Login />
    </div>
  );
}

export default withRouter(LoginPage);
