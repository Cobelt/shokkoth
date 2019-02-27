import React, { Component } from 'react';
import { Grid, Element } from 'muejs';

import './stylesheet.styl';


const fakeData = [
    {
        id: 0,
        pseudo: 'Karyt',
        classe: 'Eliotrope',
    },
    {
        id: 1,
        pseudo: 'Cobelt',
        classe: 'Ouginak',
    },
    {
        id: 2,
        pseudo: 'Rilur',
        classe: 'Cra',
    },
    {
        id: 3,
        pseudo: 'Tibbets',
        classe: 'Zobal',
    },
    {
        id: 4,
        pseudo: 'Scygie',
        classe: 'Sram',
    },
    {
        id: 5,
        pseudo: 'Knogga',
        classe: 'Osamodas',
    },
    {
        id: 6,
        pseudo: 'Aggonk',
        classe: 'Ecaflip',
    },
];

export default class MyCharacters extends Component {
    constructor(props) {
        super(props);
        this.state = { characterByRow: 6 };
    }

    render() {
        const { characterByRow } = this.state;
        return (
            <>
                <Element row={1} col={2} width={2} style={{ marginTop: '64px' }}>
                    <h2>
                        My characters
                    </h2>
                </Element>

                <Element row={2} width={4}>
                    <Grid className="characters-list" columnsTemplate={ '1fr '.repeat(characterByRow) }>
                        { fakeData.map((character, index) => {
                            return (
                               <Element row={Math.trunc(1 + index / characterByRow)} col={1 + index % characterByRow}>
                                   { character.id }
                                   { character.pseudo }
                                   { character.classe }
                               </Element>
                           );
                        }) }

                    </Grid>
                </Element>
            </>
        );
    }
}