import React from 'react';
import { Element } from 'muejs';

import '../../404/stylesheet.styl';

const Error404 = () => (
  <Element height={3} width={6} className="error-404">
    <div className="error-text">4<img src="https://static.ankama.com/dofus/ng/modules/misc/prehome/prehome2018/assets/loading.png" alt="0" />4</div>
    <div className="subtext">Stuff not found</div>
  </Element>
);

export default Error404;
