import React, { useContext, useState } from 'react';

import { Element, Row, Form, Input, Label, Button, Link } from 'muejs';
import { withRouter, Redirect } from 'react-router-dom';
import get from 'lodash.get';

import { login } from '../../store/actions/user';
import UserContext from '../../store/context/user/index.js';

import Shokkoth from './shokkoth-login';

import './stylesheet.styl';



const getUsernameAndPwd = (formData) => formData && formData instanceof FormData && ({ username: formData.get('username'), password: formData.get('password') });


const Home = ({ className }) => {
  const context = useContext(UserContext);
  const [userData] = context || [];

  const { jwt } = userData || {};
  const { error, loading, token } = jwt || {};

  // if (error) return <Element row={2} col={3} width={2} className="error font-error">error</Element>;
  // if (loading) return <Element row={2} col={3} width={2}>LOADING</Element>;
  // if (token) return <Redirect to="/" />

  const [gotError, setError] = useState(false);
  const [look, setLook] = useState('half-closed');
  const [buttonState, setButtonState] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    login(getUsernameAndPwd(formData), context);
    setButtonState('');
  }

  return (
      <Form
        className={["login-form", className, submitted && "submitted"].filter(e => !!e).join(' ').trim()}
        onSubmit={handleSubmit}
        gridClassName="align-center" colGap="1rem"
        columnsTemplate={'0.5fr 1fr 1fr 0.5fr'}
        rowsTemplate={'fit-content(100%)'.repeat(4)}
      >
        <Element className="justify-center" col={1} width={4}>
          <Shokkoth className="shokkoth" look={look} />
        </Element>


        <Element className="align-end" col={1} width={4}>
          <h2>
            Veuillez vous logger
          </h2>
        </Element>
        <Label col={1} width={4} onClick={(e) => setLook(`fully-opened#${get(e, 'target.value.length') || 0}`)}>
          <Input name="username" type="text" placeholder="username *" required onChange={(e) => setLook(`fully-opened#${get(e, 'target.value.length') || 0}`)} />
        </Label>
        <Label col={1} width={4} onClick={() => setLook('almost-closed')}>
          <Input name="password" type="password" placeholder="password *" required onChange={(e) => setLook('almost-closed')} />
        </Label>
        <Button
          col={2}
          width={2}
          type="submit"
          onClick={() => setError(!gotError)}
          onMouseDown={() => setButtonState('clickDown')}
          onMouseUp={() => { setButtonState('clickUp'); setSubmitted(!submitted); setLook(look === 'happy' ? 'choqued' : 'happy') }}
          className={["btn-arrow", gotError ? 'bg-error' : 'bg-primary', buttonState].filter(e => !!e).join(' ').trim()}
        >
          Log me in !
        </Button>
        <Button col={2}>Nouveau compte</Button>
        <Button col={3}>Nouveau compte</Button>
      </Form>
  );
}

export default withRouter(Home);
