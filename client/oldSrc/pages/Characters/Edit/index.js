import React, { useState, useContext, useEffect } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import get from 'lodash.get';
import debounce from 'lodash.debounce';
import { Grid, Element, Icon, FullPageSpinner, Spinner, Input, Column, Row } from 'muejs';
import { USERS } from 'shokkoth-constants';

import UserContext from '../../../store/context/user';
import { useUser } from '../../../hooks/useUser';

import StuffsSearch from '../../../components/Stuff/Search';
import BreedsList from '../../../components/BreedsList';

import { getMyCharacters } from '../../../queries';
import * as mutations from '../../../queries/mutations';

import './stylesheet.styl';


const EditCharacter = ({ showLogin, match: { params: { _id } = {} } = {}, history: { push, replace } = {}, location }) => {
  const userContext = useContext(UserContext);
  const { user, hasRoles, loading: userLoading } = useUser(userContext);

  const [newBreed, setBreed] = useState(undefined);
  const [newName, setName] = useState('');
  const [newLevel, setLevel] = useState('');
  const [newVisibility, setVisibility] = useState('');

  const { data: { myCharacters: characters = [] } = {}, error, loading, fetchMore, refetch } = useQuery(gql(getMyCharacters), { variables: { filter: { _id } } });
  const character = characters[0];

  useEffect(() => { if (get(character, 'name') !== undefined) setName(character.name) }, [get(character, 'name')]);
  useEffect(() => { if (get(character, 'level') !== undefined) setLevel(character.level) }, [get(character, 'level')])
  useEffect(() => { if (get(character, 'public') !== undefined) setVisibility(character.public) }, [get(character, 'public')])
  useEffect(() => { if (get(character, 'breed') !== undefined) setBreed(character.breed) }, [get(character, 'breed')])

  const [updateCharacter, { loading: waitingForUpdate }] = useMutation(gql(mutations.updateCharacter))
  const [removeCharacter, { loading: waitingForSuppression, data: deleted }] = useMutation(gql(mutations.removeCharacter))
  const [removeStuff] = useMutation(gql(mutations.removeStuff))

  if (deleted === null) return <Redirect to="/characters" />; // TO FIX : Should not be null
  if (userLoading || loading || waitingForSuppression) return <FullPageSpinner />;


  const isAuthorized = hasRoles({ needRoles: [USERS.ROLES.USER] });
  if (isAuthorized === null) showLogin(true);
  if (!isAuthorized) return <Redirect to={`/characters/${_id}`} />

  const deleteStuff = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Êtes-vous sûr de vouloir supprimer ce stuff ? Vous ne pourrez pas le récupérer.")) {
      removeStuff({ variables: { id } });
      console.log('should replace refetch by storage in state and update it with data returned by mutations')
      refetch();
    }
    return false;
  }

  const updateCharac = async (props) => {
    await updateCharacter(props);
    console.log('should replace refetch by storage in state and update it with data returned by mutations')
    refetch();
  }

  const deleteCharac = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce personnage ? Vous ne pourrez pas le récupérer.")) {
      removeCharacter({ variables: { id: get(character, '_id') } });
    }
  }

  if (!character) return <Redirect to={`/characters/${_id}`} />

  const canSave = newName !== character.name || newLevel !== character.level || newVisibility !== character.public || get(newBreed, '_id') !== get(character, 'breed._id');


  const DeleteStuffButton = ({ stuff }) => <Icon className="trash-btn font-error absolute" style={{ zIndex: 3, top: 0, left: 0, zIndex: 10 }} icon="delete" size="md" onClick={(e) => deleteStuff(e, stuff._id)} />;

  return (
    <Grid className="edit-character stuffs-list mb-50" gap="3em" rowsTemplate="3.5em 4.5em" columnsTemplate={{ xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)', xxxl: 'repeat(4, 1fr)' }}>
      <Element type="h3" row={1} col={1} width={{ md: 2, xl: 3, xxxl: 4 }} height={2} className="main-title justify-center font-primary">
        { error ? `Oups! ${error.message}` : (
          <Column>
            <Row className="stuff-infos" row={1} col={1} width={6}>
              <Icon className={`visibility ${newVisibility ? 'font-primary' : 'font-error'}`.trim()} icon={newVisibility ? "visibility" : "visibility_off" } onClick={() => setVisibility(!newVisibility)} />
              <Input className="level mv-0" type="number" style={{ flex: 2 }} value={ newLevel } onChange={(e) => setLevel(get(e, 'target.value') && parseInt(e.target.value, 10))} />
              <Input className="name mv-0" style={{ flex: 5 }} value={ newName } onChange={(e) => setName(get(e, 'target.value'))} />

              { waitingForUpdate ? <Spinner style={{ margin: '0.4rem', padding: '0.3rem', width: '1em', height: '1em', alignSelf: 'center' }} /> : (
                <Icon
                  className={`save-btn font-primary ${canSave ? '' : 'disabled'}`.trim()}
                  onClick={() => canSave && updateCharac({ variables: { characterId: character._id, record: { name: newName, level: newLevel, public: newVisibility, breed: get(newBreed, '_id') } } })}
                  icon="save"
                />
              ) }
              <Icon
                className={`trash-btn font-error`.trim()}
                onClick={deleteCharac}
                icon="delete"
              />
            </Row>

            <Row className="justify-space-between">
              <BreedsList select={setBreed} selected={newBreed} />
            </Row>
          </Column>
        ) }
      </Element>

      <StuffsSearch
        searchBarPosition={{ row: 3, width: { md: 2, xl: 3, xxxl: 4 } }}
        stuffs={get(character, 'stuffs')}
        globalCharacter={character}
        error={error}
        delete={DeleteStuffButton}
        editable={true}
      />
    </Grid>
  );
}

export default withRouter(EditCharacter);
