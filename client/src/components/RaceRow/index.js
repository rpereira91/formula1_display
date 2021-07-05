import React, {useState} from 'react'
import { Icon } from 'semantic-ui-react'
import RaceInfo from '../RaceInfo'

import './RaceRow.css'
const RaceRow = ({raceInfo}) => {
    const [showRaceInfo, setShowRaceInfo] = useState(false)
    const rowInfo = () => {
        setShowRaceInfo(!showRaceInfo)
    }
    const currentDate = new Date();
    const currentIcon = new Date(raceInfo['date']) > currentDate 
    return (
        <div className="listRow">
            <div className="listContent">
                
                <h2 onClick={() => rowInfo()}> <Icon name={"flag checkered"} className={currentIcon ? "icon disabled" : "icon enabled"}/> {raceInfo['raceName']}</h2>
                <div className="listBody">
                    <div className="raceDetails">
                        <span>Circut: {raceInfo['Circuit']['circuitName']} </span>
                        <span>Country: {raceInfo['Circuit']['Location']['country']}</span>
                        <span>Date: {raceInfo['date']}</span>   
                    </div>
                    {
                        showRaceInfo && (
                            <>
                                <RaceInfo season={raceInfo['season']} round={ raceInfo['round']} url={raceInfo['url']} />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


export default RaceRow
