import React from 'react'
import DriverCard from '../DriverCard'
import {Row, Col} from 'shards-react'

import "./styles.css"
const DriverTable = ({drivers}) => {
    return (
        <Row>
            {
                drivers.map((driver) => (
                    <Col sm="12" md="6" lg="3">
                        <DriverCard driverInfo={driver}/>
                    </Col>
                ))
            }
        </Row>
    )
}

export default DriverTable
