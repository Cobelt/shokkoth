import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import get from 'lodash.get';
import { Grid, Element, Input, Column, Row, Label } from 'muejs';

import Links from '../../../components/LinksSwitch';
import BreedsList from '../../../components/BreedsList';
import Avatar from '../../../components/Avatar';

import { MaleGenderIcon, FemaleGenderIcon } from '../../../assets/svg/genders';

import './stylesheet.styl';


const NewCharacter = () => {
  const [rotation, setRotation] = useState(1);
  const [breed, setBreed] = useState(undefined);
  const [gender, setGender] = useState('male');
  const [name, setName] = useState();

  return (
    <Grid className="character-new marg marg-b-3-rem" gap="3em" rowsTemplate="2.5em 3.5em max-content fit-content(100%) 1fr" columnsTemplate="6em 1fr 1fr 1fr 6em">
        <Element type="h3" col={1} row={1} height={2} width={5} className="main-title text-center font-primary">
          Créer un nouveau personnage
        </Element>

        <Column className="breeds-container" col={2} row={3}>
          <Grid columnsTemplate="repeat(6, 1fr)" gap="1em">
            <BreedsList select={breed => setBreed(breed)} selected={breed} />
          </Grid>
        </Column>

        <Row col={2} row={4} className="justify-around">
          <div>
          <MaleGenderIcon style={{ opacity: gender === 'male' ? 1 : 0.4 }} onClick={() => setGender('male')} />
          <FemaleGenderIcon style={{ opacity: gender === 'female' ? 1 : 0.4 }} onClick={() => setGender('female')} />
          </div>
          { breed && breed.skins[gender].defaultColors.split(',').map((colorString, index) => {
            const colorHex = `#${colorString.split('=')[1]}`;
            console.log('color=', colorHex, parseInt(colorHex, 16));
            return (
              <Label key={`breed#${breed.name}#color#${colorHex}#${index}`}>
                <input type="color" style={{ width: 0, height: 0, overflow: 'hidden', visibility: 'hidden' }} />
                <label style={{ width: '4.5em', height: '4.5em', display: 'inline-block', backgroundColor: colorHex }} />
              </Label>
            );
          }) }
        </Row>

        <Avatar col={3} row={3} breed={breed} gender={gender} rotation={rotation} />

        <Label col={3} row={4}>
          <Input name="character-name" autoComplete="true" type="text" placeholder="Nom du personnage *" required value={name} onChange={e => setName(e.target.value)} />
        </Label>
    </Grid>
  );
}

export default NewCharacter;
