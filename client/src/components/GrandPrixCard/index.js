import React from 'react'
import {Button } from "shards-react";
import moment from 'moment'
import "./styles.css";
const GrandPrixCard = ({raceInfo}) => {
    const raceStart = moment(raceInfo['date']).subtract(2, 'day');
    const raceEnd = moment(raceInfo['date']);
    const raceRound = raceInfo['round']
    const url = raceInfo['url'] || ''
    const getMonths = () => {
        if (raceEnd.month() !== raceStart.month()) {
            return (<span>{`${raceEnd.format("MMM")} - ${raceStart.format("MMM")}`}</span>)
        }
        return (<span>{raceEnd.format("MMM")}</span>)
    }
    return (
        <div className="infoCard">
            <span className="roundInfo">Round {raceRound}</span>
            <div className="dateContainer">
                <span className="boldLarge">{`${raceStart.format("DD")} - ${raceEnd.format("DD")}`}</span>
                <span>{getMonths()}</span>
            </div>
            <div className="solid"/>
            <div className="infoContainer">
                <span className="boldLarge">{raceInfo['Circuit']['Location']['country']}</span>
                <span>{raceInfo['Circuit']['circuitName']} </span>
            </div>
            <div className="solid"/>
            <div className="footerButtons">
                <Button outline theme="success" onClick={() => window.open(url, "_blank")}>Wiki</Button>
                <Button outline theme="light" >Race Info</Button>
            </div >
        </div>
    )
}

export default GrandPrixCard
