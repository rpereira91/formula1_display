import React from 'react'
import {Button } from "shards-react";
import BoldDisplay from '../atoms/BoldDisplay';
import Divider from '../atoms/Divider';
import moment from 'moment'
import { Link } from 'react-router-dom'
import {get} from 'lodash';
import "./styles.css";


const GrandPrixCard = ({raceInfo}) => {
    const raceStart = moment(raceInfo['date']).subtract(2, 'day');
    const raceEnd = moment(raceInfo['date']);
    const raceRound = get(raceInfo, 'round', null)
    const url = raceInfo['url'] || ''
    const getMonths = () => {
        if (raceEnd.month() !== raceStart.month()) {
            return (<span>{`${raceEnd.format("MMM").toUpperCase()} - ${raceStart.format("MMM").toUpperCase()}`}</span>)
        }
        return (<span>{raceEnd.format("MMM")}</span>)
    }
    return (
        <div className="infoCard">
            <span className="roundInfo">Round {raceRound}</span>
            <div className="driverHeader">
                <BoldDisplay 
                    upper={`${raceStart.format("DD")} - ${raceEnd.format("DD")}`}
                    bolded={getMonths()}
                />
            </div>

            <Divider/>
            <div className="infoContainer">
                <span className="boldLarge"><Link className="raceInfoLink" to={`/race/${raceRound}/${raceInfo['season']}`}>{get(raceInfo, '[Circuit][Location][country]', '')}</Link></span>
                <span>{raceInfo['Circuit']['circuitName']} </span>
            </div>
            <Divider/>
            <div className="footerButtons">
                <Button outline theme="success" onClick={() => window.open(url, "_blank")}>Wiki</Button>
            </div>
        </div>
    )
}

export default GrandPrixCard
