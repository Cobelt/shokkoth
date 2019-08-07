import React, { useContext, useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Button, Grid, Element, Row, Icon } from 'muejs';
import { USERS } from 'shokkoth-models';

import UserContext from '../../../store/context/user';

import { useUser } from '../../../hooks/useUser';

import Links from '../../../components/LinksSwitch';

import { getMyCharacters } from '../../../queries';

import './stylesheet.styl';






const MyCharacters = ({ showLogin, history: { goBack, push } = {} }) => {
  const [characterByRow, setCharacterByRow] = useState(5);
  const context = useContext(UserContext);

  const { user, hasRoles } = useUser(context);
  const { data: { myCharacters = [] } = {}, loading, error } = useQuery(gql(getMyCharacters));

  const isAuthorized = hasRoles({ needRoles: [USERS.ROLES.USER] });

  const mq = window.matchMedia("(max-width: 801px)");
  useEffect(() => {
    const widthChange = (mq) => {
      if (mq.matches) {
        if (characterByRow !== 2) setCharacterByRow(2);
      } else {
        if (characterByRow !== 5) setCharacterByRow(5);
      }
    }

    try {
      mq.removeListener(widthChange);
    }
    finally {
      mq.addListener(widthChange);
      widthChange(mq);
    }

    return () => mq.removeListener(widthChange);
  }, [mq])

  if (isAuthorized === null) showLogin(true);
  if (!isAuthorized) return <Redirect to="/" />




  const position = { row: 1, col: 0 };

  const title = loading ? 'Chargement de mes personnages...' : error ? `Erreur! ${error.message}` : 'Mes personnages'

  return (
    <Grid className="characters-container marg marg-b-3-rem" gap="3rem" rowsTemplate="2.5rem 3.5rem fit-content(100%) fit-content(100%)" columnsTemplate="6rem 1fr">

      <Element type="h3" col={1} row={1} height={2} width={2} className="main-title text-center font-primary">{ title }</Element>

      <Element type={Link} col={1} row={3} width={2} to="/characters/new" className="link-to-new marg-h-auto relative">
        <Button className="bg-primary">Créer un nouveau personnage</Button>
        <Icon className="absolute bg-primary pad-6" size="sm" icon="person_add" style={{ top: 0, right: 0, transform: 'translate(50%, -50%)', borderRadius: '50%' }} />
      </Element>

      <Element justify="stretch" align={"start"} row={4} width={2}>
        <Grid rowGap="2em" className="characters-list" columnsTemplate={ '1fr '.repeat(characterByRow) }>
          { myCharacters.map((character, index) => {
            const { breed } = character;
            position.row = Math.trunc(1 + index / characterByRow);
            position.col = 1 + (index % characterByRow);

            const avatarClassnames = [
                'avatar',
                breed && `breed-${breed._id}`,
                (position.row - 1) % 2 === 1 && 'row-odd',
                position.col === 1 && 'first-of-row',
                position.col === characterByRow && 'last-of-row',
            ].filter(e => !!e).join(' ');

            const backgroundImage = breed && `url(//img.shokkoth.tk/dofus/ng/modules/mmorpg/encyclopedia/breeds/assets/bg/breed-${breed._id}.jpg)`;

            return !character.empty && (
              <Element
                  key={`character#${character._id || uuid()}#${character.name}#breed=${breed._id}`}
                  className="character"
                  style={{ minWidth: `calc(100vw / ${characterByRow})` }}
                  row={position.row}
                  col={position.col}
                  onClick={() => push(`/characters/${character._id}`)}
              >
                  <div className={avatarClassnames} style={{ backgroundImage }} aria-disabled={true}>
                      { (character.name || character.level) && (
                          <div className="name-and-level">
                              { character.name && <span className="name">{ character.name }</span> }
                              { character.level && <span className="level">{ character.level }</span> }
                          </div>
                      ) }
                  </div>
              </Element>
            );
          }) }
        </Grid>
      </Element>
    </Grid>
  );
}
export default withRouter(MyCharacters);
