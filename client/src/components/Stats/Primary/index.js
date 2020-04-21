import React, { useContext } from 'react'
import get from 'lodash.get'
import { Row, Column } from 'muejs'
import { STATS } from 'shokkoth-constants'

import EquipmentsContext from '../../../store/context/equipments'

import * as selectors from '../../../store/selectors/equipments'


import { STATS_IMG_URI } from '../../../constants/URIs'

import './stylesheet.styl'


const { ESSENTIAL_STATS, OTHERS_PRIMARY_STATS } = STATS



const Primary = ({ stuff }) => {
    const [store] = useContext(EquipmentsContext);
    
    return (
        <Column className="align-items-stretch mv-10">
            <div className="text-primary text-center font-18">Caractéristiques primaires</div>
            <Row className="justify-space-between nowrap pv-10">
                { [ ...ESSENTIAL_STATS, ...OTHERS_PRIMARY_STATS ].map(name => (
                    <div key={name} className="displayed-stat">

                        <div className="flex align-items-center">
                            <img src={`${STATS_IMG_URI}/${get(STATS.populate(name), 'imgUrl')}`} alt={name} title={name} width={16} height={16} />
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

export default Primary
