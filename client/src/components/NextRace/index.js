import React from 'react'
import {Row, Container} from 'shards-react'
import "./NextRace.css";

export const NextRace = ({nextRace}) => {
    const race = nextRace.Races[0];
    const raceName = race.raceName;
    const circuitName = race['Circuit']['circuitName'];
    // console.log(nextRace)

    return (
        <Row>
            <div fluid className="raceContainer">
                <span className="upNext">Round {nextRace.round}-up next</span>
                <span>{raceName} at {circuitName}</span>
            </div>
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
