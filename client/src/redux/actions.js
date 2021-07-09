import { SET_SCHEDULE, SET_DRIVERS, SET_NEXT_RACE, SET_RACE } from "./types";
import {getYearSchedule, getYearDrivers, getNextRace} from '../utils/api';
import {onCurrentYear} from '../utils/constants'
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
    getYearDrivers(year)
        .then((drivers) => {
            dispatch({type: SET_DRIVERS, payload: drivers})
            completeCallback();
        })
        .catch((e) => {
            console.log(e)
        })
}