import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Column, Element } from 'muejs';

import * as cookies from './utils/cookies';
import { useUser } from './hooks/useUser';

import UserContext, { UserProvider } from './store/context/user';
import { EquipmentsProvider } from './store/context/equipments';


import Navbar from './components/Navbar';
import Links from './components/LinksSwitch';
import Content from './components/RoutesSwitch';
import Login from './components/Login';
import AcceptCookie from './components/AcceptCookie';
import Footer from './components/Footer';

import Puddle from './assets/svg/puddle.js';


import './app.styl';


const history = createBrowserHistory();


const App = () => {
  const [shouldShow, showLogin] = useState(false);
  const [acceptCookie, setAcceptCookie] = useState(undefined);

  return (
    <Column className="page">
      <Links className="flex nav-icons absolute" style={{ flexDirection: 'column', top: 0, left: 0 }} showLogin={showLogin} />

      <Puddle className={`puddle ${shouldShow ? "expand" : ""}`} onClick={() => showLogin(!shouldShow)} />
      <Login className={shouldShow ? "visible" : ''} />

      <Element className="main" style={{ placeContent: 'normal', maxHeight: shouldShow ? '100vh' : 'inherit' }}>
        <Content showLogin={showLogin} />
      </Element>

      <AcceptCookie row={0} />

      <Footer />
    </Column>
  );
};


const ApolloProviders = ({ children }) => {
  const context = useContext(UserContext);
  const { token } = useUser(context);

  const apollo = new ApolloClient({
    uri: '//gql.shokkoth.tk/',
    headers: {'Authorization': `Bearer ${token}`}
  });

  return (
    <ApolloProvider client={apollo}>
      <ApolloHooksProvider client={apollo}>
        { children }
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}

ReactDOM.render((
    <Router history={history}>
      <UserProvider>
        <ApolloProviders>
          <EquipmentsProvider>
            <App />
          </EquipmentsProvider>
        </ApolloProviders>
      </UserProvider>
    </Router>
), document.getElementById('root'));
