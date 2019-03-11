import React, { Component } from 'react';

import { Route, Switch, withRouter } from "react-router";


class Character extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { location, match: { path } = {} } = this.props;
        console.log('location', location);
        return (
            <Switch location={location}>
                <Route path="/6" render={() => 'du popo'} />
            </Switch>
        );
    }
}

export default withRouter(Character);