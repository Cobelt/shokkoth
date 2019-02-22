import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { GridsProvider, Grid } from 'muejs';

import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './app.styl';


const history = createBrowserHistory();


class App extends Component {
    render() {
        const quantityOfRows = 6;
        return (
            <Grid className="page" rowsTemplate={{ [quantityOfRows]: 'fit-content(100%)' }} columnsTemplate={{ 1: '1fr', 2: '60vw', 3: '1fr' }}>
                <Navbar row={0} />
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
                <Footer row={quantityOfRows} />
            </Grid>
        )
    }
}


ReactDOM.render((
    <Router history={history}>
        <GridsProvider>
            <App />
        </GridsProvider>
    </Router>
), document.getElementById('root'));
