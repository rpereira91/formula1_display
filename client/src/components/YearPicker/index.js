import React from 'react'
import Datetime from 'react-datetime';
import moment from 'moment';
import { toString } from 'lodash'
import { Container, Button, Row, Col} from 'shards-react'
import { currentYear, onCurrentYear } from '../../utils/constants';

import "./styles.css"

const YearPicker = ({selectedYear, setSelectedYear}) => {
    const valid = ( current ) => {
        var yesterday = moment().subtract( 1, 'day' );
        return !current.isAfter( yesterday );
    };
    return (
        <Container fluid className="pickerContainer">
            <Row>
                <Col sm="12" md="4" lg="3">
                    {!onCurrentYear(selectedYear) && <Button theme="primary" size="sm"  onClick={() => setSelectedYear(`${currentYear}`)}>Set to current year</Button>}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Datetime 
                        dateFormat="YYYY" 
                        timeFormat={false}
                        value={`${selectedYear}`}
                        onChange={(date) => {setSelectedYear(toString(date.year()))}}
                        input={false}
                        isValidDate={ valid }
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default YearPicker
