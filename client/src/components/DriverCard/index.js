import React from 'react'
import "../GrandPrixCard/styles.css"
const DriverCard = ({driverInfo}) => {
    return (
        <div className="infoCard">
            <span>{driverInfo.givenName}</span>
        </div>
    )
}

export default DriverCard
