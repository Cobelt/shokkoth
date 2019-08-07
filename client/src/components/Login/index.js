import React, { useState, useContext } from 'react';
import get from 'lodash.get';
import { withRouter, Redirect } from 'react-router-dom';
import { Column } from 'muejs';

import UserContext from '../../store/context/user';

import { useUser } from '../../hooks/useUser';
import { arrayToClassName } from '../../utils/common';

import Shokkoth from './shokkoth-login';
import Account from '../Account';
import LoginForm from '../LoginForm';

import './stylesheet.styl';


const Login = ({ className, ...props }) => {
  const context = useContext(UserContext);

  const [look, setLook] = useState('half-closed');
  const [submitted, setSubmitted] = useState(false);

  const { isLogged, loginError } = useUser(context);

  return (
    <Column className={arrayToClassName(['login', ((submitted && !loginError) || isLogged) && "successfully-logged", className])} {...props}>
      <Shokkoth className="shokkoth" look={look} />

      { isLogged ?
        <Account context={context} /> :
        <LoginForm setLook={setLook} setSubmitted={setSubmitted} submitted={submitted} context={context} />
      }

    </Column>
  );
}

export default Login;
