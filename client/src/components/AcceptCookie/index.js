import React, { useState, useEffect } from 'react';
import { Row, Button } from 'muejs';

import { withRouter, Link } from 'react-router-dom';
import { arrayToClassName } from '../../utils/common';
import * as cookies from '../../utils/cookies';

import './stylesheet.styl';


const AcceptCookie = ({ match, location, history, staticContext, className, ...otherProps }) => {
  const [acceptCookie, setAcceptCookie] = useState(cookies.get('ACCEPT_COOKIES'));

  useEffect(() => {
    if (acceptCookie && !cookies.get('ACCEPT_COOKIES')) {
      cookies.set('ACCEPT_COOKIES', true);
    }
    else if (acceptCookie === false) {
      cookies.deleteAll();
    }
  }, [acceptCookie])

  return (
    <Row type="h4" show={acceptCookie === undefined} className={arrayToClassName(['accept-cookies', 'bg-secondary', 'justify-between', className])} {...otherProps}>
      Nous avons besoin de votre accord pour utiliser les cookies.
      <span>
        <Button name="accept-cookies" type="button" onClick={() => setAcceptCookie(true)}>Accepter</Button>
        <Button name="reject-cookies" type="button" onClick={() => setAcceptCookie(false)}>Refuser</Button>
      </span>
      <Link to='/cookies'>À quoi ça sert ?</Link>
    </Row>
  );
};

export default withRouter(AcceptCookie)
