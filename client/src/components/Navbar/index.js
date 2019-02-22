import React, { Component } from 'react';
import { Navbar, NavBrand, NavIcon, NavLabel } from 'muejs';

export default class NavbarComponent extends Component {
    render () {
        const { row, idgrid } = this.props;
        return (
            <Navbar row={row} idgrid={idgrid} position="fixed">
                <NavBrand justify="left">DofusLab</NavBrand>
                <NavLabel justify="right" label="karyt.fr" route="http://karyt.fr"/>
                <NavLabel justify="right" label="cobelt.fr" route="http://cobelt.fr"/>
                <NavIcon justify="right" route="http://github.com/cobelt" icon="github" svg />
                <NavIcon className="border-menu-icon" justify="right" icon="menu" />
            </Navbar>
        );
    }
}

