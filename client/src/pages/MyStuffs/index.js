import React, { Component } from 'react';
import { Element } from 'muejs';

export default class MyStuffs extends Component {
    render() {
        return (
            <>
                <Element row={1} col={2} width={2} style={{ marginTop: '64px' }}>
                    <h2>
                        My Stuffs
                    </h2>
                </Element>

                <Element row={2} col={2} className="bg-error">
                    <h4>Mid page : ici le stuff et les caracs</h4>
                </Element>

                <Element row={2} col={3} className="bg-success">
                    <h4>Mid page 2 : ici les items dispo</h4>
                </Element>
            </>
        );
    }
}