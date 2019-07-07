import React, { useState } from 'react';
import { Grid, Element, Row, Icon } from 'muejs';
import uuid from 'uuid/v4';
import { withRouter } from 'react-router-dom';



import { BREEDS } from '../../../constants/breeds';
import './stylesheet.styl';


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
        pseudo: 'Ectorche',
        level: '199',
        classe: 'Steamer',
    },
    {
        id: 17,
        pseudo: 'Vodoun',
        level: '176',
        classe: 'Sadida',
    },
    {
      	id: 18,
      	pseudo: 'Blixtnedslag',
      	classe: 'Iop',
    },
];


const MyCharacters = ({ history: { goBack, push } = {} }) => {
    const [characterByRow, setCharacterByRow] = useState(5);

    const widthChange = (mq) => {
      if (mq.matches) {
        if (characterByRow !== 5) setCharacterByRow(5);
      } else {
        if (characterByRow !== 2) setCharacterByRow(2);
      }
    }

    const mq = window.matchMedia("(min-width: 800px)");
    mq.addListener(widthChange);
    widthChange(mq);


    const position = { row: 1, col: 0 };

    const dataCompleteRows = [...fakeData].concat(Array((characterByRow - (fakeData.length % characterByRow)) % characterByRow).fill({ empty: true }));



    return (
        <Grid className="characters-container marg marg-b-3-rem" gap="3rem" rowsTemplate="2.5rem 3.5rem fit-content(100%)" columnsTemplate="6rem 1fr">
            <Element row={1} col={1} height={2}>
                <Icon className="home font-primary" icon="home" row={1} col={1} style={{ justifySelf: 'start', fontSize: '2rem' }} onClick={() => push('/')} />
            </Element>

            <Element col={1} row={1} height={2} width={2} className="text-center font-primary">
                <h2>My characters</h2>
            </Element>

            <Element justify="stretch" align={"start"} row={3} width={2}>
                <Grid rowGap="1rem" className="characters-list" columnsTemplate={ '1fr '.repeat(characterByRow) }>
                    { dataCompleteRows.map((character, index) => {
                        let breed;
                        if (character.classe) {
                          breed = BREEDS.find(breed => breed.name === character.classe.toLowerCase());
                        }
                        position.row = Math.trunc(1 + index / characterByRow);
                        position.col = 1 + (index % characterByRow);

                        const avatarClassnames = [
                            'avatar',
                            breed && `breed-${breed.id}`,
                            (position.row - 1) % 2 === 1 && 'row-odd',
                            position.col === 1 && 'first-of-row',
                            position.col === characterByRow && 'last-of-row',
                        ].filter(e => !!e).join(' ');

                        const backgroundImage = breed && `url(//img.shokkoth.tk/dofus/ng/modules/mmorpg/encyclopedia/breeds/assets/bg/breed-${breed.id}.jpg)`;

                        return !character.empty && (
                            <Element
                                key={`character#${character.id || uuid()}#${character.pseudo}#breed=${breed.id}`}
                                className={`${character.empty ? 'empty-': ''}character`}
                                style={{ minWidth: `calc(100vw / ${characterByRow})` }}
                                row={position.row}
                                col={position.col}
                                onClick={() => push(`/characters/${character.id}`)}
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
        </Grid>
    );
}

export default withRouter(MyCharacters);
