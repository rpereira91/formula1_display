import React, {useState, useEffect, useRef, useCallback} from 'react';
import {connect} from 'react-redux';
import {NextRace, NextRaceHeader} from '../components/NextRace';
import GrandPrixCard from '../components/GrandPrixCard';
import YearPicker from '../components/YearPicker';
import Loading from '../components/Loading';

import {setSchedule} from '../redux/actions';
import {currentYear, onCurrentYear} from '../utils/constants';
import {getWikiImage} from '../utils/api';
import {Container, Row, Col} from 'shards-react'
import './PagesStyle.css'
const Schedule = ({schedule, setSchedule, nextRace}) => {
    const [selectedYear, setSelectedYear] = useState(`${currentYear}`);
    const [showYearSelect, setShowYearSelect] = useState(false);
    const [loadingSchedule, setLoadingSchedule] = useState(true);
    // use call back to get a memoized set schedule to be used whenever the selected year gets updated
    const setScheduleCallback = useCallback(
        () => {
            setSchedule(selectedYear, () => setLoadingSchedule(false))
        },
        [selectedYear, setSchedule],
    )
    const nextRaceRef = useRef(null);
    useEffect(() => {
        getWikiImage("2021_Emilia_Romagna_Grand_Prix")
            .then((pages) => {
                Object.keys(pages).map((page) => console.log(pages[page].original.source))
            })
        setScheduleCallback()
    }, [setScheduleCallback])
    const executeScroll = () => nextRaceRef.current.scrollIntoView()
    return (
        <Container className="pageContainer" fluid>
            { !loadingSchedule ? (
                <Container fluid>
                    <Row className="rowHeader">
                        <span className="title" onClick={() => setShowYearSelect(!showYearSelect)}>Schedule</span>
                        {showYearSelect && <YearPicker selectedYear={selectedYear} setSelectedYear={setSelectedYear} />}
                        {onCurrentYear(selectedYear) && <NextRaceHeader onClick={executeScroll} round={nextRace.round} raceName={nextRace.Races ? nextRace.Races[0].raceName : ''} season={nextRace.season}/>}
                        
                    </Row>
                    <Row>
                        <span>Season: {selectedYear}</span>
                    </Row>
                    <Row>
                        {
                            schedule['Races'].map((raceInfo, index) => {
                                const currentRound = raceInfo['round']
                                const nextRound = nextRace['round']
                                if (currentRound === nextRound && onCurrentYear(selectedYear)) {
                                    return (
                                        <Col sm="12" md="12" lg="12" >
                                            <div ref={nextRaceRef}>
                                                <NextRace nextRace={nextRace}/>
                                            </div>
                                        </Col>
                                    )
                                }
                                return (
                                    <Col sm="12" md="6" lg="3">
                                        <GrandPrixCard nextRace={nextRace} raceInfo={raceInfo} key={`race-${index}`}/>
                                    </Col>
                                )
                        })
                        }
                    </Row>
                </Container>
            ) : <Loading content='Loading races...'/>
            }
        </Container>
    )
}

const mapStateToProps = ({schedule, nextRace}) => ({schedule, nextRace});
export default connect(mapStateToProps, {setSchedule})(Schedule);
