import React, { useContext } from 'react';

import { Navbar, NavBrand, NavIcon, NavLabel, Spinner } from 'muejs';
import { withRouter, NavLink } from 'react-router-dom';

import { isJWTLoading, getJWT } from '../../store/selectors/user';
import UserContext from '../../store/context/user';

import './stylesheet.styl';

const NavbarComponent = ({ idgrid, row }) => {
  const [store, dispatch] = useContext(UserContext);

  const isLogged = !!getJWT(store);
  return (
      <Navbar row={row} idgrid={idgrid} position="fixed">
          <NavBrand justify="left" className="animate-brand">
              <NavLink to="/">
                <span id="shok">shok</span>
                <span id="koth">koth</span>
                <span id="dot-tk">.tk</span>
              </NavLink>
          </NavBrand>

          <NavLabel justify="right" idgrid={idgrid}>
              <NavLink to="/stuffs" activeClassName="active">Mes stuffs</NavLink>
          </NavLabel>
          <NavLabel justify="right" idgrid={idgrid}>
              <NavLink to="/characters" activeClassName="active">Mes persos</NavLink>
          </NavLabel>

          <NavLabel justify="right" idgrid={idgrid}>
            { isJWTLoading() ? "Loading" : <NavLink to={isLogged ? "/logout" : "/login"}>{isLogged ? "Logout" : "Login"}</NavLink> }
          </NavLabel>
      </Navbar>
  );
}

export default withRouter(NavbarComponent);
