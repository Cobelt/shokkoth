import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';


import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Account from '../../pages/Account';

import Stuffs from '../../pages/Stuffs';
import Characters from '../../pages/Characters';

import Cookies from '../../pages/Cookies';
import Route404 from '../../pages/404';


const RoutesSwitch = ({ showLogin }) => (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route exact path="/login" component={Login} />
    <Route exact path="/account" component={Account} />

    <Route path="/characters" render={() => <Characters showLogin={showLogin} />}  />

    <Route exact path="/cookies" component={Cookies} />

    <Route path="/stuffs" render={() => <Stuffs showLogin={showLogin} />}  />

    <Route path="/404" component={Route404} />
    <Route render={() => <Redirect to="/404" />} />
  </Switch>
);

export default RoutesSwitch;
