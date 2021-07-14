import React from 'react'
import DriverCard from '../DriverCard'
import {Row, Col} from 'shards-react'
import {map} from 'lodash';

import "./styles.css"
const DriverTable = ({drivers}) => {
    return (
        <Row>
            {
                map(drivers, (driver, index) => (
                    <Col sm="12" md="6" lg={index > 2 ? "3":"4"}>
                        <DriverCard driverInfo={driver}/>
                    </Col>
                ))
            }
        </Row>
    )
}

export default DriverTable
