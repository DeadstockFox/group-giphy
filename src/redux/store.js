import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Add generator functions here



// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Add saga actions here


// Adding rootSaga to listen for saga actions
function* rootSaga() {

};

// Creating a store for all of the components to use
const storeInstance = createStore(
    combineReducers({


    }),
    // Adding sagaMiddleware to the store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into the sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
