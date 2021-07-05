import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import f1Reducer from './reducer';
import thunk from "redux-thunk" 

export const rootReducer = combineReducers({f1Reducer,})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    f1Reducer, 
    composeEnhancer(applyMiddleware(thunk)),
);

export default store;