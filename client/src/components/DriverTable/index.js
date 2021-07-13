import React from 'react'
import DriverCard from '../DriverCard'
import {Row, Col} from 'shards-react'

import "./styles.css"
const DriverTable = ({drivers}) => {
    return (
        <Row>
            {
                drivers.map((driver, index) => (
                    <Col sm="12" md="6" lg={index > 2 ? "3":"4"}>
                        <DriverCard driverInfo={driver}/>
                    </Col>
                ))
            }
        </Row>
    )
}

export default DriverTable
