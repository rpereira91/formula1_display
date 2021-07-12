import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import Qualifying from '../components/RaceTables/Qualifying'
import Results from '../components/RaceTables/Results'
import {getLastRace, getResults, getQualifying} from '../utils/api';
import {Row, Container, Col} from 'shards-react';

import "./PagesStyle.css"
const Race = ({match}) => {
    const [results, setResults] = useState([]);
    const [qualifying, setQualifying] = useState([])
    const {params: {round, season}} = match;
    let history = useHistory();
    var currentRound = round;
    var currentSeason = season;

    useEffect(() => {
    if (!round || !season) {
        // get the last race and fill the info
        getLastRace()
            .then((data) => {
                history.push(`/race/${data.round}/${data.season}`)
            });
    } else {
        getQualifying(currentSeason, currentRound)
        .then((qualifying) => {
            setQualifying(qualifying.Races[0]['QualifyingResults'])
        })
        getResults(currentSeason, currentRound)
            .then((results) => setResults(results.Races[0]['Results']))

        }
    }, [])
    return (
        <Container className="pageContainer" fluid>
            <span className="title">Race #{currentRound} of the {currentSeason} season</span>
            <Row>
                <Col sm="12" lg="6" className="raceTableCol">
                    <Qualifying qualifying={qualifying} />
                </Col>
                <Col sm="12" lg="6">
                    <span className="subTitle">Results</span>
                    {results.length > 0 && (
                        <table>
                            <tr>
                                <th>Position</th>
                                <th>Driver</th>
                                <th>Time</th>
                                <th>Points</th>
                            </tr>
                            {
                                results.map((race) => (
                                    <tr>
                                        <td>{race['position']}</td>
                                        <td>
                                        <div className="raceTableName">
                                            <span>{race['Driver']['givenName'][0]}. {race['Driver']['familyName']}</span>
                                            <span># {race['number']} {race['Constructor']['name']}</span>
                                        </div>
                                        </td>
                                        <td>{race['Time'] ? race['Time']['time'] : race['status']}</td>
                                        <td>{race['points'] && race['points']}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default Race
