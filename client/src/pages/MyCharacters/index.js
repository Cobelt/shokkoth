import React, { Component } from 'react';
import { Grid, Element, Row } from 'muejs';

import './stylesheet.styl';

const breeds = {
    'Feca': 1,
    'Osamodas': 2,
    'Enutrof': 3,
    'Sram': 4,
    'Xelor': 5,
    'Ecaflip': 6,
    'Eniripsa': 7,
    'Iop': 8,
    'Cra': 9,
    'Sadida': 10,
    'Sacrieur': 11,
    'Pandawa': 12,
    'Roublard': 13,
    'Zobal': 14,
    'Steamer': 15,
    'Eliotrope': 16,
    'Huppermage': 17,
    'Ouginak': 18
}

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
        this.state = { characterByRow: 7 };
    }

    render() {
        const { characterByRow } = this.state;
        const position = { row: 1, col: 0 };
        return (
            <>
                <Element row={1} col={3} width={2} style={{ marginTop: '64px' }}>
                    <h2>
                        My characters
                    </h2>
                </Element>

                <Element stretch row={2} width={6} height={2}>
                    <Grid gap="1.25rem" className="characters-list" columnsTemplate={ '1fr '.repeat(characterByRow) }>
                        { fakeData.map((character, index) => {
                            position.row = Math.trunc(1 + index / characterByRow);
                            position.col = 1 + (index % characterByRow);
                            return (
                               <Element key={`character#${character.id}#${character.pseudo}`} className="character" style={{ minWidth: `calc(100vh / ${characterByRow})` }} row={position.row} col={position.col}>
                                   <img className="avatar" alt="avatar-breed" src={`https://s.ankama.com/www/static.ankama.com/dofus/ng/modules/mmorpg/encyclopedia/breeds/assets/illu/${breeds[character.classe]}.jpg`} />
                                   { character.id }
                                   { character.pseudo }
                               </Element>
                           );
                        }) }
                        <Element
                            className='new-character'
                            row={position.col % characterByRow === 0 ? (position.row + 1) : position.row}
                            col={position.col % characterByRow === 0 ? 1 : position.col + 1 % characterByRow}
                        >
                            Create new character
                        </Element>
                    </Grid>
                </Element>
            </>
        );
    }
}