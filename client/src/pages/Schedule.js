import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import RaceRow from '../components/RaceRow/index';
import YearPicker from '../components/YearPicker';
import {setSchedule} from '../redux/actions';
import {currentYear} from '../utils/constants';
import { Loader} from 'semantic-ui-react';
import {Container, Row, Col} from 'shards-react'
import './PagesStyle.css'
const Schedule = ({schedule, setSchedule}) => {
    const [selectedYear, setSelectedYear] = useState(`${currentYear}`)
    const [showYearSelect, setShowYearSelect] = useState(false)
    const [loadingSchedule, setLoadingSchedule] = useState(true)
    useEffect(() => {
        setSchedule(selectedYear, () => setLoadingSchedule(false))
    }, [selectedYear])
    return (
        <Container className="pageContainer" fluid>
            { !loadingSchedule ? (
                <Container fluid>
                    <Row>
                        <span className="title" onClick={() => setShowYearSelect(!showYearSelect)}>Schedule</span>
                        {showYearSelect && <YearPicker selectedYear={selectedYear} setSelectedYear={setSelectedYear} />}
                        
                    </Row>
                    <Row>
                        <span>Season: {selectedYear}</span>
                    </Row>
                    <Row>
                        {
                            schedule['Races'].map((raceInfo, index) => (
                                <Col sm="12" lg="12">
                                    <RaceRow raceInfo={raceInfo} key={`race-${index}`}/>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            ) : <Loader content='Loading races...'/>
            }
        </Container>
    )
}
const mapStateToProps = ({schedule}) => ({schedule});
export default connect(mapStateToProps, {setSchedule})(Schedule);
