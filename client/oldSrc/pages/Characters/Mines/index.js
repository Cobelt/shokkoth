import React, { useContext, useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import get from 'lodash.get';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Button, Grid, Element, Row, Icon, FullPageSpinner } from 'muejs';
import { USERS } from 'shokkoth-constants';

import UserContext from '../../../store/context/user';
import DataContext from '../../../store/context/data';

import * as selectors from '../../../store/selectors/data/characters';
import * as actions from '../../../store/actions/data/characters';

import { useUser } from '../../../hooks/useUser';

import { getMyCharacters } from '../../../queries';

import './stylesheet.styl';
import { DOFUS_IMG_URI } from '../../../constants/URIs';


const MyCharacters = ({ history: { goBack, push } = {} }) => {
  const [characterByRow, setCharacterByRow] = useState(5);
  const [store, dispatch] = useContext(DataContext);

  const context = useContext(UserContext);
  const { user, token, isLogged } = useUser(context);
  const [fetch, { called, data: { myCharacters: fetched = [] } = {}, loading, error }] = useLazyQuery(gql(getMyCharacters));

  const characters = selectors.getMyCharacters(store) || [];

  useEffect(() => {
    if (user && !called && !loading) {
      fetch();
    }
  }, [get(user, '_id')]);

  // to remove when cache will work
  useEffect(() => {
    if (fetched.length > 0) {
      console.log('fetched those:', fetched);
      actions.saveMines({ fetched }, [store, dispatch]);
    }
  }, [fetched.length])

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



  if (!token || (token && !isLogged)) return <Redirect to="/" />

  if (loading) return <FullPageSpinner />;

  const title = error ? `Erreur! ${error.message}` : 'Mes personnages'

  return (
    <Grid className="characters-container mb-50" gap="3rem" columnsTemplate="1fr">

      <Element type="h3" col={1} row={1} className="main-title text-center font-primary">{ title }</Element>

      <Element justify="stretch" align={"start"} row={2}>
        <Grid rowGap="2em" className="characters-list" columnsTemplate={ '1fr '.repeat(characterByRow) }>
          { [null, characters].filter(e => e !== undefined).flat().map((character, index) => {
            const { name, level, stuffs, breed } = character || {};
            const row = Math.trunc(1 + (index / characterByRow));
            const col = 1 + (index % characterByRow);


            const avatarClassnames = [
                'avatar',
                !character && 'empty-character link-to-new',
                breed && `breed-${breed._id}`,
                (row - 1) % 2 === 1 && 'row-odd',
                col === 1 && 'first-of-row',
                col === characterByRow && 'last-of-row',
            ].filter(e => !!e).join(' ');

            const backgroundImage = breed && `url(${DOFUS_IMG_URI}/ng/modules/mmorpg/encyclopedia/breeds/assets/bg/breed-${breed._id}.jpg)`;

            return (
              <Element
                  key={character ? `character#${get(character, '_id') || uuid()}#${get(character, 'name')}#breed=${get(breed, '_id')}` : 'create#character' + uuid() }
                  className="character"
                  style={{ minWidth: `calc(100vw / ${characterByRow})` }}
                  row={row}
                  col={col}
                  onClick={() => push(!character ? '/characters/new' : `/characters/edit/${character._id}`)}
              >
                  <div className={avatarClassnames} style={{ backgroundImage }} aria-disabled={true}>
                      { !character && (
                        <div className="new-icon">
                          <Icon className="p-0 m-0" icon="add" style={{ color: "var(--font-color-on-primary)", fontWeight: '900' }} size="xl" />
                        </div>
                      )}
                      { character && (name || level) && (
                          <div className="name-and-stuffscount">
                              { name && <span className="name">{ character.name }</span> }
                              {/* level && <span className="level">{ character.level }</span> */}
                              { stuffs && (
                                <span className="stuffs flex" style={{ alignItems: 'center' }}>
                                  <Icon icon={`filter_${stuffs.length === 0 ? 'none' : (stuffs.length > 9 ? '9_plus' : stuffs.length)}`} size="sm" className="p-0 m-0" />
                                </span>
                              ) }
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
