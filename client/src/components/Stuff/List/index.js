import React, { useState } from 'react';
import get from 'lodash.get';
import { Link } from 'react-router-dom';
import { Element, Column } from 'muejs'

import Stuff from '../Preview';

import './stylesheet.styl';

const StuffsList = ({ error, stuffs, globalCharacter, small, delete: DeleteButton, editable = false }) => {
  if (error) return <Element className="text-error font-20" col={2}>{ error }</Element>

  if (get(stuffs, 'length') > 0) {
    return (
      <Grid>
        { stuffs.map(stuff => (
          <Link key={`stuff#${stuff._id}`} className="relative flex justify-center link-to-watch" to={(editable ? '/stuffs/edit/' : '/stuffs/') + stuff._id}>
            <Stuff small={small} elementClassName="stuff-preview align-start" editable={false} character={globalCharacter || get(stuff, 'character')} stuff={stuff} />
            { editable && DeleteButton && <DeleteButton stuff={stuff} /> }
          </Link>
        )) }
      </Grid>
    )
  }

  return (
    <Column className="align-items-center font-20" style={{ gridColumn: '1 / -1' }}>
      <div className="m-5vh">J'ai beau chercher, je ne trouve aucun stuff correspondant aux critères !</div>

      <Link to="/stuffs/new" className='btn filled-primary flex align-items-center justify-self-center'>Je crée un stuff !</Link>
    </Column>
  )
}

export default StuffsList;
