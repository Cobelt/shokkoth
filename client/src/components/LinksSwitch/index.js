import React, { useContext } from 'react';

import { Element, Icon } from 'muejs';
import { withRouter, Redirect, Switch, Route } from 'react-router-dom';

import UserContext from '../../store/context/user';

import { useDarkMode } from '../../hooks/darkmode';
import { useUser } from '../../hooks/useUser';


const copyUrlToClipboard = () => {
  const urlReceiver = document.createElement('input');
  document.body.appendChild(urlReceiver);
  urlReceiver.value = window.location.href;
  urlReceiver.select();
  document.execCommand('copy');
  document.body.removeChild(urlReceiver);
};

const LinksSwitch = ({ history: { push } = {}, location, match, staticContext, showLogin, ...otherProps }) => {
  const context = useContext(UserContext);

  const { isLogged } = useUser(context);
  const [darkMode, toggleDarkMode] = useDarkMode();


  return (
    <Element {...otherProps}>
      <Switch>
        <Route exact path="/" render={() => null} />
        <Route render={() => <Icon className="font-primary" icon="home" onClick={() => push('/')} />} />
      </Switch>

      <Switch>
        <Route exact path="/" render={() => (
          <>
            { isLogged && <Icon className="font-primary" icon="supervisor_account" onClick={() => push('/characters')} /> }
            <Icon className="font-primary" icon="share" onClick={copyUrlToClipboard} />
            <Icon className="font-primary" icon="save" />
          </>
        )} />

        <Route exact path="/login" render={() => null} />
        <Route exact path="/stuffs" render={() => null} />


        <Route exact path="/cookies" render={() => null} />


        <Route path="/characters/new" render={() => <Icon className="font-primary" icon="supervisor_account" onClick={() => push('/characters')} />} />
        <Route path="/characters" render={() => <Icon className="font-primary" icon="person_add" onClick={() => push('/characters/new')} />} />

        <Route path="/account" render={() => null} />

        <Route path="/404" render={() => null} />
        <Route render={() => null} />
      </Switch>

      <Icon className={`font-primary ${darkMode ? 'is-dark' : 'is-light'}`} icon={darkMode ? 'wb_sunny' : 'brightness_3'} onClick={toggleDarkMode} />
    </Element>
  );
}

export default withRouter(LinksSwitch);
