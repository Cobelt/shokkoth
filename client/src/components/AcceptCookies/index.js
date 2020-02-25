import React, { useState, useEffect } from 'react';
import { Row, Button } from 'muejs';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { withRouter, Link } from 'react-router-dom';
import { arrayToClassName } from '../../utils/common';
import * as cookies from '../../utils/cookies';


import { setAcceptCookies as mutation } from '../../queries/mutations';

import './stylesheet.styl';


const AcceptCookies = ({ match, location, history, staticContext, className, ...otherProps }) => {
  const [acceptCookies, setAcceptCookies] = useState();
  const [setDecision] = useMutation(gql(mutation));

  useEffect(() => {
    if (acceptCookies !== undefined) {
      setDecision({ variables: { value: acceptCookies } });
    }
  }, [acceptCookies])

  return (
    <Row type="h5" show={acceptCookies === undefined} className={arrayToClassName(['accept-cookies', 'bg-secondary', 'justify-between', className])} {...otherProps}>
      Nous avons besoin de votre accord pour utiliser les cookies.
      <span>
        <Button name="accept-cookies" type="button" onClick={() => setAcceptCookies(true)} title="En cliquant sur accepter, nous créerons un cookie nommé ACCEPT_COOKIES qui ne sera effectif que sur le domaine shokkoth.[fr|tk]">Accepter</Button>
        <Button name="reject-cookies" type="button" onClick={() => setAcceptCookies(false)} title="En cliquant sur refuser, vous vous infligez la reconnexion et l'application du mode sombre à chaque fermeture de l'onglet.">Refuser</Button>
      </span>
      <Link to='/cookies'>En savoir plus</Link>
    </Row>
  );
};

export default withRouter(AcceptCookies)
