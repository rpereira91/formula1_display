import { SET_SCHEDULE, SET_DRIVERS } from "./types";
import {getYearSchedule, getYearDrivers} from '../utils/api';

export const setSchedule = (year, completeCallback = () => {}) => (dispatch) => {
    getYearSchedule(year)
        .then((currentSchedule) => {
            dispatch({type: SET_SCHEDULE, payload: currentSchedule})
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