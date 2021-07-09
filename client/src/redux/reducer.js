import { SET_SCHEDULE, SET_DRIVERS, SET_NEXT_RACE, SET_RACE } from "./types";


const INITAL_STATE = {
    schedule: {}, 
    nextRace: {},
    drivers: {},
    races:{}
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
        default:
            return state;
    }
} 

export default f1Reducer;