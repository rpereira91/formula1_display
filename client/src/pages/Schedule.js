import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import RaceRow from '../components/RaceRow/index';
import YearPicker from '../components/YearPicker';
import {setSchedule} from '../redux/actions';
import {currentYear} from '../utils/constants';
import { Container, Loader} from 'semantic-ui-react'
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
                <div>
                    <h1 onClick={() => setShowYearSelect(!showYearSelect)}>Schedule</h1>
                    {showYearSelect && <YearPicker selectedYear={selectedYear} setSelectedYear={setSelectedYear} />}
                    <h2>Current Season: {selectedYear}</h2>
                    <div>
                        {
                            schedule['Races'].map((raceInfo, index) => (
                                <RaceRow raceInfo={raceInfo} key={`race-${index}`}/>
                            ))
                        }
                    </div>
                </div>
            ) : <Loader content='Loading races...'/>
            }
        </Container>
    )
}
const mapStateToProps = ({schedule}) => ({schedule});
export default connect(mapStateToProps, {setSchedule})(Schedule);
