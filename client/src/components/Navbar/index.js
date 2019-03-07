import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Navbar, NavBrand, NavIcon, NavLabel } from 'muejs';

import UserContext from '../../store/context/user';
import { isLogged } from '../../store/selectors/user';

import './stylesheet.styl';

class WithConsumerNavItems extends Component {
    render() {
        const { idgrid } = this.props;
        const { store } = this.context;
        if (isLogged(store)) {
            return (
                <>
                    <NavLabel justify="right" idgrid={idgrid}>
                        <NavLink to="/my-stuffs" activeClassName="active">Mes stuffs</NavLink>
                    </NavLabel>
                    <NavLabel justify="right" idgrid={idgrid}>
                        <NavLink to="/my-characters" activeClassName="active">Mes persos</NavLink>
                    </NavLabel>
                </>
            );
        }
        return (
            <NavLabel justify="right" idgrid={idgrid}>
                <NavLink to="/login" activeClassName="active">Login</NavLink>
            </NavLabel>
        );
    }
}
WithConsumerNavItems.context = UserContext;

class NavbarComponent extends Component {
    render () {
        const { row, idgrid } = this.props;
        return (
            <Navbar row={row} idgrid={idgrid} position="fixed">
                <NavBrand justify="left">
                    <NavLink to="/">DofusLab</NavLink>
                </NavBrand>

                <WithConsumerNavItems />

                {/*<NavLabel justify="right" label="karyt.fr" route="http://karyt.fr"/>*/}
                {/*<NavLabel justify="right" label="cobelt.fr" route="http://cobelt.fr"/>*/}
                {/*<NavIcon justify="right" route="http://github.com/cobelt" icon="github" svg />*/}
            </Navbar>
        );
    }
}

export default withRouter(NavbarComponent);
