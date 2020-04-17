import React, { useState, useEffect, useContext } from 'react';
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
import { DataProvider } from './store/context/data';

import Navbar from './components/Navbar';
import Content from './components/RoutesSwitch';
import { GRAPHQL_URI } from './constants/URIs';


import './app.styl';


const history = createBrowserHistory();

const App = () => {
  const [shouldShow, showLogin] = useState(false);
  const [acceptCookie, setAcceptCookie] = useState(undefined);

  return (
    <Column className="page">
      <Navbar />

      <Content showLogin={showLogin} />

      {/* <AcceptCookies row={0} /> */}

      {/* <Footer /> */}
    </Column>
  );
};


const ConfiguredApolloProvider = ({ children }) => {
  const [store] = useContext(UserContext);
  const token = selectors.getJWT(store);
  const cache = new InMemoryCache();

  const apollo = new ApolloClient({
    uri: GRAPHQL_URI,
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
          <DataProvider>
            <EquipmentsProvider>
                <App />
            </EquipmentsProvider>
          </DataProvider>
        </ConfiguredApolloProvider>
      </UserProvider>
    </Router>
), document.getElementById('root'));
