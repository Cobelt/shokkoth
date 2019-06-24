import React, { useState, useContext } from 'react';
import { Grid, Element } from 'muejs';

import EquipmentsContext from '../../store/context/equipments';

import * as selectors from '../../store/selectors/equipments';
import * as actions from '../../store/actions/equipments';

import { PRIMARY_STATS, SECONDARY_STATS, DAMAGES_STATS, RESISTANCES_STATS } from '../../constants/stats';

import './stylesheet.styl';


const CharacterStats = ({ className, ...otherProps }) => {
    const [store, dispatch] = useContext(EquipmentsContext);

    return (
      <Grid columnsTemplate="repeat(auto-fit, 1fr)" className="pad-1-rem">
        <Element col={1}>
          PRIMARY
        </Element>
        { Object.entries(PRIMARY_STATS).map(([stat, imgUrl], index) => (
          <Element key={stat} col={1} row={2+index} style={{ display: 'inline' }}>
            0
            { stat }
            <img src={`//img.shokkoth.tk/assets/stats/${imgUrl}`} />
          </Element>
        )) }

        <Element col={2}>
          SECONDARY
        </Element>
        { Object.entries(SECONDARY_STATS).map(([stat, imgUrl], index) => (
          <Element key={stat} col={2} row={2+index} style={{ display: 'inline' }}>
            0
            { stat }
            <img src={`//img.shokkoth.tk/assets/stats/${imgUrl}`} />
          </Element>
        )) }

        <Element col={3}>
          DAMAGES
        </Element>
        { Object.entries(DAMAGES_STATS).map(([stat, imgUrl], index) => (
          <Element key={stat} col={3} row={2+index} style={{ display: 'inline' }}>
            0
            { stat }
            <img src={`//img.shokkoth.tk/assets/stats/${imgUrl}`} />
          </Element>
        )) }

        <Element col={4}>
          RESISTANCES
        </Element>
        { Object.entries(RESISTANCES_STATS).map(([stat, imgUrl], index) => (
          <Element key={stat} col={4} row={2+index} style={{ display: 'inline' }}>
            0
            { stat }
            <img src={`//img.shokkoth.tk/assets/stats/${imgUrl}`} title={stat} />
          </Element>
        )) }
      </Grid>
    );
}

export default CharacterStats;
