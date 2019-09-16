import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import get from 'lodash.get';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Form, Grid, Element, Input, Column, Row, Label, Button, Spinner } from 'muejs';
import { CHARACTERS } from 'shokkoth-models'

import Links from '../../../components/LinksSwitch';
import BreedsList from '../../../components/BreedsList';
import AvatarWithArrows from '../../../components/AvatarWithArrows';

import { MaleGenderIcon, FemaleGenderIcon } from '../../../assets/svg/genders';
import { decimalToHexa } from '../../../utils/hexGenerator';

import { createCharacter } from '../../../queries/mutations';

import './stylesheet.styl';


const NewCharacter = () => {
  const [rotation, setRotation] = useState(1);
  const [breed, setBreed] = useState(undefined);
  const [gender, setGender] = useState('male');
  const [name, setName] = useState();
  const [level, setLevel] = useState();

  const [create, { data: { createCharacter: createdCharacter } = {}, loading }] = useMutation(gql(createCharacter), {
    variables: { name, level, gender: [CHARACTERS.ENUM].includes(gender.toUpperCase()) ? gender.toUpperCase() : 'MALE', breed: breed && breed._id, }
  });

  if (createdCharacter) return <Redirect to={`/character/${character._id}`} />

  return (
    <Form
      onSubmit={create}
      className="character-new marg marg-b-3-rem"
      gap="3em"
      rowsTemplate="2.5em 3.5em"
      columnsTemplate="6vw 1fr 1fr 1fr 6vw"
    >
      <Element type="h3" col={2} row={1} height={2} width={3} className="main-title text-center font-primary">
        Créer un nouveau personnage
      </Element>

      <Column className="breeds-container" col={2} row={3} width={{ xs: 3, md: 1 }}>
        <Grid className="align-start justify-center" columnsTemplate="repeat(auto-fit, 4em)" gap="1em">
          <BreedsList select={breed => setBreed(breed)} selected={breed} />
        </Grid>
      </Column>

      <AvatarWithArrows col={{ xs: 2, md: 3 }} row={{ xs: 4, md: 3}} width={{ xs: 3, md: 2, lg: 1 }} breed={breed} gender={gender} rotation={rotation} style={{ alignSelf: 'end', height: '18em' }} />


      <Column  col={{ xs: 2, md: 3 }} row={{ xs: 4, md: 3 }} style={{ alignSelf: 'start' }}>
        <MaleGenderIcon className={`gender-btn pointer ${gender === 'male' ? 'active' : ''}`.trim()} height="2em" width="2em" onClick={() => setGender('male')} />
        <FemaleGenderIcon className={`gender-btn pointer ${gender === 'female' ? 'active' : ''}`.trim()} height="2em" width="2em" onClick={() => setGender('female')} />
      </Column>

      {/* <Row col={2} row={{ xs: 6, md: 4 }} width={{ xs: 3, md: 1 }} className="justify-left">
        <Column className="marg-r-10">
          <MaleGenderIcon className={`gender-btn pointer ${gender === 'male' ? 'active' : ''}`.trim()} height="2em" width="2em" onClick={() => setGender('male')} />
          <FemaleGenderIcon className={`gender-btn pointer ${gender === 'female' ? 'active' : ''}`.trim()} height="2em" width="2em" onClick={() => setGender('female')} />
        </Column>
        { breed && breed.skins[gender].defaultColors.split(',').map((colorValue, index) => {
          const colorString = colorValue.split('=')[1];
          const colorHex = colorString.charAt(0) === '#' ? colorString : decimalToHexa(colorString);

          return (
            <Label key={`breed#${breed.name}#color#${colorHex}#${index}`} className="marg-10">
              <input type="color" className="hidden" />
              <label style={{ width: '4em', height: '4em', display: 'inline-block', backgroundColor: colorHex }} />
            </Label>
          );
        }) }
      </Row> */}

      <Label col={{ xs: 2, md: 3 }} row={{ xs: 5, md: 4}} width={{ xs: 3, md: 2, lg: 1 }}>
        <Input name="character-name" autoComplete="true" type="text" placeholder="Nom du personnage *" required value={name} onChange={e => setName(e.target.value)} />
      </Label>

      <Button
        col={{ xs: 2, md: 3 }}
        row={{ xs: 6, md: 5}}
        width={{ xs: 3, md: 2, lg: 1 }}
        type="submit"
        className={"btn-arrow bg-primary"}
        disabled={loading}
      >
        { loading ? <Spinner style={{ height: '1em' }}/> : 'Go !' }
      </Button>
    </Form>
  );
}

export default withRouter(NewCharacter);
