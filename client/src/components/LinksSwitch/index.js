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

const LinksSwitch = ({ history: { push, goBack } = {}, location, match, staticContext, showLogin, ...otherProps }) => {
  const context = useContext(UserContext);

  const { isLogged } = useUser(context);
  const [darkMode, toggleDarkMode] = useDarkMode();


  return (
    <Element {...otherProps}>

      <Icon className="font-primary" icon="home" onClick={() => push('/')} />
      <Switch>
        <Route exact path="/" render={() => null} />
        <Route render={() => (
          <Icon className="font-primary" icon="arrow_back" onClick={() => goBack()}/>
        )} />
      </Switch>


      <Switch>
        <Route exact path="/" render={() => (
          <>
            { isLogged && <Icon className="font-primary" icon="supervisor_account" onClick={() => push('/characters')} /> }
            { isLogged && <Icon className="font-primary" icon="add" onClick={() => push('/stuffs/new')} /> }
          </>
        )} />

        <Route exact path="/login" render={() => null} />
        <Route exact path="/stuffs/new/:characterId?" render={() => (
          <>
            <Icon className="font-primary" icon="save" onClick={() => goBack()} />
          </>
        )} />
        <Route exact path="/stuffs/edit/:_id" render={({  match: { params: { _id } = {} } = {} }) => (
          <>
            <Icon className="font-primary" icon="share" onClick={copyUrlToClipboard} />
            <Icon className="font-primary" icon="add" onClick={() => push('/stuffs/new')} />
            <Icon className="font-primary" icon="visibility" onClick={() => push(`/stuffs/${_id}`)} />
          </>
        )} />
        <Route exact path="/stuffs/:_id" render={({  match: { params: { _id } = {} } = {} }) => null} />


        <Route exact path="/cookies" render={() => null} />


        <Route path="/characters/new" render={() => <Icon className="font-primary" icon="supervisor_account" onClick={() => push('/characters')} />} />
        <Route path="/characters/edit/:_id" render={({  match: { params: { _id } = {} } = {} }) => (
          <Icon className="font-primary" icon="portrait" onClick={() => push(`/stuffs/new/${_id}`)} />
        )} />
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
