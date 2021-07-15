import React, {useEffect, useCallback, useState} from 'react';
import {connect} from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import Qualifying from '../components/RaceTables/Qualifying'
import Results from '../components/RaceTables/Results';
import Loading from '../components/Loading'
import { getWikiUrl } from '../utils/utils';
import { getWikiImage } from '../utils/api';
import { PATHS } from '../utils/constants';
import {isNil} from 'lodash';
import {setRace} from '../redux/actions';
import {Row, Container, Col} from 'shards-react';

import "./PagesStyle.css"
const Race = ({match, setRace, races}) => {
    const {params: {round, season}} = match;
    let history = useHistory();
    const [raceImageUrl, setRaceImageUrl] = useState(null)
    const [loadingRace, setLoadingRace] = useState(true)
    const setRaceCallback = useCallback(
        () => {
            setRace(
                season, 
                round, 
                (round, season) =>  history.push(`/race/${round}/${season}`),
                () => setLoadingRace(false),
            )
        },
        [setRace, history, round, season],
    )
    useEffect(() => {
        if (!isNil(races.url)){
            const search = getWikiUrl(races.url)
            getWikiImage(search)
                .then((pages) => {
                    var key = Object.keys(pages)[0]
                    setRaceImageUrl(pages[key].original.source)
                })
                .catch((e) => console.log(e))
        }
    }, [races.url]);
    useEffect(() => {
        setRaceCallback()
    }, [setRaceCallback])
    const getRaceBody = () => {
        if (!isNil(races.raceName)) {
            return (
                <>
                    <div className="raceHeader">
                        <span className="subTitle">{races.raceName} at {races.circuit.circuitName} in {races.circuit.Location.country}</span>
                        {raceImageUrl && <img src={raceImageUrl} alt={races.url} height="200px"/>}
                    </div>
                    <Row>
                        <Col sm="12" lg="6" className="raceTableCol">
                            <Qualifying qualifying={races.qualifying} />
                        </Col>
                        <Col sm="12" lg="6">
                            <Results results={races.results} />
                        </Col>
                    </Row>
                </>
            )
        } else {
            return (
                <div className="raceHeader">
                    <span className="subTitle">Race hasn't taken place yet</span>
                    <span className="subTitle">Check the <Link to={PATHS.SCHEDULE.route}>schedule</Link> for all the races. </span>
                </div>
            )
        }
    }
    return (
        <Container className="pageContainer" fluid>
            <span className="title">Race #{round} of the {season} season</span>
            {!loadingRace ? getRaceBody(): <Loading />}
        </Container>
    )
}

const mapStateToProps = ({races}) => ({races});
export default connect(mapStateToProps, {setRace})(Race);