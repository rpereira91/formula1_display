import axios from 'axios';

export const getCurrentSchedule = () => {
    return axios.get('http://ergast.com/api/f1/current.json')
      .then(({data: {MRData:{RaceTable}}}) => RaceTable)
}

export const getQualifying = (season=2000, round=1) => {
    return axios.get(`http://ergast.com/api/f1/${season}/${round}/qualifying.json`)
      .then(({data: {MRData:{RaceTable}}}) => RaceTable)
}

export const getResults = (season=2000, round=1) => {
    return axios.get(`http://ergast.com/api/f1/2021/3/results.json`)
      .then(({data: {MRData:{RaceTable}}}) => RaceTable)
}