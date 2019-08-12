import React from 'react';

import { Route, Switch, Redirect, withRouter } from "react-router";

import MyCharacters from '../../pages/Character/MyCharacters';

import New from './New';
import Details from './Details';
import Error404 from './404';

const Character = ({ showLogin, match: { path } = {} }) => (
  <Switch>
    <Route exact path={`${path}/new`} component={New} />
    <Route exact path={`${path}/:_id`} component={Details} />
    <Route exact path={path} render={() => <MyCharacters showLogin={showLogin} />} />

    <Route component={Error404} />
  </Switch>
);

export default withRouter(Character);
