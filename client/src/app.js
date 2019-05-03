import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { GridsProvider, Grid } from 'muejs';
import { UserProvider } from './store/context/user';

import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import MyStuffs from './pages/MyStuffs';

import Character from './pages/Character';
import Route404 from './pages/404';

import './app.styl';


const history = createBrowserHistory();


class App extends Component {
    render() {
        const quantityOfRows = 5;
        return (
            <Grid className="page" rowsTemplate={{ 1: '1fr', 2: '2fr', 3: '1fr', [quantityOfRows]: 'fit-content(100%)' }} columnsTemplate={{ 1: '1fr', 2: '25vw', 3: '20vw', 4: '20vw', 5: '25vw', 6: '1fr' }}>
                <Navbar row={0} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/public" render={() => <div>Public</div>} />

                    <Route exact path="/login" component={Login} />
                    <Route exact path="/stuffs" component={MyStuffs} />
                    <Route path="/characters" component={Character} />

                    <Route component={Route404} />
                </Switch>
                <Footer row={quantityOfRows} />
            </Grid>
        )
    }
}


ReactDOM.render((
    <Router history={history}>
        <UserProvider>
            <GridsProvider>
                <App />
            </GridsProvider>
        </UserProvider>
    </Router>
), document.getElementById('root'));
