import React, { useContext } from 'react';

import { Element, Icon } from 'muejs';
import { withRouter, Redirect, Switch, Route } from 'react-router-dom';


const copyUrlToClipboard = () => {
  const urlReceiver = document.createElement('input');
  document.body.appendChild(urlReceiver);
  urlReceiver.value = window.location.href;
  urlReceiver.select();
  document.execCommand('copy');
  document.body.removeChild(urlReceiver);
};

const LinksSwitch = ({ history: { push } = {}, ...otherProps }) => (
  <Switch>
    <Route exact path="/" render={() => (
      <Element {...otherProps}>
        <Icon className="font-primary" icon="supervisor_account" onClick={() => push('/characters')} />
        <Icon className="font-primary" icon="share" onClick={copyUrlToClipboard} />
        <Icon className="font-primary" icon="save" />
      </Element>
    )} />

    <Route exact path="/login" render={() => null} />
    <Route exact path="/stuffs" render={() => null} />

    <Route path="/characters" render={() => (
      <Element {...otherProps}>
        <Icon className="home font-primary" icon="home" row={1} col={1} style={{ justifySelf: 'start', fontSize: '2rem' }} onClick={() => push('/')} />
      </Element>
    )} />

    <Route path="/account" render={() => null} />

    <Route path="/404" render={() => <div>Public</div>} />
    <Route render={() => <Redirect to="/404" />} />
  </Switch>
);

export default withRouter(LinksSwitch);
