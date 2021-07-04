import moment from 'moment-timezone'
import React, {useEffect, useState} from 'react'
import { getYearDrivers } from '../utils/api'

const Drivers = () => {
    const [drivers, setDrivers] = useState(null)
    useEffect(() => {
        getYearDrivers(2021)
            .then((drivers) => setDrivers(drivers))
    }, [])
    console.log(drivers)
    return (
        <div>
            <h1>Drivers</h1>
            {
                drivers && (
                    <div>
                        {
                            drivers.Drivers.map((driver) => {
                                var date1 = moment();
                                var date2 = moment(driver.dateOfBirth);
                                var diff = date1.diff(date2, 'years');
                                return (
                                    <div key={driver.driverId}> 
                                        <span>{driver.givenName} {driver.familyName}</span> 
                                        <br></br>
                                        <span>Number: {driver.permanentNumber} Age:{diff}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Drivers
