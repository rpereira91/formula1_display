import React, {useEffect, useCallback, useState} from 'react';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";
import Qualifying from '../components/RaceTables/Qualifying'
import Results from '../components/RaceTables/Results'
import { getWikiUrl } from '../utils/utils';
import { getWikiImage } from '../utils/api';

import {setRace} from '../redux/actions';
import {Row, Container, Col} from 'shards-react';

import "./PagesStyle.css"
const Race = ({match, setRace, races}) => {
    const {params: {round, season}} = match;
    let history = useHistory();
    const [raceImageUrl, setRaceImageUrl] = useState(null)
    const setRaceCallback = useCallback(
        () => {
            setRace(season, round, (round, season) =>  history.push(`/race/${round}/${season}`))
        },
        [setRace, history, round, season],
    )
    useEffect(() => {
        const search = getWikiUrl(races.url)
        getWikiImage(search)
            .then((pages) => {
                var key = Object.keys(pages)[0]
                setRaceImageUrl(pages[key].original.source)
            })
            .catch((e) => console.log(e))
    }, [races.url]);
    useEffect(() => {
        setRaceCallback()
    }, [setRaceCallback])
    return (
        <Container className="pageContainer" fluid>
            <span className="title">Race #{round} of the {season} season</span>
            {raceImageUrl && <img src={raceImageUrl} alt={races.url} height="200px"/>}
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