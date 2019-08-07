import React from 'react';

import { Element } from 'muejs';
import { withRouter, Link } from 'react-router-dom';
import get from 'lodash.get';

import { arrayToClassName } from '../../utils/common';

import './stylesheet.styl';


const Brand = ({ history, match, location, staticContext, className, ...otherProps }) => (
  <Element className={arrayToClassName(['brand', className])} {...otherProps}>
    <Link to="/" className="font-primary">
      <h2 id="shok">
        <span id="sh">sh</span>
        <span id="o">o</span>
        k
      </h2>
      <h2 id="koth">koth</h2>
      <h2 id="dot-tk">.tk</h2>
    </Link>
  </Element>
);

export default withRouter(Brand);
