import React, { useState} from 'react';
import ReactDOM from 'react-dom';

import { GridsProvider, Grid, Element } from 'muejs';
import { UserProvider } from './store/context/user';

import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RoutesSwitch from './components/RoutesSwitch';

import Puddle from './assets/svg/puddle.js';
import Login from './pages/Login';

import './app.styl';


const history = createBrowserHistory();


const App = () => {
  const [shouldShow, showLogin] = useState(false);

  return (
    <Grid className="page" columnsTemplate="1fr" rowsTemplate={{ 2: 'fit-content(100%)' }}>
      <Puddle className={`puddle ${shouldShow ? "expand" : ""}`} onClick={() => showLogin(!shouldShow)} />

      <div className={`login ${shouldShow ? "visible" : ""}`}>
        <Login />
      </div>


      {/* <Navbar row={0} /> */}
      {/* <Element row={2} style={{ marginTop: '7.2rem', alignContent: 'normal', justifyContent: 'normal' }}><RoutesSwitch /></Element> */}
      <Element row={1} style={{ alignContent: 'normal', justifyContent: 'normal' }}><RoutesSwitch /></Element>
      <Footer row={2} />
    </Grid>
  );
};


ReactDOM.render((
    <Router history={history}>
        <UserProvider>
            <GridsProvider>
                <App />
            </GridsProvider>
        </UserProvider>
    </Router>
), document.getElementById('root'));
