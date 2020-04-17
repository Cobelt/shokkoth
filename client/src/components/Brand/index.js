import React from 'react';

import { Element } from 'muejs';
import { withRouter, Link } from 'react-router-dom';
import get from 'lodash.get';

import { arrayToClassName } from '../../utils/common';

import './stylesheet.styl';


const Brand = ({ history, match, location, staticContext, className, ...otherProps }) => (
  <Element className={arrayToClassName(['brand', className])} {...otherProps}>
    <span id="shok">shok</span>
    <span id="koth">koth</span>
    <span id="dot-fr">.fr</span>
  </Element>
);

export default withRouter(Brand);
