import React, {useState, useEffect} from 'react';
import RaceRow from '../components/RaceRow/index';
import { getCurrentSchedule } from '../utils/api';
import { Container, List, Loader } from 'semantic-ui-react'

const Schedule = () => {
    const [currentSchedule, setCurrentSchedule] = useState(null)
    useEffect(() => {
        getCurrentSchedule()
            .then((currentSchedule) => setCurrentSchedule(currentSchedule))
    }, [])
    return (
        <Container>
            { currentSchedule ? (
                <div>
                    <h1>Schedule</h1>
                    <h2>Current Season: {currentSchedule['season']}</h2>
                    <List divided animated verticalAlign='middle'>
                        {
                            currentSchedule['Races'].map((raceInfo, index) => (
                                <RaceRow raceInfo={raceInfo} key={`race-${index}`}/>
                            ))
                        }
                    </List>
                </div>
            ) : <Loader content='Loading races...'/>
            }
        </Container>
    )
}

export default Schedule
