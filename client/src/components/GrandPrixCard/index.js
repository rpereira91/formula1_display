import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button
  } from "shards-react";
  import moment from 'moment'

const GrandPrixCard = ({raceInfo}) => {
    const raceStart = moment(raceInfo['date']).subtract(2, 'day');
    const raceEnd = moment(raceInfo['date']);
    const getMonths = () => {
        if (raceEnd.month() !== raceStart.month()) {
            return (<span>{`${raceEnd.format("MMM")} - ${raceStart.format("MMM")}`}</span>)
        }
        return (<span>{raceEnd.format("MMM")}</span>)
    }
    console.log(raceInfo)
    return (
        <Card style={{ maxWidth: "300px" }}>
            <CardHeader>
                <span>{`${raceStart.format("DD")} - ${raceEnd.format("DD")}`}</span>
                <span>{getMonths()}</span>
            </CardHeader>
            <CardBody>
                <span>{raceInfo['Circuit']['Location']['country']}</span>
                <span>{raceInfo['Circuit']['circuitName']} </span>
            </CardBody>
        </Card>
    )
}

export default GrandPrixCard
