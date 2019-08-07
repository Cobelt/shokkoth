import React, { useContext, useState, useEffect } from 'react';
import get from 'lodash.get';
import memoize from 'lodash.memoize';

import { Form, Element, Label, Input, Button, Spinner, Icon } from 'muejs';
import { withRouter, Redirect } from 'react-router-dom';

import { useUser } from '../../hooks/useUser';
import { arrayToClassName } from '../../utils/common';
import { login, signin } from '../../store/actions/user';

import './stylesheet.styl';


const getUsernameAndPwd = (formData) => formData && formData instanceof FormData && ({ username: formData.get('username'), password: formData.get('password') });


const LoginForm = ({ setLook, submitted, setSubmitted, loading, context, ...props }) => {
  const [step, setStep] = useState('login');
  const { login, signin, loginError } = useUser(context);

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    switch (step) {
      case 'login': {
        console.log('should login')
        login(getUsernameAndPwd(formData));
        break;
      }
      case 'signin': {
        console.log('should create')
        signin(getUsernameAndPwd(formData));
        break;
      }
      case 'forgot': {
        // askNewPassword(getUsername(formData), context)
        break;
      }
    }
    setSubmitted(true);
    setLook('happy');
  };


  return (
    <Form
      className={'login-form flex-1'}
      onSubmit={handleSubmit}
      gridClassName="align-center justify-center" colGap="1rem"
      columnsTemplate={'0.5fr 1fr 1fr 0.5fr'}
      rowsTemplate={'fit-content(100%)'.repeat(5)}
      {...props}
    >
      <Element type="h2" className="marg-v-20 font-over-primary align-end" col={1} width={4}>
        { step === 'signin' ? 'Créez votre compte' : step === 'forgot' ? 'Mot de passe oublié' : 'Veuillez vous logger' }
      </Element>

      <Label className="error-holder relative" col={1} width={4} onClick={(e) => setLook(`fully-opened#${get(e, 'target.value.length') || 0}`)} data-error={get(loginError, 'message')}>
        <Input name="username" autoComplete="true" type="text" placeholder="username *" required onChange={e => { setSubmitted(false); setLook(`fully-opened#${get(e, 'target.value.length') || 0}`); }} />
      </Label>
      <Label style={{ opacity: step === 'forgot' && 0 }} col={1} width={4} onClick={() => setLook('almost-closed')}>
        <Input name="password" autoComplete="true" type="password" placeholder="password *" required={step !== 'forgot'} disabled={step === 'forgot'} onChange={e => { setSubmitted(false); setLook('almost-closed'); }} />
      </Label>
      <Button
        col={2}
        width={2}
        type="submit"
        disabled={submitted}
        className={arrayToClassName(["btn-arrow", loginError ? 'bg-error' : 'bg-primary'])}
      >
        { loading ? <Spinner style={{ height: '1em' }}/> : 'Go !' }
      </Button>
      <Button className={arrayToClassName(['new-account', step === 'signin' && 'active'])} col={1} width={2} onClick={() => setStep(step === 'signin' ? 'login' : 'signin')}>Nouveau compte</Button>
      <Button className={arrayToClassName(['forgot-password', step === 'forgot' && 'active'])} col={3} width={2} onClick={() => setStep(step === 'forgot' ? 'login' : 'forgot')}>Mot de passe oublié</Button>
      <Element show={step === 'signin'} className="flex" col={1} width={4}>
        <Icon icon="warning" className="font-warning" />
        <h5 className="flex-1 font-over-primary marg-0" style={{ alignSelf: 'center' }}>N'utilisez PAS le même mot de passe que votre compte Dofus !</h5>
      </Element>
    </Form>
  );
}

export default LoginForm;
