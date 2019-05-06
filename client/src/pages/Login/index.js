import React, { Component } from 'react';
import { login } from '../../store/actions/user'

import { Element, Row, Form, Input, Label, Button } from 'muejs';

import './stylesheet.styl';

const Home = () => (
  <Form
    className="login-form"
    onSubmit={(e, formData) => login(formData)}
    gridClassName="align-center" colGap="1rem"
    row={2}
    col={3}
    width={2}
    rowsTemplate={'fit-content(100%)'.repeat(3)}
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
    <Button className="btn-arrow bg-primary" col={2} width={2} type="submit">Log me in !</Button>
  </Form>
);

export default Home;
