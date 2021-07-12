import React, {useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";
import Qualifying from '../components/RaceTables/Qualifying'
import Results from '../components/RaceTables/Results'
import {setRace} from '../redux/actions';
import {Row, Container, Col} from 'shards-react';

import "./PagesStyle.css"
const Race = ({match, setRace, races}) => {
    const {params: {round, season}} = match;
    let history = useHistory();
    const setRaceCallback = useCallback(
        () => {
            setRace(season, round, (round, season) =>  history.push(`/race/${round}/${season}`))
        },
        [setRace, history, round, season],
    )
    useEffect(() => {
        setRaceCallback()
    }, [setRaceCallback])
    return (
        <Container className="pageContainer" fluid>
            <span className="title">Race #{round} of the {season} season</span>
            <Row>
                <Col sm="12" lg="6" className="raceTableCol">
                    <Qualifying qualifying={races.qualifying} />
                </Col>
                <Col sm="12" lg="6">
                    <Results results={races.results} />
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = ({races}) => ({races});
export default connect(mapStateToProps, {setRace})(Race);