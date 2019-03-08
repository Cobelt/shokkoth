import React, { Component } from 'react';

import { Element, Row } from 'muejs';


export default class Home extends Component {

    render() {
        return (
            <>
                <Element row={1} col={3} width={2} style={{ marginTop: '64px' }}>
                    <h2>
                        Veuillez vous logger
                    </h2>
                </Element>

                <Row className="bg-error">
                    <h5>Username :</h5>
                </Row>

                <Row className="bg-error">
                    <h5>Password :</h5>
                </Row>
            </>
        );
    }
}