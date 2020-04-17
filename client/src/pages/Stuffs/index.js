import React from 'react';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';

import New from './New'



const MyRoutes = ({ match: { path } = {} }) => (
  <Switch>
    <Route exact path={`${path}/new`} component={New} />
    {/* <Route exact path={`${path}/edit/:_id`} component={Edit} />
    <Route exact path={`${path}/error/:errorType`} component={Error404} />
    <Route exact path={`${path}/:_id`} component={Public} />
    <Route exact path={`${path}/`} component={Search} /> */}

    <Route render={() => <Redirect to={`${path}/404`} />} />
  </Switch>
);

export default withRouter(MyRoutes);
