import React, { useState, useContext } from 'react'
import get from 'lodash.get'
import memoize from 'lodash.memoize'
import { Row } from 'muejs'
import { STATS } from 'shokkoth-constants'

import { STATS_IMG_URI } from '../../../../constants/URIs'

const { ESSENTIAL_STATS, ELEMENTS_STATS, AP, MP, RANGE, AP_MP, AP_RANGE, MP_RANGE, AP_MP_RANGE, MULTI_ELEMENTS, PASSIVE } = STATS

const getInterestingStats = memoize(({ name, statistics, passives }) => {
    const toReturn = []

    let passive = null
    if (get(passives, 'length') > 0) {
        passive = true
        toReturn.push(STATS.populate(PASSIVE))
    }

    const essentialStats = []
    statistics.forEach(stat => {
        if (Object.keys(ESSENTIAL_STATS).includes(stat.name)) {
            essentialStats.push(stat.name)
        }
    })

    const elementalStats = []
    statistics.forEach(stat => {
        if (Object.keys(ELEMENTS_STATS).includes(stat.name)) {
            elementalStats.push(stat.name)
        }
    })

    if ([essentialStats, elementalStats].flat().length > passive ? 3 : 4) {
        if (essentialStats.length > 1) {
            if (essentialStats.includes(AP)) {
    
                if (essentialStats.includes(MP)) {
    
                    if (essentialStats.includes(RANGE)) {
                        toReturn.push(STATS.populate(AP_MP_RANGE))
                    }
                    else {
                        toReturn.push(STATS.populate(AP_MP))
    
                    }
    
                } else if (essentialStats.includes(RANGE)) {
                    toReturn.push(STATS.populate(AP_RANGE))
                }
    
            } else if (essentialStats.includes(MP) && essentialStats.includes(RANGE)) {
                toReturn.push(STATS.populate(MP_RANGE))
            }
        }
        else {
            toReturn.push(essentialStats.map(s => STATS.populate(s)))
        }

        if (elementalStats.length > 3) {
            toReturn.push(STATS.populate(MULTI_ELEMENTS))
        } else {
            toReturn.push(elementalStats.map(s => STATS.populate(s)))
        }
    }
    else {
        toReturn.push(essentialStats, elementalStats)
    }

    return toReturn.flat()
}, ({ statistics }) => JSON.stringify(statistics.map(s => s.name)))


const MainStats = ({ equipment }) => {
    const interestingStats = getInterestingStats(equipment)

    return (
        <div className="width-100" style={{ marginTop: '-5px'}}>
            <Row className="nowrap justify-center align-flex-end z-index-5">
                { get(interestingStats, 'length') > 0 && interestingStats.map(({ fr, imgUrl }) => {
                    return <img key={fr} title={fr} src={`${STATS_IMG_URI}/${imgUrl}`} className="mh-2" height="25%" width="25%" />
                }) }
            </Row>
        </div>
    )
}

export default MainStats
