import React from 'react'
import {Row} from 'shards-react'

export const NextRace = ({nextRace}) => {
    const race = nextRace.Races[0];
    const raceName = race.raceName;
    const circuitName = race['Circuit']['circuitName'];
    // console.log(nextRace)

    return (
        <Row>
            <span>Round {nextRace.round}-up next</span>
            <span>{raceName} at {circuitName}</span>
        </Row>
    )
}

export const NextRaceHeader = ({round, raceName, season, onClick}) => {
    return (
        <div onClick={onClick}>
            <span>Next-Round {round}</span>
            <span>{raceName}</span>
            <span>{season}</span>
        </div>
    )
}
