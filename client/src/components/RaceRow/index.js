import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
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
                
                <span className="raceTitle" onClick={() => rowInfo()}> <FontAwesomeIcon icon={faFlagCheckered} className={currentIcon ? "icon disabled" : "icon enabled"}/> {raceInfo['raceName']}</span>
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
