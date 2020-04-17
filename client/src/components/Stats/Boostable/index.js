import React, { useContext, useState, useEffect } from 'react'
import get from 'lodash.get'
import { Grid, Element, Column, Input, Row, Button } from 'muejs'
import { STATS } from 'shokkoth-constants'

import useDebounce from '../../../hooks/useDebounce'

import EquipmentsContext from '../../../store/context/equipments'

import * as selectors from '../../../store/selectors/equipments'
import * as actions from '../../../store/actions/equipments'


import { STATS_IMG_URI } from '../../../constants/URIs'

import './stylesheet.styl'


const { BOOSTABLE_STATS, OTHERS_ELEMENTS_STATS, STATS_TYPE, VITALITY, WISDOM, PUISSANCE } = STATS

const { BASE, PARCHO, EQUIPMENT } = STATS_TYPE


const Boostable = ({ stuff }) => {
    const [store, dispatch] = useContext(EquipmentsContext);

    const pointsToDispatch = selectors.getPointsToDispatch(store, { stuff })

    const storedBaseStats = selectors.getCharacterBaseStats(store, { stuff })
    const storedParchoStats = selectors.getCharacterParchoStats(store, { stuff })
    
    const [baseStats, setBaseStats] = useState(storedBaseStats || {})
    const [parchoStats, setParchoStats] = useState(storedParchoStats || {})

    const debouncedBaseStats = useDebounce(baseStats, 250);
    const debouncedParchoStats = useDebounce(parchoStats, 250);

    useEffect(() => {
        actions.setBaseStats(debouncedBaseStats, [store, dispatch])
    }, [JSON.stringify(debouncedBaseStats)])

    useEffect(() => {
        actions.setParchoStats(debouncedParchoStats, [store, dispatch])
    }, [JSON.stringify(debouncedParchoStats)])

    function setAllParchoTo(value) {
        const newStats = {}
        Object.keys(BOOSTABLE_STATS).forEach(name => newStats[name] = value)
        setParchoStats(newStats)
    }
    
    return (
        <Column className="align-items-center mv-20">
            <div className="text-primary font-18">Il vous reste { pointsToDispatch } point{ pointsToDispatch === 1 ? '' : 's' } à répartir.</div>
            <Grid className="boostable-stat justify-space-between pv-10" columnsTemplate="20px repeat(7, auto)" colGap="10px" rowGap="5px">
                    <Element className="flex align-items-center">
                        <img src={`${STATS_IMG_URI}/${BASE}`} alt={'Caractéristiques'} title={'Points de caractéristiques'} width={20} height={20} />
                    </Element>

                    { Object.keys(BOOSTABLE_STATS).map(name => (
                        <Input
                            key={name}
                            tabIndex={1}
                            className="font-18 text-right justify-self-right align-self-center ml-15 pv-2 ph-5"
                            style={{ maxWidth: 45 }}
                            value={ get(baseStats, `${name}`) || 0 }
                            onChange={e => setBaseStats({ ...baseStats, [name]: Math.min(Math.max(parseInt(e.target.value, 10) || 0, 0), name === VITALITY ? 995 : name === WISDOM ? 331 : 398) })}
                        />
                    )) }

                    <Element row={1} height={3} col={8} className="align-center">
                        <Button className="ph-5 pv-2 mh-5 font-14" onClick={() => setAllParchoTo(0)}>
                            0
                        </Button>
                        <span className="justify-self-center bg-dark-grey width-100" style={{ height: 14, clipPath: 'polygon(10% 15%, 10% 45%, 48% 45%, 48% 0%, 52% 0%, 52% 100%, 48% 100%, 48% 55%, 10% 55%, 10% 85%, 0% 50%)' }}></span>
                        <Button className="ph-5 pv-2 mh-5 font-14" onClick={() => setAllParchoTo(100)}>
                            100
                        </Button>
                    </Element>

                    <Element className="flex align-items-center">
                        <img src={`${STATS_IMG_URI}/${PARCHO['all']}`} alt={'Parcho'} title={'Parchotage'} width={20} height={20} />
                    </Element>

                    { Object.keys(BOOSTABLE_STATS).map(name => (
                        <Input 
                            key={name}
                            tabIndex={2}
                            className="font-18 text-right justify-self-right align-self-center ml-15 pv-2 ph-5" 
                            style={{ maxWidth: 45 }} 
                            value={ get(parchoStats, `${name}`) || 0 }
                            onChange={e => setParchoStats({ ...parchoStats, [name]: Math.min(Math.max(parseInt(e.target.value, 10) || 0, 0), 100) })}
                        />
                    )) }
                

                    <Element className="flex align-items-center">
                        <img src={`${STATS_IMG_URI}/${EQUIPMENT}`} alt={'Équipement'} title={'Équipement'} width={20} height={20} />
                    </Element>

                    { Object.entries(BOOSTABLE_STATS).map(([name, imgUrl]) => (
                        <Element key={name} className="justify-self-end ph-5">
                            <span className="text-primary justify-self-end bold font-18 ml-20">
                                { selectors.getEquipmentsStat(store, { stuff, name }) || 0 }
                                </span>
                        </Element>
                    )) }

                    
                    <Element />

                    { Object.entries(BOOSTABLE_STATS).map(([name, imgUrl]) => (
                        <Row key={name} className="nowrap justify-space-between align-items-center ph-5">
                            <img src={`${STATS_IMG_URI}/${imgUrl}`} alt={name} title={name} width={16} height={16} />
                            <span className="text-primary bold font-20 ml-4">
                                { selectors.getStat(store, { stuff, name }) || 0 }
                            </span>
                        </Row>
                    )) }

                    <Row className="nowrap justify-space-between align-items-center ph-5">
                        <img src={`${STATS_IMG_URI}/${OTHERS_ELEMENTS_STATS[PUISSANCE]}`} alt={'Équipement'} title={'Équipement'} width={16} height={16} />
                        <span className="text-primary bold font-18 ml-4">
                            { selectors.getStat(store, { stuff, name: PUISSANCE }) || 0 }
                        </span>
                    </Row>
            </Grid>
        </Column>
    )
    
}

export default Boostable
