import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';


import Account from './Account';
import Login from './Login';

import My from './My';
import Stuffs from './Stuffs';

// import Characters from '../../pages/Characters';

// import Cookies from '../../pages/Cookies';
// import Route404 from '../../pages/404';


const RoutesSwitch = () => (
  <Switch>

    <Route exact path="/login" component={Login} />
    <Route exact path="/account" component={Account} />
    
    <Route path="/my" component={My} />
    <Route path="/stuffs" component={Stuffs} />

    {/* 
    <Route path="/characters" render={() => <Characters showLogin={showLogin} />}  />

    <Route exact path="/cookies" component={Cookies} />

    <Route path="/stuffs" render={() => <Stuffs showLogin={showLogin} />}  />

    <Route path="/404" component={Route404} />
    */}

  </Switch>
);

export default RoutesSwitch;
