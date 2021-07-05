import React, {useState, useEffect} from 'react';
import RaceRow from '../components/RaceRow/index';
import YearPicker from '../components/YearPicker';
import { getYearSchedule } from '../utils/api';
import {currentYear} from '../utils/constants';
import { Container, List, Loader, Button} from 'semantic-ui-react'
import './PagesStyle.css'
const Schedule = () => {
    const [currentSchedule, setCurrentSchedule] = useState(null)
    const [selectedYear, setSelectedYear] = useState(`${currentYear}`)
    const [showYearSelect, setShowYearSelect] = useState(false)
    useEffect(() => {
        getYearSchedule(selectedYear)
            .then((currentSchedule) => {
                setCurrentSchedule(currentSchedule)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [selectedYear])
    return (
        <Container className="pageContainer">
            { currentSchedule ? (
                <div>
                    <h1 onClick={() => setShowYearSelect(!showYearSelect)}>Schedule</h1>
                    {showYearSelect && <YearPicker selectedYear={selectedYear} setSelectedYear={setSelectedYear} />}
                    <h2>Current Season: {selectedYear}</h2>
                    <div>
                        {
                            currentSchedule['Races'].map((raceInfo, index) => (
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

export default Schedule
