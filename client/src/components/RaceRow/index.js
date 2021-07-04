import React, {useState} from 'react'
import { List } from 'semantic-ui-react'
import RaceInfo from '../RaceInfo'

import './RaceRow.css'
const RaceRow = ({raceInfo}) => {
    const [showRaceInfo, setShowRaceInfo] = useState(false)
    const rowInfo = () => {
        setShowRaceInfo(!showRaceInfo)
    }
    const currentDate = new Date();
    const currentIcon = new Date(raceInfo['date']) < currentDate ? "check circle" : "circle outline"
    console.log(raceInfo)
    return (
        <List.Item onClick={() => rowInfo()}>
            <List.Icon name={currentIcon} className="icon"/>
            <List.Content>
                <List.Header>{raceInfo['raceName']}</List.Header>
                <List.Description>
                    Date: {raceInfo['date']}
                    {
                        showRaceInfo && (
                            <RaceInfo season={raceInfo['season']} round={ raceInfo['round']} url={raceInfo['url']}/>
                        )
                    }
                </List.Description>
            </List.Content>
        </List.Item>
    )
}


export default RaceRow
