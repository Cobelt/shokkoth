import React, { useState, useContext, useEffect } from 'react'
import get from 'lodash.get'
import { Column, Input, Button, Row } from 'muejs'
import { STATS, COMMON } from 'shokkoth-constants'

import useDebounce from '../../../../hooks/useDebounce'
import useParams from '../../../../hooks/useParams'

import EquipmentsContext from '../../../../store/context/equipments'
import * as selectors from '../../../../store/selectors/equipments'

import { STATS_IMG_URI } from '../../../../constants/URIs'
import { arrayToClassName } from '../../../../utils/common'

const { translations, SEARCH_BUTTONS, DEFAULT_STATE, WEAPON_STATE, SHIELD_STATE, DOFUS_STATE } = STATS

const LEVEL_MIN = 1
const LEVEL_MAX = 200

const SearchBar = ({ setQueryVariables = () => undefined }) => {
    const [store] = useContext(EquipmentsContext)

    const category = selectors.getActiveCategory(store) || undefined
    const typesList = COMMON.getTypesOfCategory(category)

    const [previousCategory, setPreviousCategory] = useState(category)
    
    const level = selectors.getStuffLevel(store) || LEVEL_MAX

    const [savedLevelMin, saveLevelMin] = useState(Math.max(level - 15, LEVEL_MIN))
    const [savedLevelMax, saveLevelMax] = useState(Math.min(level + 15, LEVEL_MAX))

    const state = ['shield', 'dofus', 'weapon'].some(cat => category == cat) ? WEAPON_STATE : DEFAULT_STATE

    const [params, dispatch] = useParams({
        search: '',
        stats: {},
        types: {},
        page: 1,
        perPage: 80,
        levelMin: Math.max(level - 15, LEVEL_MIN),
        levelMax: Math.min(level + 15, LEVEL_MAX)
    })

    const debouncedParams = useDebounce(params, 350)
    const { search, page, perPage, levelMin, levelMax, stats, types } = params || {}
    
    useEffect(() => {
        dispatch({ levelMin: Math.max(level - 15, LEVEL_MIN) })
        dispatch({ levelMax: Math.min(level + 15, LEVEL_MAX) })
    }, [level])
    
    useEffect(() => {
        const cleanedTypes = {}
        types instanceof Object && Object.entries(types).forEach(([name, activated]) => {
            if (typesList.findIndex(t => t === name) > -1 && activated) {
                cleanedTypes[name] = true
            }
        })
        dispatch({ types: cleanedTypes, options: { replace: true } })

        const newCatMatch = ['pet', 'dofus'].some(cat => category == cat)
        const oldCatMatch = ['pet', 'dofus'].some(cat => previousCategory == cat)

        if (newCatMatch && !oldCatMatch) {
            saveLevelMin(levelMin)
            dispatch({ levelMin: LEVEL_MIN })

            saveLevelMax(levelMax)
            dispatch({ levelMax: LEVEL_MAX })
        } 
        else if (!newCatMatch && oldCatMatch) {
            dispatch({ levelMin: savedLevelMin })
            dispatch({ levelMax: savedLevelMax })
        }

        setPreviousCategory(category)
    }, [category])

    useEffect(() => {
        let activatedTypes = types instanceof Object && 
            Object.entries(types).map(([key, isActive]) => isActive && key).filter(e => !!e) || undefined
        const typeIn = get(activatedTypes, 'length') > 0 ? activatedTypes : undefined

        let activatedStats = stats instanceof Object && 
            Object.entries(stats).map(([key, isActive]) => isActive && key).filter(e => !!e) || undefined
        const statsAll = get(activatedStats, 'length') > 0 ? activatedStats : undefined

        
        setQueryVariables({
            filter: { search: search, categoryIn: category, typeIn, statsAll, levelMin, levelMax },
            skip: Math.max((page - 1), 0) * perPage, // page 0 and page 1 are the same
            perPage: perPage,
            sort: ['pet', 'dofus'].some(cat => category == cat) ? 'TYPEORDER_ASC' : 'LEVEL_DESC',
            // const order = types === 'trophy,dofus' && { type: 1, level: -1, _id: -1 }
        })
    }, [JSON.stringify(debouncedParams), category])

    const medianLevel = (levelMax + levelMin) / 2
    return (
        <>
            <Input
                className="searchbar justify-center ph-24 pv-20" 
                type="text" 
                style={{ maxHeight: 64 }}
                placeholder="Écrivez le nom d'un équipement"
                value={params.search}
                onChange={e => dispatch({ search: e.target.value })} 
            />

            <Column className="filters bg-primary p-15">
                <div className="justify-center">
                    { Object.entries(SEARCH_BUTTONS[state]).map(([name, value]) => (
                        <Button
                            key={name}
                            aspect="text"
                            className="search-filter-icons round p-10"
                            style={{ height: 40, width: 40 }}
                            type="button"
                            onClick={() => dispatch({ stats: { ...stats, [name]: !get(stats, name) } })}
                        >
                            <img 
                                className={!get(stats, name) ? 'grey' : ''} 
                                src={`${STATS_IMG_URI}/${typeof value === 'string' ? value : get(value, 'imgUrl')}`} 
                                height={20} width={20}
                            />
                        </Button>
                    )) }
                </div>
            </Column>
            
            <Row className="bg-input ph-15">
                <Column className="width-100">
                    <div className="text-center pt-10">Level des équipements</div>
                    <Row className="align-items-center">
                        <span className="mr-10">{ levelMin }</span>
                        <Row className="flex-1" style={{ backgroundColor: 'rgba(0,0,0,0.2)'}}>
                            <Input 
                                type="range" 
                                min={LEVEL_MIN - 5} 
                                max={medianLevel - 1}
                                value={levelMin}
                                className="slider p-0 mv-0 ml-0 bg-primary"
                                style={{ marginRight: -1, flex: medianLevel - 1, clipPath: `polygon(${(levelMin - 1) * 100 / (medianLevel - 1)}% 0%, 100% 0%, 100% 100%, ${(levelMin - 1) * 100 / (medianLevel - 1)}% 100%)` }} 
                                onChange={e => dispatch({ levelMin: Math.trunc(Math.max(Math.min(e.target.value, levelMax), LEVEL_MIN)) })}
                            />

                            <Input 
                                type="range"
                                min={medianLevel + 1}
                                max={LEVEL_MAX + 5}
                                value={levelMax}
                                className="slider m-0 p-0 bg-primary" 
                                style={{ flex: LEVEL_MAX - medianLevel, clipPath: `polygon(0% 0%, ${(levelMax - medianLevel) * 100 / (LEVEL_MAX - medianLevel)}% 0%, ${(levelMax - medianLevel) * 100 / (LEVEL_MAX - medianLevel)}% 100%, 0% 100%)` }} 
                                onChange={e => dispatch({ levelMax: Math.trunc(Math.min(Math.max(e.target.value, levelMin), LEVEL_MAX)) })}
                            />
                        </Row>
                        <span className="ml-10">{ levelMax }</span>
                    </Row>
                    <Row className="pt-10 justify-space-evenly">
                        { category && get(typesList, 'length') > 1 && typesList.map((name) => (
                            <Button
                                key={name}
                                aspect={get(types, name) ? 'filled-input-reversed' : 'filled-input'}
                                className="b-1 b-grey b-solid b-rounded ph-5 pv-2 m-2 font-18 flex align-items-center"
                                onClick={() => dispatch({ types: { ...types, [name]: !get(types, name) } })}
                            >
                                <i className="material-icons-round mr-5">{ get(types, name) ? 'check_box' : 'check_box_outline_blank' }</i>
                                { COMMON.translations[name].fr }
                            </Button> 
                        ))}
                    </Row>
                </Column>
            </Row>
        </>
    )
}
export default SearchBar
