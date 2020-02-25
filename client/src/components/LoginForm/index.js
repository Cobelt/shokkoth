import React, { useState, useRef } from 'react';
import get from 'lodash.get';
import memoize from 'lodash.memoize';

import { Form, Element, Label, Input, Button, Spinner, Icon } from 'muejs';
import { withRouter, Redirect } from 'react-router-dom';

import { useUser } from '../../hooks/useUser';
import { arrayToClassName } from '../../utils/common';
import { login, signin } from '../../store/actions/user';

import './stylesheet.styl';


const getUsernameAndPwd = (formData) => formData && formData instanceof FormData && ({ username: formData.get('username'), password: formData.get('password'), confirmedPassword: formData.get('confirmed-password') });


const LoginForm = ({ setLook, submitted, setSubmitted, loading, context, ...props }) => {
  const [step, setStep] = useState('login');
  let { login, signin, loginError, error } = useUser(context);
  const formRef = useRef(null);

  console.log(formRef);

  // const formData = new FormData(formRef.current);

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    const { username, password, confirmedPassword } = getUsernameAndPwd(formData);
    switch (step) {
      case 'login': {
        login({ username, password });
        break;
      }
      case 'signin': {
        if (password !== confirmedPassword) {
          error = 'Les deux mots de passes ne correspondent pas.';
        }
        else {
          signin({ username, password });
        }
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
      gridClassName="align-center justify-center"
      colGap="1rem"
      rowGap='0.6rem'
      columnsTemplate={'0.5fr 1fr 1fr 0.5fr'}
      rowsTemplate={'repeat(5, fit-content(100%))'}
      ref={formRef}
      {...props}
    >
      <Element type="h2" className="mv-20 font-over-primary align-end" col={1} width={4}>
        { step === 'signin' ? 'Créez votre compte' : step === 'forgot' ? 'Mot de passe oublié' : 'Veuillez vous logger' }
      </Element>

      <Label className="error-holder relative" col={1} width={4} onClick={(e) => setLook(`fully-opened#${get(e, 'target.value.length') || 0}`)} data-error={get(loginError, 'message')}>
        <Input name="username" autoComplete="true" type="text" placeholder="Nom d'utilisateur *" required onChange={e => { setSubmitted(false); setLook(`fully-opened#${get(e, 'target.value.length') || 0}`); }} />
      </Label>
      <Label style={{ opacity: step === 'forgot' && 0 }} col={1} width={4} onClick={() => setLook('almost-closed')}>
        <Input name="password" autoComplete="true" type="password" placeholder="Mot de passe *" required={step !== 'forgot'} disabled={step === 'forgot'} onChange={e => { setSubmitted(false); setLook('almost-closed'); }} />
      </Label>
      { step === 'signin' && (
        <Label col={1} width={4} onClick={() => setLook('almost-closed')}>
          <Input name="confirmed-password" autoComplete="true" type="password" placeholder="Confirmez votre mot de passe *" required onChange={e => { setSubmitted(false); setLook('almost-closed'); }} />
        </Label>
      ) }

      <Button
        aspect='filled-primary'
        col={2}
        width={2}
        type="submit"
        disabled={submitted}
        className={arrayToClassName(["btn-arrow", loginError ? 'bg-error' : 'bg-primary'])}
      >
        { loading ? <Spinner style={{ height: '1em' }}/> : 'Go !' }
      </Button>

      <Button aspect='filled-primary' className={arrayToClassName(['signin', step === 'signin' && 'active'])} col={1} width={2} onClick={() => setStep(step === 'signin' ? 'login' : 'signin')}>Nouveau compte</Button>
      <Button aspect='filled-primary' className={arrayToClassName(['forgot', step === 'forgot' && 'active'])} col={3} width={2} onClick={() => setStep(step === 'forgot' ? 'login' : 'forgot')}>Mot de passe oublié</Button>

      <Element show={step === 'signin'} className="flex" col={1} width={4}>
        <Icon icon="warning" className="font-warning" />
        <h5 className="flex-1 font-over-primary m-0" style={{ alignSelf: 'center' }}>N'utilisez PAS le même mot de passe que votre compte Dofus !</h5>
      </Element>
    </Form>
  );
}

export default LoginForm;
