import { SET_SCHEDULE, SET_DRIVERS, SET_NEXT_RACE } from "./types";
import {getYearSchedule, getYearDrivers, getNextRace} from '../utils/api';

export const setRaceInfo = () => (dispatch) => {

}

export const setSchedule = (year, completeCallback = () => {}) => (dispatch,getState) => {
    const {schedule} = getState();
    if (schedule.season && schedule.season !== year){
        getYearSchedule(year)
            .then((currentSchedule) => {
                dispatch({type: SET_SCHEDULE, payload: currentSchedule})
            })
            .then(() => {
                getNextRace()
                    .then((nextRace) => {
                        dispatch({type: SET_NEXT_RACE, payload: nextRace})
                        completeCallback();
                        })
            })
            .catch((e) => {
                console.log(e)
            })
    } else {
        completeCallback ()
    }
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