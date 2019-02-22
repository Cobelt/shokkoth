import React, { Component } from 'react';

import { Element } from 'muejs';


export default class Home extends Component {

    render() {
        return (
            <Element row={1} col={2} style={{ marginTop: '64px' }}>
                <h2>
                    Bienvenue sur DofusLab
                </h2>
            </Element>
        );
    }
}