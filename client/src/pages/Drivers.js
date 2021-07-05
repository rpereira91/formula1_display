import moment from 'moment-timezone'
import React, {useEffect, useState} from 'react'
import { getYearDrivers } from '../utils/api'
import {Table, Flag} from 'semantic-ui-react'
import {getCountryCode} from '../utils/utils';

const Drivers = () => {
    const [drivers, setDrivers] = useState(null)
    useEffect(() => {
        getYearDrivers(2021)
            .then((drivers) => setDrivers(drivers))
    }, [])
    return (
        <div>
            <h1>Drivers</h1>
            {
                drivers && (
                    <div>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>#</Table.HeaderCell>
                                    <Table.HeaderCell>Nat.</Table.HeaderCell>
                                    <Table.HeaderCell>First Name</Table.HeaderCell>
                                    <Table.HeaderCell>Last name</Table.HeaderCell>
                                    <Table.HeaderCell>Age</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {
                                drivers.Drivers.map((driver) => {
                                    var date1 = moment();
                                    var date2 = moment(driver.dateOfBirth);
                                    var age = date1.diff(date2, 'years');
                                    return (
                                        <Table.Row key={driver.driverId}>
                                            <Table.Cell>{driver.permanentNumber}</Table.Cell>
                                            <Table.Cell><Flag name={getCountryCode(driver.nationality)} /></Table.Cell>
                                            <Table.Cell>{driver.givenName}</Table.Cell>
                                            <Table.Cell>{driver.familyName}</Table.Cell>
                                            <Table.Cell>{age}</Table.Cell>
                                        </Table.Row>

                                    )
                                })
                            }
                        </Table>
                    </div>
                )
            }
        </div>
    )
}

export default Drivers
