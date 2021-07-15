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
import _ from 'lodash';

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
            const driverStandings = _.get(standings, '[StandingsLists][0][DriverStandings]', [])
            dispatch({type: SET_DRIVERS, payload: driverStandings})
            completeCallback();
        })
        .catch((e) => {
            console.log(e)
        })
}

export const setRace = (season, round, noSeasonCallback = () => {}, doneLoading = () => {}) =>  (dispatch) => {
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
            .then((qualifying) => {
                const date = _.get(qualifying, 'Races[0][date]', null)
                const time = _.get(qualifying, 'Races[0][time]', null)
                raceDetails = {
                    ...raceDetails, 
                    qualifying: _.get(qualifying, 'Races[0][QualifyingResults]', []), 
                    url: _.get(qualifying, 'Races[0][url]', null),
                    qualifyingDate: {date, time},
                }
            })
            .then(() => {
                getResults(season, round)
                    .then((results) => {
                        const date = _.get(results, 'Races[0][date]', null)
                        const time = _.get(results, 'Races[0][time]', null)
                        raceDetails = {
                            ...raceDetails,
                            raceName: _.get(results, 'Races[0][raceName]', null), 
                            circuit: _.get(results, 'Races[0][Circuit]', null),
                            results: _.get(results, 'Races[0][Results]', []),
                            resultsDate: {date, time},
                        }
                    })
                    .then(() => {
                        dispatch({type: SET_RACE, payload: raceDetails})
                    })
                    .then(() => doneLoading())
            })
            .catch((e) => {
                console.log(e)
            })
    }
}