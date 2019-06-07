import React, { useContext, useState } from 'react';

import { Element, Row, Form, Input, Label, Button } from 'muejs';
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

  if (error) return <Element row={2} col={3} width={2} className="error font-error">error</Element>;
  if (loading) return <Element row={2} col={3} width={2}>LOADING</Element>;
  if (token) return <Redirect to="/" />

  const [gotError, setError] = useState(false);
  const [look, setLook] = useState('');

  return (
      <Form
        className={["login-form", className].join(' ').trim()}
        onSubmit={(e, formData) => login(getUsernameAndPwd(formData), context)}
        gridClassName="align-center" colGap="1rem"
        columnsTemplate={'6vw 7vw 7vw 6vw'}
        rowsTemplate={'fit-content(100%)'.repeat(4)}
      >
        <Element col={1} width={4}>
          <Shokkoth className="shokkoth" look={look} />
        </Element>


        <Element className="align-end" col={1} width={4}>
          <h2>
            Veuillez vous logger
          </h2>
        </Element>
        <Label col={1} width={4} onClick={(e) => setLook(`down#${get(e, 'target.value.length') || 0}`)}>
          <Input name="username" type="text" placeholder="username *" required onChange={(e) => setLook(`down#${get(e, 'target.value.length') || 0}`)} />
        </Label>
        <Label col={1} width={4} onClick={() => setLook('away')}>
          <Input name="password" type="password" placeholder="password *" required onChange={(e) => setLook('away')} />
        </Label>
        <Button onClick={() => setError(!gotError)} className={`btn-arrow bg-primary ${gotError ? 'bg-error' : ''}`.trim()} col={2} width={2} type="submit">Log me in !</Button>
      </Form>
  );
}

export default withRouter(Home);
