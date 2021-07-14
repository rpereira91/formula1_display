import React from 'react'
import {Row, Container, Col} from 'shards-react'
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";

import "./NextRace.css";

export const NextRace = ({nextRace}) => {
    const race = nextRace.Races[0];
    const raceName = race.raceName;
    const circuitName = race['Circuit']['circuitName'];
    const dateTime = moment(race.date, race.time)
    // console.log(nextRace)

    return (
        <Row>
            <div fluid className="raceContainer">
                <Container>
                <Row>
                    <Col sm="12" lg="4">
                        <span className="upNext">Round {nextRace.round}-up next</span>
                    </Col>
                    <Col sm="12" lg="4">
                        <span>{raceName} at {circuitName}</span>
                    </Col>
                    <Col sm="12" lg="4">
                        <span>{dateTime.format('ddd, MMM Do, yyyy [at] h:mm a')}</span>
                    </Col>
                </Row>
                </Container>
            </div>
        </Row>
    )
}

export const NextRaceHeader = ({round, raceName, season, onClick}) => {
    return (
        <div onClick={onClick} className="nextRaceHeader">
            <div className="headerDownIcon">
                <FontAwesomeIcon icon={faAngleDoubleDown} />
            </div>
            <div className="nextRaceInfo">
                <span className="upNext">Next-Round {round}</span>
                <span className="raceName">{raceName}</span>
                <span className="season">{season}</span>
            </div>
        </div>
    )
}
