import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Column, Element } from 'muejs';

import * as selectors from './store/selectors/user';

import UserContext, { UserProvider } from './store/context/user';
import { EquipmentsProvider } from './store/context/equipments';
// import { DataProvider } from './store/context/data';


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
      <Navbar />

      <Content showLogin={showLogin} />

      <AcceptCookie row={0} />

      <Footer />
    </Column>
  );
};


const ConfiguredApolloProvider = ({ children }) => {
  const [store] = useContext(UserContext);
  const token = selectors.getJWT(store);
  const cache = new InMemoryCache();

  const apollo = new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? '//graphql.dev.shokkoth.tk' : '//graphql.shokkoth.tk/',
    headers: token && {'Authorization': `Bearer ${token}`},
    cache,
  });

  return (
    <ApolloProvider client={apollo}>
      { children }
    </ApolloProvider>
  )
}

ReactDOM.render((
    <Router history={history}>
      <UserProvider>
        <ConfiguredApolloProvider>

            <EquipmentsProvider>
                <App />
            </EquipmentsProvider>

        </ConfiguredApolloProvider>
      </UserProvider>
    </Router>
), document.getElementById('root'));
