import React, { useContext } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Navbar, NavItem, Icon } from 'muejs';

import { useUser } from '../../hooks/useUser';
import { useDarkMode } from '../../hooks/darkmode';

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
  const { isLogged } = useUser();
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <Navbar primaryBG={false} position="fixed" style={{ top: 0 }}>
      <NavLink to="/"><NavItem brand justify="left" icon="home" ><Brand /></NavItem></NavLink>

      <div className="flex-1" />

      <Icon className="text-primary hide-until-md" icon="share" onClick={copyUrlToClipboard} />
      <Icon className={`text-primary dark-mode ${darkMode ? 'is-dark' : 'is-light'}`} icon={darkMode ? 'wb_sunny' : 'brightness_3'} onClick={toggleDarkMode} />

      <div className="br-2 br-primary mv-15 mh-10" />

      { isLogged && <NavLink to="/my/stuffs"><NavItem justify="right" icon="filter_none">Mes stuffs</NavItem></NavLink> }
      { isLogged && <NavLink to="/my/characters"><NavItem justify="right" icon="supervisor_account">Mes persos</NavItem></NavLink> }

      <NavLink to={isLogged ? "/account" : "/login"}><NavItem justify="right" icon={isLogged ? "account_circle" : "power_settings_new"} style={{ color: isLogged && 'var(--danger-color)' }}>{isLogged ? "Mon compte" : "Se connecter"}</NavItem></NavLink>
    </Navbar>
  );
}

export default withRouter(NavbarComponent);
