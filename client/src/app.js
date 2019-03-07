import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { GridsProvider, Grid } from 'muejs';
import { UserProvider } from './store/context/user';

import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import MyStuffs from './pages/MyStuffs';
import MyCharacters from './pages/MyCharacters';

import './app.styl';


const history = createBrowserHistory();


class App extends Component {
    render() {
        const quantityOfRows = 4;
        return (
            <Grid className="page" rowsTemplate={{ 2: '50vh', [quantityOfRows]: 'fit-content(100%)' }} columnsTemplate={{ 1: '1fr', 2: '47.5vw', 3: '47.5vw', 4: '1fr' }}>
                <Navbar row={0} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/my-stuffs" component={MyStuffs} />
                    <Route path="/my-characters" component={MyCharacters} />
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
