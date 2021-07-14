import { SET_SCHEDULE, SET_DRIVERS, SET_NEXT_RACE, SET_RACE } from "./types";
import {
    getYearSchedule, 
    getStandings, 
    getNextRace, 
    getLastRace, 
    getQualifying, 
    getResults
} from '../utils/api';
import {onCurrentYear} from '../utils/constants';
const setRaceDetails = (details) => {
    return ({type: SET_RACE, payload: details})
}
export const setSchedule = (year, completeCallback = () => {}) => (dispatch) => {
    getYearSchedule(year)
        .then((currentSchedule) => {
            dispatch({type: SET_SCHEDULE, payload: currentSchedule})
        })
        .then(() => {
            if(onCurrentYear(year))
                {
                    getNextRace()
                    .then((nextRace) => {
                        dispatch({type: SET_NEXT_RACE, payload: nextRace});
                    })
                }
            })
        .then(() => {
                completeCallback();
                
        })
        .catch((e) => {
            console.log(e)
        })
}

export const setDrivers = (year, completeCallback = () => {}) => (dispatch) => {
    getStandings(year)
        .then((standings) => {
            if (standings['StandingsLists'].length > 0){
                dispatch({type: SET_DRIVERS, payload: standings['StandingsLists'][0]['DriverStandings']})

            }
            completeCallback();
        })
        .catch((e) => {
            console.log(e)
        })
}

export const setRace = (season, round, noSeasonCallback = () => {}) =>  (dispatch) => {
    if (!round || !season) {
        // get the last race and fill the info
        getLastRace()
            .then(({round, season}) => {
                noSeasonCallback(round, season)
            })
            .catch((e) => {
                console.log(e)
            });
    } else {
        var raceDetails = {}
        getQualifying(season, round)
            .then((qualifying) => dispatch({type: SET_RACE, payload: {qualifying: qualifying.Races[0]['QualifyingResults'], url:qualifying.Races[0]['url'] }}))
            .catch((e) => {
                console.log(e)
            })
        getResults(season, round)
            .then((results) => raceDetails = {...raceDetails, raceName: results.Races[0]['raceName'], circut: results.Races[0]['Circut'], results: results.Races[0]['Results']})
            .catch((e) => {
                console.log(e)
            })
        dispatch(setRaceDetails(raceDetails))
    }
}