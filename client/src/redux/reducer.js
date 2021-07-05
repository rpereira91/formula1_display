import { SET_SCHEDULE, SET_DRIVERS } from "./types";


const INITAL_STATE = {
    schedule: {}, 
    drivers: {},
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
        default:
            return state;
    }
} 

export default f1Reducer;