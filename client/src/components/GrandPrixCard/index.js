import React from 'react'
import {Button } from "shards-react";
import BoldDisplay from '../atoms/BoldDisplay';
import Divider from '../atoms/Divider';
import moment from 'moment'
import "./styles.css";
import { Link } from 'react-router-dom'

const GrandPrixCard = ({raceInfo}) => {
    const raceStart = moment(raceInfo['date']).subtract(2, 'day');
    const raceEnd = moment(raceInfo['date']);
    const raceRound = raceInfo['round']
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
                <span className="boldLarge">{raceInfo['Circuit']['Location']['country']}</span>
                <span>{raceInfo['Circuit']['circuitName']} </span>
            </div>
            <Divider/>
            <div className="footerButtons">
                <Button outline theme="success" onClick={() => window.open(url, "_blank")}>Wiki</Button>
                <Button outline theme="light" tag={Link} to={`/race/${raceRound}/${raceInfo['season']}`}>Race Info</Button>
            </div >
        </div>
    )
}

export default GrandPrixCard
