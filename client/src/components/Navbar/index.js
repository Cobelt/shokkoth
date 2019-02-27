import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Navbar, NavBrand, NavIcon, NavLabel } from 'muejs';

import './stylesheet.styl';

class NavbarComponent extends Component {
    render () {
        const { row, idgrid } = this.props;
        return (
            <Navbar row={row} idgrid={idgrid} position="fixed">
                <NavBrand justify="left">
                    <NavLink to="/">DofusLab</NavLink>
                </NavBrand>

                <NavLabel justify="right">
                    <NavLink to="/my-stuffs" activeClassName="active">Mes stuffs</NavLink>
                </NavLabel>
                <NavLabel justify="right">
                    <NavLink to="/my-characters" activeClassName="active">Mes persos</NavLink>
                </NavLabel>

                {/*<NavLabel justify="right" label="karyt.fr" route="http://karyt.fr"/>*/}
                {/*<NavLabel justify="right" label="cobelt.fr" route="http://cobelt.fr"/>*/}
                {/*<NavIcon justify="right" route="http://github.com/cobelt" icon="github" svg />*/}
            </Navbar>
        );
    }
}

export default withRouter(NavbarComponent);