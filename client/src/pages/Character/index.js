import React, { Component } from 'react';

import { Route, Switch, Redirect, withRouter } from "react-router";

import MyCharacters from '../../pages/Character/MyCharacters';

import Details from './Details';
import Error404 from './404';

class Character extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { location, match: { path } = {} } = this.props;
        console.log('location', location, 'path', path);
        return (
            <Switch>
                <Route exact path={`${path}/:id`} component={Details} />
                <Route exact path={path} component={MyCharacters} />

                <Route component={Error404} />
            </Switch>
        );
    }
}

export default withRouter(Character);