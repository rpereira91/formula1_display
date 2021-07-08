import axios from 'axios';

export const getCurrentSchedule = () => {
    return axios.get('http://ergast.com/api/f1/current.json')
      .then(({data: {MRData:{RaceTable}}}) => RaceTable)
      .catch((e) => console.log(e))
}

export const getYearSchedule = (year) => {
    return axios.get(`http://ergast.com/api/f1/${year}.json`)
        .then(({data: {MRData:{RaceTable}}}) => RaceTable)
        .catch((e) => console.log(e))
}

export const getYearDrivers = (year) => {
    return axios.get(`http://ergast.com/api/f1/${year}/drivers.json`)
        .then(({data: {MRData:{DriverTable}}}) => DriverTable)
        .catch((e) => console.log(e))
}

export const getQualifying = (season=2000, round=1) => {
    return axios.get(`http://ergast.com/api/f1/${season}/${round}/qualifying.json`)
      .then(({data: {MRData:{RaceTable}}}) => RaceTable)
      .catch((e) => console.log(e))
}

export const getResults = (season=2000, round=1) => {
    return axios.get(`http://ergast.com/api/f1/${season}/${round}/results.json`)
      .then(({data: {MRData:{RaceTable}}}) => RaceTable)
      .catch((e) => console.log(e))
}
