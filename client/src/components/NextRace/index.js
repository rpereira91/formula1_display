import React, {useState, useEffect} from 'react'
import {Row, Container, Col} from 'shards-react'
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { getWikiUrl } from '../../utils/utils';
import { getWikiImage } from '../../utils/api';

import "./NextRace.css";

export const NextRace = ({nextRace}) => {
    const [raceImageUrl, setRaceImageUrl] = useState(null)
    const race = nextRace.Races[0];
    const raceName = race.raceName;
    const circuitName = race['Circuit']['circuitName'];
    const dateTime = moment(race.date, race.time)
    useEffect(() => {
        const search = getWikiUrl(race.url)
        getWikiImage(search)
            .then((pages) => {
                var key = Object.keys(pages)[0]
                setRaceImageUrl(pages[key].original.source)
            })
    }, [race.url]);

    return (
        <Row>
            <div fluid className="raceContainer">
                <Container>
                <Row>
                    <Col sm="12" lg="2">
                        <span className="upNext">Round {nextRace.round}-up next</span>
                    </Col>
                    <Col sm="12" lg="8">
                        <span>{raceName} at {circuitName}</span>
                        {raceImageUrl && <img src={raceImageUrl} alt={race.url} height="200px"/>}
                    </Col>
                    <Col sm="12" lg="2">
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
