import React, { Component } from 'react';

import { Element, Row, Form, Input, Label, Button } from 'muejs';


const Home = () => (
  <Form gridClassName="align-center" colGap="1rem" row={2} col={3} width={2} rowsTemplate={'fit-content(100%)'.repeat(3)}>
    <Element className="align-end" width={2}>
      <h2>
        Veuillez vous logger
      </h2>
    </Element>
      <Label row={2} col={1}>
        <Input name="username" type="text" placeholder="username" />
      </Label>
      <Label row={2} col={2}>
        <Input name="password" type="password" placeholder="password" />
      </Label>
    <Button width={2}>Log me in !</Button>
  </Form>
);

export default Home;
