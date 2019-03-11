import React, { Component } from 'react';
import { Grid, Element, Row } from 'muejs';
import uuid from 'uuid/v4';
import { withRouter } from 'react-router-dom';

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
        level: '200+',
        classe: 'Eliotrope',
    },
    {
        id: 1,
        pseudo: 'Cobelt',
        level: '200+',
        classe: 'Ouginak',
    },
    {
        id: 2,
        pseudo: 'Rilur',
        level: '200+',
        classe: 'Cra',
    },
    {
        id: 3,
        pseudo: 'Nyalg',
        level: '200+',
        classe: 'Zobal',
    },
    {
        id: 4,
        pseudo: 'Scygie',
        level: '200+',
        classe: 'Sram',
    },
    {
        id: 5,
        pseudo: 'Knogga',
        level: '200+',
        classe: 'Osamodas',
    },
    {
        id: 6,
        pseudo: 'Aggonk',
        level: '200+',
        classe: 'Ecaflip',
    },
    {
        id: 7,
        pseudo: 'Minibrown',
        level: '200+',
        classe: 'Roublard',
    },
    {
        id: 8,
        pseudo: 'Arkhi',
        level: '200+',
        classe: 'Pandawa',
    },
    {
        id: 9,
        pseudo: 'Poulpee',
        level: '56',
        classe: 'Huppermage',
    },
    {
        id: 10,
        pseudo: 'Eugene',
        level: '200+',
        classe: 'Xelor',
    },
    {
        id: 11,
        pseudo: 'Klutiste',
        level: '143',
        classe: 'Eniripsa',
    },
    {
        id: 12,
        pseudo: 'Fofi-fofi',
        level: '183',
        classe: 'Sacrieur',
    },
    {
        id: 13,
        pseudo: 'Infernum',
        level: '200+',
        classe: 'Iop',
    },
    {
        id: 14,
        pseudo: 'Divitia',
        level: '200+',
        classe: 'Enutrof',
    },
    {
        id: 15,
        pseudo: 'Exuvie',
        level: '199',
        classe: 'Feca',
    },
    {
        id: 16,
        pseudo: 'Knochoupi',
        level: '199',
        classe: 'Steamer',
    },
    {
        id: 17,
        pseudo: 'Vodoun',
        level: '176',
        classe: 'Sadida',
    },
];

class MyCharacters extends Component {
    constructor(props) {
        super(props);
        this.state = { characterByRow: 6 };
    }

    render() {
        const { characterByRow } = this.state;
        const { history: { push } = {} } = this.props;

        const position = { row: 1, col: 0 };

        const dataCompleteRows = [...fakeData].concat(Array((characterByRow - (fakeData.length % characterByRow)) % characterByRow).fill({ empty: true }));

        return (
            <>
                <Element row={1} col={3} width={2} style={{ marginTop: '64px' }}>
                    <h2>My characters</h2>
                </Element>

                <Element justify="stretch" align={"start"} row={2} width={6} height={2}>
                    <Grid rowGap="1rem" className="characters-list" columnsTemplate={ '1fr '.repeat(characterByRow) }>
                        { dataCompleteRows.map((character, index) => {
                            position.row = Math.trunc(1 + index / characterByRow);
                            position.col = 1 + (index % characterByRow);

                            const avatarClassnames = [
                                'avatar',
                                character.classe && `breed-${breeds[character.classe]}`,
                                (position.row - 1) % 2 === 1 && 'row-odd',
                                position.col === 1 && 'first-of-row',
                                position.col === characterByRow && 'last-of-row',
                            ].filter(e => !!e).join(' ');

                            const backgroundImage =  character.classe && `url(https://s.ankama.com/www/static.ankama.com/dofus/ng/modules/mmorpg/encyclopedia/breeds/assets/bg/breed-${breeds[character.classe]}.jpg)`;

                            return (
                                <Element
                                    key={`character#${character.id || uuid()}#${character.pseudo}#breed=${breeds[character.classe]}`}
                                    className={`${character.empty ? 'empty-': ''}character`}
                                    style={{ minWidth: `calc(100vh / ${characterByRow})` }}
                                    row={position.row}
                                    col={position.col}
                                    onClick={() => push(`/character/${character.id}`)}
                                >
                                    <div className={avatarClassnames} style={{ backgroundImage }} aria-disabled={true}>
                                        { (character.pseudo || character.level) && (
                                            <div className="pseudo-and-level">
                                                { character.pseudo && <span className="pseudo">{ character.pseudo }</span> }
                                                { character.level && <span className="level">{ character.level }</span> }
                                            </div>
                                        ) }
                                    </div>
                                </Element>
                           );
                        }) }
                        {/*<Element*/}
                        {/*    className='new-character'*/}
                        {/*    row={position.col % characterByRow === 0 ? (position.row + 1) : position.row}*/}
                        {/*    col={position.col % characterByRow === 0 ? 1 : position.col + 1 % characterByRow}*/}
                        {/*>*/}
                        {/*    <div className={[*/}
                        {/*        'avatar',*/}
                        {/*        (position.col % characterByRow === 0 ? (position.row + 1) : position.row - 1) % 2 === 1 && 'row-odd',*/}
                        {/*        position.col % characterByRow === 0 ? 1 : position.col + 1 % characterByRow === 1 && 'first-of-row',*/}
                        {/*        position.col % characterByRow === 0 ? 1 : position.col + 1 % characterByRow === characterByRow && 'last-of-row',*/}
                        {/*    ].filter(e => !!e).join(' ')}>*/}
                        {/*        <span className="pseudo">Create new character</span>*/}
                        {/*    </div>*/}
                        {/*</Element>*/}
                    </Grid>
                </Element>
            </>
        );
    }
}

export default withRouter(MyCharacters);