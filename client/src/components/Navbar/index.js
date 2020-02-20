import React, { useContext } from 'react';

import { Navbar, NavItem, Spinner, Icon } from 'muejs';
import { withRouter, NavLink, Switch, Route } from 'react-router-dom';

import { useUser } from '../../hooks/useUser';
import { useDarkMode } from '../../hooks/darkmode';

import { getJWT } from '../../store/selectors/user';
import UserContext from '../../store/context/user';

import Shokkoth from '../../assets/svg/shokkoth-login';
import Brand from '../Brand';

import './stylesheet.styl';


const copyUrlToClipboard = () => {
  if (confirm("Vous vous apprêtez à copier l'url actuelle !")) {
    const urlReceiver = document.createElement('input');
    document.body.appendChild(urlReceiver);
    urlReceiver.value = window.location.href;
    urlReceiver.select();
    document.execCommand('copy');
    document.body.removeChild(urlReceiver);
  }
};


const NavbarComponent = () => {
  const context = useContext(UserContext);

  const [darkMode, toggleDarkMode] = useDarkMode();
  const { isLogged } = useUser(context);

  return (
    <Navbar primaryBG={false} position="fixed" style={{ top: 0 }}>
      <NavLink to="/"><NavItem brand justify="left" icon="home" ><Brand /></NavItem></NavLink>

      <div className="flex-1" />

      <Icon className="font-primary hide-until-md" icon="share" onClick={copyUrlToClipboard} />
      <Icon className={`font-primary dark-mode ${darkMode ? 'is-dark' : 'is-light'}`} icon={darkMode ? 'wb_sunny' : 'brightness_3'} onClick={toggleDarkMode} />

      <div style={{ borderRight: 'solid 2px var(--primary-color)' }} className="marg-v-15" />

      { isLogged && <NavLink to="/stuffs/mines"><NavItem justify="right" icon="filter_none">Mes stuffs</NavItem></NavLink> }
      { isLogged && <NavLink to="/characters/mines"><NavItem justify="right" icon="supervisor_account">Mes persos</NavItem></NavLink> }

      <NavLink to={isLogged ? "/account" : "/login"}><NavItem justify="right" icon={isLogged ? "account_circle" : "power_settings_new"} style={{ color: isLogged && 'var(--danger-color)' }}>{isLogged ? "Mon compte" : "Se connecter"}</NavItem></NavLink>
    </Navbar>
  );
}

export default withRouter(NavbarComponent);
