import React from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Mines from './Mines';
import New from './New';
import Edit from './Edit';
import Public from './Public';
import Error404 from './404';

const Stuff = ({ match: { path } = {} }) => (
  <Switch>
    <Route exact path={`${path}/mines`} component={Mines} />
    <Route exact path={`${path}/new/:characterId?`} component={New} />
    <Route exact path={`${path}/error/:errorType`} component={Edit} />
    <Route exact path={`${path}/edit/:_id`} component={Error404} />
    <Route exact path={`${path}/:_id`} component={Public} />

    <Route render={() => <Redirect to={`${path}/error/404`} />} />
  </Switch>
);

export default withRouter(Stuff);
