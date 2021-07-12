import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';


import YearPicker from '../components/YearPicker';
import DriverTable from '../components/DriverTable';
import {setDrivers} from '../redux/actions';
import {Container} from 'shards-react'

import { currentYear } from '../utils/constants';
import "./PagesStyle.css";

const Drivers = ({drivers, setDrivers}) => {
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [showYearSelect, setShowYearSelect] = useState(false)
    const [loadingDrivers, setLoadingDrivers] = useState(true)
    console.log(drivers)
    useEffect(() => {
        setDrivers(selectedYear, () => setLoadingDrivers(false))
    }, [selectedYear])
    return (
        <Container className="pageContainer" fluid>
            <h1 onClick={() => setShowYearSelect(!showYearSelect)}>Drivers</h1>
            {showYearSelect && <YearPicker selectedYear={selectedYear} setSelectedYear={setSelectedYear} />}
            {
                !loadingDrivers && (
                    <DriverTable drivers={drivers}/>
                )
            }
        </Container>
    )
}
const mapStateToProps = ({drivers}) => ({drivers});
export default connect(mapStateToProps, {setDrivers})(Drivers);