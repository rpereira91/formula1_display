import React, {useState, useEffect} from 'react'
import {Row, Col} from 'shards-react'
import moment from 'moment-timezone'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { getWikiUrl } from '../../utils/utils';
import { getWikiImage } from '../../utils/api';
import { dayMonthDate } from '../../utils/dateFormat';

import "./NextRace.css";

export const NextRace = ({nextRace}) => {
    const [raceImageUrl, setRaceImageUrl] = useState(null)
    const race = nextRace.Races[0];
    const raceName = race.raceName;
    const circuitName = race['Circuit']['circuitName'];
    const dateTime = moment.utc(`${race.date} ${race.time}`, null).tz('America/New_York')
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
                <Row>
                    <Col sm="12" md="4" lg="3">
                    <div className="nextRaceInfo">
                        <span className="upNext">Round {nextRace.round}-up next</span>
                        <span>{dateTime.format(dayMonthDate)}</span>
                    </div>
                    </Col>
                    <Col sm="12" md="8" lg="6">
                        <div className="nextRaceHeaderInfo">
                            <div className="nextRaceInfo">
                                <span className="raceName">{raceName}</span>
                                <span>{circuitName}</span>
                            </div>
                        </div>
                    </Col>
                    <Col sm="12" md="8" lg="3">
                        {raceImageUrl && <img src={raceImageUrl} alt={race.url} height="200px"/>}
                    </Col>
                </Row>
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
