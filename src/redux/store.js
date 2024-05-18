import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Add generator functions here



// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Add saga actions here
function* getCategories() {
    try {
        const categoryResponse = yield axios.get('/api/categories');
        yield put({
            type: 'SET_CATEGORIES',
            payload: categoryResponse.data
        });
    } catch (error) {
        console.log('get categoreis error:', error);
    }
}

// Adding rootSaga to listen for saga actions
function* rootSaga() {
    yield takeEvery('GET_CATEGORIES', getCategories);
};

const categories = (state = [], action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
}

// Creating a store for all of the components to use
const storeInstance = createStore(
    combineReducers({
        categories,

    }),
    // Adding sagaMiddleware to the store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into the sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;

