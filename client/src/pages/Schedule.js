import React, {useState, useEffect} from 'react';
import RaceRow from '../components/RaceRow/index';
import { getCurrentSchedule, getYearSchedule } from '../utils/api';
import {currentYear} from '../utils/constants';
import { Container, List, Loader, Button} from 'semantic-ui-react'
import Datetime from 'react-datetime';
import moment from 'moment';

const Schedule = () => {
    const [currentSchedule, setCurrentSchedule] = useState(null)
    const [selectedYear, setSelectedYear] = useState(`${currentYear}`)
    const [showYearSelect, setShowYearSelect] = useState(false)
    var yesterday = moment().subtract( 1, 'day' );
    var valid = function( current ){
        return !current.isAfter( yesterday );
    };
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
        <Container>
            { currentSchedule ? (
                <div>
                    <h1 onClick={() => setShowYearSelect(!showYearSelect)}>Schedule</h1>
                    {showYearSelect && <Datetime 
                        dateFormat="YYYY" 
                        timeFormat={false}
                        value={selectedYear}
                        onChange={(date) => {setSelectedYear(`${date.year()}`)}}
                        input={false}
                        isValidDate={ valid }
                    />}
                    <h2>Current Season: {selectedYear}</h2>
                    {selectedYear !== `${currentYear}` && <Button onClick={() => setSelectedYear(currentYear)}>Set to current year</Button>}
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
