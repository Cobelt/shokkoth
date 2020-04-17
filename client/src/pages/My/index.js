import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import MyStuffs from './Stuffs'



const MyRoutes = () => (
  <Switch>
    <Route exact path="/my/stuffs" component={MyStuffs} />

    <Route render={() => <Redirect to="/my/stuffs" />} /> 
  </Switch>
);

export default MyRoutes;
