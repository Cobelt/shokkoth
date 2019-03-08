import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Navbar, NavBrand, NavIcon, NavLabel } from 'muejs';

import UserContext from '../../store/context/user';
import { isLogged } from '../../store/selectors/user';

import './stylesheet.styl';

class NavbarComponent extends Component {
    render () {
        const { row, idgrid } = this.props;
        return (
            <Navbar row={row} idgrid={idgrid} position="fixed">
                <NavBrand justify="left">
                    <NavLink to="/">DofusLab</NavLink>
                </NavBrand>

                <NavLabel justify="right" idgrid={idgrid}>
                    <NavLink to="/my-stuffs" activeClassName="active">Mes stuffs</NavLink>
                </NavLabel>
                <NavLabel justify="right" idgrid={idgrid}>
                    <NavLink to="/my-characters" activeClassName="active">Mes persos</NavLink>
                </NavLabel>

                <NavLabel justify="right" idgrid={idgrid}>
                    <NavLink to="/login" activeClassName="active">Login</NavLink>
                </NavLabel>
            </Navbar>
        );
    }
}

export default withRouter(NavbarComponent);
