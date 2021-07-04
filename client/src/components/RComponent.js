import React from 'react'
import { getQualifying } from '../utils/api';

const RComponent = ({raceInfo}) => {
    const displayInfo = () => {
        getQualifying(raceInfo['season'], raceInfo['round'])
            .then((qualifying) => {
                // console.log(qualifying)
                return qualifying
            })
    }
    return (
        <div onClick={() => displayInfo()}>
            <span>Race Name: {raceInfo['raceName']}</span>
            <span>Roud: {raceInfo['round']}</span>
            <span>Season: {raceInfo['season']}</span>
        </div>
    )
}


export default RComponent
