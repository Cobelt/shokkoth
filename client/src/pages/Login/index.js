import React, { useState, useContext, useEffect } from 'react';
import { Column } from 'muejs';
import { withRouter, Redirect } from 'react-router-dom';

import { useUser } from '../../hooks/useUser';
import { arrayToClassName } from '../../utils/common';

import Shokkoth from '../../assets/svg/shokkoth-login';
import LoginForm from '../../components/LoginForm';

import './stylesheet.styl';


const Login = ({ history }) => {

    const [look, setLook] = useState('half-closed');
    const [submitted, setSubmitted] = useState(false);
  
    const { isLogged, loginError, error } = useUser();
    if (error) console.error(error)

    useEffect(() => {
        if (isLogged) {
            history.push('/my/stuffs')
        }
    }, [isLogged])
  
    return (
      <Column className={arrayToClassName(['login', ((submitted && !loginError) || isLogged) && "successfully-logged", "page-login"])}>
        <Shokkoth className="shokkoth" look={look} />
  
        { isLogged ?
          <Redirect to="/account" /> :
          <LoginForm setLook={setLook} setSubmitted={setSubmitted} submitted={submitted} />
        }
  
      </Column>
    );
}


export default withRouter(Login);
