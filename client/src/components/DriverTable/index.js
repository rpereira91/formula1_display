import React from 'react'
import Flag from 'react-world-flags'
import moment from 'moment-timezone'
import {getCountryCode} from '../../utils/utils';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import "./styles.css"
const DriverTable = ({drivers}) => {
    return (
            <div className="tableBody">
                <Table>
                    <Thead>
                        <Tr className="headerRow">
                            <Th>#</Th>
                            <Th>Nat.</Th>
                            <Th>First Name</Th>
                            <Th>Last name</Th>
                            <Th>Age</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            drivers.Drivers.map((driver) => {
                                var date1 = moment();
                                var date2 = moment(driver.dateOfBirth);
                                var age = date1.diff(date2, 'years');
                                return (
                                    <Tr key={driver.driverId}>
                                        <Td>{driver.permanentNumber}</Td>
                                        <Td>
                                            <Flag 
                                                code={getCountryCode(driver.nationality)}
                                                height="16"
                                                fallback={driver.nationality}
                                            />
                                        </Td>
                                        <Td>{driver.givenName}</Td>
                                        <Td>{driver.familyName}</Td>
                                        <Td>{age}</Td>
                                    </Tr>

                                )
                            })
                        }
                    </Tbody>
                </Table>
            </div>
    )
}

export default DriverTable
