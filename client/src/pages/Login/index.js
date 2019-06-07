import React, { useContext, useState } from 'react';

import { Element, Row, Form, Input, Label, Button } from 'muejs';
import { withRouter, Redirect } from 'react-router-dom';

import { login } from '../../store/actions/user';
import UserContext from '../../store/context/user/index.js';


import './stylesheet.styl';



const getUsernameAndPwd = (formData) => formData && formData instanceof FormData && ({ username: formData.get('username'), password: formData.get('password') });

const Home = () => { 
  const context = useContext(UserContext);
  const [userData] = context || [];

  const { jwt } = userData || {};
  const { error, loading, token } = jwt || {};

  if (error) return <div className="error font-error">error</div>;

  if (loading) return <div>LOADING</div>;

  if (token) return <Redirect to="/" />

  const [gotError, setError] = useState(false);
  
  return (
    <Form
      className="login-form"
      onSubmit={(e, formData) => login(getUsernameAndPwd(formData), context)}
      gridClassName="align-center" colGap="1rem"
      row={2}
      col={3}
      width={2}
      rowsTemplate={'fit-content(100%)'.repeat(3)}
      style={{ marginTop: '64px' }}
    >
      <Element className="align-end" width={4}>
        <h2>
          Veuillez vous logger
        </h2>
      </Element>
      <Label width={4}>
        <Input name="username" type="text" placeholder="username *" required />
      </Label>
      <Label width={4}>
        <Input name="password" type="password" placeholder="password *" required />
      </Label>
      <Button onClick={() => setError(!gotError)} className={`btn-arrow bg-primary ${gotError ? 'bg-error' : ''}`.trim()} col={2} width={2} type="submit">Log me in !</Button>
    </Form>
  );
}

export default withRouter(Home);
