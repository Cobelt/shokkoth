import React, { useContext } from 'react';

import { withRouter, Redirect, Switch, Route } from 'react-router-dom';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import MyStuffs from '../../pages/MyStuffs';

import Character from '../../pages/Character';
import Route404 from '../../pages/404';


const RoutesSwitch = () => (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route exact path="/login" component={Login} />
    <Route exact path="/stuffs" component={MyStuffs} />
    <Route path="/characters" component={Character} />
    <Route path="/account" render={() => <div>Will display account informations here</div>} />

    <Route path="/404" component={Route404} />
    <Route render={() => <Redirect to="/404" />} />
  </Switch>
);

export default withRouter(RoutesSwitch);
