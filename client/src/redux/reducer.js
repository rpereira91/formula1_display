import { SET_SCHEDULE, SET_DRIVERS, SET_NEXT_RACE, SET_RACE } from "./types";


const INITAL_STATE = {
    schedule: {}, 
    nextRace: {},
    drivers: {},
    races:{
        qualifying: [], 
        results: [],
        url:'',
        raceName: null, 
        circuit: null,
    }
}

const f1Reducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case SET_SCHEDULE:
            return {
                ...state, 
                schedule: action.payload,
            }
        case SET_DRIVERS:
            return {
                ...state, 
                drivers: action.payload,
            }
        case SET_NEXT_RACE:
            return {
                ...state, 
                nextRace: action.payload,
            }
        case SET_RACE:
            return {
                ...state, 
                races: {...state.races, ...action.payload}
            }
        default:
            return state;
    }
} 

export default f1Reducer;