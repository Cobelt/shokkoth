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
    <Route exact path={`${path}/new`} component={New} />
    <Route exact path={`${path}/edit/:_id`} component={Edit} />
    <Route exact path={`${path}/error/:errorType`} component={Error404} />
    <Route exact path={`${path}/:_id`} component={Public} />
    <Route exact path={`${path}/`} component={Search} />

    <Route render={() => <Redirect to={`${path}/error/404`} />} />
  </Switch>
);

export default withRouter(Stuff);
