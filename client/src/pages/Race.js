import React, {useEffect, useState} from 'react'
import {getLastRace, getResults, getQualifying} from '../utils/api';
import {Row, Container, Col, Button} from 'shards-react'

import "./PagesStyle.css"
const Race = ({match}) => {
    const [results, setResults] = useState([]);
    const [qualifying, setQualifying] = useState([])
    const {params: {round, season}} = match;
    var currentRound = round;
    var currentSeason = season;

        useEffect(() => {
        if (!round || !season) {
            // get the last race and fill the info
            getLastRace()
                .then((data) => {
                    currentRound = data.round;
                    currentSeason = data.season;
                })
                .then(() => {
                    getQualifying(currentSeason, currentRound)
                    .then((qualifying) => {
                        setQualifying(qualifying.Races[0]['QualifyingResults'])
                    })
                    getResults(currentSeason, currentRound)
                        .then((results) => setResults(results.Races[0]['Results']))
                })
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
                <span className="subTitle">Qualifying</span>
                <table>
                    <col />
                    <colgroup span="1"></colgroup>
                    <colgroup span="1"></colgroup>
                    <colgroup span="3"></colgroup>
                    <tr>
                        <th colspan="1" scope="colgroup">Pos.</th>
                        <th colspan="1" scope="colgroup">Driver</th>
                        <th colspan="3" scope="colgroup">Times</th>
                    </tr>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">Q1</th>
                        <th scope="col">Q2</th>
                        <th scope="col">Q3</th>
                    </tr>
                    {
                        qualifying.map((race, index) => {
                            return (
                                <tr>
                                    <td>
                                        {race['position']}
                                    </td>
                                    <td>
                                        <div className="raceTableName">
                                            <span>{race['Driver']['givenName'][0]}. {race['Driver']['familyName']}</span>
                                            <span># {race['number']} {race['Constructor']['name']}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {race['Q1'] && race['Q1']}
                                    </td>
                                    <td>
                                        {race['Q2'] && race['Q2']}
                                    </td>
                                    <td>
                                        {race['Q3'] && race['Q3']}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </table>
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
