import { combineReducers, createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import AppReducer from './app';


const rootReducer = combineReducers({
    app: AppReducer
});

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

export default createStoreWithMiddleware(rootReducer);
