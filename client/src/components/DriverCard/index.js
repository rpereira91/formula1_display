import React from 'react'
import "../GrandPrixCard/styles.css";
import {getCountryCode} from '../../utils/utils';
import Flag from 'react-world-flags'

const DriverCard = ({driverInfo}) => {
    const constructor = driverInfo.Constructors[0]
    return (
        <div className="infoCard">
            <span>{driverInfo.position} <span>{driverInfo.points} PTS</span> {driverInfo.wins} wins</span>
            <span>{driverInfo.Driver.givenName} {driverInfo.Driver.familyName} {driverInfo.Driver.permanentNumber} </span>
            <Flag 
                code={getCountryCode(driverInfo.Driver.nationality)}
                height="16"
                fallback={driverInfo.Driver.nationality}
            />
            <span>{constructor.name}</span>
        </div>
    )
}

export default DriverCard
