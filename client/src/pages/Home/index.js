import React, { useState, useEffect, useReducer } from 'react';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import { Grid, Element, Icon } from 'muejs';

import * as service from '../../services/equipments';

import Stuff from '../../components/Stuff';
import ItemDetails from '../../components/Equipment/Detailled';
import Equipment from '../../components/Equipment';
import Breed from '../../components/Breed';

import { MaleGenderIcon, FemaleGenderIcon } from '../../assets/svg/genders';

import { BREEDS } from '../../constants/breeds';


import './stylesheet.styl';


const Home = ({ idgrid }) => {
  const [step, changeStep] = useState('');
  const [items, setItems] = useState([]);
  const [shouldShow, showLogin] = useState(false);
  // please go on a reducer when you'll do each item
  const [selected, select] = useState(undefined)
  const [gender, setGender] = useState('m');
  const [selectedBreed, setBreed] = useState(BREEDS.find(i => i.name === 'eliotrope'));

  useEffect(() => {
    async function fetchItems() {
      const type = step.replace(/#\d+/, '');
      // store it somewhere in an equipments reducer/context
      const response = await service.fetchEquipments({ type, perPage: 100, order: type.split(',').length > 1 && { type: 1, lvl: -1 }, lvlMin: type.split(',').length > 1 && 1 });
      console.log(response);
      if (!isEqual(items, response)) setItems(response);
    }
    fetchItems();
  }, [step]);


  return (
    <Grid gap="3rem" rowsTemplate="2.5rem 3.5rem fit-content(100%) fit-content(100%) 2.5rem" columnsTemplate={{ 1: '12vw', 2: 'max-content', 6: '12vw'}}>

      <Element row={1} col={1} height={2}>
        <Icon icon="supervisor_account" row={1} col={1} style={{ justifySelf: 'start', fontSize: '2rem' }} />
        <Icon icon="save" row={2} col={1} style={{ justifySelf: 'start', fontSize: '2rem' }} />
      </Element>

      <Element row={1} col={3} width={2} height={2} type="h2" className="align-center" style={{ margin: 0 }}>Shokkoth.tk</Element>

      <Element className="breeds" row={3} col={2} width={4}>
        <MaleGenderIcon className={`male-icon ${gender === 'm' ? 'active': ''}`} onClick={() => setGender('m')} />
        <FemaleGenderIcon className={`female-icon ${gender === 'f' ? 'active': ''}`} onClick={() => setGender('f')} />
        { BREEDS.map((breed, index) => <Breed key={JSON.stringify(breed)} index={index} breed={breed} gender={gender} active={isEqual(breed, selectedBreed)} onClick={() => setBreed(breed)} />) }
      </Element>

      <Element row={4} col={2} className="align-start">
        <Stuff character={{ pseudo: 'Shokkoht', level: '200+', breed: selectedBreed, gender }} step={step} changeStep={changeStep} className="marg-b-2-rem" />

        <ItemDetails className="pad-1-rem" equipment={selected} onClose={() => select(undefined)} style={{ maxWidth: '100%' }} />
      </Element>


      <Element row={4} col={3} width={3} style={{ gridTemplateRows: '7rem 1fr' }}>
        <div className="bg-primary pad-1-rem">Liste des équipments. Ce titre deviendra une liste d'onglet ainsi que tout le nécessaire à une recherche</div>

        <Grid
          columnsTemplate={'repeat(auto-fit, minmax(2vw, 5rem))'}
          rowsTemplate={'repeat(auto-fit, minmax(2vw, 5rem))'}
          className="equipments-list justify-center pad-1-rem"
          style={{ minHeight: '22rem' }}
        >
          { items.length > 0 && items.map((i, index) => <Equipment key={i._id} index={index} equipment={i} select={select} isSelected={isEqual(i, selected)} /> ) }
        </Grid>
      </Element>
    </Grid>
  );
}
export default Home;
