import React, { useContext, useState, useEffect } from 'react'
import get from 'lodash.get'
import { Row, Column, Input } from 'muejs'
import { STATS } from 'shokkoth-constants'

import useDebounce from '../../../hooks/useDebounce'

import EquipmentsContext from '../../../store/context/equipments'

import * as selectors from '../../../store/selectors/equipments'
import * as actions from '../../../store/actions/equipments'


import { STATS_IMG_URI } from '../../../constants/URIs'

import './stylesheet.styl'


const { RES_STATS, PERCENTS_RES_STATS, OTHERS_RES } = STATS



const Resistances = ({ stuff }) => {
    const [store] = useContext(EquipmentsContext);
    
    return (
        <Column className="align-items-stretch mv-10">
            <div className="text-primary text-center font-18">Résistances</div>
            <Row className="justify-space-between nowrap pv-10">
                { Object.values(RES_STATS).map(({ PERCENT, STATIC }) => (
                    <div key={PERCENT} className="displayed-stat">

                        <div className="flex align-items-center">
                            <img src={`${STATS_IMG_URI}/${PERCENTS_RES_STATS[PERCENT]}`} alt={PERCENT} title={PERCENT} width={16} height={16} />
                            <span className="text-primary bold font-20 ml-5">
                                { selectors.getStat(store, { name: PERCENT, stuff }) || 0 }%
                                ({ selectors.getStat(store, { name: STATIC, stuff }) || 0 })
                            </span>
                        </div>

                    </div>
                )) }
            </Row>
            <Row className="justify-space-between nowrap pv-10">
                { Object.entries(OTHERS_RES).map(([name, imgUrl]) => (
                    <div key={name} className="displayed-stat">

                        <div className="flex align-items-center">
                            <img src={`${STATS_IMG_URI}/${imgUrl}`} alt={name} title={name} width={16} height={16} />
                            <span className="text-primary bold font-20 ml-5">
                                { selectors.getStat(store, { name, stuff }) || 0 }
                            </span>
                            <span className="text-primary font-16 hide-until-xl ml-5">
                                { get(STATS, `translations.${STATS.getKey(name)}.short`) }
                            </span>
                        </div>

                    </div>
                )) }
            </Row>
        </Column>
    )
    
}

export default Resistances
