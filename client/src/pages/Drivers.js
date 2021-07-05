import moment from 'moment-timezone'
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import YearPicker from '../components/YearPicker';
import {setDrivers} from '../redux/actions';
import {Table, Flag, Container, Popup} from 'semantic-ui-react'
import {getCountryCode} from '../utils/utils';
import { currentYear } from '../utils/constants';
import "./PagesStyle.css";

const Drivers = ({drivers, setDrivers}) => {
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [showYearSelect, setShowYearSelect] = useState(false)
    const [loadingDrivers, setLoadingDrivers] = useState(true)

    useEffect(() => {
        setDrivers(selectedYear, () => setLoadingDrivers(false))
    }, [selectedYear])
    return (
        <Container className="pageContainer">
            <h1 onClick={() => setShowYearSelect(!showYearSelect)}>Drivers</h1>
            {showYearSelect && <YearPicker selectedYear={selectedYear} setSelectedYear={setSelectedYear} />}
            {
                !loadingDrivers && (
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
                                            <Table.Cell><Popup basic content={driver.nationality} trigger={<Flag name={getCountryCode(driver.nationality)} />} /></Table.Cell>
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
        </Container>
    )
}
const mapStateToProps = ({drivers}) => ({drivers});
export default connect(mapStateToProps, {setDrivers})(Drivers);