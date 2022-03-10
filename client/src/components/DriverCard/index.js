import React from 'react'
import BoldDisplay from '../atoms/BoldDisplay';
import Divider from '../atoms/Divider';
import "../GrandPrixCard/styles.css";
import {getCountryCode} from '../../utils/utils';
import Flag from 'react-world-flags'

const DriverCard = ({driverInfo}) => {
    const constructor = driverInfo.Constructors[0]
    return (
        <div className="infoCard">
            <span className="driverHeader">
                <BoldDisplay 
                    upper={driverInfo.position}
                />
                <div>
                    <BoldDisplay 
                        upper={driverInfo.points}
                        bolded="PTS"
                    />
                    {
                        driverInfo.wins > 0 && (
                            <BoldDisplay
                                upper={driverInfo.wins}
                                bolded="WINS"
                            />
                        )
                    }
                </div>
            </span>
            <Divider />
            <div  className="driverHeader">
                <span className="boldLarge">#{driverInfo.Driver.permanentNumber} {driverInfo.Driver.givenName} {driverInfo.Driver.familyName}  </span>
                <Flag 
                    code={getCountryCode(driverInfo.Driver.nationality)}
                    height="25"
                    fallback={driverInfo.Driver.nationality}
                />
            </div>
            <Divider />
            {
                constructor && (
                    <span className="constructorName">{constructor.name}</span>
                )
            }
        </div>
    )
}

export default DriverCard
