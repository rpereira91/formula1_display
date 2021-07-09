import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {NextRace, NextRaceHeader} from '../components/NextRace';
import GrandPrixCard from '../components/GrandPrixCard';
import YearPicker from '../components/YearPicker';
import {setSchedule} from '../redux/actions';
import {currentYear, onCurrentYear} from '../utils/constants';
import { Loader} from 'semantic-ui-react';
import {Container, Row, Col} from 'shards-react'
import './PagesStyle.css'
const Schedule = ({schedule, setSchedule, nextRace}) => {
    const [selectedYear, setSelectedYear] = useState(`${currentYear}`);
    const [showYearSelect, setShowYearSelect] = useState(false);
    const [loadingSchedule, setLoadingSchedule] = useState(true);
    const nextRaceRef = useRef(null);
    useEffect(() => {
        setSchedule(selectedYear, () => setLoadingSchedule(false))
    }, [selectedYear])
    const executeScroll = () => nextRaceRef.current.scrollIntoView()
    return (
        <Container className="pageContainer" fluid>
            { !loadingSchedule ? (
                <Container fluid>
                    <Row>
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
            ) : <Loader content='Loading races...'/>
            }
        </Container>
    )
}

const mapStateToProps = ({schedule, nextRace}) => ({schedule, nextRace});
export default connect(mapStateToProps, {setSchedule})(Schedule);
