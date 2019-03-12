import React, { Component } from 'react';

import { Element } from 'muejs';

import './stylesheet.styl';

class Error404 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Element height={3} width={6} className="error-404">
                <div className="error-text">4<img src="https://s.ankama.com/www/static.ankama.com/dofus/ng/modules/misc/prehome/prehome2018/assets/loading.png" alt="0" />4</div>
                <div className="subtext">Route not found</div>
            </Element>
        );
    }
}

export default Error404;