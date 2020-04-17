import React from 'react';
import { Column, Element, Button } from 'muejs';
import { withRouter } from 'react-router-dom';

import Login from '../../components/Login';

import './stylesheet.styl';


const LoginPage = () => <Login className="page-login" />;


export default LoginPage;
