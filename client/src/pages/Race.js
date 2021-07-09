import React, {useEffect} from 'react'
import {getLastRace} from '../utils/api'
const Race = ({match}) => {
    useEffect(() => {
        const {params: {round, season}} = match
        if (!round || !season) {
            // get the last race and fill the info
            getLastRace()
                .then(({season, round}) => console.log(season, round))
        } else if (round && season) {
            // get the race with that round and season
        }
    }, [])
    return (
        <div>
            Race Info here
        </div>
    )
}

export default Race
