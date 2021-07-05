import React from 'react'
import Datetime from 'react-datetime';
import moment from 'moment';
import { Container, Button} from 'semantic-ui-react'

import { currentYear } from '../../utils/constants';

const YearPicker = ({selectedYear, setSelectedYear}) => {
    const valid = ( current ) => {
        var yesterday = moment().subtract( 1, 'day' );
        return !current.isAfter( yesterday );
    };
    return (
        <Container>
            <Datetime 
                dateFormat="YYYY" 
                timeFormat={false}
                value={`${selectedYear}`}
                onChange={(date) => {setSelectedYear(`${date.year()}`)}}
                input={false}
                isValidDate={ valid }
            />
            {selectedYear !== `${currentYear}` && <Button onClick={() => setSelectedYear(`${currentYear}`)}>Set to current year</Button>}
        </Container>
    )
}

export default YearPicker
